import Phaser from 'phaser';

/**
 * Dialogue line definition
 */
export interface DialogueLine {
  speaker: string;
  text: string;
  portrait?: string;
  emotion?: 'neutral' | 'happy' | 'sad' | 'excited' | 'thinking';
}

/**
 * NPC dialogue definition
 */
export interface NPCDialogue {
  greeting: DialogueLine[];
  puzzleIntro?: DialogueLine[];
  hint?: DialogueLine[];
  onComplete?: DialogueLine[];
  afterPuzzle?: DialogueLine[];
  bossUnlock?: DialogueLine[];
  victory?: DialogueLine[];
}

/**
 * DialogueSystem - Retro RPG-style dialogue box system
 * Handles NPC conversations with typewriter effect
 */
export class DialogueSystem {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private dialogueBox!: Phaser.GameObjects.Graphics;
  private speakerText!: Phaser.GameObjects.Text;
  private dialogueText!: Phaser.GameObjects.Text;
  private continueIndicator!: Phaser.GameObjects.Text;
  private portraitFrame!: Phaser.GameObjects.Graphics;
  
  private isActive: boolean = false;
  private currentLines: DialogueLine[] = [];
  private currentLineIndex: number = 0;
  private isTyping: boolean = false;
  private typewriterEvent?: Phaser.Time.TimerEvent;
  private currentText: string = '';
  private displayedText: string = '';
  
  private onCompleteCallback?: () => void;
  
