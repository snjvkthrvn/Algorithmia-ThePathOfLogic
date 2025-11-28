import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';

/**
 * Shard definition with symbol properties
 */
interface FlowShard {
  container: Phaser.GameObjects.Container;
  id: string;
  shape: 'triangle' | 'diamond' | 'circle';
  stripe: 'double' | 'single' | 'triple';
  color: number;
  originalPosition: { x: number; y: number };
  isPlaced: boolean;
}

/**
 * Console definition with matching symbols
 */
interface FlowConsole {
  container: Phaser.GameObjects.Container;
  id: string;
  shape: 'triangle' | 'diamond' | 'circle';
  stripe: 'double' | 'single' | 'triple';
  color: number;
  position: { x: number; y: number };
  isFilled: boolean;
}

/**
 * Puzzle P0-2: Flow Consoles
 * Concept: Mapping, Key-Value Relationships, Hash Function Basics
 * 
 * Match crystal shards to their corresponding consoles based on symbol combinations.
 * Each shard has a shape + stripe pattern that maps to exactly one console.
 */
export class Puzzle_P0_2_Scene extends BasePuzzleScene {
  // Shards and consoles
  private shards: FlowShard[] = [];
  private consoles: FlowConsole[] = [];
  
  // Central core
  private centralCore!: Phaser.GameObjects.Container;
  private flowLines: Phaser.GameObjects.Graphics[] = [];
  
  // UI elements
  private statusText!: Phaser.GameObjects.Text;
  private progressIndicator!: Phaser.GameObjects.Container;
  
  // Shard/Console definitions (shape + stripe = unique identifier)
  private readonly definitions = [
    { id: 'A', shape: 'triangle' as const, stripe: 'double' as const, color: 0xef4444 }, // Red
    { id: 'B', shape: 'diamond' as const, stripe: 'single' as const, color: 0x3b82f6 },  // Blue
    { id: 'C', shape: 'circle' as const, stripe: 'triple' as const, color: 0x22c55e },   // Green
  ];
  
  // Hints
  private hints: string[] = [
    'Look at both the SHAPE and the STRIPE pattern on each shard.',
    'Triangle + double lines → find the console with triangle + double lines.',
    'Match shapes first, then confirm the stripe pattern matches too!'
  ];

  constructor() {
    super({ key: 'Puzzle_P0_2_Scene' });
    this.puzzleId = 'P0-2';
    this.puzzleName = 'FLOW CONSOLES';
    this.puzzleDescription = 'Match each shard to its console. Both shape AND stripe must match!';
  }

  create(): void {
    super.create();
    
    // Reset state
    this.shards = [];
    this.consoles = [];
    this.flowLines = [];
    // draggedShard tracking removed - not currently used
    
    // Create puzzle elements
    this.createPuzzleArea();
    
    // Setup drag events
    this.setupDragEvents();
  }

