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
    
    // Speaker name background
    this.dialogueBox.fillStyle(this.COLORS.speakerBg, 1);
    this.dialogueBox.fillRoundedRect(boxX + 110, boxY - 15, 180, 30, 6);
    this.dialogueBox.lineStyle(2, this.COLORS.boxBorderLight, 1);
    this.dialogueBox.strokeRoundedRect(boxX + 110, boxY - 15, 180, 30, 6);
    
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
    
    // Update speaker
    this.speakerText.setText(line.speaker.toUpperCase());
    
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
      delay: 30,
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
  // Prologue NPCs
  RUNE_KEEPER: {
    greeting: [
      { 
        speaker: 'Rune Keeper', 
        text: 'Ah, a new seeker of logic. Welcome to the Chamber of Flow.' 
      },
      { 
        speaker: 'Rune Keeper', 
        text: 'These ancient tiles hold the secret of sequential patterns. Watch them carefully...' 
      },
    ],
    puzzleIntro: [
      { 
        speaker: 'Rune Keeper', 
        text: 'The tiles will light in a sequence. Your task is to repeat that sequence exactly.' 
      },
      { 
        speaker: 'Rune Keeper', 
        text: 'Memory and order are the foundations of all algorithms. Are you ready?' 
      },
    ],
  },
  
  SENTINEL_GUARDIAN: {
    greeting: [
      { 
        speaker: 'Guardian', 
        text: 'The Sentinel stands fractured... its shards scattered across the void.' 
      },
      { 
        speaker: 'Guardian', 
        text: 'Each crystal shard belongs to a specific socket. Can you restore the ancient construct?' 
      },
    ],
    puzzleIntro: [
      { 
        speaker: 'Guardian', 
        text: 'Match each shard to its socket by color. This is the way of mapping—each key to its value.' 
      },
    ],
    onComplete: [
      { 
        speaker: 'Guardian', 
        text: 'The Sentinel awakens! You have mastered the art of key-value mapping.' 
      },
    ],
    hint: [
      {
        speaker: 'Guardian',
        text: 'The consoles respond only after you memorize the rune sequence to the north.',
      },
    ],
  },
  
  PROFESSOR_NODE: {
    greeting: [
      { 
        speaker: 'Prof. Node', 
        text: 'Well done, seeker! You\'ve proven your intuition for patterns.' 
      },
      { 
        speaker: 'Prof. Node', 
        text: 'What you just experienced... let me show you its true form.' 
      },
    ],
  },
};
