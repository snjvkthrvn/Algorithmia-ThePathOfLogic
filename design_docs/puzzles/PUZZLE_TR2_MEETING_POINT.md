# PUZZLE TR-2: MEETING POINT

> *"Start apart. Move together. Meet in the middle."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | TR-2 |
| **Name** | Meeting Point |
| **Region** | Twin Rivers |
| **Difficulty** | ★★☆☆☆ |
| **Time Limit** | None |
| **Concept Taught** | Two Pointers Convergence, Sorted Array Two Sum |

### Core Mechanic
A horizontal path with numbered stepping stones. Two pointer markers—Blue (left) and Orange (right)—start at opposite ends. Player moves them toward each other to find a pair that sums to the target.

### Why This Puzzle Clicks
- **Physical Convergence**: Pointers literally meet in the middle
- **Sorted Data**: Numbers increase left to right
- **Strategic Movement**: Logic determines which pointer moves
- **Classic Algorithm**: This IS the sorted Two Sum solution

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                          MEETING POINT ARENA                                   ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     🧘 CONVERGENCE MONK                                                        ║
║     "Find two numbers that sum to the target!"                                 ║
║                                                                                ║
║     ╔═══════════════════════════════════════════════════════════════════╗     ║
║     ║                     TARGET SUM: 20                                ║     ║
║     ╚═══════════════════════════════════════════════════════════════════╝     ║
║                                                                                ║
║     ┌─────────────────────────────────────────────────────────────────────┐   ║
║     │                                                                     │   ║
║     │    ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈       │   ║
║     │                          (RIVER)                                    │   ║
║     │    ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈       │   ║
║     │                                                                     │   ║
║     │    [1] ─ [3] ─ [5] ─ [7] ─ [9] ─ [11] ─ [13] ─ [15] ─ [17] ─ [19]  │   ║
║     │     ▲                                                          ▲    │   ║
║     │     │                                                          │    │   ║
║     │    🔵                                                         🟠    │   ║
║     │   BLUE                                                      ORANGE  │   ║
║     │  POINTER                                                   POINTER  │   ║
║     │                                                                     │   ║
║     └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                                ║
║     CURRENT SUM: 1 + 19 = 20                                                  ║
║                                                                                ║
║     [←] Move Blue RIGHT        [→] Move Orange LEFT                          ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

#### Stone Values (Sorted!)
```
STEPPING STONES:

Index:    0    1    2    3    4    5    6    7    8    9
Value:   [1]  [3]  [5]  [7]  [9] [11] [13] [15] [17] [19]

          ↑                                             ↑
        BLUE                                        ORANGE
       (left)                                       (right)

The array is SORTED in ascending order.
This is crucial for the two-pointer technique!
```

### Convergence Rules
```
╔═══════════════════════════════════════════════════════════════╗
║              POINTER MOVEMENT RULES                           ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║   Current Sum = stones[blue] + stones[orange]                 ║
║                                                               ║
║   If sum < target:                                            ║
║     → Need BIGGER sum                                         ║
║     → Move BLUE pointer RIGHT (to larger number)              ║
║     → Press LEFT ARROW                                        ║
║                                                               ║
║   If sum > target:                                            ║
║     → Need SMALLER sum                                        ║
║     → Move ORANGE pointer LEFT (to smaller number)            ║
║     → Press RIGHT ARROW                                       ║
║                                                               ║
║   If sum = target:                                            ║
║     → FOUND IT! 🎉                                            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Multiple Targets (Replayability)
```
PUZZLE VARIANTS:

Default:  Target = 20, Answer: 1 + 19 = 20 (or 3 + 17, 7 + 13, 9 + 11)

Replay 1: Target = 12, Answer: 1 + 11 or 5 + 7
Replay 2: Target = 24, Answer: 5 + 19 or 7 + 17 or 11 + 13
Replay 3: Target = 30, Answer: 11 + 19 or 13 + 17