  /**
   * Create the puzzle area with all elements
   */
  private createPuzzleArea(): void {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Status text
    this.statusText = this.add.text(centerX, 145, 'Drag each shard to its matching console', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    
    // Create central core (activates when all connected)
    this.createCentralCore(centerX, centerY - 60);
    
    // Create consoles (above core)
    this.createConsoles(centerX, centerY - 20);
    
    // Create shards (scattered below)
    this.createShards(centerX, centerY + 120);
    
    // Create progress indicator
    this.createProgressIndicator(centerX, height - 95);
    
    // Create legend showing symbol meanings
    this.createSymbolLegend(80, 200);
  }

  /**
   * Create the central core that activates when all consoles are filled
   */
  private createCentralCore(x: number, y: number): void {
    this.centralCore = this.add.container(x, y);
    
    // Outer ring
    const outerRing = this.add.graphics();
    outerRing.lineStyle(4, 0x4a4a6a, 1);
    outerRing.strokeCircle(0, 0, 50);
    outerRing.setName('outerRing');
    
    // Inner ring
    const innerRing = this.add.graphics();
    innerRing.lineStyle(3, 0x3a3a5a, 1);
    innerRing.strokeCircle(0, 0, 35);
    
    // Core (inactive)
    const core = this.add.circle(0, 0, 25, 0x2a2a4a);
    core.setName('core');
    
    // Core eye (activates on completion)
    const coreEye = this.add.circle(0, 0, 15, 0x1a1a2e);
    coreEye.setName('coreEye');
    
    // Label
    const label = this.add.text(0, 70, 'CENTRAL CORE', {
      fontSize: '8px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#4a4a6a',
    }).setOrigin(0.5);
    
    this.centralCore.add([outerRing, innerRing, core, coreEye, label]);
    
    // Subtle pulse animation
    this.tweens.add({
      targets: core,
      scale: 1.05,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /**
   * Create the three consoles
   */
  private createConsoles(centerX: number, centerY: number): void {
    const consoleSpacing = 140;
    const consolePositions = [
      { x: centerX - consoleSpacing, y: centerY },
      { x: centerX, y: centerY + 40 },
      { x: centerX + consoleSpacing, y: centerY },
    ];
    
    // Shuffle definition assignment for consoles (keeps puzzle interesting)
    const shuffledDefs = [...this.definitions].sort(() => Math.random() - 0.5);
    
    shuffledDefs.forEach((def, index) => {
      const pos = consolePositions[index];
      const console = this.createConsole(pos.x, pos.y, def);
      this.consoles.push(console);
    });
  }

  /**
   * Create a single console
   */
  private createConsole(x: number, y: number, def: typeof this.definitions[0]): FlowConsole {
    const container = this.add.container(x, y);
    
    // Console body shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.4);
    shadow.fillRoundedRect(-38, -28, 76, 56, 8);
    
    // Console body
    const body = this.add.graphics();
    body.fillStyle(0x2a2a4a, 1);
    body.fillRoundedRect(-35, -25, 70, 50, 6);
    body.lineStyle(2, 0x4a4a6a, 1);
    body.strokeRoundedRect(-35, -25, 70, 50, 6);
    
    // Display screen showing required symbol
    const screen = this.add.graphics();
    screen.fillStyle(0x1a1a2e, 1);
    screen.fillRect(-28, -18, 56, 28);
    screen.lineStyle(1, def.color, 0.5);
    screen.strokeRect(-28, -18, 56, 28);
    
    // Symbol on screen (shape)
    const symbolGraphics = this.add.graphics();
    symbolGraphics.fillStyle(def.color, 0.8);
    this.drawShape(symbolGraphics, 0, -10, def.shape, 12);
    
    // Stripe indicator below shape
    const stripeGraphics = this.add.graphics();
    stripeGraphics.lineStyle(2, def.color, 0.8);
    this.drawStripe(stripeGraphics, 0, 3, def.stripe);
    
    // Socket indicator (where shard goes)
    const socket = this.add.graphics();
    socket.fillStyle(0x1a1a2e, 1);
    socket.fillCircle(0, 35, 18);
    socket.lineStyle(2, def.color, 0.4);
    socket.strokeCircle(0, 35, 18);
    socket.setName('socket');
    
    // Pulsing glow hint
    const socketGlow = this.add.circle(0, 35, 22, def.color, 0.15);
    socketGlow.setName('socketGlow');
    this.tweens.add({
      targets: socketGlow,
      scale: 1.2,
      alpha: 0.3,
      duration: 1200,
      yoyo: true,
      repeat: -1,
    });
    
    container.add([shadow, body, screen, symbolGraphics, stripeGraphics, socketGlow, socket]);
    container.setData('def', def);
    
    return {
      container,
      id: def.id,
      shape: def.shape,
      stripe: def.stripe,
      color: def.color,
      position: { x, y },
      isFilled: false,
    };
  }

  /**
   * Create the three shards
   */
  private createShards(centerX: number, centerY: number): void {
    // Scattered positions for shards
    const shardPositions = [
      { x: centerX - 150, y: centerY + 20 },
      { x: centerX + 30, y: centerY - 10 },
      { x: centerX + 160, y: centerY + 30 },
    ];
    
    // Shuffle shard positions (different from console order)
    const shuffledPositions = [...shardPositions].sort(() => Math.random() - 0.5);
    
    this.definitions.forEach((def, index) => {
      const pos = shuffledPositions[index];
      const shard = this.createShard(pos.x, pos.y, def);
      this.shards.push(shard);
    });
  }

  /**
   * Create a single shard
   */
  private createShard(x: number, y: number, def: typeof this.definitions[0]): FlowShard {
    const container = this.add.container(x, y);
    
    // Shard shadow
    const shadow = this.add.ellipse(3, 4, 44, 32, 0x000000, 0.35);
    
    // Crystal body (hexagonal shape)
    const crystal = this.add.graphics();
    crystal.fillStyle(def.color, 1);
    crystal.beginPath();
    crystal.moveTo(0, -22);
    crystal.lineTo(16, -11);
    crystal.lineTo(16, 11);
    crystal.lineTo(0, 22);
    crystal.lineTo(-16, 11);
    crystal.lineTo(-16, -11);
    crystal.closePath();
    crystal.fillPath();
    
    // Crystal highlight
    crystal.fillStyle(0xffffff, 0.25);
    crystal.beginPath();
    crystal.moveTo(0, -22);
    crystal.lineTo(16, -11);
    crystal.lineTo(8, -6);
    crystal.lineTo(-8, -6);
    crystal.lineTo(-16, -11);
    crystal.closePath();
    crystal.fillPath();
    
    // Crystal border
    crystal.lineStyle(2, this.adjustBrightness(def.color, 0.6), 1);
    crystal.beginPath();
    crystal.moveTo(0, -22);
    crystal.lineTo(16, -11);
    crystal.lineTo(16, 11);
    crystal.lineTo(0, 22);
    crystal.lineTo(-16, 11);
    crystal.lineTo(-16, -11);
    crystal.closePath();
    crystal.strokePath();
    
    // Shape symbol inside
    const symbol = this.add.graphics();
    symbol.fillStyle(0xffffff, 0.9);
    this.drawShape(symbol, 0, -4, def.shape, 8);
    
    // Stripe indicator
    const stripe = this.add.graphics();
    stripe.lineStyle(2, 0xffffff, 0.9);
    this.drawStripe(stripe, 0, 8, def.stripe);
    
    // Inner glow
    const glow = this.add.circle(0, 0, 14, def.color, 0.3);
    
    container.add([shadow, crystal, glow, symbol, stripe]);
    container.setSize(40, 50);
    container.setData('def', def);
    
    // Make interactive
    container.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-20, -25, 40, 50),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
      draggable: true,
    });
    
    // Hover effects
    container.on('pointerover', () => {
      if (!this.shards.find(s => s.container === container)?.isPlaced) {
        this.tweens.add({
          targets: container,
          scale: 1.15,
          duration: 150,
        });
      }
    });
    
    container.on('pointerout', () => {
      if (!this.shards.find(s => s.container === container)?.isPlaced) {
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
      y: y - 6,
      duration: 1500 + Math.random() * 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    return {
      container,
      id: def.id,
      shape: def.shape,
      stripe: def.stripe,
      color: def.color,
      originalPosition: { x, y },
      isPlaced: false,
    };
  }

  /**
   * Draw a shape (triangle, diamond, circle)
   */
  private drawShape(graphics: Phaser.GameObjects.Graphics, x: number, y: number, shape: string, size: number): void {
    switch (shape) {
      case 'triangle':
        graphics.fillTriangle(x, y - size, x - size, y + size * 0.7, x + size, y + size * 0.7);
        break;
      case 'diamond':
        graphics.beginPath();
        graphics.moveTo(x, y - size);
        graphics.lineTo(x + size * 0.7, y);
        graphics.lineTo(x, y + size);
        graphics.lineTo(x - size * 0.7, y);
        graphics.closePath();
        graphics.fillPath();
        break;
      case 'circle':
        graphics.fillCircle(x, y, size * 0.7);
        break;
    }
  }

  /**
   * Draw stripe pattern (single, double, triple)
   */
  private drawStripe(graphics: Phaser.GameObjects.Graphics, x: number, y: number, stripe: string): void {
    const lineWidth = 12;
    const lineSpacing = 4;
    
    switch (stripe) {
      case 'single':
        graphics.lineBetween(x - lineWidth / 2, y, x + lineWidth / 2, y);
        break;
      case 'double':
        graphics.lineBetween(x - lineWidth / 2, y - lineSpacing / 2, x + lineWidth / 2, y - lineSpacing / 2);
        graphics.lineBetween(x - lineWidth / 2, y + lineSpacing / 2, x + lineWidth / 2, y + lineSpacing / 2);
        break;
      case 'triple':
        graphics.lineBetween(x - lineWidth / 2, y - lineSpacing, x + lineWidth / 2, y - lineSpacing);
        graphics.lineBetween(x - lineWidth / 2, y, x + lineWidth / 2, y);
        graphics.lineBetween(x - lineWidth / 2, y + lineSpacing, x + lineWidth / 2, y + lineSpacing);
        break;
    }
  }

  /**
   * Create symbol legend
   */
  private createSymbolLegend(x: number, y: number): void {
    const container = this.add.container(x, y);
    
    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x1a1a2e, 0.9);
    bg.fillRoundedRect(-40, -20, 80, 160, 8);
    bg.lineStyle(1, 0x4a4a6a);
    bg.strokeRoundedRect(-40, -20, 80, 160, 8);
    
    // Title
    const title = this.add.text(0, -10, 'SYMBOLS', {
      fontSize: '8px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#6a6a8a',
    }).setOrigin(0.5);
    
    // Legend items
    const items = [
      { shape: 'triangle', label: '△ Triangle' },
      { shape: 'diamond', label: '◇ Diamond' },
      { shape: 'circle', label: '○ Circle' },
    ];
    
    items.forEach((item, i) => {
      const itemY = 20 + i * 35;
      
      const itemText = this.add.text(0, itemY, item.label, {
        fontSize: '7px',
        fontFamily: 'monospace',
        color: '#9ca3af',
      }).setOrigin(0.5);
      
      container.add(itemText);
    });
    
    // Stripe legend
    const stripeTitle = this.add.text(0, 120, 'STRIPES', {
      fontSize: '6px',
      fontFamily: 'monospace',
      color: '#6a6a8a',
    }).setOrigin(0.5);
    
    container.add([bg, title, stripeTitle]);
  }

  /**
   * Create progress indicator
   */
  private createProgressIndicator(x: number, y: number): void {
    this.progressIndicator = this.add.container(x, y);
    this.updateProgressIndicator();
  }

  /**
   * Update progress indicator
   */
  private updateProgressIndicator(): void {
    this.progressIndicator.removeAll(true);
    
    const placedCount = this.shards.filter(s => s.isPlaced).length;
    
    // Progress text
    const text = this.add.text(0, 0, `${placedCount} / 3 shards placed`, {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: placedCount === 3 ? '#22c55e' : '#9ca3af',
    }).setOrigin(0.5);
    
    // Progress dots
    for (let i = 0; i < 3; i++) {
      const dotX = (i - 1) * 25;
      const filled = i < placedCount;
      
      const dot = this.add.circle(dotX, 20, 8, filled ? this.definitions[i].color : 0x2a2a4a);
      dot.setStrokeStyle(2, filled ? this.definitions[i].color : 0x4a4a6a);
      
      this.progressIndicator.add(dot);
    }
    
    this.progressIndicator.add(text);
  }

  /**
   * Setup drag events for shards
   */
  private setupDragEvents(): void {
    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
      const shard = this.shards.find(s => s.container === gameObject);
      if (!shard || shard.isPlaced) return;
      
      // Track dragged shard for potential future use
      void shard;
      gameObject.setDepth(100);
      
      // Stop floating animation
      this.tweens.killTweensOf(gameObject);
    });
    
    this.input.on('drag', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container, dragX: number, dragY: number) => {
      const shard = this.shards.find(s => s.container === gameObject);
      if (!shard || shard.isPlaced) return;
      
      gameObject.x = dragX;
      gameObject.y = dragY;
      
      // Check proximity to consoles for visual feedback
      this.checkProximityFeedback(shard);
    });
    
    this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
      const shard = this.shards.find(s => s.container === gameObject);
      if (!shard || shard.isPlaced) return;
      
      // draggedShard tracking removed - not currently used
      gameObject.setDepth(1);
      
      // Check if dropped on matching console
      this.checkDrop(shard);
    });
  }

  /**
   * Check proximity to consoles and provide visual feedback
   */
  private checkProximityFeedback(shard: FlowShard): void {
    const snapDistance = 60;
    
    for (const console of this.consoles) {
      if (console.isFilled) continue;
      
      const distance = Phaser.Math.Distance.Between(
        shard.container.x, shard.container.y,
        console.position.x, console.position.y + 35 // Socket position
      );
      
      const socketGlow = console.container.getByName('socketGlow') as Phaser.GameObjects.Arc;
      
      if (distance < snapDistance) {
        // Check if it's a match
        const isMatch = shard.shape === console.shape && shard.stripe === console.stripe;
        
        if (isMatch) {
          socketGlow.setFillStyle(0x22c55e, 0.4);
        } else {
          socketGlow.setFillStyle(0xef4444, 0.4);
        }
      } else {
        socketGlow.setFillStyle(console.color, 0.15);
      }
    }
  }

  /**
   * Check if shard was dropped on a console
   */
  private checkDrop(shard: FlowShard): void {
    const snapDistance = 60;
    
    for (const console of this.consoles) {
      if (console.isFilled) continue;
      
      const socketY = console.position.y + 35;
      const distance = Phaser.Math.Distance.Between(
        shard.container.x, shard.container.y,
        console.position.x, socketY
      );
      
      if (distance < snapDistance) {
        // Check if it's a match
        if (shard.shape === console.shape && shard.stripe === console.stripe) {
          this.snapShardToConsole(shard, console);
        } else {
          this.showWrongPlacement(shard);
        }
        return;
      }
    }
    
    // Not dropped on any console - return to original position
    this.returnShardToOriginal(shard);
  }

  /**
   * Snap shard into matching console
   */
  private snapShardToConsole(shard: FlowShard, console: FlowConsole): void {
    shard.isPlaced = true;
    console.isFilled = true;
    
    const socketY = console.position.y + 35;
    
    // Snap animation
    this.tweens.add({
      targets: shard.container,
      x: console.position.x,
      y: socketY,
      scale: 0.8,
      duration: 200,
      ease: 'Back.easeOut',
      onComplete: () => {
        shard.container.disableInteractive();
        
        // Success effects
        this.createPlacementParticles(console.position.x, socketY, shard.color);
        
        // Pulse console
        this.tweens.add({
          targets: console.container,
          scale: 1.1,
          duration: 150,
          yoyo: true,
        });
        
        // Create flow line to core
        this.createFlowLine(console.position.x, socketY);
      },
    });
    
    // Update progress
    this.updateProgressIndicator();
    this.statusText.setText(`${this.shards.filter(s => s.isPlaced).length} / 3 matched!`);
    
    // Check win condition
    this.time.delayedCall(300, () => this.checkWinCondition());
  }

  /**
   * Show wrong placement feedback
   */
  private showWrongPlacement(shard: FlowShard): void {
    this.attempts++;
    
    // Shake effect
    this.tweens.add({
      targets: shard.container,
      x: shard.container.x + 10,
      duration: 50,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        this.returnShardToOriginal(shard);
      },
    });
    
    // Show message
    this.showMessage("Symbols don't match! Check shape AND stripe.", this.COLORS.warning);
    
    // Camera shake
    this.cameras.main.shake(100, 0.005);
  }

  /**
   * Return shard to original position
   */
  private returnShardToOriginal(shard: FlowShard): void {
    this.tweens.add({
      targets: shard.container,
      x: shard.originalPosition.x,
      y: shard.originalPosition.y,
      duration: 300,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Restart floating animation
        this.tweens.add({
          targets: shard.container,
          y: shard.originalPosition.y - 6,
          duration: 1500 + Math.random() * 500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });
      },
    });
  }

  /**
   * Create particle effect on successful placement
   */
  private createPlacementParticles(x: number, y: number, color: number): void {
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const distance = 40;
      
      const particle = this.add.circle(x, y, 4, color);
      particle.setDepth(50);
      
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
   * Create flow line from console to core
   */
  private createFlowLine(fromX: number, fromY: number): void {
    const { width, height } = this.cameras.main;
    const coreX = width / 2;
    const coreY = height / 2 - 60;
    
    const flowLine = this.add.graphics();
    flowLine.setDepth(0);
    
    // Animate line drawing
    const steps = 20;
    let currentStep = 0;
    
    this.time.addEvent({
      delay: 25,
      callback: () => {
        flowLine.clear();
        flowLine.lineStyle(3, 0x06b6d4, 0.6);
        
        const progress = currentStep / steps;
        const toX = fromX + (coreX - fromX) * progress;
        const toY = fromY + (coreY + 50 - fromY) * progress;
        
        flowLine.lineBetween(fromX, fromY, toX, toY);
        
        currentStep++;
        if (currentStep > steps) {
          // Add glow effect at core end
          const glowDot = this.add.circle(coreX, coreY + 50, 6, 0x06b6d4, 0.5);
          this.tweens.add({
            targets: glowDot,
            scale: 0,
            alpha: 0,
            duration: 500,
          });
        }
      },
      repeat: steps,
    });
    
    this.flowLines.push(flowLine);
  }

  /**
   * Check win condition
   */
  private checkWinCondition(): void {
    const allPlaced = this.shards.every(s => s.isPlaced);
    
    if (allPlaced) {
      this.time.delayedCall(500, () => {
        this.activateCore();
        
        this.time.delayedCall(1500, () => {
          const stars = this.calculateStars();
          this.onPuzzleComplete(stars);
        });
      });
    }
  }

  /**
   * Activate the central core
   */
  private activateCore(): void {
    const core = this.centralCore.getByName('core') as Phaser.GameObjects.Arc;
    const coreEye = this.centralCore.getByName('coreEye') as Phaser.GameObjects.Arc;
    const outerRing = this.centralCore.getByName('outerRing') as Phaser.GameObjects.Graphics;
    
    // Core color change
    this.tweens.add({
      targets: core,
      fillColor: { from: 0x2a2a4a, to: 0x06b6d4 },
      duration: 500,
    });
    
    // Eye glow
    this.tweens.add({
      targets: coreEye,
      fillColor: { from: 0x1a1a2e, to: 0x00ffff },
      duration: 500,
    });
    
    // Pulse
    this.tweens.add({
      targets: this.centralCore,
      scale: 1.2,
      duration: 300,
      yoyo: true,
      repeat: 2,
    });
    
    // Redraw outer ring with glow
    outerRing.clear();
    outerRing.lineStyle(4, 0x06b6d4, 1);
    outerRing.strokeCircle(0, 0, 50);
    
    // Status update
    this.statusText.setText('🎉 FLOW RESTORED!');
    this.statusText.setColor('#22c55e');
    
    // Camera flash
    this.cameras.main.flash(500, 6, 182, 212);
  }

  /**
   * Calculate star rating
   */
  private calculateStars(): number {
    if (this.attempts === 0 && this.hintsUsed === 0) return 3;
    if (this.attempts <= 2 && this.hintsUsed <= 1) return 2;
    return 1;
  }

  /**
   * Display hint
   */
  protected displayHint(hintNumber: number): void {
    this.showMessage(this.hints[Math.min(hintNumber - 1, this.hints.length - 1)], this.COLORS.accent);
    
    // Visual hint: pulse matching pairs
    if (hintNumber >= 2) {
      this.shards.filter(s => !s.isPlaced).forEach(shard => {
        const matchingConsole = this.consoles.find(c => 
          c.shape === shard.shape && c.stripe === shard.stripe && !c.isFilled
        );
        
        if (matchingConsole) {
          // Highlight both
          this.tweens.add({
            targets: [shard.container, matchingConsole.container],
            scale: 1.2,
            duration: 300,
            yoyo: true,
          });
        }
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
