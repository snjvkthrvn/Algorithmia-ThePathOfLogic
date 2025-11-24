# Build Roadmap - Algorithmia: The Path of Logic

Complete step-by-step guide from current state to full working game.

---

## 🎯 Current State

**✅ What's Done:**
- Unity project structure created
- All manager scripts (GameState, PuzzleManager, CodexManager, etc.)
- Player controller script
- UI scripts (DialogueBox, CodexUI)
- Design document with all puzzle specifications

**❌ What's Missing:**
- Unity project setup in Unity Editor
- Asset import and configuration
- Scene setup
- Puzzle implementations
- UI prefabs
- NPCs and dialogue system
- Concept Bridge UI
- Logic Forge UI

---

## 📋 Phase-by-Phase Breakdown

### **PHASE 1: Foundation Setup** (Week 1)

#### 🤖 What AI Can Do:
- ✅ Already done: All manager scripts created
- ✅ Already done: Player controller script
- ✅ Already done: UI script foundations

#### 👤 What You Need to Do:

**1.1 Unity Project Setup**
- [ ] Open Unity Hub
- [ ] Create new 2D project (Unity 2021.3 LTS or newer) - your project is at `/Users/sanjeevkathiravan/Algoritmia--`
- [ ] Copy all scripts from `/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/Unity/Assets/Scripts/` to `/Users/sanjeevkathiravan/Algoritmia--/Assets/Scripts/`
- [ ] Install TextMeshPro (Window → TextMeshPro → Import TMP Essential Resources)
- [ ] Install Newtonsoft.Json package (for SaveManager)

**1.2 Import Assets**
- [ ] Import `char_000.png` from `/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/assets/sprites/characters/` into Unity project at `/Users/sanjeevkathiravan/Algoritmia--/Assets/Sprites/Characters/`
- [ ] Import `tile_000.png` from `/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/assets/tiles/` into Unity project at `/Users/sanjeevkathiravan/Algoritmia--/Assets/Sprites/Tiles/`
- [ ] Configure sprite import settings:
  - Set sprite mode to "Multiple" for sprite sheets
  - Set pixels per unit to 32 (for tiles) or 128 (for characters)
  - Slice sprites (32×32 for tiles, 128×128 for characters)

**1.3 Create Manager GameObjects**
- [ ] Create empty GameObject named "GameManager"
- [ ] Add `GameManager` component
- [ ] Create empty GameObjects for each manager:
  - "GameState" → Add `GameState` component
  - "PuzzleManager" → Add `PuzzleManager` component
  - "CodexManager" → Add `CodexManager` component
  - "ConceptBridgeManager" → Add `ConceptBridgeManager` component
  - "LogicForgeManager" → Add `LogicForgeManager` component
  - "SaveManager" → Add `SaveManager` component
- [ ] Make all managers DontDestroyOnLoad

**1.4 Test Basic Systems**
- [ ] Verify all managers initialize without errors
- [ ] Check console for any missing references
- [ ] Test that GameState.Instance is accessible

**Deliverable:** Working Unity project with all managers initialized

---

### **PHASE 2: Player & Basic Movement** (Week 1-2)

#### 🤖 What AI Can Do:
- ✅ Already done: PlayerController script
- [ ] Can create: Player animation controller setup script
- [ ] Can create: Input system configuration helper

#### 👤 What You Need to Do:

**2.1 Create Player Prefab**
- [ ] Create 2D Sprite GameObject
- [ ] Add `Rigidbody2D`:
  - Body Type: Dynamic
  - Gravity Scale: 0
  - Freeze Rotation Z: true
- [ ] Add `BoxCollider2D` or `CircleCollider2D`
- [ ] Add `PlayerController` component
- [ ] Add `Animator` component
- [ ] Assign sprite from `char_000.png` (front-facing idle frame)
- [ ] Set Speed in Inspector (200)
- [ ] Save as Prefab: `Assets/Prefabs/Player/Player.prefab`

**2.2 Set Up Player Animations**
- [ ] Create Animator Controller: `Assets/Animations/Player.controller`
- [ ] Create Animation Clips:
  - `Player_Idle` (front-facing frame)
  - `Player_Walk` (walking frames from sprite sheet)
- [ ] Set up Animator parameters:
  - `IsWalking` (bool)
  - `MoveX` (float)
  - `MoveY` (float)
- [ ] Create transitions between idle/walk
- [ ] Assign Animator Controller to Player prefab

**2.3 Create Test Scene**
- [ ] Create new scene: `Assets/Scenes/MainGame.unity`
- [ ] Add GameManager GameObject
- [ ] Add Player prefab instance
- [ ] Add Camera (Orthographic, size 5-10)
- [ ] Set up basic background (Color or simple sprite)
- [ ] Set scene as main scene in Build Settings