  // Colors
  private readonly COLORS = {
    boxBg: 0x1a1a2e,
    boxBorder: 0x4a4a6a,
    boxBorderLight: 0x6a6a8a,
    speakerBg: 0x2a2a4a,
    textColor: '#ffffff',
    speakerColor: '#fbbf24',
    playerColor: '#06b6d4',
    professorColor: '#8b5cf6',
    guardianColor: '#f97316',
  };

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createDialogueUI();
    this.setupInput();
  }

  /**
   * Create the dialogue UI elements
   */
  private createDialogueUI(): void {
    const { width, height } = this.scene.cameras.main;
    
    this.container = this.scene.add.container(0, 0);
    this.container.setScrollFactor(0);
    this.container.setDepth(1000);
    this.container.setVisible(false);
    
    // Dialogue box dimensions
    const boxWidth = width - 80;
    const boxHeight = 150;
    const boxX = 40;
    const boxY = height - boxHeight - 30;
    
    // Create dialogue box graphics
    this.dialogueBox = this.scene.add.graphics();
    
    // Shadow
    this.dialogueBox.fillStyle(0x000000, 0.5);
    this.dialogueBox.fillRoundedRect(boxX + 4, boxY + 4, boxWidth, boxHeight, 12);
    
    // Main box
    this.dialogueBox.fillStyle(this.COLORS.boxBg, 0.95);
    this.dialogueBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 12);
    
    // Border - outer
    this.dialogueBox.lineStyle(4, this.COLORS.boxBorder, 1);
    this.dialogueBox.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 12);
    
    // Border - inner decorative
    this.dialogueBox.lineStyle(2, this.COLORS.boxBorderLight, 0.5);
    this.dialogueBox.strokeRoundedRect(boxX + 8, boxY + 8, boxWidth - 16, boxHeight - 16, 8);
    
    // Portrait frame area (left side)
    this.portraitFrame = this.scene.add.graphics();
    this.portraitFrame.fillStyle(this.COLORS.speakerBg, 1);
    this.portraitFrame.fillRoundedRect(boxX + 15, boxY + 20, 80, 80, 8);
    this.portraitFrame.lineStyle(2, this.COLORS.boxBorderLight, 1);
    this.portraitFrame.strokeRoundedRect(boxX + 15, boxY + 20, 80, 80, 8);
    
    // Portrait placeholder icon
    const portraitPlaceholder = this.scene.add.text(boxX + 55, boxY + 60, '👤', {
      fontSize: '32px',
    }).setOrigin(0.5);
    portraitPlaceholder.setName('portraitPlaceholder');
    
    // Speaker name background
    this.dialogueBox.fillStyle(this.COLORS.speakerBg, 1);
    this.dialogueBox.fillRoundedRect(boxX + 110, boxY - 15, 200, 30, 6);
    this.dialogueBox.lineStyle(2, this.COLORS.boxBorderLight, 1);
    this.dialogueBox.strokeRoundedRect(boxX + 110, boxY - 15, 200, 30, 6);
    
    // Speaker name text
    this.speakerText = this.scene.add.text(boxX + 120, boxY - 8, '', {
      fontSize: '14px',
      fontFamily: '"Press Start 2P", monospace',
      color: this.COLORS.speakerColor,
    });
    
    // Dialogue text
    this.dialogueText = this.scene.add.text(boxX + 110, boxY + 25, '', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: this.COLORS.textColor,
      wordWrap: { width: boxWidth - 140 },
      lineSpacing: 8,
    });
    
    // Continue indicator
    this.continueIndicator = this.scene.add.text(
      boxX + boxWidth - 30, 
      boxY + boxHeight - 25, 
      '▼', 
      {
        fontSize: '16px',
        color: this.COLORS.speakerColor,
      }
    );
    this.continueIndicator.setVisible(false);
    
    // Bounce animation for continue indicator
    this.scene.tweens.add({
      targets: this.continueIndicator,
      y: this.continueIndicator.y + 5,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
    
    // Add all to container
    this.container.add([
      this.dialogueBox,
      this.portraitFrame,
      portraitPlaceholder,
      this.speakerText,
      this.dialogueText,
      this.continueIndicator,
    ]);
  }

  /**
   * Setup input handling
   */
  private setupInput(): void {
    this.scene.input.keyboard?.on('keydown-SPACE', () => this.advance());
    this.scene.input.keyboard?.on('keydown-ENTER', () => this.advance());
    this.scene.input.on('pointerdown', () => this.advance());
  }

  /**
   * Start a dialogue sequence
   */
  public startDialogue(lines: DialogueLine[], onComplete?: () => void): void {
    if (this.isActive) return;
    
    this.isActive = true;
    this.currentLines = lines;
    this.currentLineIndex = 0;
    this.onCompleteCallback = onComplete;
    
    // Show container with fade in
    this.container.setVisible(true);
    this.container.setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 200,
    });
    
    this.showLine(0);
  }

  /**
   * Show a specific dialogue line
   */
  private showLine(index: number): void {
    if (index >= this.currentLines.length) {
      this.endDialogue();
      return;
    }
    
    const line = this.currentLines[index];
    
    // Update speaker with appropriate color
    this.speakerText.setText(line.speaker.toUpperCase());
    this.updateSpeakerColor(line.speaker);
    
    // Update portrait placeholder based on speaker
    this.updatePortraitIcon(line.speaker);
    
    // Start typewriter effect
    this.currentText = line.text;
    this.displayedText = '';
    this.isTyping = true;
    this.continueIndicator.setVisible(false);
    
    // Clear previous text
    this.dialogueText.setText('');
    
    // Start typewriter
    let charIndex = 0;
    this.typewriterEvent = this.scene.time.addEvent({
      delay: 25,
      callback: () => {
        if (charIndex < this.currentText.length) {
          this.displayedText += this.currentText[charIndex];
          this.dialogueText.setText(this.displayedText);
          charIndex++;
        } else {
          this.isTyping = false;
          this.continueIndicator.setVisible(true);
          this.typewriterEvent?.destroy();
        }
      },
      repeat: this.currentText.length - 1,
    });
  }

  /**
   * Update speaker text color based on character
   */
  private updateSpeakerColor(speaker: string): void {
    const lowerSpeaker = speaker.toLowerCase();
    
    if (lowerSpeaker.includes('player') || lowerSpeaker.includes('you')) {
      this.speakerText.setColor(this.COLORS.playerColor);
    } else if (lowerSpeaker.includes('professor') || lowerSpeaker.includes('node')) {
      this.speakerText.setColor(this.COLORS.professorColor);
    } else if (lowerSpeaker.includes('guardian') || lowerSpeaker.includes('keeper')) {
      this.speakerText.setColor(this.COLORS.guardianColor);
    } else {
      this.speakerText.setColor(this.COLORS.speakerColor);
    }
  }

  /**
   * Update portrait icon based on speaker
   */
  private updatePortraitIcon(speaker: string): void {
    const placeholder = this.container.getByName('portraitPlaceholder') as Phaser.GameObjects.Text;
    if (!placeholder) return;
    
    const lowerSpeaker = speaker.toLowerCase();
    
    if (lowerSpeaker.includes('player')) {
      placeholder.setText('🧙');
    } else if (lowerSpeaker.includes('professor') || lowerSpeaker.includes('node')) {
      placeholder.setText('👨‍🏫');
    } else if (lowerSpeaker.includes('rune')) {
      placeholder.setText('🔮');
    } else if (lowerSpeaker.includes('console') || lowerSpeaker.includes('guardian')) {
      placeholder.setText('⚙️');
    } else if (lowerSpeaker.includes('sentinel')) {
      placeholder.setText('👁️');
    } else {
      placeholder.setText('👤');
    }
  }

  /**
   * Advance dialogue
   */
  private advance(): void {
    if (!this.isActive) return;
    
    if (this.isTyping) {
      // Skip to end of current line
      this.typewriterEvent?.destroy();
      this.displayedText = this.currentText;
      this.dialogueText.setText(this.displayedText);
      this.isTyping = false;
      this.continueIndicator.setVisible(true);
    } else {
      // Go to next line
      this.currentLineIndex++;
      this.showLine(this.currentLineIndex);
    }
  }

  /**
   * End dialogue sequence
   */
  private endDialogue(): void {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.container.setVisible(false);
        this.isActive = false;
        
        if (this.onCompleteCallback) {
          this.onCompleteCallback();
        }
      },
    });
  }

  /**
   * Check if dialogue is currently active
   */
  public isDialogueActive(): boolean {
    return this.isActive;
  }

  /**
   * Destroy the dialogue system
   */
  public destroy(): void {
    this.typewriterEvent?.destroy();
    this.container.destroy();
  }
}

