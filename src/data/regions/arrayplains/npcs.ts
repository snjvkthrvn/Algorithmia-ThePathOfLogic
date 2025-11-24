/**
 * ARRAY PLAINS - NPCs
 * Farm workers and villagers who teach array-based algorithms
 */

import { NPCConfig, NPCType } from '../../types';

// =============================================================================
// SORTING FARMER (AP1 - East Storage Shed)
// =============================================================================

export const sortingFarmer: NPCConfig = {
  id: 'sorting_farmer',
  name: 'Sorting Farmer',
  type: NPCType.GUIDE,
  spriteKey: 'npc_sorting_farmer',
  defaultPosition: { x: 1000, y: 200 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Sorting Farmer',
        text: [
          'Well hello there! Welcome to my storage shed.',
          'I keep all the farm\'s numbered tiles here... or at least I try to.',
          'They keep getting all mixed up!'
        ],
        emotion: 'frustrated',
        nextNodeId: 'explain_problem'
      },
      {
        id: 'explain_problem',
        speaker: 'Sorting Farmer',
        text: [
          'See those tiles on the rails? They should be in order: 0, 1, 2, 3, 4, 5, 6, 7.',
          'But they\'re all scrambled! Makes it so hard to find what I need.',
          'Could you help me sort them?'
        ],
        emotion: 'hopeful',
        choices: [
          {
            text: 'How do I sort them?',
            nextNodeId: 'how_to_sort'
          },
          {
            text: 'Why does order matter?',
            nextNodeId: 'why_order'
          },
          {
            text: 'I\'ll do it!',
            nextNodeId: 'start_puzzle'
          }
        ]
      },
      {
        id: 'how_to_sort',
        speaker: 'Sorting Farmer',
        text: [
          'Just push the tiles along the rails!',
          'You can swap adjacent tiles by pushing one past the other.',
          'Keep swapping until they\'re all in order from smallest to largest.'
        ],
        emotion: 'instructive',
        nextNodeId: 'explain_problem'
      },
      {
        id: 'why_order',
        speaker: 'Sorting Farmer',
        text: [
          'Order makes EVERYTHING easier!',
          'When things are sorted, I can find what I need instantly.',
          'Imagine looking for a book in a library where nothing was alphabetized - nightmare!'
        ],
        emotion: 'passionate',
        nextNodeId: 'explain_problem'
      },
      {
        id: 'start_puzzle',
        speaker: 'Sorting Farmer',
        text: 'Great! Just interact with the tiles to get started. Take your time!',
        emotion: 'encouraging',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'AP1'
          }
        ]
      },
      {
        id: 'after_completion',
        speaker: 'Sorting Farmer',
        text: [
          'You did it! Look at that beautiful order!',
          '0, 1, 2, 3, 4, 5, 6, 7... *chef\'s kiss*',
          'Now I can find any tile instantly just by looking at its position!'
        ],
        emotion: 'happy',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'AP1'
          }
        ],
        nextNodeId: 'teach_sorting'
      },
      {
        id: 'teach_sorting',
        speaker: 'Sorting Farmer',
        text: [
          'What you just did is called SORTING.',
          'It\'s one of the most important operations in computing!',
          'Computers sort millions of items every second - search results, file listings, everything!'
        ],
        emotion: 'teaching',
        actions: [
          {
            type: 'trigger_cutscene',
            value: 'CB_AP1'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// BASKET KEEPER (AP2 - West Barn)
// =============================================================================

export const basketKeeper: NPCConfig = {
  id: 'basket_keeper',
  name: 'Basket Keeper',
  type: NPCType.GUIDE,
  spriteKey: 'npc_basket_keeper',
  defaultPosition: { x: 280, y: 200 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Basket Keeper',
        text: [
          'Greetings, traveler! Welcome to the Tool Barn.',
          'I manage all the farm tools using my basket system.',
          'Each basket has a number, and I know exactly where everything is!'
        ],
        emotion: 'proud',
        nextNodeId: 'explain_system'
      },
      {
        id: 'explain_system',
        speaker: 'Basket Keeper',
        text: [
          'See those 10 baskets? They\'re labeled 0 through 9.',
          'When I need a tool, I don\'t search through every basket.',
          'I just go straight to the basket number I need. Super fast!'
        ],
        emotion: 'explaining',
        nextNodeId: 'challenge'
      },
      {
        id: 'challenge',
        speaker: 'Basket Keeper',
        text: [
          'Want to see how efficient this is?',
          'I lost my favorite hammer. It\'s in basket number 5.',
          'Try finding it!'
        ],
        emotion: 'playful',
        choices: [
          {
            text: 'Should I check each basket?',
            nextNodeId: 'explain_slow_way'
          },
          {
            text: 'I\'ll go straight to basket 5!',
            nextNodeId: 'explain_fast_way'
          }
        ]
      },
      {
        id: 'explain_slow_way',
        speaker: 'Basket Keeper',
        text: [
          'You COULD check baskets 0, 1, 2, 3, 4, and finally 5...',
          'But that\'s 6 checks! So slow!',
          'Or... you could just go directly to basket 5. One check. Done!'
        ],
        emotion: 'teaching',
        nextNodeId: 'start_puzzle'
      },
      {
        id: 'explain_fast_way',
        speaker: 'Basket Keeper',
        text: [
          'Exactly! That\'s the power of INDEXING!',
          'When you know the exact position, you can access it instantly.',
          'This is called O(1) time - constant time. The best kind!'
        ],
        emotion: 'excited',
        nextNodeId: 'start_puzzle'
      },
      {
        id: 'start_puzzle',
        speaker: 'Basket Keeper',
        text: 'Go ahead and try it! See how much faster direct access is.',
        emotion: 'encouraging',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'AP2'
          }
        ]
      },
      {
        id: 'after_completion',
        speaker: 'Basket Keeper',
        text: [
          'See? One lookup. Instant retrieval!',
          'This is how arrays work in programming.',
          'Each element has an index, and you can jump straight to it.'
        ],
        emotion: 'satisfied',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'AP2'
          }
        ],
        actions: [
          {
            type: 'trigger_cutscene',
            value: 'CB_AP2'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// CROP SORTER (AP3 - North Field Workshop)
// =============================================================================

export const cropSorter: NPCConfig = {
  id: 'crop_sorter',
  name: 'Crop Sorter',
  type: NPCType.GUIDE,
  spriteKey: 'npc_crop_sorter',
  defaultPosition: { x: 640, y: 100 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Crop Sorter',
        text: [
          'Hello! Busy day at the harvest workshop.',
          'We get SO many different crops - grain, berries, roots, herbs...',
          'Organizing them used to take forever!'
        ],
        emotion: 'busy',
        nextNodeId: 'explain_problem'
      },
      {
        id: 'explain_problem',
        speaker: 'Crop Sorter',
        text: [
          'We have 4 storage buckets: A, B, C, and D.',
          'Each type of crop goes into a specific bucket.',
          'But how do we know which crop goes where?'
        ],
        emotion: 'thoughtful',
        choices: [
          {
            text: 'Check each crop one by one?',
            nextNodeId: 'slow_method'
          },
          {
            text: 'Use some kind of rule?',
            nextNodeId: 'smart_method'
          }
        ]
      },
      {
        id: 'slow_method',
        speaker: 'Crop Sorter',
        text: [
          'That\'s what we used to do! Check every property, read labels, compare...',
          'It worked, but with hundreds of crops? Way too slow.',
          'So I came up with a better system!'
        ],
        emotion: 'explaining',
        nextNodeId: 'hash_intro'
      },
      {
        id: 'smart_method',
        speaker: 'Crop Sorter',
        text: [
          'Exactly! A RULE - what we call a HASH FUNCTION.',
          'It automatically calculates which bucket based on the crop\'s properties!',
          'Let me show you how it works.'
        ],
        emotion: 'excited',
        nextNodeId: 'hash_intro'
      },
      {
        id: 'hash_intro',
        speaker: 'Crop Sorter',
        text: [
          'Here\'s my system:',
          '• Grain → Bucket A',
          '• Berries → Bucket B',
          '• Roots → Bucket C',
          '• Herbs → Bucket D',
          'The crop type IS the hash! No thinking needed!'
        ],
        emotion: 'teaching',
        nextNodeId: 'start_puzzle'
      },
      {
        id: 'start_puzzle',
        speaker: 'Crop Sorter',
        text: [
          'Want to try? The hopper will drop random crops.',
          'Just drag each one to its correct bucket based on the hash rule.',
          'You\'ll see how fast this is!'
        ],
        emotion: 'encouraging',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'AP3'
          }
        ]
      },
      {
        id: 'after_completion',
        speaker: 'Crop Sorter',
        text: [
          'Perfect! See how quickly you sorted everything?',
          'With a good hash function, organization is automatic.',
          'This is the power of hashing!'
        ],
        emotion: 'proud',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'AP3'
          }
        ],
        nextNodeId: 'collision_hint'
      },
      {
        id: 'collision_hint',
        speaker: 'Crop Sorter',
        text: [
          'In more complex systems, sometimes two different items hash to the same bucket.',
          'That\'s called a COLLISION. There are clever ways to handle them!',
          'But that\'s a lesson for another time. Great work!'
        ],
        emotion: 'wise',
        actions: [
          {
            type: 'trigger_cutscene',
            value: 'CB_AP3'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// TILE WORKER (AP4 - South Grounds)
// =============================================================================

export const tileWorker: NPCConfig = {
  id: 'tile_worker',
  name: 'Tile Worker',
  type: NPCType.GUIDE,
  spriteKey: 'npc_tile_worker',
  defaultPosition: { x: 640, y: 620 },
  questRelated: true,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Tile Worker',
        text: [
          'Hey there! Down here at the Pairing Grounds.',
          'This is where we teach one of the MOST FAMOUS algorithm patterns.',
          'Ever heard of the Two Sum problem?'
        ],
        emotion: 'enthusiastic',
        choices: [
          {
            text: 'Never heard of it.',
            nextNodeId: 'explain_two_sum'
          },
          {
            text: 'Isn\'t that a FAANG interview question?',
            nextNodeId: 'faang_response'
          }
        ]
      },
      {
        id: 'explain_two_sum',
        speaker: 'Tile Worker',
        text: [
          'It\'s simple but brilliant!',
          'You have a bunch of numbered tiles and a TARGET number.',
          'Your job: find TWO tiles that add up to the target.',
          'Sounds easy, right? But there\'s a clever trick to doing it efficiently!'
        ],
        emotion: 'teaching',
        nextNodeId: 'challenge_intro'
      },
      {
        id: 'faang_response',
        speaker: 'Tile Worker',
        text: [
          'Oh, you know your stuff! Yes indeed!',
          'This is THE classic tech interview question.',
          'Google, Facebook, Amazon - they ALL ask this.',
          'Master this pattern and you\'ll ace those interviews!'
        ],
        emotion: 'impressed',
        nextNodeId: 'challenge_intro'
      },
      {
        id: 'challenge_intro',
        speaker: 'Tile Worker',
        text: [
          'Here\'s your challenge: I\'ll give you a target number.',
          'Find two tiles that sum to it.',
          'But here\'s the thing - you need to do it FAST.',
          'Checking every possible pair is slow. There\'s a better way!'
        ],
        emotion: 'challenging',
        choices: [
          {
            text: 'What\'s the better way?',
            nextNodeId: 'hint_complement'
          },
          {
            text: 'Let me try the slow way first.',
            nextNodeId: 'slow_way_ok'
          }
        ]
      },
      {
        id: 'hint_complement',
        speaker: 'Tile Worker',
        text: [
          'Think COMPLEMENTS!',
          'If the target is 10 and you see a tile with 3...',
          'What number would you need to pair with it?',
          '...7, right? So as you look at tiles, remember what complements you need!',
          'Use a hash set to track what you\'ve seen. Then it\'s O(n) instead of O(n²)!'
        ],
        emotion: 'excited',
        nextNodeId: 'start_puzzle'
      },
      {
        id: 'slow_way_ok',
        speaker: 'Tile Worker',
        text: [
          'Fair enough! Sometimes it helps to see the problem first.',
          'Try brute force, then I\'ll show you the optimized version.',
          'Both solutions teach you something valuable!'
        ],
        emotion: 'understanding',
        nextNodeId: 'start_puzzle'
      },
      {
        id: 'start_puzzle',
        speaker: 'Tile Worker',
        text: 'Alright, let\'s do this! Find those pairs!',
        emotion: 'encouraging',
        actions: [
          {
            type: 'unlock_puzzle',
            value: 'AP4'
          }
        ]
      },
      {
        id: 'after_completion',
        speaker: 'Tile Worker',
        text: [
          'Excellent! You found the pair!',
          'Did you use the complement method?',
          'That\'s the key insight that turns a slow O(n²) solution into a fast O(n) one!'
        ],
        emotion: 'proud',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'AP4'
          }
        ],
        nextNodeId: 'real_world'
      },
      {
        id: 'real_world',
        speaker: 'Tile Worker',
        text: [
          'This pattern shows up EVERYWHERE:',
          '• Finding matching items in a database',
          '• Detecting duplicates',
          '• Pairing complementary data',
          'Once you see it, you\'ll recognize it in tons of problems!',
          'Congrats - you just learned a FAANG-level pattern!'
        ],
        emotion: 'wise',
        actions: [
          {
            type: 'trigger_cutscene',
            value: 'CB_AP4'
          }
        ]
      }
    ]
  }
};

