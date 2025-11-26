# Algorithmia: The Path of Logic

> An educational puzzle-adventure web game teaching Data Structures & Algorithms through gameplay, not lectures.

## 🎮 About

**Algorithmia** is a web-based educational game that helps students learn DSA concepts through intuitive spatial puzzles and pattern recognition. Built with React, TypeScript, and Phaser, it offers an engaging alternative to traditional algorithm learning.

### Core Features

- **Interactive Puzzles**: Learn algorithms through visual, spatial challenges
- **Concept Bridge System**: AI-powered explanations connecting gameplay to code concepts
- **Codex System**: Your DSA knowledge base - unlock entries as you progress
- **Three Regions**: Prologue, Array Plains, and Twin Rivers with unique challenges
- **No Coding Required**: Experience algorithmic thinking first, formalize later

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Game Engine**: Phaser 3
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: OpenAI API (for Concept Bridge)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for AI-powered features)

### Installation

```bash
# Clone the repository
git clone https://github.com/snjvkthrvn/Algorithmia-ThePathOfLogic.git
cd Algorithmia-ThePathOfLogic

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_OPENAI_API_KEY to .env

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎯 Project Structure

```
src/
├── components/       # React UI components
├── game/            # Phaser game code
│   ├── scenes/      # Game scenes
│   ├── entities/    # Game objects (Player, NPCs)
│   ├── config/      # Game configuration
│   └── systems/     # Game systems
├── store/           # Zustand state management
├── data/            # Game data (regions, puzzles)
│   └── regions/     # Region-specific data
├── services/        # API and external services
└── App.tsx          # Main application component
```

## 📚 Documentation

- **[WEB_APP_PRD.md](./WEB_APP_PRD.md)** - Product requirements and roadmap
- **[AGENTS.md](./AGENTS.md)** - AI coding agent instructions
- **[algorithmia_full_docs.md](./algorithmia_full_docs.md)** - Complete game design and puzzle specifications

## 🎓 Educational Approach

### Three-Part Learning System

1. **Spatial Puzzle** - Solve visual challenges in the game world
2. **Concept Bridge** - AI explains the algorithm you just used
3. **Codex Entry** - Permanent reference for the concept

### Covered Algorithms

- Pattern Matching & Sequential Reasoning
- Sorting Algorithms (Bubble Sort, Selection Sort)
- Search Algorithms (Linear, Binary)
- Array Manipulation (Indexing, Hashing)
- Two Pointers Technique
- Sliding Window
- And more...

## 🏗️ Development Status

**Current Phase**: Active Development

### Completed
- ✅ Player movement and collision system
- ✅ World structure for Prologue and Array Plains
- ✅ First puzzle implementation
- ✅ AI-powered Concept Bridge system
- ✅ Basic region navigation

### In Progress
- 🔨 Additional puzzle implementations
- 🔨 Concept Bridge refinements
- 🔨 Codex UI system

### Planned
- 📋 Twin Rivers region completion
- 📋 Boss battles
- 📋 Logic Forge practice system
- 📋 Progress persistence
- 📋 Mobile optimization

## 🤝 Contributing

This project is currently in active development. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Team

Created by Sanjeev Kathiravan

## 🙏 Acknowledgments

- Inspired by educational games and the need for better DSA learning tools
- Built with modern web technologies for maximum accessibility
- Special thanks to the open-source community

---

**Play, Learn, Master Algorithms** 🚀
