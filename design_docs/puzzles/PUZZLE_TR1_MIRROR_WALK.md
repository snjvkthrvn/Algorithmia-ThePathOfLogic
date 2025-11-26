# PUZZLE TR-1: MIRROR WALK

> *"Two bodies, one mind. What the left does, the right mirrors."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | TR-1 |
| **Name** | Mirror Walk |
| **Region** | Twin Rivers |
| **Difficulty** | ★★☆☆☆ |
| **Time Limit** | None |
| **Concept Taught** | Two Pointers Pattern, Simultaneous Position Tracking |

### Core Mechanic
Player controls TWO avatars simultaneously—one on the Blue bank, one on the Orange bank. They move in **mirrored** directions. Player must navigate both through obstacle courses and collect symmetry orbs.

### Why This Puzzle Is Mind-Bending
- **Dual Control**: Brain must track two positions at once
- **Mirror Logic**: Left becomes right for the second avatar
- **Spatial Reasoning**: Develops two-pointer intuition physically
- **Elegant Metaphor**: Two pointers IS controlling two positions

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                           MIRROR WALK ARENA                                    ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     BLUE BANK (LEFT)              │            ORANGE BANK (RIGHT)            ║
║     ════════════════              │            ═══════════════════            ║
║                                   │                                           ║
║     [START] ──→                   │              ←── [START]                  ║
║       🔵                          │                  🟠                       ║
║       │                           │                  │                        ║
║       ▼                           │                  ▼                        ║
║     ┌─────┐                       │                ┌─────┐                    ║
║     │ 🪨  │   ◇                   │            ◇   │ 🪨  │                    ║
║     └─────┘   (orb)               │           (orb)└─────┘                    ║
║               │                   │            │                              ║
║         ◇ ────┘                   │            └──── ◇                        ║
║               │                   │            │                              ║
║     ┌─────┐   ▼                   │            ▼   ┌─────┐                    ║
║     │ 🪨  │                       │                │ 🪨  │                    ║
║     └─────┘   ◇                   │            ◇   └─────┘                    ║
║               │                   │            │                              ║
║               ▼                   │            ▼                              ║
║           [GOAL]                  │          [GOAL]                           ║
║                                   │                                           ║
║     ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈│≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈                 ║
║           BLUE RIVER              │        ORANGE RIVER                       ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝

LEGEND:
🔵 = Blue Avatar (player controls)
🟠 = Orange Avatar (mirrors blue)
🪨 = Rock obstacle
◇  = Symmetry Orb (must collect)
```

### Mirror Movement System
```
╔═══════════════════════════════════════════════════════════════╗
║             MIRROR MOVEMENT RULES                             ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║   Player Input    │  Blue Avatar  │  Orange Avatar           ║
║   ════════════════│═══════════════│══════════════════════    ║
║   UP (W/↑)        │  Moves UP     │  Moves UP                ║
║   DOWN (S/↓)      │  Moves DOWN   │  Moves DOWN              ║
║   LEFT (A/←)      │  Moves LEFT   │  Moves RIGHT ← MIRRORED! ║
║   RIGHT (D/→)     │  Moves RIGHT  │  Moves LEFT  ← MIRRORED! ║
║                                                               ║
║   The vertical axis is shared.                               ║
║   The horizontal axis is FLIPPED!                            ║
╚═══════════════════════════════════════════════════════════════╝
```

### Starting Positions
```
BLUE AVATAR:
- Position: Left bank, (200, 100)
- Destination: (200, 600)
- Path: Navigate around obstacles, collect orbs

