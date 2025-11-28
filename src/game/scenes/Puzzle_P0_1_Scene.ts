import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';

/**
 * Puzzle P0-1: Follow the Path
 * Concept: Sequential Processing, Pattern Memory, Loops
 * 
 * The player watches tiles light up in sequence and must repeat the pattern.
 * Each round adds more tiles to the sequence.
 */
export class Puzzle_P0_1_Scene extends BasePuzzleScene {
  // Puzzle tiles
  private tiles: Phaser.GameObjects.Container[] = [];
  private readonly tileCount = 6;
  private readonly tileSize = 70;
  
  // Game state
  private sequence: number[] = [];
  private playerSequence: number[] = [];
  private isShowingSequence: boolean = false;
  private isPlayerTurn: boolean = false;
  private currentRound: number = 1;
  private readonly maxRounds: number = 3;
  private sequenceLengths: number[] = [3, 4, 5]; // Tiles per round
  
  // UI elements
  private roundText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private progressDots!: Phaser.GameObjects.Container;
  
  // Hints
  private hints: string[] = [
    'Watch the entire pattern before moving.',
    'The sequence always stays the same within a round.',
    'Showing the pattern again at half speed...'
  ];

  constructor() {
    super({ key: 'Puzzle_P0_1_Scene' });
    this.puzzleId = 'P0-1';
    this.puzzleName = 'FOLLOW THE PATH';
    this.puzzleDescription = 'Watch the tiles light up, then repeat the sequence.';
  }

  create(): void {
    super.create();
    
    // Reset state
    this.tiles = [];
    this.sequence = [];
    this.playerSequence = [];
    this.isShowingSequence = false;
    this.isPlayerTurn = false;
    this.currentRound = 1;
    
    // Create puzzle-specific UI
    this.createPuzzleArea();
    
    // Start with a slight delay
    this.time.delayedCall(1000, () => this.startRound());
  }

