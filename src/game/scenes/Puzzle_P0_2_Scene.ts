import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';

/**
 * Puzzle P0-2: The Fractured Sentinel
 * Concept: Mapping, Key-Value Relationships, Hash Function Basics
 * 
 * The player must drag crystal shards to their matching sockets on the
 * Sentinel's frame. Each shard has a unique color that maps to a specific socket.
 */
export class Puzzle_P0_2_Scene extends BasePuzzleScene {
  // Shards and sockets
  private shards: Phaser.GameObjects.Container[] = [];
  private sockets: { x: number; y: number; color: string; filled: boolean }[] = [];
  private socketGraphics: Phaser.GameObjects.Container[] = [];
  
  // Game state
  private lockedShards: Set<string> = new Set();
  private originalPositions: Map<string, { x: number; y: number }> = new Map();
  
  // UI elements
  private sentinelFrame!: Phaser.GameObjects.Container;
  private statusText!: Phaser.GameObjects.Text;
  private progressBar!: Phaser.GameObjects.Graphics;
  
  // Shard definitions
  private readonly shardDefs = [
    { color: 'cyan', hex: 0x06b6d4, socketIndex: 0 },
    { color: 'purple', hex: 0x8b5cf6, socketIndex: 1 },
    { color: 'orange', hex: 0xf97316, socketIndex: 2 },
  ];
  
  // Hints
  private hints: string[] = [
    'Match the shard colors to the socket colors.',
    'Cyan goes to the top, Purple in the middle...',
    'Look at the socket glow colors!'
  ];

  constructor() {
    super({ key: 'Puzzle_P0_2_Scene' });
    this.puzzleId = 'P0-2';
    this.puzzleName = 'THE FRACTURED SENTINEL';
    this.puzzleDescription = 'Restore the Sentinel by placing each shard in its matching socket.';
  }

  create(): void {
    super.create();
    
    // Reset state
    this.shards = [];
    this.sockets = [];
    this.socketGraphics = [];
    this.lockedShards = new Set();
    this.originalPositions = new Map();
    
    // Create puzzle-specific UI
    this.createPuzzleArea();
    
    // Setup drag events
    this.setupDragEvents();
  }

