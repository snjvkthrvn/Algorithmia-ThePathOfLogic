# PUZZLE P0-2: FRACTURED SENTINEL

> *"Three shards. Three sockets. Each belongs to only one place."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | P0-2 |
| **Name** | Fractured Sentinel |
| **Region** | Prologue - Chamber of Flow |
| **Difficulty** | ★☆☆☆☆ (Tutorial) |
| **Time Limit** | None |
| **Concept Taught** | Mapping, Key-Value Relationships, Hash Basics |

### Core Mechanic
Player must drag three crystal shards to their matching sockets on a stone sentinel frame. Each shard has unique properties (color, shape) that correspond to exactly one socket.

### Why This Puzzle Second
- **Complements P0-1**: First puzzle is sequential (order), this is mapping (relationship)
- **Visual Matching**: Natural human pattern recognition
- **Drag Interaction**: Different mechanic from walking
- **Foundation for Hashing**: Direct preparation for AP-3

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Arena Layout
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                    FLOATING PLATFORM                              ║
║                                                                   ║
║    ┌─────────────────────────────────────────────────────────┐    ║
║    │                                                         │    ║
║    │        ◇                                                │    ║
║    │      CYAN                    ┌─────────────┐            │    ║
║    │     SHARD                    │  ╔═══════╗  │            │    ║
║    │                              │  ║ TOP   ║  │ ← Cyan     │    ║
║    │                  ◇           │  ║SOCKET ║  │            │    ║
║    │                ORANGE        │  ╠═══════╣  │            │    ║
║    │                SHARD         │  ║MIDDLE ║  │ ← Purple   │    ║
║    │                              │  ║SOCKET ║  │            │    ║
║    │    ◇                         │  ╠═══════╣  │            │    ║
║    │  PURPLE                      │  ║BOTTOM ║  │ ← Orange   │    ║
║    │  SHARD                       │  ║SOCKET ║  │            │    ║
║    │                              │  ╚═══════╝  │            │    ║
║    │                              │  SENTINEL   │            │    ║
║    │                              │   FRAME     │            │    ║
║    │                              └─────────────┘            │    ║
║    │                                                         │    ║
║    └─────────────────────────────────────────────────────────┘    ║
║                                                                   ║
║                          VOID BELOW                               ║
╚═══════════════════════════════════════════════════════════════════╝
```

#### Component Specifications

**Sentinel Frame:**
| Property | Value |
|----------|-------|
| **Size** | 160 × 320 pixels |
| **Material** | Ancient stone, geometric patterns |
| **Sockets** | 3 vertical slots |
| **Animation** | Subtle pulse when incomplete |

**Crystal Shards:**
| Shard | Color | Hex Code | Shape | Target Socket |
|-------|-------|----------|-------|---------------|
| A | Cyan | `#06b6d4` | Elongated hexagon | Top |
| B | Purple | `#8b5cf6` | Compact hexagon | Middle |
| C | Orange | `#f97316` | Wide hexagon | Bottom |

**Shard Dimensions:**
- Width: 48-64 pixels
- Height: 48-72 pixels (varies by shape)
- Each shape is distinct enough to imply its socket

### Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  PUZZLE P0-2 FLOW                           │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
             ┌────────────────────────┐
             │   PLAYER APPROACHES    │
             │   Guardian NPC         │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   INTRO DIALOGUE       │
             │  "The sentinel is      │
             │   fractured..."        │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │  PUZZLE ACTIVE         │
             │  - 3 shards on platform│
             │  - 3 empty sockets     │
             │  - Drag to place       │
             └───────────┬────────────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
      SHARD A →     SHARD B →     SHARD C →
      SOCKET 1?     SOCKET 2?     SOCKET 3?
           │             │             │
           ▼             ▼             ▼
      ┌────────┐    ┌────────┐    ┌────────┐
      │CORRECT?│    │CORRECT?│    │CORRECT?│
      └────┬───┘    └────┬───┘    └────┬───┘
           │             │             │
     YES: LOCK     YES: LOCK     YES: LOCK
      NO: RETURN    NO: RETURN    NO: RETURN
           │             │             │
           └─────────────┼─────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ ALL 3 SHARDS PLACED? │
              └──────────┬───────────┘
                         │
                        YES
                         │
                         ▼
              ┌──────────────────────┐
              │   SENTINEL AWAKENS   │
              │   Victory Animation  │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   CONCEPT BRIDGE     │
              └──────────────────────┘
