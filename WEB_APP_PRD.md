# Product Requirements Document: Algorithmia Web App Migration

**Document Version:** 1.0
**Date:** 2025-11-19
**Project:** Algorithmia: The Path of Logic - Web App Migration
**Status:** Planning Phase

---

## Executive Summary

This PRD outlines the migration of **Algorithmia: The Path of Logic** from a Unity desktop game to a modern web application. The goal is to maintain the core educational value and gameplay mechanics while leveraging web technologies for broader accessibility, easier distribution, and enhanced social features.

### Migration Rationale

**Why migrate to web:**
- ✅ **Instant Access**: No downloads/installations required - play immediately in browser
- ✅ **Cross-Platform**: Works on Windows, Mac, Linux, tablets, and mobile devices
- ✅ **Easy Distribution**: Share via URL, embed in educational platforms
- ✅ **Lower Barrier to Entry**: Critical for educational tools targeting students
- ✅ **Simplified Updates**: Push updates instantly without user reinstallation
- ✅ **Better Analytics**: Track learning progress and puzzle completion rates
- ✅ **Social Features**: Share progress, compete on leaderboards, collaborate
- ✅ **Cost-Effective**: Eliminate platform-specific builds and certifications

---

## 1. Product Overview

### 1.1 Core Concept (Unchanged)

**Game Title:** Algorithmia: The Path of Logic (Web Edition)

**Genre:** Educational Puzzle-Adventure Web Game

**Target Audience:**
- CS students (16-25 years old)
- Self-taught programmers
- Technical interview prep seekers
- Bootcamp students
- Anyone learning Data Structures & Algorithms

**Value Proposition:** Learn DSA concepts through engaging spatial puzzles, not lectures. Experience algorithmic patterns through gameplay, then understand the theory.

### 1.2 Three-Part Learning System (Preserved)

1. **Spatial Puzzle Phase** - Interactive puzzles teach algorithmic thinking
2. **Concept Bridge Phase** - Professor Node explains the algorithm used
3. **Codex Entry Phase** - Reference system ("DSA Pokédex")

---

## 2. Technical Architecture

### 2.1 Technology Stack

**Frontend Framework:**
- **Primary:** React 18+ with TypeScript
- **Why:** Component-based architecture, strong ecosystem, TypeScript for code safety

**Game Rendering Engine:**
- **Primary:** Phaser 3 (HTML5 game framework)
- **Alternative:** PixiJS for lighter rendering needs
- **Why Phaser:**
  - Mature 2D game engine for web
  - Built-in physics, animation, sprite management
  - Active community and extensive documentation
  - Easy integration with React
  - Mobile-friendly with touch support

**State Management:**
- **Zustand** or **Redux Toolkit** for global game state
- Local storage for save data
- IndexedDB for larger datasets (puzzle states, codex entries)

**UI Framework:**
- **Tailwind CSS** for styling
- **Radix UI** or **shadcn/ui** for accessible UI components
- **Framer Motion** for animations and transitions

**Backend (Optional - Phase 2):**
- **Supabase** or **Firebase** for:
  - User authentication
  - Progress synchronization
  - Leaderboards
  - Analytics
- **PostgreSQL** for structured data
- **RESTful API** or **GraphQL** for data fetching

**Development Tools:**
- **Vite** for fast development and building
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **ESLint + Prettier** for code quality
- **Husky** for git hooks

**Deployment:**
- **Vercel** or **Netlify** for frontend hosting
- **GitHub Actions** for CI/CD
- **Cloudflare CDN** for global asset delivery

### 2.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     WEB BROWSER                         │
├─────────────────────────────────────────────────────────┤
│  React App Layer                                        │
│  ├── UI Components (Menus, Dialogs, Codex)             │
│  ├── State Management (Zustand/Redux)                  │
│  └── Routing (React Router)                            │
├─────────────────────────────────────────────────────────┤
│  Phaser Game Layer                                      │
│  ├── Scene Management (MenuScene, GameScene, etc.)     │
│  ├── Player Controller                                 │
│  ├── Puzzle System                                     │
│  ├── Animation System                                  │
│  └── Physics Engine                                    │
├─────────────────────────────────────────────────────────┤
│  Local Storage                                          │
│  ├── Player Progress                                   │
│  ├── Settings/Preferences                              │
│  └── Codex Unlocks                                     │
└─────────────────────────────────────────────────────────┘
                          │
                          ├─ Optional Backend (Phase 2)
                          │
        ┌─────────────────┴─────────────────┐
        │   Backend Services (Supabase)      │
        ├────────────────────────────────────┤
        │  - User Authentication             │
        │  - Progress Sync                   │
        │  - Leaderboards                    │
        │  - Analytics                       │
        └────────────────────────────────────┘
