# PUZZLE TR-3: SLIDING WINDOW CATCH

> *"Not all at once. Just the right slice, sliding through the stream."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | TR-3 |
| **Name** | Sliding Window Catch |
| **Region** | Twin Rivers |
| **Difficulty** | ★★★☆☆ |
| **Time Limit** | None (self-paced) |
| **Concept Taught** | Sliding Window Technique, Dynamic Range Optimization |

### Core Mechanic
A stream of numbered items flows past. Player controls a "window frame" that can expand or contract to capture a range of items. Goal: Find the smallest window that sums to at least the target.

### Why This Puzzle Is Elegant
- **Physical Metaphor**: Window literally slides and resizes
- **Optimization**: Not just finding AN answer, finding the BEST
- **Dynamic Thinking**: Window grows to meet minimum, shrinks to optimize
- **Real Algorithm**: This IS the sliding window pattern

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        SLIDING WINDOW ARENA                                    ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     🔧 WINDOW WEAVER                                                           ║
║     "Capture just enough—no more, no less!"                                    ║
║                                                                                ║
║     ╔═══════════════════════════════════════════════════════════════════╗     ║
║     ║              MINIMUM SUM NEEDED: 8                                ║     ║
║     ╚═══════════════════════════════════════════════════════════════════╝     ║
║                                                                                ║
║     ┌─────────────────────────────────────────────────────────────────────┐   ║
║     │                                                                     │   ║
║     │     ITEM STREAM (flowing right to left):                           │   ║
║     │                                                                     │   ║
║     │     [2] [1] [5] [1] [3] [2] [4] [1] [2] [3]                        │   ║
║     │              ↑                 ↑                                    │   ║
║     │              │                 │                                    │   ║
║     │              └─────────────────┘                                    │   ║
║     │                  WINDOW FRAME                                       │   ║
║     │                                                                     │   ║
║     │     ╔════════════════════════════════════╗                         │   ║
║     │     ║    CURRENT WINDOW: [5, 1, 3]       ║                         │   ║
║     │     ║    SUM: 5 + 1 + 3 = 9 ✓ (≥8)      ║                         │   ║
║     │     ║    SIZE: 3 elements               ║                         │   ║
║     │     ╚════════════════════════════════════╝                         │   ║
║     │                                                                     │   ║
║     └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                                ║
║     CONTROLS:                                                                 ║
║     [→] Expand window right     [←] Shrink window (from left)                 ║
║     [SPACE] Slide window right (move both edges)                              ║
║                                                                                ║
║     BEST WINDOW FOUND: Size 2 (5+3=8)                                        ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

#### Stream Data
```
ITEM STREAM (10 items):

Index:  0   1   2   3   4   5   6   7   8   9
Value: [2] [1] [5] [1] [3] [2] [4] [1] [2] [3]

TARGET: Sum ≥ 8
GOAL: Find the SMALLEST window that achieves this

VALID WINDOWS (sum ≥ 8):
- [5,1,3] = 9 (size 3)
- [1,5,1,3] = 10 (size 4)
- [5,1,3,2] = 11 (size 4)
- [3,2,4] = 9 (size 3)
- [2,4,1,2] = 9 (size 4)
- [4,1,2,3] = 10 (size 4)
- etc.

OPTIMAL: Size 2 windows that work:
- [5,3]? Not contiguous!
- Need to find smallest CONTIGUOUS window

Actually smallest: [5,1,3] = 9 (size 3)? Let's check...
[3,2,4] = 9 (size 3)
[2,4,1,2] won't beat size 3
```

