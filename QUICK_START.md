# Quick Start Guide

## 📁 Project Structure

```
YourWorkspace/
├── AlgorithmiaPathOfLogic/          # This repository
│   ├── algorithmia_full_docs.md    # Design document
│   ├── assets/                      # Game assets
│   │   ├── sprites/characters/
│   │   │   └── char_000.png
│   │   └── tiles/
│   │       └── tile_000.png
│   ├── Unity/                       # Unity scripts (source)
│   │   └── Assets/Scripts/          # Copy these to your Unity project
│   ├── BUILD_ROADMAP.md             # Complete build guide
│   └── README.md
│
└── YourUnityProject/                # Your actual Unity project folder
    └── Assets/
        └── Scripts/                 # Paste scripts here
```

## 🚀 Getting Started (5 Steps)

### Step 1: Copy Scripts
From: `AlgorithmiaPathOfLogic/Unity/Assets/Scripts/`  
To: `YourUnityProject/Assets/Scripts/`

Copy all folders:
- `Managers/` (7 scripts)
- `Player/` (1 script)
- `UI/` (2 scripts)

### Step 2: Import Assets
From: `AlgorithmiaPathOfLogic/assets/`  
To: Your Unity project

- `sprites/characters/char_000.png` → Unity `Assets/Sprites/Characters/`
- `tiles/tile_000.png` → Unity `Assets/Sprites/Tiles/`

### Step 3: Install Packages
In Unity:
- Window → TextMeshPro → Import TMP Essential Resources
- Package Manager → Add package: `com.unity.nuget.newtonsoft-json`

### Step 4: Create Managers
1. Create empty GameObject "GameManager"
2. Add `GameManager` component
3. Create empty GameObjects for each manager:
   - "GameState" → Add `GameState` component
   - "PuzzleManager" → Add `PuzzleManager` component
   - "CodexManager" → Add `CodexManager` component
   - "ConceptBridgeManager" → Add `ConceptBridgeManager` component
   - "LogicForgeManager" → Add `LogicForgeManager` component
   - "SaveManager" → Add `SaveManager` component

### Step 5: Test
- Run the scene
- Check console for errors
- All managers should initialize

## 📖 Next Steps

See `BUILD_ROADMAP.md` for complete phase-by-phase guide.

## 🆘 Need Help?

- **Scripts needed?** → Ask: "Create [X] script"
- **Errors?** → Share the error, I'll fix it
- **Stuck?** → Describe what you're trying to do

