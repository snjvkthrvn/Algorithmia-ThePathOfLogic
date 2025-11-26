import Phaser from 'phaser';

/**
 * BasePuzzleScene - A consistent UI framework for all puzzle scenes
 * Provides a retro RPG-style dedicated puzzle interface that overlays
 * on the game world when a player interacts with a puzzle NPC
 */
export abstract class BasePuzzleScene extends Phaser.Scene {
  // UI Elements
  protected uiContainer!: Phaser.GameObjects.Container;
  protected puzzleFrame!: Phaser.GameObjects.Graphics;
  protected titleText!: Phaser.GameObjects.Text;
  protected instructionText!: Phaser.GameObjects.Text;
  protected hintButton!: Phaser.GameObjects.Container;
  protected exitButton!: Phaser.GameObjects.Container;
  protected starContainer!: Phaser.GameObjects.Container;
  
  // Puzzle State
  protected puzzleId: string = '';
  protected puzzleName: string = '';
  protected puzzleDescription: string = '';
  protected attempts: number = 0;
  protected startTime: number = 0;
  protected hintsUsed: number = 0;
  protected maxHints: number = 3;
  protected returnScene: string = 'GameScene';
  
  // Colors - Retro palette
  protected readonly COLORS = {
    // UI Frame colors
    frameBg: 0x1a1a2e,
    frameBorder: 0x4a4a6a,
    frameBorderLight: 0x7a7aaa,
    frameBorderDark: 0x2a2a4a,
    
    // Accent colors
    primary: 0x06b6d4,      // Cyan
    secondary: 0x8b5cf6,    // Purple
    accent: 0xfbbf24,       // Gold/Yellow
    success: 0x22c55e,      // Green
    error: 0xef4444,        // Red
    warning: 0xf97316,      // Orange
    
    // Text colors
    textLight: 0xffffff,
    textMuted: 0x9ca3af,
    textDark: 0x1f2937,
    
    // Background
    overlayBg: 0x0a0a14,
  };

  constructor(config: { key: string }) {
    super(config);
  }

  init(data: { returnScene?: string; puzzleData?: Record<string, unknown> }): void {
    this.returnScene = data.returnScene || 'GameScene';
    this.startTime = Date.now();
    this.attempts = 0;
    this.hintsUsed = 0;
  }

