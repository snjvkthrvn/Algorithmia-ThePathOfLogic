# PUZZLE AP-1: FIX THE FARMLAND

> *"Smallest to largest. That's all there is to it... right?"*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | AP-1 |
| **Name** | Fix the Farmland |
| **Region** | Array Plains |
| **Difficulty** | ★★☆☆☆ |
| **Time Limit** | None |
| **Concept Taught** | Sorting Algorithms (Bubble Sort, Selection Sort) |

### Core Mechanic
Eight wooden tiles on horizontal rails are scrambled. Player must swap adjacent tiles until they're sorted from 0 to 7. This teaches the intuition behind comparison-based sorting.

### Why This Puzzle Matters
- **Foundation of Organization**: Before you can search efficiently, you must sort
- **Physical Intuition**: Swapping adjacent elements IS bubble sort
- **Visible Progress**: Each swap brings order to chaos
- **Optimization Awareness**: Encourages thinking about "best" approach

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        EAST STORAGE SHED INTERIOR                              ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     🧑‍🌾 SORTING FARMER                                                         ║
║     "Help me sort these tiles!"                                                ║
║                                                                                ║
║     ┌──────────────────────────────────────────────────────────────────────┐  ║
║     │  ═══════════════════════════════════════════════════════════════════  │  ║
║     │                         SORTING RAILS                                 │  ║
║     │  ═══════════════════════════════════════════════════════════════════  │  ║
║     │                                                                       │  ║
║     │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │  ║
║     │   │  5  │ │  2  │ │  7  │ │  1  │ │  6  │ │  0  │ │  4  │ │  3  │   │  ║
║     │   └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘   │  ║
║     │     ↑       ↑       ↑       ↑       ↑       ↑       ↑       ↑       │  ║
║     │    [0]     [1]     [2]     [3]     [4]     [5]     [6]     [7]      │  ║
║     │                         POSITION MARKERS                            │  ║
║     │                                                                       │  ║
║     │  ═══════════════════════════════════════════════════════════════════  │  ║
║     └──────────────────────────────────────────────────────────────────────┘  ║
║                                                                                ║
║     TARGET:  [ 0 ][ 1 ][ 2 ][ 3 ][ 4 ][ 5 ][ 6 ][ 7 ]                        ║
║              (Faint shadows showing goal positions)                           ║
║                                                                                ║
║     SWAPS: 0        BEST: 16 (for 3 stars)                                   ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

#### Tile Specifications
| Property | Value |
|----------|-------|
| **Count** | 8 tiles |
| **Size** | 80 × 80 pixels |
| **Material** | Wooden with brass number plates |
| **Spacing** | 20 pixels between tiles |
| **Rail** | Dark iron track with visible grooves |

#### Visual Design
```
INDIVIDUAL TILE DESIGN:
┌─────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Wood grain texture
│▓ ┌──────────┐ ▓│
│▓ │   ╔══╗   │ ▓│  ← Brass number plate
│▓ │   ║ 5║   │ ▓│
│▓ │   ╚══╝   │ ▓│
│▓ └──────────┘ ▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└─────────────────┘
   ▼ ▼ ▼ ▼ ▼ ▼     ← Rail connection points
```

### Initial State
The puzzle generates a random permutation of 0-7 each time:

**Example Scrambles:**
```
Easy:    [1, 0, 2, 3, 4, 5, 6, 7]  (1 swap needed)
Medium:  [5, 2, 7, 1, 6, 0, 4, 3]  (multiple swaps)
Hard:    [7, 6, 5, 4, 3, 2, 1, 0]  (worst case - reversed)
```

**Generation Rules:**
- Ensure at least 10 swaps needed (not trivially sorted)
- Ensure NOT the worst case (too frustrating for first sorting puzzle)
- Random seed ensures replayability

### Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    PUZZLE AP-1 FLOW                         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
             ┌────────────────────────┐
             │   PLAYER ENTERS SHED   │
             │   (NPC greets)         │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   INTRO DIALOGUE       │
             │  "Fields scrambled!"   │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   PUZZLE ACTIVE        │
             │  - Walk between tiles  │
             │  - Press E to swap     │
             │  - No time limit       │
             └───────────┬────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
       SWAP TILES              CHECK IF SORTED
     (increment count)                │
            │                    YES? │
            │                         ▼
            │                 ┌───────────────┐
            │                 │    VICTORY!   │
            │                 │  Count swaps  │
            │                 └───────┬───────┘
            │                         │
            └─────────────────────────┘
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │   CONCEPT BRIDGE       │
                         └────────────────────────┘
```

---

## 🎨 VISUAL STATES

### Tile States

```
╔═══════════════════════════════════════════════════════════════╗
║                     TILE VISUAL STATES                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  UNSORTED           SWAPPING            CORRECT POSITION      ║
║  ┌─────────┐        ┌─────────┐         ┌─────────┐          ║
║  │▓▓▓▓▓▓▓▓▓│        │▓▓▓▓▓▓▓▓▓│←──────→│▒▒▒▒▒▒▒▒▒│          ║
║  │▓  [5]  ▓│        │▓  [5]  ▓│  swap  │▒  [0]  ▒│          ║
║  │▓▓▓▓▓▓▓▓▓│        │▓▓▓▓▓▓▓▓▓│←──────→│▒▒▒▒▒▒▒▒▒│          ║
║  └─────────┘        └─────────┘         └─────────┘          ║
║  Normal wood        Slight lift         Green glow            ║
║  Brass plate        Motion blur         Gold plate accent     ║
║                                                               ║
║  LOCKED             HOVER/SELECTED                            ║
║  ┌─────────┐        ┌─────────┐                               ║
║  │░░░░░░░░░│        │▓▓▓▓▓▓▓▓▓│                               ║
║  │░  [0] ✓░│        │▓ >[5]< ▓│                               ║
║  │░░░░░░░░░│        │▓▓▓▓▓▓▓▓▓│                               ║
║  └─────────┘        └─────────┘                               ║
║  Checkmark          Highlight border                          ║
║  No longer moves    Shows swap options                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Swap Animation
```
SWAP SEQUENCE (300ms total):

Frame 0-5 (0-50ms):
  - Both tiles lift slightly (5px up)
  - Shadow intensifies beneath

Frame 5-20 (50-200ms):
  - Tiles slide past each other
  - Motion blur effect
  - Slight arc in path (not straight line)

Frame 20-30 (200-300ms):
  - Tiles settle into new positions
  - Shadow returns to normal
  - Check if in correct position → Green glow

Audio: "Wooden slide + click" sound
```

### Position Indicators
```
GHOST SHADOWS (Target Positions):
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  0  │ │  1  │ │  2  │ │  3  │ │  4  │ │  5  │ │  6  │ │  7  │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
  30%     30%     30%     30%     30%     30%     30%     30%  opacity

When tile [N] is in position [N], the ghost disappears.
Shows player exactly what the goal state looks like.
```

---

## 🔧 INTERACTION MECHANICS

### Movement & Selection
```
PLAYER MOVEMENT:
- Walk freely in shed using WASD/Arrows
- Walk into gap between two tiles to "stand there"

GAP POSITIONS:
[Tile 0] GAP_0 [Tile 1] GAP_1 [Tile 2] GAP_2 ... GAP_6 [Tile 7]

When player stands in GAP_N:
- Tiles at positions N and N+1 highlight
- Prompt appears: "[E] Swap tiles"
```

### Swap Execution
```javascript
function performSwap(gapIndex) {
  const leftTile = tiles[gapIndex];
  const rightTile = tiles[gapIndex + 1];
  
  // Visual animation
  playSwapAnimation(leftTile, rightTile);
  
  // Data update
  [tiles[gapIndex], tiles[gapIndex + 1]] = [tiles[gapIndex + 1], tiles[gapIndex]];
  
  // Increment counter
  swapCount++;
  
  // Check for completion
  if (isSorted(tiles)) {
    triggerVictory();
  }
  
  // Check for correct positions
  updateTileStates();
}
```