  /**
   * Create the puzzle area with Sentinel and shards
   */
  private createPuzzleArea(): void {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    
    // Status text
    this.statusText = this.add.text(centerX, 150, 'Drag each shard to its matching socket', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    
    // Create Sentinel frame
    this.createSentinelFrame(centerX, centerY);
    
    // Create sockets on the frame
    this.createSockets(centerX, centerY);
    
    // Create shards (scattered)
    this.createShards(centerX, centerY);
    
    // Create progress bar
    this.createProgressBar();
  }

  /**
   * Create the Sentinel frame visual
   */
  private createSentinelFrame(centerX: number, centerY: number): void {
    this.sentinelFrame = this.add.container(centerX, centerY);
    
    // Main frame body
    const frameGraphics = this.add.graphics();
    
    // Outer frame shadow
    frameGraphics.fillStyle(0x000000, 0.4);
    frameGraphics.fillRoundedRect(-65, -125, 130, 250, 16);
    
    // Main frame body
    frameGraphics.fillStyle(0x2a2a4a, 1);
    frameGraphics.fillRoundedRect(-60, -120, 120, 240, 12);
    
    // Frame border
    frameGraphics.lineStyle(4, 0x4a4a6a, 1);
    frameGraphics.strokeRoundedRect(-60, -120, 120, 240, 12);
    
    // Inner decorative lines
    frameGraphics.lineStyle(2, 0x3a3a5a, 0.8);
    frameGraphics.strokeRoundedRect(-50, -110, 100, 220, 8);
    
    // Central eye socket (decorative)
    frameGraphics.fillStyle(0x1a1a2e, 1);
    frameGraphics.fillCircle(0, -60, 25);
    frameGraphics.lineStyle(2, 0x4a4a6a, 1);
    frameGraphics.strokeCircle(0, -60, 25);
    
    // Sentinel "eye" that will glow when complete
    const eye = this.add.circle(0, -60, 18, 0x2a2a4a);
    eye.setName('sentinel-eye');
    
    // Decorative runes
    const runes = this.add.text(0, 130, '◆ ◇ ◆', {
      fontSize: '16px',
      color: '#4a4a6a',
    }).setOrigin(0.5);
        
    this.sentinelFrame.add([frameGraphics, eye, runes]);
  }

  /**
   * Create socket positions on the Sentinel
   */
  private createSockets(centerX: number, centerY: number): void {
    const socketPositions = [
      { y: -20, color: 'cyan', hex: 0x06b6d4 },
      { y: 30, color: 'purple', hex: 0x8b5cf6 },
      { y: 80, color: 'orange', hex: 0xf97316 },
    ];
    
    socketPositions.forEach((pos, index) => {
      // Store socket data
      this.sockets.push({
        x: centerX,
        y: centerY + pos.y,
        color: pos.color,
        filled: false,
      });
      
      // Create socket visual
      const socketContainer = this.add.container(centerX, centerY + pos.y);
      
      // Socket background
      const socketBg = this.add.circle(0, 0, 28, 0x1a1a2e);
      
      // Socket border with color hint
      const socketBorder = this.add.graphics();
      socketBorder.lineStyle(3, pos.hex, 0.6);
      socketBorder.strokeCircle(0, 0, 28);
      
      // Inner glow pulse
      const innerGlow = this.add.circle(0, 0, 20, pos.hex, 0.2);
      
      // Pulsing animation
      this.tweens.add({
        targets: innerGlow,
        alpha: 0.4,
        scale: 1.1,
        duration: 1000,
        yoyo: true,
        repeat: -1,
      });
      
      socketContainer.add([socketBg, innerGlow, socketBorder]);
      socketContainer.setData('color', pos.color);
      socketContainer.setData('index', index);
      this.socketGraphics.push(socketContainer);
    });
  }

  /**
   * Create draggable shards
   */
  private createShards(centerX: number, centerY: number): void {
    // Scattered positions for shards
    const shardPositions = [
      { x: centerX - 180, y: centerY - 60 },
      { x: centerX + 180, y: centerY + 20 },
      { x: centerX - 150, y: centerY + 100 },
    ];
    
    this.shardDefs.forEach((def, index) => {
      const pos = shardPositions[index];
      const shard = this.createShard(pos.x, pos.y, def.color, def.hex);
      
      // Store original position for reset
      this.originalPositions.set(def.color, { x: pos.x, y: pos.y });
      
      this.shards.push(shard);
    });
  }

  /**
   * Create a single draggable shard
   */
  private createShard(x: number, y: number, color: string, hex: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    // Shard shadow
    const shadow = this.add.ellipse(4, 4, 50, 40, 0x000000, 0.3);
    
    // Main shard body (hexagonal-ish crystal shape)
    const shardGraphics = this.add.graphics();
    
    // Crystal shape
    shardGraphics.fillStyle(hex, 1);
    shardGraphics.beginPath();
    shardGraphics.moveTo(0, -25);      // Top
    shardGraphics.lineTo(18, -12);     // Top right
    shardGraphics.lineTo(18, 12);      // Bottom right
    shardGraphics.lineTo(0, 25);       // Bottom
    shardGraphics.lineTo(-18, 12);     // Bottom left
    shardGraphics.lineTo(-18, -12);    // Top left
    shardGraphics.closePath();
    shardGraphics.fillPath();
    
    // Highlight
    shardGraphics.fillStyle(0xffffff, 0.3);
    shardGraphics.beginPath();
    shardGraphics.moveTo(0, -25);
    shardGraphics.lineTo(18, -12);
    shardGraphics.lineTo(8, -8);
    shardGraphics.lineTo(-8, -8);
    shardGraphics.lineTo(-18, -12);
    shardGraphics.closePath();
    shardGraphics.fillPath();
    
    // Border
    shardGraphics.lineStyle(2, this.adjustBrightness(hex, 0.6), 1);
    shardGraphics.beginPath();
    shardGraphics.moveTo(0, -25);
    shardGraphics.lineTo(18, -12);
    shardGraphics.lineTo(18, 12);
    shardGraphics.lineTo(0, 25);
    shardGraphics.lineTo(-18, 12);
    shardGraphics.lineTo(-18, -12);
    shardGraphics.closePath();
    shardGraphics.strokePath();
    
    // Inner glow
    const glow = this.add.circle(0, 0, 15, hex, 0.4);
    
    container.add([shadow, shardGraphics, glow]);
    container.setData('color', color);
    container.setData('hex', hex);
    container.setData('locked', false);
    container.setSize(50, 60);
    
    // Make interactive for dragging
    container.setInteractive({ 
      hitArea: new Phaser.Geom.Rectangle(-25, -30, 50, 60),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
      draggable: true,
    });
    
    // Hover effect
    container.on('pointerover', () => {
      if (!container.getData('locked')) {
        this.tweens.add({
          targets: container,
          scale: 1.15,
          duration: 150,
        });
      }
    });
    
    container.on('pointerout', () => {
      if (!container.getData('locked')) {
        this.tweens.add({
          targets: container,
          scale: 1,
          duration: 150,
        });
      }
    });
    
    // Floating animation
    this.tweens.add({
      targets: container,
      y: y - 5,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    return container;
  }

  /**
   * Setup drag events for shards
   */
  private setupDragEvents(): void {
    this.input.on('dragstart', (
      _pointer: Phaser.Input.Pointer, 
      gameObject: Phaser.GameObjects.Container
    ) => {
      if (gameObject.getData('locked')) return;
      
      gameObject.setDepth(100);
      
      // Stop floating animation
      this.tweens.killTweensOf(gameObject);
    });
    
    this.input.on('drag', (
      _pointer: Phaser.Input.Pointer, 
      gameObject: Phaser.GameObjects.Container, 
      dragX: number, 
      dragY: number
    ) => {
      if (gameObject.getData('locked')) return;
      
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    
    this.input.on('dragend', (
      _pointer: Phaser.Input.Pointer, 
      gameObject: Phaser.GameObjects.Container
    ) => {
      if (gameObject.getData('locked')) return;
      
      gameObject.setDepth(1);
      
      this.checkSocketSnap(gameObject);
    });
  }

  /**
   * Check if shard should snap to a socket
   */
  private checkSocketSnap(shard: Phaser.GameObjects.Container): void {
  const shardColor = shard.getData('color');
    const snapDistance = 50;
  
    for (let i = 0; i < this.sockets.length; i++) {
      const socket = this.sockets[i];
    const distance = Phaser.Math.Distance.Between(shard.x, shard.y, socket.x, socket.y);
    
    if (distance < snapDistance) {
        if (socket.color === shardColor && !socket.filled) {
          // Correct match!
          this.snapShardToSocket(shard, socket, i);
          return;
        } else if (socket.color !== shardColor) {
          // Wrong socket
          this.showWrongSocketFeedback(shard);
          return;
        }
      }
    }
    
    // Not near any socket - restart floating animation
    this.tweens.add({
      targets: shard,
      y: shard.y - 5,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /**
   * Snap shard to socket with animation
   */
  private snapShardToSocket(
    shard: Phaser.GameObjects.Container, 
    socket: { x: number; y: number; color: string; filled: boolean },
    socketIndex: number
  ): void {
    const shardColor = shard.getData('color');
    const shardHex = shard.getData('hex');
    
    // Mark as locked
    shard.setData('locked', true);
    socket.filled = true;
          this.lockedShards.add(shardColor);
    
    // Stop all tweens
    this.tweens.killTweensOf(shard);
          
    // Snap animation
          this.tweens.add({
            targets: shard,
      x: socket.x,
      y: socket.y,
      scale: 1,
      duration: 200,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Disable interaction
        shard.disableInteractive();
        
        // Lock-in effects
        this.createLockParticles(socket.x, socket.y, shardHex);
        
        // Pulse socket
        const socketGraphic = this.socketGraphics[socketIndex];
        this.tweens.add({
          targets: socketGraphic,
          scale: 1.2,
            duration: 150,
            yoyo: true,
        });
      },
    });
    
    // Update progress
    this.updateProgress();
    
    // Update status
    this.statusText.setText(`${this.lockedShards.size} / 3 shards placed`);
    
    // Check win condition
    this.checkWinCondition();
  }

  /**
   * Show feedback for wrong socket attempt
   */
  private showWrongSocketFeedback(shard: Phaser.GameObjects.Container): void {
    // Increment attempts counter for wrong placement
    this.attempts++;
    
    const originalPos = this.originalPositions.get(shard.getData('color'));
    
    // Shake effect
            this.tweens.add({
            targets: shard,
            x: shard.x + 10,
            duration: 50,
            yoyo: true,
            repeat: 3,
      onComplete: () => {
        // Return to original position
        if (originalPos) {
          this.tweens.add({
            targets: shard,
            x: originalPos.x,
            y: originalPos.y,
            duration: 300,
            ease: 'Back.easeOut',
            onComplete: () => {
              // Restart floating animation
              this.tweens.add({
                targets: shard,
                y: originalPos.y - 5,
                duration: 1500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
              });
            },
          });
        }
      },
    });
    
    // Show message
    this.showMessage("That shard doesn't fit there...", this.COLORS.warning);
    
    // Camera shake
    this.cameras.main.shake(100, 0.005);
  }

  /**
   * Create lock-in particle effect
   */
  private createLockParticles(x: number, y: number, color: number): void {
    for (let i = 0; i < 16; i++) {
      const particle = this.add.circle(x, y, 4, color);
      const angle = (i / 16) * Math.PI * 2;
      const distance = 50;
      
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.3,
        duration: 500,
        ease: 'Cubic.easeOut',
        onComplete: () => particle.destroy(),
      });
    }
  }

  /**
   * Create progress bar
   */
  private createProgressBar(): void {
    this.progressBar = this.add.graphics();
    this.updateProgress();
  }

  /**
   * Update progress bar
   */
  private updateProgress(): void {
    const { width } = this.cameras.main;
    const barWidth = 200;
    const barHeight = 12;
    const x = width / 2 - barWidth / 2;
    const y = this.cameras.main.height - 100;
    
    const progress = this.lockedShards.size / 3;
    
    this.progressBar.clear();
    
    // Background
    this.progressBar.fillStyle(0x2a2a4a, 1);
    this.progressBar.fillRoundedRect(x, y, barWidth, barHeight, 6);
    
    // Progress fill
    if (progress > 0) {
      this.progressBar.fillStyle(this.COLORS.primary, 1);
      this.progressBar.fillRoundedRect(x + 2, y + 2, (barWidth - 4) * progress, barHeight - 4, 4);
    }
    
    // Border
    this.progressBar.lineStyle(2, 0x4a4a6a, 1);
    this.progressBar.strokeRoundedRect(x, y, barWidth, barHeight, 6);
  }

  /**
   * Check win condition
   */
private checkWinCondition(): void {
    if (this.lockedShards.size === 3) {
      this.time.delayedCall(500, () => {
        // Sentinel awakening animation
        this.awakenSentinel();
        
        // Victory
        this.time.delayedCall(1500, () => {
          const stars = this.calculateStars();
          this.onPuzzleComplete(stars);
        });
      });
    }
  }

  /**
   * Sentinel awakening animation
   */
  private awakenSentinel(): void {
    // Find the eye
    const eye = this.sentinelFrame.getByName('sentinel-eye') as Phaser.GameObjects.Arc;
    
    if (eye) {
      // Eye glow animation
      this.tweens.add({
        targets: eye,
        fillColor: { from: 0x2a2a4a, to: 0x06b6d4 },
        duration: 500,
      });
      
      // Pulse effect
      this.tweens.add({
        targets: eye,
        scale: 1.3,
        duration: 300,
        yoyo: true,
        repeat: 2,
      });
    }
    
    // Frame glow
    this.tweens.add({
      targets: this.sentinelFrame,
      alpha: 1.2,
      duration: 500,
      yoyo: true,
    });
    
    // Status update
    this.statusText.setText('🎉 SENTINEL RESTORED! 🎉');
    this.statusText.setColor('#22c55e');
    
    // Camera flash
    this.cameras.main.flash(500, 100, 50, 150);
  }

  /**
   * Calculate star rating
   */
  private calculateStars(): number {
    // 3 stars: No wrong attempts, no hints
    // 2 stars: 1-2 wrong attempts or 1 hint
    // 1 star: Completed
    
    if (this.attempts === 0 && this.hintsUsed === 0) {
      return 3;
    } else if (this.attempts <= 2 && this.hintsUsed <= 1) {
      return 2;
    }
    return 1;
  }

  /**
   * Display hint based on hint number
   */
  protected displayHint(hintNumber: number): void {
    this.showMessage(this.hints[hintNumber - 1], this.COLORS.accent);
    
    // Visual hint: highlight sockets briefly
    if (hintNumber >= 2) {
      this.socketGraphics.forEach((socket, index) => {
        this.tweens.add({
          targets: socket,
          scale: 1.3,
          duration: 300,
          delay: index * 200,
          yoyo: true,
        });
      });
    }
  }

  /**
   * Get concept name for Codex
   */
  protected getConceptName(): string {
    return 'Mapping & Hash Functions';
  }
}
