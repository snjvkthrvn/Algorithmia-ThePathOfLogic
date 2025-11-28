import Phaser from 'phaser';

/**
 * BootScene - Handles asset loading and game initialization
 * Creates placeholder graphics that can be replaced with real art
 */
export class BootScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.createLoadingScreen();
    
    // Generate all placeholder assets
    this.generatePlaceholderAssets();
    
    // Load any existing real assets
    this.loadRealAssets();
  }

  /**
   * Create the loading screen UI
   */
  private createLoadingScreen(): void {
    const { width, height } = this.cameras.main;
    
    // Background
    this.cameras.main.setBackgroundColor('#0a0a1a');
    
    // Title
    this.add.text(width / 2, height / 2 - 100, 'ALGORITHMIA', {
      fontSize: '48px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
    }).setOrigin(0.5);
    
    this.add.text(width / 2, height / 2 - 50, 'The Path of Logic', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#8b5cf6',
    }).setOrigin(0.5);
    
    // Loading bar background
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x2a2a4a, 1);
    this.loadingBar.fillRect(width / 2 - 200, height / 2 + 20, 400, 30);
    this.loadingBar.lineStyle(2, 0x4a4a6a);
    this.loadingBar.strokeRect(width / 2 - 200, height / 2 + 20, 400, 30);
    
    // Progress bar
    this.progressBar = this.add.graphics();
    
    // Loading text
    this.loadingText = this.add.text(width / 2, height / 2 + 70, 'Loading...', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    
    // Update progress bar on load progress
    this.load.on('progress', (value: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0x06b6d4, 1);
      this.progressBar.fillRect(width / 2 - 196, height / 2 + 24, 392 * value, 22);
      this.loadingText.setText(`Loading... ${Math.floor(value * 100)}%`);
    });
  }

  /**
   * Generate all placeholder graphics as textures
   */
  private generatePlaceholderAssets(): void {
    // Player placeholder (16x24 base, will be scaled 4x)
    this.generatePlayerPlaceholder();
    
    // NPC placeholders
    this.generateNPCPlaceholders();
    
    // Tile placeholders
    this.generateTilePlaceholders();
    
    // Puzzle element placeholders
    this.generatePuzzlePlaceholders();
    
    // UI placeholders
    this.generateUIPlaceholders();
    
    // Effect placeholders
    this.generateEffectPlaceholders();
  }

  /**
   * Generate player sprite placeholder
   */
  private generatePlayerPlaceholder(): void {
    // Create a simple player character
    const graphics = this.make.graphics({ x: 0, y: 0 });
    
    // Body (cyan tunic)
    graphics.fillStyle(0x06b6d4, 1);
    graphics.fillRect(4, 10, 24, 18);
    
    // Head (skin tone)
    graphics.fillStyle(0xffe4c4, 1);
    graphics.fillCircle(16, 8, 6);
    
    // Hair (brown)
    graphics.fillStyle(0x8b4513, 1);
    graphics.fillRect(10, 2, 12, 4);
    
    // Eyes
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(13, 7, 2, 2);
    graphics.fillRect(17, 7, 2, 2);
    
    // Legs
    graphics.fillStyle(0x4a3728, 1);
    graphics.fillRect(8, 28, 6, 8);
    graphics.fillRect(18, 28, 6, 8);
    
    graphics.generateTexture('player-placeholder', 32, 40);
    graphics.destroy();
    
    // Also create player-test for backwards compatibility
    const testGraphics = this.make.graphics({ x: 0, y: 0 });
    testGraphics.fillStyle(0x06b6d4, 1);
    testGraphics.fillCircle(16, 16, 14);
    testGraphics.fillStyle(0xffffff, 1);
    testGraphics.fillCircle(12, 12, 3);
    testGraphics.fillCircle(20, 12, 3);
    testGraphics.generateTexture('player-test', 32, 32);
    testGraphics.destroy();
  }

  /**
   * Generate NPC placeholder sprites
   */
  private generateNPCPlaceholders(): void {
    // Professor Node
    const profNodeGraphics = this.make.graphics({ x: 0, y: 0 });
    // Lab coat body
    profNodeGraphics.fillStyle(0xffffff, 1);
    profNodeGraphics.fillRect(4, 12, 24, 20);
    // Blue vest
    profNodeGraphics.fillStyle(0x3b82f6, 1);
    profNodeGraphics.fillRect(8, 14, 16, 10);
    // Head
    profNodeGraphics.fillStyle(0xffe4c4, 1);
    profNodeGraphics.fillCircle(16, 8, 6);
    // Gray hair
    profNodeGraphics.fillStyle(0xa0a0a0, 1);
    profNodeGraphics.fillRect(10, 2, 12, 5);
    // Glasses
    profNodeGraphics.lineStyle(1, 0x4a3728);
    profNodeGraphics.strokeCircle(13, 8, 3);
    profNodeGraphics.strokeCircle(19, 8, 3);
    profNodeGraphics.generateTexture('npc-professor-node', 32, 40);
    profNodeGraphics.destroy();
    
    // Rune Keeper (cyan robes)
    const runeKeeperGraphics = this.make.graphics({ x: 0, y: 0 });
    runeKeeperGraphics.fillStyle(0x06b6d4, 1);
    runeKeeperGraphics.fillRect(4, 8, 24, 28);
    // Hood
    runeKeeperGraphics.fillStyle(0x047d94, 1);
    runeKeeperGraphics.fillTriangle(16, 0, 4, 14, 28, 14);
    // Glowing eyes
    runeKeeperGraphics.fillStyle(0x00ffff, 1);
    runeKeeperGraphics.fillCircle(13, 10, 2);
    runeKeeperGraphics.fillCircle(19, 10, 2);
    runeKeeperGraphics.generateTexture('npc-rune-keeper', 32, 40);
    runeKeeperGraphics.destroy();
    
    // Console Keeper (technomancer)
    const consoleKeeperGraphics = this.make.graphics({ x: 0, y: 0 });
    // Dark blue robes with circuit pattern
    consoleKeeperGraphics.fillStyle(0x1e3a5f, 1);
    consoleKeeperGraphics.fillRect(4, 10, 24, 26);
    // Circuit lines
    consoleKeeperGraphics.lineStyle(1, 0x06b6d4);
    consoleKeeperGraphics.lineBetween(8, 15, 8, 30);
    consoleKeeperGraphics.lineBetween(24, 15, 24, 30);
    // Head
    consoleKeeperGraphics.fillStyle(0xffe4c4, 1);
    consoleKeeperGraphics.fillCircle(16, 8, 6);
    // Goggles on forehead
    consoleKeeperGraphics.fillStyle(0x4a4a6a, 1);
    consoleKeeperGraphics.fillRect(10, 3, 12, 4);
    consoleKeeperGraphics.fillStyle(0x06b6d4, 0.5);
    consoleKeeperGraphics.fillCircle(13, 5, 2);
    consoleKeeperGraphics.fillCircle(19, 5, 2);
    consoleKeeperGraphics.generateTexture('npc-console-keeper', 32, 40);
    consoleKeeperGraphics.destroy();
  }

  /**
   * Generate tile placeholders
   */
  private generateTilePlaceholders(): void {
    // Platform tile (64x64)
    const platformGraphics = this.make.graphics({ x: 0, y: 0 });
    // Shadow
    platformGraphics.fillStyle(0x000000, 0.5);
    platformGraphics.fillRect(4, 4, 60, 60);
    // Main tile
    platformGraphics.fillStyle(0x1a1a3e, 1);
    platformGraphics.fillRect(0, 0, 60, 60);
    // Border
    platformGraphics.lineStyle(2, 0x3a3a5e);
    platformGraphics.strokeRect(0, 0, 60, 60);
    // Highlight
    platformGraphics.lineStyle(2, 0x5a5a7e, 0.5);
    platformGraphics.lineBetween(0, 0, 60, 0);
    platformGraphics.lineBetween(0, 0, 0, 60);
    // Grid
    platformGraphics.lineStyle(1, 0x2a2a4e, 0.3);
    platformGraphics.lineBetween(30, 0, 30, 60);
    platformGraphics.lineBetween(0, 30, 60, 30);
    platformGraphics.generateTexture('tile-platform', 64, 64);
    platformGraphics.destroy();
    
    // Bridge tile
    const bridgeGraphics = this.make.graphics({ x: 0, y: 0 });
    bridgeGraphics.fillStyle(0x2a2a4e, 1);
    bridgeGraphics.fillRect(0, 0, 64, 64);
    bridgeGraphics.lineStyle(2, 0x4a4a6a);
    bridgeGraphics.strokeRect(2, 2, 60, 60);
    bridgeGraphics.generateTexture('tile-bridge', 64, 64);
    bridgeGraphics.destroy();
    
    // Void edge tile
    const voidEdgeGraphics = this.make.graphics({ x: 0, y: 0 });
    voidEdgeGraphics.fillGradientStyle(0x1a1a3e, 0x1a1a3e, 0x0a0a1a, 0x0a0a1a, 1, 1, 0, 0);
    voidEdgeGraphics.fillRect(0, 0, 64, 64);
    voidEdgeGraphics.generateTexture('tile-void-edge', 64, 64);
    voidEdgeGraphics.destroy();
  }

  /**
   * Generate puzzle element placeholders
   */
  private generatePuzzlePlaceholders(): void {
    // Pattern tile (circular, for P0-1)
    const patternTileGraphics = this.make.graphics({ x: 0, y: 0 });
    patternTileGraphics.fillStyle(0x4a5568, 1);
    patternTileGraphics.fillCircle(32, 32, 28);
    patternTileGraphics.lineStyle(3, 0x2d3748);
    patternTileGraphics.strokeCircle(32, 32, 28);
    patternTileGraphics.fillStyle(0x4a5568, 0.3);
    patternTileGraphics.fillCircle(32, 32, 20);
    patternTileGraphics.generateTexture('puzzle-pattern-tile', 64, 64);
    patternTileGraphics.destroy();
    
    // Pattern tile glowing (cyan)
    const patternTileGlowGraphics = this.make.graphics({ x: 0, y: 0 });
    patternTileGlowGraphics.fillStyle(0x06b6d4, 0.3);
    patternTileGlowGraphics.fillCircle(32, 32, 34);
    patternTileGlowGraphics.fillStyle(0x06b6d4, 1);
    patternTileGlowGraphics.fillCircle(32, 32, 28);
    patternTileGlowGraphics.lineStyle(3, 0x00ffff);
    patternTileGlowGraphics.strokeCircle(32, 32, 28);
    patternTileGlowGraphics.generateTexture('puzzle-pattern-tile-glow', 64, 64);
    patternTileGlowGraphics.destroy();
    
    // Crystal shards (3 colors for P0-2)
    const shardColors = [
      { name: 'cyan', color: 0x06b6d4 },
      { name: 'purple', color: 0x8b5cf6 },
      { name: 'orange', color: 0xf97316 },
    ];
    
    shardColors.forEach(({ name, color }) => {
      const shardGraphics = this.make.graphics({ x: 0, y: 0 });
      // Crystal shape
      shardGraphics.fillStyle(color, 1);
      shardGraphics.beginPath();
      shardGraphics.moveTo(16, 0);
      shardGraphics.lineTo(28, 8);
      shardGraphics.lineTo(28, 24);
      shardGraphics.lineTo(16, 32);
      shardGraphics.lineTo(4, 24);
      shardGraphics.lineTo(4, 8);
      shardGraphics.closePath();
      shardGraphics.fillPath();
      // Highlight
      shardGraphics.fillStyle(0xffffff, 0.3);
      shardGraphics.beginPath();
      shardGraphics.moveTo(16, 0);
      shardGraphics.lineTo(28, 8);
      shardGraphics.lineTo(20, 12);
      shardGraphics.lineTo(12, 12);
      shardGraphics.lineTo(4, 8);
      shardGraphics.closePath();
      shardGraphics.fillPath();
      shardGraphics.generateTexture(`shard-${name}`, 32, 32);
      shardGraphics.destroy();
    });
    
    // Console/Socket placeholder
    const consoleGraphics = this.make.graphics({ x: 0, y: 0 });
    consoleGraphics.fillStyle(0x2a2a4a, 1);
    consoleGraphics.fillRoundedRect(0, 0, 64, 48, 8);
    consoleGraphics.lineStyle(2, 0x4a4a6a);
    consoleGraphics.strokeRoundedRect(0, 0, 64, 48, 8);
    // Screen
    consoleGraphics.fillStyle(0x1a1a2e, 1);
    consoleGraphics.fillRect(8, 8, 48, 24);
    consoleGraphics.generateTexture('puzzle-console', 64, 48);
    consoleGraphics.destroy();
    
    // Sentinel frame placeholder
    const sentinelGraphics = this.make.graphics({ x: 0, y: 0 });
    sentinelGraphics.fillStyle(0x2a2a4a, 1);
    sentinelGraphics.fillRoundedRect(0, 0, 80, 160, 12);
    sentinelGraphics.lineStyle(3, 0x4a4a6a);
    sentinelGraphics.strokeRoundedRect(0, 0, 80, 160, 12);
    // Eye socket
    sentinelGraphics.fillStyle(0x1a1a2e, 1);
    sentinelGraphics.fillCircle(40, 30, 18);
    sentinelGraphics.lineStyle(2, 0x4a4a6a);
    sentinelGraphics.strokeCircle(40, 30, 18);
    // Shard sockets
    [60, 90, 120].forEach(y => {
      sentinelGraphics.fillStyle(0x1a1a2e, 1);
      sentinelGraphics.fillCircle(40, y, 14);
      sentinelGraphics.lineStyle(2, 0x06b6d4, 0.5);
      sentinelGraphics.strokeCircle(40, y, 14);
    });
    sentinelGraphics.generateTexture('sentinel-frame', 80, 160);
    sentinelGraphics.destroy();
    
    // Central Core (for P0-2)
    const coreGraphics = this.make.graphics({ x: 0, y: 0 });
    coreGraphics.fillStyle(0x1a1a2e, 1);
    coreGraphics.fillCircle(40, 40, 36);
    coreGraphics.lineStyle(3, 0x4a4a6a);
    coreGraphics.strokeCircle(40, 40, 36);
    coreGraphics.fillStyle(0x2a2a4a, 1);
    coreGraphics.fillCircle(40, 40, 24);
    coreGraphics.generateTexture('central-core', 80, 80);
    coreGraphics.destroy();
  }

  /**
   * Generate UI placeholders
   */
  private generateUIPlaceholders(): void {
    // Dialogue box background
    const dialogueBoxGraphics = this.make.graphics({ x: 0, y: 0 });
    dialogueBoxGraphics.fillStyle(0x1a1a2e, 0.95);
    dialogueBoxGraphics.fillRoundedRect(0, 0, 800, 150, 12);
    dialogueBoxGraphics.lineStyle(3, 0x4a4a6a);
    dialogueBoxGraphics.strokeRoundedRect(0, 0, 800, 150, 12);
    dialogueBoxGraphics.generateTexture('ui-dialogue-box', 800, 150);
    dialogueBoxGraphics.destroy();
    
    // Button background
    const buttonGraphics = this.make.graphics({ x: 0, y: 0 });
    buttonGraphics.fillStyle(0x2a2a4a, 1);
    buttonGraphics.fillRoundedRect(0, 0, 120, 40, 8);
    buttonGraphics.lineStyle(2, 0x4a4a6a);
    buttonGraphics.strokeRoundedRect(0, 0, 120, 40, 8);
    buttonGraphics.generateTexture('ui-button', 120, 40);
    buttonGraphics.destroy();
    
    // Star (filled)
    const starFilledGraphics = this.make.graphics({ x: 0, y: 0 });
    starFilledGraphics.fillStyle(0xfbbf24, 1);
    this.drawStar(starFilledGraphics, 16, 16, 5, 14, 7);
    starFilledGraphics.generateTexture('ui-star-filled', 32, 32);
    starFilledGraphics.destroy();
    
    // Star (empty)
    const starEmptyGraphics = this.make.graphics({ x: 0, y: 0 });
    starEmptyGraphics.lineStyle(2, 0x4a4a6a);
    this.drawStar(starEmptyGraphics, 16, 16, 5, 14, 7, false);
    starEmptyGraphics.generateTexture('ui-star-empty', 32, 32);
    starEmptyGraphics.destroy();
    
    // HUD frame
    const hudFrameGraphics = this.make.graphics({ x: 0, y: 0 });
    hudFrameGraphics.fillStyle(0x1a1a2e, 0.8);
    hudFrameGraphics.fillRoundedRect(0, 0, 200, 60, 8);
    hudFrameGraphics.lineStyle(2, 0x4a4a6a);
    hudFrameGraphics.strokeRoundedRect(0, 0, 200, 60, 8);
    hudFrameGraphics.generateTexture('ui-hud-frame', 200, 60);
    hudFrameGraphics.destroy();
  }

  /**
   * Draw a star shape
   */
  private drawStar(
    graphics: Phaser.GameObjects.Graphics, 
    cx: number, 
    cy: number, 
    spikes: number, 
    outerRadius: number, 
    innerRadius: number,
    fill: boolean = true
  ): void {
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    
    graphics.beginPath();
    graphics.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * outerRadius;
      let y = cy + Math.sin(rot) * outerRadius;
      graphics.lineTo(x, y);
      rot += step;
      
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      graphics.lineTo(x, y);
      rot += step;
    }
    
    graphics.lineTo(cx, cy - outerRadius);
    graphics.closePath();
    
    if (fill) {
      graphics.fillPath();
    } else {
      graphics.strokePath();
    }
  }

  /**
   * Generate effect placeholders
   */
  private generateEffectPlaceholders(): void {
    // Particle (small circle)
    const particleGraphics = this.make.graphics({ x: 0, y: 0 });
    particleGraphics.fillStyle(0xffffff, 1);
    particleGraphics.fillCircle(4, 4, 4);
    particleGraphics.generateTexture('particle-white', 8, 8);
    particleGraphics.destroy();
    
    // Glow particle (cyan)
    const glowParticleGraphics = this.make.graphics({ x: 0, y: 0 });
    glowParticleGraphics.fillStyle(0x06b6d4, 0.5);
    glowParticleGraphics.fillCircle(8, 8, 8);
    glowParticleGraphics.fillStyle(0x06b6d4, 1);
    glowParticleGraphics.fillCircle(8, 8, 4);
    glowParticleGraphics.generateTexture('particle-glow-cyan', 16, 16);
    glowParticleGraphics.destroy();
    
    // Portal effect placeholder
    const portalGraphics = this.make.graphics({ x: 0, y: 0 });
    portalGraphics.fillStyle(0x8b5cf6, 0.3);
    portalGraphics.fillCircle(40, 50, 36);
    portalGraphics.fillStyle(0x8b5cf6, 0.5);
    portalGraphics.fillCircle(40, 50, 28);
    portalGraphics.fillStyle(0xffffff, 0.2);
    portalGraphics.fillCircle(40, 50, 16);
    portalGraphics.generateTexture('effect-portal', 80, 100);
    portalGraphics.destroy();
  }

  /**
   * Load any existing real assets from the assets folder
   */
  private loadRealAssets(): void {
    // Try to load real assets if they exist, fall back to placeholders
    // The game will use placeholders until real art is added
    
    // Example of loading real assets when available:
    // this.load.image('player-walk', 'assets/characters/prologue/player/player_walk.png');
    
    // For now, we rely on the generated placeholders
    // Real assets can be added to public/assets/ and loaded here
  }

  create(): void {
    // Add a brief delay for visual feedback
    this.time.delayedCall(500, () => {
      this.loadingText.setText('Ready!');
      
      this.time.delayedCall(300, () => {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.start('MenuScene');
        });
      });
    });
  }
}
