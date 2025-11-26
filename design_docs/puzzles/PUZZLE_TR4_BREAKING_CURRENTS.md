# PUZZLE TR-4: BREAKING THE CURRENTS

> *"The storm tests what calm waters cannot."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | TR-4 |
| **Name** | Breaking the Currents |
| **Region** | Twin Rivers |
| **Difficulty** | ★★★☆☆ |
| **Time Limit** | Per-challenge (see below) |
| **Concept Taught** | Advanced Pointer Logic, Robustness Under Interference |

### Core Mechanic
Player must apply all previously learned pointer techniques (mirroring, convergence, sliding window) while **currents** actively interfere by pushing pointers off position. This tests robustness and adaptation.

### Why This Puzzle Is The Ultimate Test
- **Active Interference**: The river fights back
- **All Techniques**: Must use TR-1, TR-2, TR-3 skills
- **Adaptation**: Maintain algorithm invariants despite chaos
- **Real-World Prep**: Code must handle edge cases and errors

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Arena Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                       TURBULENT JUNCTION                                       ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     ⚓ CURRENT KEEPER                                                          ║
║     "Hold steady through the storm!"                                           ║
║                                                                                ║
║     ┌─────────────────────────────────────────────────────────────────────┐   ║
║     │                                                                     │   ║
║     │     ≈≈≈≈≈≈≈≈≈≈≈ BLUE RIVER ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈      │   ║
║     │     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    │   ║
║     │         ↑ ↑ ↑ CURRENTS ↑ ↑ ↑                                       │   ║
║     │                                                                     │   ║
║     │     ┌───────────────────────────────────────────────────────┐      │   ║
║     │     │         CHALLENGE AREA (changes per challenge)        │      │   ║
║     │     │                                                       │      │   ║
║     │     │   Challenge 1: Symmetry                               │      │   ║
║     │     │   Challenge 2: Convergence                            │      │   ║
║     │     │   Challenge 3: Sliding Window                         │      │   ║
║     │     │                                                       │      │   ║
║     │     └───────────────────────────────────────────────────────┘      │   ║
║     │                                                                     │   ║
║     │         ↓ ↓ ↓ CURRENTS ↓ ↓ ↓                                       │   ║
║     │     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    │   ║
║     │     ≈≈≈≈≈≈≈≈≈≈≈ ORANGE RIVER ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈      │   ║
║     │                                                                     │   ║
║     └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                                ║
║     CHALLENGE: 1/3          TIME: 28s          STABILITY: 85%                 ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### Current Mechanics
```
╔═══════════════════════════════════════════════════════════════╗
║                    CURRENT SYSTEM                             ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║   Every 2 seconds, a CURRENT strikes!                        ║
║                                                               ║
║   WARNING (0.5s before):                                     ║
║   ┌─────────────────────────────────────┐                    ║
║   │  ⚠️ CURRENT INCOMING! ⚠️            │                    ║
║   │  Direction: [← LEFT] or [→ RIGHT]   │                    ║
║   │  Strength: ±1 position              │                    ║
║   └─────────────────────────────────────┘                    ║
║                                                               ║
║   EFFECT:                                                    ║
║   • Pushes pointer(s) by 1 position                         ║
║   • Player must compensate immediately                       ║
║   • If not corrected, algorithm invariant breaks             ║
║                                                               ║
║   VISUAL:                                                    ║
║   ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈                               ║
║        →→→→→→→→→→→→→→→→                                      ║
║   CURRENT WAVE                                               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🎯 THREE CHALLENGES

### Challenge 1: MAINTAIN SYMMETRY

> *"Keep them equidistant from the center, no matter the storm."*

#### Duration: 30 seconds

#### Setup
```
SYMMETRY CHALLENGE:

Center line at position 5

    [0] [1] [2] [3] [4]│[5]│[6] [7] [8] [9] [10]
                   🔵 │ │ 🟠
                      │ │
                      └─┘
                    CENTER

Goal: Keep both pointers equidistant from center.
      distance(blue, center) = distance(orange, center)
```

#### Mechanics
- Blue and Orange pointers start at symmetric positions (4 and 6)
- Currents randomly push one pointer
- Player must move the OTHER pointer to maintain symmetry
- Symmetry meter shows percentage of time symmetric

#### Controls
```
← : Move BLUE left (or ORANGE right to balance)
→ : Move ORANGE right (or BLUE left to balance)

When current pushes Blue right:
  → Blue is now at 5
  → Orange must also move (right to 7) to maintain symmetry
  → Or move Blue back left to 4
```

#### Victory Condition
- Maintain 80%+ symmetry over 30 seconds
- Current strikes every 2 seconds (15 currents total)

---

### Challenge 2: CONVERGENCE UNDER FIRE

> *"Find the sum while the rivers push you apart."*

#### Duration: 45 seconds

#### Setup
```
CONVERGENCE CHALLENGE:

Array: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18]
Target: 20

    [1] [2] [4] [6] [8] [10] [12] [14] [16] [18]
     🔵                                     🟠

Standard two-pointer convergence, BUT:
Currents push pointers OUTWARD (away from each other)!
```

#### Mechanics
- Standard convergent two-pointer problem
- Currents push pointers away from center
- Player must fight toward the answer while compensating

#### Current Behavior
```
OUTWARD CURRENTS:

Every 2.5 seconds:
- Blue pushed LEFT (toward start)
- Orange pushed RIGHT (toward end)

Player must:
1. Move toward target sum
2. Compensate for currents pushing them apart
```

#### Victory Condition
- Find pair summing to 20 (e.g., 2+18, 4+16, 6+14, 8+12)
- Within 45 seconds despite current interference

---

### Challenge 3: WINDOW IN THE STORM

> *"Your window will be buffeted. Capture the patterns anyway."*

#### Duration: 60 seconds

#### Setup
```
WINDOW CHALLENGE:

Stream: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
Targets: Find windows summing to [8, 15, 20] (3 patterns)

Current effects:
- Can EXPAND your window unexpectedly
- Can SHRINK your window unexpectedly
```

#### Mechanics
- Three target patterns to capture
- Currents randomly expand OR shrink window
- Player must maintain control while capturing targets

#### Current Effects
```
WINDOW CURRENTS:

Expand Current (50% chance):
  - Window right edge moves right
  - Sum increases unexpectedly

Shrink Current (50% chance):
  - Window left edge moves right
  - Sum decreases unexpectedly

Player must correct and continue!
```

#### Victory Condition
- Capture all 3 target patterns
- Within 60 seconds
- Despite window manipulation by currents

---

## 🎨 VISUAL STATES

### Current Warning System
```
╔═══════════════════════════════════════════════════════════════╗
║                    CURRENT WARNING                            ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  0.5 SECONDS BEFORE STRIKE:                                  ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────┐     ║
║  │                                                     │     ║
║  │    ⚡ CURRENT INCOMING ⚡                           │     ║
║  │                                                     │     ║
║  │    ═══════════════════════════════                 │     ║
║  │    → → → → → → → → → → → → →                       │     ║
║  │    DIRECTION: RIGHT                                │     ║
║  │    ═══════════════════════════════                 │     ║
║  │                                                     │     ║
║  └─────────────────────────────────────────────────────┘     ║
║                                                               ║
║  AT STRIKE:                                                  ║
║                                                               ║
║  Screen flash (blue or orange depending on affected pointer) ║
║  Pointer slides 1 position                                   ║
║  Sound: Rushing water + impact                               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Stability Meter
```
STABILITY DISPLAY:

    STABILITY: [████████████░░░░░░░░] 62%
    
    100% = Perfect maintenance of algorithm invariant
    80%+ = Victory threshold
    50%- = Struggling
    0%   = Algorithm broken
    
Colors:
- 80-100%: Green
- 50-79%: Yellow
- 0-49%: Red
```

### Challenge Transition
```
BETWEEN CHALLENGES:

╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║            ✓ CHALLENGE 1 COMPLETE!                           ║
║                                                               ║
║            Symmetry Maintained: 87%                          ║
║            Currents Survived: 15                             ║
║                                                               ║
║            ─────────────────────                             ║
║                                                               ║
║            CHALLENGE 2: CONVERGENCE                          ║
║            "Find the sum while fighting the current"         ║
║                                                               ║
║            [CONTINUE]                                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🔧 INTERACTION MECHANICS

### Challenge 1 Controls (Symmetry)
```
← : Move Blue LEFT
→ : Move Orange RIGHT
A : Move Blue RIGHT
D : Move Orange LEFT

Goal: After each current, restore symmetry.
```

### Challenge 2 Controls (Convergence)
```
← : Move Blue RIGHT (toward center)
→ : Move Orange LEFT (toward center)

Same as TR-2, but must also compensate for currents.
```

### Challenge 3 Controls (Window)
```
→ : Expand window
← : Shrink window
SPACE : Confirm capture (when sum matches target)

Must capture target while currents manipulate window.
```

---

## 💡 HINT SYSTEM

### Challenge-Specific Hints

**Challenge 1:**
| Hint # | Content |
|--------|---------|
| 1 | "When a current hits one pointer, move the OTHER one to match." |
| 2 | "Watch the warning! Prepare your compensation move." |

**Challenge 2:**
| Hint # | Content |
|--------|---------|
| 1 | "Currents push you apart. Keep moving toward the middle!" |
| 2 | "After each current, recalculate: sum too big or too small?" |

**Challenge 3:**
| Hint # | Content |
|--------|---------|
| 1 | "Currents change your window. Adjust and keep looking for targets." |
| 2 | "Don't panic when sum changes—just expand or shrink to recover." |

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(challenges: ChallengeResult[]): number {
  const allComplete = challenges.every(c => c.complete);
  const avgStability = challenges.reduce((sum, c) => sum + c.stability, 0) / 3;
  const totalTime = challenges.reduce((sum, c) => sum + c.time, 0);
  
  if (allComplete && avgStability >= 90) return 3;
  if (allComplete && avgStability >= 75) return 2;
  if (allComplete) return 1;
  return 0; // Didn't complete all challenges
}
```