// =============================================================================
// FORGE KEEPER (Logic Forge)
// =============================================================================

export const forgeKeeper: NPCConfig = {
  id: 'forge_keeper',
  name: 'Forge Keeper',
  type: NPCType.GUIDE,
  spriteKey: 'npc_forge_keeper',
  defaultPosition: { x: 640, y: 360 },
  questRelated: false,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Forge Keeper',
        text: [
          'Welcome to the Logic Forge!',
          'This is where you can practice and refine your algorithmic skills.',
          'Complete puzzles outside to unlock new challenges here.'
        ],
        emotion: 'welcoming',
        nextNodeId: 'explain_forge'
      },
      {
        id: 'explain_forge',
        speaker: 'Forge Keeper',
        text: [
          'Each puzzle you solve unlocks a corresponding Forge challenge.',
          'These are quick drills to reinforce what you learned.',
          'Think of it as your training ground!'
        ],
        emotion: 'instructive',
        choices: [
          {
            text: 'Show me available challenges',
            nextNodeId: 'show_challenges'
          },
          {
            text: 'I\'ll come back later',
            nextNodeId: 'come_back'
          }
        ]
      },
      {
        id: 'show_challenges',
        speaker: 'Forge Keeper',
        text: 'Here\'s what you can practice:',
        emotion: 'helpful',
        actions: [
          {
            type: 'trigger_event',
            value: 'open_forge_menu'
          }
        ]
      },
      {
        id: 'come_back',
        speaker: 'Forge Keeper',
        text: 'Of course! The Forge is always open when you need it.',
        emotion: 'understanding'
      }
    ]
  }
};

