# Quick Setup Instructions - Algorithmia Unity Project

## 🚀 Automated Setup (Recommended)

I've created an automated setup script that will create all manager GameObjects for you!

### Option 1: Complete Project Setup (Recommended for First Time)

1. **Open Unity** and open your project at `/Users/sanjeevkathiravan/Algorithmia--`
2. **In Unity Editor**, go to: **Tools → Algorithmia → Setup Complete Project**
3. This will:
   - Create a new MainGame scene
   - Set up all manager GameObjects
   - Configure Camera (Orthographic)
   - Create Canvas for UI
   - Create EventSystem for UI interactions
   - Save everything automatically

### Option 2: Setup Managers in Existing Scene

If you already have a scene open and just want to add the managers:

1. **Open your scene** in Unity
2. Go to: **Tools → Algorithmia → Setup Managers in Scene**
3. This will create all manager GameObjects in the current scene

### Option 3: Create New Main Game Scene

To create a fresh MainGame scene with all setup:

1. Go to: **Tools → Algorithmia → Create Main Game Scene**
2. This creates a new scene with all managers configured

---

## ✅ What Gets Created

The setup script automatically creates:

- **GameManager** - Main initialization manager
- **GameState** - Progress tracking (singleton, DontDestroyOnLoad)
- **PuzzleManager** - Puzzle lifecycle management (singleton, DontDestroyOnLoad)
- **CodexManager** - Codex entry management (singleton, DontDestroyOnLoad)
- **ConceptBridgeManager** - Educational sequences (singleton, DontDestroyOnLoad)
- **LogicForgeManager** - Practice challenges (singleton, DontDestroyOnLoad)
- **SaveManager** - Save/load system (singleton, DontDestroyOnLoad)
- **Canvas** - For UI elements
- **EventSystem** - For UI interactions
- **Camera** - Configured as Orthographic

All managers automatically set `DontDestroyOnLoad` in their `Awake()` methods, so they persist between scenes.

---

## 🧪 Testing the Setup

After running the setup:

1. **Press Play** in Unity
2. **Check the Console** - You should see:
   - "Puzzle completed: [puzzle IDs]" (if any)
   - No errors about missing managers
3. **In the Hierarchy**, you should see all manager GameObjects
4. **Test manager access** - You can verify managers are accessible by checking:
   - `GameState.Instance` should not be null
   - `PuzzleManager.Instance` should not be null
   - etc.

---

## 📝 Manual Setup (If Needed)

If you prefer to set up manually or the automated script doesn't work:

### Step 1: Create Manager GameObjects

1. In Unity Hierarchy, right-click → Create Empty
2. Name it "GameManager"
3. Add Component → GameManager

Repeat for each manager:
- "GameState" → Add `GameState` component
- "PuzzleManager" → Add `PuzzleManager` component
- "CodexManager" → Add `CodexManager` component
- "ConceptBridgeManager" → Add `ConceptBridgeManager` component
- "LogicForgeManager" → Add `LogicForgeManager` component
- "SaveManager" → Add `SaveManager` component

**Note:** The managers automatically set `DontDestroyOnLoad` in their `Awake()` methods, so you don't need to configure that manually.

### Step 2: Create Main Game Scene

1. File → New Scene → Basic (Built-in)
2. Save as: `Assets/Scenes/MainGame.unity`
3. Add the GameManager GameObject to the scene
4. Configure Camera:
   - Select Main Camera
   - Set Projection: Orthographic
   - Set Size: 5 (adjust based on your tile size)

### Step 3: Create Canvas for UI

1. Right-click in Hierarchy → UI → Canvas
2. Canvas will automatically create EventSystem
3. Set Canvas Render Mode: Screen Space - Overlay

---

## 🎯 Next Steps

After managers are set up:

1. ✅ **Import Assets** - Import your sprite sheets (char_000.png, tile_000.png)
2. ✅ **Create Player Prefab** - See `UNITY_SETUP.md` for details
3. ✅ **Create UI Prefabs** - DialogueBox and CodexUI (see `UNITY_SETUP.md`)
4. ✅ **Set Up Tilemap** - Create tile palette and paint your first region
5. ✅ **Test Basic Systems** - Verify player movement, UI interactions

---

## 🐛 Troubleshooting

### "Managers not found" errors
- Make sure you ran the setup script or created the GameObjects manually
- Check that all manager scripts are compiled (no errors in Console)
- Ensure GameManager is in the scene

### "NullReferenceException" errors
- Managers might not be initialized yet - they initialize in `Awake()`
- Make sure GameManager GameObject is active in the scene
- Check that manager scripts don't have compilation errors

### Setup script doesn't appear in menu
- Make sure the script is in `Assets/Scripts/Editor/` folder
- Unity needs to compile the script - wait a moment after creating it
- Try: Assets → Reimport All

---

## 📚 Related Documentation

- `UNITY_SETUP.md` - Detailed Unity setup guide
- `BUILD_ROADMAP.md` - Phase-by-phase build guide
- `AI_AGENT_ONBOARDING.md` - Project overview and patterns

---

**Ready to build!** 🚀

