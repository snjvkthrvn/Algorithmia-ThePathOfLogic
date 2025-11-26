# PUZZLE AP-3: ORGANIZE THE HARVEST

> *"Every crop knows its bucket. That's the magic of hashing."*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | AP-3 |
| **Name** | Organize the Harvest |
| **Region** | Array Plains |
| **Difficulty** | ★★☆☆☆ |
| **Time Limit** | Soft (crops fall continuously) |
| **Concept Taught** | Hash Functions, Hash Tables, Bucket Assignment |

### Core Mechanic
Crops drop from a hopper. Player must direct each crop to the correct bucket based on a visible "hash rule" (crop type → bucket). Speed increases over time, creating pressure without hard failure.

### Why This Puzzle Matters
- **Hash Function Intuition**: The rule IS the hash function
- **Categorization**: Real-world application of hashing
- **Speed Under Pressure**: Prepares for time-sensitive coding
- **Collision Teaser**: Sets up advanced hash concepts

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                       NORTH FIELD WORKSHOP                                     ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     ┌─────────────────────────────────────────────────────────┐               ║
║     │              🏭 GRAIN HOPPER                             │               ║
║     │                    ▼                                     │               ║
║     │              [ CROP DROP ]                               │               ║
║     └─────────────────────────────────────────────────────────┘               ║
║                                                                                ║
║     ┌──────────────────────────────────────────────────────────────────────┐  ║
║     │                        SORTING RULES                                  │  ║
║     │  ─────────────────────────────────────────────────────────────────── │  ║
║     │   🌾 Grain   →  Bucket A       │    🥔 Roots   →  Bucket C           │  ║
║     │   🍓 Berries →  Bucket B       │    🌿 Herbs   →  Bucket D           │  ║
║     └──────────────────────────────────────────────────────────────────────┘  ║
║                                                                                ║
║                          ┌─────────────┐                                      ║
║                          │   🌾        │  ← Current crop (draggable)          ║
║                          │   GRAIN     │                                      ║
║                          └─────────────┘                                      ║
║                                │                                              ║
║                                ▼                                              ║
║     ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐                ║
║     │    A    │    │    B    │    │    C    │    │    D    │                ║
║     │ ┌─────┐ │    │ ┌─────┐ │    │ ┌─────┐ │    │ ┌─────┐ │                ║
║     │ │ 🌾🌾│ │    │ │     │ │    │ │     │ │    │ │     │ │                ║
║     │ │ 🌾  │ │    │ │     │ │    │ │     │ │    │ │     │ │                ║
║     │ └─────┘ │    │ └─────┘ │    │ └─────┘ │    │ └─────┘ │                ║
║     └─────────┘    └─────────┘    └─────────┘    └─────────┘                ║
║       Count: 3       Count: 0       Count: 0       Count: 0                   ║
║                                                                                ║
║     PROGRESS: [████████░░░░░░░░░░░░] 8/12 crops sorted                       ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

#### Hash Rule (The "Hash Function")
```
╔══════════════════════════════════════════════════════╗
║            HARVEST SORTING RULES                     ║
║  ════════════════════════════════════════════════   ║
║                                                      ║
║   🌾 GRAIN    →  Bucket A  (Grains go here)         ║
║   🍓 BERRIES  →  Bucket B  (Berries go here)        ║
║   🥔 ROOTS    →  Bucket C  (Roots go here)          ║
║   🌿 HERBS    →  Bucket D  (Herbs go here)          ║
║                                                      ║
║  This IS a hash function:                           ║
║  hash(crop_type) → bucket_destination               ║
╚══════════════════════════════════════════════════════╝
```

#### Crop Sequence
```
PREDETERMINED SEQUENCE (12 crops):

Position:  1    2    3    4    5    6    7    8    9   10   11   12
Crop:     🌾   🍓   🌾   🥔   🌿   🍓   🌾   🌿   🥔   🍓   🌾   🌿
Type:    Grain Berry Grain Root Herb Berry Grain Herb Root Berry Grain Herb

Expected bucket distribution:
- Bucket A (Grain): 4 items
- Bucket B (Berry): 3 items
- Bucket C (Root): 2 items
- Bucket D (Herb): 3 items
```

