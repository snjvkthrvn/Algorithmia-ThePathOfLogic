# 🎮 ALGORITHMIA: THE PATH OF LOGIC
## Complete Onboarding Document for New Team Members

**Last Updated:** November 16, 2025  
**Project Status:** Early Development - Array Plains Region  
**Engine:** Godot 4.2 (2D)  
**Genre:** Educational Puzzle Adventure RPG  

---

# 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Game Concept & Vision](#game-concept--vision)
3. [Technical Architecture](#technical-architecture)
4. [Current Development Status](#current-development-status)
5. [Art Assets & Style Guide](#art-assets--style-guide)
6. [Unity MCP Integration](#unity-mcp-integration)
7. [Region Designs](#region-designs)
8. [What's Been Completed](#whats-been-completed)
9. [Next Steps](#next-steps)
10. [Development Workflow](#development-workflow)

---

# 1. PROJECT OVERVIEW

## What is Algorithmia?

**Algorithmia: The Path of Logic** is an educational 2D puzzle adventure game that teaches Data Structures & Algorithms (DSA) through engaging gameplay, not lectures.

### Core Philosophy
- **Learn by doing:** Players experience algorithmic patterns through spatial puzzles
- **No code required:** Concepts taught through intuition first, then formalized
- **Pokémon-inspired progression:** Collect patterns in a "Codex" (DSA Pokédex)
- **Concept Bridges:** After each puzzle, Professor Node explains what you just learned

### Target Audience
- CS students preparing for technical interviews
- Self-taught programmers learning DSA
- Anyone curious about how algorithms work
- Age range: 16+ (high school to adult learners)

---

# 2. GAME CONCEPT & VISION

## The Learning System

### Three-Part Educational Flow:

1. **Spatial Puzzle**
   - Player solves a physical puzzle in the game world
   - Example: Organizing numbered tiles, finding items in baskets
   
2. **Concept Bridge**
   - Professor Node appears after completion
   - Explains the algorithmic pattern you just used
   - Shows pseudocode with plain English explanations
   - Mini-practice exercise
   
3. **Codex Entry**
   - New pattern unlocked in your DSA Pokédex
   - Includes: explanation, pseudocode, real-world examples
   - 1-2 practice problem descriptions

### The Logic Forge

A special building in each region where players can:
- Practice arranging algorithm steps
- Test their understanding with interactive challenges
- Unlock advanced variations of patterns

---

## Story & Characters

### Setting
A world where logic and algorithms are physical forces. Chaos is fragmenting the land, and only by mastering patterns can order be restored.

### Main Character
**The Logic Student** - A young learner exploring Algorithmia to master computational thinking

### Professor Node
Your mentor and guide who appears after puzzles to teach you what you've learned through the **Concept Bridge** system.

### Villagers
NPCs in each region who give you puzzles based on their real-world problems (farming, navigation, etc.)

---

# 3. TECHNICAL ARCHITECTURE

## Engine & Tools

### Primary Engine
**Godot 4.2** - 2D game development
- Why Godot: Open-source, great 2D support, GDScript is Python-like
- Version: 4.2 (latest stable as of project start)

### Development Environment
- **Unity Editor** (for MCP integration and testing)
- **Claude AI + MCP** (Model Context Protocol) for AI-assisted development
- **OpenUPM** for Unity package management
- **Adobe Firefly** for AI art generation

### Version Control
- Git (repository not yet initialized based on conversation)

---

## Core Systems

### 1. Game State Manager
Tracks:
- Completed puzzles
- Codex unlocks
- Region progress
- Key fragments collected

### 2. Codex Manager
Manages the DSA pattern collection system

### 3. Logic Forge Manager
Handles practice challenges and mini-exercises

### 4. Analytics
Local event logging for player behavior analysis

---

## Scene Structure

```
Scenes/
├── Regions/
│   ├── Prologue.tscn
│   ├── ArrayPlains.tscn
│   └── TwinRivers.tscn
├── Puzzles/
│   ├── AP1_Sorting.tscn
│   ├── AP2_Indexing.tscn
│   ├── AP3_Hashing.tscn
│   └── AP4_TwoSum.tscn
├── ConceptBridges/
├── LogicForge/
└── BossArenas/
```

---

# 4. CURRENT DEVELOPMENT STATUS

## ✅ Completed Tasks

### Design Documentation
- ✅ Complete Game Design Document (GDD)
- ✅ Complete Puzzle Design Document (PDD)
- ✅ Array Plains Complete Region Design
- ✅ Prologue design (2 puzzles + boss)
- ✅ Twin Rivers design (4 puzzles + boss)

### Unity Project Setup
- ✅ Unity project created: "AlgorithmiaEA"
- ✅ Folder structure established
- ✅ MCP for Unity installed and configured
- ✅ Unity MCP connection successfully tested
- ✅ Basic scene structure created

### Art Assets
- ✅ Tileset 1 (farm environment) - 16x16 tiles
- ✅ Tileset 2 (farm objects, trees, barrels)
- ✅ Main Character spritesheet v1 (mc.png)
- ✅ Main Character spritesheet v2 (mc1.png - 12 sprites)
- ✅ Main Character movement sheet (mcmove.png - 21+ sprites)
- ✅ Professor Node character sprite
- ✅ NPC sprites (Sorting Farmer, Basket Keeper, Tile Worker)
- ✅ Boss Gate (locked/unlocked states)
- ✅ Center zone mockups (village hub, barn, Logic Forge)
- ✅ Puzzle area mockups (AP1-AP4 visual designs)

### Code/Scripts
- ✅ SimplePlayerMovement.cs - basic WASD movement
- ✅ Player GameObject created in scene with:
  - SpriteRenderer
  - Rigidbody2D (gravity = 0)
  - BoxCollider2D
  - SimplePlayerMovement script

### Test Scene
- ✅ ArrayPlainsOverworld.unity created
- ✅ Player GameObject functional
- ✅ Ground collision object
- ✅ Main Camera with proper positioning

---

## 🚧 In Progress

### Current Sprint: Array Plains Movement System
- ⏳ Slicing mcmove.png spritesheet
- ⏳ Creating Animator Controller for 4-direction movement
- ⏳ Setting up walk cycle animations (Down, Up, Left, Right)
- ⏳ Configuring idle animations

---

## ❌ Not Yet Started

### High Priority
- [ ] Tilemap creation for Array Plains overworld
- [ ] NPC dialogue system
- [ ] Puzzle mechanics implementation (AP1-AP4)
- [ ] Concept Bridge UI/system
- [ ] Codex UI system
- [ ] Logic Forge implementation

### Medium Priority
- [ ] Music & SFX
- [ ] Boss fight mechanics
- [ ] Save/load system
- [ ] Main menu
- [ ] Settings menu

### Future
- [ ] Twin Rivers region
- [ ] Prologue region (tutorial)
- [ ] Additional regions beyond Early Access

---

# 5. ART ASSETS & STYLE GUIDE

## Visual Style

### Art Direction
- **2D Pixel Art**
- **Bright, clean aesthetic** inspired by:
  - Pokémon (GBA/DS era)
  - The Legend of Zelda: The Minish Cap
  - Stardew Valley
  - Celeste (character style)

### Color Palette

#### Array Plains
- **Primary:** Bright greens (#8BC34A), warm yellows (#FFEB3B)
- **Secondary:** Browns (#8D6E63), beige paths (#D7CCA2)
- **Accents:** Blues/oranges for numbered tiles

#### Prologue
- Abstract, glowing whites and cyans
- Void-like minimalist backgrounds

#### Twin Rivers
- Mirrored blue/orange palette
- Cool vs warm water tones

---

## Character Design

### Main Character (Logic Student)

**Design Specs:**
- Teenage student (16-20 years old)
- Brown hair, cyan/turquoise hoodie
- Dark pants, brown boots
- Small backpack (visible from behind)
- Friendly, approachable design

**Sprite Specifications:**
- Size: ~48-64px wide × 64-80px tall
- Pixel art with clean edges
- Limited color palette (8-12 colors)
- No anti-aliasing (pure pixel art)

**Current Spritesheets:**

1. **mc.png** - Original full spritesheet
   - Walking animations (4 directions)
   - Idle states
   - Interaction poses
   - Status: Being replaced by mcmove.png

2. **mc1.png** - Simplified version (12 sprites)
   - 3 rows × 4 columns
   - Row 1: Idle poses (down, left, up, right)
   - Row 2: Walk poses (down, left, down alt, right)
   - Row 3: Interact poses (reading, idle variants)

3. **mcmove.png** - Complete movement sheet (21+ sprites) ⭐ CURRENT
   - Row 1: Idles & Reading (4 sprites)
   - Row 2: Walk Left & Actions (5 sprites)
   - Row 3: Walk Up/Back cycle (6 sprites)
   - Row 4: Fractured/Glitch states (6 sprites)
   - **Status:** Ready for import and animation setup

---

### Professor Node

**Design:**
- Elderly wizard/professor appearance
- Long white beard, robes with glowing circuit patterns
- Staff with floating crystal orb
- Holographic data particles around him
- Color: Blues, purples, whites with cyan accents

**Purpose:**
- Appears during Concept Bridges
- Explains algorithmic patterns
- Friendly mentor archetype

---

### NPCs

**Array Plains Villagers:**

1. **Sorting Farmer** (npc-ap1.png)
   - Wears overalls and straw hat
   - Concerned expression (pre-puzzle)
   - Happy expression (post-puzzle)

2. **Basket Keeper** (Location: West Barn)
   - Green apron, practical outfit
   - Carries baskets

3. **Crop Sorter** (AP3 area)
   - Field worker attire
   - Tools for organizing harvests

4. **Tile Worker** (npc-ap4.png)
   - Builder/laborer outfit
   - Works with numbered tiles

---

## Environment Assets

### Tilesets

**tileset.png** - Primary farm tileset
- Trees (various sizes and types)
- Barrels, crates, boxes
- Flowers, crops, bushes
- Rocks, fences
- Farm tools (pitchforks, shovels, watering cans)
- Harvest baskets
- Numbered tiles/markers

**tileset2.png** - Secondary objects
- Buildings components
- Additional decorations
- Pathways
- Grid squares for farmland

---

### Special Objects

**Boss Gate** (bossgate.png)
- Two states:
  - **Locked:** Red glowing portal with chains
  - **Unlocked:** Green/blue open portal
- Purpose: Blocks Shuffler arena until all 4 puzzles complete

**Logic Forge** (centerzone.png)
- Stone building with glowing windows
- Sign: "LOGIC FORGE"
- Blue/cyan magical effects
- Located in village center

**Central Barn**
- Large red barn, classic farm style
- Central landmark for Array Plains
- Meeting point for villagers

---

## Puzzle-Specific Assets

### AP1 - Sorting Puzzle (ap1.png mockup)
- Wooden numbered tiles (0-7)
- Rail tracks for tile movement
- Storage shed building
- Scattered crates/supplies

### AP2 - Indexing Puzzle (ap2.png mockup)
- 10 numbered baskets (0-9)
- Barn interior
- Tools hidden in baskets
- Index number labels

### AP3 - Hashing Puzzle (ap3.png mockup)
- Harvest hopper/funnel
- 4 sorting buckets (A, B, C categories)
- Crop symbols: 🌾 grain, 🍓 berries, 🥔 roots
- Open field workshop building

### AP4 - Two Sum Puzzle (ap4.png mockup)
- Numbered ground tiles scattered around
- Large "TARGET = X" display board
- Tile Worker NPC
- Open pairing grounds area

---

## Animation States

### Main Character Animations

**Essential (Implemented):**
- Idle: Down, Up, Left, Right
- Walk: Down (4 frames), Left (3 frames), Up (4 frames), Right (2 frames)

**Interactions:**
- Reading/Thinking (holding book)
- Reaching/Pointing
- Picking up item

**Special Effects:**
- Glitch/Fractured states (6 frames)
- Purpose: Teleporting, damage, puzzle transitions

---

# 6. UNITY MCP INTEGRATION

## What is MCP?

**Model Context Protocol** - A standardized way for AI assistants (like Claude) to interact with development tools.

### Why We Use It
- AI-assisted game development
- Automated scene creation
- Script generation and editing
- Asset management
- Faster iteration cycles

---

## Setup Completed

### Installation Steps Taken:

1. **Installed OpenUPM**
   ```bash
   npm install -g openupm-cli
   ```

2. **Installed Unity MCP Package**
   ```bash
   openupm add com.coplaydev.unity-mcp
   ```

3. **Configured Claude Desktop**
   - File: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Added Unity MCP server configuration
   - Server running on port 6400

4. **Verified Connection**
   - Bridge status: ✅ Connected
   - 10 tools + 11 resources discovered
   - Successfully tested GameObject creation

---

## MCP Capabilities

### What Claude Can Do via MCP:

**Scene Management:**
- Create GameObjects
- Add/remove components
- Set properties
- Organize hierarchy

**Asset Management:**
- Import assets
- Create folders
- Search for files
- Modify import settings

**Script Operations:**
- Create C# scripts
- Edit existing scripts
- Validate code
- Apply structured edits

**Editor Control:**
- Play/pause/stop
- Read console logs
- Execute menu items
- Manage tags and layers

---

## Current MCP Status

✅ **Working:**
- GameObject creation
- Component addition
- Scene saving
- Script creation
- Console reading

⚠️ **Limitations:**
- Some asset import settings require manual configuration
- Sprite slicing needs to be done manually in Unity
- Animator setup partially automated

---

# 7. REGION DESIGNS

## Early Access Content

The game will launch with **3 regions:**

1. **Prologue: Chamber of Flow** (Tutorial)
2. **Array Plains** (Region 1) ⭐ Current Focus
3. **Twin Rivers** (Region 2)

---

## REGION 1: ARRAY PLAINS

### Theme
Organized farmland teaching foundational array-based patterns

### DSA Concepts Taught
1. **Sorting** (AP1)
2. **Direct Access / Indexing** (AP2)
3. **Hashing** (AP3)
4. **Two Sum Pattern** (AP4)

---

### Layout

```
                    NORTH
           ┌────────────────────┐
           │   AP3 - Hashing    │
           │  (Open Workshop)   │
           └────────────────────┘

WEST                              EAST
┌────────────┐          ┌────────────┐
│ AP2 - Index│          │ AP1 - Sort │
│ (West Barn)│          │(East Shed) │
└────────────┘          └────────────┘

              ┌──────────────┐
              │ VILLAGE HUB  │
              │ Logic Forge  │
              │ Central Barn │
              └──────────────┘

                   SOUTH
           ┌────────────────────┐
           │  AP4 - Two Sum     │
           │ (Pairing Grounds)  │
           └────────────────────┘

                    ┌────┐
                    │GATE│
                    │BOSS│
                    └────┘
```

---

### Puzzle Breakdown

#### AP1 - Fix the Farmland (Sorting)

**Concept:** Bubble Sort / Selection Sort basics

**Location:** East Storage Shed

**Mechanics:**
- 8 numbered tiles (0-7) on rails
- Tiles are scrambled
- Player pushes tiles left/right
- Tiles lock when in correct ascending order
- Win condition: All tiles sorted 0→7

**NPC:** Sorting Farmer
- Pre: "Plots labeled 7 next to 2... it's a mess!"
- Post: "Perfect order!"

**Concept Bridge teaches:**
- What sorting means
- Why order matters
- Comparison-based sorting basics
- Pseudocode for simple sort

---

#### AP2 - Find the Lost Tool (Direct Access)

**Concept:** O(1) array indexing vs O(n) search

**Location:** West Barn

**Mechanics:**
- 10 baskets labeled 0-9
- NPC tells you: "Tool is in basket 5"
- Player walks directly to basket 5
- Opens it → finds tool

**NPC:** Basket Keeper
- Pre: "I lost my tool! But I know it's in basket 5."
- Post: "You went straight there! That's the power of indexing!"

**Concept Bridge teaches:**
- Direct access (O(1))
- Index vs sequential search
- Why arrays are fast for known positions

---

#### AP3 - Organize the Harvest (Hashing)

**Concept:** Hash functions and collision handling

**Location:** North Field Workshop

**Mechanics:**
- Hopper drops items: 🌾 grain, 🍓 berries, 🥔 roots
- 4 buckets: A, B, C, D
- Player drags items to correct bucket
- Some items hash to same bucket (collision!)
- Must handle collisions by placing in same bucket

**NPC:** Crop Sorter
- Pre: "We group crops but the hopper is too fast!"
- Post: "You're natural at grouping! Collisions are normal."

**Concept Bridge teaches:**
- What a hash function is
- Grouping similar items
- Collision concept
- Real-world use cases (dictionaries, sets)

---

#### AP4 - The Pairing Grounds (Two Sum)

**Concept:** Two Sum algorithm pattern

**Location:** South Grounds

**Mechanics:**
- Scattered number tiles on ground
- Large sign: "TARGET = 11"
- Player steps on a number (e.g., 7)
- Must find partner (4) that sums to target
- Step on both tiles to win

**NPC:** Tile Worker
- Pre: "I need two tiles that sum to the target!"
- Post: "You found the partner instantly!"

**Concept Bridge teaches:**
- Two Sum pattern
- Complement calculation (target - x = y)
- Using a hash set to track seen numbers
- FAANG interview classic explained simply

---

### Boss: The Shuffler

**Type:** Hybrid Puzzle Boss

**Theme:** Chaos and disorder incarnate

**Arena:** Fragmented farmland with shifting tiles

**Phases:**

1. **Phase 1 - Sort the Rows**
   - 3 rows of tiles shuffle continuously
   - Player must sort one row under time pressure
   
2. **Phase 2 - Hash the Baskets**
   - Falling items speed up
   - Correct grouping required
   
3. **Phase 3 - Two Sum Arena**
   - Find pairs while dodging attacks
   - Multiple targets appear
   
4. **Phase 4 - Combined Chaos**
   - All mechanics at once
   - Fix scrambled patterns

**Victory:**
- Shuffler defeated
- Array Plains complete
- Unlock path to Twin Rivers

**Dialogue:**
- Before: "Chaos takes many forms... but order begins with a single correct step."
- After: "You recognized every pattern under pressure. That is mastery."

---

### Logic Forge - Array Plains

Special building in village center

**Challenge 1: Sort the Steps**
- Mini array: [4, 1, 3, 2]
- Player arranges algorithm steps in correct order:
  1. Look at neighbors
  2. Swap incorrect pairs
  3. Repeat until sorted

**Challenge 2: Hash the Buckets**
- Rule shown: Grain→0, Berry→1, Root→2, Else→3
- Player drags items to demonstrate understanding
- Explains collision handling

**Rewards:**
- Codex entries unlocked
- Understanding verified
- Story progression

---

## REGION 2: TWIN RIVERS

### Theme
Mirrored riverbanks with flowing water, floating bridges

### DSA Concepts Taught
1. **Two Pointers** (TR1)
2. **Pointer Convergence** (TR2)
3. **Sliding Window** (TR3)
4. **Advanced Pointer Logic** (TR4)

### Visual Style
- Reflective water surfaces
- Warm orange river (one side) vs cool blue river (other side)
- Bridges that move
- Symmetric level design

---

### Puzzles

**TR1 - Mirror Walk**
- Control two characters simultaneously
- Must stay symmetric
- Teaches: Two pointer concept

**TR2 - Meeting Point**
- Move pointers inward to meet at center
- Teaches: Pointer convergence

**TR3 - Sliding Window Catch**
- Adjustable frame must capture moving pattern
- Teaches: Expanding/shrinking window technique

**TR4 - Breaking the Currents**
- Currents push pointers
- Maintain symmetry under constraints
- Teaches: Pointer decision-making

**Boss: Mirror Serpent**
- Tests all pointer mechanics under pressure

---

## REGION 0: PROLOGUE

### Theme
Abstract, void-like tutorial space

### Purpose
- Introduce basic controls
- Teach sequential thinking
- Establish Professor Node
- Simple pattern recognition

### Puzzles

**P0-1 - Follow the Path**
- Tiles light up in sequence
- Player repeats pattern
- Teaches: Sequential processing, loops

**P0-2 - Fractured Sentinel**
- Assemble puzzle pieces
- Teaches: Mapping, matching patterns

**Boss: Fractured Sentinel**
- Combines both patterns
- Opens path to Array Plains

---

# 8. WHAT'S BEEN COMPLETED

## Design Phase ✅

### Documentation
- Complete GDD (2,603 lines)
- Complete Array Plains design
- All 3 regions designed
- All puzzles specified
- Concept Bridge system defined
- Logic Forge system defined
- Codex system defined

### Art Direction
- Visual style established
- Color palettes defined
- Character designs finalized
- Environment mockups created

---

## Asset Creation ✅

### Character Art
- Main character: 3 iterations (mcmove.png is final)
- Professor Node sprite
- 4 NPC sprites for Array Plains villagers
- Glitch/fractured states for effects

### Environment Art
- 2 complete farm tilesets
- Boss gate (2 states)
- Logic Forge building
- Central barn
- Puzzle area mockups (all 4)
- Center zone layouts

---

## Technical Setup ✅

### Unity Project
- Project created and configured
- Folder structure established
- MCP integration working
- Basic scene created

### Code
- SimplePlayerMovement script functional
- Player GameObject with all components
- Camera setup
- Ground collision

---

## Current Development Session

### What We Just Did (Nov 15-16, 2025):

1. **Setup Unity MCP connection**
   - Installed OpenUPM
   - Configured Unity MCP package
   - Debugged Claude Desktop config
   - Verified connection working

2. **Created test scene**
   - ArrayPlainsOverworld.unity
   - Player GameObject (position 0,0,0)
   - Ground (position 0,-2,0)
   - Main Camera (position 0,0,-10)

3. **Generated improved character art**
   - Created mcmove.png with complete animations
   - 21+ sprites covering all movement and interactions
   - Includes glitch states for special effects

4. **Prepared for animation setup**
   - Uploaded mcmove.png to Unity
   - Ready to slice sprites
   - Ready to create Animator Controller

---

# 9. NEXT STEPS

## Immediate Tasks (This Week)

### 1. Complete Character Animation Setup
- [ ] Slice mcmove.png in Unity Sprite Editor
- [ ] Create Animator Controller
- [ ] Set up animation clips:
  - Idle (4 directions)
  - Walk (4 directions)
  - Interact poses
- [ ] Test movement in scene

### 2. Create Array Plains Overworld Map
- [ ] Import tilesets to Unity
- [ ] Create Tilemap layers:
  - Ground
  - Decorations
  - Objects
  - Buildings
- [ ] Paint the map following design blueprint
- [ ] Add collision

### 3. Place NPCs and Puzzle Entrances
- [ ] Create NPC GameObjects
- [ ] Position in correct locations
- [ ] Create trigger zones for puzzle entrances
- [ ] Add signposts

---

## Short-Term Goals (Next 2-4 Weeks)

### Systems Development
- [ ] Dialogue system
- [ ] Puzzle trigger system
- [ ] Scene transition system
- [ ] Basic UI framework

### Puzzle Implementation
- [ ] AP1 - Sorting mechanic
- [ ] AP2 - Indexing mechanic
- [ ] AP3 - Hashing mechanic
- [ ] AP4 - Two Sum mechanic

### Concept Bridge
- [ ] UI design for Concept Bridge
- [ ] Professor Node dialogue system
- [ ] Pseudocode display
- [ ] Mini-practice mechanics

---

## Medium-Term Goals (1-2 Months)

### Complete Array Plains
- [ ] All 4 puzzles functional
- [ ] All Concept Bridges implemented
- [ ] Logic Forge challenges
- [ ] Boss fight (The Shuffler)
- [ ] Region completion flow

### Core Systems
- [ ] Codex UI and system
- [ ] Save/load system
- [ ] Settings menu
- [ ] Main menu
- [ ] Quest log

### Audio
- [ ] Background music for Array Plains
- [ ] Puzzle SFX
- [ ] UI sounds
- [ ] Boss music

---

## Long-Term Goals (3-6 Months)

### Additional Regions
- [ ] Prologue region
- [ ] Twin Rivers region

### Polish
- [ ] Particle effects
- [ ] Screen transitions
- [ ] Tutorial improvements
- [ ] Balance and difficulty tuning

### Release Preparation
- [ ] Steam page setup
- [ ] Trailer creation
- [ ] Marketing materials
- [ ] Playtesting
- [ ] Bug fixing
- [ ] Performance optimization

---

# 10. DEVELOPMENT WORKFLOW

## Tools & Setup

### Required Software

1. **Unity Hub** (latest)
2. **Unity Editor** (2021.3 LTS or newer)
3. **Visual Studio Code** or **Rider** (for C# editing)
4. **Git** (for version control)
5. **Claude Desktop** (for MCP AI assistance)

### Recommended Tools
- **Aseprite** or **Piskel** (pixel art editing)
- **Photopea** (free Photoshop alternative)
- **Tiled** (for tilemap design/planning)

---

## Unity Project Structure

```
AlgorithmiaEA/
├── Assets/
│   ├── Art/
│   │   ├── Characters/
│   │   │   ├── mc1.png
│   │   │   ├── mcmove.png
│   │   │   ├── node.png
│   │   │   └── NPCs/
│   │   ├── Tilesets/
│   │   │   ├── tileset.png
│   │   │   └── tileset2.png
│   │   ├── Environment/
│   │   │   ├── bossgate.png
│   │   │   └── buildings/
│   │   └── UI/
│   ├── Scenes/
│   │   ├── ArrayPlainsOverworld.unity
│   │   ├── Puzzles/
│   │   └── Menus/
│   ├── Scripts/
│   │   ├── SimplePlayerMovement.cs
│   │   ├── Player/
│   │   ├── Puzzles/
│   │   └── Systems/
│   ├── Prefabs/
│   │   ├── Player.prefab
│   │   ├── NPCs/
│   │   └── Puzzles/
│   ├── Animations/
│   │   └── Controllers/
│   └── Audio/
│       ├── Music/
│       └── SFX/
└── Packages/
    └── com.coplaydev.unity-mcp/
```

---

## Using Unity MCP

### Basic Commands

**To create a GameObject:**
```
"Create a GameObject called Player at position 0,0,0"
```

**To add components:**
```
"Add a SpriteRenderer and Rigidbody2D to Player"
```

**To create scripts:**
```
"Create a script called PlayerController that handles WASD movement"
```

**To manage scenes:**
```
"Save the current scene"
"Create a new scene called TestPuzzle"
```

### Best Practices
- Always verify MCP is connected before starting
- Save scenes frequently
- Test changes immediately
- Use MCP for repetitive tasks
- Manual work for creative decisions

---

## Git Workflow (To Be Established)

### Recommended Branch Structure
```
main
├── develop
├── feature/character-animation
├── feature/puzzle-ap1
├── feature/dialogue-system
└── bugfix/player-collision
```

### Commit Message Format
```
[Category] Brief description

- Detailed change 1
- Detailed change 2

Related: #issue-number
```

**Categories:** Feature, Bugfix, Art, Design, Refactor, Docs

---

## Collaboration Guidelines

### Code Style
- C# naming conventions (PascalCase for public, camelCase for private)
- Commented code for complex logic
- XML documentation for public APIs
- Regions to organize large files

### Asset Naming
```
Format: category_description_variant.extension

Examples:
- spr_player_walk_down_1.png
- tile_grass_01.png
- sfx_puzzle_correct.wav
- anim_player_idle_down.anim
```

### Communication
- Document all major decisions
- Update this onboarding doc with changes
- Use clear commit messages
- Comment tricky code

---

## Testing Checklist

### Before Every Commit
- [ ] Code compiles without errors
- [ ] No console warnings
- [ ] Test in Play mode
- [ ] Verify no broken references
- [ ] Check scene is saved

### Before Every Build
- [ ] All scenes in Build Settings
- [ ] Assets properly imported
- [ ] No missing sprites
- [ ] Audio plays correctly
- [ ] Settings menu works
- [ ] Save/load works

---

# APPENDIX A: KEY DESIGN DECISIONS

## Why Godot 4.2?
- Open-source and free
- Excellent 2D support
- GDScript is beginner-friendly
- Strong community
- **Note:** Currently using Unity for development due to MCP integration

## Why the Concept Bridge System?
- Bridges the gap between doing and understanding
- Reinforces learning through explanation
- Professor Node provides narrative consistency
- Mimics real learning: experience → reflection → understanding

## Why Pixel Art?
- Timeless aesthetic
- Lower barrier for art creation
- Evokes nostalgia (educational games + retro RPGs)
- Performs well on all platforms
- Fits the "retro computing" theme

## Why Pokémon-style Collection (Codex)?
- Familiarity breeds engagement
- Collection mechanic is addictive
- Natural progression system
- Clear sense of accomplishment
- Appeals to completionists

---

# APPENDIX B: FAANG PATTERNS COVERED

## Array Plains
- Sorting (various algorithms)
- Two Sum ⭐
- Hash Maps/Sets
- Array indexing

## Twin Rivers
- Two Pointers ⭐
- Sliding Window ⭐
- Fast & Slow pointers
- Container With Most Water ⭐

## Future Regions (Post-EA)
- Binary Search
- DFS/BFS
- Dynamic Programming
- Recursion/Backtracking
- Graphs
- Trees

*⭐ = Top 10 most common interview patterns*

---

# APPENDIX C: RESOURCES & REFERENCES

## Learning Resources
- LeetCode (problem inspiration)
- NeetCode (pattern categorization)
- Cracking the Coding Interview (book)
- Elements of Programming Interviews (book)

## Game Design Inspiration
- **Pokémon** (collection, progression)
- **The Witness** (puzzle philosophy)
- **Portal** (environmental teaching)
- **Baba Is You** (abstract logic)
- **Stephen's Sausage Roll** (elegant complexity)

## Art Inspiration
- Stardew Valley (pixel art style)
- Celeste (character design)
- Minish Cap (color palette, charm)
- Undertale (UI design)

---

# APPENDIX D: GLOSSARY

**Concept Bridge** - Educational segment after puzzles where Professor Node explains the algorithmic pattern

**Codex** - In-game DSA pattern collection (like a Pokédex)

**DSA** - Data Structures & Algorithms

**FAANG** - Facebook/Meta, Amazon, Apple, Netflix, Google (companies known for algorithm interviews)

**Logic Forge** - Special building in each region for practice challenges

**MCP** - Model Context Protocol (AI integration)

**Professor Node** - The mentor character who teaches via Concept Bridges

**Region** - Major area of the game (e.g., Array Plains, Twin Rivers)

---

# CONCLUSION

## Project Status Summary

**What Works:**
- Complete design vision
- All major systems designed
- Art assets created
- Unity project initialized
- MCP integration functional
- Basic player movement working

**What's Next:**
- Character animation setup
- Array Plains map creation
- Puzzle implementation
- Systems programming

**Timeline Estimate:**
- **Prototype:** 2-3 months
- **Early Access:** 6-8 months
- **Full Release:** 12-15 months

---

## Contact & Questions

For questions about:
- **Design decisions:** Review GDD sections
- **Technical setup:** See Section 3 & 10
- **Art assets:** See Section 5
- **Current status:** See Section 4

**Welcome to the team! Let's make learning algorithms fun! 🎮✨**

---

*Last updated: November 16, 2025*  
*Document version: 1.0*  
*Project: Algorithmia - The Path of Logic*
