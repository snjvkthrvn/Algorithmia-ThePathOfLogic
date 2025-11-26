# PUZZLE P0-2: FLOW CONSOLES

> *"Each shard belongs to exactly one console. Match by symbols, and the flow begins."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | P0-2 |
| **Name** | Flow Consoles |
| **Region** | Prologue - Chamber of Flow |
| **Difficulty** | ★☆☆☆☆ (Tutorial) |
| **Time Limit** | None |
| **Concept Taught** | Mapping, Key-Value Relationships, Hash Basics |

### Core Mechanic
Three floating consoles route "logic streams" into a central core. Three shards (keys) must be matched to their corresponding consoles (values) based on symbol combinations. When all mappings are correct, flow lines connect everything to the core.

### Why This Puzzle Works
- **Clean Visual Metaphor**: Shards are keys, consoles are values
- **Symbol Matching**: Easy to understand pattern recognition
- **Minimal Art Lift**: Simple geometric elements, no complex animations
- **Direct Teaching**: "Each key points to exactly one target"

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                         FLOW CONSOLE CHAMBER                                   ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║                              ┌─────────────┐                                   ║
║                              │   CENTRAL   │                                   ║
║                              │    CORE     │                                   ║
║                              │     ◉      │   ← Activates when all connected  ║
║                              └──────┬──────┘                                   ║
║                                     │                                          ║
║                         ╔═══════════╧═══════════╗                             ║
║                         ║    FLOW LINES         ║                             ║
║                         ║   (appear on success) ║                             ║
║                         ╚═══════════╤═══════════╝                             ║
║                    ┌────────────────┼────────────────┐                        ║
║                    │                │                │                        ║
║              ┌─────┴─────┐    ┌─────┴─────┐    ┌─────┴─────┐                  ║
║              │ CONSOLE A │    │ CONSOLE B │    │ CONSOLE C │                  ║
║              │           │    │           │    │           │                  ║
║              │  🔺 ═══   │    │  ◆  ───   │    │  ● ═══   │                  ║
║              │  (red)    │    │  (blue)   │    │ (green)  │                  ║
║              │           │    │           │    │           │                  ║
║              │  [EMPTY]  │    │  [EMPTY]  │    │  [EMPTY]  │                  ║
║              └───────────┘    └───────────┘    └───────────┘                  ║
║                                                                                ║
║                                                                                ║
║                              FLOATING PLATFORM                                 ║
║              ┌─────────────────────────────────────────────┐                  ║
║              │                                             │                  ║
║              │     ◇           ◇           ◇               │                  ║
║              │   SHARD 1     SHARD 2     SHARD 3           │                  ║
║              │   🔺 ═══      ◆  ───      ● ═══            │                  ║
║              │   (red)      (blue)     (green)            │                  ║
║              │                                             │                  ║
║              │                [PLAYER]                     │                  ║
║              │                                             │                  ║
║              └─────────────────────────────────────────────┘                  ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

#### Symbol System
```
SYMBOL COMBINATION = SHAPE + STRIPE PATTERN

╔════════════════════════════════════════════════════════════════╗
║  Shard/Console  │  Shape   │  Stripe    │  Color   │ Match    ║
╠════════════════════════════════════════════════════════════════╣
║  Pair A         │   🔺     │  ═══      │  Red     │ A ↔ A    ║
║                 │ Triangle │  Double    │  #ef4444 │          ║
╠════════════════════════════════════════════════════════════════╣
║  Pair B         │   ◆      │  ───      │  Blue    │ B ↔ B    ║
║                 │ Diamond  │  Single    │  #3b82f6 │          ║
╠════════════════════════════════════════════════════════════════╣
║  Pair C         │   ●      │  ≡≡≡      │  Green   │ C ↔ C    ║
║                 │ Circle   │  Triple    │  #22c55e │          ║
╚════════════════════════════════════════════════════════════════╝

Each shard has BOTH a shape AND a stripe.
Each console displays the SAME shape AND stripe.
Matching = finding the console with identical symbols.
```

### Console & Shard Specifications

#### Consoles
| Property | Value |
|----------|-------|
| **Count** | 3 consoles |
| **Size** | 96 × 80 pixels |
| **Design** | Floating terminal with display screen |
| **Socket** | Central slot where shard snaps in |
| **Display** | Shows symbol combo on screen |

#### Shards
| Property | Value |
|----------|-------|
| **Count** | 3 shards |
| **Size** | 32 × 48 pixels |
| **Design** | Crystalline fragment with embedded symbols |
| **Interaction** | Pick up, carry, snap into console |

### Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    PUZZLE P0-2 FLOW                         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
             ┌────────────────────────┐
             │   PLAYER APPROACHES    │
             │   Console Keeper NPC   │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   INTRO DIALOGUE       │
             │  "Match shards to      │
             │   their consoles..."   │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   PUZZLE ACTIVE        │
             │  - 3 shards on ground  │
             │  - 3 consoles waiting  │
             │  - Pick up & place     │
             └───────────┬────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                │                │
        ▼                ▼                ▼
   PICK UP         CARRY TO          PLACE IN
   SHARD           CONSOLE           SOCKET
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   SYMBOLS MATCH?       │
             └───────────┬────────────┘
                    YES  │  NO
                  ┌──────┴──────┐
                  ▼             ▼
            SNAP + GLOW    REJECT + HINT
            Flow line      "Check the
            appears        symbols again"
                  │             │
                  └──────┬──────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   ALL 3 CONNECTED?     │
             └───────────┬────────────┘
                        YES
                         │
                         ▼
             ┌────────────────────────┐
             │   FLOW COMPLETE!       │
             │   Core activates       │
             │   Victory animation    │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   CONCEPT BRIDGE       │
             └────────────────────────┘
```

---

## 🎨 VISUAL STATES

### Console States

```
╔═══════════════════════════════════════════════════════════════╗
║                   CONSOLE VISUAL STATES                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  EMPTY               HOVER/NEAR           WRONG SHARD         ║
║  ┌─────────────┐     ┌─────────────┐      ┌─────────────┐    ║
║  │  ┌───────┐  │     │  ┌───────┐  │      │  ┌───────┐  │    ║
║  │  │🔺 ═══ │  │     │  │🔺 ═══ │  │      │  │🔺 ═══ │  │    ║
║  │  └───────┘  │     │  └───────┘  │      │  └───────┘  │    ║
║  │             │     │   ▼ GLOW    │      │   ✗ RED ✗   │    ║
║  │   [    ]    │     │   [    ]    │      │   [    ]    │    ║
║  │             │     │             │      │             │    ║
║  └─────────────┘     └─────────────┘      └─────────────┘    ║
║  Pulsing softly      Bright highlight     Flash red + shake  ║
║  Waiting             When player near     Wrong shard held   ║
║                      with shard                              ║
║                                                               ║
║  CORRECT MATCH       FLOW ACTIVE                             ║
║  ┌─────────────┐     ┌─────────────┐                         ║
║  │  ┌───────┐  │     │  ┌───────┐  │                         ║
║  │  │🔺 ═══ │  │     │  │🔺 ═══ │══════▶ to core             ║
║  │  └───────┘  │     │  └───────┘  │                         ║
║  │   ✓ LOCK    │     │   ════════  │                         ║
║  │   [◇🔺◇]    │     │   [◇🔺◇]    │                         ║
║  │             │     │             │                         ║
║  └─────────────┘     └─────────────┘                         ║
║  Shard snaps in      Flow line connects                      ║
║  Particle burst      to central core                         ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Shard States

```
╔═══════════════════════════════════════════════════════════════╗
║                    SHARD VISUAL STATES                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ON GROUND           BEING CARRIED        NEAR CONSOLE        ║
║     ◇                    ◇                    ◇               ║
║    /│\                  /│\                  /│\              ║
║   🔺═══              ▶🔺═══               ▶🔺═══◀ ← pulse     ║
║    \│/                  \│/                  \│/              ║
║     ◇                    ◇                    ◇               ║
║                                                               ║
║  Floating, bobbing   Follows player       Glows brighter     ║
║  Subtle glow         Raised position      if correct console ║
║                                                               ║
║  SNAPPED IN          REJECTED                                ║
║     ◇                    ◇                                    ║
║    /│\                  /│\                                   ║
║   🔺═══✓              ✗🔺═══✗                                 ║
║    \│/                  \│/                                   ║
║     ◇                    ◇                                    ║
║                                                               ║
║  Fixed in socket     Red flash, returns                      ║
║  Particle burst      to floating state                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Flow Lines
```
FLOW LINE VISUALIZATION:

When shard connects to correct console:

    ┌─────────────┐
    │   CENTRAL   │
    │    CORE     │
    │      ◉      │
    └──────┬──────┘
           │
           │  ═══════════════════════
           │  ║ Blue energy stream  ║
           │  ═══════════════════════
           │
    ┌──────┴──────┐
    │  CONSOLE A  │
    │   [◇🔺◇]    │
    └─────────────┘

