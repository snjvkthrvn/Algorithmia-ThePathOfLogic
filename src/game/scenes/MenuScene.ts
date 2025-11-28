import Phaser from 'phaser';
import { prologueProgress } from '../state/prologueProgress';

/**
 * MenuScene - Retro pixel art main menu
 * Features animated starfield background and classic RPG-style UI
 */
export class MenuScene extends Phaser.Scene {
  // UI elements
  private titleText!: Phaser.GameObjects.Text;
  private menuItems: Phaser.GameObjects.Container[] = [];
  private selectedIndex: number = 0;
  
  // Background elements
  private starfield: Phaser.GameObjects.Arc[] = [];
  private crystals: Phaser.GameObjects.Container[] = [];
  
  // Colors
  private readonly COLORS = {
    primary: 0x06b6d4,      // Cyan
    secondary: 0x8b5cf6,    // Purple
    accent: 0xfbbf24,       // Gold
    text: '#ffffff',
    textMuted: '#6b7280',
    bg: 0x0a0a1a,
  };

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    
    // 1. Create animated background
    this.createBackground(width, height);
    
    // 2. Create title
    this.createTitle(width);
    
    // 3. Create menu items
    this.createMenuItems(width, height);
    
    // 4. Create decorative elements
    this.createDecorations(width, height);
    
    // 5. Setup input
    this.setupInput();
    
    // 6. Create version info
    this.createVersionInfo(width, height);
    
