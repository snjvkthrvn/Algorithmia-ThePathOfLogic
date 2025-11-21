# Algorithmia: The Path of Logic (Web Edition)

An educational puzzle-adventure web game that teaches Data Structures & Algorithms through engaging gameplay, not lectures.

## 🎮 Game Concept

Learn DSA concepts by solving spatial puzzles, experiencing algorithmic patterns through interactive gameplay, then understanding the theory through Professor Node's explanations. Build your "DSA Pokédex" (Codex) as you master each concept.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The game will be available at `http://localhost:5173`

## 🏗️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Game Engine:** Phaser 3 (HTML5 2D game framework)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Code Quality:** ESLint + Prettier

## 📁 Project Structure

```
algorithmia-web/
├── public/
│   └── assets/           # Game assets (sprites, audio)
├── src/
│   ├── components/       # React UI components
│   ├── game/            # Phaser game code
│   │   ├── scenes/      # Phaser scenes
│   │   ├── entities/    # Game objects (Player, NPCs)
│   │   ├── systems/     # Game systems
│   │   └── config/      # Game configuration
│   ├── store/           # Zustand state management
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   └── types/           # TypeScript types
└── docs/                # Documentation
```

## 🎯 Current Status

**Phase 0: Setup & Planning** ✅
- [x] Project scaffolding
- [x] Phaser 3 integration
- [x] Basic scene management (Boot, Menu, Game)
- [x] Player movement system (placeholder)
- [x] State management setup
- [x] Tailwind CSS configuration

**Next Steps:**
- Migrate player sprites from Unity
- Implement player animations
- Build first puzzle (Sorting Tiles)
- Create dialogue system

## 📚 Documentation

- [Product Requirements Document](./WEB_APP_PRD.md) - Complete migration plan and roadmap
- [Game Design Document](./ALGORITHMIA_ONBOARDING_DOCUMENT.md) - Educational framework and concepts
- [Development Guide](./ONBOARDING.md) - Project overview and architecture

## 🎮 Controls

- **Movement:** WASD or Arrow Keys
- **Interact:** E (coming soon)
- **Menu:** ESC
- **Codex:** C (coming soon)

## 🛠️ Development

### Code Formatting
```bash
npm run format    # Format with Prettier
npm run lint      # Run ESLint
```

### Building
```bash
npm run build     # Production build
npm run preview   # Preview production build
```

## 🤝 Contributing

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for contribution guidelines.

## 📝 License

Educational project - MIT License

## 🎓 Educational Mission

Algorithmia makes learning algorithms fun and accessible. No prior coding experience needed - learn through play!

---

**Target Audience:** CS students, bootcamp learners, self-taught programmers, interview prep

**Concepts Covered:** Sorting, Searching, Two Pointers, Sliding Window, Trees, Graphs, and more!