```

---

## 🎨 VISUAL STATES

### Shard States

```
╔═══════════════════════════════════════════════════════════════╗
║                     SHARD VISUAL STATES                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  IDLE                HOVER              DRAGGING              ║
║  ┌─────────┐         ┌─────────┐        ┌─────────┐          ║
║  │ ◇◇◇◇◇◇◇ │         │ ◆◆◆◆◆◆◆ │        │ ◆◆◆◆◆◆◆ │          ║
║  │ ◇     ◇ │         │ ◆     ◆ │        │ ◆     ◆ │          ║
║  │ ◇◇◇◇◇◇◇ │         │ ◆◆◆◆◆◆◆ │        │ ◆◆◆◆◆◆◆ │          ║
║  └─────────┘         └─────────┘        └─────────┘          ║
║  Float animation     Scale 1.15x        Scale 1.2x           ║
║  Soft glow           Brighter glow      High depth           ║
║                      Cursor: grab       Cursor: grabbing     ║
║                                                               ║
║  NEAR SOCKET         LOCKED             WRONG ATTEMPT        ║
║  ┌─────────┐         ┌─────────┐        ┌─────────┐          ║
║  │ ▓▓▓▓▓▓▓ │         │ █████████│        │ ✗✗✗✗✗✗✗ │          ║
║  │ ▓     ▓ │         │ █  ✓  █ │        │ ✗     ✗ │          ║
║  │ ▓▓▓▓▓▓▓ │         │ █████████│        │ ✗✗✗✗✗✗✗ │          ║
║  └─────────┘         └─────────┘        └─────────┘          ║
║  Snap preview        Particle burst     Red flash            ║
║  Socket highlights   Fixed position     Returns to origin    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Socket States