### Window Mechanics
```
╔═══════════════════════════════════════════════════════════════╗
║              WINDOW OPERATIONS                                ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║   EXPAND (→ key):                                            ║
║   ├─ Right edge moves right                                  ║
║   ├─ Window gets bigger                                      ║
║   └─ Sum increases                                           ║
║                                                               ║
║   SHRINK (← key):                                            ║
║   ├─ Left edge moves right                                   ║
║   ├─ Window gets smaller                                     ║
║   └─ Sum decreases                                           ║
║                                                               ║
║   SLIDE (SPACE key):                                         ║
║   ├─ Both edges move right                                   ║
║   ├─ Window size stays same                                  ║
║   └─ New items enter, old items leave                        ║
║                                                               ║
║   RESET (R key):                                             ║
║   ├─ Window returns to start                                 ║
║   └─ Size = 1, Position = 0                                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Game Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PUZZLE TR-3 FLOW                                │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
               ┌────────────────────────────┐
               │   SHOW TARGET: Sum ≥ 8     │
               │   Window starts at [2]     │
               │   (size 1, position 0)     │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   PLAYER MANIPULATES       │
               │   WINDOW                   │
               │                            │
               │   Expand → include more    │
               │   Shrink → remove from left│
               │   Slide → move position    │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   LIVE FEEDBACK:           │
               │   - Current sum            │
               │   - Current size           │
               │   - Valid? (sum ≥ target)  │
               └───────────────┬────────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
        SUM < TARGET                     SUM ≥ TARGET
        ┌──────────┐                     ┌──────────┐
        │"Not enough│                    │ VALID!   │
        │ Expand!" │                     │ Can you  │
        └──────────┘                     │ shrink?  │
                                         └────┬─────┘
                                              │
                                              ▼
               ┌────────────────────────────────────────────┐
               │   Track best (smallest) valid window      │
               │   "Best so far: Size 3"                   │
               └───────────────────────┬───────────────────┘
                                       │
                                       ▼
               ┌────────────────────────────────────────────┐
               │   VICTORY when player CONFIRMS best       │
               │   or explores all possibilities           │
               └───────────────────────────────────────────┘
```

---

## 🎨 VISUAL STATES

### Window Frame Visualization

```
╔═══════════════════════════════════════════════════════════════╗
║                  WINDOW FRAME STATES                          ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  INVALID (sum < target):                                      ║
║  ┌─────────────────────────────────────┐                     ║
║  │ [2] [1] [5]                         │  ← Red frame        ║
║  │                                     │                     ║
║  │ Sum: 8  Size: 3  ✗ (need ≥ 8)       │  Wait, 8 = 8!      ║
║  └─────────────────────────────────────┘                     ║
║                                                               ║
║  Let's use target 15 for clearer examples:                   ║
║                                                               ║
║  INVALID (sum < 15):                                         ║
║  ┌─────────────────────────────────────┐                     ║
║  │ [2] [1] [5]                         │  ← Red frame        ║
║  │                                     │                     ║
║  │ Sum: 8  Size: 3  ✗ (need ≥ 15)      │                     ║
║  └─────────────────────────────────────┘                     ║
║                                                               ║
║  VALID (sum ≥ 15):                                           ║
║  ┌─────────────────────────────────────┐                     ║
║  │ [2] [1] [5] [1] [3] [2] [4]         │  ← Green frame      ║
║  │                                     │                     ║
║  │ Sum: 18  Size: 7  ✓                 │                     ║
║  └─────────────────────────────────────┘                     ║
║                                                               ║
║  OPTIMAL (smallest valid):                                   ║
║  ┌─────────────────────────────────────┐                     ║
║  │ [5] [1] [3] [2] [4]                 │  ← GOLD frame!      ║
║  │                                     │                     ║
║  │ Sum: 15  Size: 5  ⭐ BEST!          │                     ║
║  └─────────────────────────────────────┘                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Stream Items
```
ITEM APPEARANCE:

OUTSIDE WINDOW:
┌───┐
│ 2 │  Gray background
└───┘  Subtle

INSIDE WINDOW:
╔═══╗
║ 2 ║  Highlighted
╚═══╝  Glowing border matching window state

ENTERING WINDOW (expand):
┌───┐ → ╔═══╗
│ 2 │   ║ 2 ║  Animation: Grow + brighten
└───┘ → ╚═══╝

LEAVING WINDOW (shrink):
╔═══╗ → ┌───┐
║ 2 ║   │ 2 │  Animation: Shrink + fade
╚═══╝ → └───┘
```

### Best Window Tracker
```
BEST WINDOW DISPLAY:

┌─────────────────────────────────────────┐
│         BEST VALID WINDOW               │
├─────────────────────────────────────────┤
│                                         │
│  Size: 5                                │
│  Items: [5, 1, 3, 2, 4]                 │
│  Sum: 15                                │
│  Position: Index 2-6                    │
│                                         │
│  [CONFIRM THIS AS ANSWER]               │
│                                         │
└─────────────────────────────────────────┘

Updates whenever player finds a smaller valid window.
```

---

## 🔧 INTERACTION MECHANICS

### Control Scheme
```
KEYBOARD CONTROLS:

→ (RIGHT ARROW): EXPAND
  - Adds next item to right edge of window
  - Sum increases by that item's value
  - Window size increases by 1

← (LEFT ARROW): SHRINK
  - Removes leftmost item from window
  - Sum decreases by that item's value
  - Window size decreases by 1
  - Cannot shrink to size 0