```

### 2.3 Project Structure

```
algorithmia-web/
├── public/
│   ├── assets/
│   │   ├── sprites/           # Player, NPC, environment sprites
│   │   ├── audio/             # Music and SFX
│   │   ├── fonts/             # Custom fonts
│   │   └── puzzles/           # Puzzle-specific assets
│   └── favicon.ico
│
├── src/
│   ├── components/            # React UI components
│   │   ├── ui/               # Reusable UI components
│   │   ├── menus/            # Menu screens
│   │   ├── codex/            # Codex system
│   │   ├── dialogue/         # Dialogue UI
│   │   └── hud/              # In-game HUD
│   │
│   ├── game/                 # Phaser game code
│   │   ├── scenes/           # Phaser scenes
│   │   │   ├── BootScene.ts
│   │   │   ├── MenuScene.ts
│   │   │   ├── GameScene.ts
│   │   │   └── PuzzleScene.ts
│   │   ├── entities/         # Game objects
│   │   │   ├── Player.ts
│   │   │   ├── NPC.ts
│   │   │   └── PuzzleObject.ts
│   │   ├── systems/          # Game systems
│   │   │   ├── MovementSystem.ts
│   │   │   ├── AnimationSystem.ts
│   │   │   ├── PuzzleManager.ts
│   │   │   ├── DialogueSystem.ts
│   │   │   └── CodexSystem.ts
│   │   ├── config/           # Game configuration
│   │   └── utils/            # Utility functions
│   │
│   ├── store/                # State management
│   │   ├── gameStore.ts      # Game state (Zustand)
│   │   ├── playerStore.ts    # Player data
│   │   ├── codexStore.ts     # Codex entries
│   │   └── settingsStore.ts  # User settings
│   │
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API services (backend integration)
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   │
│   ├── App.tsx               # Main React app
│   ├── main.tsx              # Entry point
│   └── PhaserGame.tsx        # Phaser integration component
│
├── tests/                    # Test files
├── .github/                  # CI/CD workflows
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 3. Feature Specifications

### 3.1 Core Features (MVP - Phase 1)

#### 3.1.1 Player System
**Migrate from Unity:** SimplePlayerMovement.cs → MovementSystem.ts

**Requirements:**
- ✅ 4-directional movement (WASD/Arrow keys)
- ✅ 8-directional sprite animations (4 walk + 4 idle)
- ✅ Smooth transitions between animation states
- ✅ Normalized diagonal movement
- ⭐ **NEW:** Touch/swipe controls for mobile
- ⭐ **NEW:** Gamepad support (optional)

**Implementation:**
```typescript
class Player extends Phaser.GameObjects.Sprite {
  - velocity: Vector2
  - moveSpeed: number
  - currentDirection: Direction
  - animations: AnimationController

  + update(delta: number): void
  + move(direction: Vector2): void
  + playAnimation(name: string): void
}
```

#### 3.1.2 Animation System
**Migrate from Unity:** PlayerAnimator.controller → AnimationSystem.ts

**Requirements:**
- ✅ Load sprite sheets from Unity exports
- ✅ Create animations programmatically
- ✅ Blend tree logic for smooth transitions
- ⭐ **NEW:** Web-optimized sprite atlases
- ⭐ **NEW:** CSS animations for UI elements

**Asset Migration:**
- Export Unity sprite sheets as PNG atlas
- Use TexturePacker or similar for optimization
- Convert to web-friendly formats (WebP with PNG fallback)

#### 3.1.3 Camera System
**New implementation (not in Unity yet):**

**Requirements:**
- ✅ Smooth camera follow (lerp)
- ✅ Constrained to world boundaries
- ✅ Zoom in/out for accessibility
- ⭐ **NEW:** Responsive viewport (mobile, tablet, desktop)