Flow lines:
- Color: Cyan (#06b6d4)
- Width: 4 pixels
- Animation: Energy pulses travel toward core
- Particle effects: Small sparkles along line
```

### Central Core States
```
CORE STATES:

INACTIVE (0 connections):
     ┌───────┐
     │       │
     │   ○   │   Gray, dim
     │       │
     └───────┘

PARTIAL (1-2 connections):
     ┌───────┐
     │  ╱ ╲  │
     │   ◉   │   Glowing, pulsing
     │  ╲ ╱  │   Brightness = connections/3
     └───────┘

ACTIVE (3 connections):
     ┌───────┐
     │ ╱ ◆ ╲ │
     │◆  ⬤  ◆│   Brilliant, particles
     │ ╲ ◆ ╱ │   Victory animation
     └───────┘
```

---

## 🔧 INTERACTION MECHANICS

### Pick Up & Carry
```
INTERACTION FLOW:

1. APPROACH SHARD
   - Player walks near shard (within 48px)
   - Prompt appears: "[E] Pick up shard"

2. PICK UP
   - Press E to grab
   - Shard floats above player's head
   - Player can still move

3. CARRY
   - Shard follows player
   - Hovering slightly above
   - Symbols clearly visible

4. APPROACH CONSOLE
   - If holding shard and near console
   - Prompt: "[E] Place shard"
   - Visual hint if match/mismatch

5. PLACE
   - Press E to attempt placement
   - Check if symbols match
   - Success or rejection
```

### Symbol Matching Logic
```javascript
function attemptPlacement(shard: Shard, console: Console): boolean {
  // Compare symbol components
  const shapeMatch = shard.shape === console.shape;
  const stripeMatch = shard.stripe === console.stripe;
  
  return shapeMatch && stripeMatch;
}

// Example:
// Shard: { shape: 'triangle', stripe: 'double', color: 'red' }
// Console A: { shape: 'triangle', stripe: 'double', color: 'red' }
// Result: MATCH! ✓
```

### Visual Hints
```
PROXIMITY FEEDBACK:

When player carries shard near a console:

CORRECT CONSOLE:
- Console glows brighter
- Shard pulses in sync
- Subtle particle connection
- Sound: Harmonic hum

WRONG CONSOLE:
- Console dims slightly
- Shard pulses red once
- No particle effect
- Sound: Low buzz
```

---

## 💡 HINT SYSTEM

### Visual Hints
| Hint # | Content | Visual Effect |
|--------|---------|---------------|
| 1 | "Look at the symbols on each shard and console..." | Symbols pulse brighter |
| 2 | "Match the SHAPE and the STRIPE pattern." | Shape highlights, then stripe |
| 3 | "The triangle shard goes to the triangle console." | Direct line drawn |

### Hint Delivery
```
AFTER 2 WRONG PLACEMENTS:

Console Keeper: "Each shard has two parts to match—
the shape AND the stripe. Look carefully!"

[Symbols on all objects pulse for emphasis]
```

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(wrongAttempts: number, hintsUsed: number): number {
  // 3 stars: Perfect matching
  if (wrongAttempts === 0 && hintsUsed === 0) return 3;
  
  // 2 stars: Minor mistakes
  if (wrongAttempts <= 2 && hintsUsed <= 1) return 2;
  
  // 1 star: Completed
  return 1;
}
```

### Progression Points
- Completion: 15 points
- 3-star bonus: +7 points
- First-time completion: +3 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Pick up shard | Crystal lift chime | `shard_pickup.wav` | 0.2s |
| Carry (ambient) | Soft hum (looping) | `shard_carry_loop.wav` | varies |
| Near correct console | Harmonic resonance | `console_correct_hint.wav` | 0.3s |
| Near wrong console | Low dissonance | `console_wrong_hint.wav` | 0.2s |
| Correct placement | Snap + energy burst | `shard_connect.wav` | 0.4s |
| Wrong placement | Rejection buzz | `shard_reject.wav` | 0.3s |
| Flow line activates | Energy stream sound | `flow_line.wav` | 0.5s |
| Core fully active | Triumphant chord | `core_activate.wav` | 1.0s |
| Victory | Puzzle complete fanfare | `puzzle_complete.wav` | 1.0s |

---

## 📜 DIALOGUE SCRIPT

### Intro (Console Keeper NPC)
```
CONSOLE KEEPER:
"*examining a shard*

These flow consoles have lost their keys.
Each console needs its matching shard to
route logic streams to the central core.

See the symbols? Each shard has a shape
and a stripe pattern. Each console shows
the same combination.

🔺 with double lines goes to the console
with 🔺 and double lines. Simple as that.

Pick up a shard, walk to its matching
console, and snap it in. Connect all three
and the flow will restore!"
```

### On Wrong Placement
```
CONSOLE KEEPER: (brief)
"That shard's symbols don't match this console.
Check the shape AND the stripe pattern!"
```

### On Completion
```
CONSOLE KEEPER:
"Excellent! The flow is restored!

You just performed a MAPPING. Each shard
was a KEY. Each console was its VALUE.

Triangle-double → Console A
Diamond-single → Console B
Circle-triple → Console C

Every key points to exactly one target.
That's the foundation of how we organize
and retrieve information instantly.

The Concept Bridge will explain more!"
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You had three shards and three consoles.
Each shard had a unique symbol combination.
You matched each shard to the console with
the same symbols.

That's not just matching—that's MAPPING!"
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"We matched each shard ('key') to its unique
console ('value'). That's called a MAPPING:
every key points to exactly one target.

In programming, we call this a KEY-VALUE PAIR.
The key is what you know (the shard's symbols).
The value is what you find (the console).

When you know the key, you can go directly
to its value. No searching required!"
```

### Section 3: Pseudocode Walkthrough
```
THE MAPPING YOU CREATED:

console_map = {
    '🔺═══': 'Console A',
    '◆───':  'Console B',
    '●≡≡≡':  'Console C'
}

When you picked up the triangle-double shard:
"Where does 🔺═══ go?"

Answer: console_map['🔺═══'] → 'Console A'

Direct lookup! No checking every console.
```

### Section 4: Mini-Forge Practice
```
MAPPING CHALLENGE:

If we have this map:
  symbol_map = {
    '★': 'Slot 1',
    '♦': 'Slot 2',
    '♠': 'Slot 3'
  }

Where does ♦ go?

[Slot 1] [Slot 2] [Slot 3]

CORRECT: Slot 2 ✓
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Mapping & Key-Value Pairs

"Every key opens exactly one door.
 Know your keys, and no door is locked."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: MAPPING & KEY-VALUE PAIRS

### What You Felt
You looked at each shard's symbols and matched it to the console with identical symbols. Direct matching, no guessing.

### Plain Explanation
- **Mapping** means connecting one thing (key) to another (value)
- Each **key** is unique and points to exactly one **value**
- A **hash map** or **dictionary** stores these key-value pairs
- This enables **instant lookup**—if you know the key, you get the value immediately

### Pattern Steps
1. IDENTIFY the key (shard's symbol combination)
2. FIND the matching value (console with same symbols)
3. CONNECT them (place shard in console)
4. REPEAT for all key-value pairs
5. DONE—all mappings complete!

### Real World Applications
- 📚 Dictionary: Word (key) → Definition (value)
- 📱 Contacts: Name (key) → Phone number (value)
- 🔐 Login: Username (key) → User data (value)
- 🗺️ GPS: Address (key) → Coordinates (value)
- 🎮 Game saves: Player ID (key) → Save data (value)
- 🏷️ Barcodes: Barcode (key) → Product info (value)

### Unlocked Ability
You now understand that **keys directly map to values**. When you hear "hash map" or "dictionary," you'll know it's just matching keys to values—like shards to consoles.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_P0_2_Scene configuration
{
  key: 'Puzzle_P0_2_Scene',
  parent: 'BasePuzzleScene',
  
  shards: [
    { id: 'shard_a', shape: 'triangle', stripe: 'double', color: 0xef4444 },
    { id: 'shard_b', shape: 'diamond', stripe: 'single', color: 0x3b82f6 },
    { id: 'shard_c', shape: 'circle', stripe: 'triple', color: 0x22c55e }
  ],
  
  consoles: [
    { id: 'console_a', shape: 'triangle', stripe: 'double', position: { x: 250, y: 200 } },
    { id: 'console_b', shape: 'diamond', stripe: 'single', position: { x: 400, y: 200 } },
    { id: 'console_c', shape: 'circle', stripe: 'triple', position: { x: 550, y: 200 } }
  ],
  
  core: {
    position: { x: 400, y: 80 },
    activationThreshold: 3
  }
}
```

### State Machine
```
States:
- IDLE (puzzle not started)
- INTRO (dialogue playing)
- ACTIVE (player can interact)
- CARRYING (player holds shard)
- PLACING (shard being placed)
- FEEDBACK_CORRECT (successful match)
- FEEDBACK_WRONG (rejected)
- COMPLETE (all connected)
- VICTORY (core activation)
- CONCEPT_BRIDGE
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] All 3 shards are pickable
- [ ] Shards follow player correctly
- [ ] Symbol matching logic works
- [ ] Correct placements lock shards
- [ ] Wrong placements return shards
- [ ] Flow lines appear on connection
- [ ] Core activates when all connected
- [ ] Victory triggers properly

### Visual
- [ ] Symbol combinations are distinct
- [ ] Proximity hints are visible
- [ ] Flow lines animate correctly
- [ ] Core activation is dramatic

### Audio
- [ ] Pickup/place sounds work
- [ ] Hint sounds differ for correct/wrong
- [ ] Victory sound is satisfying

### Edge Cases
- [ ] Can't pick up second shard while carrying one
- [ ] Placed shards can't be moved
- [ ] Order of placement doesn't matter

---

*"Match the symbols, complete the flow. Every key has its lock."*
— Console Keeper

