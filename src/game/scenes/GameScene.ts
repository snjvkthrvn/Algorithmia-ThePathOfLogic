import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {
  private player?: Player;
  private walls?: Phaser.Physics.Arcade.StaticGroup;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    const bg = this.add.rectangle(0, 0, width, height, 0x3d5a80);
    bg.setOrigin(0, 0);

    // Add a grid for visual reference
    this.createGrid(width, height);

    // Create physics group for walls
    this.walls = this.physics.add.staticGroup();

    // Create a simple tile world
    this.createTileWorld();

    // Test: Display loaded sprite
    

    // Create placeholder player (circle for now)
    // Create player
    this.player = new Player(this, width / 2, height / 2);
    this.physics.add.collider(this.player, this.walls!);

    // Setup camera to follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Draw a simple circle as placeholder
    //const graphics = this.add.graphics();
    //graphics.fillStyle(0x667eea, 1);
    //graphics.fillCircle(width / 2, height / 2, 16);

    // Setup input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D') as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };
    }

    // Add UI text
    this.add.text(16, 16, 'Use WASD or Arrow Keys to Move', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 5 },
    });

    this.add.text(16, height - 36, 'Press ESC to return to menu', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 5 },
    });

    // ESC to return to menu
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
    
    // P to start puzzle (for testing)
    this.input.keyboard?.on('keydown-P', () => {
      this.scene.start('Puzzle_P0_1_Scene');
});
  }

  update(): void {
  if (!this.player || !this.cursors || !this.wasd) return;

  // Delegate movement to Player class
  this.player.handleMovement(this.cursors, this.wasd);
}

  private createGrid(width: number, height: number): void {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x2a4058, 0.5);

    // Vertical lines
    for (let x = 0; x < width; x += 64) {
      graphics.lineBetween(x, 0, x, height);
    }

    // Horizontal lines
    for (let y = 0; y < height; y += 64) {
      graphics.lineBetween(0, y, width, y);
    }
  }

  private createTileWorld(): void {
  const tileSize = 64;
  
  // Create a 10x10 grid of floor tiles
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      
      // Place floor tile
      this.add.image(x, y, 'floor-tile').setOrigin(0, 0);
      
      // Add walls around the border
      if (row === 0 || row === 9 || col === 0 || col === 9) {
        const wall = this.walls!.create(x, y, 'wall-tile').setOrigin(0, 0);
        wall.refreshBody();
      }
    }
  }
}
}
