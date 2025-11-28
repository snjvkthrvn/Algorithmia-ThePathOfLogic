import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';

/**
 * Tile visual states for pattern tiles
 */
interface PatternTile {
  container: Phaser.GameObjects.Container;
  index: number;
  baseColor: number;
  isGlowing: boolean;
}

/**
 * Puzzle P0-1: Follow the Path
 * Concept: Sequential Processing, Pattern Memory, Loops
 * 
 * The player watches tiles light up in sequence and must repeat the pattern.
 * Each round adds more tiles to the sequence, teaching iteration fundamentals.
 */
export class Puzzle_P0_1_Scene extends BasePuzzleScene {
  // Puzzle tiles
  private tiles: PatternTile[] = [];
  private readonly tileCount = 6;
  private readonly tileSize = 70;
  
  // Game state
  private sequence: number[] = [];
  private playerSequence: number[] = [];
  private isShowingSequence: boolean = false;
  private isPlayerTurn: boolean = false;
  private currentRound: number = 1;
  private readonly maxRounds: number = 3;
  private sequenceLengths: number[] = [3, 4, 5];
  
  // UI elements
  private roundText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private progressDots!: Phaser.GameObjects.Container;
  private minimap!: Phaser.GameObjects.Container;
  
  // Animation timing
  private readonly glowDuration = 600;
  private readonly gapDuration = 200;
  private readonly wrongFlashDuration = 300;
  
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
    this.puzzleDescription = 'Watch the tiles light up, then repeat the sequence by clicking them.';
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
    
    // Create puzzle area
    this.createPuzzleArea();
    
    // Create minimap showing tile layout
    this.createMinimap();
    
    // Start with delay
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
    this.roundText = this.add.text(centerX, 145, `ROUND ${this.currentRound} / ${this.maxRounds}`, {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
    }).setOrigin(0.5);
    
    // Status text
    this.statusText = this.add.text(centerX, height - 95, 'Get ready...', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    
    // Create tiles in a curved path formation (as per design doc)
    this.createTiles(centerX, centerY);
    
    // Create progress indicator
    this.createProgressDots(centerX, height - 130);
  }

  /**
   * Create interactive pattern tiles
   */
  private createTiles(centerX: number, centerY: number): void {
    // Organic path positions (not a grid)
    const positions = [
      { x: -150, y: -80 },   // Tile 0 - top left
      { x: -50, y: -120 },   // Tile 1 - top center-left
      { x: 50, y: -100 },    // Tile 2 - top center-right
      { x: 130, y: -60 },    // Tile 3 - right
      { x: 100, y: 50 },     // Tile 4 - bottom right
      { x: -20, y: 70 },     // Tile 5 - bottom
    ];
    
    positions.forEach((pos, index) => {
      const tile = this.createTile(centerX + pos.x, centerY + pos.y, index);
      this.tiles.push(tile);
    });
  }