**2.4 Test Player Movement**
- [ ] Run game (Play button)
- [ ] Test WASD movement
- [ ] Verify animations play correctly
- [ ] Check that player position saves to GameState

**Deliverable:** Player moves and animates correctly

---

### **PHASE 3: UI Systems** (Week 2)

#### 🤖 What AI Can Do:
- ✅ Already done: DialogueBox.cs and CodexUI.cs scripts
- [ ] Can create: UI helper scripts for common operations
- [ ] Can create: UI animation scripts

#### 👤 What You Need to Do:

**3.1 Create DialogueBox Prefab**
- [ ] Create Canvas (if not exists)
- [ ] Create Panel child
- [ ] Add `DialogueBox` component to Panel
- [ ] Create UI structure:
  - Panel (background)
  - TextMeshProUGUI for dialogue text
  - Button for continue
- [ ] Assign all references in DialogueBox component:
  - `panel` → Panel GameObject
  - `dialogueLabel` → TextMeshProUGUI
  - `continueButton` → Button
- [ ] Style the UI (colors, fonts, borders)
- [ ] Position at bottom of screen
- [ ] Save as Prefab: `Assets/Prefabs/UI/DialogueBox.prefab`

**3.2 Create CodexUI Prefab**
- [ ] Create Panel
- [ ] Add `CodexUI` component
- [ ] Create UI structure:
  - Panel (background)
  - Dropdown for entries list (left side)
  - Panel for entry display (right side):
    - Title (TextMeshProUGUI)
    - What You Felt (TextMeshProUGUI)
    - Explanation (TextMeshProUGUI, scrollable)
    - Pattern Steps (TextMeshProUGUI)
    - Where You'll See This (TextMeshProUGUI)
    - Ability (TextMeshProUGUI)
  - Close Button
- [ ] Assign all references in CodexUI component
- [ ] Style the UI
- [ ] Save as Prefab: `Assets/Prefabs/UI/CodexUI.prefab`

**3.3 Add UI to Scene**
- [ ] Add Canvas to MainGame scene
- [ ] Add DialogueBox prefab instance
- [ ] Add CodexUI prefab instance
- [ ] Set Canvas to Screen Space - Overlay

**3.4 Test UI Systems**
- [ ] Test DialogueBox: Call `ShowDialogue(new List<string> {"Test", "Line 2"})`
- [ ] Test Codex: Press C key, verify it opens
- [ ] Test that Codex shows empty list initially (no entries unlocked)
- [ ] Test Space to advance dialogue
- [ ] Test ESC to close Codex

**Deliverable:** Working UI systems (DialogueBox and CodexUI)

---

### **PHASE 4: Tilemap & Environment** (Week 2-3)

#### 🤖 What AI Can Do:
- [ ] Can create: Tilemap helper scripts
- [ ] Can create: Region manager script
- [ ] Can create: Scene transition scripts

#### 👤 What You Need to Do:

**4.1 Set Up Tilemap**
- [ ] Create Tile Palette (Window → 2D → Tile Palette)
- [ ] Slice `tile_000.png`:
  - Grid size: 32×32
  - Select individual tiles (grass, dirt, tree, bush, barn, etc.)
  - Name each tile appropriately
- [ ] Create Tile Palette asset
- [ ] Add Tilemap to MainGame scene:
  - GameObject → 2D Object → Tilemap → Rectangular
- [ ] Paint test area with grass tiles

**4.2 Create Region Scenes**
- [ ] Create scene: `Assets/Scenes/Regions/Prologue.unity`
- [ ] Create scene: `Assets/Scenes/Regions/ArrayPlains.unity`
- [ ] Create scene: `Assets/Scenes/Regions/TwinRivers.unity`
- [ ] Set up Tilemap in each scene
- [ ] Paint basic layouts (refer to design doc for environment descriptions)

**4.3 Set Up Camera**
- [ ] Configure Camera for each scene:
  - Projection: Orthographic
  - Size: Appropriate for your tile size
  - Follow player (or use Cinemachine if preferred)

**Deliverable:** Working tilemap system with basic region scenes

---

### **PHASE 5: First Puzzle Implementation** (Week 3-4)

#### 🤖 What AI Can Do:
- [ ] Can create: PuzzleBase abstract class (already in PuzzleManager.cs)
- [ ] Can create: P0-1 "Follow the Path" puzzle script
- [ ] Can create: Puzzle trigger system
- [ ] Can create: Puzzle completion detection

#### 👤 What You Need to Do:

**5.1 Create Puzzle Scene Structure**
- [ ] Create scene: `Assets/Scenes/Puzzles/P0_1_FollowPath.unity`
- [ ] Set up puzzle environment (floating white tiles, void-like arena)
- [ ] Create puzzle trigger area
- [ ] Add puzzle-specific GameObjects

**5.2 Implement Puzzle Mechanics** (AI will provide script)
- [ ] Add P0-1 puzzle script to puzzle scene
- [ ] Set up tile sequence system:
  - Tiles that light up in sequence
  - Player must step on tiles in order
  - Correct tile = chime sound
  - Wrong tile = flash + reset
- [ ] Implement 2-3 rounds of pattern growth
- [ ] Connect to PuzzleManager

**5.3 Test Puzzle**
- [ ] Load puzzle scene
- [ ] Test sequence display
- [ ] Test player input
- [ ] Test completion detection
- [ ] Verify PuzzleManager receives completion signal

**Deliverable:** First working puzzle (P0-1)

---

### **PHASE 6: Concept Bridge System** (Week 4)

#### 🤖 What AI Can Do:
- ✅ Already done: ConceptBridgeManager script with data
- [ ] Can create: Concept Bridge UI script
- [ ] Can create: Pseudocode display system
- [ ] Can create: Mini-Forge practice UI

#### 👤 What You Need to Do:

**6.1 Create Concept Bridge UI Prefab**
- [ ] Create Panel for Concept Bridge
- [ ] Add UI elements for each phase:
  - Story Recap: Text display area
  - Pattern Reveal: Text display area
  - Pseudocode: Code display with syntax highlighting (optional)
  - Mini-Forge: Interactive practice area
  - Codex Unlock: Notification
- [ ] Add navigation buttons (Next, Skip, etc.)
- [ ] Style the UI
- [ ] Save as Prefab: `Assets/Prefabs/UI/ConceptBridgeUI.prefab`

**6.2 Connect to Puzzle Completion**
- [ ] Ensure PuzzleManager.OnPuzzleCompleted triggers ConceptBridgeManager
- [ ] Test that Concept Bridge starts after puzzle completion
- [ ] Test each phase progression

**6.3 Implement Mini-Forge Practice**
- [ ] Create drag-and-drop system (for step ordering)
- [ ] Create multiple choice system (for partner matching)
- [ ] Test Mini-Forge exercises

**Deliverable:** Working Concept Bridge system that triggers after puzzles

---

### **PHASE 7: NPCs & Dialogue** (Week 4-5)

#### 🤖 What AI Can Do:
- [ ] Can create: NPC script
- [ ] Can create: Dialogue system manager
- [ ] Can create: Dialogue trigger scripts

#### 👤 What You Need to Do:

**7.1 Create NPC Sprites**
- [ ] Extract Professor Node sprites from `char_000.png`
- [ ] Create NPC prefab with sprite
- [ ] Add collider for interaction

**7.2 Set Up Dialogue System**
- [ ] Create NPC script (AI will provide)
- [ ] Create dialogue data structure
- [ ] Set up dialogue triggers
- [ ] Test NPC interaction (E key)

**7.3 Add NPCs to Scenes**
- [ ] Add Professor Node to Prologue scene
- [ ] Add dialogue for each puzzle introduction
- [ ] Test dialogue flow

**Deliverable:** Working NPC system with dialogue

---

### **PHASE 8: Remaining Puzzles** (Week 5-8)

#### 🤖 What AI Can Do:
- [ ] Can create: All puzzle scripts (P0-2, AP1-4, TR1-4)
- [ ] Can create: Boss puzzle scripts
- [ ] Can create: Puzzle-specific mechanics

#### 👤 What You Need to Do:

**8.1 Implement Each Puzzle** (AI provides scripts, you implement scenes)
- [ ] P0-2: Fractured Sentinel (fragment assembly)
- [ ] AP1: Fix the Farmland (sorting tiles)
- [ ] AP2: Find the Lost Tool (direct indexing)
- [ ] AP3: Organize the Harvest (hashing/bucketing)
- [ ] AP4: The Pairing Grounds (Two Sum)
- [ ] TR1: Mirror Walk (Two Pointers)
- [ ] TR2: Meeting Point (Conditional Pointers)
- [ ] TR3: Sliding Window Catch
- [ ] TR4: Breaking the Currents

**8.2 Implement Boss Puzzles**
- [ ] Prologue Boss: Fractured Sentinel (multi-phase)
- [ ] Array Plains Boss: The Shuffler (4 phases)
- [ ] Twin Rivers Boss: Mirror Serpent (4 phases)