ORANGE AVATAR:
- Position: Right bank, (1080, 100)
- Destination: (1080, 600)
- Path: MIRROR of blue path
```

### Game Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PUZZLE TR-1 FLOW                                │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
               ┌────────────────────────────┐
               │   PLAYER ENTERS AREA       │
               │   Monk explains duality    │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   BOTH AVATARS SPAWN       │
               │   Blue on left, Orange     │
               │   on right                 │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   PLAYER MOVES             │
               │   Both avatars respond     │
               │   (mirrored horizontally)  │
               └───────────────┬────────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
        COLLECT ORBS                     AVOID OBSTACLES
        (8 total, 4 per side)            (Mirrored positions)
              │                                 │
              │    ┌────────────────────┐      │
              │    │ OBSTACLE HIT?      │      │
              │    └─────────┬──────────┘      │
              │         YES  │  NO             │
              │              │   │             │
              │              ▼   │             │
              │       RESET TO   │             │
              │       CHECKPOINT │             │
              │              │   │             │
              └──────────────┼───┘             │
                             │                 │
                             ▼                 │
               ┌────────────────────────┐      │
               │  BOTH REACH GOALS?     │◀─────┘
               └───────────┬────────────┘
                          YES
                           │
                           ▼
               ┌────────────────────────┐
               │  ALL ORBS COLLECTED?   │
               └───────────┬────────────┘
                          YES
                           │
                           ▼
               ┌────────────────────────┐
               │       VICTORY!         │
               └───────────┬────────────┘
                           │
                           ▼
               ┌────────────────────────┐
               │    CONCEPT BRIDGE      │
               └────────────────────────┘
```

---

## 🎨 VISUAL STATES

### Avatar States

```
╔═══════════════════════════════════════════════════════════════╗
║                    AVATAR VISUAL STATES                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  BLUE AVATAR          ORANGE AVATAR        BOTH ALIGNED       ║
║  ┌─────────┐          ┌─────────┐          ┌───┐   ┌───┐     ║
║  │   🔵    │          │   🟠    │          │ 🔵│   │🟠 │     ║
║  │ ~~~~~~ │          │ ~~~~~~ │          │   │───│   │     ║
║  └─────────┘          └─────────┘          └───┘   └───┘     ║
║  Blue glow            Orange glow          Light beam         ║
║  Trail: blue          Trail: orange        connects them      ║
║                                                               ║
║  OBSTACLE HIT         COLLECTING ORB       AT GOAL           ║
║  ┌─────────┐          ┌─────────┐          ┌─────────┐       ║
║  │   💥    │          │   ✨    │          │   ⭐    │       ║
║  │ RESET!  │          │  +1 ORB │          │ ARRIVED │       ║
║  └─────────┘          └─────────┘          └─────────┘       ║
║  Red flash            Sparkle burst        Golden glow        ║
║  Both reset           Auto-collected       Pulse effect       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Symmetry Orbs
```
ORB DESIGN:

    ◇  Diamond shape
   /░\  Inner glow
  /░░░\ Pulsing
  \░░░/ animation
   \░/
    ◇

Blue bank orbs: Cyan tint
Orange bank orbs: Orange tint

When collected:
- Orb shatters into particles
- Both paired orbs vanish simultaneously
- Counter updates: "Orbs: 2/8"
```

### Light Trail Effect
```
AVATAR TRAILS:

Both avatars leave light trails behind them:

Blue Avatar:
  ────●────────●────────●
  fading ← ── ← ── ← current position

Orange Avatar:
  ●────────●────────●────
  current position → ── → fading

Trails help visualize the mirror relationship.
```

### Symmetry Meter
```
SYMMETRY METER:

Shows how "in sync" the avatars are:

    PERFECT SYMMETRY
    ═══════════════════
    [████████████████] 100%
    
    SLIGHTLY OFF
    ═══════════════════
    [████████████░░░░] 80%
    
    BROKEN (obstacle hit)
    ═══════════════════
    [████░░░░░░░░░░░░] 20%
    
When symmetry breaks (obstacle), meter drops and resets.
```

---

## 🔧 INTERACTION MECHANICS

### Movement Controls
```javascript
function handleInput(input: Input): void {
  // Blue avatar moves normally
  blueAvatar.velocity = {
    x: input.left ? -SPEED : (input.right ? SPEED : 0),
    y: input.up ? -SPEED : (input.down ? SPEED : 0)
  };
  
  // Orange avatar mirrors horizontal
  orangeAvatar.velocity = {
    x: input.left ? SPEED : (input.right ? -SPEED : 0), // FLIPPED!
    y: input.up ? -SPEED : (input.down ? SPEED : 0)     // Same
  };
}
```

### Obstacle Collision
```
COLLISION HANDLING:

If EITHER avatar hits an obstacle:
1. Screen flash (split: blue left, orange right)
2. "SYMMETRY BROKEN!" text
3. Camera shake
4. Both avatars reset to last checkpoint
5. Orbs collected since checkpoint are lost