// =============================================================================
// VILLAGE ELDER (Quest giver / lore)
// =============================================================================

export const villageElder: NPCConfig = {
  id: 'village_elder',
  name: 'Village Elder',
  type: NPCType.VILLAGER,
  spriteKey: 'npc_village_elder',
  defaultPosition: { x: 540, y: 360 },
  questRelated: false,

  dialogue: {
    startNodeId: 'intro',
    nodes: [
      {
        id: 'intro',
        speaker: 'Village Elder',
        text: [
          'Ah, a new seeker of patterns!',
          'Welcome to Array Plains. We are a simple farming community...',
          'But our methods of organization have been refined over generations.'
        ],
        emotion: 'wise',
        nextNodeId: 'lore'
      },
      {
        id: 'lore',
        speaker: 'Village Elder',
        text: [
          'Long ago, our harvests were chaotic. Crops rotted before we could find them.',
          'Then the first Sorting Farmer discovered the power of order.',
          'Since then, we\'ve mastered the fundamental patterns you see here today.'
        ],
        emotion: 'storytelling',
        nextNodeId: 'advice'
      },
      {
        id: 'advice',
        speaker: 'Village Elder',
        text: [
          'Learn from our farmers. Each teaches a piece of the greater pattern.',
          'Sorting. Indexing. Hashing. Pairing.',
          'Master these, and you\'ll be ready for the challenges beyond our plains.'
        ],
        emotion: 'encouraging'
      },
      {
        id: 'after_all_puzzles',
        speaker: 'Village Elder',
        text: [
          'You\'ve learned from all our masters! Impressive!',
          'But there is one final test...',
          'The Shuffler guards the path forward. It will test all you\'ve learned.',
          'When you\'re ready, seek the gate to the southeast.'
        ],
        emotion: 'serious',
        conditions: [
          {
            type: 'puzzle_completed',
            value: 'AP1'
          },
          {
            type: 'puzzle_completed',
            value: 'AP2'
          },
          {
            type: 'puzzle_completed',
            value: 'AP3'
          },
          {
            type: 'puzzle_completed',
            value: 'AP4'
          }
        ]
      }
    ]
  }
};

export const arrayPlainsNPCs: NPCConfig[] = [
  sortingFarmer,
  basketKeeper,
  cropSorter,
  tileWorker,
  forgeKeeper,
  villageElder
];
