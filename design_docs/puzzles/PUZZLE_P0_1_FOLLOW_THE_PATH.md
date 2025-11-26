# PUZZLE P0-1: FOLLOW THE PATH

> *"Watch. Remember. Walk. The pattern is the path."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | P0-1 |
| **Name** | Follow the Path |
| **Region** | Prologue - Chamber of Flow |
| **Difficulty** | ★☆☆☆☆ (Tutorial) |
| **Time Limit** | None |
| **Concept Taught** | Sequential Processing, Pattern Memory, Iteration |

### Core Mechanic
Player watches a sequence of tiles light up, then must step on them in the exact same order. Classic "Simon Says" memory game translated into spatial movement.

### Why This Puzzle First
- **Intuitive**: Everyone understands "repeat what you see"
- **Physical**: Player WALKS the pattern, not just clicks
- **Foundational**: Every algorithm is just "steps in order"
- **Confidence Building**: Achievable, but feels like an accomplishment

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Tile Arrangement
```
          ┌───┐
          │ 2 │
     ┌───┐└───┘┌───┐
     │ 1 │     │ 3 │
     └───┘     └───┘
              ┌───┐
     ┌───┐    │ 4 │
     │ 0 │    └───┘
     └───┘┌───┐
          │ 5 │
          └───┘

Tile positions form a loose, organic path
NOT a grid - feels natural to walk through
```

