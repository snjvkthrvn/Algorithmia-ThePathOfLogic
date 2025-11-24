# AI Agent Onboarding - Algorithmia: The Path of Logic

## 🎯 Project Overview

**Game:** Algorithmia: The Path of Logic  
**Type:** Educational puzzle-adventure RPG  
**Goal:** Teach Data Structures and Algorithms (DSA) through gameplay  
**Engine:** Unity (2D)  
**Language:** C#

### What This Game Does

Instead of memorizing formulas or grinding LeetCode, players learn DSA concepts by:
- Solving visual puzzles that represent algorithmic patterns
- Exploring a story-driven world
- Interacting with educational NPCs (like Professor Node)
- Completing puzzles that unlock Codex entries
- Practicing in the Logic Forge

### Core Educational Feature: Concept Bridge

After each puzzle, the game teaches the player:
1. **Story Recap** - What they just did
2. **Pattern Reveal** - The DSA concept they used
3. **Pseudocode** - How it translates to code
4. **Mini-Forge** - Interactive practice
5. **Codex Unlock** - Permanent reference entry

---

## 📁 Project Structure

```
Algorithmia--/                    # Unity project root
├── Assets/
│   ├── Scripts/
│   │   ├── Managers/           # Singleton managers (GameState, PuzzleManager, etc.)
│   │   ├── Player/             # Player controller
│   │   └── UI/                 # UI scripts (DialogueBox, CodexUI)
│   ├── Sprites/                # Import sprite sheets here
│   └── Scenes/                 # Game scenes
├── algorithmia_full_docs.md    # Complete design document (GDD + PDD)
├── BUILD_ROADMAP.md            # Step-by-step build guide
├── UNITY_SETUP.md              # Unity-specific setup instructions
└── QUICK_START.md              # Quick reference guide
```

---

## ✅ What's Already Done

### Core Systems (Complete)
- ✅ **GameState.cs** - Progress tracking, puzzle completion, region unlocks
- ✅ **PuzzleManager.cs** - Puzzle lifecycle management with events
- ✅ **CodexManager.cs** - All codex entries initialized (from PDD)
- ✅ **ConceptBridgeManager.cs** - Post-puzzle educational sequences
- ✅ **LogicForgeManager.cs** - Practice challenge system
- ✅ **SaveManager.cs** - JSON-based save/load
- ✅ **GameManager.cs** - Initializes all managers

### Player System (Complete)
- ✅ **PlayerController.cs** - Top-down movement, WASD controls, interaction

### UI Systems (Scripts Complete)
- ✅ **DialogueBox.cs** - Dialogue display system
- ✅ **CodexUI.cs** - Codex viewer with entry list

### Design Document
- ✅ **algorithmia_full_docs.md** - Complete GDD + PDD with all puzzle specs

---

## 🚧 What Needs to Be Done

### Immediate (Phase 1)
- [ ] Set up managers in Unity (create GameObjects, add components)
- [ ] Import assets (char_000.png, tile_000.png)
- [ ] Create Player prefab
- [ ] Create UI prefabs (DialogueBox, CodexUI)
- [ ] Test basic systems

### Short Term (Phase 2-4)
- [ ] Set up Tilemap system
- [ ] Create region scenes (Prologue, Array Plains, Twin Rivers)
- [ ] Implement first puzzle (P0-1: Follow the Path)
- [ ] Build Concept Bridge UI
- [ ] Add NPCs and dialogue system

### Medium Term (Phase 5-8)
- [ ] Implement all 10+ puzzles
- [ ] Implement boss puzzles
- [ ] Complete Concept Bridge system
- [ ] Build Logic Forge UI
- [ ] Add audio system

### Long Term (Phase 9-10)
- [ ] Polish and testing
- [ ] Save/load UI
- [ ] Final balancing

---

## 📚 Key Documentation Files

