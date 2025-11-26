import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { DialogueSystem, NPCDialogues } from '../systems/DialogueSystem';

/**
 * NPC definition for the overworld
 */
interface NPC {
  sprite: Phaser.GameObjects.Container;
  name: string;
  puzzleScene?: string;
  dialogueKey: keyof typeof NPCDialogues;
  interactionRadius: number;
}

/**
 * GameScene - Prologue: Chamber of Flow
 * A retro 2D RPG overworld with NPC interactions and miniature puzzle representations
 */
export class GameScene extends Phaser.Scene {
  // Core entities
  private player?: Player;
  private walls?: Phaser.Physics.Arcade.StaticGroup;
  
  // Input
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  
  // NPCs and interaction
  private npcs: NPC[] = [];
  private activeNPC: NPC | null = null;
  private dialogueSystem!: DialogueSystem;
  
  // UI Elements
  private interactPrompt?: Phaser.GameObjects.Container;
  
  // Decorative elements
  private starfield: Phaser.GameObjects.Graphics[] = [];
  private particles: Phaser.GameObjects.Arc[] = [];
  
  // Constants
  private readonly TILE_SIZE = 64;
  private readonly MAP_WIDTH = 20;
  private readonly MAP_HEIGHT = 16;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    // 1. Setup world and camera
    this.cameras.main.setBackgroundColor('#0a0a1a');
    this.physics.world.setBounds(0, 0, this.MAP_WIDTH * this.TILE_SIZE, this.MAP_HEIGHT * this.TILE_SIZE);
    
    // 2. Create atmospheric background
    this.createAtmosphericBackground();
    
    // 3. Create the map
    this.walls = this.physics.add.staticGroup();
    this.createPrologueMap();

    // 4. Create NPCs (puzzle triggers)
    this.createNPCs();
    
    // 5. Create Player
    this.player = new Player(this, 400, 500);
    this.physics.add.collider(this.player, this.walls);

