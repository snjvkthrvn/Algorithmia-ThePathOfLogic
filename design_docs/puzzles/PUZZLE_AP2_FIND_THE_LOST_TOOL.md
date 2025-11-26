# PUZZLE AP-2: FIND THE LOST TOOL

> *"I know exactly where it is. Do you?"*

---

## 📋 PUZZLE OVERVIEW

| Property | Value |
|----------|-------|
| **ID** | AP-2 |
| **Name** | Find the Lost Tool |
| **Region** | Array Plains |
| **Difficulty** | ★☆☆☆☆ |
| **Time Limit** | None |
| **Concept Taught** | Array Indexing, O(1) Direct Access vs O(n) Linear Search |

### Core Mechanic
The Basket Keeper knows exactly which basket contains the hammer (index 5). Player can check any basket they want. The puzzle secretly tracks their approach: did they go directly to basket 5, or did they search linearly?

### Why This Puzzle Is Brilliant
- **Disguised Teaching**: Looks like a search game, actually teaches indexing
- **Behavioral Tracking**: How the player solves it IS the lesson
- **No Wrong Answer**: Every path completes the puzzle
- **'Aha!' Moment**: Realization that direct access is instant

---

## 🎮 GAMEPLAY SPECIFICATION

### Physical Setup

#### Visual Layout
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                          WEST BARN INTERIOR                                    ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║     👵 BASKET KEEPER                                                           ║
║     "The hammer is in basket 5."                                               ║
║                                                                                ║
║     ┌──────────────────────────────────────────────────────────────────────┐  ║
║     │                    BASKET SHELVING UNIT                              │  ║
║     │                                                                       │  ║
║     │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                          │  ║
║     │   │ [0] │ │ [1] │ │ [2] │ │ [3] │ │ [4] │    TOP SHELF             │  ║
║     │   │ 🪓  │ │ 🔧  │ │ 🪣  │ │ 🌾  │ │ 🪚  │                          │  ║
║     │   └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                          │  ║
║     │                                                                       │  ║
║     │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                          │  ║
║     │   │ [5] │ │ [6] │ │ [7] │ │ [8] │ │ [9] │    BOTTOM SHELF          │  ║
║     │   │ 🔨  │ │ 🧵  │ │ 🪤  │ │ 🎣  │ │ 🧤  │                          │  ║
║     │   └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    ← Hammer is here!     │  ║
║     │      ↑                                                               │  ║
║     │      └── INDEX 5 ──────────────────────────────────────              │  ║
║     │                                                                       │  ║
║     └──────────────────────────────────────────────────────────────────────┘  ║
║                                                                                ║
║     [Player can walk to any basket and press E to check]                      ║
║                                                                                ║
║     CHECKS: 0                                                                 ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

#### Basket Contents (Fixed)
```
╔═══════════════════════════════════════════════════════════════╗
║  Index  │  Item      │  Sprite   │  Description              ║
╠═══════════════════════════════════════════════════════════════╣
║    0    │  Rake      │  🪓       │  "A wooden rake"          ║
║    1    │  Wrench    │  🔧       │  "A rusty wrench"         ║
║    2    │  Bucket    │  🪣       │  "An empty bucket"        ║
║    3    │  Seeds     │  🌾       │  "A bag of seeds"         ║
║    4    │  Saw       │  🪚       │  "A carpenter's saw"      ║
║    5    │  HAMMER    │  🔨       │  "The hammer!"  ← TARGET  ║
║    6    │  Thread    │  🧵       │  "Sewing thread"          ║
║    7    │  Trap      │  🪤       │  "A mouse trap"           ║
║    8    │  Fishing   │  🎣       │  "A fishing rod"          ║
║    9    │  Gloves    │  🧤       │  "Work gloves"            ║
╚═══════════════════════════════════════════════════════════════╝
```

### The Key Insight
**The NPC explicitly tells the player the index!**

```
BASKET KEEPER:
"I've lost my hammer! Let me check my notes...
Ah yes! It's in BASKET 5.
Could you grab it for me?"
```

The player KNOWS the answer is index 5. The puzzle tracks whether they:
1. **Go directly to basket 5** (O(1) - Optimal)
2. **Search from basket 0** (O(n) - Linear)
3. **Search randomly** (Inefficient)

### Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    PUZZLE AP-2 FLOW                         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
             ┌────────────────────────┐
             │   PLAYER ENTERS BARN   │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   NPC GIVES INDEX      │
             │  "Basket 5 has the     │
             │   hammer!"             │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   PLAYER EXPLORES      │
             │  (tracking begins)     │
             └───────────┬────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   DIRECT TO 5      LINEAR SEARCH    RANDOM SEARCH
   (1 check)        (1-6 checks)     (varies)
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   HAMMER FOUND!        │
             │   Zelda-style reveal   │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   BEHAVIORAL FEEDBACK  │
             │  (Different for each   │
             │   approach!)           │
             └───────────┬────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │   CONCEPT BRIDGE       │
             └────────────────────────┘
