/**
 * TWIN RIVERS - PUZZLES
 * TR1: Mirror Walk (Two Pointers - Simultaneous Movement)
 * TR2: Meeting Point (Pointer Convergence)
 * TR3: Sliding Window Catch (Sliding Window)
 * TR4: Breaking the Currents (Advanced Pointer Logic)
 * BOSS: Mirror Serpent
 */

import { PuzzleConfig, BossConfig, PuzzleType, Difficulty, AlgorithmType } from '../../types';

// =============================================================================
// TR1: MIRROR WALK (Two Pointers - Simultaneous Movement)
// =============================================================================

export const TR1_MirrorWalk: PuzzleConfig = {
  id: 'TR1',
  name: 'mirror_walk',
  displayName: 'Mirror Walk',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.EASY,
  algorithmConcept: AlgorithmType.TWO_POINTERS,
  description: 'Control two characters simultaneously on opposite riverbanks. They move in perfect symmetry - when one goes left, the other mirrors right. Navigate both to their destinations.',
  location: 'Twin Rivers - Blue River Bank (North)',
  npcId: 'convergence_monk',

  mechanics: {
    type: 'dual_control_symmetry',
    elements: [
      { id: 'character_blue', type: 'player_pointer', initialState: { position: { x: 200, y: 200 } }, properties: { river: 'blue', destination: { x: 800, y: 200 } } },
      { id: 'character_orange', type: 'player_pointer', initialState: { position: { x: 1080, y: 520 } }, properties: { river: 'orange', destination: { x: 480, y: 520 } } },
      { id: 'obstacles_blue', type: 'obstacle_set', initialState: { positions: [{ x: 400, y: 200 }, { x: 600, y: 200 }] }, properties: { count: 2 } },
      { id: 'obstacles_orange', type: 'obstacle_set', initialState: { positions: [{ x: 880, y: 520 }, { x: 680, y: 520 }] }, properties: { count: 2 } }
    ],
    rules: [
      'Control both characters with WASD / Arrow keys',
      'Press UP: Both move up (same direction)',
      'Press LEFT: Blue moves left, Orange moves right (mirrored)',
      'Avoid obstacles on both sides',
      'Both characters must reach their destinations'
    ],
    controls: {
      input: ['WASD', 'Arrow Keys'],
      actions: ['Move both characters simultaneously'],
      instructions: 'Think symmetrically! Your input controls BOTH characters in mirror fashion.'
    },
    victoryCriteria: {
      type: 'dual_destination_reached',
      conditions: [
        'Blue character at blue destination',
        'Orange character at orange destination'
      ],
      checkFunction: 'checkBothDestinationsReached'
    }
  },

  solution: {
    steps: [
      'Blue starts at (200, 200), needs to reach (800, 200)',
      'Orange starts at (1080, 520), needs to reach (480, 520)',
      'Move right (Blue →, Orange ←) avoiding obstacles',
      'Coordinate movements so both avoid their respective obstacles',
      'Both arrive at destinations simultaneously'
    ],
    acceptableVariations: [
      'Any path that avoids obstacles and reaches both destinations'
    ],
    optimalMoves: 12 // Approximate
  },

  hints: [
    'When you press RIGHT, blue goes right and orange goes left.',
    'Plan moves that work for BOTH characters simultaneously.',
    'If one character has an obstacle, find a move that helps both.',
    'This is the essence of two-pointer thinking!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 20
  },

  conceptBridge: {
    id: 'CB_TR1',
    puzzleId: 'TR1',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You controlled two entities at once, moving them in coordinated fashion.',
          'Each input affected both positions - you had to think about two states simultaneously.',
          'This required planning moves that worked for BOTH pointers, not just one.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Two Pointers',
        content: [
          'The TWO POINTERS pattern uses multiple position trackers in data structures.',
          'Instead of one loop through data, you track two (or more) positions simultaneously.',
          'This enables efficient solutions to problems involving pairs, subarrays, or comparisons.',
          'Classic use case: checking if a string is a palindrome (left pointer, right pointer, meet in middle).'
        ]
      },
      {
        type: 'pseudocode',
        title: 'Two Pointer Example: Palindrome Check',
        content: 'Here\'s how two pointers work in code:',
        code: {
          language: 'pseudocode',
          code: `function isPalindrome(string):
    left = 0
    right = string.length - 1

    while left < right:
        if string[left] != string[right]:
            return false  // Not a palindrome

        left++   // Move left pointer forward
        right--  // Move right pointer backward

    return true  // All characters matched!

// Example: "racecar"
// left=0 (r), right=6 (r) → match, move inward
// left=1 (a), right=5 (a) → match, move inward
// left=2 (c), right=4 (c) → match, move inward
// left=3 (e), right=3 (e) → left == right, done!
// Result: true (is palindrome)

// Time: O(n) | Space: O(1)`,
          explanation: 'Two pointers let you process data from multiple positions efficiently, often avoiding nested loops!'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Two Pointers Pattern"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your two-pointer understanding',
      challenge: 'Using two pointers (left and right), how many comparisons are needed to verify a 10-character string is a palindrome?',
      correctAnswer: 5,
      feedback: {
        correct: 'Perfect! With 10 characters, you compare 5 pairs before pointers meet in the middle. Much better than nested loops!',
        incorrect: 'Think: left and right start at opposite ends and meet in the middle. For n=10, you need n/2 = 5 comparisons.'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_TWO_POINTERS',
    algorithmName: 'Two Pointers Pattern',
    category: AlgorithmType.TWO_POINTERS,
    unlockedBy: 'TR1',
    difficulty: Difficulty.EASY,
    relatedConcepts: ['pointers', 'palindromes', 'pair_finding', 'subarray_problems'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You had to think about two positions at once. Each move affected both, forcing you to consider multiple perspectives simultaneously. It felt like coordinating two dancers.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'TWO POINTERS: Maintain two position markers in a data structure, usually moving them based on conditions.',
          'Common patterns:',
          '• OPPOSITE ENDS: Start at beginning and end, move inward (palindromes, pair sums)',
          '• SAME DIRECTION: Both move forward at different speeds (fast/slow pointers for cycle detection)',
          '• SLIDING WINDOW: Two pointers define a range that expands/contracts',
          'Benefit: Often reduces O(n²) nested loops to O(n) single pass!',
          'This pattern is fundamental for array/string manipulation.'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Pattern (Convergent)',
        content: [
          '1. INITIALIZE two pointers (usually left=0, right=n-1)',
          '2. WHILE pointers haven\'t crossed:',
          '   a. CHECK condition at both pointers',
          '   b. MAKE DECISION based on condition',
          '   c. MOVE one or both pointers',
          '3. RETURN result when pointers meet/cross'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Palindrome verification (compare from both ends)',
          '• Two Sum in sorted array (left + right pointers)',
          '• Container with most water (maximize area between lines)',
          '• Removing duplicates from sorted array',
          '• Reversing an array/string in-place',
          '• Partitioning arrays (Quick Sort uses this!)',
          '• Finding pairs with specific properties'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You can think in terms of multiple positions simultaneously. You recognize when processing from both ends is more efficient than linear traversal. This unlocks a whole class of O(n) solutions!'
      }
    ]
  }
};

// =============================================================================
// TR2: MEETING POINT (Pointer Convergence)
// =============================================================================

export const TR2_MeetingPoint: PuzzleConfig = {
  id: 'TR2',
  name: 'meeting_point',
  displayName: 'Meeting Point',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.MEDIUM,
  algorithmConcept: AlgorithmType.POINTER_CONVERGENCE,
  description: 'Two pointers start at opposite ends of a sequence. Move them toward each other based on value comparisons, finding pairs that sum to a target.',
  location: 'Twin Rivers - Convergence Point (Center)',
  npcId: 'convergence_monk',

  mechanics: {
    type: 'convergent_pointer_search',
    elements: [
      { id: 'sorted_array', type: 'number_sequence', initialState: { values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19] }, properties: { sorted: true } },
      { id: 'left_pointer', type: 'pointer', initialState: { index: 0 }, properties: { color: 'blue' } },
      { id: 'right_pointer', type: 'pointer', initialState: { index: 9 }, properties: { color: 'orange' } },
      { id: 'target_display', type: 'sign', initialState: { value: 20 }, properties: { target: 20 } }
    ],
    rules: [
      'Array is sorted: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]',
      'Target sum: 20',
      'Two pointers start at opposite ends',
      'If sum < target: move left pointer right (increase sum)',
      'If sum > target: move right pointer left (decrease sum)',
      'If sum == target: FOUND THE PAIR!',
      'This is the classic "Two Sum in Sorted Array" algorithm'
    ],
    controls: {
      input: ['Left Arrow', 'Right Arrow'],
      actions: ['Move left pointer right', 'Move right pointer left'],
      instructions: 'Use convergent logic: compare sum to target, move appropriate pointer'
    },
    victoryCriteria: {
      type: 'target_sum_found',
      conditions: [
        'Left pointer + right pointer values = target',
        'Pointers have not crossed'
      ],
      checkFunction: 'checkTwoSumConvergence'
    }
  },

  solution: {
    steps: [
      'Array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], Target: 20',
      'L=0, R=9: 1+19=20 ✓ FOUND! (First try!)',
      'Alternative targets would require more moves:',
      'Target 24: L=0,R=9 (1+19=20<24), L++, L=1,R=9 (3+19=22<24), L++, L=2,R=9 (5+19=24) ✓'
    ],
    acceptableVariations: [
      'Any valid pair that sums to target'
    ],
    optimalMoves: 1 // For target 20
  },

  hints: [
    'The array is SORTED - this is key!',
    'If current sum is too small, you need a bigger number (move left pointer right).',
    'If current sum is too big, you need a smaller number (move right pointer left).',
    'This converges to the answer in O(n) time!',
    'Compare this to brute force O(n²) checking all pairs!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 25
  },

  conceptBridge: {
    id: 'CB_TR2',
    puzzleId: 'TR2',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You moved two pointers toward each other from opposite ends.',
          'You made decisions based on COMPARING current values to a target.',
          'The sorted nature of the data let you make smart moves, eliminating possibilities efficiently.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Two Sum in Sorted Array',
        content: [
          'This is a classic optimization of the Two Sum problem.',
          'In unsorted arrays: use hash set (O(n) time, O(n) space)',
          'In SORTED arrays: use two pointers (O(n) time, O(1) space!)',
          'The sorted property lets you make directed moves - pure elegance.',
          'This pattern extends to many "find pair with property" problems.'
        ]
      },
      {
        type: 'pseudocode',
        title: 'Two Sum - Sorted Array with Two Pointers',
        content: 'Here\'s the algorithm:',
        code: {
          language: 'pseudocode',
          code: `function twoSumSorted(array, target):
    left = 0
    right = array.length - 1

    while left < right:
        sum = array[left] + array[right]

        if sum == target:
            return [left, right]  // Found the pair!

        else if sum < target:
            left++  // Need larger sum, move left pointer right

        else:  // sum > target
            right--  // Need smaller sum, move right pointer left

    return null  // No pair found

// Example: array = [1, 3, 5, 7, 9], target = 12
// L=0, R=4: 1+9=10 < 12 → L++
// L=1, R=4: 3+9=12 == 12 → FOUND [1, 4]
//
// Only 2 iterations! Brute force would check 10 pairs.
// Time: O(n) | Space: O(1)`,
          explanation: 'By using sorted property and two pointers, we eliminate the need for nested loops or hash sets!'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Pointer Convergence & Two Sum Optimization"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your convergence understanding',
      challenge: 'In the worst case, how many steps does two-pointer convergence take for an array of 100 elements?',
      correctAnswer: 99,
      feedback: {
        correct: 'Exactly! Each iteration moves at least one pointer by 1. With 100 elements, max 99 moves before pointers meet. O(n)!',
        incorrect: 'Think: pointers start at opposite ends (0 and 99). Each move closes the gap by at least 1. Maximum = n-1 moves.'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_POINTER_CONVERGENCE',
    algorithmName: 'Pointer Convergence & Sorted Array Optimization',
    category: AlgorithmType.POINTER_CONVERGENCE,
    unlockedBy: 'TR2',
    difficulty: Difficulty.MEDIUM,
    relatedConcepts: ['two_pointers', 'sorted_arrays', 'two_sum_optimization', 'O(1)_space'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'Each decision narrowed the search space. Moving pointers felt purposeful - no wasted effort. The sorted data gave you perfect information for each choice.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'POINTER CONVERGENCE: Two pointers move toward each other, making decisions based on comparisons.',
          'Works best when data is SORTED or has some property that guides pointer movement.',
          'Each iteration eliminates possibilities, converging on the solution.',
          'Benefits:',
          '• O(n) time instead of O(n²)',
          '• O(1) space instead of O(n) hash sets',
          '• Simple, elegant logic',
          'This is the "grown-up" version of Two Sum for sorted data!'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Algorithm',
        content: [
          '1. ENSURE array is sorted (sort if needed)',
          '2. INITIALIZE left = 0, right = n - 1',
          '3. WHILE left < right:',
          '   a. CALCULATE value based on pointers (e.g., sum)',
          '   b. COMPARE to target:',
          '      - Match found → return result',
          '      - Too small → left++ (need bigger)',
          '      - Too large → right-- (need smaller)',
          '4. RETURN result or null if not found'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Two Sum in sorted array (what you just did!)',
          '• Three Sum problem (extends this pattern)',
          '• Container with most water (maximize area)',
          '• Trapping rain water',
          '• Removing duplicates from sorted array',
          '• Merge sorted arrays',
          '• Finding closest pair to a value'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You understand how sorted data enables O(1) space solutions via pointer convergence. You can optimize problems by sorting first, then using two pointers instead of hash sets.'
      }
    ]
  }
};

// =============================================================================
// TR3: SLIDING WINDOW CATCH (Sliding Window)
// =============================================================================

export const TR3_SlidingWindowCatch: PuzzleConfig = {
  id: 'TR3',
  name: 'sliding_window_catch',
  displayName: 'Sliding Window Catch',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.MEDIUM,
  algorithmConcept: AlgorithmType.SLIDING_WINDOW,
  description: 'Use an adjustable window (two pointers defining a range) to capture patterns. Expand to include more elements, shrink when constraints are violated. Find the optimal window.',
  location: 'Twin Rivers - Orange River Bank (East)',
  npcId: 'window_weaver',

  mechanics: {
    type: 'dynamic_window',
    elements: [
      { id: 'number_stream', type: 'scrolling_array', initialState: { values: [2, 1, 5, 1, 3, 2, 4, 1, 2, 3] }, properties: { length: 10 } },
      { id: 'window_left', type: 'pointer', initialState: { index: 0 }, properties: { color: 'blue', role: 'window_start' } },
      { id: 'window_right', type: 'pointer', initialState: { index: 0 }, properties: { color: 'orange', role: 'window_end' } },
      { id: 'target_sum', type: 'sign', initialState: { value: 8 }, properties: { target: 8, type: 'minimum_sum' } }
    ],
    rules: [
      'Array: [2, 1, 5, 1, 3, 2, 4, 1, 2, 3]',
      'Find SMALLEST subarray (contiguous) with sum ≥ 8',
      'EXPAND window (right++): Add elements until sum ≥ target',
      'SHRINK window (left++): Remove elements while maintaining sum ≥ target',
      'Track minimum window size encountered',
      'This is the "Minimum Window Substring" pattern variant'
    ],
    controls: {
      input: ['Right Arrow (expand)', 'Left Arrow (shrink)'],
      actions: ['Expand window by moving right pointer', 'Shrink window by moving left pointer'],
      instructions: 'Find the smallest window with sum ≥ 8. Expand to reach target, shrink to minimize size!'
    },
    victoryCriteria: {
      type: 'optimal_window_found',
      conditions: [
        'Window sum ≥ target',
        'Window size is minimal (cannot shrink further without violating constraint)'
      ],
      checkFunction: 'checkMinimalWindow'
    }
  },

  solution: {
    steps: [
      'Array: [2, 1, 5, 1, 3, 2, 4, 1, 2, 3], Target sum: ≥ 8',
      'L=0, R=0: sum=2 < 8 → expand',
      'L=0, R=1: sum=3 < 8 → expand',
      'L=0, R=2: sum=8 ≥ 8 ✓ window size=3, try shrinking',
      'L=1, R=2: sum=6 < 8 ✗ too small, expand',
      'L=1, R=3: sum=7 < 8 → expand',
      'L=1, R=4: sum=10 ≥ 8 ✓ window size=4',
      'Continue sliding... minimum window found: [5] at index 2 (size=1) with sum=5? No, need ≥8.',
      'Actually minimum: [5, 1, 3] = 9 (size 3) or [5, 3] = 8 (size 2)',
      'Wait, need contiguous. Let me recalculate: [2,1,5]=8 (size 3), [5,3]=8 (size 2) is NOT contiguous!',
      'Correct answer: Subarray [5, 3] at indices [2,4] = 8, size = 2'
    ],
    acceptableVariations: [
      'Any minimal subarray with sum ≥ target'
    ],
    optimalMoves: 15 // Approximate slide operations
  },

  hints: [
    'EXPAND (right++) when sum < target (need more elements).',
    'SHRINK (left++) when sum ≥ target (try to minimize).',
    'Track the minimum window size that satisfies the condition.',
    'Keep expanding and shrinking - the window "slides" across the array!',
    'This technique solves many "find optimal subarray" problems in O(n)!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 30
  },

  conceptBridge: {
    id: 'CB_TR3',
    puzzleId: 'TR3',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You used two pointers to define a dynamic range - a "window".',
          'You expanded the window when you needed more data.',
          'You shrank the window when you could maintain constraints with less.',
          'The window "slid" across the data, always maintaining valid state.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Pattern: Sliding Window',
        content: [
          'SLIDING WINDOW: Two pointers define a subarray/substring. Expand/shrink based on conditions.',
          'This pattern is incredibly powerful for:',
          '• Subarrays with specific sum/product',
          '• Substrings with character constraints',
          '• Maximum/minimum sized windows',
          '• Fixed-size windows (simpler variant)',
          'Time complexity: O(n) - each element visited at most twice (once by right, once by left)',
          'Compare to brute force: O(n²) or O(n³) checking all subarrays!'
        ]
      },
      {
        type: 'pseudocode',
        title: 'Sliding Window Template',
        content: 'Here\'s the general pattern:',
        code: {
          language: 'pseudocode',
          code: `function slidingWindow(array, constraint):
    left = 0
    right = 0
    windowState = {} // Track sum, frequency, etc.
    bestResult = infinity or 0 (depending on min/max problem)

    while right < array.length:
        // EXPAND: Add array[right] to window
        updateWindowState(array[right])
        right++

        // SHRINK: While window violates OR can be optimized
        while shouldShrink(windowState, constraint):
            updateBestResult(windowState)
            removeFromWindow(array[left])
            left++

        // UPDATE best result if current window is better
        updateBestResult(windowState)

    return bestResult

// Example: Minimum subarray sum ≥ target
// windowState tracks current sum
// Expand until sum ≥ target
// Shrink while sum ≥ target (minimize)
// Track minimum window size`,
          explanation: 'The window expands and contracts, maintaining state, finding optimal subarrays in linear time!'
        }
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Sliding Window Technique"'
      }
    ],
    miniForge: {
      title: 'Mini-Forge Challenge',
      description: 'Test your sliding window knowledge',
      challenge: 'What is the time complexity of sliding window for processing an array of n elements?',
      correctAnswer: 'O(n)',
      feedback: {
        correct: 'Perfect! Even though we have nested loops, each element is visited at most twice (once by right, once by left). Total: O(n)!',
        incorrect: 'Hint: It looks like O(n²) with nested loops, but each element enters the window once (right) and leaves once (left). That\'s O(n)!'
      }
    }
  },

  codexEntry: {
    id: 'CODEX_SLIDING_WINDOW',
    algorithmName: 'Sliding Window Technique',
    category: AlgorithmType.SLIDING_WINDOW,
    unlockedBy: 'TR3',
    difficulty: Difficulty.MEDIUM,
    relatedConcepts: ['two_pointers', 'subarray_problems', 'dynamic_range', 'optimization'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You controlled a flexible range that grew and shrank dynamically. It felt like focusing a camera lens - adjusting the frame to capture exactly what you need.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'SLIDING WINDOW: Maintain a subarray/substring using two pointers (left and right boundaries).',
          'The window "slides" by moving pointers based on conditions.',
          'Variants:',
          '• FIXED SIZE: Window size constant, just slide across (simpler)',
          '• DYNAMIC SIZE: Window expands/shrinks based on constraints (more complex)',
          'State tracking: Usually maintain sum, frequency map, or other aggregates of window contents.',
          'Efficiency: O(n) time - each element processed at most twice.',
          'This transforms brute force O(n²) or O(n³) solutions to O(n)!'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Algorithm (Dynamic Window)',
        content: [
          '1. INITIALIZE left = 0, right = 0, windowState',
          '2. WHILE right < array.length:',
          '   a. EXPAND: Add array[right] to window, update state',
          '   b. WHILE window invalid OR can be optimized:',
          '      - SHRINK: Remove array[left], update state, left++',
          '   c. UPDATE best result based on current window',
          '   d. right++',
          '3. RETURN best result'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Longest substring without repeating characters',
          '• Maximum sum subarray of size k',
          '• Minimum window substring containing all characters',
          '• Longest substring with at most k distinct characters',
          '• Subarray product less than k',
          '• Anagrams in a string (sliding window with frequency map)',
          '• DNA sequence analysis',
          '• Network packet analysis (time windows)'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You can solve complex subarray/substring optimization problems in O(n) time. You understand how to maintain window state and make expand/shrink decisions. This is a game-changer for string and array problems!'
      }
    ]
  }
};

// =============================================================================
// TR4: BREAKING THE CURRENTS (Advanced Pointer Logic)
// =============================================================================

export const TR4_BreakingTheCurrents: PuzzleConfig = {
  id: 'TR4',
  name: 'breaking_the_currents',
  displayName: 'Breaking the Currents',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.HARD,
  algorithmConcept: AlgorithmType.ADVANCED_POINTERS,
  description: 'Combine all pointer techniques while external forces (currents) push pointers off course. Maintain symmetry, convergence, and window control under pressure.',
  location: 'Twin Rivers - Turbulent Junction (South)',
  npcId: 'current_keeper',

  mechanics: {
    type: 'advanced_multi_pointer',
    elements: [
      { id: 'challenge_array', type: 'complex_sequence', initialState: { values: Array.from({length: 20}, (_, i) => i * 2) }, properties: { length: 20 } },
      { id: 'pointers', type: 'pointer_set', initialState: { count: 3 }, properties: { affected_by_currents: true } },
      { id: 'currents', type: 'external_force', initialState: { active: true }, properties: { push_strength: 'random', frequency: 'high' } }
    ],
    rules: [
      'Combine all pointer techniques learned:',
      '• Maintain two-pointer symmetry despite currents',
      '• Use sliding window to capture target subarrays',
      '• Handle convergence logic under interference',
      'Currents randomly push pointers by ±1 index',
      'You must compensate and maintain correct logic',
      'Complete 3 challenges using different pointer patterns'
    ],
    controls: {
      input: ['WASD', 'Arrow Keys', 'Number Keys'],
      actions: ['Adjust pointer positions', 'Compensate for currents'],
      instructions: 'Apply pointer logic while external forces interfere. Adapt your strategy!'
    },
    victoryCriteria: {
      type: 'all_challenges_complete',
      conditions: [
        'Complete symmetry challenge under currents',
        'Complete convergence challenge under currents',
        'Complete sliding window challenge under currents'
      ],
      checkFunction: 'checkAdvancedPointerMastery'
    }
  },

  solution: {
    steps: [
      'Challenge 1: Maintain mirror symmetry despite random current pushes',
      'Challenge 2: Converge to target pair while currents interfere',
      'Challenge 3: Find optimal window while currents shift boundaries',
      'Strategy: Predict current effects, compensate proactively, maintain pattern invariants'
    ]
  },

  hints: [
    'Currents are random but you can react quickly.',
    'Focus on maintaining the LOGIC of each pattern, not exact positions.',
    'If a current pushes a pointer, immediately correct it.',
    'Stay calm - you know these patterns. The currents are just noise.',
    'This simulates real-world constraints in concurrent programming!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 40,
    unlocks: ['BOSS_MIRROR_SERPENT']
  },

  conceptBridge: {
    id: 'CB_TR4',
    puzzleId: 'TR4',
    sections: [
      {
        type: 'story_recap',
        title: 'What You Just Did',
        content: [
          'You applied pointer patterns under adverse conditions.',
          'External forces disrupted your pointers, but you adapted.',
          'You maintained algorithmic logic despite environmental chaos.',
          'This represents real-world programming: handling race conditions, concurrency, unexpected state changes.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'The Lesson: Robust Pointer Logic',
        content: [
          'Real systems aren\'t perfect:',
          '• Race conditions in concurrent code',
          '• Unexpected mutations of shared state',
          '• External interrupts and timing issues',
          'Robust algorithms maintain INVARIANTS - conditions that must always be true.',
          'Even when external factors interfere, you restore invariants and continue.',
          'This is defensive programming + algorithmic thinking combined!'
        ]
      },
      {
        type: 'unlock',
        title: 'Codex Updated!',
        content: 'New entry unlocked: "Advanced Pointer Techniques & Robustness"'
      }
    ]
  },

  codexEntry: {
    id: 'CODEX_ADVANCED_POINTERS',
    algorithmName: 'Advanced Pointer Techniques',
    category: AlgorithmType.ADVANCED_POINTERS,
    unlockedBy: 'TR4',
    difficulty: Difficulty.HARD,
    relatedConcepts: ['pointer_patterns', 'robustness', 'invariants', 'concurrent_programming'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'Chaos tried to break your logic, but you held firm. Each disruption was met with correction. You proved that understanding the pattern is more important than perfect conditions.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'ADVANCED POINTER TECHNIQUES combine multiple patterns and handle edge cases.',
          'Key principles:',
          '• INVARIANT MAINTENANCE: Always restore critical conditions',
          '• PATTERN COMPOSITION: Combine two-pointer, sliding window, etc.',
          '• ROBUSTNESS: Handle unexpected state changes',
          '• BOUNDARY HANDLING: Careful with indices 0 and n-1',
          'In production code, you must handle race conditions, concurrent modifications, and edge cases.',
          'Pure algorithmic knowledge isn\'t enough - you need defensive implementation!'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'Building Robust Pointer Code',
        content: [
          '1. DEFINE INVARIANTS: What must always be true?',
          '2. INITIALIZE CAREFULLY: Set up correct initial state',
          '3. MAINTAIN INVARIANTS: After each operation, verify/restore invariants',
          '4. HANDLE EDGE CASES: Empty arrays, single elements, boundaries',
          '5. PROTECT AGAINST MUTATIONS: Defensive copies, locks, or validation',
          '6. TEST THOROUGHLY: Normal cases, edge cases, adversarial cases'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          '• Concurrent data structure updates (locks, atomic operations)',
          '• Stream processing with backpressure',
          '• Real-time systems with timing constraints',
          '• Database transaction isolation',
          '• Network protocol implementations',
          '• Game physics updates with collision detection'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You can implement pointer-based algorithms that handle real-world messiness. You understand invariants and robustness. You\'re ready for production-grade code!'
      }
    ]
  }
};

// =============================================================================
// BOSS: MIRROR SERPENT (Multi-Phase - All Pointer Patterns)
// =============================================================================

export const BOSS_MirrorSerpent: BossConfig = {
  id: 'BOSS_MIRROR_SERPENT',
  name: 'mirror_serpent',
  displayName: 'Mirror Serpent',
  type: PuzzleType.BOSS,
  difficulty: Difficulty.VERY_HARD,
  algorithmConcept: AlgorithmType.HYBRID,
  description: 'The guardian of Twin Rivers tests all pointer techniques in a flowing, dynamic battle. Adapt to each phase, maintain precision under pressure.',
  location: 'Twin Rivers - Serpent\'s Lair (Far East)',
  npcId: 'mirror_walker',
  healthBarVisible: true,

  phases: [
    {
      phaseNumber: 1,
      name: 'Symmetry Dance',
      mechanics: {
        type: 'advanced_mirroring',
        elements: [
          { id: 'phase1_field', type: 'symmetric_arena', initialState: { mirrored: true }, properties: { obstacles: 12, time_limit: 60 } }
        ],
        rules: [
          'Control two serpent heads in perfect mirror symmetry',
          'Navigate both through obstacle maze',
          'Collect 8 symmetry orbs (4 on each side)',
          'Breaking symmetry damages you',
          'Time limit: 60 seconds'
        ],
        controls: {
          input: ['WASD'],
          actions: ['Mirror-move both heads'],
          instructions: 'Perfect symmetry! Think two-pointer!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['All 8 orbs collected', 'Symmetry maintained'],
          checkFunction: 'checkPhase1Complete'
        }
      },
      timeLimit: 60,
      difficulty: Difficulty.MEDIUM
    },
    {
      phaseNumber: 2,
      name: 'Convergence Strike',
      mechanics: {
        type: 'rapid_convergence',
        elements: [
          { id: 'phase2_targets', type: 'target_pairs', initialState: { count: 10 }, properties: { time_per_target: 5 } }
        ],
        rules: [
          '10 target pairs appear in sequence',
          'Use pointer convergence to find matching pairs',
          'Each pair has 5 seconds',
          'Fast decision-making required',
          'Miss 3 targets = phase failure'
        ],
        controls: {
          input: ['Left/Right Arrows'],
          actions: ['Converge pointers to find pairs'],
          instructions: 'Quick convergence! Apply the algorithm!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['At least 7 of 10 targets found'],
          checkFunction: 'checkPhase2Complete'
        }
      },
      timeLimit: 50,
      difficulty: Difficulty.HARD
    },
    {
      phaseNumber: 3,
      name: 'Window Storm',
      mechanics: {
        type: 'extreme_sliding_window',
        elements: [
          { id: 'phase3_stream', type: 'fast_data_stream', initialState: { speed: 'increasing' }, properties: { targets: 5 } }
        ],
        rules: [
          'Data streams rapidly across screen',
          'Use sliding window to capture 5 target patterns',
          'Speed increases with each successful capture',
          'Window constraints change dynamically',
          'Perfect window sizing required'
        ],
        controls: {
          input: ['Arrow Keys'],
          actions: ['Expand/shrink window dynamically'],
          instructions: 'Master the window! Adapt quickly!'
        },
        victoryCriteria: {
          type: 'phase_completion',
          conditions: ['All 5 patterns captured'],
          checkFunction: 'checkPhase3Complete'
        }
      },
      timeLimit: 75,
      difficulty: Difficulty.HARD
    },
    {
      phaseNumber: 4,
      name: 'Chaos Flow',
      mechanics: {
        type: 'ultimate_pointer_challenge',
        elements: [
          { id: 'phase4_chaos', type: 'combined_chaos', initialState: { intensity: 'maximum' }, properties: { all_patterns: true } }
        ],
        rules: [
          'ALL pointer patterns active simultaneously',
          'Serpent attacks with pattern-disrupting moves',
          'Must execute: symmetry + convergence + window',
          'Rapid switching between techniques',
          'One mistake cascades - precision crucial',
          'Defeat the Serpent to master Twin Rivers!'
        ],
        controls: {
          input: ['All controls'],
          actions: ['Apply all pointer techniques'],
          instructions: 'EVERYTHING AT ONCE! Show your mastery!'
        },
        victoryCriteria: {
          type: 'boss_defeat',
          conditions: ['Survive chaos phase', 'Execute all patterns correctly', 'Serpent health = 0'],
          checkFunction: 'checkBossDefeated'
        }
      },
      timeLimit: 90,
      difficulty: Difficulty.VERY_HARD
    }
  ],

  mechanics: {
    type: 'multi_phase_boss',
    elements: [],
    rules: [
      'Defeat all 4 phases',
      'Each phase tests different pointer mastery',
      'No health regeneration between phases',
      'Serpent becomes more aggressive each phase'
    ],
    controls: {
      input: ['Phase-specific'],
      actions: ['Phase-specific'],
      instructions: 'Prove pointer mastery!'
    },
    victoryCriteria: {
      type: 'all_phases_complete',
      conditions: ['Phase 1-4 all complete'],
      checkFunction: 'checkAllPhasesComplete'
    }
  },

  solution: {
    steps: [
      'Phase 1: Stay calm, maintain symmetry, collect orbs methodically',
      'Phase 2: Quick convergence, trust the algorithm, don\'t overthink',
      'Phase 3: Smooth window adjustments, predict pattern changes',
      'Phase 4: Rapid technique switching, stay focused, execute flawlessly'
    ]
  },

  hints: [
    'Phase 1: Symmetry is EVERYTHING. Plan moves that work for both sides.',
    'Phase 2: You\'ve done this before. Trust convergence logic.',
    'Phase 3: Don\'t panic when speed increases. Window logic is the same.',
    'Phase 4: Breathe. You know all these patterns. Just execute.',
    'Overall: You\'ve mastered each technique individually. Now combine them!'
  ],

  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 150
  },

  defeatDialogue: [
    'The Mirror Serpent calms, its chaotic thrashing ceasing.',
    'The rivers flow in perfect harmony once more.',
    'You have proven your mastery of pointer techniques - the foundation of advanced algorithms.',
    'Beyond Twin Rivers lie even greater challenges. But you are ready.'
  ],

  victoryRewards: {
    codexEntries: ['CODEX_TWO_POINTERS', 'CODEX_POINTER_CONVERGENCE', 'CODEX_SLIDING_WINDOW', 'CODEX_ADVANCED_POINTERS'],
    unlockedRegions: ['graphgrove'],
    progressionPoints: 150,
    specialItems: ['twin_rivers_mastery_badge', 'serpent_scale', 'pointer_mastery_gem']
  },

  conceptBridge: {
    id: 'CB_BOSS_MIRROR_SERPENT',
    puzzleId: 'BOSS_MIRROR_SERPENT',
    sections: [
      {
        type: 'story_recap',
        title: 'Triumph Over Chaos',
        content: [
          'You faced the Mirror Serpent and emerged victorious.',
          'Under extreme pressure, you applied all pointer patterns flawlessly.',
          'Symmetry, convergence, sliding windows, robustness - all mastered.',
          'The flowing rivers now recognize you as a master of traversal.'
        ]
      },
      {
        type: 'pattern_reveal',
        title: 'Pointer Mastery Achieved',
        content: [
          'You now command the four pointer patterns:',
          '1. TWO POINTERS - Simultaneous position tracking',
          '2. CONVERGENCE - Moving from ends toward center',
          '3. SLIDING WINDOW - Dynamic range optimization',
          '4. ADVANCED TECHNIQUES - Robustness and composition',
          '',
          'These patterns, combined with your array knowledge, make you a formidable problem solver.',
          'Most interview questions and real-world algorithms use these techniques.'
        ]
      },
      {
        type: 'unlock',
        title: 'The Path Continues',
        content: [
          'Twin Rivers has refined your traversal skills.',
          'But data structures grow more complex beyond here.',
          'Graph Grove awaits - where connections and relationships form intricate webs.',
          'Your journey through the Path of Logic continues...'
        ]
      }
    ]
  },

  codexEntry: {
    id: 'CODEX_POINTER_MASTERY',
    algorithmName: 'Pointer Mastery - The Four Flows',
    category: AlgorithmType.HYBRID,
    unlockedBy: 'BOSS_MIRROR_SERPENT',
    difficulty: Difficulty.VERY_HARD,
    relatedConcepts: ['two_pointers', 'sliding_window', 'convergence', 'advanced_algorithms', 'pattern_composition'],
    sections: [
      {
        type: 'what_you_felt',
        title: 'What You Felt',
        content: 'You moved with the flow of the data. Pointers danced under your command. Each pattern felt natural, intuitive. Chaos couldn\'t break your understanding.'
      },
      {
        type: 'plain_explanation',
        title: 'The Concept',
        content: [
          'POINTER MASTERY combines four fundamental traversal patterns:',
          '1. TWO POINTERS: Multiple position trackers, often from opposite ends',
          '2. CONVERGENCE: Pointers move toward each other guided by comparisons',
          '3. SLIDING WINDOW: Dynamic range that expands/shrinks based on constraints',
          '4. ADVANCED: Composition of patterns, robustness, edge case handling',
          '',
          'These patterns solve 70%+ of array/string algorithm problems.',
          'Combined with sorting, hashing, and indexing, you can tackle most data structure challenges.',
          'You\'ve transcended memorizing solutions - you UNDERSTAND the patterns.'
        ]
      },
      {
        type: 'pattern_steps',
        title: 'The Pointer Mastery Framework',
        content: [
          '1. RECOGNIZE the problem type:',
          '   - Pairs/comparisons? → Two pointers',
          '   - Sorted data + search? → Convergence',
          '   - Optimal subarray/substring? → Sliding window',
          '   - Complex constraints? → Advanced composition',
          '2. SELECT the appropriate pattern',
          '3. IMPLEMENT with proper invariants',
          '4. HANDLE edge cases and boundaries',
          '5. OPTIMIZE if needed (early termination, space reduction)'
        ]
      },
      {
        type: 'real_world',
        title: 'Where You\'ll See This',
        content: [
          'TWO POINTERS: Palindromes, reversing, removing duplicates',
          'CONVERGENCE: Pair sums, container problems, partitioning',
          'SLIDING WINDOW: Substring problems, max/min subarrays, anagrams',
          'ADVANCED: Stream processing, real-time analytics, concurrent systems',
          'COMBINED: Almost every complex data processing problem!'
        ]
      },
      {
        type: 'unlocked_ability',
        title: 'What You Can Do Now',
        content: 'You are a pointer master. You can recognize patterns, compose techniques, and solve complex problems efficiently. Arrays, strings, streams - you command them all. The foundations are complete. Advanced data structures await!'
      }
    ]
  }
};

// Export all puzzles
export const twinRiversPuzzles: (PuzzleConfig | BossConfig)[] = [
  TR1_MirrorWalk,
  TR2_MeetingPoint,
  TR3_SlidingWindowCatch,
  TR4_BreakingTheCurrents,
  BOSS_MirrorSerpent
];