### Game Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PUZZLE AP-3 FLOW                                │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
               ┌────────────────────────────┐
               │   PLAYER ENTERS WORKSHOP   │
               │   NPC explains rules       │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   SHOW HASH RULES          │
               │   "Grain→A, Berry→B..."    │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   START SORTING            │
               │   Crops begin falling      │
               └───────────────┬────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
    CROP FALLS            PLAYER DRAGS          SPEED INCREASES
    (from hopper)         (to bucket)           (after every 4 crops)
         │                     │                     │
         │                     ▼                     │
         │        ┌────────────────────────┐        │
         │        │  CORRECT BUCKET?       │        │
         │        └───────────┬────────────┘        │
         │              YES   │   NO                │
         │               │    │    │                │
         │               ▼    │    ▼                │
         │          PLOP! ✓   │  REJECT ✗           │
         │          +1 count  │  Return + delay     │
         │               │    │    │                │
         └───────────────┼────┼────┘                │
                         │    │                     │
                         └────┼─────────────────────┘
                              │
                              ▼
               ┌────────────────────────────┐
               │  ALL 12 CROPS SORTED?      │
               └───────────────┬────────────┘
                              YES
                               │
                               ▼
               ┌────────────────────────────┐
               │   VICTORY! Show stats      │
               └───────────────┬────────────┘
                               │
                               ▼
               ┌────────────────────────────┐
               │   CONCEPT BRIDGE           │
               │   (Intro to collisions)    │
               └────────────────────────────┘
```

---

## 🎨 VISUAL STATES

### Crop States

```
╔═══════════════════════════════════════════════════════════════╗
║                      CROP VISUAL STATES                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  FALLING             GRABBED              NEAR BUCKET         ║
║  ┌─────────┐         ┌─────────┐          ┌─────────┐        ║
║  │   🌾    │         │  >🌾<   │          │   🌾    │        ║
║  │  GRAIN  │         │  GRAIN  │          │  GRAIN  │        ║
║  │    ↓    │         │ (held)  │          │    ↓    │        ║
║  └─────────┘         └─────────┘          └─────────┘        ║
║  Slow descent        Follows cursor       Bucket highlights   ║
║  Gentle bob          Scale 1.1x           Snap preview        ║
║                                                               ║
║  CORRECT DROP        WRONG DROP           MISSED              ║
║  ┌─────────┐         ┌─────────┐          ┌─────────┐        ║
║  │   🌾 ✓  │         │   🌾 ✗  │          │   🌾    │        ║
║  │  PLOP!  │         │ REJECT! │          │  THUD!  │        ║
║  │  +1     │         │ RETURN  │          │  MISS   │        ║
║  └─────────┘         └─────────┘          └─────────┘        ║
║  Green particles     Red flash            Gray out            ║
║  Satisfying plop     Shake + return       Ground impact       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Bucket States

```
╔═══════════════════════════════════════════════════════════════╗
║                     BUCKET VISUAL STATES                      ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  EMPTY               RECEIVING            FILLED              ║
║  ┌─────────┐         ┌─────────┐          ┌─────────┐        ║
║  │    A    │         │    A    │          │    A    │        ║
║  │ ┌─────┐ │         │ ╔═════╗ │          │ ┌─────┐ │        ║
║  │ │     │ │         │ ║     ║ │          │ │🌾🌾🌾│ │        ║
║  │ │     │ │         │ ║  ▼  ║ │          │ │🌾🌾  │ │        ║
║  │ └─────┘ │         │ ╚═════╝ │          │ └─────┘ │        ║
║  └─────────┘         └─────────┘          └─────────┘        ║
║  Wooden bucket       Glow + highlight     Items visible       ║
║  Label visible       Scale 1.05x          Count displayed     ║
║                                                               ║
║  WRONG TARGET        COMPLETE                                 ║
║  ┌─────────┐         ┌─────────┐                              ║
║  │    A    │         │    A    │                              ║
║  │ ╔═════╗ │         │ ┌─────┐ │                              ║
║  │ ║  ✗  ║ │         │ │🌾🌾🌾│✓│                              ║
║  │ ║     ║ │         │ │🌾    │ │                              ║
║  │ ╚═════╝ │         │ └─────┘ │                              ║
║  └─────────┘         └─────────┘                              ║
║  Red flash           Gold glow                                ║
║  Shake "no"          Check mark                               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Speed Indicator
```
DIFFICULTY PROGRESSION:

Crops 1-4:   SLOW    [▓░░░]  1.5s per crop
Crops 5-8:   MEDIUM  [▓▓░░]  1.2s per crop
Crops 9-12:  FAST    [▓▓▓░]  1.0s per crop

Visual warning when speed increases:
"⚡ SPEED INCREASING ⚡"
```

---

## 🔧 INTERACTION MECHANICS

### Input Methods

#### Mouse/Touch (Primary)
```
CLICK on falling crop → Grab
DRAG → Move crop with cursor
RELEASE over bucket → Attempt drop
RELEASE elsewhere → Crop continues falling
```

#### Keyboard Alternative
```
While crop is falling:
1 key → Send to Bucket A
2 key → Send to Bucket B
3 key → Send to Bucket C
4 key → Send to Bucket D