#### 3.1.4 Dialogue System
**New implementation:**

**Requirements:**
- ✅ Text box with character portraits
- ✅ Typewriter effect for text reveal
- ✅ Multiple choice responses
- ✅ Dialogue tree navigation
- ✅ Skip/fast-forward option
- ⭐ **NEW:** Voice narration (optional, accessibility)
- ⭐ **NEW:** Text-to-speech integration

**UI Design:**
- Dialogue box at bottom 1/3 of screen
- Character portrait on left
- Text on right with typewriter effect
- Choice buttons below text
- Skip button (space/click/tap)

#### 3.1.5 Puzzle System
**Core Educational Component:**

**Base Puzzle Interface:**
```typescript
interface IPuzzle {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  algorithmConcept: AlgorithmType;

  initialize(): void;
  checkSolution(): boolean;
  getHint(): string;
  reset(): void;
  onComplete(): void;
}
```

**First Puzzle Types (MVP):**

1. **Sorting Tiles Puzzle** (teaches Bubble/Selection Sort)
   - Grid of numbered tiles
   - Drag-and-drop to reorder
   - Visual feedback on each swap
   - Step counter

2. **Basket Search Puzzle** (teaches Linear/Binary Search)
   - Multiple baskets with items
   - Find target item efficiently
   - Compare search strategies
   - Track comparisons made

3. **Path Finding Puzzle** (teaches BFS/DFS)
   - Grid-based maze
   - Find shortest path to goal
   - Visualize explored nodes
   - Compare algorithms

**Puzzle Requirements:**
- ✅ Visual, interactive, intuitive
- ✅ No prior coding knowledge required
- ✅ Clear win/loss conditions
- ✅ Hints available (max 3 per puzzle)
- ✅ Star rating (1-3 stars based on efficiency)
- ✅ Step counter and timer
- ⭐ **NEW:** Undo/redo functionality
- ⭐ **NEW:** Puzzle replay/solution viewer

#### 3.1.6 Codex System
**"DSA Pokédex" - Knowledge Base:**

**Requirements:**
- ✅ Grid view of all algorithm concepts
- ✅ Lock/unlock states (completed puzzles unlock entries)
- ✅ Detailed entry view with:
  - Algorithm name and description
  - Pseudocode with annotations
  - Time/space complexity
  - Real-world use cases
  - Practice problems (links to LeetCode/similar)
  - Related concepts
- ⭐ **NEW:** Search and filter functionality
- ⭐ **NEW:** Bookmark favorite entries
- ⭐ **NEW:** Personal notes section
- ⭐ **NEW:** Export to PDF/Markdown

**UI Design:**
- Codex accessible via menu button (C key)
- Card-based grid layout
- Hover effects for locked entries (teaser)
- Smooth transitions to detail view
- Category tabs (Sorting, Searching, Trees, Graphs, etc.)

#### 3.1.7 Concept Bridge System
**Post-Puzzle Tutorial:**

**Requirements:**
- ✅ Triggered automatically after puzzle completion
- ✅ Professor Node character appears
- ✅ Explains what algorithm the player just used
- ✅ Shows pseudocode with step-by-step breakdown
- ✅ Mini practice exercise (multiple choice or ordering)
- ✅ Unlocks corresponding Codex entry
- ⭐ **NEW:** Interactive pseudocode (click to see execution)
- ⭐ **NEW:** Visualization of algorithm steps
- ⭐ **NEW:** Optional "deep dive" for advanced learners

**Flow:**
```
Puzzle Complete → Animation/Celebration → Professor Node appears →
Dialogue intro → Pseudocode explanation → Mini exercise →
Success feedback → Codex unlock notification → Return to game
```

### 3.2 UI/UX Features

#### 3.2.1 Main Menu
- Start New Game
- Continue (if save exists)
- Settings
- Codex (if unlocked)
- Credits
- Tutorial

#### 3.2.2 Settings
- Volume controls (Master, Music, SFX)
- Display (Fullscreen, Resolution scale)
- Controls (Keyboard/Touch/Gamepad mappings)
- Accessibility:
  - Text size
  - Colorblind mode
  - Reduced motion
  - High contrast mode