```

---

## 🎨 VISUAL STATES

### Basket States

```
╔═══════════════════════════════════════════════════════════════╗
║                    BASKET VISUAL STATES                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  CLOSED              HOVER               CHECKING             ║
║  ┌─────────┐         ┌─────────┐         ┌─────────┐         ║
║  │ ╔═════╗ │         │ ╔═════╗ │         │ ╔═════╗ │         ║
║  │ ║ [5] ║ │         │ ║▶[5]◀║ │         │ ║ [5] ║ │         ║
║  │ ║     ║ │         │ ║     ║ │         │ ║ ??? ║ │         ║
║  │ ╚═════╝ │         │ ╚═════╝ │         │ ╚═════╝ │         ║
║  └─────────┘         └─────────┘         └─────────┘         ║
║  Wicker texture      Highlight glow      Lid lifting          ║
║  Number visible      Scale 1.05x         Anticipation         ║
║                                                               ║
║  OPEN (Not Target)   OPEN (Target!)      CHECKED              ║
║  ┌─────────┐         ┌─────────┐         ┌─────────┐         ║
║  │ ╔═════╗ │         │ ╔═════╗ │         │ ╔═════╗ │         ║
║  │ ║ [5] ║ │         │ ║ [5] ║ │         │ ║ [5] ║ │         ║
║  │ ║ 🔧  ║ │         │ ║ 🔨✨ ║ │         │ ║ 🔧  ║ │         ║
║  │ ╚═════╝ │         │ ╚═════╝ │         │ ╚═════╝ │         ║
║  └─────────┘         └─────────┘         └─────────┘         ║
║  Item visible        GOLDEN GLOW!        Grayed out           ║
║  "Not the hammer"    Celebration         Already checked      ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### Hammer Discovery Animation
```
ZELDA-STYLE ITEM GET:

Frame 0-15 (0-250ms):
  - Basket lid flips open
  - Light rays emit from inside
  
Frame 15-45 (250-750ms):
  - Player reaches in
  - Hammer rises out of basket
  
Frame 45-90 (750-1500ms):
  - Player holds hammer overhead
  - "DA DA DA DAAA!" style musical flourish
  - Text: "You got the HAMMER!"
  
Frame 90-120 (1500-2000ms):
  - Hammer lowers
  - Return to normal gameplay view
  - NPC reacts with dialogue
```

---

## 🔧 INTERACTION MECHANICS

### Movement
```
BARN LAYOUT:
┌────────────────────────────────────────┐
│                SHELVES                 │
│  [0] [1] [2] [3] [4]                  │
│  [5] [6] [7] [8] [9]                  │
│                                        │
│         WALKABLE FLOOR                 │
│                                        │
│    [PLAYER]          [NPC]            │
│                                        │
└────────────────────────────────────────┘

Player can walk freely and approach any basket.
```

### Interaction
```
APPROACH BASKET:
- Within 48px of basket → Highlight
- Prompt appears: "[E] Check basket 5"

CHECK BASKET:
- Play lid open animation (0.5s)
- Reveal contents
- If hammer: Victory sequence
- If not hammer: "Not here" feedback

TRACKING:
- Record basket index
- Record order of checks
- Record time between checks
```

### Behavior Detection
```javascript
interface PlayerBehavior {
  basketsChecked: number[];       // Order of basket checks
  totalChecks: number;            // How many baskets opened
  firstCheckIndex: number;        // First basket checked
  timeToSolve: number;            // Total time
  
  // Analysis
  approach: 'direct' | 'linear' | 'random';
}

function analyzeApproach(behavior: PlayerBehavior): AnalysisResult {
  // Direct access: First and only check is basket 5
  if (behavior.totalChecks === 1 && behavior.firstCheckIndex === 5) {
    return {
      approach: 'direct',
      message: "You went right to it! That's O(1) access - instant!",
      stars: 3
    };
  }
  
  // Linear search: Checked 0, 1, 2, 3, 4, 5 in order
  if (isLinearSequence(behavior.basketsChecked)) {
    return {
      approach: 'linear',
      message: `You found it, but checked ${behavior.totalChecks} baskets. That's O(n) linear search!`,
      stars: 2
    };
  }
  
  // Random search
  return {
    approach: 'random',
    message: `Found it after ${behavior.totalChecks} tries. With direct indexing, you only need 1!`,
    stars: Math.max(1, 3 - Math.floor(behavior.totalChecks / 3))
  };
}
```

---

## 💡 HINT SYSTEM

### Contextual Hints
This puzzle's hints are embedded in the NPC dialogue:

```
BASKET KEEPER (if player checks wrong basket):