This mimics:
hash(crop) → instantly routes to bucket
```

### Timing Windows
```
CROP LIFECYCLE:

Spawn → Fall → Land (or Sorted)
  │      │        │
  │      │        └─ If not grabbed: Counts as miss
  │      │
  │      └─ Player can grab during fall
  │
  └─ Crop spawns at hopper

Fall Duration (by phase):
- Phase 1: 1.5 seconds
- Phase 2: 1.2 seconds  
- Phase 3: 1.0 seconds

If crop reaches bottom without sorting:
- Not a failure, but doesn't count
- Encourages speed without punishing
```

### Wrong Bucket Penalty
```
WRONG BUCKET ATTEMPT:

1. Bucket flashes red
2. Bucket shakes "no"
3. Crop returns to center
4. 3-second cooldown before crop can be grabbed again
5. During cooldown, crop pulses with "cooling" effect
6. Next crop may spawn during cooldown (pressure!)
```

---

## 💡 HINT SYSTEM

### Visual Hint Mode
```
HINT ACTIVATED:

Each bucket displays its expected crop type:

    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │    A    │    │    B    │    │    C    │    │    D    │
    │  🌾🌾🌾  │    │  🍓🍓🍓  │    │  🥔🥔🥔  │    │  🌿🌿🌿  │
    │  GRAIN  │    │ BERRIES │    │  ROOTS  │    │  HERBS  │
    └─────────┘    └─────────┘    └─────────┘    └─────────┘
```

### Pattern Recognition Aid
```
FALLING CROP SHOWS MATCHING BUCKET:

When crop falls, faint arrow points to correct bucket:

         🌾
          │
          ▼
         [A]────────────────────────────────[D]
```

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(correct: number, total: number, misses: number): number {
  const accuracy = correct / total;
  
  if (accuracy >= 0.9 && misses === 0) return 3;   // 11-12 correct, no misses
  if (accuracy >= 0.75) return 2;                   // 9-10 correct
  return 1;                                         // Completed
}
```

### Performance Metrics
```
TRACKED STATS:

- Correct sorts: /12
- Wrong attempts: count
- Missed crops: count
- Average reaction time: ms
- Streak (consecutive correct): count
```

### Progression Points
- Completion: 25 points
- 3-star bonus: +12 points
- Perfect (no mistakes): +8 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Crop spawns | Hopper release | `crop_spawn.wav` | 0.3s |
| Crop grabbed | Pickup rustle | `crop_grab.wav` | 0.2s |
| Correct bucket | Satisfying plop | `bucket_plop.wav` | 0.3s |
| Wrong bucket | Rejection buzz | `bucket_reject.wav` | 0.3s |
| Crop missed | Thud on ground | `crop_miss.wav` | 0.2s |
| Speed increase | Alert chime | `speed_up.wav` | 0.5s |
| All sorted | Victory jingle | `puzzle_complete.wav` | 1.0s |

### Dynamic Music
```
MUSIC LAYERS:

Base: Folk instrumental (continuous)

Phase 1 (Slow): Base only
Phase 2 (Medium): Add light percussion
Phase 3 (Fast): Add energetic fiddle

Each correct sort: Brief "pop" accent
Streak of 3+: Musical flourish
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Crop Sorter)
```
CROP SORTER:
"Hey there! Welcome to the sorting workshop!

*bounces excitedly*

See this hopper? It drops crops, and each
crop needs to go in the RIGHT bucket!

The rules are simple:
- GRAIN goes in Bucket A
- BERRIES go in Bucket B
- ROOTS go in Bucket C
- HERBS go in Bucket D

It's like... the crop TYPE decides where it goes!
That's the hash rule!

Ready? Drag each crop to its bucket before
it hits the ground! And watch out—it speeds up!"
```

### During Puzzle
```
CROP SORTER (contextual):

[First correct]: "Yes! You got it!"
[Streak of 3]: "On fire! 🔥"
[Wrong bucket]: "Oops! Check the rules!"
[Speed increase]: "Here it comes—faster now!"
[Almost done]: "Just a few more!"
```

### On Completion
```
CROP SORTER:
"Amazing! All sorted!

You know what you just did? You implemented
a HASH FUNCTION!

The rule 'Grain→A, Berry→B' is the function.
You took an input (crop) and instantly knew
its output (bucket).

No searching, no comparing—just HASH and GO!

Oh, and one more thing... what happens when
TWO different items hash to the SAME bucket?
That's called a COLLISION. But that's a lesson
for another day!"
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"Crops falling, buckets waiting, rules on the wall.

You didn't search for where each crop goes.
You KNEW instantly because of the rule:
Grain→A, Berry→B, Root→C, Herb→D.