- Language selection (future)

#### 3.2.3 HUD (In-Game)
- Player position/region indicator
- Quest/objective tracker
- Codex quick-access button
- Settings button
- Current puzzle progress (if in puzzle)

#### 3.2.4 Progress Screen
- Puzzles completed (X/Y)
- Codex entries unlocked (X/Y)
- Star rating per puzzle
- Total playtime
- Achievements (future)

### 3.3 Enhanced Web Features (Phase 2+)

#### 3.3.1 User Accounts & Progress Sync
- Sign up / Login (email, Google, GitHub OAuth)
- Cloud save synchronization
- Cross-device progress
- Profile customization

#### 3.3.2 Social Features
- Leaderboards (fastest times, fewest steps)
- Share achievements on social media
- Challenge friends to specific puzzles
- Community-created puzzles (future)

#### 3.3.3 Analytics & Learning Insights
- Track which puzzles are hardest
- Time spent per concept
- Hint usage patterns
- Personalized learning recommendations
- Progress reports for educators (if used in classrooms)

#### 3.3.4 Advanced Puzzles & Content
- Daily challenges
- Seasonal events
- Advanced algorithm concepts (Dynamic Programming, Graph Theory)
- Boss arenas (multi-stage algorithm challenges)
- The Logic Forge (practice mode)

#### 3.3.5 Mobile Optimization
- Touch-optimized UI (larger buttons, gestures)
- Responsive layout (portrait/landscape)
- Progressive Web App (PWA) support
- Offline play capability
- Add to Home Screen

---

## 4. Asset Migration Strategy

### 4.1 Sprites & Animations

**Current Unity Assets:**
- Player sprites: 6 PNG files (~6.2 MB total)
- Animation clips: 8 clips (4 walk + 4 idle)

**Migration Plan:**
1. **Export from Unity:**
   - Export sprite sheets as PNG atlas (1 file per animation set)
   - Use Unity Sprite Atlas or export individual frames

2. **Optimize for Web:**
   - Compress with TinyPNG or similar (target: <500 KB total)
   - Convert to WebP with PNG fallback
   - Create sprite atlas using TexturePacker
   - Generate JSON data for frame positions

3. **Load in Phaser:**
   - Use `this.load.atlas()` for sprite sheets
   - Define animations in AnimationManager
   - Preload in BootScene

**Example Phaser Animation:**
```typescript
this.anims.create({
  key: 'walk-down',
  frames: this.anims.generateFrameNames('player', {
    prefix: 'walk-down-',
    start: 1,
    end: 8,
  }),
  frameRate: 12,
  repeat: -1
});
```

### 4.2 Audio

**Requirements:**
- Background music (looping, low file size)
- Sound effects (footsteps, UI clicks, puzzle interactions)

**Format:**
- Primary: **MP3** (broad browser support, good compression)
- Fallback: **OGG** (for older browsers)
- Target: <5 MB total audio