#### Tile Specifications
| Property | Value |
|----------|-------|
| **Count** | 6 tiles |
| **Size** | 64×64 pixels (on-screen) |
| **Shape** | Circular or hexagonal |
| **Spacing** | ~100px between adjacent tiles |
| **Base Color** | Gray (#4a5568) |
| **Glow Color** | Cyan (#06b6d4) |

### Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    PUZZLE P0-1 FLOW                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   PLAYER APPROACHES    │
              │   (Trigger Zone)       │
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │   INTRO DIALOGUE       │
              │  "Watch closely..."    │
              └───────────┬────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ ROUND 1 │  →   │ ROUND 2 │  →   │ ROUND 3 │
   │ 3 tiles │      │ 4 tiles │      │ 5 tiles │
   └────┬────┘      └────┬────┘      └────┬────┘
        │                │                 │
        ▼                ▼                 ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ SHOW    │      │ SHOW    │      │ SHOW    │
   │ PATTERN │      │ PATTERN │      │ PATTERN │
   └────┬────┘      └────┬────┘      └────┬────┘
        │                │                 │
        ▼                ▼                 ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ PLAYER  │      │ PLAYER  │      │ PLAYER  │
   │ REPEATS │      │ REPEATS │      │ REPEATS │
   └────┬────┘      └────┬────┘      └────┬────┘
        │                │                 │
        ▼                ▼                 ▼
   SUCCESS? ──NO──▶ RETRY ROUND      PUZZLE
        │                                COMPLETE!
       YES                                  │
        │                                   ▼
        └─────────────▶───────────▶ CONCEPT BRIDGE
```

### Round Structure

| Round | Tiles in Sequence | Timing |
|-------|-------------------|--------|
| 1 | 3 | 1.0s glow, 0.3s gap |
| 2 | 4 | 1.0s glow, 0.3s gap |
| 3 | 5 | 1.0s glow, 0.3s gap |

### Pattern Generation
```javascript
// Patterns are randomized but follow rules:
// - No immediate repeats (tile can't glow twice in a row)
// - Path should feel "walkable" (prefer adjacent tiles)

function generatePattern(length) {
  const pattern = [];
  const tileCount = 6;
  let lastTile = -1;
  
  for (let i = 0; i < length; i++) {
    let next;
    do {
      next = Math.floor(Math.random() * tileCount);
    } while (next === lastTile);
    
    pattern.push(next);
    lastTile = next;
  }
  
  return pattern;
}
```

---

## 🎨 VISUAL STATES

### Tile States

```
┌─────────────────────────────────────────────────────────────┐
│                      TILE VISUAL STATES                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INACTIVE          GLOWING           PLAYER STANDING        │
│  ┌───────┐         ┌───────┐         ┌───────┐             │
│  │       │         │ ░░░░░ │         │▓▓▓▓▓▓▓│             │
│  │  [1]  │         │ ░[1]░ │         │▓ [1] ▓│             │
│  │       │         │ ░░░░░ │         │▓▓▓▓▓▓▓│             │
│  └───────┘         └───────┘         └───────┘             │
│  Gray #4a5568      Cyan #06b6d4      Golden outline        │
│  60% opacity       Pulse + particles  100% opacity         │
│                                                             │
│  CORRECT STEP      WRONG STEP        LOCKED (complete)     │
│  ┌───────┐         ┌───────┐         ┌───────┐             │
│  │ ✓✓✓✓✓ │         │ ✗✗✗✗✗ │         │  ✓✓✓  │             │
│  │ ✓[1]✓ │         │ ✗[1]✗ │         │ ✓[1]✓ │             │
│  │ ✓✓✓✓✓ │         │ ✗✗✗✗✗ │         │  ✓✓✓  │             │
│  └───────┘         └───────┘         └───────┘             │
│  Green flash       Red flash         Green glow            │
│  + chime           + shake           Checkmark overlay     │
│  + particles       + crack effect                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visual Effects

#### Tile Glow Animation (Pattern Display)
```
Timeline (1.0 second):
0.0s - Tile begins to glow
0.1s - Scale up to 1.15x
0.2s - Particle burst (8 particles, outward)
0.5s - Peak brightness
0.8s - Begin fade
1.0s - Return to inactive

Color progression:
#4a5568 → #06b6d4 → #00ffff → #06b6d4 → #4a5568
```

#### Player Step Feedback
```
CORRECT:
- Tile flashes green (#22c55e) for 200ms
- Small chime sound
- 6-particle burst in green
- Progress dot fills

WRONG:
- All tiles flash red (#ef4444) for 300ms
- Camera shake (200ms, 0.01 intensity)
- Dissonant buzz sound
- Progress resets visually
```

### UI Elements

#### Round Indicator
```
┌─────────────────────────────────────┐
│       ROUND  2  /  3                │
│       ═══════════════               │
└─────────────────────────────────────┘

Position: Top center of puzzle area
Font: "Press Start 2P", 16px
Color: Cyan (#06b6d4)
```

#### Status Text
```
Various states:
- "Get ready..." (pre-pattern)
- "Watch carefully..." (showing pattern)
- "Your turn! Repeat the sequence." (player phase)
- "Wrong! Try again..." (failure, red text)
- "Excellent! Next round..." (success)
- "Pattern mastered!" (completion)

Position: Bottom center
Font: Monospace, 14px
Color: Gray (#9ca3af), changes for states
```

#### Progress Dots
```
Round 2 example (4 tiles to repeat):

    ●  ●  ○  ○
   ───────────
   Done  Done  Pending

Position: Below status text
Dot size: 12px diameter
Filled: #06b6d4 (cyan)
Empty: #4a4a6a (dark gray)
```

---

## 🔧 INTERACTION MECHANICS

### Trigger Zone
- Player entering puzzle area (48px radius from center)
- OR stepping on first tile
- Triggers intro sequence

### Player Input
| Input | Action |
|-------|--------|
| **Walk to tile** | Move player character |
| **Step on tile** | Register as sequence input |
| **ESC** | Exit puzzle (with confirmation) |
| **H** | Request hint (limited) |

### Collision & Feedback
```
Player steps on tile:
1. Check if player turn is active
2. Get tile index
3. Compare to expected next in sequence
4. If correct:
   - Play success feedback
   - Add to player sequence
   - Check if round complete
5. If wrong:
   - Play failure feedback
   - Reset player sequence
   - Replay pattern (same round)
```

---

## 💡 HINT SYSTEM

### Hint Progression
| Hint # | Content | Effect |
|--------|---------|--------|
| 1 | "Watch the entire pattern before moving." | Text only |
| 2 | "The first tile in this round is [highlights tile]." | Visual highlight |
| 3 | "Showing the pattern again at half speed..." | Replay at 0.5x |

### Hint Rules
- Hints available after 2 failures in same round
- Each hint used reduces star rating potential
- Max 3 hints per puzzle run
- Hint button appears contextually

---

## ⭐ SCORING & STARS

### Star Calculation
```
function calculateStars(mistakes, hintsUsed) {
  // 3 stars: Perfect run
  if (mistakes === 0 && hintsUsed === 0) return 3;
  
  // 2 stars: Minor struggles
  if (mistakes <= 2 && hintsUsed <= 1) return 2;
  
  // 1 star: Completed
  return 1;
}
```

### Progression Points
- Completion: 10 points
- 3-star bonus: +5 points
- First-time completion: +3 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Pattern tile glow | Rising chime (pitch varies by tile index) | `tile_glow_[0-5].wav` | 0.3s |
| Player step (correct) | Bright ding | `step_correct.wav` | 0.2s |
| Player step (wrong) | Dissonant buzz | `step_wrong.wav` | 0.3s |
| Round complete | Ascending arpeggio | `round_complete.wav` | 0.5s |
| Puzzle complete | Celebratory flourish | `puzzle_complete.wav` | 1.0s |
| Hint requested | Soft notification | `hint_chime.wav` | 0.2s |

### Music Behavior
- Region ambient continues during puzzle
- Add subtle rhythmic element during pattern display
- Victory music override on completion

---

## 📜 DIALOGUE SCRIPT

### Intro (Rune Keeper NPC)
```
RUNE KEEPER:
"The runes remember. They remember the order
of all things—first, then second, then third.

Watch them glow. Remember their song. Then
walk the path they show you.

This is how machines process a sequence. One
step at a time, in perfect order.

Are you ready?"

[YES - Begin puzzle]
[NOT YET - Remind me of the rules]
```

### On Failure
```
PROFESSOR NODE: (appears briefly)
"Try again. The pattern remains the same.
Watch, then walk."
```

### On Completion
```
RUNE KEEPER:
"You've done it! You walked the path of
the ancients. The sequence is yours.

This skill—following a defined order—is
the foundation of all algorithms.

Seek the Concept Bridge to understand
what you've truly learned."
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You watched tiles light up, one by one.
You memorized the order. Then you walked
that exact same path.

That's not just a memory game—that's how
computers think. Let me show you."
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"What you did has a name: SEQUENTIAL PROCESSING.

It means going through things ONE AT A TIME,
in a SPECIFIC ORDER.

Every computer program, from games to websites
to rockets, is just following sequences of steps.
First this, then that, then the next thing."
```

### Section 3: Pseudocode Walkthrough
```
THE PATTERN YOU FOLLOWED:

sequence = [tile_0, tile_2, tile_3, tile_5, tile_1]

for each tile in sequence:
    glow(tile)
    wait(1 second)
    stop_glow(tile)

You did the same thing:

for each tile in sequence:
    walk_to(tile)
    step_on(tile)
```

### Section 4: Mini-Forge Practice
```
ARRANGE THESE STEPS IN ORDER:

[Drag and drop boxes]

[ ] Walk onto each tile in order
[ ] Watch the tiles light up  
[ ] Remember the sequence

CORRECT ORDER:
1. Watch the tiles light up
2. Remember the sequence
3. Walk onto each tile in order
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Sequential Processing & Loops

"Every journey of a thousand steps
 begins with step[0]."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: SEQUENTIAL PROCESSING

### What You Felt
You watched tiles light up one by one, memorized the order, then repeated it back by walking the same path.

### Plain Explanation
- **Sequential** means "in order, one after another"
- Computers can't look at everything at once—they process one item at a time
- The ORDER of operations matters (first tile, second tile, etc.)
- A **loop** is just doing the same action for each item in a sequence

### Pattern Steps
1. START at the beginning of a sequence
2. PROCESS the current item (in this case, step on the tile)
3. MOVE to the next item
4. REPEAT until you reach the end
5. DONE when all items are processed

### Real World Applications
- 📺 Video player: Shows frames one after another (24+ per second!)
- 🎵 Music: Notes played in sequence create melodies
- 📝 Reading: You read words left to right, one at a time
- 🍳 Recipes: Follow steps in order (can't frost before baking!)
- 🧬 DNA: Genetic code is read sequentially
- 📦 Assembly lines: Each station does one step

### Unlocked Ability
You now understand that **order matters** in algorithms. When you see a "for loop" in code, you'll know it's just doing what you did—going through items one at a time, in sequence.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Setup
```typescript
// Puzzle_P0_1_Scene configuration
{
  key: 'Puzzle_P0_1_Scene',
  parent: 'BasePuzzleScene',
  
  tiles: {
    count: 6,
    size: 64,
    spacing: 100,
    arrangement: 'organic_path' // Not grid
  },
  
  rounds: [
    { length: 3, speed: 1.0 },
    { length: 4, speed: 1.0 },
    { length: 5, speed: 1.0 }
  ],
  
  timing: {
    glowDuration: 1000, // ms
    gapDuration: 300,   // ms
    playerTimeout: null // No time limit
  }
}
```

### State Machine
```
States:
- IDLE (waiting to start)
- INTRO (showing dialogue)
- SHOWING_PATTERN (tiles glowing in sequence)
- PLAYER_TURN (waiting for player input)
- FEEDBACK_CORRECT (brief success animation)
- FEEDBACK_WRONG (brief failure animation)
- ROUND_COMPLETE (transition to next round)
- PUZZLE_COMPLETE (victory state)
- CONCEPT_BRIDGE (learning moment)
```

### Performance Targets
- Pattern display: 60 FPS maintained
- Input latency: < 50ms response
- Particle effects: < 50 active at once
- Memory: < 20MB for puzzle scene

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] Pattern generates correctly (no immediate repeats)
- [ ] All 6 tiles are reachable
- [ ] Correct step registers properly
- [ ] Wrong step triggers failure state
- [ ] Round progression works
- [ ] Puzzle completion triggers
- [ ] Stars calculate correctly

### Visual
- [ ] Tiles glow at correct timing
- [ ] Player feedback is visible
- [ ] Progress dots update
- [ ] Status text is readable
- [ ] Particles don't obstruct gameplay

### Audio
- [ ] Tile chimes play in sequence
- [ ] Correct/wrong sounds distinct
- [ ] Victory sound plays
- [ ] No audio overlapping issues

### Edge Cases
- [ ] Player can't move during pattern display
- [ ] Rapid clicking doesn't break state
- [ ] Exit and resume works
- [ ] Hint system functions correctly

---

*"The first step is always the hardest. The second step is just repeating the first."*
— Rune Keeper