[After check 1-2]:
"Hmm, that's not it. Remember, I said basket 5..."

[After check 3-4]:
"Still looking? I told you exactly where it is!
Basket 5. You can go right to it!"

[After check 5+]:
"Oh dear, you've checked so many! The number on
the basket IS the index. Basket 5 means position 5!"
```

### No Traditional Hint Button
- The puzzle IS about realizing the index is the answer
- Hints are delivered through NPC dialogue
- The 'aha!' moment should come naturally

---

## ⭐ SCORING & STARS

### Star Calculation
```javascript
function calculateStars(totalChecks: number): number {
  if (totalChecks === 1) return 3;      // Direct access!
  if (totalChecks <= 3) return 2;       // Quick find
  return 1;                             // Completed
}
```

### Behavioral Feedback Messages
```
1 CHECK (Direct):
"PERFECT! You went straight to basket 5.
That's O(1) - constant time access!
When you know the index, you go directly there."

2-3 CHECKS:
"Good! You found it quickly.
But did you notice? The index WAS the answer.
Basket 5 = Position 5. Direct access!"

4-6 CHECKS (Linear):
"You searched from the start - that's called
linear search. It works, but takes O(n) time.
With the index, you could have gone straight there!"

7+ CHECKS (Random):
"You checked many baskets! Here's the secret:
The basket NUMBER is its INDEX.
'Basket 5' means 'Go directly to position 5.'
No searching needed!"
```

### Progression Points
- Completion: 15 points
- Direct access (1 check): +10 bonus points
- First-time completion: +5 points

---

## 🎵 AUDIO SPECIFICATION

### Sound Effects

| Trigger | Sound | File | Duration |
|---------|-------|------|----------|
| Approach basket | Wicker creak | `basket_approach.wav` | 0.2s |
| Open basket | Lid flip + rustle | `basket_open.wav` | 0.4s |
| Not the hammer | Disappointed "wah wah" | `not_found.wav` | 0.5s |
| Found hammer! | Triumphant fanfare | `item_get.wav` | 1.5s |
| Close basket | Soft lid close | `basket_close.wav` | 0.3s |

### Item Get Jingle
```
MUSICAL MOTIF:
- 4-note ascending phrase
- Key: C Major
- Notes: C4, E4, G4, C5
- Rhythm: dotted quarter, eighth, quarter, whole
- Style: Classic "Zelda item get"
```

---

## 📜 DIALOGUE SCRIPT

### Intro (Basket Keeper)
```
BASKET KEEPER:
"Oh, hello dear! I've been organizing
this barn for 40 years.

I KNOW where everything is.

The hammer? *checks clipboard*
That's in BASKET 5. Position 5.
Could you grab it for me?

These old legs don't move like they used to!"
```

### During Puzzle (Contextual)
```
[Player approaches basket 5 first]:
BASKET KEEPER:
"That's the one! Smart thinking!"

[Player approaches basket 0 first]:
BASKET KEEPER:
"Starting from the beginning? I suppose
that's one way... but I did say basket 5..."

[Player approaches random basket]:
BASKET KEEPER:
"Hmm, not that one. Remember: basket 5!"
```

### On Completion (Based on Behavior)
```
[DIRECT ACCESS - 1 check]:
BASKET KEEPER:
"Wonderful! You went right to it!

That's the magic of knowing the INDEX.
No searching, no guessing—just go directly
to position 5 and grab what you need.

In computer terms, that's O(1)—constant time.
Instant access, no matter how many baskets!"

[LINEAR SEARCH - multiple checks]:
BASKET KEEPER:
"You found it! But you checked [N] baskets.

Here's the thing: I TOLD you it was basket 5.
That number ISN'T just a label—it's the INDEX.

If you know basket[5] has the hammer, you can
skip straight there. No need to search!

That's the difference between O(1) and O(n)."
```

---

## 🎓 CONCEPT BRIDGE CONTENT

### Section 1: Story Recap
```
PROFESSOR NODE:
"The Basket Keeper told you exactly where
the hammer was: basket 5.

Some of you went right to basket 5.
Some of you searched through other baskets first.

Both approaches found the hammer—but one
was MUCH faster. Let's explore why."
```

### Section 2: Pattern Reveal
```
PROFESSOR NODE:
"This is called ARRAY INDEXING.

An array is just a row of boxes (or baskets).
Each box has a NUMBER called its INDEX.

If someone says 'The hammer is at index 5,'
you don't need to search—you go DIRECTLY
to position 5!

Direct access = O(1) = Instant
Searching = O(n) = Depends on array size"
```

### Section 3: Visual Comparison
```
LINEAR SEARCH (checking one by one):
basket[0] → Not here...
basket[1] → Not here...
basket[2] → Not here...
basket[3] → Not here...
basket[4] → Not here...
basket[5] → Found it!

