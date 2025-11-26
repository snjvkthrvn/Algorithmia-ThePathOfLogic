import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class Room2Scene extends Phaser.Scene {
  private player?: Player;
  private walls?: Phaser.Physics.Arcade.StaticGroup;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  
  // FIXED: Strict Type Definition
  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  
  // Interaction
  private puzzleTrigger!: Phaser.Physics.Arcade.Sprite;
  private interactionZone!: Phaser.GameObjects.Zone; 
  private interactText?: Phaser.GameObjects.Text;
  
  // UI
  private dialogContainer?: Phaser.GameObjects.Container;
  private isDialogActive: boolean = true;

  constructor() {
    super({ key: 'Room2Scene' });
  }

  create(): void {
    // 1. SETUP WORLD
    const bg = this.add.rectangle(0, 0, 2000, 2000, 0x5c7c32); 
    bg.setScrollFactor(0);
    this.physics.world.setBounds(0, 0, 2000, 2000);
    this.walls = this.physics.add.staticGroup();
    this.createFarmLayout();

    // 2. PLAYER
    this.player = new Player(this, 100, 300); 
    this.physics.add.collider(this.player, this.walls);

    // 3. CAMERA
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 1280, 1000); 

    // 4. TRIGGER (The Red Box)
    this.puzzleTrigger = this.physics.add.sprite(128, 128, 'wall-tile');
    this.puzzleTrigger.setTint(0xff0000); 
    this.puzzleTrigger.setImmovable(true);
    this.physics.add.collider(this.player, this.puzzleTrigger);

    // 5. SENSOR ZONE (FIXED)
    this.interactionZone = this.add.zone(128, 128, 150, 150);
    this.physics.world.enable(this.interactionZone);
    const zoneBody = this.interactionZone.body as Phaser.Physics.Arcade.Body;
    zoneBody.setAllowGravity(false);
    zoneBody.setImmovable(true); 
    // removed .setMoves(false) as setImmovable is sufficient for a sensor

    // 6. VISUAL GUIDANCE
    const arrow = this.add.text(128, 60, '⬇', {
        fontSize: '32px', color: '#ffff00', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
        targets: arrow, y: 80, duration: 600, yoyo: true, repeat: -1
    });

    // 7. INPUTS
    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // FIXED: Strict Casting
        this.wasd = this.input.keyboard.addKeys('W,A,S,D') as {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        };
        
        // Dialog Skip
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.isDialogActive) this.closeDialog();
        });
    }

    // 8. SHOW INTRO DIALOG
    this.createDialogBox("SYSTEM ALERT:\nData Corruption detected at Index [1].\nNavigate to the Red Sector to repair.");
  }

  update(): void {
    if (!this.player || !this.cursors || !this.wasd) return;

    // FREEZE MOVEMENT if Dialog is open
    if (this.isDialogActive) {
        this.player.setVelocity(0, 0);
        return;
    }

    // MOVEMENT
    this.player.handleMovement(this.cursors, this.wasd);
    
    // Bounds check
    if (this.player.x < 50) this.scene.start('GameScene'); 

    // INTERACTION CHECK (FIXED: Removed unused vars)
    if (this.physics.world.overlap(this.player, this.interactionZone)) {
        this.showInteractPrompt(true);
        if (this.cursors.space.isDown) {
            this.scene.start('Puzzle_AP1_Scene');
        }
    } else {
        this.showInteractPrompt(false);
    }
  }

  private closeDialog() {
    if (this.dialogContainer) {
        this.dialogContainer.destroy();
        this.dialogContainer = undefined;
    }
    this.isDialogActive = false;
    
    // Add HUD
    this.add.text(10, 10, 'MISSION: Fix Index [1]', {
            fontSize: '16px', color: '#fff', backgroundColor: '#000' 
    }).setScrollFactor(0);
  }

  private createDialogBox(text: string) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    this.dialogContainer = this.add.container(0, 0);
    this.dialogContainer.setScrollFactor(0).setDepth(1000); 

    const box = this.add.rectangle(width/2, height - 100, width - 100, 150, 0x000000, 0.9);
    box.setStrokeStyle(4, 0xffffff);
    
    const content = this.add.text(100, height - 150, text + "\n\n[PRESS SPACE]", {
        fontSize: '20px', color: '#ffffff', fontFamily: 'monospace', wordWrap: { width: width - 200 }
    });

    this.dialogContainer.add([box, content]);
  }

  private showInteractPrompt(visible: boolean) {
    if (!this.interactText) {
        this.interactText = this.add.text(0, 0, 'PRESS SPACE', {
            fontSize: '16px', backgroundColor: '#000', padding: { x:4, y:4 }
        }).setDepth(200);
    }
    
    if (visible) {
        this.interactText.setVisible(true);
        this.interactText.setPosition(this.puzzleTrigger.x - 40, this.puzzleTrigger.y - 60);
    } else {
        this.interactText.setVisible(false);
    }
  }

  private createFarmLayout(): void {
    const tileSize = 64;
    for(let x = 0; x < 15; x++) {
        // Path
        this.add.image(x * tileSize, 4 * tileSize, 'floor-tile').setTint(0xd2b48c);
        this.add.image(x * tileSize, 5 * tileSize, 'floor-tile').setTint(0xd2b48c);
        
        if (x % 2 === 0) {
            const cropTop = this.walls!.create(x * tileSize, 2 * tileSize, 'wall-tile');
            cropTop.setTint(0x228b22);
            const cropBot = this.walls!.create(x * tileSize, 7 * tileSize, 'wall-tile');
            cropBot.setTint(0x228b22);
            
            this.walls!.create(x * tileSize, 2 * tileSize, 'wall-tile').refreshBody();
            this.walls!.create(x * tileSize, 7 * tileSize, 'wall-tile').refreshBody();

            const index = x / 2;
            this.add.text(x * tileSize, 1.5 * tileSize, `[${index}]`, { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
            this.add.text(x * tileSize, 7.5 * tileSize, `[${index}]`, { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
        }
    }
  }
}