**Implementation:**
- Use Howler.js or Phaser's built-in audio system
- Lazy load audio (don't block initial load)
- Preload critical sounds (UI clicks)
- Stream music instead of loading fully

### 4.3 UI Assets

**New Assets Needed:**
- Button sprites (normal, hover, active, disabled)
- Dialog box backgrounds
- Codex card frames
- Icons (settings, codex, hints, etc.)
- Loading spinner/progress bar

**Design System:**
- Create SVG icons for scalability
- Use CSS for basic shapes and backgrounds
- Sprite sheets for game-specific UI elements

---

## 5. Development Roadmap

### Phase 0: Setup & Planning (2 weeks)
**Goals:** Project scaffolding, tooling, initial prototype

**Tasks:**
- [x] Analyze Unity project (DONE)
- [x] Create PRD (DONE)
- [ ] Initialize React + TypeScript + Vite project
- [ ] Set up Phaser 3 integration
- [ ] Configure ESLint, Prettier, Husky
- [ ] Set up basic CI/CD (GitHub Actions)
- [ ] Create initial project structure
- [ ] Set up state management (Zustand)
- [ ] Design system foundations (Tailwind + component library)

**Deliverable:** Working skeleton app with Phaser canvas rendering

---

### Phase 1: Core Gameplay (6-8 weeks)
**Goals:** Recreate Unity functionality + basic puzzle system

#### Week 1-2: Player & Camera
- [ ] Migrate player sprites to web
- [ ] Implement Player class with movement
- [ ] Create 8-directional animations
- [ ] Build animation state machine
- [ ] Implement camera follow system
- [ ] Add touch controls for mobile
- [ ] Test on multiple devices

**Deliverable:** Player can move around a test scene with animations

#### Week 3-4: World & Collision
- [ ] Create tilemap system (using Tiled or Phaser tilemap editor)
- [ ] Implement collision detection
- [ ] Build first test region/room
- [ ] Add doors/transitions between rooms
- [ ] Implement interaction triggers (press E to interact)
- [ ] Create NPC placeholder sprites

**Deliverable:** Player can navigate a small world and interact with objects

#### Week 5-6: Puzzle System Foundation
- [ ] Design base puzzle interface/class
- [ ] Implement puzzle state management
- [ ] Create puzzle UI framework
- [ ] Build first puzzle: Sorting Tiles
  - Drag-and-drop functionality
  - Solution validation
  - Step counter
  - Visual feedback
- [ ] Create puzzle success/failure screens
- [ ] Add hint system

**Deliverable:** One fully functional puzzle (Sorting Tiles)

#### Week 7-8: Dialogue & Concept Bridge
- [ ] Build dialogue system UI
- [ ] Implement dialogue tree parser (JSON-based)
- [ ] Create typewriter text effect
- [ ] Design Professor Node character sprite
- [ ] Implement Concept Bridge scene
- [ ] Create pseudocode viewer component
- [ ] Build mini-exercise UI (multiple choice)
- [ ] Connect puzzle completion to Concept Bridge

**Deliverable:** Complete learning loop (Puzzle → Concept Bridge → Understanding)

---

### Phase 2: Content & Codex (4-6 weeks)
**Goals:** Build out educational content and Codex system

#### Week 9-10: Codex System
- [ ] Design Codex UI (grid view)
- [ ] Build Codex entry detail view
- [ ] Implement lock/unlock system
- [ ] Create entry data structure (JSON/database)
- [ ] Populate first 5-10 algorithm entries
  - Bubble Sort
  - Selection Sort
  - Linear Search
  - Binary Search
  - Two Pointers
- [ ] Add search and filter
- [ ] Implement bookmarking
- [ ] Add personal notes feature

**Deliverable:** Functional Codex with 10 algorithm entries

#### Week 11-12: More Puzzles
- [ ] Build Basket Search puzzle (Linear/Binary Search)
- [ ] Build Path Finding puzzle (BFS/DFS)
- [ ] Create 2-3 additional sorting puzzles (variants)
- [ ] Design star rating system
- [ ] Implement puzzle replay feature
- [ ] Add undo/redo to puzzles
- [ ] Create puzzle solution viewer

**Deliverable:** 5-7 unique puzzles covering core DSA concepts

#### Week 13-14: Content Creation
- [ ] Write dialogue for Professor Node (10-15 concept explanations)
- [ ] Create Concept Bridge content (pseudocode + exercises)
- [ ] Design first game region (tutorial area)
- [ ] Add NPC characters with dialogue
- [ ] Create environmental storytelling elements
- [ ] Write tutorial sequence (first 30 minutes of gameplay)

**Deliverable:** Polished tutorial region with 3-5 puzzles

---

### Phase 3: Polish & Optimization (3-4 weeks)
**Goals:** Performance, UX, accessibility, mobile optimization

#### Week 15-16: UI/UX Polish
- [ ] Main menu design and implementation
- [ ] Settings screen with all options
- [ ] Progress screen with statistics
- [ ] Save/load system (localStorage)
- [ ] Loading screens with tips
- [ ] Transitions and animations (Framer Motion)
- [ ] Sound effects for all interactions
- [ ] Background music (2-3 tracks)
- [ ] Accessibility improvements:
  - Keyboard navigation
  - Screen reader support
  - Colorblind mode
  - Text size options

**Deliverable:** Professional, polished UI/UX

#### Week 17-18: Performance & Mobile
- [ ] Optimize asset loading (lazy loading, code splitting)
- [ ] Reduce bundle size (tree shaking, compression)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Optimize touch controls
- [ ] Implement responsive layouts
- [ ] PWA setup (service worker, manifest)
- [ ] Offline support for core gameplay
- [ ] Performance profiling and optimization
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

**Deliverable:** Game runs smoothly on mobile and desktop, <3s initial load

---

### Phase 4: Launch Preparation (2-3 weeks)
**Goals:** Testing, deployment, marketing materials

#### Week 19-20: Testing & Bug Fixes
- [ ] QA testing (all features)
- [ ] User testing with target audience (5-10 students)
- [ ] Fix critical bugs
- [ ] Balance puzzle difficulty
- [ ] Polish animations and transitions
- [ ] Final performance optimization
- [ ] Write unit tests for critical systems
- [ ] E2E tests for main user flows

**Deliverable:** Stable, bug-free MVP

#### Week 21: Deployment & Launch
- [ ] Set up production hosting (Vercel/Netlify)
- [ ] Configure CDN for assets
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Create landing page
- [ ] Write README and documentation
- [ ] Create demo video
- [ ] Prepare marketing materials (screenshots, GIFs)
- [ ] Soft launch (share with small community)
- [ ] Gather feedback
- [ ] Public launch

**Deliverable:** Live web app at algorithmia.yourdomain.com

---

### Phase 5: Post-Launch & Iteration (Ongoing)
**Goals:** User feedback, new content, monetization (optional)

- [ ] Analyze user behavior and learning outcomes
- [ ] Implement user-requested features
- [ ] Add more puzzles and algorithm concepts
- [ ] Build advanced regions and boss arenas
- [ ] Implement backend (user accounts, progress sync)
- [ ] Add social features (leaderboards, sharing)
- [ ] Create community features
- [ ] Consider monetization:
  - Premium content (advanced algorithms)
  - Educator licenses (classroom features)
  - Certification/badges
  - Remove ads option

---

## 6. Success Metrics

### 6.1 Technical Metrics
- **Load Time:** <3 seconds on 4G connection
- **Bundle Size:** <2 MB initial load, <5 MB total
- **Frame Rate:** Stable 60 FPS on modern devices, 30 FPS on older hardware
- **Mobile Performance:** Playable on iPhone 8+, mid-range Android devices
- **Browser Support:** Chrome, Firefox, Safari, Edge (last 2 versions)
- **Accessibility:** WCAG 2.1 AA compliance

### 6.2 User Engagement Metrics
- **Session Duration:** Average 20-30 minutes per session
- **Completion Rate:** >60% of users complete tutorial region
- **Puzzle Completion:** >40% of users complete 5+ puzzles
- **Codex Usage:** >50% of users open Codex at least once
- **Return Rate:** >30% of users return within 7 days
- **Referral Rate:** >10% of users share the game

### 6.3 Educational Metrics
- **Learning Outcomes:** Self-reported confidence increase in DSA concepts
- **Retention:** Users can explain algorithms learned 1 week after playing
- **Transfer:** Users apply learned concepts in coding interviews/courses
- **Satisfaction:** >4/5 stars user rating
- **Recommendation:** >70% would recommend to a friend

---

## 7. Risk Assessment & Mitigation

### 7.1 Technical Risks

**Risk:** Browser compatibility issues
- **Mitigation:** Use polyfills, test on all major browsers, provide fallbacks

**Risk:** Performance issues on low-end devices
- **Mitigation:** Optimize assets, implement quality settings, test on target devices

**Risk:** Asset migration from Unity fails or looks different
- **Mitigation:** Export early, test in Phaser, have designer review, iterate

**Risk:** Phaser learning curve for team
- **Mitigation:** Allocate time for learning, build simple prototypes first, use documentation

### 7.2 Product Risks

**Risk:** Educational value is lost in web version
- **Mitigation:** Maintain core learning loop, user test with students, iterate based on feedback

**Risk:** Puzzles are too easy/hard on web
- **Mitigation:** Difficulty balancing, playtesting, hint system, optional skip

**Risk:** Users don't engage with Concept Bridge content
- **Mitigation:** Make it engaging (animations, interactive), keep it short, incentivize with rewards

**Risk:** Mobile controls feel clunky
- **Mitigation:** Extensive mobile testing, virtual joystick option, gesture controls

### 7.3 Business Risks

**Risk:** Low user adoption
- **Mitigation:** Marketing strategy, share on educational platforms, partner with bootcamps/schools

**Risk:** High hosting costs
- **Mitigation:** Use free tiers initially (Vercel, Netlify), optimize assets, CDN caching

**Risk:** Scope creep delays launch
- **Mitigation:** Strict MVP definition, phased roadmap, say no to non-critical features

---

## 8. Open Questions & Decisions Needed

### 8.1 Design Decisions
- [ ] **Art Style:** Keep Unity pixel art or redesign for web?
  - **Recommendation:** Keep pixel art, it's web-friendly and retro aesthetic is popular

- [ ] **Monetization:** Free, freemium, or premium?
  - **Recommendation:** Free for MVP, add premium features later (advanced content, educator tools)

- [ ] **Backend:** Launch with or without user accounts?
  - **Recommendation:** Launch without (localStorage saves), add in Phase 5

### 8.2 Content Decisions
- [ ] **Algorithm Coverage:** How many algorithms in MVP?
  - **Recommendation:** 10-15 core concepts (Sorting, Searching, Two Pointers, Sliding Window, Basic Graph)

- [ ] **Puzzle Count:** How many puzzles per algorithm?
  - **Recommendation:** 1-2 per concept for MVP, expand based on user feedback

- [ ] **Difficulty Curve:** Linear or branching?
  - **Recommendation:** Linear path for MVP, branching in later phases

### 8.3 Technical Decisions
- [ ] **State Management:** Zustand vs Redux Toolkit?
  - **Recommendation:** Zustand (simpler, less boilerplate, sufficient for this project)

- [ ] **Backend Provider:** Supabase vs Firebase vs custom?
  - **Recommendation:** Supabase (open source, PostgreSQL, generous free tier)

- [ ] **Multiplayer:** Consider for future?
  - **Recommendation:** Not for MVP, interesting for Phase 5+ (co-op puzzle solving)

---

## 9. Documentation & Resources

### 9.1 Preserve from Unity Project
- ✅ ALGORITHMIA_ONBOARDING_DOCUMENT.md (game design)
- ✅ ONBOARDING.md (concept, regions, educational framework)
- ⚠️ ANIMATOR_SETUP_GUIDE.md (reference for animation migration)
- ⚠️ QUICK_START.md (update for web setup)

### 9.2 New Documentation Needed
- [ ] Web App Setup Guide (npm install, dev server, build)
- [ ] Phaser Architecture Guide (scenes, systems, entities)
- [ ] Puzzle Creation Guide (how to add new puzzles)
- [ ] Content Creation Guide (dialogue, Codex entries)
- [ ] Deployment Guide (Vercel/Netlify setup)
- [ ] Contributing Guide (for open source contributions)

### 9.3 Reference Materials
- **Phaser 3 Docs:** https://photonstorm.github.io/phaser3-docs/
- **React + Phaser Tutorial:** https://phaser.io/tutorials/making-your-first-phaser-3-game
- **TypeScript + Phaser:** https://github.com/photonstorm/phaser3-typescript-project-template
- **Game Design Patterns:** https://gameprogrammingpatterns.com/
- **Educational Game Design:** https://www.gamasutra.com/blogs/JoshBycer/20140611/219200/

---

## 10. Appendix

### 10.1 Comparison: Unity vs Web

| Feature | Unity Desktop | Web App | Notes |
|---------|---------------|---------|-------|
| **Distribution** | Download required | Instant play | Web wins for accessibility |
| **File Size** | 100-500 MB | 2-5 MB | Web is much lighter |
| **Cross-Platform** | Requires builds | Works everywhere | Web wins |
| **Performance** | Native speed | Browser-dependent | Unity has edge but web is sufficient for 2D |
| **Graphics** | Advanced 3D/2D | 2D focus | Web is great for 2D pixel art |
| **Updates** | User must update | Instant | Web wins |
| **Offline Play** | Always works | Requires PWA | Unity has advantage |
| **Monetization** | Steam, Itch.io | In-app, subscriptions | Both viable |
| **Analytics** | Limited | Extensive | Web wins |
| **Social Features** | Complex | Easy | Web wins |
| **Development Speed** | Slower | Faster (for 2D) | Web wins for this project |

**Conclusion:** For an educational 2D game prioritizing accessibility and reach, web is the better choice.

### 10.2 Feature Parity Checklist

**From Unity (Completed):**
- [x] Player movement (4 directions)
- [x] Player animations (8 clips)
- [x] Animation state machine
- [x] Editor tools (AnimationHelper → not needed in web)

**From Unity (Planned but not implemented):**
- [ ] Camera follow → Implement in web
- [ ] Collision system → Implement in web
- [ ] Puzzle mechanics → Design for web interactions
- [ ] Dialogue system → Build UI-first in React
- [ ] Codex system → Build as React component
- [ ] NPCs → Implement in Phaser
- [ ] Audio → Add web audio

**New Web Features (Not in Unity):**
- [ ] Touch controls
- [ ] Responsive design
- [ ] PWA support
- [ ] Social sharing
- [ ] Cloud saves
- [ ] Analytics
- [ ] Leaderboards

### 10.3 Technology Alternatives Considered

**Game Engines:**
- ✅ **Phaser 3:** Chosen - mature, 2D-focused, TypeScript support
- ❌ **PixiJS:** Too low-level, need to build more systems
- ❌ **Babylon.js:** Overkill for 2D, 3D-focused
- ❌ **Three.js:** 3D engine, not suitable
- ❌ **Unity WebGL:** Large file sizes, performance concerns

**Frontend Frameworks:**
- ✅ **React:** Chosen - ecosystem, components, familiarity
- ❌ **Vue:** Good alternative, smaller community for game dev
- ❌ **Svelte:** Great performance, less mature ecosystem
- ❌ **Vanilla JS:** Too much boilerplate for UI

**Backend:**
- ✅ **Supabase:** Chosen - PostgreSQL, auth, real-time, free tier
- ❌ **Firebase:** Good alternative, NoSQL might not fit data model
- ❌ **Custom Node.js:** More control, more maintenance
- ❌ **None (localStorage only):** Simple, no sync across devices

---

## 11. Next Steps

### Immediate Actions (This Week)
1. ✅ **Review this PRD** - Get stakeholder/team feedback
2. [ ] **Make key decisions** - Answer open questions in Section 8
3. [ ] **Set up repository** - Initialize web project structure
4. [ ] **Prototype player** - Build simple player movement in Phaser to validate tech stack
5. [ ] **Export assets** - Begin migrating Unity sprites to web formats

### Short Term (Next 2-4 Weeks)
1. [ ] Complete Phase 0 (Setup & Planning)
2. [ ] Build first working prototype (player movement + one test puzzle)
3. [ ] User test prototype with 3-5 people
4. [ ] Iterate based on feedback
5. [ ] Finalize Phase 1 task breakdown

### Long Term (3-6 Months)
1. [ ] Complete Phases 1-4 of roadmap
2. [ ] Launch MVP to small audience (beta)
3. [ ] Gather feedback and iterate
4. [ ] Public launch
5. [ ] Plan Phase 5 features based on user data

---

## 12. Conclusion

Migrating **Algorithmia: The Path of Logic** from Unity to a web app is a strategic decision that aligns with the educational mission of the game. By making the game instantly accessible in browsers, we remove barriers to entry and reach a wider audience of students and learners.

**Key Takeaways:**
- ✅ Web technology (React + Phaser) is mature and capable of delivering the experience
- ✅ The early stage of Unity development makes migration timing ideal (minimal sunk cost)
- ✅ Core educational value can be preserved and enhanced with web features
- ✅ Phased roadmap allows for iterative development and validation
- ✅ MVP can be launched in 4-6 months with focused effort

**Success depends on:**
- Maintaining the quality of the educational content and learning loop
- Ensuring great UX on both desktop and mobile
- Iterating based on user feedback and learning analytics
- Building a community around the game

This PRD serves as the blueprint for the migration. Let's build something that helps thousands of students master algorithms through play! 🚀

---

**Document Approval:**

- [ ] Product Owner: _________________ Date: _______
- [ ] Technical Lead: _________________ Date: _______
- [ ] Designer: _________________ Date: _______

**Revision History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-19 | Claude | Initial PRD creation |
