# Animator Controller Setup Guide

## Overview
This guide walks you through setting up the Player Animator Controller to work with the SimplePlayerMovement.cs script.

---

## Prerequisites

✅ **SimplePlayerMovement.cs** script created
✅ **Player sprites** sliced in Assets/Sprites/Player/
✅ **Player GameObject** in scene with:
- SpriteRenderer
- Rigidbody2D
- Animator

---

## Step 1: Create Animation Clips

### Option A: Using Animation Helper (Recommended)

1. Open **Tools → Algorithmia → Animation Helper**
2. Select sprites in Project window (e.g., all "walkdown" sprites)
3. Click **"Create Walk Down"** quick action button
4. Repeat for all 8 animations:
   - Player_IdleDown
   - Player_IdleUp
   - Player_IdleLeft
   - Player_IdleRight
   - Player_WalkDown
   - Player_WalkUp
   - Player_WalkLeft
   - Player_WalkRight

### Option B: Manual Creation

1. Select Player GameObject in Hierarchy
2. Open **Window → Animation → Animation**
3. Click **"Create"** and save as `Player_WalkDown.anim`
4. In Animation window, click **"Add Property"** → SpriteRenderer → Sprite
5. Drag sprites into timeline in order
6. Set sample rate (12 FPS for walk, 6 FPS for idle)
7. Repeat for all 8 animations

---

## Step 2: Create Animator Controller

1. In Project window, navigate to `Assets/Animations/Player/`
2. Right-click → **Create → Animator Controller**
3. Name it **"PlayerAnimator"**
4. Double-click to open in Animator window

---

## Step 3: Add Animation Parameters

In the Animator window **Parameters** tab, add these parameters:

| Name | Type | Default Value |
|------|------|---------------|
| **Speed** | Float | 0 |
| **DirectionX** | Float | 0 |
| **DirectionY** | Float | 0 |

These match the parameters set by SimplePlayerMovement.cs.

---

## Step 4: Set Up Animation States

### Method A: Blend Tree (Recommended for Smooth Transitions)

#### 4.1 Create Movement Blend Tree

1. Right-click in Animator → **Create State → From New Blend Tree**
2. Name it **"Movement"**
3. Double-click to enter blend tree
4. Set **Blend Type** to **"2D Freeform Directional"**
5. Set parameters:
   - **Blend Parameter X**: DirectionX
   - **Blend Parameter Y**: DirectionY

#### 4.2 Add Motion States

Click **"+"** to add motions:

| Motion | Pos X | Pos Y | Notes |
|--------|-------|-------|-------|
| Player_IdleDown | 0 | -1 | Idle facing down |
| Player_IdleUp | 0 | 1 | Idle facing up |
| Player_IdleLeft | -1 | 0 | Idle facing left |
| Player_IdleRight | 1 | 0 | Idle facing right |
| Player_WalkDown | 0 | -1 | Walking down |
| Player_WalkUp | 0 | 1 | Walking up |
| Player_WalkLeft | -1 | 0 | Walking left |
| Player_WalkRight | 1 | 0 | Walking right |

#### 4.3 Create Speed-Based Layer

1. Exit blend tree (click "Base Layer" at top)
2. Create parameter condition on Movement state:
   - **Transition**: Entry → Movement
   - **Condition**: Speed > 0.01
3. For idle animations, use Speed == 0

---

### Method B: State Machine (Alternative)

If you prefer explicit state control:

1. Drag all 8 animation clips into Animator window
2. Create transitions based on DirectionX/DirectionY values
3. Set conditions like:
   - DirectionY < -0.5 → WalkDown
   - DirectionY > 0.5 → WalkUp
   - DirectionX < -0.5 → WalkLeft
   - DirectionX > 0.5 → WalkRight

---

## Step 5: Attach Components to Player

1. Select **Player GameObject** in Hierarchy
2. In Inspector:
   - **Animator Component**:
     - Controller: Drag **PlayerAnimator** here
   - **Rigidbody2D Component**:
     - Body Type: Dynamic
     - Gravity Scale: 0
     - Constraints: Freeze Rotation Z
   - **Add Component** → Search **"SimplePlayerMovement"**

---

## Step 6: Test Movement

1. Enter **Play Mode**
2. Press **WASD** or **Arrow Keys**
3. Verify:
   - ✅ Character moves smoothly
   - ✅ Animations play correctly
   - ✅ Character faces correct direction
   - ✅ Sprite flips when moving left
   - ✅ Idle animation plays when stopped

---

## Troubleshooting

### Issue: Character doesn't move
- Check Rigidbody2D is Dynamic and Gravity Scale = 0
- Verify SimplePlayerMovement script is attached

### Issue: Animations don't play
- Check Animator has correct Controller assigned
- Verify animation clips are not empty
- Check Parameters tab has Speed, DirectionX, DirectionY

### Issue: Character slides after releasing keys
- Add Physics Material 2D with Friction = 0 to Player
- Alternatively, in SimplePlayerMovement.cs FixedUpdate, set velocity to zero when no input

### Issue: Character moves too fast diagonally
- Script already normalizes diagonal movement
- If still too fast, reduce moveSpeed value

### Issue: Wrong sprites show in animations
- Verify sprites are dragged in correct order in Animation window
- Check sprite names match expected pattern

---

## Advanced: Creating Additional Animations

For interaction animations (reading, pushing, etc.):

1. Create new animation clips (e.g., `Player_Read.anim`)
2. Add new parameter to Animator (e.g., `isReading` bool)
3. Create transition from Movement blend tree to new animation
4. Trigger from code:
   ```csharp
   animator.SetBool("isReading", true);
   ```

---

## Script Integration Examples

### Disable Movement During Cutscenes
```csharp
// In another script
var playerMovement = player.GetComponent<SimplePlayerMovement>();
playerMovement.enabled = false; // Stops movement
```

### Change Speed for Power-ups
```csharp
var playerMovement = player.GetComponent<SimplePlayerMovement>();
playerMovement.SetMoveSpeed(10f); // Double speed!
```

### Check if Player is Moving
```csharp
var playerMovement = player.GetComponent<SimplePlayerMovement>();
if (playerMovement.IsMoving())
{
    Debug.Log("Player is on the move!");
}
```

---

## File Structure After Setup

```
Assets/
├── Animations/
│   └── Player/
│       ├── PlayerAnimator.controller  ← Animator Controller
│       ├── Player_IdleDown.anim
│       ├── Player_IdleUp.anim
│       ├── Player_IdleLeft.anim
│       ├── Player_IdleRight.anim
│       ├── Player_WalkDown.anim
│       ├── Player_WalkUp.anim
│       ├── Player_WalkLeft.anim
│       └── Player_WalkRight.anim
├── Scripts/
│   ├── Editor/
│   │   └── AnimationHelper.cs        ← Editor utility
│   └── Player/
│       └── SimplePlayerMovement.cs   ← Movement script
└── Sprites/
    └── Player/
        ├── walkdown.png (sliced)
        ├── walkup.png (sliced)
        ├── walkleft.png (sliced)
        └── walkright.png (sliced)
```

---

## Next Steps

Once player movement is working:

1. **Add Camera Follow** - Create CameraController.cs to follow player
2. **Add Collision** - Set up tilemap colliders for walls
3. **Add Interaction System** - Create InteractionController.cs for NPC dialogue
4. **Add Puzzle Triggers** - Create trigger zones for puzzle areas

---

**Need Help?** Check Unity Console for errors or re-read the Troubleshooting section.

Good luck with your game development! 🎮