SPACE: SLIDE
  - Moves entire window one position right
  - Equivalent to expand then shrink
  - Useful for scanning through data

R: RESET
  - Window returns to size 1 at position 0
  - Clear current progress

ENTER: CONFIRM
  - If current window is valid and best, lock it in
  - Triggers victory if optimal found
```

### Window Constraints
```
BOUNDARY RULES:

1. Window size minimum: 1
2. Window cannot extend past array end
3. Left edge cannot pass right edge
4. Cannot shrink below size 1

EDGE INDICATORS:
- Right edge at end: "→" disabled, shows wall
- Minimum size: "←" disabled, shows lock
```

### Live Calculation
```javascript
class SlidingWindow {
  data: number[];
  left: number;
  right: number;
  target: number;
  bestSize: number | null;
  
  getCurrentSum(): number {
    let sum = 0;
    for (let i = this.left; i <= this.right; i++) {
      sum += this.data[i];
    }
    return sum;
  }
  
  isValid(): boolean {
    return this.getCurrentSum() >= this.target;
  }
  
  expand(): boolean {
    if (this.right < this.data.length - 1) {
      this.right++;
      this.checkBest();
      return true;
    }
    return false;
  }
  
  shrink(): boolean {
    if (this.left < this.right) {
      this.left++;
      this.checkBest();
      return true;
    }
    return false;
  }
  
  checkBest(): void {
    if (this.isValid()) {
      const size = this.right - this.left + 1;
      if (this.bestSize === null || size < this.bestSize) {
        this.bestSize = size;
      }
    }
  }
}
```

---

## 💡 HINT SYSTEM

### Progressive Hints
| Hint # | Content | Effect |
|--------|---------|--------|
| 1 | "Expand until sum is ≥ target. Then try shrinking!" | Strategy |
| 2 | "After shrinking, slide right and try again." | Exploration |
| 3 | "The optimal window starts at index 2." | Direct hint |

### Optimal Strategy Display
```
ALGORITHM HINT:

1. Start with window size 1 at position 0
2. EXPAND until sum ≥ target
3. Record this as "best" if smaller than previous best
4. SHRINK from left while sum still ≥ target
5. Each valid shrink → new "best" candidate
6. When sum < target, EXPAND again
7. Repeat until right edge reaches end
```

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(foundSize: number, optimalSize: number, moves: number): number {
  // Did they find the optimal?
  const foundOptimal = foundSize === optimalSize;
  
  // Efficiency (fewer moves = better)
  const efficient = moves <= optimalSize * 3;
  
  if (foundOptimal && efficient) return 3;
  if (foundOptimal) return 2;
  return 1; // Completed with valid (but not optimal) window
}
```

### Victory Conditions
```
VICTORY TRIGGERS:

1. Player confirms optimal window → Full victory
2. Player explores all positions and confirms best → Victory
3. Player confirms non-optimal but valid → Partial victory + hint about better
```

### Progression Points
- Completion: 30 points
- Optimal found: +15 points
- Efficient exploration: +5 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Expand | Stretching sound | `window_expand.wav` | 0.2s |
| Shrink | Compression sound | `window_shrink.wav` | 0.2s |
| Slide | Whoosh | `window_slide.wav` | 0.2s |
| Valid window | Positive chime | `window_valid.wav` | 0.3s |
| New best | Achievement tone | `new_best.wav` | 0.5s |
| Confirm | Lock-in sound | `confirm.wav` | 0.3s |

### Audio Feedback
```
SUM STATE SOUNDS:

Sum < Target: Low continuous hum
Sum = Target: Neutral tone
Sum > Target: Slightly higher tone (valid but maybe not optimal)

New Best: Triumphant arpeggio!
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Window Weaver)
```
WINDOW WEAVER:
"*adjusts goggles excitedly*

Ah! Another one curious about the window!

Watch the stream. See how items flow past?
What if you could capture just a PORTION
of that flow? A... a WINDOW into the data?

Your goal: Find the SMALLEST window whose
sum is at least 15!

EXPAND the window to include more items.
SHRINK it to remove from the left.
SLIDE to move through the stream.

It's not about capturing everything—it's
about capturing just enough, as efficiently
as possible!

*claps hands*

Let's see what you can find!"
```

### During Puzzle
```
WINDOW WEAVER (contextual):

[Sum too small]:
"Not enough! Expand to include more."

[Valid window found]:
"Yes! That works! But can you do smaller?"

[New best found]:
"Excellent! New record! Size [N]!"

