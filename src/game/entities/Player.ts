import Phaser from 'phaser';
import { PROLOGUE_TEXTURE_KEYS } from '../config/placeholderTextures';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private moveSpeed: number = 160;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, PROLOGUE_TEXTURE_KEYS.player);
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Setup physics body
    this.setCircle(18, 0, 8);
    this.setDisplaySize(64, 96);
    this.setDepth(20);
  }

  public handleMovement(
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  wasd: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  }
): void {
    // Reset velocity
    this.setVelocity(0);

    // Handle input
    let moveX = 0;
    let moveY = 0;

    if (cursors.left.isDown || wasd.A.isDown) {
      moveX = -1;
    } else if (cursors.right.isDown || wasd.D.isDown) {
      moveX = 1;
    }

    if (cursors.up.isDown || wasd.W.isDown) {
      moveY = -1;
    } else if (cursors.down.isDown || wasd.S.isDown) {
      moveY = 1;
    }

    // Normalize diagonal movement
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.707;
      moveY *= 0.707;
    }

    // Apply velocity
    this.setVelocity(moveX * this.moveSpeed, moveY * this.moveSpeed);
  }
}