/**
 * Predefined NPC dialogues for the game
 */
export const NPCDialogues: Record<string, NPCDialogue> = {
  // === PROLOGUE NPCs ===
  
  PROFESSOR_NODE: {
    greeting: [
      { 
        speaker: 'Professor Node', 
        text: 'Ah, you\'re awake! Welcome to the Chamber of Flow, young seeker.',
        emotion: 'happy'
      },
      { 
        speaker: 'Professor Node', 
        text: 'I am Professor Node, your guide through Algorithmia. This void you see... it\'s not empty.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Professor Node', 
        text: 'It is FULL of potential—patterns waiting to be understood, connections to be made.',
        emotion: 'excited'
      },
      { 
        speaker: 'Professor Node', 
        text: 'To proceed, you must first learn the fundamental truths: SEQUENCE and MAPPING.',
        emotion: 'thinking'
      },
      { 
        speaker: 'Professor Node', 
        text: 'Speak with the Rune Keeper to the north. The Path Runes will teach you about sequences.',
        emotion: 'neutral'
      },
    ],
    puzzleIntro: [
      { 
        speaker: 'Professor Node', 
        text: 'Before you lies the first lesson. Observe, remember, and repeat.',
      },
    ],
    afterPuzzle: [
      { 
        speaker: 'Professor Node', 
        text: 'Excellent work! You\'ve grasped the essence of sequential processing.',
        emotion: 'happy'
      },
      { 
        speaker: 'Professor Node', 
        text: 'In the language of algorithms, what you did is called ITERATION—stepping through items one by one.',
        emotion: 'thinking'
      },
      { 
        speaker: 'Professor Node', 
        text: 'Now, seek the Console Keeper to the east. The Flow Consoles will teach you about MAPPING.',
        emotion: 'neutral'
      },
    ],
    bossUnlock: [
      { 
        speaker: 'Professor Node', 
        text: 'Both trials complete! The gate to the Sentinel\'s chamber now responds to you.',
        emotion: 'excited'
      },
      { 
        speaker: 'Professor Node', 
        text: 'The Fractured Sentinel guards the path forward. It will test ALL you\'ve learned.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Professor Node', 
        text: 'Face it when you are ready. Combine your mastery of patterns AND connections.',
        emotion: 'thinking'
      },
    ],
    victory: [
      { 
        speaker: 'Professor Node', 
        text: 'MAGNIFICENT! You have calmed the Fractured Sentinel!',
        emotion: 'excited'
      },
      { 
        speaker: 'Professor Node', 
        text: 'The gateway to the Array Plains is now open. Your journey truly begins.',
        emotion: 'happy'
      },
      { 
        speaker: 'Professor Node', 
        text: 'Remember what you\'ve learned here: sequences, mappings, and their COMBINATION.',
        emotion: 'thinking'
      },
      { 
        speaker: 'Professor Node', 
        text: 'Go forth, seeker. May logic light your path!',
        emotion: 'happy'
      },
    ],
  },
  
  RUNE_KEEPER: {
    greeting: [
      { 
        speaker: 'Rune Keeper', 
        text: 'Ah, a new seeker of logic. Welcome to the Path Runes.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Rune Keeper', 
        text: 'These ancient tiles hold the secret of SEQUENTIAL PATTERNS.',
        emotion: 'thinking'
      },
      { 
        speaker: 'Rune Keeper', 
        text: 'Watch them carefully, for they will light in a specific ORDER.',
        emotion: 'neutral'
      },
    ],
    puzzleIntro: [
      { 
        speaker: 'Rune Keeper', 
        text: 'The tiles will glow in sequence. Your task: repeat that sequence EXACTLY.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Rune Keeper', 
        text: 'Each round adds one more step. Memory and ORDER are the foundations of all algorithms.',
        emotion: 'thinking'
      },
      { 
        speaker: 'Rune Keeper', 
        text: 'When you are ready, step onto the platform. The trial begins.',
        emotion: 'neutral'
      },
    ],
    hint: [
      { 
        speaker: 'Rune Keeper', 
        text: 'Focus on the FIRST tile. Then build from there, one step at a time.',
        emotion: 'thinking'
      },
    ],
    onComplete: [
      { 
        speaker: 'Rune Keeper', 
        text: 'The pattern flows through you now. You understand SEQUENCE.',
        emotion: 'happy'
      },
      { 
        speaker: 'Rune Keeper', 
        text: 'Return to Professor Node. He will explain what you\'ve truly learned.',
        emotion: 'neutral'
      },
    ],
  },
  
  CONSOLE_KEEPER: {
    greeting: [
      { 
        speaker: 'Console Keeper', 
        text: 'The flow is disrupted. The Sentinel\'s shards lie scattered...',
        emotion: 'sad'
      },
      { 
        speaker: 'Console Keeper', 
        text: 'Each crystal shard has a unique signature—a shape AND a pattern.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Console Keeper', 
        text: 'The consoles await their matching shards. Can you restore the connection?',
        emotion: 'thinking'
      },
    ],
    puzzleIntro: [
      { 
        speaker: 'Console Keeper', 
        text: 'Drag each shard to its matching console. BOTH the shape AND stripe must align.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Console Keeper', 
        text: 'This is MAPPING—each key has exactly ONE correct value. Find the connections.',
        emotion: 'thinking'
      },
    ],
    hint: [
      { 
        speaker: 'Console Keeper', 
        text: 'Look carefully at BOTH symbols. A triangle with TWO stripes is different from a triangle with THREE.',
        emotion: 'thinking'
      },
    ],
    onComplete: [
      { 
        speaker: 'Console Keeper', 
        text: 'The flow is restored! The core pulses with renewed energy.',
        emotion: 'happy'
      },
      { 
        speaker: 'Console Keeper', 
        text: 'You have mastered KEY-VALUE mapping. Return to Professor Node.',
        emotion: 'neutral'
      },
    ],
  },
  
  SENTINEL_GUARDIAN: {
    greeting: [
      { 
        speaker: 'Sentinel Guardian', 
        text: 'The Fractured Sentinel awaits within. It is the final trial of this chamber.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Sentinel Guardian', 
        text: 'Only those who have mastered BOTH patterns AND connections may enter.',
        emotion: 'thinking'
      },
    ],
    puzzleIntro: [
      { 
        speaker: 'Sentinel Guardian', 
        text: 'The Sentinel will test you in THREE phases. Each combines what you\'ve learned.',
        emotion: 'neutral'
      },
      { 
        speaker: 'Sentinel Guardian', 
        text: 'Your energy drains constantly. Act swiftly, but carefully.',
        emotion: 'thinking'
      },
      { 
        speaker: 'Sentinel Guardian', 
        text: 'Avoid the energy orbs. They will accelerate your energy loss.',
        emotion: 'neutral'
      },
    ],
    onComplete: [
      { 
        speaker: 'Sentinel Guardian', 
        text: 'The Sentinel is calmed. You have proven your mastery.',
        emotion: 'happy'
      },
    ],
  },
  
  // === ORIGIN PORTAL ===
  ORIGIN_PORTAL: {
    greeting: [
      { 
        speaker: '???', 
        text: '...',
        emotion: 'neutral'
      },
      { 
        speaker: 'Player', 
        text: 'Where did I come from? What is this place?',
        emotion: 'thinking'
      },
      { 
        speaker: '???', 
        text: 'The void remembers nothing... and everything.',
        emotion: 'neutral'
      },
    ],
  },
  
  // === ARRAY PLAINS NPCs (for future) ===
  FARMER_BYTE: {
    greeting: [
      { 
        speaker: 'Farmer Byte', 
        text: 'Welcome to the Array Plains! I\'m Farmer Byte.',
        emotion: 'happy'
      },
      { 
        speaker: 'Farmer Byte', 
        text: 'My crops grow in ROWS and COLUMNS. Everything has its INDEX here.',
        emotion: 'neutral'
      },
    ],
  },
};
