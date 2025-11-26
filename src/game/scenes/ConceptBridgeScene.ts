import Phaser from 'phaser';
import { generateConceptExplanation } from '../../services/openaiService';

export class ConceptBridgeScene extends Phaser.Scene {
  
  private loadingText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'ConceptBridgeScene' });
  }

  init(data: { 
    puzzleName: string; 
    concept: string; 
    attempts: number; 
    timeSpent: number;
    description?: string; // Optional: Pre-written text
    code?: string;        // Optional: Pre-written code
  }) {
    // Store puzzle data
    this.registry.set('puzzleData', data);
  }

  create() {
    const { width, height } = this.cameras.main;

    // Semi-transparent dark overlay
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.85);
    overlay.setOrigin(0, 0);

    // Title
    this.add.text(width / 2, 80, 'Professor Node\'s Insight', {
      fontSize: '32px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Loading message
    this.loadingText = this.add.text(width / 2, height / 2, 'Generating explanation...', {
      fontSize: '20px',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    // Fetch AI explanation
    // Check if we have pre-defined content or need to fetch it
    const puzzleData = this.registry.get('puzzleData');
    
    if (puzzleData.description) {
      // Use the pre-defined content we passed from P0-2
      const fullText = `${puzzleData.description}\n\n${puzzleData.code || ''}`;
      this.displayExplanation(fullText);
    } else {
      // No content provided? Ask the AI (like in P0-1)
      this.fetchExplanation(puzzleData);
    }

    // Instructions (hidden initially)
    this.add.text(width / 2, height - 40, 'Press SPACE to continue', {
      fontSize: '18px',
      color: '#AAAAAA'
    }).setOrigin(0.5).setVisible(false).setName('continueText');

    // Space key to close
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.stop('ConceptBridgeScene');
      this.scene.start('GameScene');
    });
  }

  private async fetchExplanation(puzzleData: { puzzleName: string; concept: string; attempts: number; timeSpent: number }) {
    try {
      const explanation = await generateConceptExplanation(puzzleData);
      this.displayExplanation(explanation);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      this.displayExplanation('Error loading explanation. Please check your API key.');
    }
  }

  private displayExplanation(text: string) {
    const { width, height } = this.cameras.main;

    // Remove loading text
    this.loadingText?.destroy();

    // Display explanation in a scrollable text box
    this.add.text(width / 2, height / 2, text, {
      fontSize: '16px',
      color: '#FFFFFF',
      align: 'left',
      wordWrap: { width: width - 120 }
    }).setOrigin(0.5);

    // Show continue instruction
    const continueText = this.children.getByName('continueText') as Phaser.GameObjects.Text;
    continueText?.setVisible(true);
  }
}