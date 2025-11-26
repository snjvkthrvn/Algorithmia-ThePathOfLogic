# PUZZLE AP-4: THE PAIRING GROUNDS

> *"Two numbers, one target. Find the pair that sums to victory."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | AP-4 |
| **Name** | The Pairing Grounds |
| **Region** | Array Plains |
| **Difficulty** | ★★☆☆☆ |
| **Time Limit** | None |
| **Concept Taught** | Two Sum Pattern, Complement Technique |

### Core Mechanic
Eight numbered stone tiles are scattered across an open field. Player must find two tiles whose values sum to the target (9). This teaches the foundational Two Sum pattern—one of the most famous coding interview questions.

### Why This Puzzle Is Legendary
- **Interview Staple**: Literally the most asked coding question
- **Multiple Solutions**: Brute force vs. optimal both work
- **Complement Insight**: "What do I need?" is the key question
- **Foundation for More**: Sets up sliding window, two pointers

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                         SOUTH PAIRING GROUNDS                                  ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     🧱 TILE WORKER                                                             ║
║     "Find two tiles that sum to the target!"                                   ║
║                                                                                ║
║     ╔═══════════════════════════════════════════════╗                         ║
║     ║          TARGET SUM: 9                        ║   ← Large stone sign    ║
║     ╚═══════════════════════════════════════════════╝                         ║
║                                                                                ║
║     ┌─────────────────────────────────────────────────────────────────────┐   ║
║     │                         OPEN FIELD                                  │   ║
║     │                                                                     │   ║
║     │        ┌───┐                              ┌───┐                     │   ║
║     │        │ 2 │                              │ 7 │      ← Valid pair!  │   ║
║     │        └───┘                              └───┘        (2+7=9)      │   ║
║     │                   ┌───┐                                             │   ║
║     │                   │11 │                                             │   ║
║     │                   └───┘         ┌───┐                               │   ║
║     │      ┌───┐                      │15 │                               │   ║
║     │      │ 3 │                      └───┘                               │   ║
║     │      └───┘                                        ┌───┐             │   ║
║     │                  ┌───┐         ┌───┐              │ 1 │             │   ║
║     │                  │ 6 │         │ 9 │              └───┘             │   ║
║     │                  └───┘         └───┘                                │   ║
║     │                         ← Also valid: (3+6=9)                       │   ║
║     │                                                                     │   ║
║     │                [PLAYER]                                             │   ║
║     │                                                                     │   ║
║     └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                                ║
║     SELECTED: None          CURRENT SUM: --                                   ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

#### Tile Values & Positions
```
╔════════════════════════════════════════════════════════════════╗
║  Tile  │  Value  │  Position (approx)  │  Valid Pairs          ║
╠════════════════════════════════════════════════════════════════╣
║   A    │    2    │  (200, 300)         │  With G (7) → 9 ✓    ║
║   B    │    7    │  (600, 300)         │  With A (2) → 9 ✓    ║
║   C    │   11    │  (350, 380)         │  No pair sums to 9    ║
║   D    │   15    │  (550, 420)         │  No pair sums to 9    ║
║   E    │    3    │  (180, 460)         │  With H (6) → 9 ✓    ║
║   F    │    6    │  (380, 520)         │  With E (3) → 9 ✓    ║
║   G    │    9    │  (520, 520)         │  No pair (need 0)     ║
║   H    │    1    │  (700, 480)         │  No pair (need 8)     ║
╚════════════════════════════════════════════════════════════════╝

TARGET: 9
VALID PAIRS: (2,7) and (3,6)
SINGLE VALUE: 9 (but no 0 exists)
NO PAIR POSSIBLE: 11, 15, 1 (complements don't exist)
```

### The Complement Insight
```
THE KEY QUESTION:

When standing on tile with value X:
"What value do I NEED to reach the target?"

If TARGET = 9:
- On tile 2: Need 7 (9-2=7). Is there a 7? YES!
- On tile 3: Need 6 (9-3=6). Is there a 6? YES!
- On tile 11: Need -2 (9-11=-2). Is there a -2? NO.

This is the COMPLEMENT technique!
```

