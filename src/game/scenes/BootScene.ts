import Phaser from 'phaser';
import { registerProloguePlaceholders } from '../config/placeholderTextures';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Load initial assets needed for loading screen
    this.createLoadingBar();
    this.load.image('player-test', 'assets/sprites/characters/player-test.png');
    this.load.image('tileset-test', 'assets/sprites/environment/tileset-test.png');
    this.load.image('floor-tile', 'assets/sprites/environment/floor-tile.png');
    this.load.image('wall-tile', 'assets/sprites/environment/wall-tile.png');
    this.load.image('shard-cyan', 'assets/puzzles/fractured-sentinel/shard-cyan.png');
    this.load.image('shard-purple', 'assets/puzzles/fractured-sentinel/shard-purple.png');
    this.load.image('shard-orange', 'assets/puzzles/fractured-sentinel/shard-orange.png');
    this.load.image('sentinel-frame', 'assets/puzzles/fractured-sentinel/sentinel-frame.png');
    this.load.image('platform-tile', 'assets/puzzles/fractured-sentinel/platform-tile.png');
  }

  create(): void {
    registerProloguePlaceholders(this);
    // Once booting is complete, move to menu
    this.scene.start('MenuScene');
  }

  private createLoadingBar(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Loading text
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      fontSize: '20px',
      color: '#ffffff',
    });
    loadingText.setOrigin(0.5, 0.5);

    // Progress bar background
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);

    // Update progress bar as assets load
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x667eea, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
  }
}
