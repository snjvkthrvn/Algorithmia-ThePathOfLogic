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
  
  // Triggers
  private sentinel!: Phaser.Physics.Arcade.Sprite;
  private runeZone!: Phaser.GameObjects.Rectangle; // Changed to Rectangle for visibility
  private portalZone!: Phaser.GameObjects.Rectangle; // New Portal
  
  // UI
  private interactText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    // 1. THEME: Abstract Void
    const bg = this.add.rectangle(0, 0, 2000, 2000, 0x0f172a); 
    bg.setScrollFactor(0);

    // 2. CREATE WORLD (Compact)
    this.walls = this.physics.add.staticGroup();
    this.createPrologueMap();

    // 3. CREATE PLAYER
    this.player = new Player(this, 400, 400); 
    this.physics.add.collider(this.player, this.walls);

    // 4. CAMERA
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 1280, 1280);

    // 5. OBJECTS & TRIGGERS

    // --- Puzzle 1: THE PATH (North) ---
    // Using a Neon Cyan Rectangle so it's 100% visible
    this.runeZone = this.add.rectangle(400, 180, 80, 80, 0x00ffff, 0.6);
    this.physics.add.existing(this.runeZone, true); // true = static body
    
    // Pulse Animation
    this.tweens.add({
        targets: this.runeZone,
        alpha: 0.2,
        duration: 1500,
        yoyo: true,
        repeat: -1
    });

    // --- Puzzle 2: SENTINEL (South-East) ---
    this.sentinel = this.physics.add.sprite(700, 600, 'sentinel-frame');
    this.sentinel.setScale(0.5); 
    this.sentinel.setImmovable(true);
    this.sentinel.setSize(128, 128); 
    this.sentinel.setOffset(64, 64);
    this.physics.add.collider(this.player, this.sentinel);

    // --- EXIT: PORTAL TO ARRAY PLAINS (East) ---
    // A Purple Gateway at the edge of the East platform
    this.portalZone = this.add.rectangle(900, 400, 64, 120, 0x9b59b6, 0.8);
    this.physics.add.existing(this.portalZone, true);

    // 6. INPUTS
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D') as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };
      
      this.input.keyboard.on('keydown-ESC', () => {
        this.scene.start('MenuScene');
      });
    }

    // 7. UI - LABELS (High contrast)
    this.addLabel(400, 100, 'PUZZLE 1: THE PATH');
    this.addLabel(700, 500, 'PUZZLE 2: SENTINEL');
    this.addLabel(900, 300, 'GATEWAY: ARRAY PLAINS');

    this.interactText = this.add.text(0, 0, 'Press SPACE', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffff00',
      backgroundColor: '#000000aa',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5).setVisible(false).setDepth(100);
  }

  update(): void {
    if (!this.player || !this.cursors || !this.wasd) return;

    this.player.handleMovement(this.cursors, this.wasd);

    // --- VOID MECHANIC (Compact Bounds) ---
    const tileX = Math.floor(this.player.x / 64);
    const tileY = Math.floor(this.player.y / 64);
    
    // Defined safe zones based on the map layout below
    const onCenter = (tileX >= 4 && tileX <= 8 && tileY >= 4 && tileY <= 8);
    const onNorth = (tileX >= 5 && tileX <= 7 && tileY >= 1 && tileY <= 3);
    const onEast = (tileX >= 9 && tileX <= 14 && tileY >= 5 && tileY <= 7);
    const onSouthEast = (tileX >= 8 && tileX <= 11 && tileY >= 8 && tileY <= 11);

    if (!onCenter && !onNorth && !onEast && !onSouthEast) {
        this.respawnPlayer();
    }

    // --- INTERACTION LOGIC ---
    let canInteract = false;
    let targetPuzzle = '';

    // 1. Puzzle 1 (Zone Overlap)
    // We use Physics Overlap for the zone instead of distance check
    if (this.physics.overlap(this.player, this.runeZone)) {
        canInteract = true;
        targetPuzzle = 'Puzzle_P0_1_Scene';
        this.interactText?.setPosition(this.runeZone.x, this.runeZone.y - 60);
    }

    // 2. Sentinel (Distance)
    if (!canInteract && this.sentinel) {
        const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.sentinel.x, this.sentinel.y);
        if (dist < 100) {
            canInteract = true;
            targetPuzzle = 'Puzzle_P0_2_Scene';
            this.interactText?.setPosition(this.sentinel.x, this.sentinel.y - 80);
        }
    }

    // 3. Portal (Exit)
    if (this.physics.overlap(this.player, this.portalZone)) {
        // Auto-travel or prompt? Let's prompt to be safe, or auto.
        // Let's use Space to enter gate to prevent accidental exits.
        this.interactText?.setText("ENTER GATE [SPACE]");
        this.interactText?.setPosition(this.portalZone.x, this.portalZone.y - 80).setVisible(true);
        
        if (this.cursors.space.isDown) {
            this.scene.start('Room2Scene');
        }
        return; // Skip standard interact logic
    } else {
        // Reset text if not on portal
        this.interactText?.setText("Press SPACE");
    }

    // Show/Hide UI for Puzzles
    if (canInteract) {
        this.interactText?.setVisible(true);
        if (this.cursors.space.isDown) {
            this.scene.start(targetPuzzle);
        }
    } else if (!this.physics.overlap(this.player, this.portalZone)) {
        this.interactText?.setVisible(false);
    }
  }

  private respawnPlayer(): void {
    this.player?.setPosition(400, 400);
    this.cameras.main.shake(200, 0.01);
  }

  private createPrologueMap(): void {
    const tileSize = 64;
    const platforms = [
      { x: 4, y: 4, w: 5, h: 5 }, // Central Hub
      { x: 5, y: 1, w: 3, h: 3 }, // North (Puzzle 1)
      { x: 9, y: 5, w: 6, h: 3 }, // East (Exit Gate) - Compact again!
      { x: 8, y: 8, w: 4, h: 4 }, // South-East (Puzzle 2)
    ];

    platforms.forEach(p => {
      for(let r = 0; r < p.h; r++) {
        for(let c = 0; c < p.w; c++) {
          this.add.image((p.x + c) * tileSize, (p.y + r) * tileSize, 'floor-tile').setOrigin(0);
        }
      }
    });
  }

  private addLabel(x: number, y: number, text: string): void {
    this.add.text(x, y, text, {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 }
    }).setOrigin(0.5).setDepth(10);
  }
}