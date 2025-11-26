import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';

/**
 * Puzzle AP1: Fix the Farmland
 * Concept: Sorting Algorithms (Bubble Sort, Selection Sort)
 * 
 * The player must sort numbered tiles from 0-7 by swapping adjacent pairs.
 */
export default class Puzzle_AP1_Scene extends BasePuzzleScene {
  // Puzzle elements
  private tiles: Phaser.GameObjects.Container[] = [];
  private numbers: number[] = [];
  private readonly tileCount = 8;
  private readonly tileSize = 70;
  private readonly tileSpacing = 80;
  
  // Game state
  private selectedIndex: number | null = null;
  private swapCount: number = 0;
  private isAnimating: boolean = false;
  
  // UI
  private swapCountText!: Phaser.GameObjects.Text;
  private feedbackText!: Phaser.GameObjects.Text;
  
  // Hints
  private hints: string[] = [
    'Compare neighbors - if out of order, swap them!',
    'Find where 0 should go first...',
    'Bubble the largest values to the right!'
  ];

  constructor() {
    super({ key: 'Puzzle_AP1_Scene' });
    this.puzzleId = 'AP1';
    this.puzzleName = 'FIX THE FARMLAND';
    this.puzzleDescription = 'Sort the crop IDs from 0 to 7 by swapping adjacent tiles.';
  }

  create(): void {
    super.create();
    
    // Reset state
    this.tiles = [];
    this.numbers = this.generateScrambledArray();
    this.selectedIndex = null;
    this.swapCount = 0;
    this.isAnimating = false;
    
    // Create puzzle-specific UI
    this.createPuzzleArea();
  }

