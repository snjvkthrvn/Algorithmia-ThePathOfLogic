import Phaser from 'phaser';

export class Puzzle_P0_1_Scene extends Phaser.Scene {
  private tiles: Phaser.GameObjects.Rectangle[] = [];
  private readonly gridSize = 3; // 3x3 grid
  private readonly tileSize = 80;
  private sequence: number[] = [];
  private playerSequence: number[] = [];
  private isShowingSequence: boolean = false;
  private sequenceLength: number = 3;

  constructor() {
    super({ key: 'Puzzle_P0_1_Scene' });
  }

  create(): void {
    this.tiles = [];
    this.playerSequence = [];
    // Background
    const bg = this.add.rectangle(0, 0, 800, 600, 0x1a1a2e);
    bg.setOrigin(0, 0);

    // Title text
    this.add.text(400, 50, 'Puzzle: Follow the Path', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Instructions
    this.add.text(400, 100, 'Watch the sequence, then repeat it', {
      fontSize: '18px',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    this.createTileGrid();
    this.generateSequence();
    // Show the sequence after a short delay
    this.time.delayedCall(1000, () => {
    this.showSequence();
    // R key to retry puzzle
    this.input.keyboard?.on('keydown-R', () => {
    this.scene.restart();
    });
});
  }

  private createTileGrid(): void {
  const startX = 400 - (this.gridSize * this.tileSize) / 2;
  const startY = 250;

  for (let row = 0; row < this.gridSize; row++) {
    for (let col = 0; col < this.gridSize; col++) {
      const x = startX + col * this.tileSize + this.tileSize / 2;
      const y = startY + row * this.tileSize + this.tileSize / 2;

      // Create tile
        // Create tile
    const tile = this.add.rectangle(x, y, this.tileSize - 10, this.tileSize - 10, 0x4a5568);
    const tileIndex = this.tiles.length; // Capture index BEFORE pushing
    this.tiles.push(tile);

    // Make tile interactive
    tile.setInteractive();
    tile.on('pointerdown', () => this.onTileClick(tileIndex));
      
    }
    
  }
  
}

private generateSequence(): void {
  this.sequence = [];
  for (let i = 0; i < this.sequenceLength; i++) {
    const randomIndex = Phaser.Math.Between(0, this.tiles.length - 1);
    this.sequence.push(randomIndex);
  }
  console.log('Generated sequence:', this.sequence);
}

private showSequence(): void {
  this.isShowingSequence = true;
  let index = 0;

  const showNextTile = () => {
    if (index >= this.sequence.length) {
      this.isShowingSequence = false;
      return;
    }

    const tileIndex = this.sequence[index];
    const tile = this.tiles[tileIndex];

    // Light up the tile
    tile.setFillStyle(0xfbbf24);

    // Dim it after 500ms
    this.time.delayedCall(500, () => {
      tile.setFillStyle(0x4a5568);

      // Show next tile after 200ms pause
      this.time.delayedCall(200, showNextTile);
    });

    index++;
  };

  showNextTile();
}
private onTileClick(index: number): void {
  // Don't allow clicks while showing sequence
  if (this.isShowingSequence) return;

  // Flash the clicked tile
  const tile = this.tiles[index];
  tile.setFillStyle(0xfbbf24);
  this.time.delayedCall(200, () => {
    tile.setFillStyle(0x4a5568);
  });

  // Add to player's sequence
  this.playerSequence.push(index);

  // Check if player completed the sequence
  if (this.playerSequence.length === this.sequence.length) {
    this.checkSequence();
  }
}
private checkSequence(): void {
  // Compare player sequence with correct sequence
  let correct = true;
  for (let i = 0; i < this.sequence.length; i++) {
    if (this.playerSequence[i] !== this.sequence[i]) {
      correct = false;
      break;
    }
  }

  if (correct) {
    // Success!
    this.add.text(400, 500, 'Correct! Press SPACE to continue', {
      fontSize: '24px',
      color: '#10b981',
    }).setOrigin(0.5);
  } else {
    // Failure
    this.add.text(400, 500, 'Wrong! Press R to retry', {
      fontSize: '24px',
      color: '#ef4444',
    }).setOrigin(0.5);
  }
}
}