### Alternative Controls
| Input | Action |
|-------|--------|
| **E** | Swap tiles at current gap |
| **1-7** | Jump to specific gap |
| **R** | Reset puzzle (confirmation) |
| **ESC** | Exit puzzle |
| **H** | Request hint |

---

## 💡 HINT SYSTEM

### Hint Progression
| Hint # | Content | Effect |
|--------|---------|--------|
| 1 | "Start by finding where 0 belongs..." | Highlights tile 0 and position 0 |
| 2 | "Swap neighbors until biggest bubbles to end..." | Shows bubble sort concept |
| 3 | "Optimal is 16 or fewer swaps. You're at [N]." | Efficiency awareness |

### Visual Hints
```
HINT 1 VISUALIZATION:
- Tile containing "0" pulses yellow
- Position [0] pulses green
- Arrow shows direction to move

HINT 2 VISUALIZATION:
- Shows one pass of bubble sort in slow motion
- Highlights comparison pairs
- Demonstrates "bubbling" of large values
```

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(swapCount) {
  // Optimal bubble sort for 8 elements: worst case 28, average ~16
  
  if (swapCount <= 16) return 3;      // Near optimal
  if (swapCount <= 25) return 2;      // Reasonable
  return 1;                           // Completed
}
```

### Optimal Solutions
```
BUBBLE SORT: O(n²) swaps worst case
- 8 elements = up to 28 swaps
- Average case ≈ 16 swaps

PLAYER INSIGHT:
- "Maybe I should look for small numbers first?"
- "What if I moved the smallest one all the way left first?"
- This naturally leads to Selection Sort intuition
```

### Progression Points
- Completion: 20 points
- 3-star bonus: +10 points
- First-time completion: +5 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Enter gap | Light wood creak | `enter_gap.wav` | 0.2s |
| Swap tiles | Wood slide + click | `tile_swap.wav` | 0.3s |
| Tile in correct position | Pleasant chime | `tile_correct.wav` | 0.3s |
| All sorted | Triumphant fanfare | `puzzle_complete.wav` | 1.0s |
| Reset puzzle | Shuffle sound | `reset_shuffle.wav` | 0.5s |

### Ambient Audio
- Barn interior ambiance
- Distant animal sounds
- Wood creaking
- Wind through barn gaps

---

## 📜 DIALOGUE SCRIPT

### Intro (Sorting Farmer)
```
SORTING FARMER:
"Oh, thank goodness you're here!

These field tiles used to be perfectly ordered—
0 through 7, neat as could be.

Then that darn Shuffler came through and
scrambled everything! Now I can't plant
the crops right.

Could you help me sort them back?
Just stand between two tiles and press [E]
to swap them. Get them in order:
smallest to largest!

Oh, and try to do it efficiently.
Every swap takes time, you know!"
```

### During Puzzle
```
SORTING FARMER (contextual):

[After 5 swaps]:
"You're getting it! Compare neighbors..."

[After 15 swaps]:
"Still working? Try to find a pattern..."

[When 0 is in position]:
"Yes! The smallest found its home!"

[When 7 is in position]:
"The biggest too! You're sorting!"
```

### On Completion
```
SORTING FARMER:
"Beautiful work! Look at that order!

When things are sorted, finding anything
becomes trivial. You could jump right
to position 5 and know exactly what's there!

You did it in [N] swaps. [Star commentary]

Go visit the Concept Bridge to learn more
about what you just did!"
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You just organized eight tiles by swapping
neighbors over and over until everything
was in order.

That feeling of satisfaction when each
number found its place? That's the heart
of sorting algorithms!"
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"What you did has a name: BUBBLE SORT.

Compare two neighbors. If they're in the
wrong order, swap them. Keep doing this
until everything is sorted.

The big numbers 'bubble up' to the end,
just like bubbles rising in water!

It's not the fastest sorting method, but
it's the most intuitive. You discovered
it naturally!"
```

### Section 3: Pseudocode Walkthrough
```
BUBBLE SORT:

for each pass through the array:
    for each pair of neighbors:
        if left > right:
            swap(left, right)
    
    # After each pass, the largest unsorted
    # element "bubbles" to its correct position

