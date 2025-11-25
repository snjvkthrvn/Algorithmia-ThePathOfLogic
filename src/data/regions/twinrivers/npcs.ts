/**
 * TWIN RIVERS - NPCs
 * Guides who teach pointer-based algorithms
 */

import { NPCConfig, NPCType } from '../../types';

// =============================================================================
// MIRROR WALKER (Central guide - introduces region)
// =============================================================================

export const mirrorWalker: NPCConfig = {
  id: 'mirror_walker',
  name: 'Mirror Walker',
  type: NPCType.GUIDE,
  spriteKey: 'npc_mirror_walker',
  defaultPosition: { x: 640, y: 300 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Mirror Walker',
        text: [
          'Welcome to Twin Rivers, seeker.',
          'You have mastered the stationary patterns of arrays.',
          'Now, you must learn the dance of pointers - the art of movement and balance.'
        ],
        emotion: 'serene',
        nextNodeId: 'explain_region'
      },
      {
        id: 'explain_region',
        speaker: 'Mirror Walker',
        text: [
          'Two rivers flow here in perfect symmetry.',
          'The Blue River flows cool and steady from the north.',
          'The Orange River flows warm and swift from the south.',
          'Between them lie the lessons of traversal.'
        ],
        emotion: 'wise',
        nextNodeId: 'pointer_intro'
      },
      {
        id: 'pointer_intro',
        speaker: 'Mirror Walker',
        text: [
          'POINTERS are references to positions in data.',
          'Where arrays let you jump to any index, pointers let you TRAVERSE - move through data step by step.',
          'The power comes from using MULTIPLE pointers working together.'
        ],
        emotion: 'teaching',
        choices: [
          {
            text: 'Why use two pointers instead of one?',
            nextNodeId: 'why_two'
          },
          {
            text: 'What will I learn here?',
            nextNodeId: 'what_learn'
          },
          {
            text: 'I\'m ready to begin!',
            nextNodeId: 'begin_journey'
          }
        ]
      },
      {
        id: 'why_two',
        speaker: 'Mirror Walker',
        text: [
          'One pointer is linear - start to end, simple but limited.',
          'TWO pointers unlock new patterns:',
          '• Move from both ends toward center',
          '• Track a window that expands and contracts',
          '• Compare positions simultaneously',
          'This turns O(n²) problems into O(n) solutions!'
        ],
        emotion: 'explaining',
        nextNodeId: 'pointer_intro'
      },
      {
        id: 'what_learn',
        speaker: 'Mirror Walker',
        text: [
          'Four fundamental pointer patterns await:',
          '1. Mirror Walk - Simultaneous symmetric movement',
          '2. Meeting Point - Convergence from both ends',
          '3. Sliding Window - Adjustable frame technique',
          '4. Breaking Currents - Advanced pointer logic under constraints',
          'Each builds on the last. Master all four to face the Mirror Serpent.'
        ],
        emotion: 'instructive',
        nextNodeId: 'pointer_intro'
      },
      {
        id: 'begin_journey',
        speaker: 'Mirror Walker',
        text: [
          'Good. Begin with the Blue River to the north.',
          'There, the Convergence Monk will teach you the first pattern: Mirror Walk.',
          'Move with intention. Think in pairs. Feel the flow.'
        ],
        emotion: 'encouraging',
        actions: [
          {
            type: 'set_flag',
            value: 'twin_rivers_intro_complete'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// CONVERGENCE MONK (TR1 & TR2)
// =============================================================================

export const convergenceMonk: NPCConfig = {
  id: 'convergence_monk',
  name: 'Convergence Monk',
  type: NPCType.GUIDE,
  spriteKey: 'npc_convergence_monk',
  defaultPosition: { x: 400, y: 200 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Convergence Monk',
        text: [
          'Greetings. I am the keeper of convergence.',
          'Here at the Blue River, I will teach you the first pointer patterns.'
        ],
        emotion: 'calm',
        nextNodeId: 'tr1_intro'
      },
      {
        id: 'tr1_intro',
        speaker: 'Convergence Monk',
        text: [
          'First lesson: MIRROR WALK.',
          'You see those two figures on opposite banks?',
          'You must control them BOTH simultaneously.',
          'When one moves left, the other mirrors right. Perfect symmetry.'
        ],
        emotion: 'teaching',
        nextNodeId: 'tr1_challenge'
      },
      {
        id: 'tr1_challenge',
        speaker: 'Convergence Monk',
        text: [
          'Guide both figures to their destinations.',
          'Obstacles appear on both sides - avoid them.',
          'This teaches you to think with TWO POINTERS at once.',
          'Are you ready?'
        ],
        emotion: 'focused',
        choices: [
          {
            text: 'Yes, let\'s begin!',
            nextNodeId: 'start_tr1'
          },
          {
            text: 'How do two pointers help in code?',
            nextNodeId: 'explain_code'
          }
        ]
      },
      {
        id: 'explain_code',
        speaker: 'Convergence Monk',
        text: [
          'In code, two pointers let you process data from multiple positions.',
          'Example: checking if a string is a palindrome.',
          'One pointer starts at beginning, one at end.',
          'Compare characters, move inward. O(n) time instead of O(n²)!'
        ],
        emotion: 'explaining',
        nextNodeId: 'tr1_challenge'
      },
      {
        id: 'start_tr1',
        speaker: 'Convergence Monk',
        text: 'Focus your mind. Move as one with two bodies.',
        emotion: 'encouraging',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'TR1'
          }
        ]
      },
      {
        id: 'after_tr1',
        speaker: 'Convergence Monk',
        text: [
          'Well done! You have grasped simultaneous movement.',
          'Now for the second pattern: CONVERGENCE.',
          'Instead of mirroring outward, we move INWARD toward a meeting point.'
        ],
        emotion: 'pleased',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'TR1'
          }
        ],
        nextNodeId: 'tr2_intro'
      },
      {
        id: 'tr2_intro',
        speaker: 'Convergence Monk',
        text: [
          'The Meeting Point challenge awaits.',
          'Two pointers start at opposite ends.',
          'They move toward each other based on conditions.',
          'When they meet, the solution is found.'
        ],
        emotion: 'teaching',
        nextNodeId: 'start_tr2'
      },
      {
        id: 'start_tr2',
        speaker: 'Convergence Monk',
        text: [
          'This pattern is used in countless algorithms:',
          '• Finding pair sums in sorted arrays',
          '• Checking palindromes',
          '• Container with most water',
          '• Partitioning arrays',
          'Master it, and doors will open.'
        ],
        emotion: 'wise',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'TR2'
          }
        ]
      },
      {
        id: 'after_tr2',
        speaker: 'Convergence Monk',
        text: [
          'You have learned convergence. Excellent.',
          'Seek the Window Weaver across the rivers.',
          'She will teach you the Sliding Window - a more dynamic pattern.',
          'Go with the flow.'
        ],
        emotion: 'proud',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'TR2'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// WINDOW WEAVER (TR3)
// =============================================================================

export const windowWeaver: NPCConfig = {
  id: 'window_weaver',
  name: 'Window Weaver',
  type: NPCType.GUIDE,
  spriteKey: 'npc_window_weaver',
  defaultPosition: { x: 880, y: 500 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Window Weaver',
        text: [
          'Welcome to the Orange River, traveler.',
          'I see you\'ve mastered the static two-pointer patterns.',
          'Now, let me show you something more... fluid.'
        ],
        emotion: 'mysterious',
        nextNodeId: 'explain_window'
      },
      {
        id: 'explain_window',
        speaker: 'Window Weaver',
        text: [
          'The SLIDING WINDOW is a dynamic frame.',
          'It expands to capture more data.',
          'It shrinks to exclude unnecessary elements.',
          'It slides across the data, maintaining constraints.'
        ],
        emotion: 'teaching',
        nextNodeId: 'window_uses'
      },
      {
        id: 'window_uses',
        speaker: 'Window Weaver',
        text: [
          'This pattern solves problems like:',
          '• Maximum sum of k consecutive elements',
          '• Longest substring without repeating characters',
          '• Minimum window substring containing all characters',
          '• Finding anagrams in a string',
          'It turns O(n²) brute force into elegant O(n) solutions.'
        ],
        emotion: 'explaining',
        choices: [
          {
            text: 'Show me the challenge!',
            nextNodeId: 'start_tr3'
          },
          {
            text: 'How is this different from two pointers?',
            nextNodeId: 'window_vs_pointers'
          }
        ]
      },
      {
        id: 'window_vs_pointers',
        speaker: 'Window Weaver',
        text: [
          'Good question!',
          'Standard two pointers: Move based on comparison, often converging.',
          'Sliding window: Two pointers define a RANGE. The range expands/shrinks based on conditions.',
          'You track the STATE of the window (sum, frequency, etc.)',
          'It\'s still two pointers, but with more complex decision-making!'
        ],
        emotion: 'pleased',
        nextNodeId: 'window_uses'
      },
      {
        id: 'start_tr3',
        speaker: 'Window Weaver',
        text: [
          'Your challenge: capture a moving pattern with an adjustable window.',
          'Expand when you need more data.',
          'Shrink when constraints are violated.',
          'Find the optimal window size.',
          'Begin!'
        ],
        emotion: 'focused',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'TR3'
          }
        ]
      },
      {
        id: 'after_tr3',
        speaker: 'Window Weaver',
        text: [
          'Beautifully done! You\'ve grasped the flow of the window.',
          'Expand, shrink, slide... all in service of the solution.',
          'One final test remains: seek the Current Keeper.',
          'He guards the most challenging pointer puzzle.',
          'Complete it, and face the Mirror Serpent.'
        ],
        emotion: 'proud',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'TR3'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// CURRENT KEEPER (TR4 - Advanced)
// =============================================================================

export const currentKeeper: NPCConfig = {
  id: 'current_keeper',
  name: 'Current Keeper',
  type: NPCType.GUIDE,
  spriteKey: 'npc_current_keeper',
  defaultPosition: { x: 200, y: 360 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Current Keeper',
        text: [
          'You\'ve come far. Three pointer patterns mastered.',
          'But can you handle them all... AT ONCE?',
          'With chaos pulling at you?'
        ],
        emotion: 'challenging',
        nextNodeId: 'challenge_intro'
      },
      {
        id: 'challenge_intro',
        speaker: 'Current Keeper',
        text: [
          'BREAKING THE CURRENTS is the ultimate pointer test.',
          'You must maintain perfect pointer logic...',
          'While river currents push your pointers off course.',
          'Symmetry, convergence, and window control - all tested.'
        ],
        emotion: 'intense',
        choices: [
          {
            text: 'I\'m ready for this!',
            nextNodeId: 'start_tr4'
          },
          {
            text: 'What makes this so difficult?',
            nextNodeId: 'explain_difficulty'
          }
        ]
      },
      {
        id: 'explain_difficulty',
        speaker: 'Current Keeper',
        text: [
          'In the previous puzzles, you controlled the pointers completely.',
          'Here, EXTERNAL FORCES affect them - like race conditions in concurrent programming.',
          'You must adjust your strategy in real-time.',
          'Predict. Compensate. Maintain control.',
          'This is advanced pointer logic!'
        ],
        emotion: 'serious',
        nextNodeId: 'challenge_intro'
      },
      {
        id: 'start_tr4',
        speaker: 'Current Keeper',
        text: [
          'Then face the currents!',
          'Prove your mastery of pointer techniques!',
          'Do not let the chaos break your focus!'
        ],
        emotion: 'determined',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'TR4'
          }
        ]
      },
      {
        id: 'after_tr4',
        speaker: 'Current Keeper',
        text: [
          'INCREDIBLE! You have conquered the currents!',
          'You are a true master of pointer techniques.',
          'The Mirror Serpent awaits beyond the gate.',
          'It will test everything you\'ve learned, and more.',
          'Go forth. The rivers flow with you.'
        ],
        emotion: 'amazed',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'TR4'
          }
        ],
        actions: [
          {
            type: 'set_flag',
            value: 'boss_gate_unlocked'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// RIVER SAGE (Lore / General advice)
// =============================================================================

export const riverSage: NPCConfig = {
  id: 'river_sage',
  name: 'River Sage',
  type: NPCType.VILLAGER,
  spriteKey: 'npc_river_sage',
  defaultPosition: { x: 640, y: 450 },
  questRelated: false,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'River Sage',
        text: [
          'The rivers have flowed here since the beginning of Algorithmia.',
          'They represent duality: left and right, start and end, fast and slow.',
          'Mastering pointers means understanding balance.'
        ],
        emotion: 'philosophical',
        nextNodeId: 'lore'
      },
      {
        id: 'lore',
        speaker: 'River Sage',
        text: [
          'Legend says the Mirror Serpent was once a guardian of pure symmetry.',
          'But it grew chaotic, testing all who seek passage.',
          'Only those who truly understand pointers can calm it.',
          'Perhaps... that will be you.'
        ],
        emotion: 'mysterious',
        nextNodeId: 'advice'
      },
      {
        id: 'advice',
        speaker: 'River Sage',
        text: [
          'Remember: pointers are about POSITION and MOVEMENT.',
          'Arrays were about CONTENT and ACCESS.',
          'Combined, they give you complete control over data.',
          'Learn well, and the path forward will be clear.'
        ],
        emotion: 'wise'
      }
    ]
  }
};

export const twinRiversNPCs: NPCConfig[] = [
  mirrorWalker,
  convergenceMonk,
  windowWeaver,
  currentKeeper,
  riverSage
];
