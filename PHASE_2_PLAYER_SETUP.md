# Phase 2: Player Setup Guide

## ✅ What's Done
- All managers are set up and working
- PlayerController script is ready

## 🎯 What's Next: Create Player Prefab

### Step 1: Import Player Sprite (If You Have It)

1. If you have `char_000.png` sprite sheet:
   - Import it: Drag `char_000.png` into `Assets/Sprites/Characters/` folder
   - Select the sprite in Project
   - In Inspector, set:
     - **Sprite Mode:** Multiple (if it's a sprite sheet)
     - **Pixels Per Unit:** 128 (for characters)
     - **Filter Mode:** Point (no filter) for pixel art
   - If it's a sprite sheet, click **Sprite Editor** → **Slice** → **Grid By Cell Count** → Set rows/columns

2. If you don't have the sprite yet:
   - You can use a simple colored square for now
   - We'll add the sprite later

---

### Step 2: Create Player GameObject

1. **In your MainGame scene**, right-click in Hierarchy → **2D Object → Sprite → Square** (or use your character sprite)
2. **Name it:** `Player`
3. **Select the Player GameObject**

---

### Step 3: Add Components to Player

#### 3.1 Rigidbody2D
1. In Inspector → **Add Component**
2. Search: `Rigidbody2D`
3. Configure:
   - **Body Type:** Dynamic
   - **Gravity Scale:** 0 (important for top-down!)
   - **Freeze Rotation:** Z ✓ (check the box)

#### 3.2 Collider
1. **Add Component** → `CircleCollider2D` (or `BoxCollider2D`)
2. Adjust size to match your sprite

#### 3.3 PlayerController Script
1. **Add Component** → Search: `PlayerController`
2. In Inspector, set:
   - **Speed:** 200 (or adjust to your preference)

#### 3.4 Animator (Optional for Now)
1. **Add Component** → `Animator`
2. Leave it empty for now (we'll set up animations later)

---

### Step 4: Assign Sprite (If You Have One)

1. Select Player GameObject
2. In Inspector, find the **Sprite Renderer** component
3. Drag your character sprite from Project into the **Sprite** field
4. Adjust **Sorting Layer** if needed (set to a layer above background)

---

### Step 5: Create Player Prefab

1. **Create folder:** `Assets/Prefabs/Player/` (if it doesn't exist)
2. **Drag the Player GameObject** from Hierarchy into the `Assets/Prefabs/Player/` folder
3. This creates a prefab
4. **Delete the Player instance** from the scene (we'll add it back as a prefab instance)

---

### Step 6: Add Player to Scene

1. **Drag the Player prefab** from `Assets/Prefabs/Player/` into your scene
2. **Position it** at (0, 0, 0) or wherever you want the player to start

---

### Step 7: Test Player Movement

1. **Save the scene:** Ctrl+S (Cmd+S on Mac)
2. **Press Play**
3. **Test controls:**
   - **WASD** or **Arrow Keys** - Move player
   - **E** - Interact (will work when we add NPCs/puzzles)
   - **C** - Open Codex (will work when we add CodexUI)

4. **Check Console:**
   - Should see no errors
   - Player should move smoothly

---

## 🎨 Optional: Basic Player Sprite (If No Art Yet)

If you don't have the character sprite yet, create a simple placeholder:

1. **Right-click in Hierarchy** → **2D Object → Sprite → Square**
2. **Name it:** `Player`
3. **Select it** → In Inspector, find **Sprite Renderer**
4. Click the **circle icon** next to Sprite → Select a colored square
5. **Set Color** to something visible (e.g., blue or green)
6. **Scale it down** to a reasonable size (e.g., Scale: 0.5, 0.5, 1)

This gives you a visible player to test movement with!

---

## ✅ Phase 2 Checklist

- [ ] Player GameObject created
- [ ] Rigidbody2D added and configured (Gravity Scale: 0)
- [ ] Collider added
- [ ] PlayerController component added
- [ ] Speed set in Inspector (200)
- [ ] Player prefab created and saved
- [ ] Player added to scene
- [ ] Player moves with WASD/Arrow Keys
- [ ] No errors in Console

---

## 🐛 Troubleshooting

### Player Doesn't Move
- Check Rigidbody2D: **Gravity Scale must be 0**
- Check PlayerController: **Speed should be set** (200)
- Check Console for errors
- Verify input keys are working (try different keys)

### Player Falls Through Scene
- Add a **Ground/Floor** GameObject with a Collider
- Or create a simple platform to test on

### Player Moves Too Fast/Slow
- Adjust **Speed** value in PlayerController component (try 100-300 range)

### "Missing Script" Warning
- Remove the component and re-add PlayerController
- Check that PlayerController.cs compiles (no errors in Console)

---

## 🎯 Next Steps After Phase 2

Once player movement works:

1. **Phase 3: UI Systems** - Create DialogueBox and CodexUI prefabs
2. **Phase 4: Tilemap & Environment** - Set up tilemap system
3. **Phase 5: First Puzzle** - Implement P0-1 "Follow the Path"

---

**You're ready to create your player!** 🎮

