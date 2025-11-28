import Phaser from 'phaser';

/**
 * MenuScene - Main menu with retro pixel art styling
 */
export class MenuScene extends Phaser.Scene {
  private titleText!: Phaser.GameObjects.Text;
  private menuButtons: Phaser.GameObjects.Container[] = [];
  private selectedIndex: number = 0;
  private starfield: Phaser.GameObjects.Arc[] = [];
  
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    
    // Background
    this.cameras.main.setBackgroundColor('#0a0a1a');
    
    // Create starfield
    this.createStarfield();
    
    // Create cosmic nebula effect
    this.createNebulaEffect();
    
    // Create title
    this.createTitle(width, height);
    
    // Create menu options
    this.createMenuButtons(width, height);
    
    // Create decorative elements
    this.createDecorations(width, height);
    
    // Setup input
    this.setupInput();
    
    // Fade in
    this.cameras.main.fadeIn(500);
    
    // Start ambient animations
    this.startAmbientAnimations();
  }

  /**
   * Create animated starfield background
   */
  private createStarfield(): void {
    const { width, height } = this.cameras.main;
    
    for (let i = 0; i < 80; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const size = Phaser.Math.Between(1, 3);
      const alpha = Phaser.Math.FloatBetween(0.2, 0.6);
      
      const star = this.add.circle(x, y, size, 0xffffff, alpha);
      star.setDepth(-10);
      
      // Twinkle animation
      this.tweens.add({
        targets: star,
        alpha: { from: alpha, to: alpha * 0.3 },
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      });
      
      this.starfield.push(star);
    }
  }

  /**
   * Create nebula gradient effect
   */
  private createNebulaEffect(): void {
    const { width, height } = this.cameras.main;
    
    const nebula = this.add.graphics();
    nebula.setDepth(-9);
    
    // Multiple gradient layers for depth
    nebula.fillGradientStyle(0x1a1a3e, 0x0a0a1a, 0x1a1a3e, 0x0a0a1a, 0.3);
    nebula.fillRect(0, 0, width, height);
    
    // Purple accent in corner
    nebula.fillGradientStyle(0x8b5cf6, 0x0a0a1a, 0x0a0a1a, 0x0a0a1a, 0.15);
    nebula.fillRect(0, 0, width / 2, height / 2);
  }

  /**
   * Create title text with effects
   */
  private createTitle(width: number, height: number): void {
    // Main title
    this.titleText = this.add.text(width / 2, height / 4, 'ALGORITHMIA', {
      fontSize: '56px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);
    
    // Title glow effect
    if (this.titleText.postFX) {
      this.titleText.postFX.addGlow(0x06b6d4, 4, 0, false, 0.1, 16);
    }
    
    // Subtitle
    this.add.text(width / 2, height / 4 + 60, 'The Path of Logic', {
      fontSize: '20px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#8b5cf6',
    }).setOrigin(0.5);
    
    // Animated underline
    const underline = this.add.graphics();
    underline.lineStyle(3, 0x06b6d4, 0.8);
    underline.lineBetween(width / 2 - 200, height / 4 + 90, width / 2 + 200, height / 4 + 90);
  }

  /**
   * Create menu buttons
   */
  private createMenuButtons(width: number, height: number): void {
    const menuOptions = [
      { text: 'START GAME', action: () => this.startGame() },
      { text: 'CONTINUE', action: () => this.continueGame() },
      { text: 'OPTIONS', action: () => this.showOptions() },
      { text: 'CODEX', action: () => this.showCodex() },
    ];
    
    const startY = height / 2 + 20;
    const spacing = 55;
    
    menuOptions.forEach((option, index) => {
      const button = this.createMenuButton(width / 2, startY + index * spacing, option.text, option.action);
      this.menuButtons.push(button);
    });
    
    // Highlight first button
    this.updateSelection();
  }

  /**
   * Create a single menu button
   */
  private createMenuButton(x: number, y: number, text: string, callback: () => void): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Button background
    const bg = this.add.graphics();
    bg.fillStyle(0x1a1a3e, 0.8);
    bg.fillRoundedRect(-140, -20, 280, 40, 8);
    bg.lineStyle(2, 0x4a4a6a, 1);
    bg.strokeRoundedRect(-140, -20, 280, 40, 8);
    
    // Selection indicator (hidden by default)
    const selector = this.add.graphics();
    selector.fillStyle(0x06b6d4, 1);
    selector.fillTriangle(-155, 0, -145, -8, -145, 8);
    selector.setVisible(false);
    selector.setName('selector');
    
    // Button text
    const buttonText = this.add.text(0, 0, text, {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    buttonText.setName('text');
    
    container.add([bg, selector, buttonText]);
    container.setData('callback', callback);
    container.setData('index', this.menuButtons.length);
    
    // Make interactive
    const hitArea = this.add.rectangle(0, 0, 280, 40, 0xffffff, 0).setOrigin(0.5);
    hitArea.setInteractive({ useHandCursor: true });
    container.add(hitArea);
    
    hitArea.on('pointerover', () => {
      this.selectedIndex = container.getData('index');
      this.updateSelection();
    });
    
    hitArea.on('pointerdown', () => {
      this.selectCurrentOption();
    });
    
    return container;
  }

  /**
   * Update visual selection state
   */
  private updateSelection(): void {
    this.menuButtons.forEach((button, index) => {
      const selector = button.getByName('selector') as Phaser.GameObjects.Graphics;
      const text = button.getByName('text') as Phaser.GameObjects.Text;
      
      if (index === this.selectedIndex) {
        selector.setVisible(true);
        text.setColor('#06b6d4');
        
        // Pulse animation
        this.tweens.killTweensOf(button);
        this.tweens.add({
          targets: button,
          scale: 1.05,
          duration: 200,
        });
      } else {
        selector.setVisible(false);
        text.setColor('#9ca3af');
        
        this.tweens.killTweensOf(button);
        this.tweens.add({
          targets: button,
          scale: 1,
          duration: 200,
        });
      }
    });
  }

  /**
   * Select the current menu option
   */
  private selectCurrentOption(): void {
    const button = this.menuButtons[this.selectedIndex];
    const callback = button.getData('callback') as () => void;
    
    // Flash effect
    this.cameras.main.flash(200, 6, 182, 212);
    
    // Execute callback
    callback();
  }

  /**
   * Create decorative elements
   */
  private createDecorations(width: number, height: number): void {
    // Floating tiles decoration
    const tilePositions = [
      { x: 100, y: 150 },
      { x: width - 100, y: 200 },
      { x: 150, y: height - 150 },
      { x: width - 150, y: height - 200 },
    ];
    
    tilePositions.forEach((pos, i) => {
      const tile = this.add.graphics();
      tile.fillStyle(0x1a1a3e, 0.5);
      tile.fillRoundedRect(-25, -25, 50, 50, 8);
      tile.lineStyle(2, 0x06b6d4, 0.3);
      tile.strokeRoundedRect(-25, -25, 50, 50, 8);
      tile.setPosition(pos.x, pos.y);
      tile.setDepth(-5);
      
      // Float animation
      this.tweens.add({
        targets: tile,
        y: pos.y - 10,
        duration: 2000 + i * 300,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      
      // Rotate animation
      this.tweens.add({
        targets: tile,
        angle: 5,
        duration: 3000 + i * 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    });
    
    // Version text
    this.add.text(width - 20, height - 20, 'v0.1.0 Early Access', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#4a4a6a',
    }).setOrigin(1);
    
    // Controls hint
    this.add.text(width / 2, height - 40, 'Use ↑↓ or W/S to navigate, ENTER or SPACE to select', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#4a4a6a',
    }).setOrigin(0.5);
  }

  /**
   * Setup input handling
   */
  private setupInput(): void {
    this.input.keyboard?.on('keydown-UP', () => this.navigateUp());
    this.input.keyboard?.on('keydown-W', () => this.navigateUp());
    this.input.keyboard?.on('keydown-DOWN', () => this.navigateDown());
    this.input.keyboard?.on('keydown-S', () => this.navigateDown());
    this.input.keyboard?.on('keydown-ENTER', () => this.selectCurrentOption());
    this.input.keyboard?.on('keydown-SPACE', () => this.selectCurrentOption());
  }

  /**
   * Navigate up in menu
   */
  private navigateUp(): void {
    this.selectedIndex = (this.selectedIndex - 1 + this.menuButtons.length) % this.menuButtons.length;
    this.updateSelection();
  }

  /**
   * Navigate down in menu
   */
  private navigateDown(): void {
    this.selectedIndex = (this.selectedIndex + 1) % this.menuButtons.length;
    this.updateSelection();
  }

  /**
   * Start ambient animations
   */
  private startAmbientAnimations(): void {
    // Title pulse
    this.tweens.add({
      targets: this.titleText,
      scale: 1.02,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Floating particles
    for (let i = 0; i < 20; i++) {
      const particle = this.add.circle(
        Phaser.Math.Between(0, this.cameras.main.width),
        Phaser.Math.Between(this.cameras.main.height / 2, this.cameras.main.height),
        2,
        0x06b6d4,
        0.3
      );
      particle.setDepth(-5);
      
      this.tweens.add({
        targets: particle,
        y: particle.y - Phaser.Math.Between(100, 300),
        alpha: 0,
        duration: Phaser.Math.Between(4000, 8000),
        delay: Phaser.Math.Between(0, 3000),
        repeat: -1,
        onRepeat: () => {
          particle.x = Phaser.Math.Between(0, this.cameras.main.width);
          particle.y = Phaser.Math.Between(this.cameras.main.height / 2, this.cameras.main.height);
          particle.alpha = 0.3;
        },
      });
    }
  }

  /**
   * Start a new game
   */
  private startGame(): void {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('PrologueScene');
    });
  }

  /**
   * Continue saved game
   */
  private continueGame(): void {
    // TODO: Implement save/load system
    this.showMessage('No save data found. Starting new game...');
    this.time.delayedCall(1500, () => this.startGame());
  }

  /**
   * Show options menu
   */
  private showOptions(): void {
    // TODO: Implement options menu
    this.showMessage('Options coming soon!');
  }

  /**
   * Show codex
   */
  private showCodex(): void {
    // TODO: Implement codex viewer
    this.showMessage('Codex unlocks as you play!');
  }

  /**
   * Show a temporary message
   */
  private showMessage(text: string): void {
    const { width, height } = this.cameras.main;
    
    const message = this.add.text(width / 2, height - 100, text, {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#fbbf24',
      backgroundColor: '#1a1a2e',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: message,
      alpha: 0,
      y: height - 120,
      duration: 1500,
      delay: 1000,
      onComplete: () => message.destroy(),
    });
  }
}
