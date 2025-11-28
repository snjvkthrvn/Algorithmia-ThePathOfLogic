import Phaser from 'phaser';

/**
 * Player direction for sprite animations
 */
export type PlayerDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Player state
 */
export type PlayerState = 'idle' | 'walking' | 'interacting';

/**
 * Player class - Main character entity
 * Handles movement, animations, and interactions
 */
export class Player extends Phaser.Physics.Arcade.Sprite {
  private moveSpeed: number = 160;
  private currentDirection: PlayerDirection = 'down';
  private currentState: PlayerState = 'idle';
  
  // Visual elements for placeholder graphics
  private directionIndicator?: Phaser.GameObjects.Graphics;
  private bodyGraphics?: Phaser.GameObjects.Container;
  
  // Animation frame tracking
  private walkFrame: number = 0;
  private walkTimer: number = 0;
  private readonly WALK_FRAME_DELAY = 150; // ms between walk frames

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Try to use a sprite texture, fall back to placeholder
    const textureKey = scene.textures.exists('player-placeholder') 
      ? 'player-placeholder' 
      : 'player-test';
    
    super(scene, x, y, textureKey);
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Setup physics body
    this.setCircle(16);
    this.setOffset(16, 24); // Offset to center collision with feet
    this.setDisplaySize(64, 64);
    this.setDepth(10);
    