Time: 6 checks

DIRECT ACCESS (using the index):
basket[5] → Found it!

Time: 1 check

With 1000 baskets, linear search could take
1000 checks. Direct access? Still 1 check!
```

### Section 4: Mini-Forge Practice
```
INDEXING CHALLENGE:

Array: ["apple", "banana", "cherry", "date"]
Index:     0         1          2        3

What is array[2]?

[apple] [banana] [cherry] [date]

CORRECT: cherry ✓

The index tells you EXACTLY where to look!
```

### Section 5: Codex Unlock
```
NEW CODEX ENTRY UNLOCKED!

📖 Array Indexing & Direct Access

"Why search when you can jump directly there?"

[VIEW CODEX] [CONTINUE]
```

---

## 🔗 CODEX ENTRY: ARRAY INDEXING

### What You Felt
The Basket Keeper told you "basket 5" and you either went straight there or searched through other baskets first.

### Plain Explanation
- An **array** is a numbered list of items
- The **index** is the position number (starting from 0)
- **Direct access** means going straight to a position using its index
- This is O(1)—"constant time"—it takes the same time whether the array has 10 or 10 million items!
- **Linear search** means checking items one by one until you find it
- This is O(n)—"linear time"—it takes longer for bigger arrays

### Pattern Steps (Direct Access)
1. KNOW the index you want
2. GO directly to that position
3. RETRIEVE the item
4. DONE! No searching needed.

### Real World Applications
- 📚 Book page numbers: "Go to page 47"
- 🏨 Hotel rooms: "Room 305" = Floor 3, Room 5
- 🅿️ Parking spots: "Space B-12"
- 📦 P.O. Boxes: Box number = Direct location
- 🎬 Video timestamps: Jump to 3:45
- 📊 Spreadsheet cells: "A5" = Column A, Row 5

### Unlocked Ability
You now understand that **indices are instant lookups**. When you have an index, you have direct access. No searching required.

---

## 🛠️ IMPLEMENTATION NOTES

### Scene Configuration
```typescript
// Puzzle_AP2_Scene configuration
{
  key: 'Puzzle_AP2_Scene',
  parent: 'BasePuzzleScene',
  
  baskets: {
    count: 10,
    arrangement: '2_rows_5_columns',
    targetIndex: 5,
    targetItem: 'hammer'
  },
  
  tracking: {
    enabled: true,
    recordOrder: true,
    recordTimestamps: true
  },
  
  contents: [
    { index: 0, item: 'rake', sprite: 'tool_rake' },
    { index: 1, item: 'wrench', sprite: 'tool_wrench' },
    // ... etc
    { index: 5, item: 'hammer', sprite: 'tool_hammer' },
    // ... etc
  ]
}
```

### State Machine
```
States:
- IDLE (before start)
- INTRO (NPC dialogue)
- EXPLORING (player can check baskets)
- CHECKING (basket opening animation)
- REVEAL_WRONG (not the hammer)
- REVEAL_CORRECT (item get sequence)
- FEEDBACK (behavioral analysis)
- CONCEPT_BRIDGE
```

### Behavior Tracking
```typescript
class BehaviorTracker {
  private checksLog: {index: number, timestamp: number}[] = [];
  
  recordCheck(basketIndex: number): void {
    this.checksLog.push({
      index: basketIndex,
      timestamp: Date.now()
    });
  }
  
  analyze(): BehaviorAnalysis {
    return {
      totalChecks: this.checksLog.length,
      order: this.checksLog.map(c => c.index),
      firstCheck: this.checksLog[0]?.index,
      approach: this.determineApproach()
    };
  }
  
  private determineApproach(): 'direct' | 'linear' | 'random' {
    if (this.checksLog.length === 1 && this.checksLog[0].index === 5) {
      return 'direct';
    }
    // Check for 0, 1, 2, 3... pattern
    if (this.isLinearFromStart()) {
      return 'linear';
    }
    return 'random';
  }
}
```

---

## 🧪 TESTING CHECKLIST

### Functionality
- [ ] All 10 baskets are interactable
- [ ] Only hammer triggers victory
- [ ] Behavior tracking records correctly
- [ ] Appropriate feedback for each approach
- [ ] Stars calculate based on checks

### Visual
- [ ] Basket open animation works
- [ ] Item get sequence plays fully
- [ ] Checked baskets show as checked
- [ ] NPC expressions change contextually

### Audio
- [ ] Basket sounds play correctly
- [ ] Item get fanfare is satisfying
- [ ] "Not found" sound is distinct but not punishing

### Edge Cases
- [ ] Can't check same basket twice (grayed out)
- [ ] Direct to basket 5 path works perfectly
- [ ] All feedback messages display correctly

---

*"The best search is no search at all."*
— Basket Keeper

