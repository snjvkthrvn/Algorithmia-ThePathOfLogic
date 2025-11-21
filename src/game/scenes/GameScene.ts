import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private readonly moveSpeed = 160;

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

    // Create placeholder player (circle for now)
    this.player = this.physics.add.sprite(width / 2, height / 2, '');
    this.player.setCircle(16);
    this.player.setDisplaySize(32, 32);

    // Draw a simple circle as placeholder
    const graphics = this.add.graphics();
    graphics.fillStyle(0x667eea, 1);
    graphics.fillCircle(width / 2, height / 2, 16);

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
  }

  update(): void {
    if (!this.player || !this.cursors || !this.wasd) return;

    // Reset velocity
    this.player.setVelocity(0);

    // Handle input
    let moveX = 0;
    let moveY = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      moveX = -1;
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      moveX = 1;
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      moveY = -1;
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      moveY = 1;
    }

    // Normalize diagonal movement
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.707;
      moveY *= 0.707;
    }

    // Apply velocity
    this.player.setVelocity(moveX * this.moveSpeed, moveY * this.moveSpeed);
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
}
