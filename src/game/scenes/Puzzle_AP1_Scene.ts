import Phaser from 'phaser';

export default class Puzzle_AP1_Scene extends Phaser.Scene {
  private tiles: Phaser.GameObjects.Container[] = [];
  private numbers: number[] = [4, 1, 3, 5, 0, 2]; // The unsorted array
  private selectedIndex: number | null = null;
  private feedbackText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'Puzzle_AP1_Scene' });
  }

  create() {
    // 1. FORCE CAMERA RESET
    // This ensures we aren't zoomed in or scrolled away from (0,0)
    this.cameras.main.setScroll(0, 0);
    this.cameras.main.setZoom(1);
    this.cameras.main.setBackgroundColor('#1a1a1a');

    // 2. GET SCREEN DIMENSIONS
    const { width, height } = this.scale;
    const centerX = width / 2;
    const centerY = height / 2;

    // 3. UI TEXT (Centered)
    this.add.text(centerX, centerY - 200, 'Puzzle: Fix the Farmland', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 150, 'Sort the crop IDs from 0 to 5.\nClick two blocks to swap them.', {
      fontSize: '18px',
      color: '#aaaaaa',
      align: 'center'
    }).setOrigin(0.5);

    this.feedbackText = this.add.text(centerX, centerY + 150, '', {
      fontSize: '20px',
      color: '#ffff00'
    }).setOrigin(0.5);

    // 4. RENDER THE ARRAY
    this.renderArray(centerX, centerY);

    // 5. EXIT BUTTON (Temporary escape hatch)
    this.add.text(width - 100, 50, '[ EXIT ]', {
      fontSize: '20px',
      color: '#ff5555'
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('Room2Scene');
    });
  }

  private renderArray(centerX: number, centerY: number) {
    // Clear existing tiles
    this.tiles.forEach(tile => tile.destroy());
    this.tiles = [];

    const spacing = 80;
    const startX = centerX - ((this.numbers.length - 1) * spacing) / 2;

    this.numbers.forEach((num, index) => {
      // Create Container for block + text
      const container = this.add.container(startX + index * spacing, centerY);
      
      // Block graphics
      const bg = this.add.rectangle(0, 0, 60, 60, 0x4a90e2);
      bg.setStrokeStyle(2, 0xffffff);

      // Number text
      const text = this.add.text(0, 0, num.toString(), {
        fontSize: '32px',
        color: '#ffffff'
      }).setOrigin(0.5);

      // Interactive Zone
      const zone = this.add.zone(0, 0, 60, 60)
        .setRectangleDropZone(60, 60)
        .setInteractive({ useHandCursor: true });

      zone.on('pointerdown', () => this.handleTileClick(index, bg));

      container.add([bg, text, zone]);
      this.tiles.push(container);
    });
  }

  private handleTileClick(index: number, bg: Phaser.GameObjects.Rectangle) {
    if (this.selectedIndex === null) {
      // Select first tile
      this.selectedIndex = index;
      bg.setFillStyle(0xe24a4a); // Highlight Red
      this.feedbackText.setText('Select second block to swap.');
    } else if (this.selectedIndex === index) {
      // Deselect
      this.selectedIndex = null;
      this.renderArray(this.scale.width / 2, this.scale.height / 2); // Redraw to reset color
      this.feedbackText.setText('');
    } else {
      // Swap!
      this.swap(this.selectedIndex, index);
      this.selectedIndex = null;
      this.renderArray(this.scale.width / 2, this.scale.height / 2);
      this.checkWinCondition();
    }
  }

  private swap(i: number, j: number) {
    const temp = this.numbers[i];
    this.numbers[i] = this.numbers[j];
    this.numbers[j] = temp;
  }

  private checkWinCondition() {
    // Check if sorted
    const sorted = [...this.numbers].sort((a, b) => a - b);
    const isSorted = this.numbers.every((val, index) => val === sorted[index]);

    if (isSorted) {
      this.feedbackText.setText('FARM RESTORED! (Auto-exiting in 2s)');
      this.feedbackText.setColor('#00ff00');
      
      this.time.delayedCall(2000, () => {
        // Here we would ideally trigger a "Success" state in global state
        this.scene.start('ConceptBridgeScene', { 
            concept: 'Selection Sort', 
            nextScene: 'Room2Scene' 
        });
      });
    } else {
      this.feedbackText.setText('');
    }
  }
}