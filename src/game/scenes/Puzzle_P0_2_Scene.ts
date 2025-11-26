import Phaser from 'phaser';

export class Puzzle_P0_2_Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Puzzle_P0_2_Scene' });
  }

  private shards: Phaser.Physics.Arcade.Sprite[] = [];
  private sockets: { x: number; y: number; shardColor: string }[] = [];
  private lockedShards: Set<string> = new Set();

  create(): void {
    this.cameras.main.setBackgroundColor('#0a0a14');
    // Setup camera
    this.cameras.main.centerOn(400, 300);
    // Create platform tiles
    this.createPlatform();
    // Add Sentinel frame in center
    // Add Sentinel frame in center
    this.add.image(424, 360, 'sentinel-frame').setScale(2);

    // Add Sentinel frame
    this.add.image(424, 360, 'sentinel-frame').setScale(2);

    // ADD THIS BLOCK:
    this.add.text(400, 50, 'Drag shards to matching sockets', {
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
        
    // Define socket positions (aligned with sentinel frame sockets)
    // MOVE THIS UP
    this.sockets = [
  { x: 424, y: 255, shardColor: 'cyan' },   // Top socket
  { x: 424, y: 300, shardColor: 'purple' }, // Middle socket
  { x: 424, y: 345, shardColor: 'orange' }  // Bottom socket
];

    // Debug: Show socket positions
    // MOVE THIS DOWN (to after the array definition)
    // Create scattered shards
    this.createShards();
    // ESC to return to menu
    // ESC to return to menu
        this.input.keyboard?.on('keydown-ESC', () => {
        this.scene.start('MenuScene');
        });

        // Setup drag events
        this.input.on('drag', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
        const sprite = gameObject as Phaser.Physics.Arcade.Sprite;
        sprite.x = dragX;
        sprite.y = dragY;
        });
        this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        this.checkSocketSnap(gameObject as Phaser.Physics.Arcade.Sprite);
});
  }
  private createPlatform(): void {
    const tileSize = 64;
    const startX = 200;
    const startY = 100;
    
    // Create 7x7 platform
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        const x = startX + col * tileSize;
        const y = startY + row * tileSize;
        this.add.image(x, y, 'platform-tile').setOrigin(0, 0);
      }
    }
  }
  private createShards(): void {
    // Scatter shards around the platform
    const shardPositions = [
      { x: 250, y: 180, color: 'cyan' },
      { x: 520, y: 250, color: 'purple' },
      { x: 300, y: 420, color: 'orange' }
    ];

    shardPositions.forEach(pos => {
      const shard = this.physics.add.sprite(pos.x, pos.y, `shard-${pos.color}`);
      shard.setScale(1.5);
      shard.setData('color', pos.color);
      shard.setInteractive();
      this.input.setDraggable(shard);
      this.shards.push(shard);
    });
  }
  private checkSocketSnap(shard: Phaser.Physics.Arcade.Sprite): void {
  const shardColor = shard.getData('color');
  const snapDistance = 30;
  
  // Check each socket
  for (const socket of this.sockets) {
    const distance = Phaser.Math.Distance.Between(shard.x, shard.y, socket.x, socket.y);
    
    if (distance < snapDistance) {
      // Shard is close to this socket
      if (socket.shardColor === shardColor) {
          // Correct socket! Snap it in place
          shard.x = socket.x;
          shard.y = socket.y;
          shard.disableInteractive();
          this.lockedShards.add(shardColor);
          this.checkWinCondition();
          
          // ADD THIS: Pop animation
          this.tweens.add({
            targets: shard,
            scale: { from: 1.5, to: 1.8 }, // Pulse size
            alpha: { from: 1, to: 1 },     // (Optional: could flash)
            duration: 150,
            yoyo: true,
            ease: 'Sine.easeInOut'
          });

          console.log(`${shardColor} shard locked!`);
        }else{
            this.tweens.add({
            targets: shard,
            x: shard.x + 10,
            duration: 50,
            yoyo: true,
            repeat: 3,
            ease: 'Sine.easeInOut'
          });
          console.log(`${shardColor} shard doesn't fit in ${socket.shardColor} socket`);
        }
      return;
    }
  }
}
private checkWinCondition(): void {
    if (this.lockedShards.size === 3) {
      console.log('Puzzle Complete!');
      
      // Delay slightly so the player sees the last piece lock
      this.time.delayedCall(500, () => {
        // Fade out
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        
        // When fade finishes, go to Concept Bridge
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.start('ConceptBridgeScene', {
            puzzleName: 'The Fractured Sentinel', // Changed from 'title' to matches ConceptBridgeScene
            concept: 'Key-Value Mapping',
            attempts: 1, // Required by ConceptBridgeScene
            timeSpent: 0, // Required by ConceptBridgeScene
            description: 'You just used specific keys (sockets) to find the exact location for values (shards). This is how Hash Maps work! Each key points to exactly one value.',
            code: `// Hash Map Logic
const sentinel = new Map();

            // Mapping Keys -> Values
            sentinel.set("top", "cyan_shard");
            sentinel.set("mid", "purple_shard");
            sentinel.set("bot", "orange_shard");

            // Instant Access (O(1))
            print(sentinel.get("mid"));
            // Output: "purple_shard"`
          });
        });
      });
    }
  }
}