  create(): void {
    // Reset camera
    this.cameras.main.setScroll(0, 0);
    this.cameras.main.setZoom(1);
    
    // Create the base UI
    this.createPuzzleUI();
    
    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  /**
   * Creates the main puzzle UI frame with retro RPG styling
   */
  protected createPuzzleUI(): void {
    const { width, height } = this.cameras.main;
    
    // Dark overlay background
    const overlay = this.add.rectangle(0, 0, width, height, this.COLORS.overlayBg, 0.95);
    overlay.setOrigin(0, 0);
    
    // Main UI container
    this.uiContainer = this.add.container(0, 0);
    
    // Create the puzzle frame with retro border
    this.createPuzzleFrame(width, height);
    
    // Add title area
    this.createTitleArea(width);
    
    // Add control buttons
    this.createControlButtons(width, height);
    
    // Create star rating display (initially hidden)
    this.createStarRating(width);
  }

  /**
   * Creates a retro-styled frame for the puzzle area
   */
  protected createPuzzleFrame(width: number, height: number): void {
    const padding = 40;
    const frameWidth = width - padding * 2;
    const frameHeight = height - padding * 2;
    
    this.puzzleFrame = this.add.graphics();
    
    // Outer shadow
    this.puzzleFrame.fillStyle(0x000000, 0.5);
    this.puzzleFrame.fillRoundedRect(padding + 4, padding + 4, frameWidth, frameHeight, 8);
    
    // Main frame background
    this.puzzleFrame.fillStyle(this.COLORS.frameBg, 1);
    this.puzzleFrame.fillRoundedRect(padding, padding, frameWidth, frameHeight, 8);
    
    // Border - outer (dark)
    this.puzzleFrame.lineStyle(4, this.COLORS.frameBorderDark, 1);
    this.puzzleFrame.strokeRoundedRect(padding, padding, frameWidth, frameHeight, 8);
    
    // Border - inner (light)
    this.puzzleFrame.lineStyle(2, this.COLORS.frameBorderLight, 1);
    this.puzzleFrame.strokeRoundedRect(padding + 6, padding + 6, frameWidth - 12, frameHeight - 12, 6);
    
    // Top decorative line
    this.puzzleFrame.lineStyle(2, this.COLORS.primary, 0.6);
    this.puzzleFrame.beginPath();
    this.puzzleFrame.moveTo(padding + 100, padding + 70);
    this.puzzleFrame.lineTo(width - padding - 100, padding + 70);
    this.puzzleFrame.strokePath();
    
    this.uiContainer.add(this.puzzleFrame);
  }

  /**
   * Creates the title and instruction area
   */
  protected createTitleArea(width: number): void {
    // Puzzle title with retro font styling
    this.titleText = this.add.text(width / 2, 75, this.puzzleName, {
      fontSize: '28px',
      fontFamily: '"Press Start 2P", monospace, Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);
    
    // Add glow effect to title
    this.titleText.setPostPipeline('glow');
    
    // Instruction text
    this.instructionText = this.add.text(width / 2, 115, this.puzzleDescription, {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#9ca3af',
      align: 'center',
      wordWrap: { width: width - 200 }
    }).setOrigin(0.5);
    
    this.uiContainer.add([this.titleText, this.instructionText]);
  }

  /**
   * Creates control buttons (Exit, Hint)
   */
  protected createControlButtons(width: number, height: number): void {
    // Exit button (top right)
    this.exitButton = this.createRetroButton(
      width - 80, 
      60, 
      'EXIT', 
      this.COLORS.error,
      () => this.exitPuzzle()
    );
    
    // Hint button (top left)
    this.hintButton = this.createRetroButton(
      80, 
      60, 
      `HINT (${this.maxHints - this.hintsUsed})`, 
      this.COLORS.accent,
      () => this.showHint()
    );
    
    this.uiContainer.add([this.exitButton, this.hintButton]);
  }

  /**
   * Creates a retro-styled button
   */
  protected createRetroButton(
    x: number, 
    y: number, 
    text: string, 
    color: number,
    callback: () => void
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Button shadow
    const shadow = this.add.rectangle(2, 2, 90, 30, 0x000000, 0.5);
    shadow.setOrigin(0.5);
    
    // Button background
    const bg = this.add.rectangle(0, 0, 90, 30, color, 1);
    bg.setOrigin(0.5);
    bg.setStrokeStyle(2, this.adjustBrightness(color, 0.7));
    
    // Button text
    const btnText = this.add.text(0, 0, text, {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#ffffff',
    }).setOrigin(0.5);
    
    container.add([shadow, bg, btnText]);
    
    // Make interactive
    bg.setInteractive({ useHandCursor: true });
    
    bg.on('pointerover', () => {
      bg.setFillStyle(this.adjustBrightness(color, 1.2));
      this.tweens.add({
        targets: container,
        scale: 1.05,
        duration: 100,
      });
    });
    
    bg.on('pointerout', () => {
      bg.setFillStyle(color);
      this.tweens.add({
        targets: container,
        scale: 1,
        duration: 100,
      });
    });
    
    bg.on('pointerdown', () => {
      this.playButtonSound();
      callback();
    });
    
    return container;
  }

  /**
   * Creates the star rating display
   */
  protected createStarRating(width: number): void {
    this.starContainer = this.add.container(width / 2, 40);
    this.starContainer.setVisible(false);
    this.uiContainer.add(this.starContainer);
  }

  /**
   * Shows the star rating after puzzle completion
   */
  protected showStarRating(stars: number): void {
    this.starContainer.removeAll(true);
    
    const starSize = 24;
    const spacing = 30;
    const startX = -spacing;
    
    for (let i = 0; i < 3; i++) {
      const x = startX + i * spacing;
      const isFilled = i < stars;
      
      const star = this.add.text(x, 0, '★', {
        fontSize: `${starSize}px`,
        color: isFilled ? '#fbbf24' : '#4a4a6a',
      }).setOrigin(0.5);
      
      // Animate stars appearing
      star.setScale(0);
      this.tweens.add({
        targets: star,
        scale: 1,
        duration: 300,
        delay: i * 150,
        ease: 'Back.easeOut',
      });
      
      this.starContainer.add(star);
    }
    
    this.starContainer.setVisible(true);
  }

  /**
   * Setup keyboard shortcuts
   */
  protected setupKeyboardShortcuts(): void {
    this.input.keyboard?.on('keydown-ESC', () => this.exitPuzzle());
    this.input.keyboard?.on('keydown-H', () => this.showHint());
    this.input.keyboard?.on('keydown-R', () => this.restartPuzzle());
  }

  /**
   * Show hint - to be implemented by child classes
   */
  protected showHint(): void {
    if (this.hintsUsed >= this.maxHints) {
      this.showMessage('No hints remaining!', this.COLORS.warning);
      return;
    }
    
    this.hintsUsed++;
    this.updateHintButton();
    
    // Child class should override this to provide actual hints
    this.displayHint(this.hintsUsed);
  }

  /**
   * Display the actual hint - override in child classes
   */
  protected abstract displayHint(hintNumber: number): void;

  /**
   * Update the hint button text
   */
  protected updateHintButton(): void {
    const textObj = this.hintButton.getAt(2) as Phaser.GameObjects.Text;
    textObj.setText(`HINT (${this.maxHints - this.hintsUsed})`);
    
    if (this.hintsUsed >= this.maxHints) {
      const bg = this.hintButton.getAt(1) as Phaser.GameObjects.Rectangle;
      bg.setFillStyle(0x4a4a6a);
      bg.disableInteractive();
    }
  }

  /**
   * Exit the puzzle and return to the overworld
   */
  protected exitPuzzle(): void {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(this.returnScene);
    });
  }

  /**
   * Restart the puzzle
   */
  protected restartPuzzle(): void {
    this.attempts++;
    this.scene.restart({ returnScene: this.returnScene });
  }

  /**
   * Called when puzzle is completed successfully
   */
  protected onPuzzleComplete(stars: number): void {
    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    
    // Show star rating
    this.showStarRating(stars);
    
    // Show success message
    this.showMessage('PUZZLE COMPLETE!', this.COLORS.success);
    
    // Transition to Concept Bridge after delay
    this.time.delayedCall(2000, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start('ConceptBridgeScene', {
          puzzleName: this.puzzleName,
          puzzleId: this.puzzleId,
          concept: this.getConceptName(),
          attempts: this.attempts + 1,
          timeSpent: timeSpent,
          hintsUsed: this.hintsUsed,
          stars: stars,
        });
      });
    });
  }

  /**
   * Get the concept name for this puzzle - override in child classes
   */
  protected abstract getConceptName(): string;

  /**
   * Show a temporary message on screen
   */
  protected showMessage(text: string, color: number = this.COLORS.textLight): void {
    const { width, height } = this.cameras.main;
    
    const message = this.add.text(width / 2, height / 2, text, {
      fontSize: '24px',
      fontFamily: '"Press Start 2P", monospace',
      color: `#${color.toString(16).padStart(6, '0')}`,
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(1000);
    
    // Animate message
    this.tweens.add({
      targets: message,
      y: height / 2 - 50,
      alpha: 0,
      duration: 1500,
      delay: 500,
      onComplete: () => message.destroy(),
    });
  }

  /**
   * Play a button click sound (placeholder for actual sound)
   */
  protected playButtonSound(): void {
    // TODO: Add actual sound when audio assets are available
    // this.sound.play('button-click');
  }

  /**
   * Utility: Adjust color brightness
   */
  protected adjustBrightness(color: number, factor: number): number {
    const r = Math.min(255, Math.floor(((color >> 16) & 0xFF) * factor));
    const g = Math.min(255, Math.floor(((color >> 8) & 0xFF) * factor));
    const b = Math.min(255, Math.floor((color & 0xFF) * factor));
    return (r << 16) | (g << 8) | b;
  }

  /**
   * Create a retro-styled tile for puzzle elements
   */
  protected createPuzzleTile(
    x: number, 
    y: number, 
    size: number, 
    color: number,
    label?: string
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Shadow
    const shadow = this.add.rectangle(3, 3, size, size, 0x000000, 0.4);
    
    // Main tile
    const tile = this.add.rectangle(0, 0, size, size, color);
    tile.setStrokeStyle(3, this.adjustBrightness(color, 0.6));
    
    // Highlight (top-left)
    const highlight = this.add.graphics();
    highlight.lineStyle(2, this.adjustBrightness(color, 1.4), 0.7);
    highlight.beginPath();
    highlight.moveTo(-size/2 + 4, size/2 - 4);
    highlight.lineTo(-size/2 + 4, -size/2 + 4);
    highlight.lineTo(size/2 - 4, -size/2 + 4);
    highlight.strokePath();
    
    container.add([shadow, tile, highlight]);
    
    // Add label if provided
    if (label) {
      const text = this.add.text(0, 0, label, {
        fontSize: `${Math.floor(size * 0.4)}px`,
        fontFamily: '"Press Start 2P", monospace',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0.5);
      container.add(text);
    }
    
    return container;
  }
}