  /**
   * Generate a scrambled array
   */
  private generateScrambledArray(): number[] {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7];
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Create the puzzle area with tiles
   */
  private createPuzzleArea(): void {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    
    // Swap count display
    this.swapCountText = this.add.text(centerX, 150, 'Swaps: 0', {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    
    // Feedback text
    this.feedbackText = this.add.text(centerX, height - 100, 'Click a tile to select, then click an adjacent tile to swap.', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    
    // Create rail/track visual
    this.createRail(centerX, centerY);
    
    // Create tiles
    this.createTiles(centerX, centerY);
    
    // Target position indicators
    this.createTargetIndicators(centerX, centerY + 60);
  }

  /**
   * Create the rail/track background
   */
  private createRail(centerX: number, centerY: number): void {
    const railWidth = (this.tileCount - 1) * this.tileSpacing + this.tileSize + 40;
    const startX = centerX - railWidth / 2;
    
    const rail = this.add.graphics();
    
    // Rail background
    rail.fillStyle(0x2a2a4a, 1);
    rail.fillRoundedRect(startX, centerY - this.tileSize / 2 - 10, railWidth, this.tileSize + 20, 8);
    
    // Rail border
    rail.lineStyle(3, 0x4a4a6a, 1);
    rail.strokeRoundedRect(startX, centerY - this.tileSize / 2 - 10, railWidth, this.tileSize + 20, 8);
    
    // Track lines
    rail.lineStyle(2, 0x3a3a5a, 0.5);
    rail.lineBetween(startX + 10, centerY - 5, startX + railWidth - 10, centerY - 5);
    rail.lineBetween(startX + 10, centerY + 5, startX + railWidth - 10, centerY + 5);
  }

  /**
   * Create target position indicators
   */
  private createTargetIndicators(centerX: number, y: number): void {
    const startX = centerX - ((this.tileCount - 1) * this.tileSpacing) / 2;
    
    for (let i = 0; i < this.tileCount; i++) {
      const x = startX + i * this.tileSpacing;
      
      // Target number (what should be here)
      this.add.text(x, y, `${i}`, {
        fontSize: '12px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#4a4a6a',
      }).setOrigin(0.5);
    }
    
    // Label
    this.add.text(centerX, y + 25, '↑ TARGET ORDER ↑', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#4a4a6a',
    }).setOrigin(0.5);
  }

  /**
   * Create the sortable tiles
   */
  private createTiles(centerX: number, centerY: number): void {
    const startX = centerX - ((this.tileCount - 1) * this.tileSpacing) / 2;
    
    this.numbers.forEach((num, index) => {
      const x = startX + index * this.tileSpacing;
      const tile = this.createTile(x, centerY, num, index);
      this.tiles.push(tile);
    });
  }

  /**
   * Create a single tile
   */
  private createTile(x: number, y: number, value: number, index: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Shadow
    const shadow = this.add.rectangle(3, 3, this.tileSize, this.tileSize, 0x000000, 0.3);
    shadow.setOrigin(0.5);
    
    // Tile background (wooden appearance)
    const bg = this.add.rectangle(0, 0, this.tileSize, this.tileSize, 0x8b7355);
    bg.setOrigin(0.5);
    bg.setStrokeStyle(3, 0x5d4e37);
    bg.setData('baseColor', 0x8b7355);
    
    // Wood grain effect
    const grain = this.add.graphics();
    grain.lineStyle(1, 0x6b5344, 0.3);
    grain.lineBetween(-25, -20, 25, -20);
    grain.lineBetween(-25, 0, 25, 0);
    grain.lineBetween(-25, 20, 25, 20);
    
    // Brass number plate
    const plate = this.add.rectangle(0, 0, 40, 40, 0xb8860b);
    plate.setOrigin(0.5);
    plate.setStrokeStyle(2, 0x8b6914);
    
    // Number
    const numText = this.add.text(0, 0, `${value}`, {
      fontSize: '24px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#1a1a2e',
    }).setOrigin(0.5);
    
    container.add([shadow, bg, grain, plate, numText]);
    container.setData('index', index);
    container.setData('value', value);
    container.setData('bg', bg);
    container.setSize(this.tileSize, this.tileSize);
    
    // Make interactive
    container.setInteractive({ useHandCursor: true });
    
    container.on('pointerdown', () => {
      if (!this.isAnimating) {
        this.handleTileClick(index);
      }
    });
    
    container.on('pointerover', () => {
      if (!this.isAnimating) {
        this.tweens.add({
          targets: container,
          y: y - 5,
          duration: 100,
        });
      }
    });
    
    container.on('pointerout', () => {
      if (!this.isAnimating && this.selectedIndex !== index) {
        this.tweens.add({
          targets: container,
          y: y,
          duration: 100,
        });
      }
    });
    
    return container;
  }

  /**
   * Handle tile click
   */
  private handleTileClick(index: number): void {
    const tile = this.tiles[index];
    const bg = tile.getData('bg') as Phaser.GameObjects.Rectangle;
    
    if (this.selectedIndex === null) {
      // First selection
      this.selectedIndex = index;
      bg.setFillStyle(0xf97316); // Orange highlight
      tile.setY(tile.y - 10);
      this.feedbackText.setText('Now click an adjacent tile to swap!');
    } else if (this.selectedIndex === index) {
      // Deselect
      bg.setFillStyle(bg.getData('baseColor'));
      tile.setY(this.cameras.main.height / 2 + 20);
      this.selectedIndex = null;
      this.feedbackText.setText('Click a tile to select, then click an adjacent tile to swap.');
    } else {
      // Try to swap
      if (this.isAdjacent(this.selectedIndex, index)) {
        this.swapTiles(this.selectedIndex, index);
      } else {
        this.feedbackText.setText('You can only swap adjacent tiles!');
        this.cameras.main.shake(100, 0.005);
      }
    }
  }

  /**
   * Check if two indices are adjacent
   */
  private isAdjacent(i: number, j: number): boolean {
    return Math.abs(i - j) === 1;
  }

  /**
   * Swap two tiles with animation
   */
  private swapTiles(i: number, j: number): void {
    this.isAnimating = true;
    
    const tileA = this.tiles[i];
    const tileB = this.tiles[j];
    const bgA = tileA.getData('bg') as Phaser.GameObjects.Rectangle;
    const bgB = tileB.getData('bg') as Phaser.GameObjects.Rectangle;
    
    // Store positions
    const posA = tileA.x;
    const posB = tileB.x;
    const baseY = this.cameras.main.height / 2 + 20;
    
    // Animate swap
    this.tweens.add({
      targets: tileA,
      x: posB,
      y: baseY - 20,
      duration: 200,
      ease: 'Quad.easeInOut',
    });
    
    this.tweens.add({
      targets: tileB,
      x: posA,
      y: baseY + 20,
      duration: 200,
      ease: 'Quad.easeInOut',
      onComplete: () => {
        // Animate back to rail
        this.tweens.add({
          targets: [tileA, tileB],
          y: baseY,
          duration: 100,
        });
        
        // Update state
        [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        [this.numbers[i], this.numbers[j]] = [this.numbers[j], this.numbers[i]];
        
        tileA.setData('index', j);
        tileB.setData('index', i);
        
        // Reset colors
        bgA.setFillStyle(bgA.getData('baseColor'));
        bgB.setFillStyle(bgB.getData('baseColor'));
        
        this.selectedIndex = null;
        this.swapCount++;
        this.swapCountText.setText(`Swaps: ${this.swapCount}`);
        this.feedbackText.setText('Click a tile to select, then click an adjacent tile to swap.');
        
        this.isAnimating = false;
        
        // Check win
        this.checkWinCondition();
      },
    });
  }

  /**
   * Check if array is sorted
   */
  private checkWinCondition(): void {
    const isSorted = this.numbers.every((val, idx) => val === idx);
    
    if (isSorted) {
      this.feedbackText.setText('FARMLAND RESTORED!');
      this.feedbackText.setColor('#22c55e');
      
      // Highlight all tiles green
      this.tiles.forEach((tile, i) => {
        const bg = tile.getData('bg') as Phaser.GameObjects.Rectangle;
        this.tweens.add({
          targets: bg,
          fillColor: { from: bg.getData('baseColor'), to: 0x22c55e },
          duration: 200,
          delay: i * 100,
        });
      });
      
      this.time.delayedCall(1500, () => {
        const stars = this.calculateStars();
        this.onPuzzleComplete(stars);
      });
    }
  }

  /**
   * Calculate star rating based on swap count
   */
  private calculateStars(): number {
    // Optimal bubble sort for 8 elements = 28 comparisons max
    // But random can be much less
    if (this.swapCount <= 12) return 3;
    if (this.swapCount <= 20) return 2;
    return 1;
  }

  /**
   * Display hint based on hint number
   */
  protected displayHint(hintNumber: number): void {
    this.showMessage(this.hints[hintNumber - 1], this.COLORS.accent);
    
    // Visual hint: highlight first unsorted position
    if (hintNumber >= 2) {
      for (let i = 0; i < this.numbers.length; i++) {
        if (this.numbers[i] !== i) {
          const tile = this.tiles[i];
          this.tweens.add({
            targets: tile,
            scale: 1.1,
            duration: 200,
            yoyo: true,
            repeat: 2,
          });
          break;
        }
      }
    }
  }

  /**
   * Get concept name for Codex
   */
  protected getConceptName(): string {
    return 'Sorting Algorithms';
  }
}
