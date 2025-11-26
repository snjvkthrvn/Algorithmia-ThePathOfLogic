import Phaser from 'phaser';

/**
 * Concept data passed from puzzle scenes
 */
interface ConceptData {
  puzzleName: string;
  puzzleId?: string;
  concept: string;
  attempts: number;
  timeSpent: number;
  hintsUsed?: number;
  stars?: number;
  description?: string;
  code?: string;
}

/**
 * Predefined concept explanations
 */
const CONCEPT_EXPLANATIONS: Record<string, { description: string; steps: string[]; code: string }> = {
  'Sequential Processing & Pattern Recognition': {
    description: `What you just experienced is the foundation of all programming: sequential processing.

You watched a pattern unfold step by step, stored it in memory, then replayed it in the exact same order. This is how computers execute instructions - one after another, in sequence.

The pattern you memorized? That's an ARRAY - a list of items stored in a specific order. And walking through that list item by item? That's called ITERATION or LOOPING.`,
    steps: [
      '1. OBSERVE the sequence (Input)',
      '2. STORE each step in order (Memory/Array)',
      '3. ITERATE through your memory (Loop)',
      '4. EXECUTE each step (Output)',
    ],
    code: `// Sequential Processing in Code
const pattern = [tile1, tile2, tile3, tile4, tile5];

// Loop through each tile in order
for (let i = 0; i < pattern.length; i++) {
    visit(pattern[i]);  // Execute action
}`,
  },
  
  'Mapping & Hash Functions': {
    description: `You just discovered one of programming's most powerful concepts: MAPPING.

Each crystal shard had a unique property (color) that determined exactly where it belonged. This is the essence of a HASH MAP - a data structure where each KEY maps to exactly one VALUE.

The sockets acted like "addresses" - given a shard's color, you instantly knew where to put it. No searching required!`,
    steps: [
      '1. Each KEY (color) maps to one VALUE (socket)',
      '2. Looking up a key is instant (O(1) time)',
      '3. The mapping rule is called a HASH FUNCTION',
      '4. This enables fast lookup and storage',
    ],
    code: `// Hash Map in Action
const sentinel = new Map();

// Each key maps to exactly one value
sentinel.set("cyan",   topSocket);
sentinel.set("purple", middleSocket);
sentinel.set("orange", bottomSocket);

// Instant lookup - no searching!
const socket = sentinel.get("purple");
// Returns: middleSocket`,
  },
  
  'Sorting Algorithms': {
    description: `You've just performed SORTING - arranging elements in a specific order.

When you swapped adjacent tiles to put them in order, you were using a technique similar to BUBBLE SORT. Each comparison and swap brought the array closer to being sorted.

Sorting is fundamental to computing - it makes searching faster, enables efficient algorithms, and organizes data for human understanding.`,
    steps: [
      '1. COMPARE two adjacent elements',
      '2. SWAP if they are out of order',
      '3. REPEAT until no swaps needed',
      '4. Array is now SORTED',
    ],
    code: `// Bubble Sort Logic
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap!
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }
    return array;
}`,
  },
};

/**
 * ConceptBridgeScene - Explains the programming concept behind each puzzle
 * Features Professor Node and educational content with retro styling
 */
export class ConceptBridgeScene extends Phaser.Scene {
  // UI Elements
  private container!: Phaser.GameObjects.Container;
  private professorSprite!: Phaser.GameObjects.Container;
  private textContent!: Phaser.GameObjects.Text;
  private codeBlock!: Phaser.GameObjects.Container;
  private stepsContainer!: Phaser.GameObjects.Container;
  
  // State
  private currentSection: number = 0;
  private conceptData!: ConceptData;
  private sections: string[] = [];
  
  // Colors
  private readonly COLORS = {
    bg: 0x0a0a14,
    panel: 0x1a1a2e,
    border: 0x4a4a6a,
    primary: 0x06b6d4,
    accent: 0xfbbf24,
    code: 0x1e1e2e,
  };

  constructor() {
    super({ key: 'ConceptBridgeScene' });
  }

  init(data: ConceptData): void {
    this.conceptData = data;
    this.currentSection = 0;
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, this.COLORS.bg, 0.95).setOrigin(0);
    
    // Main container
    this.container = this.add.container(0, 0);
    
