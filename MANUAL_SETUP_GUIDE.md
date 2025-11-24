# Manual Setup Guide - Algorithmia Unity Project

This guide walks you through setting up all manager GameObjects manually in Unity, without using the automated script.

---

## Step 1: Open Your Scene

1. Open Unity Editor
2. Open your scene (or create a new one: **File → New Scene → Basic (Built-in)**)
3. Save the scene as `Assets/Scenes/MainGame.unity`

---

## Step 2: Create Manager GameObjects

For each manager, follow these steps:

### 2.1 Create GameState Manager

1. In the **Hierarchy** panel, right-click → **Create Empty**
2. Name it: `GameState`
3. Select the GameObject
4. In the **Inspector** panel, click **Add Component**
5. Search for and add: `GameState`
6. ✅ Done! The script will automatically set `DontDestroyOnLoad` in its `Awake()` method

### 2.2 Create PuzzleManager

1. Right-click in Hierarchy → **Create Empty**
2. Name it: `PuzzleManager`
3. Select it
4. **Add Component** → `PuzzleManager`
5. ✅ Done!

### 2.3 Create CodexManager

1. Right-click in Hierarchy → **Create Empty**
2. Name it: `CodexManager`
3. Select it
4. **Add Component** → `CodexManager`
5. ✅ Done!

### 2.4 Create ConceptBridgeManager

1. Right-click in Hierarchy → **Create Empty**
2. Name it: `ConceptBridgeManager`
3. Select it
4. **Add Component** → `ConceptBridgeManager`
5. ✅ Done!

### 2.5 Create LogicForgeManager

1. Right-click in Hierarchy → **Create Empty**
2. Name it: `LogicForgeManager`
3. Select it
4. **Add Component** → `LogicForgeManager`
5. ✅ Done!

### 2.6 Create SaveManager

1. Right-click in Hierarchy → **Create Empty**
2. Name it: `SaveManager`
3. Select it
4. **Add Component** → `SaveManager`
5. ✅ Done!

### 2.7 Create GameManager

1. Right-click in Hierarchy → **Create Empty**
2. Name it: `GameManager`
3. Select it
4. **Add Component** → `GameManager`
5. ✅ Done!

**Note:** The GameManager component has SerializeField references for manager prefabs, but these are optional. It will create managers automatically if they don't exist, so you can leave them empty.

---

## Step 3: Set Up Camera

1. Select **Main Camera** in Hierarchy
2. In Inspector, set:
   - **Projection:** Orthographic
   - **Size:** 5 (adjust based on your tile size)

---

## Step 4: Create Canvas for UI

1. Right-click in Hierarchy → **UI → Canvas**
2. This automatically creates:
   - Canvas
   - EventSystem
3. Select **Canvas**
4. In Inspector, ensure:
   - **Render Mode:** Screen Space - Overlay

---

## Step 5: Organize Hierarchy (Optional but Recommended)

Organize your Hierarchy for clarity:

```
MainGame (or your scene name)
├── Main Camera
├── GameManager
├── Canvas
│   └── (UI elements will go here later)
├── EventSystem
├── GameState
├── PuzzleManager
├── CodexManager
├── ConceptBridgeManager
├── LogicForgeManager
└── SaveManager
```

**Note:** When you run the game, managers with `DontDestroyOnLoad` will automatically move to a "DontDestroyOnLoad" parent in the Hierarchy. This is normal and expected behavior.

---

## Step 6: Test the Setup

1. **Save the scene:** Ctrl+S (Cmd+S on Mac)
2. **Press Play** button
3. **Check the Console** (Window → General → Console):
   - Should see: "All managers initialized successfully" (from GameManager)
   - Should NOT see any red errors
4. **Check Hierarchy:**
   - Managers should still be there
   - A "DontDestroyOnLoad" GameObject may appear (this is normal)

---

## ✅ Verification Checklist

After setup, verify:

- [ ] All 7 manager GameObjects exist in Hierarchy
- [ ] Each has the correct component attached
- [ ] No "(Missing Script)" warnings in Inspector
- [ ] Console shows no red errors when you press Play
- [ ] Camera is set to Orthographic
- [ ] Canvas exists for UI

---

## 🐛 Troubleshooting

### "Missing Script" Warning

If you see a "Missing Script" warning on a GameObject:

1. Select the GameObject
2. In Inspector, you'll see a component with "(Missing)" or "(Unknown)"
3. Click the three dots (⋮) next to it → **Remove Component**
4. Re-add the component manually:
   - Click **Add Component**
   - Search for the script name
   - Add it again

### Managers Not Initializing

If managers don't initialize:

1. Check Console for errors
2. Ensure all scripts compile (no red errors in Console)
3. Make sure GameManager is in the scene
4. Verify each manager GameObject has the correct component

### Blue Screen Still Appears

1. **Check Console** - Look for red error messages
2. **Check each manager** - Select each one and verify no missing scripts
3. **Try removing and re-adding** the GameManager component
4. **Ensure Newtonsoft.Json package is installed** (Window → Package Manager)

---

## 📝 Notes

- **DontDestroyOnLoad:** All managers automatically set `DontDestroyOnLoad` in their `Awake()` methods, so you don't need to configure this manually
- **Initialization Order:** GameManager ensures GameState is created first, then other managers
- **Prefabs:** You can optionally create prefabs of managers later, but it's not required for basic setup

---

## 🎯 Next Steps

After manual setup is complete:

1. Import your sprite assets (char_000.png, tile_000.png)
2. Create Player prefab with PlayerController component
3. Create UI prefabs (DialogueBox, CodexUI)
4. Set up Tilemap system
5. Test the game!

---

**You're all set!** Your managers are now manually configured and ready to use. 🚀