### Progression Points
- All challenges complete: 40 points
- High stability (avg 90%+): +20 points
- Fast completion: +10 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Current warning | Rising alarm | `current_warning.wav` | 0.5s |
| Current strike | Rushing water + thud | `current_strike.wav` | 0.4s |
| Symmetry restored | Harmony chime | `symmetry_restored.wav` | 0.3s |
| Symmetry broken | Dissonance | `symmetry_broken.wav` | 0.3s |
| Target captured | Achievement | `target_captured.wav` | 0.5s |
| Challenge complete | Fanfare | `challenge_complete.wav` | 1.0s |

### Dynamic Music
```
MUSIC INTENSITY:

Stability 80-100%: Calm undertone
Stability 50-79%: Tension building
Stability 30-49%: Dramatic strings
Stability 0-29%: Critical urgency
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Current Keeper)
```
CURRENT KEEPER:
"*taps staff on ground*

These waters are treacherous, young one.

The currents here don't play nice. They'll
push your pointers off course. They'll
expand your window when you want it small.

You've learned the techniques in calm waters.
Now prove you can hold them in the storm.

Three challenges await:
1. Maintain symmetry while currents push
2. Find the sum while currents separate
3. Capture patterns while currents disturb

This is the final test before the Serpent."
```

### Between Challenges
```
CURRENT KEEPER:

[After Challenge 1]:
"You held the symmetry! The rivers respect you."

[After Challenge 2]:
"You found the sum despite the chaos. Impressive."

[After Challenge 3]:
"The window obeyed your will, not the current's.
 You are ready for the Serpent."
```

### On Completion
```
CURRENT KEEPER:
"*nods with respect*

You held steady. Through chaos, you maintained
your algorithms. That's the mark of true mastery.

Real problems don't come clean. Data is messy.
Systems fail. Networks hiccup. But the core
logic? That must remain solid.

You've proven your robustness. The Serpent awaits."
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### What You Learned
```
PROFESSOR NODE:
"You applied every pointer technique while
external forces tried to disrupt you.

This is the reality of real systems:
- Networks have latency
- Users input bad data
- Hardware fails randomly

Your algorithms must be ROBUST.
They must handle interference gracefully.
You just proved they can."
```

### Codex Entry: Advanced Pointer Techniques
```
ROBUSTNESS IN ALGORITHMS:

1. INVARIANT MAINTENANCE
   Keep your algorithm's core properties
   even when inputs change unexpectedly.

2. ERROR COMPENSATION
   When something goes wrong, correct it
   and continue—don't start over.

3. GRACEFUL DEGRADATION
   If perfect isn't possible, get as
   close as you can.

You experienced all three in the currents!
```

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_TR4_Scene configuration
{
  key: 'Puzzle_TR4_Scene',
  parent: 'BasePuzzleScene',
  
  challenges: [
    {
      type: 'symmetry',
      duration: 30,
      currentInterval: 2,
      targetStability: 0.80
    },
    {
      type: 'convergence',
      duration: 45,
      currentInterval: 2.5,
      target: 20,
      array: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18]
    },
    {
      type: 'window',
      duration: 60,
      currentInterval: 2,
      stream: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3],
      targets: [8, 15, 20]
    }
  ]
}
```

### State Machine
```
States:
- IDLE
- INTRO
- CHALLENGE_1_ACTIVE
- CHALLENGE_1_COMPLETE
- CHALLENGE_2_ACTIVE
- CHALLENGE_2_COMPLETE
- CHALLENGE_3_ACTIVE
- CHALLENGE_3_COMPLETE
- ALL_COMPLETE
- CONCEPT_BRIDGE
```

---

## 🧪 TESTING CHECKLIST

### Challenge 1 (Symmetry)
- [ ] Currents push correctly
- [ ] Symmetry calculation accurate
- [ ] 80% threshold works
- [ ] Timer functions properly

### Challenge 2 (Convergence)
- [ ] Currents push outward
- [ ] Sum calculation correct
- [ ] Victory on finding target

### Challenge 3 (Window)
- [ ] Currents expand/shrink window
- [ ] All 3 targets capturable
- [ ] Proper capture confirmation

### Overall
- [ ] Challenge transitions smooth
- [ ] Stability meter updates
- [ ] All challenges completable
- [ ] Victory triggers correctly

---

*"The storm reveals what calm waters hide."*
— Current Keeper

