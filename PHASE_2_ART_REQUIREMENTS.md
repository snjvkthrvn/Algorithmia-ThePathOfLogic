# Phase 2: Art Requirements

## 🎨 Required Art for Phase 2 (Player Setup)

### **Primary Asset: Character Sprite Sheet**

**File:** `char_000.png`  
**Location:** `/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/assets/sprites/characters/char_000.png`  
**Destination in Unity:** `Assets/Sprites/Characters/char_000.png`

---

## 📋 What You Need

### **Minimum for Phase 2:**
1. **Character Sprite Sheet** (`char_000.png`)
   - Contains player character sprites
   - Should include:
     - **Idle frames** (front-facing, standing still)
     - **Walk animation frames** (walking in 4 directions: up, down, left, right)
   - Format: PNG sprite sheet
   - Recommended size: 128×128 pixels per frame

### **Optional (Can Add Later):**
- Different character poses
- Attack animations
- Interaction animations

---

## 📥 How to Import

### Step 1: Copy File to Unity Project

1. **Navigate to your assets folder:**
   ```
   /Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/assets/sprites/characters/
   ```

2. **Copy `char_000.png`** to:
   ```
   /Users/sanjeevkathiravan/Algorithmia--/Assets/Sprites/Characters/
   ```
   
   (Create the `Sprites/Characters/` folder if it doesn't exist)

### Step 2: Configure Sprite Import Settings

1. **Select `char_000.png`** in Unity Project window
2. **In Inspector**, configure:
   - **Texture Type:** Sprite (2D and UI)
   - **Sprite Mode:** Multiple (if it's a sprite sheet)
   - **Pixels Per Unit:** 128 (for characters)
   - **Filter Mode:** Point (no filter) - for pixel art
   - **Compression:** None (for pixel art)

### Step 3: Slice the Sprite Sheet

If `char_000.png` is a sprite sheet with multiple frames:

1. **Click "Sprite Editor"** button in Inspector
2. **Slice the sprites:**
   - Click **Slice** dropdown → **Grid By Cell Count**
   - Enter the number of **columns** and **rows** in your sprite sheet
   - Or use **Grid By Cell Size** if you know the exact pixel size (e.g., 128×128)
3. **Click "Apply"** to save the slices

### Step 4: Extract Individual Sprites

After slicing, you'll see individual sprites in the Project window:
- `char_000_0` (first frame)
- `char_000_1` (second frame)
- etc.

**For Phase 2, you need:**
- **One idle frame** (front-facing, standing)
- **Walk animation frames** (optional for now - can add later)

---

## 🎯 What to Use for Player

### **Option 1: Use Sprite Sheet (Recommended)**

1. **Select one frame** from the sliced sprite sheet (e.g., `char_000_0`)
2. **Assign it to Player GameObject:**
   - Select Player GameObject
   - In Inspector → Sprite Renderer component
   - Drag the sprite into the **Sprite** field

### **Option 2: Use Full Sprite Sheet (If Single Image)**

If `char_000.png` is a single image (not a sprite sheet):

1. **Select `char_000.png`** in Project
2. **In Inspector:**
   - **Sprite Mode:** Single
   - **Pixels Per Unit:** 128
3. **Assign to Player** as above

---

## 🚫 If You Don't Have the Art Yet

**No problem!** You can use a placeholder:

### **Quick Placeholder Setup:**

1. **In Unity Hierarchy:**
   - Right-click → **2D Object → Sprite → Square**
   - Name it: `Player`

2. **Select Player → Inspector → Sprite Renderer:**
   - Click the **circle icon** next to Sprite
   - Select a colored square (Unity default)
   - **Set Color** to something visible (blue, green, etc.)
   - **Set Scale** to (0.5, 0.5, 1) to make it smaller

3. **Continue with Phase 2 setup:**
   - Add Rigidbody2D
   - Add Collider
   - Add PlayerController
   - Test movement

**You can replace the placeholder with the real sprite later!**

---

## 📐 Sprite Sheet Specifications

If you're creating or preparing the sprite sheet, here are the recommended specs:

### **Character Sprite Sheet:**
- **Format:** PNG (with transparency)
- **Frame Size:** 128×128 pixels per frame
- **Layout:** Grid format (rows × columns)
- **Content:**
  - Row 1: Idle frames (front-facing)
  - Row 2: Walk down animation (4-8 frames)
  - Row 3: Walk up animation (4-8 frames)
  - Row 4: Walk left animation (4-8 frames)
  - Row 5: Walk right animation (4-8 frames)

### **Example Layout:**
```
[Idle] [Idle2] [Idle3] ...
[Walk Down 1] [Walk Down 2] [Walk Down 3] ...
[Walk Up 1] [Walk Up 2] [Walk Up 3] ...
[Walk Left 1] [Walk Left 2] [Walk Left 3] ...
[Walk Right 1] [Walk Right 2] [Walk Right 3] ...
```

---

## ✅ Phase 2 Art Checklist

- [ ] `char_000.png` copied to `Assets/Sprites/Characters/`
- [ ] Sprite import settings configured:
  - [ ] Texture Type: Sprite (2D and UI)
  - [ ] Sprite Mode: Multiple (if sprite sheet)
  - [ ] Pixels Per Unit: 128
  - [ ] Filter Mode: Point
- [ ] Sprite sheet sliced (if applicable)
- [ ] At least one sprite frame extracted
- [ ] Sprite assigned to Player GameObject
- [ ] Player visible in scene

---

## 🔄 After Phase 2

Once Phase 2 is complete, you'll also need:
- **Tile sprites** (`tile_000.png`) for Phase 4 (Tilemap setup)
- **UI graphics** for Phase 3 (UI Systems)

But for now, **just the character sprite is enough!**

---

## 📍 File Locations Summary

**Source (where your art is):**
```
/Users/sanjeevkathiravan/AlgorithmiaPathOfLogic/assets/sprites/characters/char_000.png
```

**Destination (Unity project):**
```
/Users/sanjeevkathiravan/Algorithmia--/Assets/Sprites/Characters/char_000.png
```

---

**That's it!** Just the one character sprite sheet is needed for Phase 2. 🎨