Repeat until no swaps needed!
```

### Section 4: Mini-Forge Practice
```
SORTING CHALLENGE:

Given: [3, 1, 2]
After ONE pass of bubble sort, what is the result?

Step through:
- Compare 3 and 1: 3 > 1, SWAP → [1, 3, 2]
- Compare 3 and 2: 3 > 2, SWAP → [1, 2, 3]

ANSWER: [1, 2, 3]

[✓] You got it! One pass was enough here.
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Sorting Algorithms

"Order is the foundation of efficiency.
 A sorted array is a searchable array."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: SORTING ALGORITHMS

### What You Felt
You compared neighboring tiles, swapped them when out of order, and repeated until everything was sorted from smallest to largest.

### Plain Explanation
- **Sorting** means arranging items in a specific order (usually smallest to largest)
- **Comparison-based sorting** works by comparing pairs and swapping
- **Bubble Sort** is the simplest: compare neighbors, swap if wrong, repeat
- Why sort? Because sorted data is MUCH easier to search!

### Pattern Steps (Bubble Sort)
1. START at the beginning of the array
2. COMPARE the current element with the next one
3. SWAP if they're in the wrong order
4. MOVE to the next pair
5. REPEAT until you reach the end
6. START OVER from the beginning
7. STOP when a full pass has no swaps (sorted!)

### Real World Applications
- 📚 Library books arranged by call number
- 📞 Contacts sorted alphabetically
- 💰 Leaderboards sorted by score
- 📅 Calendar events sorted by date
- 🛒 Search results sorted by relevance
- 📊 Spreadsheet columns sortable

### Unlocked Ability
You now understand that **sorting is transformation**—taking chaos and creating order through systematic comparison. When you see a sorted list, you'll know someone (or some algorithm) did what you just did.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_AP1_Scene configuration
{
  key: 'Puzzle_AP1_Scene',
  parent: 'BasePuzzleScene',
  
  tiles: {
    count: 8,
    size: 80,
    spacing: 20,
    arrangement: 'horizontal_rail'
  },
  
  initialState: generateScrambledArray(8),
  targetState: [0, 1, 2, 3, 4, 5, 6, 7],
  
  scoring: {
    threeStarMax: 16,
    twoStarMax: 25
  }
}
```

### State Machine
```
States:
- IDLE (waiting to start)
- INTRO (dialogue playing)
- ACTIVE (player can swap)
- ANIMATING (swap in progress, input blocked)
- CHECKING (after swap, checking if sorted)
- COMPLETE (all sorted)
- VICTORY (celebration)
- CONCEPT_BRIDGE
```

### Scramble Generation
```typescript
function generateScrambledArray(n: number): number[] {
  // Start with sorted array
  const arr = Array.from({length: n}, (_, i) => i);
  
  // Fisher-Yates shuffle
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  // Ensure not already sorted and not worst case
  if (isSorted(arr) || isReversed(arr)) {
    return generateScrambledArray(n); // Regenerate
  }
  
  // Ensure minimum complexity
  if (countInversions(arr) < 10) {
    return generateScrambledArray(n);
  }
  
  return arr;
}
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] Tiles scramble on puzzle start
- [ ] Only adjacent tiles can swap
- [ ] Swap counter increments correctly
- [ ] Victory triggers when sorted
- [ ] Reset works correctly
- [ ] Stars calculate properly

### Visual
- [ ] Tiles render with wood texture
- [ ] Swap animation is smooth
- [ ] Correct position glow works
- [ ] Ghost shadows visible but subtle
- [ ] NPC is visible and animated

### Audio
- [ ] Swap sound plays
- [ ] Correct position chime plays
- [ ] Victory fanfare plays
- [ ] Ambient barn sounds

### Edge Cases
- [ ] Can't swap during animation
- [ ] Already-sorted edge case handled
- [ ] Rapid input doesn't break state
- [ ] Exit and resume works

---

*"The first step to finding anything is knowing where everything is."*
— Sorting Farmer