  /**
   * Create the puzzle area with tiles
   */
  private createPuzzleArea(): void {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    
    // Round indicator
    this.roundText = this.add.text(centerX, 150, `ROUND ${this.currentRound} / ${this.maxRounds}`, {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
    }).setOrigin(0.5);
    
    // Status text
    this.statusText = this.add.text(centerX, height - 100, 'Get ready...', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    
    // Create tiles in a curved path formation
    this.createTiles(centerX, centerY);
    
    // Create progress indicator
    this.createProgressDots(centerX, height - 140);
  }

  /**
   * Create the interactive tiles
   */
  private createTiles(centerX: number, centerY: number): void {
    // Position tiles in an arc/path formation
    const positions = [
      { x: -150, y: -80 },
      { x: -50, y: -120 },
      { x: 50, y: -100 },
      { x: 130, y: -60 },
      { x: 100, y: 40 },
      { x: -20, y: 60 },
    ];
    
    positions.forEach((pos, index) => {
      const tile = this.createTile(centerX + pos.x, centerY + pos.y, index);
      this.tiles.push(tile);
    });
  }

  /**
   * Create a single interactive tile
   */
  private createTile(x: number, y: number, index: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Tile shadow
    const shadow = this.add.ellipse(4, 4, this.tileSize, this.tileSize * 0.7, 0x000000, 0.3);
    
    // Main tile (hexagonal-ish appearance via circle)
    const tile = this.add.circle(0, 0, this.tileSize / 2, 0x4a5568);
    tile.setStrokeStyle(3, 0x2d3748);
    tile.setData('baseColor', 0x4a5568);
    
    // Inner glow circle
    const innerGlow = this.add.circle(0, 0, this.tileSize / 2 - 8, 0x4a5568, 0.3);
    innerGlow.setData('isGlow', true);
    
    // Number label (subtle)
    const label = this.add.text(0, 0, `${index + 1}`, {
      fontSize: '18px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#1a1a2e',
    }).setOrigin(0.5).setAlpha(0.3);
    
    container.add([shadow, tile, innerGlow, label]);
    container.setData('index', index);
    container.setData('tile', tile);
    container.setData('glow', innerGlow);
    
    // Make interactive
    tile.setInteractive({ useHandCursor: true });
    
    tile.on('pointerdown', () => {
      if (this.isPlayerTurn && !this.isShowingSequence) {
        this.onTileClick(index);
      }
    });
    
    tile.on('pointerover', () => {
      if (this.isPlayerTurn && !this.isShowingSequence) {
        container.setScale(1.1);
      }
    });
    
    tile.on('pointerout', () => {
      container.setScale(1);
    });
    
    return container;
  }

  /**
   * Create progress dots to show sequence completion
   */
  private createProgressDots(x: number, y: number): void {
    this.progressDots = this.add.container(x, y);
  }

  /**
   * Update progress dots for current round
   */
  private updateProgressDots(): void {
    this.progressDots.removeAll(true);
    
    const sequenceLength = this.sequenceLengths[this.currentRound - 1];
    const dotSize = 12;
    const spacing = 20;
    const startX = -((sequenceLength - 1) * spacing) / 2;
    
    for (let i = 0; i < sequenceLength; i++) {
      const isFilled = i < this.playerSequence.length;
      const dot = this.add.circle(
        startX + i * spacing, 
        0, 
        dotSize / 2, 
        isFilled ? this.COLORS.primary : 0x4a4a6a
      );
      dot.setStrokeStyle(2, isFilled ? this.COLORS.primary : 0x3a3a5a);
      this.progressDots.add(dot);
    }
  }

  /**
   * Start a new round
   */
  private startRound(): void {
    this.roundText.setText(`ROUND ${this.currentRound} / ${this.maxRounds}`);
    this.statusText.setText('Watch carefully...');
    this.playerSequence = [];
    
    // Generate new sequence
    this.generateSequence();
    this.updateProgressDots();
    
    // Show the sequence after a brief pause
    this.time.delayedCall(800, () => this.showSequence());
  }

  /**
   * Generate a random sequence for the current round
   */
  private generateSequence(): void {
    this.sequence = [];
    const length = this.sequenceLengths[this.currentRound - 1];
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Phaser.Math.Between(0, this.tileCount - 1);
      this.sequence.push(randomIndex);
    }
  }

  /**
   * Show the sequence to the player
   */
  private showSequence(speed: number = 1): void {
    this.isShowingSequence = true;
    this.isPlayerTurn = false;
    let index = 0;
    
    const showNextTile = () => {
      if (index >= this.sequence.length) {
        this.isShowingSequence = false;
        this.isPlayerTurn = true;
        this.statusText.setText('Your turn! Repeat the sequence.');
        return;
      }
      
      const tileIndex = this.sequence[index];
      this.flashTile(tileIndex, this.COLORS.primary);
      
      this.time.delayedCall(600 / speed, () => {
        this.resetTile(tileIndex);
        this.time.delayedCall(200 / speed, showNextTile);
      });
      
      index++;
    };
    
    showNextTile();
  }

  /**
   * Flash a tile with a color
   */
  private flashTile(index: number, color: number): void {
    const container = this.tiles[index];
    const tile = container.getData('tile') as Phaser.GameObjects.Arc;
    const glow = container.getData('glow') as Phaser.GameObjects.Arc;
    
    tile.setFillStyle(color);
    glow.setFillStyle(color, 0.5);
    
    // Scale pop effect
    this.tweens.add({
      targets: container,
      scale: 1.15,
      duration: 100,
      yoyo: true,
    });
    
    // Create particle burst
    this.createTileParticles(container.x, container.y, color);
  }

  /**
   * Reset tile to default state
   */
  private resetTile(index: number): void {
    const container = this.tiles[index];
    const tile = container.getData('tile') as Phaser.GameObjects.Arc;
    const glow = container.getData('glow') as Phaser.GameObjects.Arc;
    const baseColor = tile.getData('baseColor');
    
    tile.setFillStyle(baseColor);
    glow.setFillStyle(baseColor, 0.3);
    container.setScale(1);
  }