```
╔═══════════════════════════════════════════════════════════════╗
║                     SOCKET VISUAL STATES                      ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  EMPTY               HIGHLIGHTED        FILLED                ║
║  ┌─────────┐         ┌─────────┐        ┌─────────┐          ║
║  │ ┌─────┐ │         │ ╔═════╗ │        │ ╔═════╗ │          ║
║  │ │     │ │         │ ║░░░░░║ │        │ ║▓▓▓▓▓║ │          ║
║  │ │  ?  │ │         │ ║░ ? ░║ │        │ ║▓ ✓ ▓║ │          ║
║  │ │     │ │         │ ║░░░░░║ │        │ ║▓▓▓▓▓║ │          ║
║  │ └─────┘ │         │ ╚═════╝ │        │ ╚═════╝ │          ║
║  └─────────┘         └─────────┘        └─────────┘          ║
║  Pulsing outline     Bright pulse       Filled + glow        ║
║  Color tint          When shard near    Matched shard color  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Sentinel Frame States

#### Pre-Completion
```
FRACTURED STATE:
┌───────────────────────────┐
│                           │
│   ╔═══════════════════╗   │  ← Stone frame, ancient
│   ║   ┌───────────┐   ║   │
│   ║   │  EMPTY    │   ║   │  ← Socket 1 (top)
│   ║   │  SOCKET   │   ║   │
│   ║   └───────────┘   ║   │
│   ║   ┌───────────┐   ║   │
│   ║   │  EMPTY    │   ║   │  ← Socket 2 (middle)
│   ║   │  SOCKET   │   ║   │
│   ║   └───────────┘   ║   │
│   ║   ┌───────────┐   ║   │
│   ║   │  EMPTY    │   ║   │  ← Socket 3 (bottom)
│   ║   │  SOCKET   │   ║   │
│   ║   └───────────┘   ║   │
│   ╚═══════════════════╝   │
│                           │
│        CRACKS VISIBLE     │
│        DIM LIGHTING       │
└───────────────────────────┘
```

#### Post-Completion
```
RESTORED STATE:
┌───────────────────────────┐
│      ★ ★ ★ ★ ★ ★          │  ← Particle celebration
│   ╔═══════════════════╗   │
│   ║   ┌───────────┐   ║   │
│   ║   │  ◆ CYAN   │   ║   │  ← Glowing shard
│   ║   │   SHARD   │   ║   │
│   ║   └───────────┘   ║   │
│   ║   ┌───────────┐   ║   │
│   ║   │ ◆ PURPLE  │   ║   │  ← Glowing shard
│   ║   │   SHARD   │   ║   │
│   ║   └───────────┘   ║   │
│   ║   ┌───────────┐   ║   │
│   ║   │ ◆ ORANGE  │   ║   │  ← Glowing shard
│   ║   │   SHARD   │   ║   │
│   ║   └───────────┘   ║   │
│   ║                   ║   │
│   ║      👁️ EYE      ║   │  ← Sentinel eye awakens!
│   ║     AWAKENS      ║   │
│   ╚═══════════════════╝   │
│                           │
└───────────────────────────┘
```

### Visual Effects

#### Shard Float Animation
```
Idle floating effect:
- Amplitude: 5px vertical
- Cycle: 2.0 seconds
- Rotation: ±3 degrees
- Glow pulse: 1.5 second cycle
```

#### Correct Placement
```
Timeline (0.5 seconds):
0.00s - Shard enters snap radius (50px)
0.05s - Snap animation begins (ease-out)
0.15s - Shard locks into socket
0.20s - Flash (matching color)
0.25s - Particle burst (16 particles)
0.30s - Socket pulses 3 times
0.50s - Settle into final state
```

#### Wrong Placement
```
Timeline (0.6 seconds):
0.00s - Shard released over wrong socket
0.05s - Red flash on shard
0.10s - Camera shake (150ms)
0.20s - Shard returns to origin (ease-back)
0.40s - Error sound plays
0.50s - Status text: "That shard doesn't fit there..."
0.60s - Ready for retry
```

#### Victory Sequence
```
Timeline (3.0 seconds):
0.00s - Final shard locks
0.40s - All shards pulse in unison
0.60s - Frame begins to glow
0.80s - "🎉 Sentinel Restored! 🎉" text
1.00s - Camera flash (purple tint)
1.20s - Eye begins to glow (center of frame)
1.50s - Eye opens animation
2.00s - 40-particle celebration burst
2.50s - Frame fully illuminated
3.00s - Transition to Concept Bridge
```

---

## 🔧 INTERACTION MECHANICS

### Drag & Drop System

#### Mouse/Touch Controls
```
CLICK/TAP on shard:
  → Shard enters "grabbed" state
  → Cursor changes to grabbing
  → Shard follows cursor/finger
  
DRAG:
  → Shard moves with input
  → Shard hovers above platform
  → If near socket, socket highlights
  
RELEASE:
  → If within snap radius of CORRECT socket → Lock
  → If within snap radius of WRONG socket → Reject + Return
  → If in open area → Return to origin
```

#### Keyboard Alternative
```
TAB: Cycle through available shards
ARROW KEYS: Move selected shard
ENTER: Attempt to place shard
ESC: Deselect shard
```

### Snap Distance
- **Snap Radius:** 50 pixels from socket center
- **Snap Animation:** 300ms ease-out to center
- **Snap Audio:** Crystalline "lock" chime

### Shape Matching Logic
```javascript
const shardSocketMapping = {
  'shard_cyan': 'socket_top',      // Elongated → Tall slot
  'shard_purple': 'socket_middle', // Compact → Square slot
  'shard_orange': 'socket_bottom'  // Wide → Wide slot
};