Checkpoints:
- Start position
- After each section (3 sections total)
```

### Orb Collection
```
ORB COLLECTION LOGIC:

Orbs are paired (mirror positions).
When blue avatar collects orb at (200, 300):
- Blue orb vanishes
- Orange orb at (1080, 300) also vanishes
- Both count as collected

This reinforces: Two pointers process PAIRS!
```

---

## 💡 HINT SYSTEM

### Progressive Hints
| Hint # | Content | Effect |
|--------|---------|--------|
| 1 | "Both avatars move at once. Watch the orange one!" | Awareness |
| 2 | "Left/Right are flipped for orange. Up/Down are same." | Rule clarification |
| 3 | "Plan your path so BOTH avatars avoid rocks." | Strategy |

### Visual Path Preview
```
HINT MODE:

Shows ghost paths for both avatars:

Blue Path:   ····→····→····↓
Orange Path: ←····←····↓····

Helps player visualize the mirrored movement.
```

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(resets: number, orbsCollected: number): number {
  const allOrbs = orbsCollected === 8;
  
  if (resets === 0 && allOrbs) return 3;     // Perfect run
  if (resets <= 2 && allOrbs) return 2;      // Minor mistakes
  return 1;                                   // Completed
}
```

### Progression Points
- Completion: 20 points
- All orbs: +5 points
- No resets: +10 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Movement | Dual footsteps (slightly offset) | `dual_steps.wav` | 0.15s |
| Orb collect | Harmonic chime (two notes) | `orb_collect.wav` | 0.4s |
| Obstacle hit | Discord + splash | `symmetry_break.wav` | 0.5s |
| Checkpoint reached | Relief tone | `checkpoint.wav` | 0.3s |
| Both at goals | Triumphant harmony | `mirror_complete.wav` | 1.0s |

### Dual Audio Pan
```
STEREO POSITIONING:

Blue avatar sounds: Pan LEFT
Orange avatar sounds: Pan RIGHT

Creates spatial awareness of both positions.
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Convergence Monk)
```
CONVERGENCE MONK:
"*eyes closed, serene*

Be still. Listen.

The rivers speak different languages, yet
they say the same thing.

When you walk the Mirror Walk, you will move
two bodies with one mind.

What the left does, the right mirrors.
Press left, and blue goes left... but orange
goes RIGHT.

This is the way of the two pointers.
Both track position. Both move together.
But they face opposite directions.

Collect the symmetry orbs. Reach both goals.
And do not break the symmetry."
```

### On Obstacle Hit
```
CONVERGENCE MONK: (brief)
"Symmetry broken. Begin again from
your last point of balance."
```

### On Completion
```
CONVERGENCE MONK:
"*opens eyes*

You have walked the mirror path.
Two positions, tracked as one.

In algorithms, we call this 'two pointers.'
One starts at the beginning.
One starts at the end.
They move toward each other—or apart—
always in relation.

You will use this pattern in all that follows."
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You controlled two avatars at once!
One on the blue bank, one on the orange.

When you pressed left, blue went left...
but orange went RIGHT.

You had to think about BOTH positions
simultaneously. That's the core insight!"
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"This is the TWO POINTERS pattern.

Imagine you have an array:
[1, 2, 3, 4, 5, 6, 7, 8, 9]

Instead of one index, you use TWO:
- Left pointer at position 0
- Right pointer at position 8

They can move toward each other, away,
or in any pattern. But you track BOTH.

Your blue avatar was the left pointer.
Your orange avatar was the right pointer.
The mirrored movement? That's how they
often move in opposite directions!"
```

### Section 3: Pseudocode Walkthrough
```
TWO POINTERS SETUP:

array = [data...]
left = 0              // Start of array
right = array.length - 1  // End of array

while left < right:
    // Process array[left] and array[right]
    // Move pointers based on condition
    
    if some_condition:
        left += 1     // Blue moves right
    else:
        right -= 1    // Orange moves left

This is EXACTLY what you did physically!
```

### Section 4: Mini-Forge Practice
```
TWO POINTERS CHALLENGE:

Array: [1, 3, 5, 7, 9]
       ↑           ↑
      left       right