  /**
   * Create particle effect on tile
   */
  private createTileParticles(x: number, y: number, color: number): void {
    for (let i = 0; i < 8; i++) {
      const particle = this.add.circle(x, y, 4, color);
      const angle = (i / 8) * Math.PI * 2;
      const distance = 40;
      
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.5,
        duration: 400,
        onComplete: () => particle.destroy(),
      });
    }
  }

  /**
   * Handle player clicking a tile
   */
  private onTileClick(index: number): void {
    // Flash the tile
    this.flashTile(index, this.COLORS.accent);
    
    this.time.delayedCall(200, () => {
      this.resetTile(index);
    });
    
    // Add to player sequence
    this.playerSequence.push(index);
    this.updateProgressDots();
    
    // Check if this click is correct
    const currentStep = this.playerSequence.length - 1;
    
    if (this.playerSequence[currentStep] !== this.sequence[currentStep]) {
      // Wrong!
      this.onWrongInput();
      return;
    }
    
    // Check if sequence is complete
    if (this.playerSequence.length === this.sequence.length) {
      this.onRoundComplete();
    }
  }

  /**
   * Handle wrong input
   */
  private onWrongInput(): void {
    this.isPlayerTurn = false;
    this.attempts++;
    
    // Flash all tiles red
    this.tiles.forEach((_tile, index) => {
      this.flashTile(index, this.COLORS.error);
      this.time.delayedCall(300, () => this.resetTile(index));
    });
    
    // Camera shake
    this.cameras.main.shake(200, 0.01);
    
    this.statusText.setText('Wrong! Try again...');
    this.statusText.setColor('#ef4444');
    
    // Reset and restart round after delay
    this.time.delayedCall(1500, () => {
      this.statusText.setColor('#9ca3af');
      this.playerSequence = [];
      this.updateProgressDots();
      this.showSequence();
    });
  }

  /**
   * Handle round completion
   */
  private onRoundComplete(): void {
    this.isPlayerTurn = false;
    
    // Flash all tiles green
    this.tiles.forEach((_tile, index) => {
      this.flashTile(index, this.COLORS.success);
      this.time.delayedCall(500, () => this.resetTile(index));
    });
    
    if (this.currentRound >= this.maxRounds) {
      // Puzzle complete!
      this.statusText.setText('Pattern mastered!');
      this.statusText.setColor('#22c55e');
      
      this.time.delayedCall(1000, () => {
        const stars = this.calculateStars();
        this.onPuzzleComplete(stars);
      });
    } else {
      // Next round
      this.statusText.setText('Excellent! Next round...');
      this.statusText.setColor('#22c55e');
      
      this.time.delayedCall(1500, () => {
        this.currentRound++;
        this.statusText.setColor('#9ca3af');
        this.startRound();
      });
    }
  }

  /**
   * Calculate star rating
   */
  private calculateStars(): number {
    // 3 stars: No mistakes, no hints
    // 2 stars: 1-2 mistakes or 1 hint
    // 1 star: Completed
    
    if (this.attempts === 0 && this.hintsUsed === 0) {
      return 3;
    } else if (this.attempts <= 2 && this.hintsUsed <= 1) {
      return 2;
    }
    return 1;
  }

  /**
   * Display hint based on hint number
   */
  protected displayHint(hintNumber: number): void {
    if (hintNumber === 3) {
      // Special hint: replay sequence slowly
      this.showMessage(this.hints[hintNumber - 1], this.COLORS.accent);
      this.isPlayerTurn = false;
      this.playerSequence = [];
      this.updateProgressDots();
      this.time.delayedCall(1000, () => this.showSequence(0.5));
    } else {
      this.showMessage(this.hints[hintNumber - 1], this.COLORS.accent);
    }
  }

  /**
   * Get concept name for Codex
   */
  protected getConceptName(): string {
    return 'Sequential Processing & Pattern Recognition';
  }
}
