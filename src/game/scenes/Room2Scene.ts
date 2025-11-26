import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class Room2Scene extends Phaser.Scene {
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
    super({ key: 'Room2Scene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Different background color for Room 2
    const bg = this.add.rectangle(0, 0, width, height, 0x5a3d80);
    bg.setOrigin(0, 0);

    // Create physics group for walls
    this.walls = this.physics.add.staticGroup();

    // Create tile world for Room 2
    this.createTileWorld();

    // Create player
    this.player = new Player(this, 128, 128); // Spawn at col 2, row 2 - safe inside maze
    this.physics.add.collider(this.player, this.walls!);

    // Setup camera
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

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

    // UI text
    this.add.text(16, 16, 'Room 2: Array Plains Entrance', {
      fontSize: '18px',
      color: '#FFD700',
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
  }

  update(): void {
    if (!this.player || !this.cursors || !this.wasd) return;
    this.player.handleMovement(this.cursors, this.wasd);

    // Check if player reached the left edge to go back to Room 1
    if (this.player.x < 32) {
      this.scene.start('GameScene');
    }
  }

  private createTileWorld(): void {
    const tileSize = 64;
    
    // Create a 10x10 grid with different layout
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const x = col * tileSize;
        const y = row * tileSize;
        
        // Place floor tile
        this.add.image(x, y, 'floor-tile').setOrigin(0, 0);
        
        // Different wall pattern for Room 2
        const isWall = 
          row === 0 || row === 9 || col === 9 || // Border (no wall on left for entrance)
          (col === 0 && (row < 4 || row > 5)) || // Left wall with gap for door
          (row === 5 && col >= 3 && col <= 6);   // Interior obstacle

        if (isWall) {
          const wall = this.walls!.create(x, y, 'wall-tile').setOrigin(0, 0);
          wall.refreshBody();
        }
      }
    }
  }
}