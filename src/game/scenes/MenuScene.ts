import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    const bg = this.add.rectangle(0, 0, width, height, 0x2d2d2d);
    bg.setOrigin(0, 0);

    // Title
    const title = this.add.text(width / 2, height / 3, 'ALGORITHMIA', {
      fontSize: '48px',
      color: '#667eea',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5, 0.5);

    // Subtitle
    const subtitle = this.add.text(
      width / 2,
      height / 3 + 60,
      'The Path of Logic',
      {
        fontSize: '24px',
        color: '#ffffff',
      }
    );
    subtitle.setOrigin(0.5, 0.5);

    // Start button
    const startButton = this.add.text(width / 2, height / 2 + 50, 'START GAME', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#667eea',
      padding: { x: 20, y: 10 },
    });
    startButton.setOrigin(0.5, 0.5);
    startButton.setInteractive({ useHandCursor: true });

    startButton.on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#764ba2' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#667eea' });
    });

    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // Instructions
    const instructions = this.add.text(
      width / 2,
      height - 100,
      'Use WASD or Arrow Keys to Move',
      {
        fontSize: '16px',
        color: '#aaaaaa',
      }
    );
    instructions.setOrigin(0.5, 0.5);
  }
}