Multiple valid answers exist!
```

### Game Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PUZZLE TR-2 FLOW                                │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
               ┌────────────────────────────┐
               │   SHOW TARGET: 20          │
               │   Blue at [1], Orange at   │
               │   [19]                     │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   DISPLAY: 1 + 19 = 20     │
               │   "That's the target!"     │
               └───────────────┬────────────┘
                               │
                              YES → VICTORY!
                               │
                        (If starting pair
                         isn't the answer)
                               │
                               ▼
               ┌────────────────────────────┐
               │   PLAYER MOVES POINTER     │
               │   ← = Blue moves right     │
               │   → = Orange moves left    │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   RECALCULATE SUM          │
               │   Compare to target        │
               └───────────────┬────────────┘
                               │
              ┌────────────────┴────────────────┐
              │                │                │
              ▼                ▼                ▼
          SUM < TARGET    SUM = TARGET    SUM > TARGET
          ┌──────────┐    ┌──────────┐    ┌──────────┐
          │"Too small│    │ VICTORY! │    │"Too big! │
          │ Move blue│    │ Found    │    │Move orange
          │  right!" │    │ the pair!│    │  left!"  │
          └────┬─────┘    └──────────┘    └────┬─────┘
               │                               │
               └───────────────┬───────────────┘
                               │
                               ▼
                        Continue until
                        pointers meet or
                        target found
```

---

## 🎨 VISUAL STATES

### Pointer States

```
╔═══════════════════════════════════════════════════════════════╗
║                    POINTER VISUAL STATES                      ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  IDLE                 MOVING              AT TARGET           ║
║  ┌─────────┐          ┌─────────┐         ┌─────────┐        ║
║  │    ▼    │          │  → ▼    │         │    ⭐   │        ║
║  │   🔵    │          │   🔵    │         │   🔵    │        ║
║  │   [1]   │          │  [1]→[3]│         │   [9]   │        ║
║  └─────────┘          └─────────┘         └─────────┘        ║
║  Pointer above        Sliding anim        Golden glow         ║
║  stone, bobbing       to next stone       Particle burst      ║
║                                                               ║
║  SUM DISPLAY                                                  ║
║  ┌─────────────────────────────────────────────────────┐     ║
║  │                                                     │     ║
║  │    [1]  + [19] = 20     ← Live calculation         │     ║
║  │     ↑       ↑     ↑                                │     ║
║  │   Blue   Orange  Sum                               │     ║
║  │                                                     │     ║
║  │    "That equals the target!"  ✓                    │     ║
║  │    "Too small! Move blue right."                   │     ║
║  │    "Too big! Move orange left."                    │     ║
║  │                                                     │     ║
║  └─────────────────────────────────────────────────────┘     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Stepping Stones
```
STONE STATES:

NORMAL:
  ┌─────┐
  │  7  │   Gray stone, number visible
  └─────┘

BLUE POINTER HERE:
  ┌─────┐
  │  7  │   Blue glow, pulse animation
  └─────┘
    🔵

ORANGE POINTER HERE:
  ┌─────┐
  │  7  │   Orange glow, pulse animation
  └─────┘
    🟠

PART OF SOLUTION:
  ┌─────┐
  │  7  │   Gold glow, rising particles
  └─────┘
    ✨
```

### Light Trail Connection
```
POINTER RELATIONSHIP VISUAL:

When neither pointer has moved:
[1] ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ [19]
 🔵                                        🟠
      ←─── Distance indicator ───→

As they converge:
[1]─[3]─[5]─[7] ─ ─ ─ ─ ─ ─ [15]─[17]─[19]
             🔵               🟠
                  ↑↑↑
           Getting closer!
```

---

## 🔧 INTERACTION MECHANICS

### Controls
```
SIMPLIFIED CONTROLS:

LEFT ARROW (←):
  → Moves BLUE pointer RIGHT (toward larger numbers)
  → "Left arrow makes left pointer go right"

RIGHT ARROW (→):
  → Moves ORANGE pointer LEFT (toward smaller numbers)
  → "Right arrow makes right pointer go left"

Why this mapping?
- Left arrow: Think "adjust the left/blue one"
- Right arrow: Think "adjust the right/orange one"
- Both move toward center = CONVERGENCE
```

### Sum Calculation Display
```
LIVE SUM UI:

┌───────────────────────────────────────────────┐
│                                               │
│   stones[blue] + stones[orange] = sum         │
│                                               │
│       7      +      13        =  20           │
│       ↑             ↑            ↑            │
│   Blue value   Orange value   Result          │
│                                               │
│   [████████████████████████████] 20           │
│                  ↑                            │
│             TARGET: 20                        │
│                                               │
│   STATUS: "Perfect! That's the target!"       │
│                                               │
└───────────────────────────────────────────────┘
```

### Movement Feedback
```
MOVE FEEDBACK:

When Blue moves right (← pressed):
1. Arrow indicator appears: "→"
2. Blue pointer slides to next stone (300ms)
3. Sum recalculates
4. Status updates: "Now 3 + 19 = 22 (Too big!)"

When Orange moves left (→ pressed):
1. Arrow indicator appears: "←"
2. Orange pointer slides to next stone (300ms)
3. Sum recalculates
4. Status updates: "Now 3 + 17 = 20 (Target!)"
```

---

## 💡 HINT SYSTEM

### Progressive Hints
| Hint # | Content | Effect |
|--------|---------|--------|
| 1 | "If sum is too small, you need a bigger number. Blue goes to larger values." | Logic hint |
| 2 | "If sum is too big, you need a smaller number. Orange goes to smaller values." | Logic hint |
| 3 | "The answer involves 9 and 11. Move toward them!" | Direct guidance |

### Visual Guidance
```
HINT MODE:

When stuck, show directional guidance:

Sum = 8 (too small, target = 20)
[1]─[3]─[5]─[7]─[9]─[11]─[13]─[15]─[17]─[19]
 🔵               →→→                    🟠
 ↑
 "Move this one RIGHT to increase sum"
```

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(moves: number, optimalMoves: number): number {
  // For target 20 with array [1,3,5,7,9,11,13,15,17,19]:
  // Starting: 1 + 19 = 20 → 0 moves! (lucky)
  // Other paths require more moves
  
  if (moves <= optimalMoves) return 3;       // Optimal path
  if (moves <= optimalMoves + 2) return 2;   // Close to optimal
  return 1;                                   // Completed
}
```

### Move Tracking
```
OPTIMAL PATH EXAMPLE:

Target: 12
Array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

Start: 1 + 19 = 20 (too big)
Move 1: 1 + 17 = 18 (too big) - Orange left
Move 2: 1 + 15 = 16 (too big) - Orange left
Move 3: 1 + 13 = 14 (too big) - Orange left
Move 4: 1 + 11 = 12 ✓ FOUND!

Optimal: 4 moves
```

### Progression Points
- Completion: 25 points
- Optimal path: +12 points
- First-try find: +8 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Pointer move | Stone step | `pointer_move.wav` | 0.2s |
| Sum calculated | Thinking tone | `sum_calculate.wav` | 0.3s |
| Too small | Low tone | `sum_low.wav` | 0.2s |
| Too big | High tone | `sum_high.wav` | 0.2s |
| Target found! | Harmonic resolution | `target_found.wav` | 0.8s |

### Musical Feedback
```
SUM RESULT TONES:

Too Small: C3 → D3 (rising, "go higher")
Too Big:   G4 → F4 (falling, "go lower")
Just Right: C4 + E4 + G4 (major chord, "perfect!")

Creates intuitive audio guidance!
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Convergence Monk)
```
CONVERGENCE MONK:
"Two pointers stand at opposite ends.
One begins where numbers are small.
One begins where numbers are large.

Your target is 20.

If your sum is TOO SMALL, the left pointer
must move RIGHT toward larger numbers.

If your sum is TOO BIG, the right pointer
must move LEFT toward smaller numbers.

They will meet in the middle. At the truth."
```

### During Puzzle
```
CONVERGENCE MONK (contextual):

[Sum too small]:
"Too small. The left seeks larger ground."

[Sum too big]:
"Too large. The right seeks smaller ground."

[Pointers very close]:
"They converge. The answer is near."
```

### On Completion
```
CONVERGENCE MONK:
"*bows*

They met. The sum was found.

This is convergence—two pointers moving
toward each other until they find the answer.

Because the numbers are SORTED, you always
know which pointer to move:
- Small sum? Move left pointer right.
- Big sum? Move right pointer left.

This transforms O(n²) searching into O(n).
Linear time. Elegant."
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You had two pointers at opposite ends of
a sorted array. You moved them toward each
other based on whether the sum was too
small or too big.

Eventually, they converged on the answer!"
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"This is CONVERGENT TWO POINTERS.

Because the array is SORTED:
- Moving left pointer RIGHT → Increases sum
- Moving right pointer LEFT → Decreases sum

This lets you 'binary search' for the target
in O(n) time instead of O(n²)!

It's the optimal solution for Two Sum on
a sorted array."
```

### Section 3: Pseudocode Walkthrough
```
CONVERGENT TWO POINTERS:

left = 0
right = n - 1

while left < right:
    current_sum = array[left] + array[right]
    
    if current_sum == target:
        return (left, right)  # Found it!
    
    if current_sum < target:
        left += 1   # Need bigger, move left right
    else:
        right -= 1  # Need smaller, move right left

return None  # No pair exists
```

### Section 4: Mini-Forge Practice
```
CONVERGENCE CHALLENGE:

Array: [2, 4, 6, 8, 10]
Target: 12
Left at [2], Right at [10]

Current sum: 2 + 10 = 12

Is this the target? [YES] [NO]

CORRECT: YES ✓

In this case, the starting positions
were already the answer!
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Pointer Convergence

"From opposite ends, truth emerges."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: POINTER CONVERGENCE

### What You Felt
Two pointers started at opposite ends. You moved them based on whether the sum was too small or too big. They converged toward the answer.

### Plain Explanation
- **Convergent Two Pointers** work on **sorted** data
- Left pointer starts at minimum, right at maximum
- Compare sum to target to decide which moves
- **Sorted order** guarantees correct direction
- O(n) time complexity!

### Pattern Steps
1. INITIALIZE left at start, right at end
2. CALCULATE sum = array[left] + array[right]
3. COMPARE sum to target
4. If sum < target: Move left RIGHT
5. If sum > target: Move right LEFT
6. If sum = target: FOUND!
7. REPEAT until found or pointers cross

### Real World Applications
- 🔍 Two Sum on sorted array
- 📊 Finding pairs with specific difference
- 🎯 Container with most water (width × height)
- ✅ Validating palindromes
- 🧮 Three Sum (nested convergence)
- 📈 Stock profit optimization

### LeetCode Connection
```
This technique solves:
- Two Sum II (Sorted Input)
- Container With Most Water
- 3Sum (with nested loop)
- Valid Palindrome
- And many more!
```

### Unlocked Ability
You now understand that **sorted data + two pointers = efficient search**. The sort order tells you which way to move.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_TR2_Scene configuration
{
  key: 'Puzzle_TR2_Scene',
  parent: 'BasePuzzleScene',
  
  stones: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  
  target: 20,
  
  pointers: {
    blue: { start: 0 },    // Index 0, value 1
    orange: { start: 9 }   // Index 9, value 19
  },
  
  validPairs: [
    [0, 9],  // 1 + 19 = 20
    [1, 8],  // 3 + 17 = 20
    [3, 6],  // 7 + 13 = 20
    [4, 5]   // 9 + 11 = 20
  ]
}
```

### State Machine
```
States:
- IDLE (before start)
- INTRO (monk dialogue)
- PLAYING (pointers can move)
- MOVING (pointer sliding animation)
- CALCULATING (sum display updating)
- VICTORY (target found!)
- CONCEPT_BRIDGE
```

### Sum Logic
```typescript
class ConvergenceController {
  stones: number[];
  leftIndex: number;
  rightIndex: number;
  target: number;
  
  getCurrentSum(): number {
    return this.stones[this.leftIndex] + this.stones[this.rightIndex];
  }
  
  getSumStatus(): 'low' | 'high' | 'match' {
    const sum = this.getCurrentSum();
    if (sum < this.target) return 'low';
    if (sum > this.target) return 'high';
    return 'match';
  }
  
  moveLeft(): boolean {
    if (this.leftIndex < this.rightIndex - 1) {
      this.leftIndex++;
      return true;
    }
    return false; // Can't move further
  }
  
  moveRight(): boolean {
    if (this.rightIndex > this.leftIndex + 1) {
      this.rightIndex--;
      return true;
    }
    return false; // Can't move further
  }
}
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] Pointers start at correct positions
- [ ] Left arrow moves blue right
- [ ] Right arrow moves orange left
- [ ] Sum calculates correctly
- [ ] Victory triggers on target match
- [ ] All valid pairs work as solutions

### Visual
- [ ] Pointers render above stones
- [ ] Movement animation is smooth
- [ ] Sum display updates in real-time
- [ ] Status messages are clear

### Audio
- [ ] Movement sound plays
- [ ] Sum result tones are correct
- [ ] Victory chord is satisfying

### Edge Cases
- [ ] Pointers can't cross each other
- [ ] Starting position can be solution
- [ ] All valid pairs are accepted

---

*"The shortest path between two points is convergence."*
— Convergence Monk