    // Create Professor Node
    this.createProfessorNode(width);
    
    // Create content panel
    this.createContentPanel(width, height);
    
    // Show star rating if available
    if (this.conceptData.stars) {
      this.showStarRating(width, this.conceptData.stars);
    }
    
    // Show first section
    this.showSection(0);
    
    // Setup input
    this.setupInput();
    
    // Fade in
    this.cameras.main.fadeIn(500);
  }

  /**
   * Create Professor Node character
   */
  private createProfessorNode(width: number): void {
    this.professorSprite = this.add.container(120, 150);
    
    // Node body (geometric floating entity)
    const body = this.add.graphics();
    
    // Outer glow
    body.fillStyle(this.COLORS.primary, 0.2);
    body.fillCircle(0, 0, 50);
    
    // Main body (dodecahedron-like)
    body.fillStyle(0x1a1a3e, 1);
    body.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const radius = i % 2 === 0 ? 35 : 25;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) body.moveTo(x, y);
      else body.lineTo(x, y);
    }
    body.closePath();
    body.fillPath();
    
    // Core glow
    const core = this.add.circle(0, 0, 15, this.COLORS.primary, 0.8);
    
    // Face elements
    const leftEye = this.add.circle(-8, -5, 4, 0xffffff);
    const rightEye = this.add.circle(8, -5, 4, 0xffffff);
    
    // Name tag
    const nameTag = this.add.text(0, 60, 'PROFESSOR NODE', {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    
    this.professorSprite.add([body, core, leftEye, rightEye, nameTag]);
    
    // Floating animation
    this.tweens.add({
      targets: this.professorSprite,
      y: 145,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Core pulse
    this.tweens.add({
      targets: core,
      scale: 1.2,
      alpha: 0.5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  /**
   * Create main content panel
   */
  private createContentPanel(width: number, height: number): void {
    const panelX = 200;
    const panelY = 80;
    const panelWidth = width - 240;
    const panelHeight = height - 160;
    
    // Panel background
    const panel = this.add.graphics();
    panel.fillStyle(this.COLORS.panel, 0.9);
    panel.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 12);
    panel.lineStyle(3, this.COLORS.border, 1);
    panel.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 12);

    // Title
    this.add.text(panelX + 20, panelY + 20, this.conceptData.concept.toUpperCase(), {
      fontSize: '18px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
    });
    
    // Decorative line
    const line = this.add.graphics();
    line.lineStyle(2, this.COLORS.primary, 0.5);
    line.lineBetween(panelX + 20, panelY + 55, panelX + panelWidth - 20, panelY + 55);
    
    // Text content area
    this.textContent = this.add.text(panelX + 20, panelY + 70, '', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffffff',
      wordWrap: { width: panelWidth - 40 },
      lineSpacing: 6,
    });
    
    // Steps container (hidden initially)
    this.stepsContainer = this.add.container(panelX + 20, panelY + 250);
    this.stepsContainer.setVisible(false);
    
    // Code block container (hidden initially)
    this.codeBlock = this.add.container(panelX + 20, panelY + 280);
    this.codeBlock.setVisible(false);
    
    // Continue prompt
    this.add.text(width / 2, height - 50, 'Press SPACE to continue', {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#6b7280',
    }).setOrigin(0.5);

    // Section indicators
    this.createSectionIndicators(width, height - 80);
  }

  /**
   * Create section navigation indicators
   */
  private createSectionIndicators(x: number, y: number): void {
    const container = this.add.container(x, y);
    const dotSpacing = 20;
    const totalSections = 4; // Description, Steps, Code, Summary
    
    for (let i = 0; i < totalSections; i++) {
      const dot = this.add.circle(
        (i - totalSections / 2 + 0.5) * dotSpacing,
        0,
        6,
        i === this.currentSection ? this.COLORS.primary : 0x4a4a6a
      );
      dot.setName(`section-dot-${i}`);
      container.add(dot);
    }
  }

  /**
   * Show star rating
   */
  private showStarRating(width: number, stars: number): void {
    const container = this.add.container(width - 120, 50);
    
    for (let i = 0; i < 3; i++) {
      const star = this.add.text((i - 1) * 30, 0, '★', {
        fontSize: '24px',
        color: i < stars ? '#fbbf24' : '#4a4a6a',
    }).setOrigin(0.5);

      if (i < stars) {
        // Animate earned stars
        star.setScale(0);
        this.tweens.add({
          targets: star,
          scale: 1,
          duration: 300,
          delay: i * 150 + 500,
          ease: 'Back.easeOut',
        });
      }
      
      container.add(star);
    }
  }

  /**
   * Show a specific section
   */
  private showSection(index: number): void {
    const conceptKey = this.conceptData.concept;
    const conceptInfo = CONCEPT_EXPLANATIONS[conceptKey] || {
      description: this.conceptData.description || 'Concept explanation not available.',
      steps: ['Understanding this pattern...'],
      code: this.conceptData.code || '// Code example not available',
    };
    
    this.stepsContainer.setVisible(false);
    this.codeBlock.setVisible(false);
    
    switch (index) {
      case 0:
        // Description
        this.textContent.setText(conceptInfo.description);
        break;
        
      case 1:
        // Steps
        this.textContent.setText('THE ALGORITHM STEPS:\n');
        this.showSteps(conceptInfo.steps);
        break;
        
      case 2:
        // Code
        this.textContent.setText('SEE IT IN CODE:\n');
        this.showCode(conceptInfo.code);
        break;
        
      case 3:
        // Summary / Unlock
        this.showSummary();
        break;
    }
    
    // Update section indicators
    this.updateSectionIndicators(index);
  }

  /**
   * Show algorithm steps
   */
  private showSteps(steps: string[]): void {
    this.stepsContainer.removeAll(true);
    this.stepsContainer.setVisible(true);
    
    steps.forEach((step, i) => {
      const stepText = this.add.text(0, i * 35, step, {
        fontSize: '14px',
        fontFamily: 'monospace',
        color: '#ffffff',
      });
      
      // Animate steps appearing
      stepText.setAlpha(0);
      this.tweens.add({
        targets: stepText,
        alpha: 1,
        x: 10,
        duration: 300,
        delay: i * 200,
      });
      
      this.stepsContainer.add(stepText);
    });
  }

  /**
   * Show code block
   */
  private showCode(code: string): void {
    this.codeBlock.removeAll(true);
    this.codeBlock.setVisible(true);
    
    // Code background
    const bg = this.add.graphics();
    bg.fillStyle(this.COLORS.code, 1);
    bg.fillRoundedRect(-10, -10, 800, 180, 8);
    bg.lineStyle(2, 0x3a3a5e, 1);
    bg.strokeRoundedRect(-10, -10, 800, 180, 8);
    
    // Code text
    const codeText = this.add.text(0, 0, code, {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#22c55e',
      lineSpacing: 4,
    });
    
    this.codeBlock.add([bg, codeText]);
  }

  /**
   * Show summary and unlock message
   */
  private showSummary(): void {
    const stats = `PUZZLE COMPLETE!

★ Attempts: ${this.conceptData.attempts}
★ Time: ${this.conceptData.timeSpent} seconds
${this.conceptData.hintsUsed !== undefined ? `★ Hints Used: ${this.conceptData.hintsUsed}` : ''}

CODEX ENTRY UNLOCKED:
"${this.conceptData.concept}"

You've learned a fundamental concept that powers
countless algorithms and programs!

Press SPACE to return to the world...`;

    this.textContent.setText(stats);
    this.textContent.setColor('#fbbf24');
  }

  /**
   * Update section indicator dots
   */
  private updateSectionIndicators(activeIndex: number): void {
    for (let i = 0; i < 4; i++) {
      const dot = this.children.getByName(`section-dot-${i}`) as Phaser.GameObjects.Arc;
      if (dot) {
        dot.setFillStyle(i === activeIndex ? this.COLORS.primary : 0x4a4a6a);
      }
    }
  }

  /**
   * Setup input handling
   */
  private setupInput(): void {
    this.input.keyboard?.on('keydown-SPACE', () => this.advanceSection());
    this.input.keyboard?.on('keydown-ENTER', () => this.advanceSection());
    this.input.on('pointerdown', () => this.advanceSection());
  }

  /**
   * Advance to next section or exit
   */
  private advanceSection(): void {
    this.currentSection++;
    
    if (this.currentSection >= 4) {
      // Exit to game
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start('GameScene');
      });
    } else {
      this.showSection(this.currentSection);
    }
  }
}
