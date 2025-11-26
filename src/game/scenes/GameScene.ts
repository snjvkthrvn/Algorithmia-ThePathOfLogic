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
  private sentinel!: Phaser.Physics.Arcade.Sprite;
  private interactText?: Phaser.GameObjects.Text;

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
    this.player = new Player(this, 320, 320); // Spawn at col 2, row 2 - safe inside maze
    this.physics.add.collider(this.player, this.walls!);
    // Create the Sentinel (P0-2 Trigger)
    // Place it near the bottom right (Row 7, Col 7 approx)
    // Create the Sentinel (P0-2 Trigger)
    // Move to 480, 480 (Center of the 64x64 grid tile)
    this.sentinel = this.physics.add.sprite(480, 480, 'sentinel-frame');
    this.sentinel.setScale(0.25); 
    this.sentinel.setImmovable(true);
    
    // FIX: Shrink the hitbox so player can get closer
    // The original image is 256x256. We set the body to 128x128 (half size).
    // When scaled by 0.25, this creates a tight 32x32 collision box.
    this.sentinel.setSize(128, 128); 
    this.sentinel.setOffset(64, 64); // Center the new hitbox ((256-128)/2 = 64)

    // Add collision
    this.physics.add.collider(this.player, this.sentinel);
    
    // Interaction Text (Hidden by default)
    this.interactText = this.add.text(this.sentinel.x, this.sentinel.y - 40, 'Press SPACE', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 4 }
    }).setOrigin(0.5).setVisible(false);

    // Add collision
    this.physics.add.collider(this.player, this.sentinel);
    
    
    this.cameras.main.centerOn(320, 320);

    // Setup camera to follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
     // 10x10 tiles * 64px = 640x640 world

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

    // 2 to start puzzle P0-2 (for testing)
this.input.keyboard?.on('keydown-TWO', () => {
  this.scene.start('Puzzle_P0_2_Scene');
});
  }

  update(): void {
  if (!this.player || !this.cursors || !this.wasd) return;

  // Delegate movement to Player class
  this.player.handleMovement(this.cursors, this.wasd);
  // Check if player reached the right edge to go to Room 2
  // Check if player reached the door to Room 2 (right side, middle rows)
  if (this.player.x > 600 && this.player.y > 240 && this.player.y < 360) {
    this.scene.start('Room2Scene');
  }
  // Check distance to Sentinel
    if (this.sentinel && this.interactText) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.sentinel.x, this.sentinel.y);
      
      if (distance < 60) {
        // Player is close
        this.interactText.setVisible(true);
        
        // Check for SPACE key
        if (this.cursors.space.isDown) {
          this.scene.start('Puzzle_P0_2_Scene');
        }
      } else {
        // Player is far
        this.interactText.setVisible(false);
      }
    }
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
      // Add walls around the border AND interior maze walls
    const isWall = 
      row === 0 || row === 9 || col === 0 || // Border walls (left, top, bottom)
      (col === 9 && (row < 4 || row > 5)) || // Right wall with gap for door
      (row === 3 && col >= 2 && col <= 7) || // Horizontal wall
      (row === 6 && col >= 2 && col <= 7) || // Horizontal wall
      (col === 5 && row >= 1 && row <= 3) || // Vertical wall
      (col === 3 && row >= 6 && row <= 8);   // Vertical wall

      if (isWall) {
        const wall = this.walls!.create(x, y, 'wall-tile').setOrigin(0, 0);
        wall.refreshBody();
      }
    }
  }
}
}
