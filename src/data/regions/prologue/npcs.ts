/**
 * PROLOGUE - NPCs
 * Professor Node and tutorial guides
 */

import { NPCConfig, NPCType } from '../../types';

export const professorNode: NPCConfig = {
  id: 'professor_node',
  name: 'Professor Node',
  type: NPCType.MENTOR,
  spriteKey: 'npc_professor_node',
  defaultPosition: { x: 640, y: 300 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro_1',
    nodes: [
      // ===== INITIAL INTRODUCTION =====
      {
        id: 'intro_1',
        speaker: 'Professor Node',
        text: [
          'Ah, you\'re awake! Welcome to the Chamber of Flow.',
          'This is where all who seek the Path of Logic must begin.'
        ],
        emotion: 'welcoming',
        nextNodeId: 'intro_2'
      },
      {
        id: 'intro_2',
        speaker: 'Professor Node',
        text: [
          'I am Professor Node, keeper of algorithmic wisdom.',
          'You have entered a world where thought becomes tangible, where patterns reveal themselves through action.'
        ],
        emotion: 'wise',
        nextNodeId: 'intro_3'
      },
      {
        id: 'intro_3',
        speaker: 'Professor Node',
        text: [
          'Tell me, traveler...',
          'Do you understand what brings you here?'
        ],
        emotion: 'curious',
        choices: [
          {
            text: 'I want to learn about algorithms.',
            nextNodeId: 'response_algorithms'
          },
          {
            text: 'I\'m not sure... where am I?',
            nextNodeId: 'response_confused'
          },
          {
            text: 'I\'m ready for any challenge!',
            nextNodeId: 'response_confident'
          }
        ]
      },

      // ===== RESPONSE PATHS =====
      {
        id: 'response_algorithms',
        speaker: 'Professor Node',
        text: [
          'A wise answer! Algorithms are the patterns that shape our world.',
          'From the simplest sort to the most complex search, they all begin with understanding.'
        ],
        emotion: 'pleased',
        nextNodeId: 'tutorial_start'
      },
      {
        id: 'response_confused',
        speaker: 'Professor Node',
        text: [
          'Understandable. This realm can be disorienting at first.',
          'You are in Algorithmia, a world built from pure logic and data structures.',
          'Here, you will learn to see the patterns hidden in chaos.'
        ],
        emotion: 'reassuring',
        nextNodeId: 'tutorial_start'
      },
      {
        id: 'response_confident',
        speaker: 'Professor Node',
        text: [
          '*chuckles* Confidence is good, but so is patience.',
          'Even the greatest problem-solvers started with simple steps.',
          'Let us begin your journey properly.'
        ],
        emotion: 'amused',
        nextNodeId: 'tutorial_start'
      },

      // ===== TUTORIAL START =====
      {
        id: 'tutorial_start',
        speaker: 'Professor Node',
        text: [
          'Before we venture into the wider world, you must master the fundamentals.',
          'This Chamber holds two lessons - both are essential.'
        ],
        emotion: 'instructive',
        nextNodeId: 'tutorial_controls'
      },
      {
        id: 'tutorial_controls',
        speaker: 'Professor Node',
        text: [
          'Use the WASD keys or Arrow keys to move.',
          'Approach the glowing tiles to your left to begin your first challenge.',
          'Press E or SPACE to interact with objects and puzzles.'
        ],
        emotion: 'teaching',
        actions: [
          {
            type: 'set_flag',
            value: 'tutorial_started'
          },
          {
            type: 'unlock_puzzle',
            value: 'P0-1'
          }
        ],
        nextNodeId: 'tutorial_encourage'
      },
      {
        id: 'tutorial_encourage',
        speaker: 'Professor Node',
        text: [
          'Remember: every pattern has a logic. Every problem has a solution.',
          'Observe, think, and act. I will be here when you return.'
        ],
        emotion: 'encouraging'
      },

      // ===== AFTER P0-1 COMPLETION =====
      {
        id: 'after_p0_1',
        speaker: 'Professor Node',
        text: [
          'Excellent work! You\'ve grasped the concept of sequential patterns.',
          'What you just performed is the essence of iteration - repeating a process in order.'
        ],
        emotion: 'proud',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'P0-1'
          }
        ],
        nextNodeId: 'after_p0_1_explanation'
      },
      {
        id: 'after_p0_1_explanation',
        speaker: 'Professor Node',
        text: [
          'Loops, sequences, and patterns - these are the building blocks.',
          'But there is another fundamental concept you must understand: mapping.',
          'Proceed to the crystal fragments ahead. Your next challenge awaits.'
        ],
        emotion: 'teaching',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'P0-2'
          }
        ]
      },

      // ===== AFTER P0-2 COMPLETION =====
      {
        id: 'after_p0_2',
        speaker: 'Professor Node',
        text: [
          'Impressive! You\'ve learned to map elements to their correct positions.',
          'This spatial reasoning is the precursor to one of the most powerful concepts: hashing.'
        ],
        emotion: 'pleased',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'P0-2'
          }
        ],
        nextNodeId: 'boss_warning'
      },
      {
        id: 'boss_warning',
        speaker: 'Professor Node',
        text: [
          'You have proven your readiness to leave this Chamber.',
          'But first... there is a final trial.',
          'The Fractured Sentinel guards the exit. It will test everything you have learned.'
        ],
        emotion: 'serious',
        nextNodeId: 'boss_advice'
      },
      {
        id: 'boss_advice',
        speaker: 'Professor Node',
        text: [
          'Do not fear failure. Every mistake is a lesson.',
          'Watch the patterns. Think sequentially. Map your moves.',
          'When you are ready, approach the gate.'
        ],
        emotion: 'encouraging',
        actions: [
          {
            type: 'set_flag',
            value: 'boss_gate_unlocked'
          }
        ]
      },

      // ===== AFTER BOSS DEFEAT =====
      {
        id: 'after_boss',
        speaker: 'Professor Node',
        text: [
          'You\'ve done it! The Fractured Sentinel has been calmed.',
          'You have proven that you understand the flow of logic.'
        ],
        emotion: 'celebratory',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'BOSS_FRACTURED_SENTINEL'
          }
        ],
        nextNodeId: 'journey_begins'
      },
      {
        id: 'journey_begins',
        speaker: 'Professor Node',
        text: [
          'Beyond that portal lies the Array Plains - a land of order and organization.',
          'There, you will learn the foundational algorithms that power the world.',
          'Sorting, indexing, hashing, and more await you.'
        ],
        emotion: 'wise',
        nextNodeId: 'final_advice'
      },
      {
        id: 'final_advice',
        speaker: 'Professor Node',
        text: [
          'Remember what you\'ve learned here. Build upon it.',
          'I will be watching your progress from afar.',
          'Go forth, seeker of patterns. The Path of Logic awaits!'
        ],
        emotion: 'proud',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'exit_to_arrayplains'
          }
        ]
      },

      // ===== GENERAL ADVICE (repeatable) =====
      {
        id: 'general_advice_1',
        speaker: 'Professor Node',
        text: [
          'Stuck on a puzzle? Remember: break it into smaller steps.',
          'Every complex problem is just many simple problems in sequence.'
        ],
        emotion: 'helpful'
      },
      {
        id: 'general_advice_2',
        speaker: 'Professor Node',
        text: [
          'The Codex in your interface stores all the patterns you\'ve learned.',
          'Revisit it often. Understanding deepens with reflection.'
        ],
        emotion: 'teaching'
      }
    ]
  }
};

export const prologueNPCs: NPCConfig[] = [professorNode];