**8.3 Connect Concept Bridges**
- [ ] Ensure each puzzle has Concept Bridge data
- [ ] Test Concept Bridge for each puzzle
- [ ] Verify Codex entries unlock correctly

**Deliverable:** All 10+ puzzles implemented and working

---

### **PHASE 9: Logic Forge** (Week 8-9)

#### 🤖 What AI Can Do:
- ✅ Already done: LogicForgeManager script
- [ ] Can create: Logic Forge UI script
- [ ] Can create: Drag-and-drop system
- [ ] Can create: Practice challenge scripts

#### 👤 What You Need to Do:

**9.1 Create Logic Forge UI**
- [ ] Create Logic Forge scene/building
- [ ] Create UI for challenge selection
- [ ] Create drag-and-drop interface
- [ ] Create multiple choice interface
- [ ] Style the UI

**9.2 Implement Practice Challenges**
- [ ] Sorting practice (drag tiles to order)
- [ ] Two Sum practice (find partner)
- [ ] Pointer movement practice
- [ ] Connect to LogicForgeManager

**Deliverable:** Working Logic Forge with practice challenges

---

### **PHASE 10: Polish & Testing** (Week 9-10)

#### 🤖 What AI Can Do:
- [ ] Can create: Audio manager script
- [ ] Can create: Settings menu script
- [ ] Can create: Bug fixes based on your testing

#### 👤 What You Need to Do:

**10.1 Audio**
- [ ] Add background music
- [ ] Add sound effects (footsteps, puzzle completion, UI clicks)
- [ ] Create AudioManager (AI can provide script)
- [ ] Integrate audio into scenes

**10.2 Save/Load System**
- [ ] Test save functionality
- [ ] Test load functionality
- [ ] Add save/load UI (menu)
- [ ] Test save file persistence

**10.3 UI Polish**
- [ ] Add transitions/animations
- [ ] Polish visual styling
- [ ] Add particle effects
- [ ] Optimize UI performance

**10.4 Testing**
- [ ] Play through all puzzles
- [ ] Test all systems
- [ ] Fix bugs
- [ ] Balance difficulty

**Deliverable:** Polished, tested game ready for release

---

## 📊 Summary: AI vs You

### 🤖 What AI Can Do:
- ✅ Write all C# scripts
- ✅ Create system architecture
- ✅ Implement game logic
- ✅ Create data structures
- ✅ Write helper utilities
- ✅ Debug code issues
- ✅ Create documentation

### 👤 What You Must Do:
- [ ] **Create/Import Assets** (sprites, tiles, audio, UI graphics)
- [ ] **Set Up Unity Project** (import scripts, configure settings)
- [ ] **Create Prefabs** (Player, UI, NPCs, Puzzles)
- [ ] **Set Up Scenes** (regions, puzzles, UI)
- [ ] **Configure Animations** (player, UI, effects)
- [ ] **Set Up Tilemap** (slice tiles, create palettes, paint maps)
- [ ] **Test & Iterate** (playtest, find bugs, provide feedback)
- [ ] **Audio Integration** (import audio files, assign to events)
- [ ] **Visual Polish** (styling, effects, animations)

---

## 🎯 Immediate Next Steps

**Right Now, You Should:**

1. **Open Unity** project at `/Users/sanjeevkathiravan/Algoritmia--`
2. **Copy scripts** from `/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/Unity/Assets/Scripts/` to `/Users/sanjeevkathiravan/Algoritmia--/Assets/Scripts/`
3. **Import assets** from `/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/assets/`:
   - `sprites/characters/char_000.png` → `/Users/sanjeevkathiravan/Algoritmia--/Assets/Sprites/Characters/`
   - `tiles/tile_000.png` → `/Users/sanjeevkathiravan/Algoritmia--/Assets/Sprites/Tiles/`
4. **Set up managers** (create GameObjects, add components)
5. **Test basic systems** (verify no errors)

**Then Tell Me:**
- Any errors you encounter
- What you want to work on next
- What scripts you need (puzzles, NPCs, etc.)

I can create any scripts you need as you progress through each phase!

---

## 📝 Quick Reference

**When You Need Scripts:**
- Say "Create [X] script" and I'll write it
- Example: "Create NPC script" → I'll write NPC.cs
- Example: "Create P0-1 puzzle script" → I'll write FollowPathPuzzle.cs

**When You Need Help:**
- Describe the issue → I'll help debug
- Ask "How do I [X] in Unity?" → I'll explain
- Share errors → I'll fix them

**When You're Ready:**
- "I'm ready for Phase X" → I'll create all scripts for that phase
- "I need the puzzle scripts" → I'll create all puzzle implementations

Let's build this game! 🚀