### Game Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PUZZLE AP-4 FLOW                                │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
               ┌────────────────────────────┐
               │   PLAYER ENTERS FIELD      │
               │   NPC explains challenge   │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   TARGET DISPLAYED: 9      │
               │   8 tiles visible          │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   PLAYER SELECTS FIRST     │
               │   TILE (press E)           │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   TILE GLOWS BLUE          │
               │   Shows: "Selected: 2"     │
               │   Shows: "Need: 7"         │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   PLAYER SELECTS SECOND    │
               │   TILE                     │
               └───────────────┬────────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
        SUM = TARGET                     SUM ≠ TARGET
        ┌──────────┐                     ┌──────────┐
        │ VICTORY! │                     │ WRONG!   │
        │ 2 + 7 = 9│                     │ Reset    │
        └────┬─────┘                     └────┬─────┘
             │                                 │
             │                                 └──────┐
             │                                        │
             ▼                                        ▼
        ┌────────────┐                    Back to selection
        │ CONCEPT    │
        │ BRIDGE     │
        └────────────┘
```

---

## 🎨 VISUAL STATES

### Tile States

```
╔═══════════════════════════════════════════════════════════════╗
║                     TILE VISUAL STATES                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  UNSELECTED          HOVER               FIRST SELECTED       ║
║  ┌─────────┐         ┌─────────┐         ┌─────────┐         ║
║  │ ▓▓▓▓▓▓▓ │         │ ░░░░░░░ │         │ ▒▒▒▒▒▒▒ │         ║
║  │ ▓  2  ▓ │         │ ░  2  ░ │         │ ▒  2  ▒ │         ║
║  │ ▓▓▓▓▓▓▓ │         │ ░░░░░░░ │         │ ▒▒▒▒▒▒▒ │         ║
║  └─────────┘         └─────────┘         └─────────┘         ║
║  Stone gray          Yellow outline      Blue glow            ║
║  Number visible      Scale 1.05x         Floating up 10px    ║
║                                          "Selected!"          ║
║                                                               ║
║  COMPLEMENT HINT     CHECKING PAIR       CORRECT PAIR!        ║
║  ┌─────────┐         ┌─────────┐         ┌─────────┐         ║
║  │ ▒▒▒▒▒▒▒ │         │ ░░░░░░░ │         │ ████████│         ║
║  │ ▒  7  ▒ │←hint    │ ░ 2+7? ░ │         │ █ 2+7 █ │         ║
║  │ ▒▒▒▒▒▒▒ │         │ ░░░░░░░ │         │ █ =9! █ │         ║
║  └─────────┘         └─────────┘         └─────────┘         ║
║  Faint highlight     Both pulse          GREEN + beam!        ║
║  "Need 7"            Calculating...      Celebration!         ║
║                                                               ║
║  WRONG PAIR                                                   ║
║  ┌─────────┐                                                  ║
║  │ ✗✗✗✗✗✗✗ │                                                  ║
║  │ ✗ 2+11✗ │                                                  ║
║  │ ✗ =13 ✗ │  ≠ 9                                             ║
║  └─────────┘                                                  ║
║  RED flash                                                    ║
║  Both reset                                                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Target Display
```
TARGET SIGN DESIGN:

╔═══════════════════════════════════════╗
║       ┌─────────────────────┐         ║
║       │     TARGET SUM      │         ║
║       │  ╔═══════════════╗  │         ║
║       │  ║       9       ║  │   ← Large, clear
║       │  ╚═══════════════╝  │
║       └─────────────────────┘         ║
╚═══════════════════════════════════════╝

When pair found:
╔═══════════════════════════════════════╗
║       ┌─────────────────────┐         ║
║       │    2 + 7 = 9  ✓     │         ║
║       │  ════════════════   │         ║
║       │     FOUND IT!       │         ║
║       └─────────────────────┘         ║
╚═══════════════════════════════════════╝
```

### Light Beam Connection
```
CORRECT PAIR VISUAL:

When 2 and 7 are both selected and verified:

    ┌───┐                          ┌───┐
    │ 2 │══════════════════════════│ 7 │
    └───┘   ↑ Light beam ↑         └───┘
    
Both tiles:
- Rise up 20px
- Glow green
- Particles emit upward
- Beam connects them
- "2 + 7 = 9" appears above beam
```

---

## 🔧 INTERACTION MECHANICS

### Selection System
```
SINGLE-SELECT MODE:

1. Player walks to tile
2. Press [E] to select
3. Tile becomes "first selected"
4. Walk to another tile
5. Press [E] to select second
6. Pair is checked immediately

TOGGLE BEHAVIOR:
- Selecting same tile again → Deselect
- Selecting third tile → Replaces first selection
```

### UI Feedback
```
SELECTION STATE UI:

[No selection]
"Walk to a tile and press [E] to select"

[First tile selected: 2]
"Selected: 2"
"Looking for: 7 (Target: 9)"
"Select another tile to check the sum"

[Checking pair: 2 + 7]
"Calculating: 2 + 7 = ?"
*brief pause for anticipation*

[Correct: 2 + 7 = 9]
"2 + 7 = 9 ✓ FOUND IT!"
*celebration*

[Wrong: 2 + 11 = 13]
"2 + 11 = 13 ✗ Not 9"
"Try again!"
```