    // Create placeholder visual if texture doesn't exist or is a test texture
    if (!scene.textures.exists('player-placeholder') || textureKey === 'player-test') {
      this.createPlaceholderVisual();
    }
  }

  /**
   * Create a placeholder visual representation of the player
   * This will be replaced with actual sprites later
   */
  private createPlaceholderVisual(): void {
    // Hide the default sprite if using placeholder
    this.setAlpha(0);
    
    // Create container for player visuals
    this.bodyGraphics = this.scene.add.container(this.x, this.y);
    this.bodyGraphics.setDepth(this.depth);
    
    // Body shadow
    const shadow = this.scene.add.ellipse(0, 24, 40, 16, 0x000000, 0.3);
    
    // Body (simple humanoid shape)
    const body = this.scene.add.graphics();
    
    // Cloak/body (purple-blue gradient feel)
    body.fillStyle(0x4a4a8a, 1);
    body.fillRoundedRect(-16, -8, 32, 40, 8);
    
    // Inner cloak detail
    body.fillStyle(0x3a3a6a, 1);
    body.fillRoundedRect(-12, -4, 24, 32, 6);
    
    // Head
    body.fillStyle(0x8b7355, 1); // Skin tone placeholder
    body.fillCircle(0, -16, 12);
    
    // Hair/hood
    body.fillStyle(0x2a2a4a, 1);
    body.beginPath();
    body.arc(0, -16, 12, Math.PI, 0, false);
    body.fillPath();
    
    // Eyes (simple)
    body.fillStyle(0x06b6d4, 1);
    body.fillCircle(-4, -16, 2);
    body.fillCircle(4, -16, 2);
    
    // Direction indicator (arrow showing facing direction)
    this.directionIndicator = this.scene.add.graphics();
    this.updateDirectionIndicator();
    
    // Feet (for walking animation)
    const leftFoot = this.scene.add.ellipse(-6, 28, 10, 6, 0x1a1a2e);
    leftFoot.setName('leftFoot');
    const rightFoot = this.scene.add.ellipse(6, 28, 10, 6, 0x1a1a2e);
    rightFoot.setName('rightFoot');
    
    // Add all to container
    this.bodyGraphics.add([shadow, body, this.directionIndicator, leftFoot, rightFoot]);
  }

  /**
   * Update direction indicator arrow
   */
  private updateDirectionIndicator(): void {
    if (!this.directionIndicator) return;
    
    this.directionIndicator.clear();
    this.directionIndicator.fillStyle(0x06b6d4, 0.8);
    
    const size = 6;
    const offset = 20;
    
    switch (this.currentDirection) {
      case 'up':
        this.directionIndicator.fillTriangle(0, -offset - size, -size, -offset + size, size, -offset + size);
        break;
      case 'down':
        this.directionIndicator.fillTriangle(0, offset + size + 10, -size, offset - size + 10, size, offset - size + 10);
        break;
      case 'left':
        this.directionIndicator.fillTriangle(-offset - size, 8, -offset + size, -size + 8, -offset + size, size + 8);
        break;
      case 'right':
        this.directionIndicator.fillTriangle(offset + size, 8, offset - size, -size + 8, offset - size, size + 8);
        break;
    }
  }

  /**
   * Animate walking
   */
  private animateWalk(delta: number): void {
    if (!this.bodyGraphics) return;
    
    this.walkTimer += delta;
    
    if (this.walkTimer >= this.WALK_FRAME_DELAY) {
      this.walkTimer = 0;
      this.walkFrame = (this.walkFrame + 1) % 4;
      
      // Animate feet
      const leftFoot = this.bodyGraphics.getByName('leftFoot') as Phaser.GameObjects.Ellipse;
      const rightFoot = this.bodyGraphics.getByName('rightFoot') as Phaser.GameObjects.Ellipse;
      
      if (leftFoot && rightFoot) {
        const footOffset = this.walkFrame < 2 ? 4 : -4;
        leftFoot.y = 28 + footOffset;
        rightFoot.y = 28 - footOffset;
      }
    }
    
    // Slight body bob
    const bobOffset = Math.sin(this.walkTimer / 50) * 2;
    this.bodyGraphics.y = this.y + bobOffset;
  }

  /**
   * Reset walk animation
   */
  private resetWalkAnimation(): void {
    if (!this.bodyGraphics) return;
    
    this.walkFrame = 0;
    this.walkTimer = 0;
    
    const leftFoot = this.bodyGraphics.getByName('leftFoot') as Phaser.GameObjects.Ellipse;
    const rightFoot = this.bodyGraphics.getByName('rightFoot') as Phaser.GameObjects.Ellipse;
    
    if (leftFoot && rightFoot) {
      leftFoot.y = 28;
      rightFoot.y = 28;
    }
  }

  /**
   * Handle player movement
   */
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
      this.currentDirection = 'left';
    } else if (cursors.right.isDown || wasd.D.isDown) {
      moveX = 1;
      this.currentDirection = 'right';
    }

    if (cursors.up.isDown || wasd.W.isDown) {
      moveY = -1;
      this.currentDirection = 'up';
    } else if (cursors.down.isDown || wasd.S.isDown) {
      moveY = 1;
      this.currentDirection = 'down';
    }

    // Normalize diagonal movement
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.707;
      moveY *= 0.707;
    }

    // Apply velocity
    this.setVelocity(moveX * this.moveSpeed, moveY * this.moveSpeed);
    
    // Update state
    const wasWalking = this.currentState === 'walking';
    this.currentState = (moveX !== 0 || moveY !== 0) ? 'walking' : 'idle';
    
    // Update visuals
    if (this.currentState === 'walking') {
      this.updateDirectionIndicator();
    } else if (wasWalking) {
      this.resetWalkAnimation();
    }
  }

  /**
   * Update method - call from scene update
   */
  public update(_time: number, delta: number): void {
    // Sync placeholder graphics position
    if (this.bodyGraphics) {
      this.bodyGraphics.x = this.x;
      
      // Only update Y if not animating
      if (this.currentState !== 'walking') {
        this.bodyGraphics.y = this.y;
      }
    }
    
    // Animate if walking
    if (this.currentState === 'walking') {
      this.animateWalk(delta);
    }
  }

  /**
   * Get current direction
   */
  public getDirection(): PlayerDirection {
    return this.currentDirection;
  }

  /**
   * Get current state
   */
  public getState(): PlayerState {
    return this.currentState;
  }

  /**
   * Set movement speed
   */
  public setMoveSpeed(speed: number): void {
    this.moveSpeed = speed;
  }

  /**
   * Destroy player and cleanup
   */
  public destroy(fromScene?: boolean): void {
    if (this.bodyGraphics) {
      this.bodyGraphics.destroy();
    }
    super.destroy(fromScene);
  }
}
