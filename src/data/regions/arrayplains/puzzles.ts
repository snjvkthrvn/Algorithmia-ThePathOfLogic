/**
 * ARRAY PLAINS - PUZZLES
 * AP1: Fix the Farmland (Sorting)
 * AP2: Find the Lost Tool (Array Indexing)
 * AP3: Organize the Harvest (Hashing)
 * AP4: The Pairing Grounds (Two Sum)
 * BOSS: The Shuffler
 */

import { PuzzleConfig, BossConfig, PuzzleType, Difficulty, AlgorithmType } from '../../types';

// =============================================================================
// AP1: FIX THE FARMLAND (Sorting - Bubble/Selection Sort)
// =============================================================================

export const AP1_FixTheFarmland: PuzzleConfig = {
  id: 'AP1',
  name: 'fix_the_farmland',
  displayName: 'Fix the Farmland',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.EASY,
  algorithmConcept: AlgorithmType.SORTING,
  description: '8 numbered tiles (0-7) are scrambled on rails. Push and swap them to sort them into ascending order.',
  location: 'Array Plains - East Storage Shed',
  npcId: 'sorting_farmer',

  mechanics: {
    type: 'tile_sorting',
    elements: [
      { id: 'tile_0', type: 'numbered_tile', initialState: { value: 5, position: 0 }, properties: { number: 5 } },
      { id: 'tile_1', type: 'numbered_tile', initialState: { value: 2, position: 1 }, properties: { number: 2 } },
      { id: 'tile_2', type: 'numbered_tile', initialState: { value: 7, position: 2 }, properties: { number: 7 } },
      { id: 'tile_3', type: 'numbered_tile', initialState: { value: 1, position: 3 }, properties: { number: 1 } },
      { id: 'tile_4', type: 'numbered_tile', initialState: { value: 6, position: 4 }, properties: { number: 6 } },
      { id: 'tile_5', type: 'numbered_tile', initialState: { value: 0, position: 5 }, properties: { number: 0 } },
      { id: 'tile_6', type: 'numbered_tile', initialState: { value: 4, position: 6 }, properties: { number: 4 } },
      { id: 'tile_7', type: 'numbered_tile', initialState: { value: 3, position: 7 }, properties: { number: 3 } }
    ],
    rules: [
      'Tiles are on horizontal rails',
      'You can push adjacent tiles to swap them',
      'Goal: Arrange from 0 to 7 in order',
      'Tiles show their values clearly',
      'No time limit - take your time to learn!'
    ],
    controls: {
      input: ['E'],
      actions: ['Stand between two tiles and press E to swap them'],
      instructions: 'Walk to the gap between two tiles and press E to swap their positions. Repeat until sorted.'
    },
    victoryCriteria: {
      type: 'sorted_array',
      conditions: [
        'Position 0 contains value 0',
        'Position 1 contains value 1',
        'Position 2 contains value 2',
        'Position 3 contains value 3',
        'Position 4 contains value 4',
        'Position 5 contains value 5',
        'Position 6 contains value 6',
        'Position 7 contains value 7'
      ],
      checkFunction: 'checkArraySorted'
    }
  },

  solution: {
    steps: [
      'Initial: [5, 2, 7, 1, 6, 0, 4, 3]',
      'Multiple swapping approaches work (Bubble Sort, Selection Sort, etc.)',
      'Example: Bubble sort makes multiple passes, swapping adjacent out-of-order pairs',
      'Final: [0, 1, 2, 3, 4, 5, 6, 7]'
    ],
    acceptableVariations: [
      'Any sorting algorithm works',
      'Bubble Sort (swap adjacent pairs)',
      'Selection Sort (find min, move to front)',
      'Insertion Sort (build sorted section)',
      'Even manual random swaps eventually work!'
    ],
    optimalMoves: 16 // Approximate for bubble sort
  },

  hints: [
    'Start by getting 0 to the first position.',
    'Then get 1 to the second position, and so on.',
    'This is called Selection Sort - find the smallest and put it in place.',
    'Or try Bubble Sort - repeatedly swap adjacent out-of-order tiles.',
    'Both approaches work! The goal is understanding, not speed.'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 20,
    unlocks: ['FORGE_SORT_STEPS']
  },

  conceptBridge: {
    id: 'CB_AP1',
    puzzleId: 'AP1',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You took a scrambled set of numbered tiles and arranged them in order.',
          'You compared values and swapped them until everything was sorted.',
          'This required you to look at pairs of elements and make decisions.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Sorting Algorithms',
        content: [
          'What you performed is one of the most fundamental operations in computer science: SORTING.',
          'Every time you see a list ordered by name, date, price, or rating - sorting is at work.',
          'There are many algorithms for sorting, each with different tradeoffs.',
          'The two simplest are Bubble Sort and Selection Sort - both compare elements and swap them into order.'
        ]
      },
      {
        type: 'pseudocode',
        title: 'Bubble Sort in Code',
        content: 'Here\'s how Bubble Sort works:',
        code: {
          language: 'pseudocode',
          code: `function bubbleSort(array):
    n = array.length

    // Make multiple passes through the array
    for i from 0 to n-1:

        // Each pass bubbles the largest unsorted element to the end
        for j from 0 to n-i-2:

            // Compare adjacent elements
            if array[j] > array[j+1]:
                // Swap if out of order
                swap(array[j], array[j+1])

    return array

// Example:
// [5, 2, 7, 1] → [2, 5, 7, 1] → [2, 5, 1, 7] → [2, 1, 5, 7] → [1, 2, 5, 7]`,
          explanation: 'Each pass through the array "bubbles" the largest element to its correct position. After n passes, the array is sorted!'
        }
      },
      {
        type: 'pseudocode',
        title: 'Selection Sort in Code',
        content: 'Here\'s how Selection Sort works:',
        code: {
          language: 'pseudocode',
          code: `function selectionSort(array):
    n = array.length

    for i from 0 to n-1:
        // Find the minimum element in unsorted portion
        minIndex = i

        for j from i+1 to n-1:
            if array[j] < array[minIndex]:
                minIndex = j

        // Swap the minimum to the current position
        if minIndex != i:
            swap(array[i], array[minIndex])

    return array`,
          explanation: 'Selection Sort finds the smallest element and moves it to the front, then finds the next smallest, and so on.'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Sorting Algorithms (Bubble Sort & Selection Sort)"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your sorting understanding',
      challenge: 'If you have an array of 100 elements using Bubble Sort, how many comparisons do you make in the worst case?',
      correctAnswer: 4950,
      feedback: {
        correct: 'Perfect! It\'s n×(n-1)/2 = 100×99/2 = 4,950 comparisons. This is O(n²) time complexity!',
        incorrect: 'Hint: In Bubble Sort, you compare every pair. That\'s n×(n-1)/2 comparisons for an array of size n.'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_SORTING_ALGORITHMS',
    algorithmName: 'Sorting Algorithms',
    category: AlgorithmType.SORTING,
    unlockedBy: 'AP1',
    difficulty: Difficulty.EASY,
    relatedConcepts: ['bubble_sort', 'selection_sort', 'comparison_based_sorting', 'time_complexity'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You looked at messy tiles and made them orderly. Each swap brought you closer to complete organization. It felt satisfying to see chaos become order.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'Sorting means arranging elements in a specific order (usually ascending or descending).',
          'Bubble Sort: Repeatedly swap adjacent out-of-order elements. Simple but slow (O(n²)).',
          'Selection Sort: Find the minimum element and move it to the front. Also O(n²) but fewer swaps.',
          'Both are "comparison-based" - they work by comparing elements to determine order.',
          'Faster algorithms exist (Merge Sort O(n log n), Quick Sort O(n log n) average), but these basics teach the principles!'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'Bubble Sort Steps',
        content: [
          '1. START at the beginning of the array',
          '2. COMPARE each pair of adjacent elements',
          '3. SWAP them if they\'re in the wrong order',
          '4. CONTINUE to the end (one element is now in place)',
          '5. REPEAT the process for the remaining unsorted elements',
          '6. STOP when no more swaps are needed'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'Selection Sort Steps',
        content: [
          '1. FIND the smallest element in the unsorted portion',
          '2. SWAP it with the first unsorted position',
          '3. MOVE the boundary of "sorted" forward by one',
          '4. REPEAT until the entire array is sorted'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Sorting search results by relevance or date',
          '• Organizing files by name or size',
          '• Leaderboards in games',
          '• E-commerce: sorting products by price or rating',
          '• Contact lists sorted alphabetically',
          '• Spreadsheet sorting',
          '• Database query results (ORDER BY)'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You understand the fundamentals of comparison-based sorting. You can implement basic sorting algorithms and recognize when sorting is the right tool for a problem.'
      }
    ]
  }
};

// =============================================================================
// AP2: FIND THE LOST TOOL (Array Indexing / Direct Access)
// =============================================================================

export const AP2_FindTheLostTool: PuzzleConfig = {
  id: 'AP2',
  name: 'find_the_lost_tool',
  displayName: 'Find the Lost Tool',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.EASY,
  algorithmConcept: AlgorithmType.ARRAY_INDEXING,
  description: '10 baskets labeled 0-9. The NPC tells you the hammer is in basket 5. Demonstrate O(1) direct access vs O(n) linear search.',
  location: 'Array Plains - West Barn',
  npcId: 'basket_keeper',

  mechanics: {
    type: 'access_comparison',
    elements: [
      { id: 'basket_0', type: 'basket', initialState: { position: 0, contains: 'rake' }, properties: { index: 0 } },
      { id: 'basket_1', type: 'basket', initialState: { position: 1, contains: 'shovel' }, properties: { index: 1 } },
      { id: 'basket_2', type: 'basket', initialState: { position: 2, contains: 'hoe' }, properties: { index: 2 } },
      { id: 'basket_3', type: 'basket', initialState: { position: 3, contains: 'bucket' }, properties: { index: 3 } },
      { id: 'basket_4', type: 'basket', initialState: { position: 4, contains: 'seeds' }, properties: { index: 4 } },
      { id: 'basket_5', type: 'basket', initialState: { position: 5, contains: 'hammer' }, properties: { index: 5 } },
      { id: 'basket_6', type: 'basket', initialState: { position: 6, contains: 'nails' }, properties: { index: 6 } },
      { id: 'basket_7', type: 'basket', initialState: { position: 7, contains: 'rope' }, properties: { index: 7 } },
      { id: 'basket_8', type: 'basket', initialState: { position: 8, contains: 'tarp' }, properties: { index: 8 } },
      { id: 'basket_9', type: 'basket', initialState: { position: 9, contains: 'gloves' }, properties: { index: 9 } }
    ],
    rules: [
      'NPC says: "The hammer is in basket 5"',
      'Option 1: Search baskets 0, 1, 2, 3, 4, 5... (slow)',
      'Option 2: Go directly to basket 5 (fast!)',
      'The puzzle measures which approach you use'
    ],
    controls: {
      input: ['E'],
      actions: ['Walk to a basket and press E to check it'],
      instructions: 'The Basket Keeper told you the hammer is in basket 5. How will you find it?'
    },
    victoryCriteria: {
      type: 'item_found',
      conditions: [
        'Hammer retrieved from basket 5'
      ],
      checkFunction: 'checkHammerFound'
    }
  },

  solution: {
    steps: [
      'NPC states: "Hammer is in basket 5"',
      'OPTIMAL: Walk directly to basket 5 and press E',
      'SUBOPTIMAL: Check baskets 0, 1, 2, 3, 4, then 5',
      'The game tracks your approach and explains the difference'
    ],
    acceptableVariations: [
      'Direct access (1 check) - optimal',
      'Linear search (6 checks) - works but inefficient'
    ],
    optimalMoves: 1
  },

  hints: [
    'The Basket Keeper already told you the exact index: 5.',
    'Do you need to check the other baskets?',
    'Direct access means: if you know the index, jump straight to it!',
    'This is the power of arrays - O(1) lookup time.'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 15
  },

  conceptBridge: {
    id: 'CB_AP2',
    puzzleId: 'AP2',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'The Basket Keeper told you the hammer was in basket 5.',
          'If you went straight there, you used O(1) direct access - instant retrieval!',
          'If you checked baskets in order, you used O(n) linear search - slower, but it works.',
          'The difference becomes HUGE as the array grows.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Array Indexing',
        content: [
          'Arrays are the most fundamental data structure in programming.',
          'Each element has an INDEX - a numeric position starting from 0.',
          'The superpower of arrays: if you know the index, you can access that element INSTANTLY.',
          'This is called O(1) time complexity - constant time, no matter how big the array is!',
          'Contrast with linear search (O(n)) - you must check each element until you find it.'
        ]
      },
      {
        type: 'pseudocode',
        title: 'Direct Access vs Linear Search',
        content: 'Compare the two approaches:',
        code: {
          language: 'pseudocode',
          code: `// DIRECT ACCESS - O(1)
function getItemAtIndex(array, index):
    return array[index]  // One operation!

hammer = baskets[5]  // Instant!


// LINEAR SEARCH - O(n)
function findItem(array, target):
    for i from 0 to array.length - 1:
        if array[i] == target:
            return i
    return -1  // Not found

// Must check up to n elements in worst case
index = findItem(baskets, "hammer")  // Could take 10 checks!


// COMPARISON:
// 10 items: Direct = 1 check, Search = up to 10 checks
// 1000 items: Direct = 1 check, Search = up to 1000 checks
// 1,000,000 items: Direct = 1 check, Search = up to 1,000,000 checks!`,
          explanation: 'Arrays let you jump to any index instantly. This is WHY arrays are so powerful and widely used!'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Array Indexing & Direct Access"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your understanding of array access',
      challenge: 'If you have an array of 1 million elements and know the index, how many checks do you need to retrieve it?',
      correctAnswer: 1,
      feedback: {
        correct: 'Exactly! No matter the array size, direct access is always 1 operation. That\'s O(1)!',
        incorrect: 'Think about it: if you know the exact index, you can jump straight there. It\'s always just 1 lookup!'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_ARRAY_INDEXING',
    algorithmName: 'Array Indexing & Direct Access',
    category: AlgorithmType.ARRAY_INDEXING,
    unlockedBy: 'AP2',
    difficulty: Difficulty.EASY,
    relatedConcepts: ['arrays', 'zero_indexing', 'random_access', 'O(1)_complexity'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You knew exactly where the hammer was, so you went straight there. No searching, no wasted time. It felt efficient and obvious.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'An ARRAY is a collection of elements stored in contiguous memory.',
          'Each element has an INDEX - a number indicating its position (starting from 0).',
          'DIRECT ACCESS means: array[i] retrieves the element at index i in constant O(1) time.',
          'This is possible because the computer calculates the memory address directly: base_address + (index × element_size).',
          'No need to iterate through elements - jump straight to the target!',
          'This makes arrays incredibly fast for lookups when you know the index.'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'How It Works',
        content: [
          '1. CREATE an array: memory allocated for n elements in sequence',
          '2. STORE the base address (where the array starts in memory)',
          '3. ACCESS: To get array[5], compute: base_address + (5 × element_size)',
          '4. RETRIEVE the value at that memory location',
          '5. DONE - one calculation, instant access!'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Accessing a pixel in an image by (x, y) coordinates',
          '• Getting a specific character in a string: text[10]',
          '• Retrieving a high score by rank: scores[0] for 1st place',
          '• Fetching a specific frame in a video',
          '• Looking up a player\'s stats by their ID number',
          '• Reading a specific byte in a file'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You understand why arrays are so fast for indexed access. You know the difference between O(1) direct access and O(n) search. Use arrays when you need fast lookups by position!'
      }
    ]
  }
};

// =============================================================================
// AP3: ORGANIZE THE HARVEST (Hashing)
// =============================================================================

export const AP3_OrganizeTheHarvest: PuzzleConfig = {
  id: 'AP3',
  name: 'organize_the_harvest',
  displayName: 'Organize the Harvest',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.MEDIUM,
  algorithmConcept: AlgorithmType.HASHING,
  description: 'Crops drop from a hopper (grain, berries, roots, herbs). Drag each to the correct bucket (A, B, C, D) based on the hash function (crop type).',
  location: 'Array Plains - North Field Workshop',
  npcId: 'crop_sorter',

  mechanics: {
    type: 'hash_sorting',
    elements: [
      { id: 'bucket_A', type: 'bucket', initialState: { empty: true }, properties: { accepts: 'grain' } },
      { id: 'bucket_B', type: 'bucket', initialState: { empty: true }, properties: { accepts: 'berries' } },
      { id: 'bucket_C', type: 'bucket', initialState: { empty: true }, properties: { accepts: 'roots' } },
      { id: 'bucket_D', type: 'bucket', initialState: { empty: true }, properties: { accepts: 'herbs' } },
      { id: 'hopper', type: 'dispenser', initialState: { active: true }, properties: {
        sequence: ['grain', 'berries', 'grain', 'roots', 'herbs', 'berries', 'grain', 'herbs', 'roots', 'berries', 'grain', 'herbs']
      }}
    ],
    rules: [
      'The hopper drops crops one at a time',
      'Hash rule: Grain→A, Berries→B, Roots→C, Herbs→D',
      'Drag each crop to its correct bucket',
      'Complete when all 12 crops are sorted',
      'Speed matters - efficient hashing is fast!'
    ],
    controls: {
      input: ['Mouse/Touch'],
      actions: ['Drag crops from hopper to buckets'],
      instructions: 'As crops appear, quickly drag them to the matching bucket. Use the hash rule!'
    },
    victoryCriteria: {
      type: 'all_hashed_correctly',
      conditions: [
        'All grain in bucket A',
        'All berries in bucket B',
        'All roots in bucket C',
        'All herbs in bucket D'
      ],
      checkFunction: 'checkAllCropsHashed'
    }
  },

  solution: {
    steps: [
      'Memorize hash rule: Grain→A, Berries→B, Roots→C, Herbs→D',
      'For each crop that drops:',
      '  1. Identify crop type',
      '  2. Apply hash function (determine bucket)',
      '  3. Drag to correct bucket',
      'Repeat for all 12 crops'
    ],
    acceptableVariations: [
      'Order doesn\'t matter - you can let crops accumulate then sort',
      'Or sort each crop immediately as it appears'
    ],
    optimalMoves: 12 // One drag per crop
  },

  hints: [
    'Memorize the rule! Grain→A, Berries→B, Roots→C, Herbs→D.',
    'The crop type IS the hash - instant categorization.',
    'In real hashing, the computer calculates this automatically.',
    'No searching needed - the hash tells you exactly where to put it!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 25,
    unlocks: ['FORGE_HASH_BUCKETS']
  },

  conceptBridge: {
    id: 'CB_AP3',
    puzzleId: 'AP3',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You sorted crops into buckets based on their type.',
          'You didn\'t search or compare - you applied a RULE that instantly told you where each crop belonged.',
          'This rule is a HASH FUNCTION - it turns data properties into storage locations.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Hash Functions & Hash Tables',
        content: [
          'HASHING is a technique for ultra-fast data storage and retrieval.',
          'A HASH FUNCTION takes input data and computes an index/bucket for it.',
          'Instead of searching through data, you calculate exactly where it is!',
          'Hash tables (also called hash maps or dictionaries) use this to achieve O(1) average lookup time.',
          'This is how Python dictionaries, JavaScript objects, and Java HashMaps work!'
        ]
      },
      {
        type: 'pseudocode',
        title: 'Hash Function Example',
        content: 'Here\'s how hashing works in code:',
        code: {
          language: 'pseudocode',
          code: `// HASH FUNCTION
function hashCrop(crop):
    if crop == "grain":
        return 0  // Bucket A
    else if crop == "berries":
        return 1  // Bucket B
    else if crop == "roots":
        return 2  // Bucket C
    else if crop == "herbs":
        return 3  // Bucket D

// HASH TABLE (simplified)
buckets = [[], [], [], []]  // 4 empty buckets

function addCrop(crop):
    bucketIndex = hashCrop(crop)
    buckets[bucketIndex].add(crop)  // O(1)!

function findCrops(cropType):
    bucketIndex = hashCrop(cropType)
    return buckets[bucketIndex]  // O(1)!


// REAL-WORLD HASH FUNCTION (more complex)
function hash(key):
    hashValue = 0
    for each character in key:
        hashValue = (hashValue * 31 + charCode(character)) % bucketCount
    return hashValue

// This distributes data evenly across buckets!`,
          explanation: 'Hash functions turn data into bucket indices. Good hash functions distribute data evenly to avoid collisions!'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Hash Functions & Hash Tables"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your hashing knowledge',
      challenge: 'What is the main advantage of a hash table over an array for lookups by key (not index)?',
      correctAnswer: 'O(1) lookup by key instead of O(n) search',
      feedback: {
        correct: 'Perfect! Hash tables let you find data by key in O(1) time instead of searching through an array in O(n) time!',
        incorrect: 'Think about access speed: arrays need O(n) to search by value, but hash tables compute the location in O(1)!'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_HASHING',
    algorithmName: 'Hash Functions & Hash Tables',
    category: AlgorithmType.HASHING,
    unlockedBy: 'AP3',
    difficulty: Difficulty.MEDIUM,
    relatedConcepts: ['hash_functions', 'hash_tables', 'hash_maps', 'dictionaries', 'collisions', 'O(1)_lookup'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You looked at each crop and instantly knew where it belonged. No thinking, no searching - just apply the rule and done. It felt automatic and fast.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'HASH FUNCTION: A function that converts input data into an index/bucket number.',
          'HASH TABLE: A data structure that uses hash functions to store and retrieve data in O(1) average time.',
          'Instead of searching for data, you COMPUTE where it should be!',
          'COLLISION: When two different inputs hash to the same bucket. Handled with techniques like chaining or open addressing.',
          'Used everywhere: Python dicts, JavaScript objects, Java HashMap, C++ unordered_map, database indexing, caching, and more!'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'How Hash Tables Work',
        content: [
          '1. CREATE an array of "buckets" to store data',
          '2. INSERT: Run key through hash function → get bucket index',
          '3. STORE the value in that bucket',
          '4. RETRIEVE: Run key through same hash function → get bucket index',
          '5. RETURN the value from that bucket',
          '6. HANDLE COLLISIONS if two keys hash to same bucket (chaining, probing, etc.)'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Looking up a username to get user data (O(1) vs searching database)',
          '• Storing and retrieving cache data (URLs → cached pages)',
          '• Checking if a password has been leaked (hash → breach database)',
          '• Counting word frequency (word → count)',
          '• Detecting duplicates efficiently',
          '• Implementing sets (unique elements)',
          '• Symbol tables in compilers (variable name → memory location)'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You understand how hash functions enable ultra-fast data lookup. You can recognize when to use hash tables instead of arrays or linear search. This is a game-changer for performance!'
      }
    ]
  }
};

// =============================================================================
// AP4: THE PAIRING GROUNDS (Two Sum Pattern)
// =============================================================================

export const AP4_ThePairingGrounds: PuzzleConfig = {
  id: 'AP4',
  name: 'the_pairing_grounds',
  displayName: 'The Pairing Grounds',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.MEDIUM,
  algorithmConcept: AlgorithmType.TWO_SUM,
  description: 'Find two numbered tiles that sum to a target value. Learn the classic Two Sum pattern used in FAANG interviews.',
  location: 'Array Plains - South Grounds',
  npcId: 'tile_worker',

  mechanics: {
    type: 'two_sum_puzzle',
    elements: [
      { id: 'tile_a', type: 'numbered_tile', initialState: { value: 2, position: { x: 200, y: 500 } }, properties: { number: 2 } },
      { id: 'tile_b', type: 'numbered_tile', initialState: { value: 7, position: { x: 300, y: 550 } }, properties: { number: 7 } },
      { id: 'tile_c', type: 'numbered_tile', initialState: { value: 11, position: { x: 400, y: 480 } }, properties: { number: 11 } },
      { id: 'tile_d', type: 'numbered_tile', initialState: { value: 15, position: { x: 500, y: 520 } }, properties: { number: 15 } },
      { id: 'tile_e', type: 'numbered_tile', initialState: { value: 3, position: { x: 600, y: 490 } }, properties: { number: 3 } },
      { id: 'tile_f', type: 'numbered_tile', initialState: { value: 6, position: { x: 700, y: 540 } }, properties: { number: 6 } },
      { id: 'tile_g', type: 'numbered_tile', initialState: { value: 9, position: { x: 800, y: 500 } }, properties: { number: 9 } },
      { id: 'tile_h', type: 'numbered_tile', initialState: { value: 1, position: { x: 900, y: 530 } }, properties: { number: 1 } },
      { id: 'target_display', type: 'sign', initialState: { text: 'TARGET: 9' }, properties: { target: 9 } }
    ],
    rules: [
      'A target number is displayed (e.g., 9)',
      'Find TWO tiles that add up to exactly that target',
      'Touch/select both tiles to mark them',
      'Brute force (check all pairs): O(n²)',
      'Optimal (hash set for complements): O(n)'
    ],
    controls: {
      input: ['E', 'Click/Touch'],
      actions: ['Select tiles to mark them as a pair'],
      instructions: 'Find two tiles that sum to the target. Think about complements!'
    },
    victoryCriteria: {
      type: 'correct_pair_found',
      conditions: [
        'Two tiles selected',
        'Sum of selected tiles equals target'
      ],
      checkFunction: 'checkTwoSum'
    }
  },

  solution: {
    steps: [
      'Target: 9',
      'Tiles: [2, 7, 11, 15, 3, 6, 9, 1]',
      'BRUTE FORCE: Check all pairs - (2,7)=9 ✓ Found!',
      'OPTIMAL: Use hash set:',
      '  - See 2, need 7 (9-2=7), add 2 to set',
      '  - See 7, check if 2 is in set → YES! Found pair (2,7)',
      'Answer: Tiles with values 2 and 7'
    ],
    acceptableVariations: [
      'Any valid pair that sums to target',
      'For target 9: (2,7) or (3,6) both work if present'
    ],
    optimalMoves: 2 // Select two tiles
  },

  hints: [
    'If you see a tile with value X, you need a tile with value (TARGET - X).',
    'That missing value is called the COMPLEMENT.',
    'Use a hash set to remember which values you\'ve seen.',
    'For each new tile, check: "Is my complement in the set?"',
    'This is the Two Sum pattern - a classic interview question!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 30,
    unlocks: ['FORGE_TWO_SUM_DRILL', 'BOSS_SHUFFLER']
  },

  conceptBridge: {
    id: 'CB_AP4',
    puzzleId: 'AP4',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You found two numbers that add up to a target value.',
          'You could check every possible pair (slow), or...',
          'You could track complements and find the answer in one pass (fast)!'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Two Sum',
        content: [
          'Two Sum is one of the MOST FAMOUS algorithm problems.',
          'It\'s asked in almost every major tech interview - Google, Facebook, Amazon, Microsoft, Apple.',
          'The key insight: instead of checking all pairs, use a HASH SET to track what you\'ve seen.',
          'For each number, check if its complement (target - number) exists in the set.',
          'This transforms an O(n²) brute force into an O(n) solution!'
        ]
      },
      {
        type: 'pseudocode',
        title: 'Two Sum Algorithm',
        content: 'Here\'s the optimal solution:',
        code: {
          language: 'pseudocode',
          code: `function twoSum(array, target):
    seen = new HashSet()

    for each num in array:
        complement = target - num

        // Check if we've seen the complement
        if complement in seen:
            return [complement, num]  // Found the pair!

        // Add current number to set
        seen.add(num)

    return null  // No pair found

// Example:
// array = [2, 7, 11, 15], target = 9
//
// i=0: num=2, complement=7, seen={} → add 2 → seen={2}
// i=1: num=7, complement=2, seen={2} → 2 is in seen! → return [2, 7]
//
// Only TWO iterations instead of checking all 6 pairs!`,
          explanation: 'By storing seen numbers in a hash set, we can check for the complement in O(1) time. This makes the whole algorithm O(n)!'
        }
      },
      {
        type: 'pseudocode',
        title: 'Brute Force (For Comparison)',
        content: 'The slow approach:',
        code: {
          language: 'pseudocode',
          code: `function twoSumBruteForce(array, target):
    n = array.length

    for i from 0 to n-1:
        for j from i+1 to n-1:
            if array[i] + array[j] == target:
                return [array[i], array[j]]

    return null

// This checks EVERY PAIR - O(n²)
// For 1000 elements: ~500,000 comparisons!
// For 10,000 elements: ~50,000,000 comparisons!`,
          explanation: 'Brute force works but doesn\'t scale. The hash set approach is much more efficient.'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Two Sum Pattern - The FAANG Classic"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your Two Sum mastery',
      challenge: 'Given array [3, 2, 4] and target 6, what pair sums to the target?',
      correctAnswer: '[2, 4]',
      feedback: {
        correct: 'Perfect! 2 + 4 = 6. You\'ve mastered the Two Sum pattern!',
        incorrect: 'Check your math: which two numbers add up to 6? Try 3+2=5, 3+4=7, 2+4=6 ✓'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_TWO_SUM',
    algorithmName: 'Two Sum Pattern',
    category: AlgorithmType.TWO_SUM,
    unlockedBy: 'AP4',
    difficulty: Difficulty.MEDIUM,
    relatedConcepts: ['hash_sets', 'complement_technique', 'array_traversal', 'FAANG_interviews'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'At first it seemed like you\'d have to check every possible pair. But then you realized: for each number, you only need to check if its "partner" exists. Much simpler!'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'TWO SUM: Given an array and a target, find two numbers that add up to the target.',
          'BRUTE FORCE: Check every pair - O(n²) time complexity.',
          'OPTIMIZED: Use a hash set to track seen numbers - O(n) time, O(n) space.',
          'KEY INSIGHT: For each number X, you need (target - X). That\'s the complement.',
          'As you scan the array, remember what you\'ve seen. When you find a number whose complement is in the set, you\'re done!',
          'This is THE classic interview question. Master it!'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Algorithm',
        content: [
          '1. CREATE an empty hash set',
          '2. FOR each number in the array:',
          '   a. CALCULATE complement = target - number',
          '   b. CHECK if complement is in the hash set',
          '   c. If YES: return [complement, number]',
          '   d. If NO: add current number to hash set',
          '3. IF loop completes without finding a pair: return null/None'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Finding complementary items (buy X, need Y to complete the set)',
          '• Budget allocation (task costs X, budget is Y, find task that costs (Y-X))',
          '• Chemistry: finding reactants that combine to a target compound',
          '• Game inventory: combining items with specific total weight/value',
          '• Network routing: finding paths that sum to target latency',
          '• And of course: FAANG technical interviews!'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You\'ve mastered one of the most important interview patterns. You understand the complement technique and how hash sets enable O(n) solutions. This pattern appears in countless variations!'
      }
    ]
  }
};

// =============================================================================
// BOSS: THE SHUFFLER (Multi-Phase Boss combining all Array Plains concepts)
// =============================================================================

export const BOSS_TheShuffler: BossConfig = {
  id: 'BOSS_SHUFFLER',
  name: 'the_shuffler',
  displayName: 'The Shuffler',
  type: PuzzleType.BOSS,
  difficulty: Difficulty.HARD,
  algorithmConcept: AlgorithmType.HYBRID,
  description: 'The guardian of Array Plains tests your mastery of sorting, indexing, hashing, and pairing through a multi-phase gauntlet.',
  location: 'Array Plains - Boss Arena (Southeast)',
  npcId: 'village_elder',
  healthBarVisible: true,

  phases: [
    {
      phaseNumber: 1,
      name: 'Chaos Sort',
      mechanics: {
        type: 'timed_sorting',
        elements: [
          { id: 'phase1_tiles', type: 'tile_grid', initialState: { scrambled: true }, properties: { size: 12, timeLimit: 45 } }
        ],
        rules: [
          'Sort 12 numbered tiles (0-11) in order',
          'You have 45 seconds',
          'The Shuffler randomly swaps tiles while you work',
          'Must complete the sort before time runs out'
        ],
        controls: {
          input: ['E'],
          actions: ['Swap adjacent tiles to sort'],
          instructions: 'Sort the tiles while the Shuffler tries to mess you up!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['All tiles sorted before time expires'],
          checkFunction: 'checkPhase1Complete'
        }
      },
      timeLimit: 45,
      difficulty: Difficulty.MEDIUM
    },
    {
      phaseNumber: 2,
      name: 'Index Rush',
      mechanics: {
        type: 'rapid_indexing',
        elements: [
          { id: 'phase2_baskets', type: 'basket_array', initialState: { count: 20 }, properties: { challenges: 10 } }
        ],
        rules: [
          '20 baskets (0-19) with random items',
          'The Shuffler calls out 10 specific indices',
          'Retrieve the correct item from each index as fast as possible',
          'Wrong retrieval = time penalty',
          'Complete all 10 retrievals within 60 seconds'
        ],
        controls: {
          input: ['E', 'Number keys'],
          actions: ['Jump to index and retrieve item'],
          instructions: 'Use direct access! Don\'t search - index directly!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['10 correct retrievals within time limit'],
          checkFunction: 'checkPhase2Complete'
        }
      },
      timeLimit: 60,
      difficulty: Difficulty.MEDIUM
    },
    {
      phaseNumber: 3,
      name: 'Hash Storm',
      mechanics: {
        type: 'rapid_hashing',
        elements: [
          { id: 'phase3_items', type: 'item_stream', initialState: { active: true }, properties: { itemCount: 30, bucketCount: 6 } }
        ],
        rules: [
          '30 items stream in rapidly',
          '6 buckets with hash rules displayed',
          'Hash each item to correct bucket instantly',
          'Speed increases as you progress',
          'Misplaced item = health damage'
        ],
        controls: {
          input: ['Mouse/Touch', 'Number keys 1-6'],
          actions: ['Drag items to buckets or press number key'],
          instructions: 'Hash fast! Use the hash function!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['All 30 items hashed correctly'],
          checkFunction: 'checkPhase3Complete'
        }
      },
      timeLimit: 75,
      difficulty: Difficulty.HARD
    },
    {
      phaseNumber: 4,
      name: 'Pair Pandemonium',
      mechanics: {
        type: 'multi_two_sum',
        elements: [
          { id: 'phase4_tiles', type: 'number_field', initialState: { tileCount: 20 }, properties: { rounds: 5 } }
        ],
        rules: [
          '5 rounds of Two Sum challenges',
          'Each round: 20 tiles, find pair matching target',
          'Targets get larger and trickier',
          'Arena shifts and obstacles appear',
          'Must complete all 5 rounds'
        ],
        controls: {
          input: ['E', 'Select'],
          actions: ['Select two tiles that sum to target'],
          instructions: 'Use complement technique! Hash set for speed!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['All 5 Two Sum rounds solved'],
          checkFunction: 'checkPhase4Complete'
        }
      },
      timeLimit: 90,
      difficulty: Difficulty.HARD
    }
  ],

  mechanics: {
    type: 'multi_phase_boss',
    elements: [],
    rules: [
      'Defeat all 4 phases to win',
      'Each phase tests a different Array Plains concept',
      'Time pressure increases each phase',
      'The Shuffler gets more aggressive as health drops'
    ],
    controls: {
      input: ['Phase-specific'],
      actions: ['Phase-specific'],
      instructions: 'Prove your mastery of all array patterns!'
    },
    victoryCriteria: {
      type: 'all_phases_complete',
      conditions: ['Phase 1 complete', 'Phase 2 complete', 'Phase 3 complete', 'Phase 4 complete'],
      checkFunction: 'checkAllPhasesComplete'
    }
  },

  solution: {
    steps: [
      'Phase 1: Use efficient sorting (focus, ignore distractions)',
      'Phase 2: Jump directly to indices - no searching!',
      'Phase 3: Memorize hash function, apply rapidly',
      'Phase 4: Apply complement technique for each Two Sum round'
    ]
  },

  hints: [
    'Phase 1: Stay calm. The Shuffler\'s swaps are predictable - re-sort affected areas.',
    'Phase 2: Don\'t search! Jump directly to the called index.',
    'Phase 3: Memorize the hash function at the start - speed is key.',
    'Phase 4: Use the hash set technique - don\'t brute force the pairs!',
    'All phases: Stay focused. You know these patterns!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 100,
    unlocks: ['twinrivers', 'exit_to_twinrivers']
  },

  defeatDialogue: [
    'The Shuffler\'s chaotic energy dissipates, settling into calm order.',
    'You have proven your mastery of the foundational array patterns!',
    'Sorting, indexing, hashing, pairing - you command them all.',
    'The path to Twin Rivers is now open. There, more advanced patterns await.'
  ],

  victoryRewards: {
    codexEntries: ['CODEX_SORTING_ALGORITHMS', 'CODEX_ARRAY_INDEXING', 'CODEX_HASHING', 'CODEX_TWO_SUM'],
    unlockedRegions: ['twinrivers'],
    progressionPoints: 100,
    specialItems: ['array_plains_mastery_badge', 'shuffler_trophy']
  },

  conceptBridge: {
    id: 'CB_BOSS_SHUFFLER',
    puzzleId: 'BOSS_SHUFFLER',
    sections: [
      {
        type: 'story_recap',
        title: 'Victory Over Chaos',
        content: [
          'You faced the ultimate test of Array Plains and triumphed.',
          'Under pressure, you applied sorting, indexing, hashing, and the Two Sum pattern.',
          'The Shuffler threw chaos at you, but you responded with algorithmic order.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Foundation Is Complete',
        content: [
          'You now possess the four foundational array patterns:',
          '1. SORTING - Organizing data for efficiency',
          '2. INDEXING - Direct O(1) access to elements',
          '3. HASHING - Mapping data to locations for fast retrieval',
          '4. TWO SUM - The complement technique and hash set optimization',
          '',
          'These patterns form the backbone of countless algorithms.',
          'Every advanced technique builds on these foundations.'
        ]
      },
      {
        type: 'unlock',
        title: 'The Journey Continues',
        content: [
          'Array Plains has taught you well, but this is just the beginning.',
          'Twin Rivers awaits - there you will learn pointer techniques.',
          'Two pointers, sliding windows, and advanced traversal patterns.',
          'The path of logic grows more challenging... and more rewarding.'
        ]
      }
    ]
  },

  codexEntry: {
    id: 'CODEX_ARRAY_MASTERY',
    algorithmName: 'Array Mastery - The Four Pillars',
    category: AlgorithmType.HYBRID,
    unlockedBy: 'BOSS_SHUFFLER',
    difficulty: Difficulty.HARD,
    relatedConcepts: ['sorting', 'indexing', 'hashing', 'two_sum', 'array_patterns', 'algorithmic_thinking'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You faced intense pressure, rapidly switching between different algorithmic patterns. But you stayed calm because you KNEW these patterns. They were second nature.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'Arrays are the most fundamental data structure, and mastering them requires four key patterns:',
          '1. SORTING - Organizing for efficiency (O(n²) simple sorts, O(n log n) advanced sorts)',
          '2. INDEXING - Direct access in O(1) time',
          '3. HASHING - Mapping keys to values for O(1) lookup',
          '4. TWO SUM - Complement technique with hash sets',
          '',
          'Real-world problems often combine these patterns.',
          'The Shuffler forced you to rapidly switch between them - just like real coding interviews and production systems do.',
          'Mastery means recognizing which pattern to apply and executing it under pressure.'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Array Mastery Framework',
        content: [
          '1. ANALYZE the problem: What operation is needed?',
          '2. IDENTIFY the pattern:',
          '   - Need order? → Sorting',
          '   - Know position? → Indexing',
          '   - Need fast lookup by key? → Hashing',
          '   - Finding pairs/complements? → Two Sum pattern',
          '3. APPLY the pattern efficiently',
          '4. OPTIMIZE if needed (better algorithm, data structure, or approach)',
          '5. COMBINE patterns for complex problems'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          'SORTING: Search results, file systems, leaderboards, data analysis',
          'INDEXING: Database primary keys, array lookups, random access',
          'HASHING: Caches, dictionaries, sets, password storage, blockchain',
          'TWO SUM: Budget matching, complementary items, pair detection',
          'COMBINED: Recommendation engines, fraud detection, analytics pipelines'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You have mastered the foundational array patterns. You can recognize problems, apply the right technique, and combine patterns when needed. You\'re ready for advanced data structures and algorithms!'
      }
    ]
  }
};

// Export all puzzles
export const arrayPlainsPuzzles: (PuzzleConfig | BossConfig)[] = [
  AP1_FixTheFarmland,
  AP2_FindTheLostTool,
  AP3_OrganizeTheHarvest,
  AP4_ThePairingGrounds,
  BOSS_TheShuffler
];