    // 6. Setup Camera
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, this.MAP_WIDTH * this.TILE_SIZE, this.MAP_HEIGHT * this.TILE_SIZE);
    
    // 7. Setup UI
    this.createUI();
    
    // 8. Setup Dialogue System
    this.dialogueSystem = new DialogueSystem(this);
    
    // 9. Setup Input
    this.setupInput();
    
    // 10. Create decorative elements
    this.createDecorations();
    
    // 11. Show region introduction
    this.showRegionIntro();
  }

  /**
   * Create atmospheric starfield background
   */
  private createAtmosphericBackground(): void {
    // Create multiple layers of stars for parallax effect
    for (let i = 0; i < 100; i++) {
      const x = Phaser.Math.Between(0, this.MAP_WIDTH * this.TILE_SIZE);
      const y = Phaser.Math.Between(0, this.MAP_HEIGHT * this.TILE_SIZE);
      const size = Phaser.Math.Between(1, 3);
      const alpha = Phaser.Math.FloatBetween(0.2, 0.6);
      
      const star = this.add.graphics();
      star.fillStyle(0xffffff, alpha);
      star.fillCircle(x, y, size);
      star.setDepth(-10);
      
      // Twinkle animation
      this.tweens.add({
        targets: star,
        alpha: { from: alpha, to: alpha * 0.3 },
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      });
      
      this.starfield.push(star);
    }
    
    // Add subtle cosmic nebula
    const nebula = this.add.graphics();
    nebula.setDepth(-9);
    nebula.fillGradientStyle(0x1a1a3e, 0x1a1a3e, 0x0a0a1a, 0x0a0a1a, 0.3);
    nebula.fillRect(0, 0, this.MAP_WIDTH * this.TILE_SIZE, this.MAP_HEIGHT * this.TILE_SIZE);
  }

  /**
   * Create the Prologue map with floating platforms
   */
  private createPrologueMap(): void {
    // Platform definitions (x, y in tiles, w, h in tiles)
    const platforms = [
      // Central hub
      { x: 5, y: 6, w: 5, h: 5, label: 'Central Hub' },
      // North platform (Puzzle 1 - Follow the Path)
      { x: 6, y: 2, w: 3, h: 3, label: 'Path Runes' },
      // East platform (Puzzle 2 - Sentinel)
      { x: 12, y: 5, w: 4, h: 4, label: 'Sentinel Chamber' },
      // South-East exit platform
      { x: 14, y: 10, w: 3, h: 3, label: 'Gateway' },
      // Bridge segments
      { x: 7, y: 5, w: 1, h: 1, label: null }, // North bridge
      { x: 10, y: 7, w: 2, h: 1, label: null }, // East bridge
      { x: 12, y: 9, w: 1, h: 1, label: null }, // SE bridge
    ];
    
    platforms.forEach(p => {
      this.createFloatingPlatform(p.x, p.y, p.w, p.h);
      
      // Add platform label
      if (p.label) {
        const labelX = (p.x + p.w / 2) * this.TILE_SIZE;
        const labelY = (p.y - 0.5) * this.TILE_SIZE;
        this.add.text(labelX, labelY, p.label, {
          fontSize: '10px',
          fontFamily: '"Press Start 2P", monospace',
          color: '#4a4a6a',
        }).setOrigin(0.5);
      }
    });
  }

  /**
   * Create a floating platform with retro styling
   */
  private createFloatingPlatform(tileX: number, tileY: number, width: number, height: number): void {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const x = (tileX + col) * this.TILE_SIZE;
        const y = (tileY + row) * this.TILE_SIZE;
        
        // Create tile graphics
        const tile = this.add.graphics();
        
        // Tile shadow (void effect)
        tile.fillStyle(0x000000, 0.5);
        tile.fillRect(x + 4, y + 4, this.TILE_SIZE - 2, this.TILE_SIZE - 2);
        
        // Main tile
        tile.fillStyle(0x1a1a3e, 1);
        tile.fillRect(x, y, this.TILE_SIZE - 2, this.TILE_SIZE - 2);
        
        // Tile border
        tile.lineStyle(2, 0x3a3a5e, 1);
        tile.strokeRect(x, y, this.TILE_SIZE - 2, this.TILE_SIZE - 2);
        
        // Grid pattern (subtle)
        tile.lineStyle(1, 0x2a2a4e, 0.3);
        tile.lineBetween(x + this.TILE_SIZE / 2, y, x + this.TILE_SIZE / 2, y + this.TILE_SIZE - 2);
        tile.lineBetween(x, y + this.TILE_SIZE / 2, x + this.TILE_SIZE - 2, y + this.TILE_SIZE / 2);
        
        // Edge highlight (top-left)
        if (row === 0 || col === 0) {
          tile.lineStyle(2, 0x5a5a7e, 0.5);
          if (row === 0) {
            tile.lineBetween(x, y, x + this.TILE_SIZE - 2, y);
          }
          if (col === 0) {
            tile.lineBetween(x, y, x, y + this.TILE_SIZE - 2);
          }
        }
        
        tile.setDepth(-1);
      }
    }
  }

  /**
   * Create NPCs that represent puzzle areas
   */
  private createNPCs(): void {
    // NPC 1: Rune Keeper (Puzzle 1 - Follow the Path)
    const runeKeeper = this.createNPC(
      7.5 * this.TILE_SIZE,
      3 * this.TILE_SIZE,
      'Rune Keeper',
      0x06b6d4,
      'RUNE_KEEPER',
      'Puzzle_P0_1_Scene'
    );
    this.createPuzzleMiniature(runeKeeper.sprite.x, runeKeeper.sprite.y + 50, 'pattern');
    
    // NPC 2: Sentinel Guardian (Puzzle 2 - Fractured Sentinel)
    const guardian = this.createNPC(
      14 * this.TILE_SIZE,
      7 * this.TILE_SIZE,
      'Guardian',
      0x8b5cf6,
      'SENTINEL_GUARDIAN',
      'Puzzle_P0_2_Scene'
    );
    this.createPuzzleMiniature(guardian.sprite.x, guardian.sprite.y + 50, 'sentinel');
    
    // Gateway indicator (to Array Plains)
    this.createGateway(15.5 * this.TILE_SIZE, 11.5 * this.TILE_SIZE);
  }

  /**
   * Create an NPC entity
   */
  private createNPC(
    x: number, 
    y: number, 
    name: string, 
    color: number,
    dialogueKey: keyof typeof NPCDialogues,
    puzzleScene?: string
  ): NPC {
    const container = this.add.container(x, y);
    
    // NPC shadow
    const shadow = this.add.ellipse(0, 20, 40, 15, 0x000000, 0.3);
    
    // NPC body (simple pixel character)
    const body = this.add.graphics();
    
    // Body
    body.fillStyle(color, 1);
    body.fillRoundedRect(-12, -20, 24, 35, 4);
    
    // Head
    body.fillStyle(0xffe4c4, 1);
    body.fillCircle(0, -28, 12);
    
    // Eyes
    body.fillStyle(0x000000, 1);
    body.fillCircle(-4, -30, 2);
    body.fillCircle(4, -30, 2);
    
    // Name tag
    const nameTag = this.add.text(0, -55, name, {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    
    // Interaction indicator (floating)
    const indicator = this.add.text(0, -70, '!', {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    
    // Bounce animation for indicator
    this.tweens.add({
      targets: indicator,
      y: -75,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    container.add([shadow, body, nameTag, indicator]);
    container.setDepth(5);
    
    // Idle animation (subtle breathing)
    this.tweens.add({
      targets: container,
      scaleY: 1.02,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    const npc: NPC = {
      sprite: container,
      name: name,
      puzzleScene: puzzleScene,
      dialogueKey: dialogueKey,
      interactionRadius: 80,
    };
    
    this.npcs.push(npc);
    return npc;
  }

  /**
   * Create a miniature puzzle representation near an NPC
   */
  private createPuzzleMiniature(x: number, y: number, type: 'pattern' | 'sentinel'): void {
    const container = this.add.container(x, y);
    
    if (type === 'pattern') {
      // Miniature pattern tiles
      const positions = [
        { x: -15, y: -10 }, { x: 0, y: -15 }, { x: 15, y: -10 },
        { x: -10, y: 5 }, { x: 10, y: 5 }, { x: 0, y: 15 },
      ];
      
      positions.forEach((pos, i) => {
        const tile = this.add.circle(pos.x, pos.y, 6, 0x4a5568);
        tile.setStrokeStyle(1, 0x06b6d4, 0.5);
        container.add(tile);
        
        // Subtle glow animation (staggered)
        this.tweens.add({
          targets: tile,
          fillColor: { from: 0x4a5568, to: 0x06b6d4 },
          duration: 300,
          delay: i * 200,
          yoyo: true,
          repeat: -1,
          repeatDelay: 2000,
        });
      });
    } else if (type === 'sentinel') {
      // Miniature sentinel frame with shards
      const frame = this.add.graphics();
      frame.fillStyle(0x2a2a4a, 1);
      frame.fillRoundedRect(-15, -25, 30, 50, 4);
      frame.lineStyle(1, 0x4a4a6a, 1);
      frame.strokeRoundedRect(-15, -25, 30, 50, 4);
      
      // Mini shards
      const shards = [
        { y: -12, color: 0x06b6d4 },
        { y: 0, color: 0x8b5cf6 },
        { y: 12, color: 0xf97316 },
      ];
      
      shards.forEach((shard, i) => {
        const s = this.add.circle(0, shard.y, 5, shard.color);
        container.add(s);
        
        // Pulsing animation
        this.tweens.add({
          targets: s,
          scale: 1.2,
          alpha: 0.7,
          duration: 500,
          delay: i * 200,
        yoyo: true,
          repeat: -1,
        });
      });
      
      container.add(frame);
    }
    
    container.setDepth(2);
    container.setScale(0.8);
  }

  /**
   * Create the gateway to the next region
   */
  private createGateway(x: number, y: number): void {
    const container = this.add.container(x, y);
    
    // Gateway frame
    const frame = this.add.graphics();
    frame.fillStyle(0x1a1a2e, 1);
    frame.fillRoundedRect(-30, -50, 60, 80, 8);
    frame.lineStyle(3, 0x9b59b6, 1);
    frame.strokeRoundedRect(-30, -50, 60, 80, 8);
    
    // Inner portal effect
    const portal = this.add.graphics();
    portal.fillStyle(0x9b59b6, 0.3);
    portal.fillEllipse(0, 0, 40, 60);
    
    // Swirl animation
    this.tweens.add({
      targets: portal,
      angle: 360,
      duration: 5000,
      repeat: -1,
    });
    
    // Label
    const label = this.add.text(0, 50, 'ARRAY PLAINS', {
      fontSize: '8px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#9b59b6',
    }).setOrigin(0.5);
    
    // Lock indicator (if not unlocked)
    const lock = this.add.text(0, -60, '🔒', {
      fontSize: '16px',
    }).setOrigin(0.5);
    
    container.add([frame, portal, label, lock]);
    container.setDepth(5);
    
    // Store reference for interaction
    container.setData('isGateway', true);
    container.setData('targetScene', 'Room2Scene');
    
    // Add to npcs array for interaction detection
    this.npcs.push({
      sprite: container,
      name: 'Gateway',
      puzzleScene: 'Room2Scene',
      dialogueKey: 'PROFESSOR_NODE', // Will show locked message instead
      interactionRadius: 60,
    });
  }

  /**
   * Create UI elements
   */
  private createUI(): void {
    const { width } = this.cameras.main;
    
    // Region label (top center)
    this.add.text(width / 2, 20, 'CHAMBER OF FLOW', {
      fontSize: '14px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
    
    // Interaction prompt (hidden by default)
    this.interactPrompt = this.add.container(0, 0);
    this.interactPrompt.setScrollFactor(0);
    this.interactPrompt.setDepth(100);
    this.interactPrompt.setVisible(false);
    
    const promptBg = this.add.graphics();
    promptBg.fillStyle(0x000000, 0.8);
    promptBg.fillRoundedRect(-60, -15, 120, 30, 6);
    promptBg.lineStyle(2, 0xfbbf24, 1);
    promptBg.strokeRoundedRect(-60, -15, 120, 30, 6);
    
    const promptText = this.add.text(0, 0, '[SPACE] Talk', {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    
    this.interactPrompt.add([promptBg, promptText]);
    
    // Controls hint (bottom)
    this.add.text(width / 2, this.cameras.main.height - 20, 'WASD or Arrow Keys to Move', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#4a4a6a',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
  }

  /**
   * Create decorative ambient elements
   */
  private createDecorations(): void {
    // Floating particles
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(0, this.MAP_WIDTH * this.TILE_SIZE);
      const y = Phaser.Math.Between(0, this.MAP_HEIGHT * this.TILE_SIZE);
      
      const particle = this.add.circle(x, y, 2, 0x06b6d4, 0.3);
      particle.setDepth(-5);
      
      // Floating animation
      this.tweens.add({
        targets: particle,
        y: y - Phaser.Math.Between(50, 150),
        alpha: 0,
        duration: Phaser.Math.Between(3000, 6000),
        delay: Phaser.Math.Between(0, 3000),
        repeat: -1,
        onRepeat: () => {
          particle.x = Phaser.Math.Between(0, this.MAP_WIDTH * this.TILE_SIZE);
          particle.y = Phaser.Math.Between(this.MAP_HEIGHT * this.TILE_SIZE / 2, this.MAP_HEIGHT * this.TILE_SIZE);
          particle.alpha = 0.3;
        },
      });
      
      this.particles.push(particle);
    }
  }

  /**
   * Setup input handling
   */
  private setupInput(): void {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D') as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };
      
      // ESC to menu
      this.input.keyboard.on('keydown-ESC', () => {
        if (!this.dialogueSystem.isDialogueActive()) {
        this.scene.start('MenuScene');
        }
      });
      
      // SPACE to interact
      this.input.keyboard.on('keydown-SPACE', () => {
        if (this.activeNPC && !this.dialogueSystem.isDialogueActive()) {
          this.interactWithNPC(this.activeNPC);
        }
      });
    }
  }

  /**
   * Show region introduction
   */
  private showRegionIntro(): void {
    const { width, height } = this.cameras.main;
    
    // Fade in from black
    this.cameras.main.fadeIn(1000);
    
    // Region title animation
    const titleContainer = this.add.container(width / 2, height / 2);
    titleContainer.setScrollFactor(0);
    titleContainer.setDepth(200);
    titleContainer.setAlpha(0);
    
    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x000000, 0.7);
    titleBg.fillRect(-200, -50, 400, 100);
    
    const regionText = this.add.text(0, -15, 'PROLOGUE', {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#8b5cf6',
    }).setOrigin(0.5);
    
    const titleText = this.add.text(0, 15, 'CHAMBER OF FLOW', {
      fontSize: '20px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
    }).setOrigin(0.5);
    
    titleContainer.add([titleBg, regionText, titleText]);
    
    // Animate title
    this.tweens.add({
      targets: titleContainer,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.tweens.add({
            targets: titleContainer,
            alpha: 0,
            duration: 500,
            onComplete: () => titleContainer.destroy(),
          });
        });
      },
    });
  }

  /**
   * Interact with an NPC
   */
  private interactWithNPC(npc: NPC): void {
    const dialogue = NPCDialogues[npc.dialogueKey];
    
    if (dialogue) {
      // Start greeting dialogue
      this.dialogueSystem.startDialogue(dialogue.greeting, () => {
        // After greeting, show puzzle intro if available
        if (dialogue.puzzleIntro) {
          this.dialogueSystem.startDialogue(dialogue.puzzleIntro, () => {
            // Start puzzle
            if (npc.puzzleScene) {
              this.startPuzzle(npc.puzzleScene);
            }
          });
        } else if (npc.puzzleScene) {
          this.startPuzzle(npc.puzzleScene);
        }
      });
    }
  }

  /**
   * Start a puzzle scene
   */
  private startPuzzle(sceneName: string): void {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(sceneName, { returnScene: 'GameScene' });
    });
  }

  update(): void {
    if (!this.player || !this.cursors || !this.wasd) return;

    // Don't allow movement during dialogue
    if (this.dialogueSystem.isDialogueActive()) {
      this.player.setVelocity(0, 0);
      return;
    }
    
    // Handle player movement
    this.player.handleMovement(this.cursors, this.wasd);

    // Check for void (falling off platforms)
    this.checkVoidCollision();
    
    // Check NPC proximity
    this.checkNPCProximity();
  }

  /**
   * Check if player is on a valid platform
   */
  private checkVoidCollision(): void {
    if (!this.player) return;
    
    const tileX = Math.floor(this.player.x / this.TILE_SIZE);
    const tileY = Math.floor(this.player.y / this.TILE_SIZE);
    
    // Define valid platform tiles
    const validPlatforms = [
      // Central hub
      { x: 5, y: 6, w: 5, h: 5 },
      // North platform
      { x: 6, y: 2, w: 3, h: 3 },
      // East platform
      { x: 12, y: 5, w: 4, h: 4 },
      // South-East
      { x: 14, y: 10, w: 3, h: 3 },
      // Bridges
      { x: 7, y: 5, w: 1, h: 1 },
      { x: 10, y: 7, w: 2, h: 1 },
      { x: 12, y: 9, w: 1, h: 1 },
    ];
    
    let onPlatform = false;
    for (const p of validPlatforms) {
      if (tileX >= p.x && tileX < p.x + p.w && tileY >= p.y && tileY < p.y + p.h) {
        onPlatform = true;
        break;
      }
    }
    
    if (!onPlatform) {
      this.respawnPlayer();
    }
  }

  /**
   * Check proximity to NPCs for interaction
   */
  private checkNPCProximity(): void {
    if (!this.player) return;
    
    this.activeNPC = null;
    
    for (const npc of this.npcs) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        npc.sprite.x, npc.sprite.y
      );
      
      if (distance < npc.interactionRadius) {
        this.activeNPC = npc;
        break;
      }
    }
    
    // Update interaction prompt
    if (this.activeNPC && this.interactPrompt) {
      this.interactPrompt.setVisible(true);
      this.interactPrompt.setPosition(
        this.cameras.main.width / 2,
        this.cameras.main.height - 80
      );
    } else if (this.interactPrompt) {
      this.interactPrompt.setVisible(false);
    }
  }

  /**
   * Respawn player after falling into void
   */
  private respawnPlayer(): void {
    if (!this.player) return;
    
    // Respawn at hub center
    this.player.setPosition(7.5 * this.TILE_SIZE, 8 * this.TILE_SIZE);
    
    // Camera shake and flash
    this.cameras.main.shake(200, 0.01);
    this.cameras.main.flash(200, 50, 0, 100);
  }
}