function attemptPlacement(shard, socket) {
  const correctSocket = shardSocketMapping[shard.id];
  return socket.id === correctSocket;
}
```

---

## 💡 HINT SYSTEM

### Visual Hints
| Hint # | Content | Visual |
|--------|---------|--------|
| 1 | "Look at the shape of each shard and socket..." | Subtle outline match preview |
| 2 | "The colors have meaning..." | Socket tints with target color briefly |
| 3 | "The [cyan] shard belongs [up top]." | Direct indication with arrow |

### Hint Activation
- Available after 2 wrong attempts
- Button appears: "Need a hint? [H]"
- Each hint reduces star potential

---

## ⭐ SCORING & STARS

### Star Calculation
```
function calculateStars(wrongAttempts, hintsUsed) {
  // 3 stars: Perfect matching
  if (wrongAttempts === 0 && hintsUsed === 0) return 3;
  
  // 2 stars: Few mistakes
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
| Shard pickup | Lift shimmer | `shard_pickup.wav` | 0.2s |
| Shard drag | Soft hum (looping) | `shard_drag_loop.wav` | varies |
| Near socket | Resonance hint | `socket_proximity.wav` | 0.3s |
| Correct placement | Crystalline lock | `shard_lock.wav` | 0.4s |
| Wrong placement | Dissonant rejection | `shard_reject.wav` | 0.3s |
| All placed | Sentinel awakening | `sentinel_awaken.wav` | 1.5s |
| Victory | Triumphant chord | `puzzle_complete.wav` | 1.0s |

### Audio Layering
```
While dragging shard:
- Ambient: Region ambient continues
- Active: Shard hum sound
- Proximity: Socket resonance increases as shard nears
- Feedback: Immediate on placement attempt
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Sentinel Guardian NPC)
```
SENTINEL GUARDIAN:
"The Sentinel of Flow stands broken.

Long ago, it watched over this chamber,
its eye seeing all patterns, all sequences.

Three shards were torn from its heart.
Three pieces scattered across this platform.

Each shard has a home. A socket meant only
for it. The shapes must match. The colors
must align.

Restore the Sentinel, and it will share
its wisdom with you."

[EXAMINE SHARDS - Begin puzzle]
[WHAT DO THE SHARDS LOOK LIKE?]
```

### On Wrong Placement
```
SENTINEL GUARDIAN: (brief)
"That shard belongs elsewhere.
Study its shape, its color..."
```

### On Completion
```
SENTINEL GUARDIAN:
"The Sentinel awakens!"

[Sentinel's eye opens, light pours out]

SENTINEL: (new voice, ancient)
"Seeker... you have restored me.

What you have done is called MAPPING.
Each shard was a KEY. Each socket, a VALUE.
The correct KEY opens only its VALUE.

This is the foundation of how knowledge
is stored and retrieved.

Seek the Concept Bridge. I will teach you more."
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"You had three unique shards. You had three
unique sockets. Each shard could only fit
in one specific socket.

Color to color. Shape to shape.

This wasn't random guessing—you were
doing something powerful."
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"This is called MAPPING or KEY-VALUE PAIRING.

A KEY is something unique (like the cyan shard).
A VALUE is what it connects to (the top socket).

When you know the KEY, you can instantly
find the VALUE.

In computers, we call this a HASH MAP or
DICTIONARY. It's how we store things so
we can find them fast."
```

### Section 3: Pseudocode Walkthrough
```
THE MAPPING YOU CREATED:

sentinel_shards = {
    'cyan_shard':   'top_socket',
    'purple_shard': 'middle_socket',
    'orange_shard': 'bottom_socket'
}

When you picked up the cyan shard, you were asking:
"What socket does cyan_shard map to?"

Answer: sentinel_shards['cyan_shard'] → 'top_socket'
```

### Section 4: Mini-Forge Practice
```
MAPPING CHALLENGE:

If we have this map:
  fruit_colors = {
    'apple': 'red',
    'banana': 'yellow',
    'grape': 'purple'
  }

What is fruit_colors['banana']?

[red] [yellow] [purple]

CORRECT: yellow ✓
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Mapping & Hash Functions

"Every key opens exactly one door.
 Know your keys, and no door is locked."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: MAPPING & HASH FUNCTIONS

### What You Felt
You looked at each shard, observed its unique properties (color, shape), and matched it to the socket with corresponding features.

### Plain Explanation
- **Mapping** means connecting one thing to another
- A **key** is the thing you know (the shard you're holding)
- A **value** is the thing you want to find (which socket)
- **Hash functions** turn a key into a location (like shape → socket shape)
- This lets you find things FAST without searching everything

### Pattern Steps
1. OBSERVE the item you have (the key)
2. IDENTIFY its unique properties
3. CALCULATE where it belongs (the hash)
4. PLACE it directly there (no searching)
5. DONE—O(1) operation!

### Real World Applications
- 📚 Dictionary: Word (key) → Definition (value)
- 📱 Phone contacts: Name → Phone number
- 🗝️ Hotel keys: Room number → Door lock
- 🌐 URLs: Web address → Web page
- 🏠 Home address: Address → Location
- 🎮 Username: Your name → Your account data

### Unlocked Ability
You now understand that **mapping is instant lookup**. When someone says "hash table" or "dictionary," you'll know it's just matching keys to values—like shards to sockets.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Setup
```typescript
// Puzzle_P0_2_Scene configuration
{
  key: 'Puzzle_P0_2_Scene',
  parent: 'BasePuzzleScene',
  
  shards: [
    { id: 'cyan', color: 0x06b6d4, shape: 'elongated', target: 'top' },
    { id: 'purple', color: 0x8b5cf6, shape: 'compact', target: 'middle' },
    { id: 'orange', color: 0xf97316, shape: 'wide', target: 'bottom' }
  ],
  
  sockets: [
    { id: 'top', position: { x: 600, y: 200 } },
    { id: 'middle', position: { x: 600, y: 320 } },
    { id: 'bottom', position: { x: 600, y: 440 } }
  ],
  
  snapRadius: 50,
  
  frame: {
    position: { x: 600, y: 320 },
    size: { width: 160, height: 320 }
  }
}
```

### State Machine
```
States:
- IDLE (puzzle not started)
- INTRO (dialogue playing)
- ACTIVE (player can drag shards)
- DRAGGING (shard in motion)
- CHECKING (released, checking placement)
- FEEDBACK_CORRECT (placement accepted)
- FEEDBACK_WRONG (placement rejected)
- COMPLETE (all shards placed)
- VICTORY (celebration animation)
- CONCEPT_BRIDGE (learning moment)
```

### Accessibility
- Color-blind friendly: Shapes are distinct regardless of color
- Keyboard navigation: Full puzzle solvable without mouse
- Screen reader: Announce shard properties and socket status

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] All 3 shards are draggable
- [ ] Shards return to origin on wrong placement
- [ ] Correct placements lock permanently
- [ ] Victory triggers when all 3 are placed
- [ ] Order doesn't matter (any shard first)
- [ ] Stars calculate correctly

### Visual
- [ ] Shards have distinct appearances
- [ ] Socket highlighting works on proximity
- [ ] Victory animation plays fully
- [ ] Sentinel eye awakening is visible
- [ ] Particles don't obstruct UI

### Audio
- [ ] Drag sound plays while moving
- [ ] Correct/wrong sounds are distinct
- [ ] Victory sound plays
- [ ] No audio cutting off

### Edge Cases
- [ ] Can't drag placed shards
- [ ] Can grab another shard while one returns
- [ ] Rapid clicking doesn't break state
- [ ] Exit and resume preserves progress

---

*"The sentinel remembers. Now, so do you."*
— Sentinel Guardian