Question: If left moves RIGHT once,
what is the new value at left?

[1] [3] [5] [7] [9]

CORRECT: 3 ✓

left was at index 0 (value 1).
After moving right, left is at index 1 (value 3).
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Two Pointers Pattern

"Two eyes see more than one.
 Two pointers traverse faster than one."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: TWO POINTERS PATTERN

### What You Felt
You controlled two avatars—one on each river bank. Moving left made them go opposite directions horizontally. You tracked both positions to navigate and collect orbs.

### Plain Explanation
- **Two Pointers** means using two indices to traverse data
- Often one starts at the beginning, one at the end
- They can move toward each other (convergent)
- Or move in the same direction at different speeds (fast/slow)
- Reduces many O(n²) problems to O(n)!

### Pattern Steps
1. INITIALIZE two pointers (left = start, right = end)
2. LOOP while pointers haven't crossed/met
3. PROCESS elements at both pointer positions
4. MOVE pointers based on conditions
5. TERMINATE when condition met or pointers cross

### Real World Applications
- 🔍 Palindrome checking: Compare from both ends
- 🎯 Two Sum on sorted array: Find pair summing to target
- 📊 Merging sorted arrays: Pointer in each
- 🚿 Container with most water: Width × height optimization
- 🔗 Linked list cycle detection: Fast and slow pointers
- ✂️ Removing duplicates: Read and write pointers

### Unlocked Ability
You now understand that **two pointers let you process data from multiple directions simultaneously**. This cuts down time complexity dramatically.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_TR1_Scene configuration
{
  key: 'Puzzle_TR1_Scene',
  parent: 'BasePuzzleScene',
  
  blueAvatar: {
    start: { x: 200, y: 100 },
    goal: { x: 200, y: 600 }
  },
  
  orangeAvatar: {
    start: { x: 1080, y: 100 },
    goal: { x: 1080, y: 600 }
  },
  
  obstacles: [
    { side: 'blue', position: { x: 150, y: 250 } },
    { side: 'orange', position: { x: 1130, y: 250 } }, // Mirrored!
    // ... more obstacles
  ],
  
  orbs: [
    { blue: { x: 250, y: 200 }, orange: { x: 1030, y: 200 } },
    { blue: { x: 200, y: 350 }, orange: { x: 1080, y: 350 } },
    // ... 4 pairs total
  ],
  
  checkpoints: [
    { y: 100 },  // Start
    { y: 300 },  // Section 1 complete
    { y: 500 }   // Section 2 complete
  ]
}
```

### State Machine
```
States:
- IDLE (before start)
- INTRO (monk dialogue)
- PLAYING (both avatars active)
- COLLISION (obstacle hit, resetting)
- CHECKPOINT (reached safe point)
- VICTORY (both at goals, all orbs)
- CONCEPT_BRIDGE
```

### Dual Avatar Controller
```typescript
class DualAvatarController {
  blue: Avatar;
  orange: Avatar;
  
  move(input: InputState): void {
    const speed = 200;
    
    // Blue moves normally
    this.blue.setVelocity(
      input.horizontal * speed,
      input.vertical * speed
    );
    
    // Orange mirrors horizontal
    this.orange.setVelocity(
      -input.horizontal * speed,  // FLIPPED
      input.vertical * speed
    );
  }
  
  checkCollisions(): boolean {
    return this.blue.hitsObstacle() || this.orange.hitsObstacle();
  }
}
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] Both avatars spawn correctly
- [ ] Mirror movement works (left/right flipped)
- [ ] Vertical movement is same for both
- [ ] Obstacles block on both sides
- [ ] Collision resets both avatars
- [ ] Orbs collect in pairs
- [ ] Victory triggers when both at goals

### Visual
- [ ] Both avatars render with distinct colors
- [ ] Trails show movement history
- [ ] Symmetry meter updates
- [ ] Orb collection effects play

### Audio
- [ ] Stereo panning works
- [ ] Dual footsteps are audible
- [ ] Collision sound is dramatic

### Edge Cases
- [ ] Can't move during reset animation
- [ ] Checkpoint saves correctly
- [ ] All 8 orbs required for 3 stars

---

*"Two paths that seem opposed often lead to the same truth."*
— Convergence Monk

