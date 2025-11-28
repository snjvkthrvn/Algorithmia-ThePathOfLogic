/**
 * PROLOGUE - PUZZLES
 * P0-1: Follow the Path (Pattern Matching)
 * P0-2: Fractured Sentinel (Spatial Mapping)
 * BOSS: Fractured Sentinel Multi-Phase
 */

import type { PuzzleConfig, BossConfig } from '../../types';
import { PuzzleType, Difficulty, AlgorithmType } from '../../types';

// =============================================================================
// P0-1: FOLLOW THE PATH
// =============================================================================

export const P0_1_FollowThePath: PuzzleConfig = {
  id: 'P0-1',
  name: 'follow_the_path',
  displayName: 'Follow the Path',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.VERY_EASY,
  algorithmConcept: AlgorithmType.PATTERN_MATCHING,
  description: 'Watch the sequence of tiles light up, then repeat the pattern by stepping on them in the correct order.',
  location: 'Chamber of Flow - Western Section',
  npcId: 'professor_node',

  mechanics: {
    type: 'sequence_memory',
    elements: [
      {
        id: 'tile_0',
        type: 'glowing_tile',
        initialState: { glowing: false, position: { x: 100, y: 200 } },
        properties: { index: 0, color: '#00FFFF' }
      },
      {
        id: 'tile_1',
        type: 'glowing_tile',
        initialState: { glowing: false, position: { x: 200, y: 200 } },
        properties: { index: 1, color: '#00FFFF' }
      },
      {
        id: 'tile_2',
        type: 'glowing_tile',
        initialState: { glowing: false, position: { x: 300, y: 200 } },
        properties: { index: 2, color: '#00FFFF' }
      },
      {
        id: 'tile_3',
        type: 'glowing_tile',
        initialState: { glowing: false, position: { x: 300, y: 300 } },
        properties: { index: 3, color: '#00FFFF' }
      },
      {
        id: 'tile_4',
        type: 'glowing_tile',
        initialState: { glowing: false, position: { x: 300, y: 400 } },
        properties: { index: 4, color: '#00FFFF' }
      },
      {
        id: 'tile_5',
        type: 'glowing_tile',
        initialState: { glowing: false, position: { x: 400, y: 400 } },
        properties: { index: 5, color: '#00FFFF' }
      }
    ],
    rules: [
      'Watch the tiles light up in sequence',
      'Memorize the pattern',
      'Step on each tile in the exact order shown',
      'Complete 3 rounds of increasing length',
      'If you make a mistake, the pattern resets'
    ],
    controls: {
      input: ['WASD', 'Arrow Keys'],
      actions: ['Move to tiles', 'Step on tiles in sequence'],
      instructions: 'Move your character to step on the glowing tiles in the order they lit up.'
    },
    victoryCriteria: {
      type: 'sequence_completion',
      conditions: [
        'Complete Round 1: 3-tile sequence',
        'Complete Round 2: 4-tile sequence',
        'Complete Round 3: 5-tile sequence'
      ],
      checkFunction: 'checkSequenceMatch'
    }
  },

  solution: {
    steps: [
      'Round 1: Watch pattern [0, 1, 2]',
      'Round 1: Step on tiles 0 → 1 → 2',
      'Round 2: Watch pattern [1, 2, 3, 4]',
      'Round 2: Step on tiles 1 → 2 → 3 → 4',
      'Round 3: Watch pattern [0, 2, 3, 5, 4]',
      'Round 3: Step on tiles 0 → 2 → 3 → 5 → 4'
    ],
    acceptableVariations: [
      'Any valid sequence that matches the displayed pattern'
    ],
    optimalMoves: 12 // 3 + 4 + 5 = 12 total steps
  },

  hints: [
    'Watch the entire pattern before you start moving.',
    'Take your time - there is no time limit on this puzzle.',
    'If you forget the pattern, let it reset and watch again.',
    'The tiles always glow in the same order for each round.'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 10,
    unlocks: ['P0-2']
  },

  conceptBridge: {
    id: 'CB_P0-1',
    puzzleId: 'P0-1',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You watched a sequence of tiles light up in a specific order.',
          'Then, you repeated that exact sequence by stepping on the tiles.',
          'This required you to remember the pattern and execute it step by step.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Sequential Processing & Loops',
        content: [
          'What you just performed is the foundation of how computers process information.',
          'You followed a SEQUENCE - a specific order of steps that must be executed one after another.',
          'This is called ITERATION or LOOPING in programming.'
        ]
      },
      {
        type: 'pseudocode',
        title: 'How This Works in Code',
        content: 'Here\'s how a computer would solve this puzzle:',
        code: {
          language: 'pseudocode',
          code: `// DISPLAY PHASE
pattern = [0, 1, 2]
for each tile in pattern:
    light_up(tile)
    wait(1 second)
    turn_off(tile)

// PLAYER INPUT PHASE
playerSequence = []
for each step:
    tile = get_player_position()
    playerSequence.add(tile)

// CHECK PHASE
if playerSequence == pattern:
    success()
else:
    reset()`,
          explanation: 'The computer stores the pattern in memory, then compares your input sequence to the stored pattern. If they match exactly, you win!'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Sequential Processing & Loops"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your understanding of loops',
      challenge: 'If a pattern has 6 tiles and each tile lights for 2 seconds, how long does the display phase take?',
      correctAnswer: 12,
      feedback: {
        correct: 'Perfect! 6 tiles × 2 seconds = 12 seconds total. You understand iteration!',
        incorrect: 'Not quite. Think: how many times does the loop run, and how long is each iteration?'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_SEQUENTIAL_PROCESSING',
    algorithmName: 'Sequential Processing & Loops',
    category: AlgorithmType.SEQUENTIAL_REASONING,
    unlockedBy: 'P0-1',
    difficulty: Difficulty.VERY_EASY,
    relatedConcepts: ['iteration', 'for_loops', 'arrays', 'pattern_matching'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You watched tiles light up one by one, memorized the order, then repeated it back. It felt like following a recipe or dance steps.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'Sequential Processing means doing things in a specific order, one step at a time.',
          'Loops allow us to repeat a set of actions multiple times without writing the same code over and over.',
          'This is one of the most fundamental patterns in programming - almost every program uses loops!'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Pattern',
        content: [
          '1. START: Begin at the first element',
          '2. PROCESS: Do something with the current element',
          '3. NEXT: Move to the next element',
          '4. REPEAT: Go back to step 2 until all elements are processed',
          '5. END: Exit the loop when complete'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Displaying items in a shopping cart (loop through each item)',
          '• Processing pixels in an image (loop through each pixel)',
          '• Reading messages in your inbox (loop through each message)',
          '• Playing a playlist (loop through each song)',
          '• Checking every student\'s test score (loop through the grade list)'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You can now recognize and implement basic iteration patterns. You understand that processing data often means going through it step by step in order.'
      }
    ]
  }
};

// =============================================================================
// P0-2: FRACTURED SENTINEL (Puzzle Form)
// =============================================================================

export const P0_2_FracturedSentinel: PuzzleConfig = {
  id: 'P0-2',
  name: 'fractured_sentinel_puzzle',
  displayName: 'Fractured Sentinel',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.EASY,
  algorithmConcept: AlgorithmType.SPATIAL_MAPPING,
  description: 'Crystal fragments are scattered. Each fragment must be placed in its correct socket based on shape and color matching.',
  location: 'Chamber of Flow - Eastern Section',
  npcId: 'professor_node',

  mechanics: {
    type: 'spatial_puzzle',
    elements: [
      // Crystal Fragments (movable)
      { id: 'fragment_red_circle', type: 'crystal', initialState: { position: { x: 200, y: 300 } }, properties: { shape: 'circle', color: 'red' } },
      { id: 'fragment_blue_square', type: 'crystal', initialState: { position: { x: 250, y: 350 } }, properties: { shape: 'square', color: 'blue' } },
      { id: 'fragment_green_triangle', type: 'crystal', initialState: { position: { x: 300, y: 250 } }, properties: { shape: 'triangle', color: 'green' } },
      { id: 'fragment_yellow_hexagon', type: 'crystal', initialState: { position: { x: 350, y: 400 } }, properties: { shape: 'hexagon', color: 'yellow' } },

      // Sockets (fixed positions)
      { id: 'socket_A', type: 'socket', initialState: { position: { x: 600, y: 200 }, occupied: false }, properties: { accepts: { shape: 'circle', color: 'red' } } },
      { id: 'socket_B', type: 'socket', initialState: { position: { x: 700, y: 300 }, occupied: false }, properties: { accepts: { shape: 'square', color: 'blue' } } },
      { id: 'socket_C', type: 'socket', initialState: { position: { x: 600, y: 400 }, occupied: false }, properties: { accepts: { shape: 'triangle', color: 'green' } } },
      { id: 'socket_D', type: 'socket', initialState: { position: { x: 700, y: 500 }, occupied: false }, properties: { accepts: { shape: 'hexagon', color: 'yellow' } } }
    ],
    rules: [
      'Each crystal fragment can only fit into one specific socket',
      'Match the shape AND color of the fragment to the socket',
      'Push or pull fragments to move them',
      'All 4 fragments must be correctly placed to complete the puzzle'
    ],
    controls: {
      input: ['WASD', 'Arrow Keys', 'E'],
      actions: ['Move to fragment', 'Press E to grab/release', 'Push fragment to socket'],
      instructions: 'Stand next to a crystal fragment and press E to interact. Push it into the matching socket.'
    },
    victoryCriteria: {
      type: 'all_sockets_filled',
      conditions: [
        'fragment_red_circle in socket_A',
        'fragment_blue_square in socket_B',
        'fragment_green_triangle in socket_C',
        'fragment_yellow_hexagon in socket_D'
      ],
      checkFunction: 'checkAllSocketsCorrect'
    }
  },

  solution: {
    steps: [
      'Identify each fragment\'s shape and color',
      'Find the matching socket for each fragment',
      'Red Circle → Socket A',
      'Blue Square → Socket B',
      'Green Triangle → Socket C',
      'Yellow Hexagon → Socket D'
    ],
    acceptableVariations: [
      'Fragments can be placed in any order',
      'Player can experiment with wrong sockets first'
    ],
    optimalMoves: 4 // One move per fragment
  },

  hints: [
    'Look carefully at the symbols on each socket - they show what fits there.',
    'Each fragment has a unique combination of shape and color.',
    'If a fragment doesn\'t fit, try a different socket.',
    'You can pull a fragment out of a socket if you placed it incorrectly.'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 15,
    unlocks: ['BOSS_FRACTURED_SENTINEL']
  },

  conceptBridge: {
    id: 'CB_P0-2',
    puzzleId: 'P0-2',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You matched crystal fragments to their correct sockets.',
          'Each fragment had unique properties (shape and color).',
          'You mapped each fragment to its corresponding location.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Mapping & Hashing',
        content: [
          'What you performed is called MAPPING - connecting a piece of data (the fragment) to a specific location (the socket).',
          'In computer science, this concept evolves into HASHING - using properties of data to determine where it should be stored.',
          'This is how computers quickly find and store information!'
        ]
      },
      {
        type: 'pseudocode',
        title: 'How This Works in Code',
        content: 'Here\'s the logic behind mapping:',
        code: {
          language: 'pseudocode',
          code: `fragments = [red_circle, blue_square, green_triangle, yellow_hexagon]
sockets = {
    A: accepts(red, circle),
    B: accepts(blue, square),
    C: accepts(green, triangle),
    D: accepts(yellow, hexagon)
}

for each fragment in fragments:
    for each socket in sockets:
        if socket.accepts(fragment.color, fragment.shape):
            place(fragment, socket)
            break

// More efficient with hashing:
function getSocketForFragment(fragment):
    key = hash(fragment.color + fragment.shape)
    return sockets[key]  // Direct lookup!`,
          explanation: 'Instead of checking every socket, hashing lets us calculate exactly which socket a fragment belongs to. This is much faster!'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Mapping & Hash Functions"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your understanding of mapping',
      challenge: 'If you have 100 fragments and 100 sockets, would you rather check every socket for each fragment, or use a hash function?',
      correctAnswer: 'hash',
      feedback: {
        correct: 'Exactly! Checking every socket = 100×100 = 10,000 comparisons. Hashing = 100 direct lookups. Huge difference!',
        incorrect: 'Think about efficiency: checking every combination is slow. Hashing lets you calculate the exact location instantly.'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_MAPPING_HASHING',
    algorithmName: 'Mapping & Hash Functions',
    category: AlgorithmType.SPATIAL_MAPPING,
    unlockedBy: 'P0-2',
    difficulty: Difficulty.EASY,
    relatedConcepts: ['hashing', 'key_value_pairs', 'dictionaries', 'hash_maps', 'direct_addressing'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You looked at each crystal and thought "where does this belong?" Then you found its matching socket. It felt like sorting mail into the right mailboxes.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'Mapping is about creating relationships: "This data belongs here."',
          'Hashing is a technique that calculates where data should go based on its properties.',
          'Instead of searching everywhere, hashing tells you the exact location instantly.',
          'Hash functions turn data (like "red circle") into an address (like "socket A").'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Pattern',
        content: [
          '1. IDENTIFY: Look at the data\'s properties',
          '2. COMPUTE: Run those properties through a hash function',
          '3. MAP: The function returns the storage location',
          '4. STORE/RETRIEVE: Place or find the data at that location',
          '5. HANDLE COLLISIONS: Deal with cases where two items hash to the same spot (you\'ll learn this in Array Plains!)'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Looking up a contact in your phone (name → phone number)',
          '• Password verification (your password is hashed and compared)',
          '• Finding a book in a library (call number → shelf location)',
          '• Autocomplete suggestions (prefix → list of words)',
          '• Caching web pages (URL → stored page data)'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You understand the concept of mapping data to locations. You\'re ready to learn about hash functions and collision handling in the next region!'
      }
    ]
  }
};

// =============================================================================
// BOSS: FRACTURED SENTINEL (Multi-Phase)
// =============================================================================

export const BOSS_FracturedSentinel: BossConfig = {
  id: 'BOSS_FRACTURED_SENTINEL',
  name: 'fractured_sentinel_boss',
  displayName: 'Fractured Sentinel',
  type: PuzzleType.BOSS,
  difficulty: Difficulty.MEDIUM,
  algorithmConcept: AlgorithmType.HYBRID,
  description: 'The guardian of the Chamber combines pattern recognition and spatial mapping into a multi-phase challenge that tests everything you\'ve learned.',
  location: 'Chamber of Flow - Boss Arena',
  npcId: 'professor_node',

  healthBarVisible: true,

  phases: [
    {
      phaseNumber: 1,
      name: 'Pattern Echo',
      mechanics: {
        type: 'sequence_challenge',
        elements: [
          { id: 'phase1_tiles', type: 'tile_grid', initialState: { active: true }, properties: { size: 8, pattern_length: 6 } }
        ],
        rules: [
          'The Sentinel shows a 6-tile pattern',
          'Repeat the pattern correctly',
          'You have 10 seconds to complete it',
          'Complete 2 patterns to proceed to Phase 2'
        ],
        controls: {
          input: ['WASD', 'Arrow Keys'],
          actions: ['Move to tiles in correct sequence'],
          instructions: 'Watch the pattern and repeat it quickly!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['Complete 2 patterns correctly'],
          checkFunction: 'checkPhase1Complete'
        }
      },
      timeLimit: 60,
      difficulty: Difficulty.EASY
    },
    {
      phaseNumber: 2,
      name: 'Fragment Storm',
      mechanics: {
        type: 'spatial_challenge',
        elements: [
          { id: 'phase2_fragments', type: 'crystal_array', initialState: { active: true }, properties: { count: 6, socket_count: 6 } }
        ],
        rules: [
          '6 fragments spawn in random positions',
          'Match them to 6 sockets while the Sentinel attacks',
          'Dodge energy blasts while solving',
          'Complete all mappings to proceed to Phase 3'
        ],
        controls: {
          input: ['WASD', 'Arrow Keys', 'E'],
          actions: ['Move fragments to sockets', 'Dodge attacks'],
          instructions: 'Map fragments while avoiding damage!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['All 6 fragments correctly placed'],
          checkFunction: 'checkPhase2Complete'
        }
      },
      timeLimit: 90,
      difficulty: Difficulty.MEDIUM
    },
    {
      phaseNumber: 3,
      name: 'Chaos Fusion',
      mechanics: {
        type: 'hybrid_challenge',
        elements: [
          { id: 'phase3_chaos', type: 'combined', initialState: { active: true }, properties: { complexity: 'high' } }
        ],
        rules: [
          'The Sentinel combines both mechanics',
          'Follow a pattern WHILE placing fragments',
          'Higher difficulty and speed',
          'Defeat the Sentinel to complete the tutorial'
        ],
        controls: {
          input: ['WASD', 'Arrow Keys', 'E'],
          actions: ['Multitask: patterns AND mapping'],
          instructions: 'Use everything you\'ve learned!'
        },
        victoryCriteria: {
          type: 'boss_defeat',
          conditions: ['Complete hybrid challenge', 'Sentinel health reaches 0'],
          checkFunction: 'checkBossDefeated'
        }
      },
      timeLimit: 120,
      difficulty: Difficulty.HARD
    }
  ],

  mechanics: {
    type: 'multi_phase_boss',
    elements: [],
    rules: ['Defeat all 3 phases to win', 'Health carries between phases', 'Taking damage resets current challenge'],
    controls: {
      input: ['WASD', 'Arrow Keys', 'E'],
      actions: ['Phase-specific actions'],
      instructions: 'Adapt to each phase!'
    },
    victoryCriteria: {
      type: 'all_phases_complete',
      conditions: ['Phase 1 complete', 'Phase 2 complete', 'Phase 3 complete'],
      checkFunction: 'checkAllPhasesComplete'
    }
  },

  solution: {
    steps: [
      'Phase 1: Master pattern sequences under time pressure',
      'Phase 2: Efficiently map fragments while dodging',
      'Phase 3: Combine skills and stay focused'
    ]
  },

  hints: [
    'Phase 1: Memorize the full pattern before moving.',
    'Phase 2: Clear a safe zone first, then work on mapping.',
    'Phase 3: Prioritize - don\'t try to do everything at once.',
    'Watch the Sentinel\'s attack patterns - they repeat!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 50,
    unlocks: ['arrayplains', 'exit_to_arrayplains']
  },

  defeatDialogue: [
    'The Fractured Sentinel calms, its fragments returning to harmony.',
    'You have proven your understanding of flow and pattern.',
    'The path to Array Plains is now open.'
  ],

  victoryRewards: {
    codexEntries: ['CODEX_SEQUENTIAL_PROCESSING', 'CODEX_MAPPING_HASHING'],
    unlockedRegions: ['arrayplains'],
    progressionPoints: 50,
    specialItems: ['tutorial_completion_badge']
  },

  conceptBridge: {
    id: 'CB_BOSS_SENTINEL',
    puzzleId: 'BOSS_FRACTURED_SENTINEL',
    sections: [
      {
        type: 'story_recap',
        title: 'The Trial Complete',
        content: [
          'You faced the Fractured Sentinel and emerged victorious.',
          'You proved your mastery of sequential thinking and spatial reasoning.',
          'More importantly, you learned to combine multiple patterns under pressure.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Lesson',
        content: [
          'Real-world algorithms rarely exist in isolation.',
          'The most powerful solutions combine multiple techniques.',
          'You\'ve learned the fundamentals. Now you\'re ready to build on them.'
        ]
      },
      {
        type: 'unlock',
        title: 'Journey Continues',
        content: 'The Array Plains await. There, you will learn the algorithms that power modern computing.'
      }
    ]
  },

  codexEntry: {
    id: 'CODEX_HYBRID_PROBLEM_SOLVING',
    algorithmName: 'Hybrid Problem Solving',
    category: AlgorithmType.HYBRID,
    unlockedBy: 'BOSS_FRACTURED_SENTINEL',
    difficulty: Difficulty.MEDIUM,
    relatedConcepts: ['algorithm_composition', 'multitasking', 'pattern_combination'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You had to think about two different patterns at the same time. It was challenging but rewarding when everything clicked together.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'Hybrid problem solving means combining multiple algorithmic techniques to solve complex challenges.',
          'Real-world problems rarely have one-technique solutions.',
          'The skill is recognizing which patterns to apply and how to combine them efficiently.'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Approach',
        content: [
          '1. ANALYZE: Break the problem into component challenges',
          '2. IDENTIFY: Recognize which algorithmic patterns apply to each component',
          '3. COMBINE: Integrate the patterns efficiently',
          '4. OPTIMIZE: Look for ways the patterns can help each other',
          '5. EXECUTE: Apply the combined solution'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Search engines (hashing + sorting + ranking algorithms)',
          '• GPS navigation (graph traversal + optimization + caching)',
          '• Social media feeds (sorting + filtering + recommendation algorithms)',
          '• Video game AI (pathfinding + decision trees + state machines)'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You can recognize when multiple algorithmic patterns are needed and think about how to combine them effectively.'
      }
    ]
  }
};

export const prologuePuzzles: (PuzzleConfig | BossConfig)[] = [
  P0_1_FollowThePath,
  P0_2_FracturedSentinel,
  BOSS_FracturedSentinel
];