  /**
   * Create a single interactive tile
   */
  private createTile(x: number, y: number, index: number): PatternTile {
    const container = this.add.container(x, y);
    
    // Tile shadow (void effect)
    const shadow = this.add.ellipse(4, 6, this.tileSize + 4, (this.tileSize + 4) * 0.65, 0x000000, 0.4);
    
    // Main tile (circular for organic feel)
    const tile = this.add.circle(0, 0, this.tileSize / 2, 0x4a5568);
    tile.setStrokeStyle(3, 0x2d3748);
    
    // Inner glow ring (visible when active)
    const innerGlow = this.add.circle(0, 0, this.tileSize / 2 - 8, 0x4a5568, 0.3);
    innerGlow.setName('glow');
    
    // Outer glow (for highlighting)
    const outerGlow = this.add.circle(0, 0, this.tileSize / 2 + 8, 0x06b6d4, 0);
    outerGlow.setName('outerGlow');
    
    // Number label (subtle, for reference)
    const label = this.add.text(0, 0, `${index + 1}`, {
      fontSize: '18px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#2a2a4a',
    }).setOrigin(0.5).setAlpha(0.4);
    
    container.add([shadow, outerGlow, tile, innerGlow, label]);
    container.setData('tile', tile);
    container.setData('glow', innerGlow);
    container.setData('index', index);
    
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
        outerGlow.setAlpha(0.3);
      }
    });
    
    tile.on('pointerout', () => {
      if (!this.tiles[index].isGlowing) {
        container.setScale(1);
        outerGlow.setAlpha(0);
      }
    });
    
    return {
      container,
      index,
      baseColor: 0x4a5568,
      isGlowing: false,
    };
  }

  /**
   * Create progress dots showing sequence completion
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
    const dotSize = 14;
    const spacing = 22;
    const startX = -((sequenceLength - 1) * spacing) / 2;
    
    for (let i = 0; i < sequenceLength; i++) {
      const isFilled = i < this.playerSequence.length;
      
      // Dot background
      const dotBg = this.add.circle(startX + i * spacing, 0, dotSize / 2, 0x2a2a4a);
      
      // Dot fill
      const dot = this.add.circle(
        startX + i * spacing, 
        0, 
        (dotSize / 2) - 2, 
        isFilled ? this.COLORS.primary : 0x4a4a6a
      );
      
      if (isFilled) {
        // Animate fill
        this.tweens.add({
          targets: dot,
          scale: 1.2,
          duration: 100,
          yoyo: true,
        });
      }
      
      this.progressDots.add([dotBg, dot]);
    }
  }

  /**
   * Create minimap showing tile arrangement
   */
  private createMinimap(): void {
    const { width } = this.cameras.main;
    
    this.minimap = this.add.container(width - 100, 180);
    
    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x1a1a2e, 0.8);
    bg.fillRoundedRect(-50, -50, 100, 100, 8);
    bg.lineStyle(2, 0x4a4a6a);
    bg.strokeRoundedRect(-50, -50, 100, 100, 8);
    
    // Title
    const title = this.add.text(0, -60, 'TILES', {
      fontSize: '8px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#6a6a8a',
    }).setOrigin(0.5);
    
    // Mini tiles
    const miniPositions = [
      { x: -25, y: -20 },
      { x: -5, y: -30 },
      { x: 15, y: -25 },
      { x: 28, y: -15 },
      { x: 20, y: 10 },
      { x: -5, y: 18 },
    ];
    
    miniPositions.forEach((pos, i) => {
      const miniTile = this.add.circle(pos.x, pos.y, 8, 0x4a5568);
      miniTile.setStrokeStyle(1, 0x6a6a8a);
      miniTile.setName(`mini-${i}`);
      
      const label = this.add.text(pos.x, pos.y, `${i + 1}`, {
        fontSize: '6px',
        fontFamily: 'monospace',
        color: '#9ca3af',
      }).setOrigin(0.5);
      
      this.minimap.add([miniTile, label]);
    });
    
    this.minimap.add([bg, title]);
    this.minimap.sendToBack(bg);
  }

  /**
   * Start a new round
   */
  private startRound(): void {
    this.roundText.setText(`ROUND ${this.currentRound} / ${this.maxRounds}`);
    this.statusText.setText('Watch carefully...');
    this.statusText.setColor('#9ca3af');
    this.playerSequence = [];
    
    // Generate new sequence
    this.generateSequence();
    this.updateProgressDots();
    
    // Flash round indicator
    this.tweens.add({
      targets: this.roundText,
      scale: 1.1,
      duration: 200,
      yoyo: true,
    });
    
    // Show sequence after brief pause
    this.time.delayedCall(800, () => this.showSequence());
  }

  /**
   * Generate a random sequence for the current round
   */
  private generateSequence(): void {
    this.sequence = [];
    const length = this.sequenceLengths[this.currentRound - 1];
    let lastTile = -1;
    
    for (let i = 0; i < length; i++) {
      let next: number;
      do {
        next = Phaser.Math.Between(0, this.tileCount - 1);
      } while (next === lastTile); // No immediate repeats
      
      this.sequence.push(next);
      lastTile = next;
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
        this.statusText.setText('Your turn! Click the tiles in order.');
        this.statusText.setColor('#fbbf24');
        return;
      }
      
      const tileIndex = this.sequence[index];
      this.flashTile(tileIndex, this.COLORS.primary, true);
      
      // Update minimap
      this.highlightMiniTile(tileIndex);
      
      this.time.delayedCall(this.glowDuration / speed, () => {
        this.resetTile(tileIndex);
        this.resetMiniTile(tileIndex);
        this.time.delayedCall(this.gapDuration / speed, showNextTile);
      });
      
      index++;
    };
    
    showNextTile();
  }

  /**
   * Flash a tile with color and effects
   */
  private flashTile(index: number, color: number, withParticles: boolean = false): void {
    const tileData = this.tiles[index];
    const container = tileData.container;
    const tile = container.getData('tile') as Phaser.GameObjects.Arc;
    const glow = container.getData('glow') as Phaser.GameObjects.Arc;
    
    tileData.isGlowing = true;
    
    // Color change
    tile.setFillStyle(color);
    glow.setFillStyle(color, 0.5);
    
    // Scale pop
    this.tweens.add({
      targets: container,
      scale: 1.15,
      duration: 100,
      yoyo: true,
    });
    
    // Outer glow
    const outerGlow = container.getByName('outerGlow') as Phaser.GameObjects.Arc;
    if (outerGlow) {
      outerGlow.setFillStyle(color, 0.4);
      this.tweens.add({
        targets: outerGlow,
        alpha: { from: 0.4, to: 0 },
        scale: { from: 1, to: 1.5 },
        duration: this.glowDuration,
      });
    }
    
    // Particles
    if (withParticles) {
      this.createTileParticles(container.x, container.y, color);
    }
  }

  /**
   * Reset tile to default state
   */
  private resetTile(index: number): void {
    const tileData = this.tiles[index];
    const container = tileData.container;
    const tile = container.getData('tile') as Phaser.GameObjects.Arc;
    const glow = container.getData('glow') as Phaser.GameObjects.Arc;
    
    tileData.isGlowing = false;
    
    tile.setFillStyle(tileData.baseColor);
    glow.setFillStyle(tileData.baseColor, 0.3);
    container.setScale(1);
  }

  /**
   * Highlight minimap tile
   */
  private highlightMiniTile(index: number): void {
    const miniTile = this.minimap.getByName(`mini-${index}`) as Phaser.GameObjects.Arc;
    if (miniTile) {
      miniTile.setFillStyle(this.COLORS.primary);
    }
  }

  /**
   * Reset minimap tile
   */
  private resetMiniTile(index: number): void {
    const miniTile = this.minimap.getByName(`mini-${index}`) as Phaser.GameObjects.Arc;
    if (miniTile) {
      miniTile.setFillStyle(0x4a5568);
    }
  }

  /**
   * Create particle burst on tile
   */
  private createTileParticles(x: number, y: number, color: number): void {
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 50;
      
      const particle = this.add.circle(x, y, 4, color);
      particle.setDepth(10);
      
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.3,
        duration: 400,
        ease: 'Cubic.easeOut',
        onComplete: () => particle.destroy(),
      });
    }
  }

  /**
   * Handle player clicking a tile
   */
  private onTileClick(index: number): void {
    // Visual feedback
    this.flashTile(index, this.COLORS.accent);
    
    this.time.delayedCall(200, () => {
      this.resetTile(index);
    });
    
    // Add to player sequence
    this.playerSequence.push(index);
    this.updateProgressDots();
    
    // Check correctness
    const currentStep = this.playerSequence.length - 1;
    
    if (this.playerSequence[currentStep] !== this.sequence[currentStep]) {
      this.onWrongInput();
      return;
    }
    
    // Play success sound placeholder
    // TODO: Add actual sound
    
    // Check if sequence complete
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
    this.tiles.forEach((tileData) => {
      this.flashTile(tileData.index, this.COLORS.error);
      this.time.delayedCall(this.wrongFlashDuration, () => {
        this.resetTile(tileData.index);
      });
    });
    
    // Camera shake
    this.cameras.main.shake(200, 0.01);
    
    // Status update
    this.statusText.setText('Wrong! Try again...');
    this.statusText.setColor('#ef4444');
    
    // Show which tile was expected as hint
    this.time.delayedCall(800, () => {
      const expectedTile = this.sequence[this.playerSequence.length - 1];
      this.flashTile(expectedTile, this.COLORS.accent);
      this.time.delayedCall(400, () => this.resetTile(expectedTile));
    });
    
    // Reset and replay
    this.time.delayedCall(1800, () => {
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
    this.tiles.forEach((tileData, i) => {
      this.time.delayedCall(i * 50, () => {
        this.flashTile(tileData.index, this.COLORS.success, true);
        this.time.delayedCall(500, () => this.resetTile(tileData.index));
      });
    });
    
    if (this.currentRound >= this.maxRounds) {
      // Puzzle complete!
      this.statusText.setText('🎉 Pattern mastered!');
      this.statusText.setColor('#22c55e');
      
      this.time.delayedCall(1200, () => {
        const stars = this.calculateStars();
        this.onPuzzleComplete(stars);
      });
    } else {
      // Next round
      this.statusText.setText('✓ Excellent! Next round...');
      this.statusText.setColor('#22c55e');
      
      this.time.delayedCall(1500, () => {
        this.currentRound++;
        this.statusText.setColor('#9ca3af');
        this.startRound();
      });
    }
  }

  /**
   * Calculate star rating based on performance
   */
  private calculateStars(): number {
    // 3 stars: No mistakes, no hints
    if (this.attempts === 0 && this.hintsUsed === 0) return 3;
    
    // 2 stars: 1-2 mistakes or 1 hint
    if (this.attempts <= 2 && this.hintsUsed <= 1) return 2;
    
    // 1 star: Completed
    return 1;
  }

  /**
   * Display hint based on hint number
   */
  protected displayHint(hintNumber: number): void {
    if (hintNumber === 3 && this.isPlayerTurn) {
      // Special hint: replay sequence slowly
      this.showMessage(this.hints[hintNumber - 1], this.COLORS.accent);
      this.isPlayerTurn = false;
      this.playerSequence = [];
      this.updateProgressDots();
      this.time.delayedCall(1000, () => this.showSequence(0.5));
    } else {
      this.showMessage(this.hints[Math.min(hintNumber - 1, this.hints.length - 1)], this.COLORS.accent);
    }
  }

  /**
   * Get concept name for Codex
   */
  protected getConceptName(): string {
    return 'Sequential Processing & Pattern Recognition';
  }
}