    // 7. Fade in
    this.cameras.main.fadeIn(500);
  }

  /**
   * Create animated starfield background
   */
  private createBackground(width: number, height: number): void {
    // Solid background
    this.add.rectangle(0, 0, width, height, this.COLORS.bg).setOrigin(0);
    
    // Gradient overlay
    const gradient = this.add.graphics();
    gradient.fillGradientStyle(
      0x1a1a3e, 0x1a1a3e,
      this.COLORS.bg, this.COLORS.bg,
      0.5
    );
    gradient.fillRect(0, 0, width, height);
    
    // Create starfield
    for (let i = 0; i < 80; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const size = Phaser.Math.Between(1, 3);
      const alpha = Phaser.Math.FloatBetween(0.2, 0.8);
      
      const star = this.add.circle(x, y, size, 0xffffff, alpha);
      
      // Twinkle animation
      this.tweens.add({
        targets: star,
        alpha: alpha * 0.3,
        duration: Phaser.Math.Between(800, 2000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 1500),
      });
      
      this.starfield.push(star);
    }
    
    // Shooting star effect (occasional)
    this.time.addEvent({
      delay: 5000,
      callback: () => this.createShootingStar(width, height),
      loop: true,
    });
  }

  /**
   * Create a shooting star effect
   */
  private createShootingStar(width: number, height: number): void {
    const startX = Phaser.Math.Between(0, width);
    const startY = Phaser.Math.Between(0, height / 3);
    
    const star = this.add.graphics();
    star.fillStyle(0xffffff, 1);
    star.fillCircle(0, 0, 3);
    star.x = startX;
    star.y = startY;
    star.setDepth(10);
    
    // Trail
    const trail = this.add.graphics();
    trail.setDepth(9);
    
    this.tweens.add({
      targets: star,
      x: startX + 200,
      y: startY + 100,
      alpha: 0,
      duration: 800,
      onUpdate: () => {
        trail.clear();
        trail.lineStyle(2, 0xffffff, star.alpha * 0.5);
        trail.lineBetween(star.x - 20, star.y - 10, star.x, star.y);
      },
      onComplete: () => {
        star.destroy();
        trail.destroy();
      },
    });
  }

  /**
   * Create game title
   */
  private createTitle(width: number): void {
    // Main title
    this.titleText = this.add.text(width / 2, 120, 'ALGORITHMIA', {
      fontSize: '48px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);
    
    // Subtle glow animation
    this.tweens.add({
      targets: this.titleText,
      alpha: 0.8,
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });

    // Subtitle
    this.add.text(width / 2, 180, 'THE PATH OF LOGIC', {
      fontSize: '18px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#8b5cf6',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);
    
    // Decorative line under title
    const line = this.add.graphics();
    line.lineStyle(2, this.COLORS.primary, 0.5);
    line.lineBetween(width / 2 - 200, 210, width / 2 + 200, 210);
  }

  /**
   * Create menu items
   */
  private createMenuItems(width: number, height: number): void {
    const items = [
      { text: 'NEW GAME', action: () => this.startNewGame() },
      { text: 'CONTINUE', action: () => this.continueGame(), disabled: !this.hasSaveData() },
      { text: 'CODEX', action: () => this.openCodex(), disabled: true },
      { text: 'SETTINGS', action: () => this.openSettings() },
    ];
    
    const startY = height / 2 + 20;
    const spacing = 50;
    
    items.forEach((item, index) => {
      const menuItem = this.createMenuItem(
      width / 2,
        startY + index * spacing, 
        item.text, 
        item.action,
        item.disabled
      );
      this.menuItems.push(menuItem);
    });
    
    // Highlight first item
    this.updateSelection();
  }

  /**
   * Create a single menu item
   */
  private createMenuItem(
    x: number, 
    y: number, 
    text: string, 
    action: () => void,
    disabled: boolean = false
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Selection indicator (hidden by default)
    const indicator = this.add.text(-150, 0, '►', {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    indicator.setVisible(false);
    
    // Menu text
    const menuText = this.add.text(0, 0, text, {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: disabled ? '#4a5568' : '#ffffff',
    }).setOrigin(0.5);
    
    container.add([indicator, menuText]);
    container.setData('action', action);
    container.setData('disabled', disabled);
    container.setData('indicator', indicator);
    container.setData('text', menuText);
    
    // Make interactive
    if (!disabled) {
      menuText.setInteractive({ useHandCursor: true });
      
      menuText.on('pointerover', () => {
        const idx = this.menuItems.indexOf(container);
        if (idx !== -1) {
          this.selectedIndex = idx;
          this.updateSelection();
        }
      });
      
      menuText.on('pointerdown', () => {
        this.selectCurrentItem();
      });
    }
    
    return container;
  }

  /**
   * Create decorative elements
   */
  private createDecorations(width: number, height: number): void {
    // Floating crystals on sides
    const crystalPositions = [
      { x: 100, y: height / 2, color: 0x06b6d4 },
      { x: width - 100, y: height / 2, color: 0x8b5cf6 },
    ];
    
    crystalPositions.forEach(pos => {
      const crystal = this.createCrystal(pos.x, pos.y, pos.color);
      this.crystals.push(crystal);
    });
    
    // Bottom decorative pattern
    const pattern = this.add.graphics();
    pattern.lineStyle(1, this.COLORS.primary, 0.3);
    
    for (let i = 0; i < 10; i++) {
      const y = height - 50 + i * 5;
      pattern.lineBetween(0, y, width, y);
    }
  }

  /**
   * Create a decorative floating crystal
   */
  private createCrystal(x: number, y: number, color: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Crystal shape
    const crystal = this.add.graphics();
    crystal.fillStyle(color, 0.6);
    crystal.beginPath();
    crystal.moveTo(0, -30);
    crystal.lineTo(15, 0);
    crystal.lineTo(0, 30);
    crystal.lineTo(-15, 0);
    crystal.closePath();
    crystal.fillPath();
    
    // Highlight
    crystal.fillStyle(0xffffff, 0.3);
    crystal.beginPath();
    crystal.moveTo(0, -30);
    crystal.lineTo(8, -5);
    crystal.lineTo(0, 0);
    crystal.lineTo(-8, -5);
    crystal.closePath();
    crystal.fillPath();
    
    // Glow
    const glow = this.add.circle(0, 0, 20, color, 0.2);
    
    container.add([glow, crystal]);
    
    // Floating animation
    this.tweens.add({
      targets: container,
      y: y - 20,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Rotate slightly
    this.tweens.add({
      targets: container,
      angle: { from: -5, to: 5 },
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    return container;
  }

  /**
   * Setup input handling
   */
  private setupInput(): void {
    if (!this.input.keyboard) return;
    
    // Navigation
    this.input.keyboard.on('keydown-UP', () => this.navigateMenu(-1));
    this.input.keyboard.on('keydown-W', () => this.navigateMenu(-1));
    this.input.keyboard.on('keydown-DOWN', () => this.navigateMenu(1));
    this.input.keyboard.on('keydown-S', () => this.navigateMenu(1));
    
    // Selection
    this.input.keyboard.on('keydown-ENTER', () => this.selectCurrentItem());
    this.input.keyboard.on('keydown-SPACE', () => this.selectCurrentItem());
  }

  /**
   * Navigate menu
   */
  private navigateMenu(direction: number): void {
    // Find next non-disabled item
    let newIndex = this.selectedIndex;
    const maxAttempts = this.menuItems.length;
    let attempts = 0;
    
    do {
      newIndex = (newIndex + direction + this.menuItems.length) % this.menuItems.length;
      attempts++;
    } while (this.menuItems[newIndex].getData('disabled') && attempts < maxAttempts);
    
    if (!this.menuItems[newIndex].getData('disabled')) {
      this.selectedIndex = newIndex;
      this.updateSelection();
    }
  }

  /**
   * Update menu selection visuals
   */
  private updateSelection(): void {
    this.menuItems.forEach((item, index) => {
      const indicator = item.getData('indicator') as Phaser.GameObjects.Text;
      const text = item.getData('text') as Phaser.GameObjects.Text;
      const disabled = item.getData('disabled') as boolean;
      
      if (index === this.selectedIndex && !disabled) {
        indicator.setVisible(true);
        text.setColor('#fbbf24');
        
        // Bounce animation for indicator
        this.tweens.killTweensOf(indicator);
        this.tweens.add({
          targets: indicator,
          x: -145,
          duration: 300,
          yoyo: true,
          repeat: -1,
        });
      } else {
        indicator.setVisible(false);
        text.setColor(disabled ? '#4a5568' : '#ffffff');
        this.tweens.killTweensOf(indicator);
      }
    });
  }

  /**
   * Select current menu item
   */
  private selectCurrentItem(): void {
    const item = this.menuItems[this.selectedIndex];
    if (item && !item.getData('disabled')) {
      // Flash effect
      this.cameras.main.flash(100, 6, 182, 212);
      
      const action = item.getData('action') as () => void;
      if (action) {
        action();
      }
    }
  }

  /**
   * Check if save data exists
   */
  private hasSaveData(): boolean {
    // TODO: Implement actual save data check
    return localStorage.getItem('algorithmia_save') !== null;
  }

  /**
   * Start new game
   */
  private startNewGame(): void {
    prologueProgress.reset();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('GameScene');
    });
  }

  /**
   * Continue existing game
   */
  private continueGame(): void {
    // TODO: Load save data
    this.startNewGame();
  }

  /**
   * Open Codex
   */
  private openCodex(): void {
    // TODO: Implement Codex scene
    console.log('Codex not implemented yet');
  }

  /**
   * Open Settings
   */
  private openSettings(): void {
    // TODO: Implement Settings scene
    console.log('Settings not implemented yet');
  }

  /**
   * Create version info
   */
  private createVersionInfo(width: number, height: number): void {
    this.add.text(width - 20, height - 20, 'v0.1 Early Access', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#4a5568',
    }).setOrigin(1, 1);
    
    // Controls hint
    this.add.text(width / 2, height - 50, 'Use Arrow Keys / WASD to Navigate • ENTER to Select', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#6b7280',
    }).setOrigin(0.5);
  }
}