### Complement Display
```
WHEN FIRST TILE SELECTED:

The complement value (Target - Selected) is shown.

Example: Target = 9, Selected = 2
Display: "Need: 7"

If a tile with value 7 exists:
- That tile gets a subtle highlight
- Player can notice the hint

If no tile with complement exists:
- Display: "Need: 7 (not present)"
- Player knows this tile won't work
```

---

## 💡 HINT SYSTEM

### Progressive Hints
| Hint # | Content | Effect |
|--------|---------|--------|
| 1 | "When you stand on a tile, ask: What value would complete 9?" | Concept only |
| 2 | "TARGET - YOUR_NUMBER = COMPLEMENT. Look for the complement!" | Shows formula |
| 3 | "Select tile 2. Now look for tile 7. (2+7=9)" | Direct guidance |

### Visual Hint Mode
```
HINT ACTIVATED:

All valid pairs get subtle connecting lines:

    [2]─────────────[7]   ← "These sum to 9"
    
    [3]─────────────[6]   ← "These also sum to 9"
    
Lines are faint (30% opacity) but visible.
```

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(attempts: number, hintsUsed: number): number {
  // 3 stars: First try, no hints (used complement thinking)
  if (attempts === 1 && hintsUsed === 0) return 3;
  
  // 2 stars: Few attempts or one hint
  if (attempts <= 3 && hintsUsed <= 1) return 2;
  
  // 1 star: Completed
  return 1;
}
```

### Tracking
```
METRICS:
- First tile selected (shows strategy)
- Second tile selected
- Total pairs attempted
- Time to solution
- Hints used
- Did player use complement thinking?
```

### Progression Points
- Completion: 30 points
- First-try bonus: +15 points
- No hints bonus: +5 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Approach tile | Stone step | `tile_approach.wav` | 0.2s |
| Select first | Heavy lift + hum | `tile_select.wav` | 0.3s |
| Select second | Anticipation tone | `tile_check.wav` | 0.2s |
| Correct pair | Triumphant chord | `pair_correct.wav` | 0.8s |
| Wrong pair | Low buzz + reset | `pair_wrong.wav` | 0.4s |
| Deselect | Soft thud | `tile_deselect.wav` | 0.2s |
| Victory | Full celebration | `puzzle_complete.wav` | 1.5s |

### Sum Calculation Audio
```
CHECKING PAIR:

1. Select second tile: "Anticipation tone" (rising)
2. Brief pause (300ms): Silence
3. Calculation display: Numbers appear with soft ticks
4. Result: CHORD (correct) or BUZZ (wrong)

Creates anticipation and satisfaction!
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Tile Worker)
```
TILE WORKER:
"*wipes brow*

I've laid out these number tiles, and I've
got a challenge for you.

See that sign? It says TARGET: 9.

I need you to find TWO tiles that ADD UP
to exactly 9.

Here's a tip: When you're standing on one
tile, think about what OTHER number you'd
need. If you're on 2, you need 7.
If you're on 3, you need 6.

That NEEDED number is called the COMPLEMENT.
Find a tile and its complement!"
```

### During Puzzle
```
TILE WORKER (contextual):

[Player selects 2]:
"2... so you need 7 to make 9. Is there a 7?"

[Player selects 11 second]:
"2 + 11 = 13. That's not 9. Try again!"

[Player wanders without selecting]:
"Pick a tile! Any tile! Then think about
what number would complete the target."

[Player selects correct first]:
"That's one! Now find its complement!"
```

### On Completion
```
TILE WORKER:
"*grins*

2 + 7 = 9. You found the pair!

You know what you just solved? The TWO SUM
problem! It's famous in the coding world.

The secret is the COMPLEMENT technique:
For any number, ask 'What's TARGET minus THIS?'

If that complement exists in your set, you've
got your pair. No need to check every combination!

That's O(n) with a hash set versus O(n²) brute force.
Much faster!"
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You had 8 tiles with different numbers.
You needed to find two that sum to 9.

Did you check every possible pair?
Or did you think: 'I have 2... I need 7'?

That second approach is the key insight!"
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"This is the TWO SUM pattern.

The brute force way:
Check all pairs: (2,7), (2,11), (2,15)...
That's 28 pairs to check for 8 numbers!

The complement way:
For each number, compute TARGET - number.
Check if that complement exists.
That's only 8 checks!

The complement technique transforms
O(n²) into O(n)!"
```