[At optimal]:
"Wait... I think that might be the best possible!"
```

### On Completion
```
WINDOW WEAVER:
"*bounces with excitement*

Marvelous! You found the smallest window!

This is the SLIDING WINDOW technique!

The trick is:
1. Expand until you have enough
2. Shrink while you still have enough
3. Slide and repeat

You're not looking at everything at once.
You're looking at just the right slice,
sliding through the data!

O(n) time complexity—beautiful efficiency!"
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You had a stream of numbers and a target sum.

Instead of checking every possible subarray
(which would take O(n²) time), you used a
sliding window.

Expand when you need more. Shrink when you
have enough. Slide to explore. Elegant!"
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"The SLIDING WINDOW technique uses two
pointers to define a range (window).

Key insight: You don't start fresh each time!

When you slide right:
- Add the new right element to sum
- Subtract the old left element from sum

No need to recalculate the entire sum!
This is what makes it O(n)."
```

### Section 3: Pseudocode Walkthrough
```
MINIMUM WINDOW SUM:

left = 0
right = 0
min_length = infinity
current_sum = array[0]

while right < n:
    if current_sum < target:
        # Need more, expand
        right += 1
        current_sum += array[right]
    else:
        # Have enough, try to shrink
        min_length = min(min_length, right - left + 1)
        current_sum -= array[left]
        left += 1

return min_length
```

### Section 4: Mini-Forge Practice
```
SLIDING WINDOW CHALLENGE:

Array: [1, 4, 2, 3]
Target Sum: 6
Current Window: [4, 2] (indices 1-2)

Current sum: 4 + 2 = 6 ✓

If we SHRINK (remove 4), sum becomes 2.
Is 2 ≥ 6?  [YES] [NO]

CORRECT: NO ✓

So we can't shrink further.
Current window [4, 2] (size 2) is our best!
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Sliding Window Technique

"Don't look at everything. Look at just enough,
 and slide through the rest."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: SLIDING WINDOW

### What You Felt
You expanded a window until it captured enough, then shrank it to find the minimum size needed. You slid this window across the data to find the optimal solution.

### Plain Explanation
- **Sliding Window** maintains a dynamic range over contiguous elements
- Window can grow (include more) or shrink (exclude from start)
- Key: Don't recalculate sum from scratch—adjust incrementally!
- Time complexity: O(n) because each element enters and leaves once

### Pattern Steps
1. INITIALIZE window at start (size 1)
2. EXPAND right edge until condition met
3. RECORD solution if valid
4. SHRINK left edge while still valid
5. UPDATE best solution as you shrink
6. When invalid, EXPAND again
7. REPEAT until right edge reaches end

### Real World Applications
- 🔍 Minimum window containing all characters
- 📊 Maximum sum subarray of size K
- 🎯 Longest substring without repeating characters
- 📈 Stock price analysis (rolling averages)
- 🌐 Network packet capture (fixed-size buffers)
- 📝 Text processing (pattern matching)

### Unlocked Ability
You now understand that **windows don't need to start fresh**—they slide! This insight transforms O(n²) subarray problems into O(n) solutions.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_TR3_Scene configuration
{
  key: 'Puzzle_TR3_Scene',
  parent: 'BasePuzzleScene',
  
  stream: [2, 1, 5, 1, 3, 2, 4, 1, 2, 3],
  target: 8,
  
  window: {
    initialLeft: 0,
    initialRight: 0
  },
  
  // For this data with target 8:
  // Optimal is [5,1,3] or [3,2,4] - both size 3
  optimalSize: 3
}
```

### State Machine
```
States:
- IDLE (before start)
- INTRO (weaver dialogue)
- EXPLORING (window manipulation)
- VALID_WINDOW (current window works)
- NEW_BEST (found smaller valid)
- CONFIRMING (player locking in answer)
- VICTORY (optimal confirmed)
- CONCEPT_BRIDGE
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] Window expands correctly
- [ ] Window shrinks correctly
- [ ] Sum calculates accurately
- [ ] Best window tracks properly
- [ ] Optimal solution is achievable
- [ ] Victory triggers on confirmation

### Visual
- [ ] Window frame renders clearly
- [ ] Items highlight when in window
- [ ] Best window display updates
- [ ] Expand/shrink animations smooth

### Edge Cases
- [ ] Cannot shrink to size 0
- [ ] Cannot expand past array end
- [ ] Multiple optimal windows handled

---

*"The wise traveler doesn't carry everything—just what fits in the window."*
— Window Weaver