### `algorithmia_full_docs.md`
**Purpose:** Complete game design document  
**Contains:**
- All puzzle specifications (mechanics, solutions, failure conditions)
- Concept Bridge dialogues (Professor Node's explanations)
- Codex entry content
- Region descriptions
- Boss puzzle breakdowns

**When to Reference:**
- Implementing puzzles → Check exact mechanics
- Creating Concept Bridges → Copy dialogue from doc
- Setting up Codex → All entries are defined here

### `BUILD_ROADMAP.md`
**Purpose:** Step-by-step build guide  
**Contains:**
- Phase-by-phase breakdown
- What AI can do vs what user must do
- Detailed setup instructions
- Testing checklists

**When to Reference:**
- User asks "what's next?" → Check current phase
- Need to know what to build → Follow roadmap phases

### `UNITY_SETUP.md`
**Purpose:** Unity-specific setup instructions  
**Contains:**
- Manager setup
- Prefab creation
- Scene setup
- Input configuration

---

## 🎮 Game Content Summary

### Regions (3)
1. **Prologue: Chamber of Flow**
   - 2 puzzles + 1 boss
   - Introduces basic concepts

2. **Array Plains**
   - 4 puzzles + 1 boss
   - Teaches: Sorting, Indexing, Hashing, Two Sum

3. **Twin Rivers**
   - 4 puzzles + 1 boss
   - Teaches: Two Pointers, Sliding Window

### Puzzles (10+)
- P0-1: Follow the Path (Pattern Matching)
- P0-2: Fractured Sentinel (Spatial Reasoning)
- AP1: Fix the Farmland (Sorting)
- AP2: Find the Lost Tool (O(1) Access)
- AP3: Organize the Harvest (Hashing)
- AP4: The Pairing Grounds (Two Sum)
- TR1: Mirror Walk (Two Pointers)
- TR2: Meeting Point (Conditional Pointers)
- TR3: Sliding Window Catch
- TR4: Breaking the Currents
- + 2 Boss puzzles

### Codex Entries (6+)
All entries are initialized in CodexManager.cs with:
- Title
- "What You Felt" description
- Plain explanation
- Pattern steps
- Where you'll see this
- Unlocked ability

---

## 🤖 How to Help the User

### When User Asks for Scripts
**Example:** "Create the P0-1 puzzle script"
- Check `algorithmia_full_docs.md` for puzzle specifications
- Create script that inherits from `PuzzleBase`
- Implement exact mechanics from PDD
- Connect to PuzzleManager events

### When User Has Errors
- Read error message
- Check script references
- Verify manager initialization
- Fix code issues
- Test solution

### When User Needs Guidance
- Reference `BUILD_ROADMAP.md` for current phase
- Check `UNITY_SETUP.md` for Unity-specific help
- Use `algorithmia_full_docs.md` for game design questions

### When User Wants Features
- Check if script already exists
- If not, create it following existing patterns
- Ensure it integrates with manager systems
- Use events for communication (not direct references)

---

## 🔑 Key Patterns to Follow

### Singleton Pattern
All managers use:
```csharp
public static ManagerName Instance { get; private set; }
private void Awake() {
    if (Instance == null) {
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }
}
```

### Event System
Use C# Events (not direct references):
```csharp
public static event Action<string> OnEventName;
OnEventName?.Invoke(data);
```

### Puzzle System
All puzzles inherit from `PuzzleBase`:
```csharp
public class MyPuzzle : PuzzleBase {
    protected void CompletePuzzle() {
        CompletePuzzle(); // Calls base method
    }
}
```

### UI System
UI scripts reference UI elements via SerializeField:
```csharp
[SerializeField] private GameObject panel;
[SerializeField] private TextMeshProUGUI label;
```

---

## 📝 Code Style Guidelines

- Use C# naming conventions (PascalCase for classes, camelCase for variables)
- Add XML comments for public methods
- Use [SerializeField] for Inspector references
- Use events for cross-system communication
- Keep managers as singletons
- Make scripts modular and reusable

---

## 🎯 Current Focus

**Phase:** Foundation Setup (Phase 1)  
**Status:** Scripts created, need Unity setup  
**Next Steps:**
1. User sets up managers in Unity
2. User creates Player prefab
3. User creates UI prefabs
4. Test basic systems

---

## 🆘 Common Tasks

### "Create [X] script"
- Check if it exists first
- If not, create following existing patterns
- Reference design doc for specifications
- Integrate with manager systems

### "Fix this error"
- Read error carefully
- Check script references
- Verify manager initialization
- Fix and test

### "How do I [X]?"
- Check relevant documentation
- Provide step-by-step instructions
- Reference existing code examples

### "What's next?"
- Check BUILD_ROADMAP.md
- Identify current phase
- List next steps
- Offer to create needed scripts

---

## 📖 Important Notes

- **Assets Location:** User has sprite sheets in separate folder (`/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/assets/`)
- **Unity Project:** This folder (`Algorithmia--`) is the actual Unity project
- **Scripts Source:** Scripts were copied from `AlgorithmiaPathOfLogic/Unity/Assets/Scripts/`
- **Design Doc:** All game content is in `algorithmia_full_docs.md`

---

## 🚀 Quick Reference

**Manager Scripts:** `Assets/Scripts/Managers/`  
**Player Script:** `Assets/Scripts/Player/PlayerController.cs`  
**UI Scripts:** `Assets/Scripts/UI/`  
**Design Doc:** `algorithmia_full_docs.md`  
**Build Guide:** `BUILD_ROADMAP.md`

**Key Systems:**
- GameState → Tracks progress
- PuzzleManager → Handles puzzles
- CodexManager → Manages codex entries
- ConceptBridgeManager → Educational sequences
- SaveManager → Save/load system

---

## 💡 Tips for Helping

1. **Always check the design doc first** - It has all the specifications
2. **Follow existing patterns** - Match the code style of existing scripts
3. **Use events** - Don't create tight coupling between systems
4. **Test incrementally** - Small, testable changes are better
5. **Ask clarifying questions** - If unsure about requirements, ask

---

**You're ready to help build this educational game!** 🎮📚

When the user asks for something, reference this file and the design documents to provide accurate, helpful assistance.

