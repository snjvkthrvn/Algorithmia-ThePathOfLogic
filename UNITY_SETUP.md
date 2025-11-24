# Unity Setup Guide - Algorithmia: The Path of Logic

## 📁 Project Structure

```
Unity/
└── Assets/
    ├── Scripts/
    │   ├── Managers/
    │   │   ├── GameState.cs
    │   │   ├── PuzzleManager.cs
    │   │   ├── CodexManager.cs
    │   │   ├── ConceptBridgeManager.cs
    │   │   ├── LogicForgeManager.cs
    │   │   ├── SaveManager.cs
    │   │   └── GameManager.cs
    │   ├── Player/
    │   │   └── PlayerController.cs
    │   └── UI/
    │       ├── DialogueBox.cs
    │       └── CodexUI.cs
    ├── Scenes/
    │   └── MainGame.unity (to be created)
    ├── Prefabs/
    │   ├── UI/
    │   │   ├── DialogueBox.prefab (to be created)
    │   │   └── CodexUI.prefab (to be created)
    │   └── Player/
    │       └── Player.prefab (to be created)
    └── Resources/
        └── (asset files)
```

## 🚀 Setup Steps

### 1. Create Unity Project

1. Open Unity Hub
2. Create new 2D project (Unity 2021.3 LTS or newer recommended)
3. Name it "AlgorithmiaPathOfLogic"

### 2. Install Required Packages

**TextMeshPro** (if not already installed):
- Window → TextMeshPro → Import TMP Essential Resources

**Newtonsoft.Json** (for SaveManager):
- Window → Package Manager
- Click "+" → Add package from git URL
- Enter: `com.unity.nuget.newtonsoft-json`
- Or use: `https://github.com/JamesNK/Newtonsoft.Json.git?path=/Src/Newtonsoft.Json`

### 3. Import Scripts

1. Copy all scripts from `AlgorithmiaPathOfLogic/Unity/Assets/Scripts/` to your Unity project's `Assets/Scripts/` folder
2. Unity will automatically compile them
3. **Note:** If your Unity project is in a separate folder, copy the scripts from the `Unity/Assets/Scripts/` folder in this repository

### 4. Create Manager GameObjects

1. Create empty GameObject named "GameManager"
2. Add `GameManager` component
3. Create empty GameObjects for each manager:
   - "GameState" → Add `GameState` component
   - "PuzzleManager" → Add `PuzzleManager` component
   - "CodexManager" → Add `CodexManager` component
   - "ConceptBridgeManager" → Add `ConceptBridgeManager` component
   - "LogicForgeManager" → Add `LogicForgeManager` component
   - "SaveManager" → Add `SaveManager` component

4. Make GameManager DontDestroyOnLoad:
   - Select GameManager
   - In Inspector, ensure it persists (or add `DontDestroyOnLoad` in script)

### 5. Create Player Prefab

1. Create 2D Sprite GameObject
2. Add `Rigidbody2D` component:
   - Body Type: Dynamic
   - Gravity Scale: 0 (for top-down)
   - Freeze Rotation Z: true
3. Add `Collider2D` (BoxCollider2D or CircleCollider2D)
4. Add `PlayerController` component
5. Add `Animator` component (for animations)
6. Set Speed in Inspector (default: 200)
7. Save as Prefab: `Assets/Prefabs/Player/Player.prefab`

### 6. Create UI Prefabs

#### DialogueBox Prefab:
1. Create Canvas (if not exists)
2. Create Panel child
3. Add `DialogueBox` component to Panel
4. Create child UI elements:
   - TextMeshProUGUI for dialogue text
   - Button for continue
5. Assign references in DialogueBox component
6. Save as Prefab: `Assets/Prefabs/UI/DialogueBox.prefab`

#### CodexUI Prefab:
1. Create Panel
2. Add `CodexUI` component
3. Create UI structure:
   - Dropdown for entries list
   - TextMeshProUGUI elements for:
     - Title
     - What You Felt
     - Explanation
     - Pattern Steps
     - Where You'll See This
     - Ability
   - Button for close
4. Assign all references in CodexUI component
5. Save as Prefab: `Assets/Prefabs/UI/CodexUI.prefab`

### 7. Create Main Game Scene

1. Create new scene: `Assets/Scenes/MainGame.unity`
2. Add GameManager GameObject
3. Add Tilemap (2D → Tilemap → Rectangular)
4. Add Player prefab instance
5. Add Canvas with UI prefabs (DialogueBox, CodexUI)
6. Set up Camera (Orthographic, size appropriate for your tiles)
7. Save scene

### 8. Input System Setup

Unity uses Input Manager (legacy) by default. The PlayerController uses:
- W/Up Arrow: Move Up
- S/Down Arrow: Move Down
- A/Left Arrow: Move Left
- D/Right Arrow: Move Right
- E: Interact
- C: Open Codex
- Space: Advance Dialogue
- ESC: Close Codex

These work with default Unity Input Manager.

### 9. Asset Setup

1. Import your sprite sheets from `AlgorithmiaPathOfLogic/assets/`:
   - `sprites/characters/char_000.png` → Unity `Assets/Sprites/Characters/`
   - `tiles/tile_000.png` → Unity `Assets/Sprites/Tiles/`

2. Set up Tilemap:
   - Create Tile Palette (Window → 2D → Tile Palette)
   - Slice tileset (32×32)
   - Paint tiles in scene

3. Set up Player Animations:
   - Create Animator Controller
   - Set up idle/walk animations
   - Assign to Player's Animator component

## ✅ Testing Checklist

- [ ] All managers initialize without errors
- [ ] Player moves with WASD
- [ ] Player can open Codex (C key)
- [ ] DialogueBox can display text
- [ ] Codex shows unlocked entries
- [ ] GameState persists between scenes
- [ ] Save/Load works

## 🎮 Controls

- **WASD / Arrow Keys**: Move player
- **E**: Interact
- **C**: Open/Close Codex
- **Space**: Advance dialogue
- **ESC**: Close UI windows

## 📝 Notes

- All managers use Singleton pattern with DontDestroyOnLoad
- Events use C# Actions (equivalent to Godot signals)
- Save system uses JSON (requires Newtonsoft.Json)
- Player uses Rigidbody2D for physics-based movement
- UI uses TextMeshPro for text rendering

## 🔧 Next Steps

1. Set up Tilemap with your tileset
2. Create player animations from sprite sheet
3. Implement first puzzle (P0-1: Follow the Path)
4. Build Concept Bridge UI
5. Add NPCs and dialogue system

## 🐛 Troubleshooting

**Managers not found?**
- Ensure GameManager is in the scene
- Check that all manager scripts are compiled (no errors)

**Player doesn't move?**
- Check Rigidbody2D is set up correctly
- Verify Input keys are working
- Check PlayerController component is attached

**UI not showing?**
- Ensure Canvas is in scene
- Check UI prefabs are instantiated
- Verify TextMeshPro is imported

**Save/Load errors?**
- Ensure Newtonsoft.Json is installed
- Check file permissions for save directory