### Section 3: Pseudocode Walkthrough
```
TWO SUM - BRUTE FORCE:
for each num1 in tiles:
    for each num2 in tiles:
        if num1 + num2 == target:
            return (num1, num2)
# Checks: n * n = n²

TWO SUM - COMPLEMENT:
seen = {}
for num in tiles:
    complement = target - num
    if complement in seen:
        return (complement, num)
    seen[num] = True
# Checks: n (with hash set!)
```

### Section 4: Mini-Forge Practice
```
TWO SUM CHALLENGE:

Array: [1, 4, 5, 8]
Target: 9

You're looking at number 4.
What is its complement?

complement = target - current = 9 - 4 = ?

[3] [4] [5] [8]

CORRECT: 5 ✓

Is 5 in the array? YES!
So (4, 5) is a valid pair!
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Two Sum Pattern

"Don't search for pairs. Search for complements."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: TWO SUM PATTERN

### What You Felt
You selected a tile, wondered "what number would complete 9?", and looked for that specific value.

### Plain Explanation
- **Two Sum**: Find two numbers that add up to a target
- **Brute Force**: Check every pair (slow: O(n²))
- **Complement Technique**: For each number, look for (target - number)
- Using a **hash set**, you can check complements in O(1)
- Total: O(n) time—MUCH faster!

### Pattern Steps
1. INITIALIZE an empty set (to track seen numbers)
2. FOR EACH number in the array:
   a. CALCULATE complement = target - number
   b. CHECK if complement is in the set
   c. If YES: Found the pair!
   d. If NO: Add current number to the set
3. RETURN the pair (or indicate no pair exists)

### Real World Applications
- 🛒 Finding items that fit a budget
- 🎯 Matching complementary skills
- 💰 Financial transactions that balance
- 🧩 Puzzle pieces that fit together
- 📊 Data validation (pairs must sum to total)
- 🎮 Game mechanics (combine items)

### LeetCode Connection
```
This is LeetCode Problem #1 - Two Sum!
The most famous interview question.

You just solved it by playing a game!
```

### Unlocked Ability
You now understand the **complement technique**—the key insight that transforms quadratic search into linear lookup. This pattern appears everywhere in algorithm design.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_AP4_Scene configuration
{
  key: 'Puzzle_AP4_Scene',
  parent: 'BasePuzzleScene',
  
  target: 9,
  
  tiles: [
    { id: 'A', value: 2, position: { x: 200, y: 300 } },
    { id: 'B', value: 7, position: { x: 600, y: 300 } },
    { id: 'C', value: 11, position: { x: 350, y: 380 } },
    { id: 'D', value: 15, position: { x: 550, y: 420 } },
    { id: 'E', value: 3, position: { x: 180, y: 460 } },
    { id: 'F', value: 6, position: { x: 380, y: 520 } },
    { id: 'G', value: 9, position: { x: 520, y: 520 } },
    { id: 'H', value: 1, position: { x: 700, y: 480 } }
  ],
  
  validPairs: [
    [2, 7],
    [3, 6]
  ]
}
```

### State Machine
```
States:
- IDLE (before start)
- INTRO (NPC dialogue)
- EXPLORING (no selection)
- FIRST_SELECTED (one tile selected)
- CHECKING (computing sum)
- FEEDBACK_CORRECT (pair found!)
- FEEDBACK_WRONG (not a match)
- COMPLETE (puzzle solved)
- CONCEPT_BRIDGE
```

### Pair Validation
```typescript
function checkPair(first: number, second: number, target: number): boolean {
  return first + second === target && first !== second;
}

function findAllValidPairs(tiles: number[], target: number): [number, number][] {
  const pairs: [number, number][] = [];
  const seen = new Set<number>();
  
  for (const num of tiles) {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs.push([complement, num]);
    }
    seen.add(num);
  }
  
  return pairs;
}
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] All 8 tiles are selectable
- [ ] First selection shows complement
- [ ] Correct pairs trigger victory
- [ ] Wrong pairs reset correctly
- [ ] Multiple valid pairs all work
- [ ] Stars calculate properly

### Visual
- [ ] Selected tile visual is clear
- [ ] Complement hint is visible but subtle
- [ ] Light beam renders on correct pair
- [ ] Target display updates
- [ ] Celebration animation plays

### Audio
- [ ] Selection sounds are satisfying
- [ ] Anticipation pause feels right
- [ ] Correct/wrong sounds are distinct

### Edge Cases
- [ ] Can't select same tile twice (for pair)
- [ ] Selecting third tile replaces first
- [ ] Deselection works properly
- [ ] All valid pairs work as answers

---

*"The sum is greater than its parts—but finding those parts is the real trick."*
— Tile Worker

