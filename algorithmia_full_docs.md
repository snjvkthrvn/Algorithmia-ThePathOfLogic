# Algorithmia: The Path of Logic - Complete Documentation

**Version:** 2.0  
**Last Updated:** 2025-01-27  
**Project Status:** Active Development (Web Implementation)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Game Design Document (GDD)](#game-design-document-gdd)
4. [Puzzle Design Document (PDD)](#puzzle-design-document-pdd)
5. [Codebase Structure](#codebase-structure)
6. [Implementation Details](#implementation-details)
7. [Development Roadmap](#development-roadmap)
8. [API Reference](#api-reference)

---

## Project Overview

**Algorithmia: The Path of Logic** is an educational puzzle-adventure web game that teaches Data Structures & Algorithms (DSA) through intuitive spatial puzzles, world exploration, and pattern recognition training.

### Core Mission

Transform abstract algorithm concepts into tangible, interactive experiences. Players learn DSA through gameplay, not lectures - experiencing algorithmic thinking first, then understanding the formal concepts.

### Key Features

- **Interactive Puzzles**: Visual, spatial challenges that teach algorithms through gameplay
- **Concept Bridge System**: AI-powered explanations connecting gameplay to code concepts
- **Codex System**: In-game encyclopedia ("DSA Pokédex") that unlocks as you progress
- **Three Regions**: Prologue, Array Plains, and Twin Rivers with unique challenges
- **Boss Battles**: Multi-phase algorithm challenges testing pattern mastery
- **No Coding Required**: Experience algorithmic thinking first, formalize later

### Target Audience

- CS students (16-25 years old)
- Self-taught programmers
- Technical interview prep seekers
- Bootcamp students
- Anyone learning Data Structures & Algorithms

### Educational Philosophy

**Three-Part Learning System:**

1. **Spatial Puzzle Phase** - Interactive puzzles teach algorithmic thinking
2. **Concept Bridge Phase** - Professor Node explains the algorithm used
3. **Codex Entry Phase** - Permanent reference system for the concept

---

## Technical Architecture

### Technology Stack

**Frontend Framework:**
- React 19 with TypeScript
- Vite for build tooling and development server

**Game Engine:**
- Phaser 3 (HTML5 game framework)
- Arcade physics for collision detection
- Scene-based architecture

**State Management:**
- Zustand for global game state
- Local storage for save data (planned)

**Styling:**
- Tailwind CSS for utility-first styling
- Custom CSS for game-specific UI

**AI Integration:**
- OpenAI API (GPT-4o-mini) for Concept Bridge explanations
- Client-side API calls (requires API key)

**Development Tools:**
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

### Project Structure

```
algorithmia-web/
├── public/
│   └── assets/
│       └── sprites/
│           ├── characters/
│           │   └── player-test.png
│           └── environment/
│               ├── floor-tile.png
│               ├── tileset-test.png
│               └── wall-tile.png
│
├── src/
│   ├── components/          # React UI components
│   │   └── PhaserGame.tsx  # Phaser integration wrapper
│   │
│   ├── game/               # Phaser game code
│   │   ├── config/
│   │   │   └── gameConfig.ts      # Phaser game configuration
│   │   ├── entities/
│   │   │   └── Player.ts          # Player entity with movement
│   │   └── scenes/                # Phaser scenes
│   │       ├── BootScene.ts       # Asset loading
│   │       ├── MenuScene.ts       # Main menu
│   │       ├── GameScene.ts       # Main game world
│   │       ├── Puzzle_P0_1_Scene.ts  # First puzzle implementation
│   │       └── ConceptBridgeScene.ts # Post-puzzle tutorial
│   │
│   ├── store/              # State management
│   │   └── gameStore.ts    # Zustand store for game state
│   │
│   ├── data/               # Game data (regions, puzzles)
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── regions/
│   │       ├── prologue/
│   │       │   ├── regionConfig.ts
│   │       │   ├── puzzles.ts
│   │       │   ├── npcs.ts
│   │       │   └── index.ts
│   │       ├── arrayplains/
│   │       │   └── [same structure]
│   │       └── twinrivers/
│   │           └── [same structure]
│   │
│   ├── services/           # External services
│   │   └── openaiService.ts  # OpenAI API integration
│   │
│   ├── App.tsx            # Main React component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### Architecture Patterns

**Scene-Based Game Architecture:**
- Phaser scenes for different game states (Menu, Game, Puzzle, Concept Bridge)
- Scene transitions via `scene.start()` and `scene.stop()`
- Data passing between scenes via `scene.start(key, data)`

**Component Separation:**
- React handles UI layer (menus, overlays, HUD)
- Phaser handles game layer (rendering, physics, game logic)
- Zustand manages shared state between layers

**Data-Driven Design:**
- Puzzle configurations in TypeScript files (`puzzles.ts`)
- Region configurations in separate files (`regionConfig.ts`)
- Type-safe with TypeScript interfaces

---

## Game Design Document (GDD)

### Core Gameplay Pillars

1. **Exploration**
   - Top-down 2D pixel world
   - Walk around regions and natural areas
   - Talk to NPCs
   - Step into puzzle zones or interact with puzzle objects

2. **Intuitive DSA Puzzles**
   - Each region contains 3-5 puzzles
   - Each puzzle is a visual/metaphorical representation of an algorithmic pattern
   - Difficulty escalates gradually

3. **Concept Bridge (Core Feature)**
   - After each puzzle:
     - NPC explains what the player actually did
     - Introduces the DSA pattern informally
     - Shows commented pseudocode
     - Provides a mini interactive practice exercise
     - Updates the Codex

4. **Boss Puzzle Battles**
   - No combat
   - Multi-step, high-intensity puzzles
   - Each boss represents a FAANG-style algorithm pattern
   - Completing all region puzzles unlocks boss

5. **Codex System**
   - In-game encyclopedia
   - Stores all patterns, explanations, and worked examples
   - Unlocks entries as you complete puzzles

### Controls

- **Move**: WASD / Arrow Keys
- **Interact**: E
- **Menu**: ESC
- **Codex**: C (planned)
- **Inventory**: I (planned)
- **Fast-forward dialogue**: Space

### World Structure (Early Access Scope)

**Regions Included:**
- **Region 0: Prologue** (Chamber of Flow) - 2 puzzles + boss
- **Region 1: Array Plains** - 4 puzzles + boss
- **Region 2: Twin Rivers** - 4 puzzles + boss

**Region Flow:**
Prologue → Array Plains → Twin Rivers → End of EA

**Each Region Contains:**
- 3-5 core puzzles
- 1 boss battle
- NPCs with dialogue
- Logic Forge challenges (planned)
- Codex entries

---

## Puzzle Design Document (PDD)

### Region 0 — Prologue: Chamber of Flow

**Theme:** Abstract, ethereal void with floating white tiles  
**Purpose:** Teach exploration basics, introduce puzzle activation, establish tone

#### Puzzle P0-1 — Follow the Path

**Concept:** Pattern Matching / Sequential Reasoning  
**Difficulty:** Very Easy  
**Environment:** Floating white tiles in a void-like arena  
**Trigger:** Player steps on first tile OR interacts with the floating crystal

**Mechanics:**
- A sequence of tiles glows; player repeats the sequence
- Correct tile = chime
- Wrong tile = flash + reset
- Complete 2-3 rounds of pattern growth

**Solution:** Complete 2-3 rounds of pattern growth  
**Failure Conditions:** Wrong tile; leaving puzzle zone

**NPC Dialogue:** "Patterns are the rhythm of logic. Trust what you saw."

**Concept Bridge Sections:**
1. **Story Recap** - What you just did
2. **Pattern Reveal** - Explained slowly (Sequence Recognition)
3. **Pseudocode** - Simple program with casual explanation
4. **Mini-Forge Practice** - Tiny interactive drill
5. **Codex Unlock** - Patterns & Sequence Recognition entry

**Codex Entry Unlocked:** `CODEX_SEQUENTIAL_PROCESSING`
- What You Felt
- Plain Explanation
- Pattern Steps
- Where You'll See This Again
- Unlocked Ability

#### Puzzle P0-2 — Fractured Sentinel

**Concept:** Spatial Reasoning / Mapping (precursor to Hashing)  
**Difficulty:** Easy  
**Environment:** Floating stone platform; 3-4 crystal fragments; Sentinel frame  
**Trigger:** Interact with any shard

**Mechanics:**
- Push/pull shards; each fits only one socket; snaps when correct
- Assemble all shards correctly

**Solution:** Assemble all shards correctly  
**Failure Conditions:** None (puzzle can be retried)

**NPC Dialogue:** "Logic begins with placing each piece where it belongs."

**Concept Bridge Sections:**
1. **Story Recap** - What you just did
2. **Pattern Reveal** - Mapping explained
3. **Pseudocode** - Mapping logic
4. **Mini-Forge Practice** - Fragment matching drill
5. **Codex Unlock** - Mapping & Matching entry

**Codex Entry Unlocked:** `CODEX_MAPPING_HASHING`

#### Prologue Boss — The Fractured Sentinel

**Concept:** Multi-step pattern mastery  
**Difficulty:** Easy  
**Type:** Multi-phase puzzle boss

**Phases:**
1. **Pattern Echo** - Repeat longer pattern sequence (6 tiles, 10 seconds)
2. **Fragment Storm** - Assemble 6 fragments while Sentinel attacks
3. **Chaos Fusion** - Combine both mechanics simultaneously

**Solution:** Complete all phases without error  
**Fail Conditions:** Incorrect tile resets phase

**Narrative Result:** Sentinel awakens → opens path to Array Plains

**Victory Rewards:**
- Codex entries: `CODEX_SEQUENTIAL_PROCESSING`, `CODEX_MAPPING_HASHING`
- Unlocked regions: `arrayplains`
- Progression points: 50
- Special items: `tutorial_completion_badge`

---

### Region 1 — Array Plains

**Theme:** Order, indexing, grouping. Inspired by sorted farmland and organized crop fields.  
**Atmosphere:** Rows of crops, each labeled. Barns filled with baskets and crates. Villagers frustrated by "out-of-order" items.

**Concepts Taught:**
- Arrays
- Sorting
- Hashing
- Two Sum Pattern

#### Puzzle AP1 — Fix the Farmland

**Concept:** Sorting / Indexing  
**Difficulty:** Easy - Medium  
**Environment:** Cropland tiles labeled 0-7  
**Trigger:** NPC - "The fields are scrambled! Help me fix them!"

**Mechanics:**
- Push tiles left/right; lock when correct
- Ordered row: 0 1 2 3 4 5 6 7

**Solution:** Ordered row 0 1 2 3 4 5 6 7  
**Fail Conditions:** Leaving puzzle resets

**Concept Bridge:**
- Story Recap: Taking scrambled sequence, reordering it
- Pattern Reveal: Sorting explained (Bubble Sort, Selection Sort)
- Pseudocode: Bubble Sort and Selection Sort algorithms
- Mini-Forge: Sorting drill with visual feedback
- Codex Unlock: Sorting & Ordered Fields

**Codex Entry:** `CODEX_SORTING_ALGORITHMS`

#### Puzzle AP2 — Find the Lost Tool

**Concept:** O(1) Access / Direct Indexing  
**Difficulty:** Easy  
**Environment:** Barn with baskets labeled 0-9  
**Trigger:** NPC - "My tool is in basket 5…"

**Mechanics:**
- Walk to Basket 5; no searching
- Demonstrates O(1) direct access vs O(n) linear search

**Solution:** Selecting index directly  
**Failure Conditions:** None

**Concept Bridge:**
- Story Recap: Direct access vs searching
- Pattern Reveal: Array indexing explained
- Pseudocode: Direct access vs linear search comparison
- Mini-Forge: Direct access drill
- Codex Unlock: Array Indexing (O(1))

**Codex Entry:** `CODEX_ARRAY_INDEXING`

#### Puzzle AP3 — Organize the Harvest

**Concept:** Hashing / Bucketing  
**Difficulty:** Medium  
**Environment:** Barn floor with buckets A, B, C, D; falling crop items  
**Trigger:** Interact with hopper

**Mechanics:**
- Items fall → hash rule decides bucket → collisions occur → player groups correctly
- Hash rule: Grain→A, Berries→B, Roots→C, Herbs→D

**Solution:** Map item → bucket  
**Fail Conditions:** Wrong bucket = 5 sec delay

**Concept Bridge:**
- Story Recap: Using rule to decide bucket
- Pattern Reveal: Hashing explained
- Pseudocode: Hash function and hash table logic
- Mini-Forge: Bucket assignment drill
- Codex Unlock: Hashing & Buckets

**Codex Entry:** `CODEX_HASHING`

#### Puzzle AP4 — The Pairing Grounds

**Concept:** Two Sum  
**Difficulty:** Medium - Hard  
**Environment:** Number tiles; Target = e.g. 11  
**Mechanics:** Step on 2 tiles that sum to target

**Solution:** Find tiles that sum to target  
**Failure:** Wrong pair resets

**Concept Bridge:**
- Story Recap: Finding pairs using complement technique
- Pattern Reveal: Two Sum pattern explained
- Pseudocode: Two Sum algorithm (hash set approach)
- Mini-Forge: Partner matching drill
- Codex Unlock: Two Sum Pattern

**Codex Entry:** `CODEX_TWO_SUM`

#### Array Plains Boss — The Shuffler

**Pattern Inspiration:** Sorting + Hashing + Two Sum  
**Difficulty:** Medium  
**Type:** Hybrid Puzzle Boss

**Phases:**
1. **Chaos Sort** - Sort 12 numbered tiles (0-11) in 45 seconds while Shuffler randomly swaps
2. **Index Rush** - Retrieve 10 items from 20 baskets using direct indexing (60 seconds)
3. **Hash Storm** - Hash 30 items to 6 buckets rapidly (75 seconds, speed increases)
4. **Pair Pandemonium** - 5 rounds of Two Sum challenges with 20 tiles each (90 seconds)

**Solution:** Solve each algorithmic phase  
**Fail Conditions:** Wrong tile resets phase

**Narrative Result:** Flow restored to Array Plains

**Victory Rewards:**
- Codex entries: All Array Plains entries
- Unlocked regions: `twinrivers`
- Progression points: 100
- Special items: `array_plains_mastery_badge`, `shuffler_trophy`

---

### Region 2 — Twin Rivers

**Theme:** Mirrored riverbanks, warm vs cold waters, floating bridges  
**Concepts Taught:**
- Two Pointers
- Pointer Movement
- Sliding Window

#### Puzzle TR1 — Mirror Walk

**Concept:** Two Pointers (Symmetric)  
**Difficulty:** Easy - Medium  
**Environment:** Two mirrored banks  
**Trigger:** Step on start tile

**Mechanics:**
- Movement mirrored; break symmetry = reset
- Control two characters simultaneously

**Solution:** Reach central glowing tile  
**Failure Conditions:** Breaking symmetry resets

**Concept Bridge:**
- Story Recap: Controlling two versions simultaneously
- Pattern Reveal: Two Pointers technique explained
- Pseudocode: Palindrome check example
- Mini-Forge: Symmetry & movement drill
- Codex Unlock: Two Pointers (Mirror Walk)

**Codex Entry:** `CODEX_TWO_POINTERS`

#### Puzzle TR2 — Meeting Point

**Concept:** Conditional Pointer Convergence  
**Difficulty:** Medium  
**Environment:** Traps (X), Anchors (A), narrow path

**Mechanics:**
- Pointers move inward; can only pass traps when other pointer stands on matching anchor
- Correct sequence of conditional pointer moves

**Solution:** Correct sequence of conditional pointer moves  
**Failure:** Illegal move → reset

**Concept Bridge:**
- Story Recap: Conditional movement based on positions
- Pattern Reveal: Conditional Pointer Logic explained
- Pseudocode: Trap + anchor logic
- Mini-Forge: Conditional move drill
- Codex Unlock: Conditional Pointer Logic

**Codex Entry:** `CODEX_POINTER_CONVERGENCE`

#### Puzzle TR3 — Sliding Window Catch

**Concept:** Sliding Window  
**Difficulty:** Medium - Hard  
**Environment:** Flowing river with items; adjustable window frame

**Mechanics:**
- Expand/shrink window to capture required sequence: e.g. 3 🌾 + 1 🍓
- Identify valid contiguous window

**Solution:** Identify valid contiguous window  
**Failure:** Holding invalid window too long

**Concept Bridge:**
- Story Recap: Maintaining continuous window
- Pattern Reveal: Sliding Window technique explained
- Pseudocode: Sliding window template
- Mini-Forge: Window adjustment drill
- Codex Unlock: Sliding Window Technique

**Codex Entry:** `CODEX_SLIDING_WINDOW`

#### Puzzle TR4 — Breaking the Currents

**Concept:** Non-symmetric Pointer Updates  
**Difficulty:** Medium - Hard  
**Environment:** Tiles with currents that push values

**Mechanics:**
- Maintain symmetry value while currents modify pointer values
- Move pointer with lower value first

**Solution:** Move pointer with lower value first  
**Failure:** Symmetry difference too large

**Concept Bridge:**
- Story Recap: Balancing changing values
- Pattern Reveal: Non-Symmetric Pointer Logic explained
- Pseudocode: Non-symmetric pointer updates
- Mini-Forge: Non-symmetric pointer drill
- Codex Unlock: Non-Symmetric Pointer Adjustments

**Codex Entry:** `CODEX_ADVANCED_POINTERS`

#### Twin Rivers Boss — Mirror Serpent

**Pattern Inspiration:** Two Pointers + Sliding Window  
**Difficulty:** Hard  
**Type:** Traversal + Pattern Boss

**Phases:**
1. **Symmetry Trial** - Move two characters in mirrored paths (60 seconds)
2. **Convergence Challenge** - Reach exact meeting point discovering correct logic (50 seconds)
3. **Sliding Window Trap** - Adjust window to capture serpent's weak spot (75 seconds)
4. **Combined Final** - Perform all mechanics under timed pressure (90 seconds)

**Solution:** Solve each phase  
**Failure:** Wrong logic resets phase

**Narrative Result:** Path to next region unlocked

**Victory Rewards:**
- Codex entries: All Twin Rivers entries
- Unlocked regions: `graphgrove` (planned)
- Progression points: 150
- Special items: `twin_rivers_mastery_badge`, `serpent_scale`, `pointer_mastery_gem`

---

## Codebase Structure

### Type System

All game data types are defined in `src/data/types.ts`:

**Core Enums:**
- `Difficulty`: VERY_EASY, EASY, MEDIUM, HARD, VERY_HARD
- `AlgorithmType`: All algorithm concepts (PATTERN_MATCHING, SORTING, TWO_POINTERS, etc.)
- `PuzzleType`: INTERACTIVE, BOSS, MINI_FORGE
- `NPCType`: MENTOR, GUIDE, VILLAGER, BOSS

**Core Interfaces:**
- `RegionConfig`: Complete region definition
- `PuzzleConfig`: Puzzle mechanics, solution, rewards, concept bridge
- `BossConfig`: Extends PuzzleConfig with phases
- `ConceptBridge`: Sections, mini-forge challenges
- `CodexEntry`: Algorithm documentation
- `NPCConfig`: NPC definitions with dialogue trees

### Game State Management

**Zustand Store (`src/store/gameStore.ts`):**

```typescript
interface GameState {
  currentRegion: string;
  puzzlesCompleted: number;
  codexEntriesUnlocked: number;
  playerPosition: { x: number; y: number };
  playerHealth: number;
  isMenuOpen: boolean;
  isCodexOpen: boolean;
  isDialogueActive: boolean;
  // ... actions
}
```

**Current Implementation:**
- Basic state tracking (puzzles completed, codex entries)
- Player position tracking
- UI state (menu, codex, dialogue)
- Actions for updating state

**Planned Features:**
- Save/load system (localStorage)
- Puzzle completion tracking per puzzle
- Codex entry unlock tracking
- Region unlock tracking

### Phaser Scenes

**BootScene:**
- Preloads all game assets
- Sets up Phaser configuration
- Transitions to MenuScene when complete

**MenuScene:**
- Main menu UI
- Start game / Continue options
- Settings (planned)
- Codex access (planned)

**GameScene:**
- Main game world
- Player movement and collision
- Tile-based world rendering
- Puzzle trigger detection
- NPC interaction (planned)

**Puzzle_P0_1_Scene:**
- First puzzle implementation (Follow the Path)
- Sequence generation and display
- Player input handling
- Solution validation
- Transition to ConceptBridgeScene on success

**ConceptBridgeScene:**
- Displays AI-generated explanation
- Shows puzzle completion stats
- Transitions back to GameScene

### Player Entity

**Player Class (`src/game/entities/Player.ts`):**

```typescript
class Player extends Phaser.Physics.Arcade.Sprite {
  private moveSpeed: number = 160;
  
  handleMovement(cursors, wasd): void {
    // WASD/Arrow key input handling
    // Normalized diagonal movement
    // Velocity application
  }
}
```

**Current Features:**
- 4-directional movement (WASD/Arrow keys)
- Normalized diagonal movement
- Physics-based movement with Arcade physics
- Collision detection with walls

**Planned Features:**
- 8-directional sprite animations
- Animation state machine
- Touch controls for mobile
- Gamepad support

### Puzzle System

**Current Implementation:**
- `Puzzle_P0_1_Scene` - Fully implemented
- Puzzle data in `src/data/regions/*/puzzles.ts`
- Type-safe puzzle configurations
- Concept Bridge integration

**Puzzle Data Structure:**
```typescript
interface PuzzleConfig {
  id: string;
  name: string;
  displayName: string;
  type: PuzzleType;
  difficulty: Difficulty;
  algorithmConcept: AlgorithmType;
  description: string;
  mechanics: PuzzleMechanics;
  solution: PuzzleSolution;
  hints: string[];
  rewards: PuzzleRewards;
  conceptBridge: ConceptBridge;
  codexEntry: CodexEntry;
}
```

**Planned Features:**
- Puzzle scene factory/loader
- Dynamic puzzle scene generation from config
- Puzzle state persistence
- Hint system UI
- Star rating system

### Concept Bridge System

**Current Implementation:**
- `ConceptBridgeScene` displays AI-generated explanations
- OpenAI API integration via `openaiService.ts`
- Personalized explanations based on puzzle performance

**AI Service (`src/services/openaiService.ts`):**

```typescript
async function generateConceptExplanation(puzzleData: PuzzleData): Promise<string>
```

**Features:**
- Uses GPT-4o-mini model
- Personalized based on attempts and time spent
- Markdown-formatted explanations
- Error handling for API failures

**Planned Features:**
- Structured Concept Bridge sections (Story Recap, Pattern Reveal, etc.)
- Mini-Forge practice exercises
- Codex unlock notifications
- Skip/fast-forward functionality

### Region System

**Current Implementation:**
- Region configurations in `src/data/regions/*/regionConfig.ts`
- Type-safe region definitions
- Spawn points, exit points, NPCs, puzzles defined

**Region Data Structure:**
```typescript
interface RegionConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  theme: RegionTheme;
  unlockRequirements: UnlockRequirements;
  spawnPoint: Position;
  exitPoints: ExitPoint[];
  npcs: NPCReference[];
  puzzles: PuzzleReference[];
  interactables: Interactable[];
}
```

**Planned Features:**
- Region scene loading from config
- Dynamic region generation
- Region unlock system
- Region-specific music and ambiance

---

## Implementation Details

### Asset Loading

**Current Assets:**
- Player sprite: `player-test.png`
- Environment tiles: `floor-tile.png`, `wall-tile.png`, `tileset-test.png`

**Asset Loading (BootScene):**
```typescript
this.load.image('player-test', 'assets/sprites/characters/player-test.png');
this.load.image('floor-tile', 'assets/sprites/environment/floor-tile.png');
this.load.image('wall-tile', 'assets/sprites/environment/wall-tile.png');
```

**Planned Improvements:**
- Sprite atlas optimization
- WebP format with PNG fallback
- Lazy loading for non-critical assets
- Asset preloading progress bar

### Physics System

**Current Implementation:**
- Arcade physics engine
- Player collision with static walls
- No gravity (top-down game)

**Physics Configuration:**
```typescript
physics: {
  default: 'arcade',
  arcade: {
    gravity: { x: 0, y: 0 },
    debug: false,
  },
}
```

**Planned Features:**
- Collision layers for different object types
- Trigger zones for puzzles and interactions
- Physics-based puzzle mechanics

### Camera System

**Current Implementation:**
- Camera follows player with smooth lerp
- Basic camera setup in GameScene

```typescript
this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
```

**Planned Features:**
- Camera bounds (constrain to world boundaries)
- Zoom controls for accessibility
- Camera shake effects
- Smooth transitions between regions

### Input System

**Current Implementation:**
- Keyboard input (WASD/Arrow keys)
- Cursor keys and WASD keys tracked separately
- Input handled in Player entity

**Planned Features:**
- Touch controls for mobile
- Virtual joystick
- Gamepad support
- Input remapping
- Accessibility options

### Puzzle Implementation Status

**Implemented:**
- ✅ P0-1: Follow the Path (fully functional)
  - Sequence generation
  - Visual feedback
  - Solution validation
  - Concept Bridge integration

**Planned:**
- ⏳ P0-2: Fractured Sentinel
- ⏳ All Array Plains puzzles (AP1-AP4)
- ⏳ All Twin Rivers puzzles (TR1-TR4)
- ⏳ Boss battles (Fractured Sentinel, Shuffler, Mirror Serpent)

### Codex System

**Current Status:** Data structure defined, UI not implemented

**Planned Features:**
- Codex UI component (grid view)
- Entry detail view
- Lock/unlock states
- Search and filter
- Bookmarking
- Personal notes

### Dialogue System

**Current Status:** Data structure defined, UI not implemented

**Planned Features:**
- Dialogue UI component
- Typewriter text effect
- Character portraits
- Multiple choice responses
- Dialogue tree navigation
- Skip/fast-forward

---

## Development Roadmap

### Phase 1: Core Gameplay (Current)

**Completed:**
- ✅ Project setup (React + TypeScript + Vite + Phaser)
- ✅ Basic player movement
- ✅ Tile-based world rendering
- ✅ First puzzle (P0-1) implementation
- ✅ Concept Bridge system (AI integration)
- ✅ Basic state management (Zustand)
- ✅ Region and puzzle data structures

**In Progress:**
- 🔨 Additional puzzle implementations
- 🔨 Concept Bridge UI refinements
- 🔨 Codex UI system

**Next Steps:**
- Implement P0-2 puzzle
- Build Codex UI
- Implement dialogue system
- Add NPC interactions
- Implement remaining puzzles

### Phase 2: Content & Polish

**Planned:**
- Complete all puzzle implementations
- Build Codex system UI
- Implement dialogue system
- Add NPCs with dialogue
- Create Logic Forge challenges
- Add sound effects and music
- Implement save/load system

### Phase 3: Optimization & Mobile

**Planned:**
- Mobile optimization
- Touch controls
- Responsive UI
- PWA support
- Performance optimization
- Cross-browser testing

### Phase 4: Launch Preparation

**Planned:**
- QA testing
- User testing
- Bug fixes
- Performance tuning
- Documentation
- Deployment setup

---

## API Reference

### Game Store API

**State:**
```typescript
const {
  currentRegion,
  puzzlesCompleted,
  codexEntriesUnlocked,
  playerPosition,
  isMenuOpen,
  isCodexOpen,
  isDialogueActive
} = useGameStore();
```

**Actions:**
```typescript
setCurrentRegion(region: string): void
incrementPuzzlesCompleted(): void
unlockCodexEntry(): void
updatePlayerPosition(x: number, y: number): void
setMenuOpen(isOpen: boolean): void
setCodexOpen(isOpen: boolean): void
setDialogueActive(isActive: boolean): void
resetGame(): void
```

### OpenAI Service API

```typescript
async function generateConceptExplanation(
  puzzleData: PuzzleData
): Promise<string>
```

**Parameters:**
- `puzzleData.puzzleName`: string
- `puzzleData.concept`: string
- `puzzleData.attempts`: number
- `puzzleData.timeSpent`: number (seconds)

**Returns:** Promise<string> - Markdown-formatted explanation

**Environment Variable Required:**
- `VITE_OPENAI_API_KEY`: OpenAI API key

### Phaser Scene API

**Scene Transitions:**
```typescript
// Start a new scene
this.scene.start('SceneKey', { data: value });

// Stop current scene
this.scene.stop('SceneKey');

// Restart scene
this.scene.restart();
```

**Scene Data:**
```typescript
// Set data
this.registry.set('key', value);

// Get data
const value = this.registry.get('key');
```

### Puzzle Configuration API

**Creating a New Puzzle:**
1. Define puzzle config in `src/data/regions/{region}/puzzles.ts`
2. Export as `PuzzleConfig` type
3. Add to region's puzzle array
4. Create Phaser scene for puzzle logic
5. Register scene in `gameConfig.ts`

**Example:**
```typescript
export const AP1_FixTheFarmland: PuzzleConfig = {
  id: 'AP1',
  name: 'fix_the_farmland',
  displayName: 'Fix the Farmland',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.EASY,
  algorithmConcept: AlgorithmType.SORTING,
  // ... full configuration
};
```

---

## Educational Content Summary

### Algorithms Covered (Early Access)

**Prologue:**
1. Sequential Processing & Loops
2. Mapping & Hash Functions
3. Hybrid Problem Solving

**Array Plains:**
4. Sorting Algorithms (Bubble Sort, Selection Sort)
5. Array Indexing & Direct Access (O(1))
6. Hash Functions & Hash Tables
7. Two Sum Pattern

**Twin Rivers:**
8. Two Pointers Pattern
9. Pointer Convergence & Sorted Array Optimization
10. Sliding Window Technique
11. Advanced Pointer Techniques

**Total:** 11 core algorithm concepts in Early Access

### Learning Outcomes

By completing Early Access, players will:
- Understand fundamental array operations
- Master sorting and searching techniques
- Learn hash table concepts and applications
- Grasp two-pointer and sliding window patterns
- Recognize when to apply different algorithmic techniques
- Build intuition for time/space complexity
- Prepare for technical interviews with pattern recognition

---

## Technical Specifications

### Performance Targets

- **Load Time:** <3 seconds on 4G connection
- **Bundle Size:** <2 MB initial load, <5 MB total
- **Frame Rate:** Stable 60 FPS on modern devices, 30 FPS on older hardware
- **Mobile Performance:** Playable on iPhone 8+, mid-range Android devices
- **Browser Support:** Chrome, Firefox, Safari, Edge (last 2 versions)

### Accessibility Goals

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Colorblind mode
- Text size options
- Reduced motion option

### Browser Compatibility

**Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- ES6+ JavaScript
- Canvas API
- Local Storage
- Fetch API

---

## Contributing Guidelines

### Code Style

- TypeScript strict mode
- Functional components (React)
- ES6+ features
- Descriptive variable names
- Comments for complex logic
- JSDoc for public APIs

### File Naming

- Components: PascalCase (`Player.ts`, `GameScene.ts`)
- Utilities: camelCase (`gameStore.ts`, `openaiService.ts`)
- Constants: UPPER_SNAKE_CASE
- Types: PascalCase interfaces/types

### Git Workflow

- Feature branches from `main`
- Descriptive commit messages
- Pull requests for review
- Test before merging

---

## License & Credits

**License:** MIT License

**Created by:** Sanjeev Kathiravan & Radwan Hoque

**Acknowledgments:**
- Inspired by educational games and the need for better DSA learning tools
- Built with modern web technologies for maximum accessibility
- Special thanks to the open-source community

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2025-01-27 | Complete rewrite with accurate codebase documentation |
| 1.0 | Previous | Original combined GDD + PDD document |

---

**End of Documentation**
