import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class Room2Scene extends Phaser.Scene {
  private player?: Player;
  private walls?: Phaser.Physics.Arcade.StaticGroup;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  
  // WASD Keys
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
    // 1. FIX BACKGROUND (Infinite Green)
    // This removes the "Blue" and "Grey" bars
    this.cameras.main.setBackgroundColor('#5c7c32'); 

    // 2. SETUP WORLD
    // Make bounds large enough to center the content
    this.physics.world.setBounds(0, 0, 2000, 2000);
    this.walls = this.physics.add.staticGroup();
    
    // Offset to center the farm on screen
    const offsetX = 300; 
    this.createFarmLayout(offsetX);

    // 3. PLAYER (Spawn shifted by offset)
    this.player = new Player(this, 100 + offsetX, 300); 
    this.physics.add.collider(this.player, this.walls);

    // 4. CAMERA
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 2000, 2000); 

    // 5. TRIGGER (The Red Box - Index 1)
    // Index 1 is at x=2 in our loop (since we skip every other for crops)
    // Logic: offsetX + (2 * 64) = Trigger X
    const triggerX = offsetX + 128;
    const triggerY = 128;

    this.puzzleTrigger = this.physics.add.sprite(triggerX, triggerY, 'wall-tile');
    this.puzzleTrigger.setTint(0xff0000); 
    this.puzzleTrigger.setImmovable(true);
    this.physics.add.collider(this.player, this.puzzleTrigger);

    // 6. SENSOR ZONE
    this.interactionZone = this.add.zone(triggerX, triggerY, 150, 150);
    this.physics.world.enable(this.interactionZone);
    const zoneBody = this.interactionZone.body as Phaser.Physics.Arcade.Body;
    zoneBody.setAllowGravity(false);
    zoneBody.setImmovable(true); 

    // 7. VISUAL GUIDANCE (Arrow)
    const arrow = this.add.text(triggerX, triggerY - 70, '⬇', {
        fontSize: '32px', color: '#ffff00', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
        targets: arrow, y: triggerY - 50, duration: 600, yoyo: true, repeat: -1
    });

    // 8. INPUTS
    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.wasd = this.input.keyboard.addKeys('W,A,S,D') as {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        };
        
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.isDialogActive) this.closeDialog();
        });
    }

    // 9. SHOW INTRO DIALOG
    this.createDialogBox("SYSTEM ALERT:\nData Corruption detected at Index [1].\nNavigate to the Red Sector to repair.");
  }

  update(): void {
    if (!this.player || !this.cursors || !this.wasd) return;

    if (this.isDialogActive) {
        this.player.setVelocity(0, 0);
        return;
    }

    this.player.handleMovement(this.cursors, this.wasd);
    
    // Bounds check (Exit to Hub - Adjusted for offset)
    if (this.player.x < 50) this.scene.start('GameScene'); 

    // INTERACTION CHECK
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

  private createFarmLayout(offsetX: number): void {
    const tileSize = 64;
    for(let x = 0; x < 15; x++) {
        const xPos = offsetX + (x * tileSize);

        // Path
        this.add.image(xPos, 4 * tileSize, 'floor-tile').setTint(0xd2b48c);
        this.add.image(xPos, 5 * tileSize, 'floor-tile').setTint(0xd2b48c);
        
        if (x % 2 === 0) {
            // Walls
            const cropTop = this.walls!.create(xPos, 2 * tileSize, 'wall-tile');
            cropTop.setTint(0x228b22);
            const cropBot = this.walls!.create(xPos, 7 * tileSize, 'wall-tile');
            cropBot.setTint(0x228b22);
            
            this.walls!.create(xPos, 2 * tileSize, 'wall-tile').refreshBody();
            this.walls!.create(xPos, 7 * tileSize, 'wall-tile').refreshBody();

            const index = x / 2;
            this.add.text(xPos, 1.5 * tileSize, `[${index}]`, { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
            this.add.text(xPos, 7.5 * tileSize, `[${index}]`, { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
        }
    }
  }
}