That rule IS a hash function!"
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"A HASH FUNCTION takes an input and produces
a deterministic output.

Same input ALWAYS gives same output.
Different inputs MIGHT give same output (collision).

In your puzzle:
  hash('Grain') = 'Bucket A'
  hash('Berry') = 'Bucket B'
  
The hash function lets you skip searching and
go DIRECTLY to the right place!"
```

### Section 3: Visual Demonstration
```
HASH TABLE VISUALIZATION:

Input: 🌾 Grain
       │
       ▼
   ┌─────────┐
   │  hash() │  ← The sorting rule
   └────┬────┘
        │
        ▼
   Bucket A
   
This is how computers store and retrieve data
in O(1) time—constant time lookup!
```

### Section 4: Collision Teaser
```
COLLISION CONCEPT:

What if the rule was:
  Fruit → Bucket A
  Vegetable → Bucket A

Both apple AND carrot go to Bucket A!
That's a COLLISION—two different items
mapping to the same location.

We handle this with:
- Chaining (linked list in bucket)
- Open addressing (find next empty spot)

You'll see this in advanced challenges!
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Hash Functions & Hash Tables

"Turn any input into an instant address."

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: HASH FUNCTIONS

### What You Felt
You saw a crop, checked the rule, and knew instantly which bucket it belonged in. No searching required.

### Plain Explanation
- A **hash function** converts input → output using a consistent rule
- The same input ALWAYS produces the same output
- A **hash table** uses hash functions for instant (O(1)) lookup
- **Collisions** happen when different inputs produce the same output
- Good hash functions minimize collisions

### Pattern Steps
1. RECEIVE input (the crop)
2. APPLY hash function (the rule)
3. GET output (bucket letter)
4. GO DIRECTLY to that location
5. STORE/RETRIEVE instantly

### Real World Applications
- 🔐 Passwords: Stored as hashes, not plain text
- 📦 Package tracking: Barcode → Location
- 🌐 URLs: Web address → Server
- 📱 App storage: User ID → User data
- 🎯 Caching: Content → Cache location
- 🔍 Databases: Key → Record

### Unlocked Ability
You now understand that **hash functions enable instant lookup**. When you hear "hash table" or "dictionary," you'll know it's the sorting-rule-to-bucket pattern at scale.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_AP3_Scene configuration
{
  key: 'Puzzle_AP3_Scene',
  parent: 'BasePuzzleScene',
  
  hopper: {
    position: { x: 400, y: 100 },
    dropPoint: { x: 400, y: 180 }
  },
  
  buckets: [
    { id: 'A', position: { x: 200, y: 500 }, accepts: 'grain' },
    { id: 'B', position: { x: 350, y: 500 }, accepts: 'berry' },
    { id: 'C', position: { x: 500, y: 500 }, accepts: 'root' },
    { id: 'D', position: { x: 650, y: 500 }, accepts: 'herb' }
  ],
  
  crops: [
    { type: 'grain', sprite: 'crop_grain' },
    { type: 'berry', sprite: 'crop_berry' },
    { type: 'root', sprite: 'crop_root' },
    { type: 'herb', sprite: 'crop_herb' }
  ],
  
  sequence: ['grain','berry','grain','root','herb','berry','grain','herb','root','berry','grain','herb'],
  
  timing: {
    phase1: { crops: 4, interval: 1500 },
    phase2: { crops: 4, interval: 1200 },
    phase3: { crops: 4, interval: 1000 }
  }
}
```

### State Machine
```
States:
- IDLE (before start)
- INTRO (NPC dialogue)
- PLAYING (crops falling)
- CROP_HELD (player grabbed crop)
- SORTING (crop being placed)
- FEEDBACK (correct/wrong)
- PHASE_TRANSITION (speed change)
- COMPLETE (all crops sorted)
- CONCEPT_BRIDGE
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] Crops spawn from hopper correctly
- [ ] Drag and drop works smoothly
- [ ] Keyboard shortcuts route correctly
- [ ] Correct bucket accepts crop
- [ ] Wrong bucket rejects crop
- [ ] Speed increases at correct intervals
- [ ] Victory triggers after 12 crops

### Visual
- [ ] Crops are visually distinct
- [ ] Bucket highlights on proximity
- [ ] Correct/wrong feedback is clear
- [ ] Count displays update
- [ ] Rules panel is readable

### Audio
- [ ] Sounds match actions
- [ ] Music layers change with phases
- [ ] No audio overlap issues

### Edge Cases
- [ ] Can't grab crop during cooldown
- [ ] Multiple crops can be on screen
- [ ] Missed crops don't break game
- [ ] Rapid input handled gracefully

---

*"Hash is just a fancy word for 'I know exactly where this goes.'"*
— Crop Sorter

