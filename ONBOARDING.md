# AlgoGame - Onboarding Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Development Environment Setup](#development-environment-setup)
4. [Development Tools & Workflow](#development-tools--workflow)
5. [Project Architecture](#project-architecture)
6. [Asset Organization](#asset-organization)
7. [Getting Started](#getting-started)
8. [Next Steps](#next-steps)

---

## 🎮 Project Overview

**Project Name:** AlgoGame  
**Unity Version:** 2022.3.62f3  
**Project Type:** 2D Game (Puzzle/Logic-based)  
**Platform:** Standalone (Mac/Windows/Linux)

### Game Concept
Based on the project structure, AlgoGame appears to be a logic/puzzle-based game featuring:
- **Player Systems**: Character movement and interaction
- **Puzzle Mechanics**: Logic-based challenges
- **NPCs**: Non-player characters for interaction
- **Boss Arenas**: Combat or challenge areas
- **Concept Bridges**: Educational or tutorial elements
- **Logic Forge**: Core puzzle-solving mechanics
- **Dialogue System**: Story and interaction
- **Codex System**: Information/knowledge base

---

## 📁 Project Structure

### Root Directory
```
algogame/
├── Assets/              # All game assets
├── Library/            # Unity-generated files (auto-generated)
├── Logs/               # Unity editor logs
├── Packages/           # Package dependencies
├── ProjectSettings/    # Unity project configuration
├── Temp/              # Temporary build files
└── UserSettings/       # User-specific editor settings
```

### Assets Directory Structure
```
Assets/
├── Animations/         # Animation clips and controllers
│   ├── NPCs/          # NPC animations
│   └── Player/        # Player animations
├── Audio/             # Sound effects and music
│   ├── Music/         # Background music
│   └── SFX/           # Sound effects
├── Materials/         # Material assets
├── Prefabs/           # Reusable GameObject prefabs
│   ├── Environment/  # Environmental prefabs
│   ├── NPCs/         # NPC prefabs
│   ├── Player/       # Player prefabs
│   └── Puzzles/      # Puzzle prefabs
├── Resources/         # Runtime-loaded resources
├── Scenes/            # Unity scene files
│   ├── BossArenas/   # Boss battle scenes
│   ├── ConceptBridges/ # Tutorial/educational scenes
│   ├── LogicForge/   # Core puzzle scenes
│   ├── Puzzles/      # Individual puzzle scenes
│   ├── Regions/      # World region scenes
│   └── SampleScene.unity # Default test scene
├── ScriptableObjects/ # Data-driven objects
├── Sprites/           # 2D sprite assets
│   ├── Characters/   # Character sprites
│   ├── Environment/  # Environment sprites
│   ├── Player/       # Player sprites (walk animations included)
│   ├── Puzzles/      # Puzzle-related sprites
│   └── UI/           # User interface sprites
├── Tilemaps/          # Tilemap assets
└── UI/                # User interface assets
    ├── Codex/        # Codex UI elements
    ├── ConceptBridge/ # Concept bridge UI
    ├── Dialogue/     # Dialogue system UI
    └── Menus/        # Menu UI elements
```

---

## 🛠️ Development Environment Setup

### Prerequisites

1. **Unity Hub** (Latest version)
   - Download from: https://unity.com/download
   - Install Unity 2022.3.62f3 (or compatible LTS version)

2. **Code Editor** (Choose one)
   - **Rider** (Recommended - already configured)
   - **Visual Studio** (Also configured)
   - **VS Code** (Optional)

3. **Version Control** (Recommended)
   - Git
   - Unity Collaborate is enabled in project

### Initial Setup Steps

1. **Clone/Open the Project**
   ```bash
   # If using Git
   git clone <repository-url>
   cd algogame
   ```

2. **Open in Unity Hub**
   - Launch Unity Hub
   - Click "Open" or "Add"
   - Navigate to the `algogame` folder
   - Unity will detect the project version and prompt to install if needed

3. **Wait for Initial Import**
   - First-time opening may take several minutes
   - Unity will import all assets and compile scripts
   - Check the Console for any errors

4. **Verify Package Installation**
   - Open `Window > Package Manager`
   - Verify these packages are installed:
     - Unity 2D Feature Set
     - TextMeshPro
     - Visual Scripting
     - Timeline
     - Test Framework
     - **MCP for Unity** (AI development tool)

---

## 🔧 Development Tools & Workflow

### MCP (Model Context Protocol) Integration

This project includes **MCP for Unity**, which allows AI assistants (like Cursor, Claude Code, VS Code) to interact with Unity directly.

#### MCP Setup Status
- ✅ MCP server is configured
- ✅ Unity Bridge can be started from Unity Editor
- ✅ Client configuration available for Cursor/VS Code

#### Using MCP

1. **In Unity Editor:**
   - Open `Window > MCP for Unity`
   - Click "Start Bridge" if not running
   - Use "Auto-Setup" to configure your code editor

2. **In Cursor/VS Code:**
   - MCP is already configured in `~/.cursor/mcp.json`
   - The AI assistant can now:
     - Read Unity editor state
     - Create/modify GameObjects
     - Manage scenes and prefabs
     - Create/edit C# scripts
     - Run tests
     - Check console logs

#### MCP Configuration File
Location: `~/.cursor/mcp.json`
```json
{
  "mcpServers": {
    "unityMCP": {
      "command": "/Users/sanjeevkathiravan/.local/bin/uv",
      "args": [
        "run",
        "--directory",
        "/Users/sanjeevkathiravan/Library/AppSupport/UnityMCP/UnityMcpServer/src",
        "server.py"
      ]
    }
  }
}
```

### Code Editor Setup

#### Rider (Recommended)
- Already configured in project
- Open `.sln` file in Rider
- Unity will auto-sync on script changes

#### Visual Studio
- Already configured in project
- Open `.sln` file in Visual Studio
- Unity will auto-sync on script changes

### Unity Editor Workflow

1. **Scene Management**
   - Default scene: `Assets/Scenes/SampleScene.unity`
   - Create new scenes in appropriate folders
   - Use scene loading for game flow

2. **Prefab Workflow**
   - Create prefabs in `Assets/Prefabs/` subfolders
   - Organize by category (Player, NPCs, Puzzles, Environment)
   - Use prefab variants for variations

3. **Script Organization**
   - Create scripts in appropriate folders
   - Follow C# naming conventions
   - Use namespaces for organization

---

## 🏗️ Project Architecture

### Current State
**Status:** Early Development / Project Setup Phase

The project has been structured with:
- ✅ Folder organization for all asset types
- ✅ Scene organization by game feature
- ✅ UI system folders prepared
- ✅ Animation folders for characters
- ✅ Audio system structure
- ✅ MCP integration for AI-assisted development

### Systems to Implement

Based on the folder structure, the following systems are planned:

#### 1. **Player System**
- Location: `Assets/Prefabs/Player/`, `Assets/Animations/Player/`, `Assets/Sprites/Player/`
- Components needed:
  - Player Controller (movement, input)
  - Player Animator (walk animations exist: walkdown, walkup, walkleft, walkright, left1)
  - Player Stats/Health
  - Interaction system

#### 2. **Puzzle System**
- Location: `Assets/Scenes/Puzzles/`, `Assets/Prefabs/Puzzles/`
- Components needed:
  - Puzzle base class/interface
  - Puzzle manager
  - Puzzle validation logic
  - Puzzle progression system

#### 3. **Logic Forge System**
- Location: `Assets/Scenes/LogicForge/`
- Purpose: Core puzzle-solving mechanics
- Components needed:
  - Logic gate system
  - Algorithm building interface
  - Solution validation

#### 4. **Dialogue System**
- Location: `Assets/UI/Dialogue/`
- Components needed:
  - Dialogue manager
  - Dialogue UI
  - Dialogue data structure (ScriptableObjects)
  - NPC dialogue triggers

#### 5. **Codex System**
- Location: `Assets/UI/Codex/`
- Purpose: Information/knowledge base
- Components needed:
  - Codex UI
  - Codex data structure
  - Entry management system

#### 6. **Concept Bridge System**
- Location: `Assets/Scenes/ConceptBridges/`, `Assets/UI/ConceptBridge/`
- Purpose: Educational/tutorial elements
- Components needed:
  - Tutorial system
  - Concept explanation UI
  - Progress tracking

#### 7. **Boss Arena System**
- Location: `Assets/Scenes/BossArenas/`
- Components needed:
  - Boss AI/behavior
  - Arena management
  - Boss health/damage system

#### 8. **NPC System**
- Location: `Assets/Prefabs/NPCs/`, `Assets/Animations/NPCs/`
- Components needed:
  - NPC controller
  - NPC dialogue integration
  - NPC AI/behavior

---

## 📦 Asset Organization

### Naming Conventions
- **Scenes**: PascalCase (e.g., `SampleScene.unity`)
- **Prefabs**: PascalCase (e.g., `Player.prefab`)
- **Scripts**: PascalCase (e.g., `PlayerController.cs`)
- **Sprites**: lowercase_with_underscores (e.g., `walkdown.png`)
- **Materials**: PascalCase (e.g., `PlayerMaterial.mat`)

### Asset Guidelines

1. **Sprites**
   - Player sprites are in `Assets/Sprites/Player/`
   - Use consistent naming for animation frames
   - Keep sprite sheets organized

2. **Prefabs**
   - Create prefabs for reusable GameObjects
   - Use prefab variants for variations
   - Keep prefabs organized by category

3. **Scenes**
   - One scene per game area/feature
   - Use additive scene loading for complex areas
   - Keep scenes organized by purpose

4. **ScriptableObjects**
   - Use for data-driven design
   - Store game data, dialogue, puzzle definitions
   - Keep in `Assets/ScriptableObjects/`

---

## 🚀 Getting Started

### For New Developers

1. **Familiarize Yourself**
   - Read this documentation
   - Explore the project structure in Unity
   - Review existing assets (especially player sprites)

2. **Set Up Your Environment**
   - Install Unity 2022.3.62f3
   - Configure your code editor (Rider/VS)
   - Set up MCP if using AI assistance

3. **Start with Sample Scene**
   - Open `Assets/Scenes/SampleScene.unity`
   - This is the default test scene
   - Use it for initial development and testing

4. **Create Your First Script**
   - Right-click in Project window
   - Create > C# Script
   - Place in appropriate folder
   - Follow existing naming conventions

5. **Test Your Changes**
   - Use Unity's Test Framework (already installed)
   - Create Edit Mode tests for logic
   - Create Play Mode tests for gameplay

### Development Priorities

Based on the project structure, suggested development order:

1. **Phase 1: Core Systems**
   - [ ] Player Controller
   - [ ] Basic Movement System
   - [ ] Camera Follow
   - [ ] Input System

2. **Phase 2: Puzzle Foundation**
   - [ ] Puzzle Base System
   - [ ] Puzzle Manager
   - [ ] First Puzzle Implementation

3. **Phase 3: UI Systems**
   - [ ] Dialogue System
   - [ ] Menu System
   - [ ] Codex UI

4. **Phase 4: Game Content**
   - [ ] NPC System
   - [ ] Dialogue Content
   - [ ] Puzzle Content
   - [ ] Boss Arenas

5. **Phase 5: Polish**
   - [ ] Audio Integration
   - [ ] Animation Polish
   - [ ] UI Polish
   - [ ] Performance Optimization

---

## 📝 Next Steps

### Immediate Actions

1. **Review Project Structure**
   - Familiarize yourself with all folders
   - Understand the organization system

2. **Set Up Development Environment**
   - Ensure Unity 2022.3.62f3 is installed
   - Configure code editor
   - Test MCP connection (if using)

3. **Plan First Feature**
   - Decide on first system to implement
   - Create design document if needed
   - Set up version control workflow

4. **Create Initial Scripts**
   - Set up core game manager
   - Create player controller skeleton
   - Implement basic systems

### Documentation to Create

- [ ] Game Design Document (GDD)
- [ ] Technical Design Document (TDD)
- [ ] API Documentation (as scripts are created)
- [ ] Art Style Guide
- [ ] Audio Design Document

### Tools to Set Up

- [ ] Version Control Workflow (Git)
- [ ] Issue Tracking System
- [ ] Build Pipeline
- [ ] Testing Framework Setup

---

## 🔍 Key Files & Locations

### Important Configuration Files
- `ProjectSettings/ProjectSettings.asset` - Main project settings
- `ProjectSettings/EditorBuildSettings.asset` - Build configuration
- `Packages/manifest.json` - Package dependencies
- `~/.cursor/mcp.json` - MCP client configuration

### Key Directories
- `Assets/Scenes/` - All game scenes
- `Assets/Prefabs/` - Reusable GameObjects
- `Assets/Sprites/Player/` - Player sprite assets (5 walk animations)
- `Assets/UI/` - All UI-related assets

### Build Settings
- Default scene: `Assets/Scenes/SampleScene.unity`
- Platform: Standalone (Mac/Windows/Linux)
- Default resolution: 1920x1080

---

## 📚 Resources & References

### Unity Documentation
- [Unity 2D Documentation](https://docs.unity3d.com/Manual/Unity2D.html)
- [Unity Scripting API](https://docs.unity3d.com/ScriptReference/)
- [Unity Best Practices](https://learn.unity.com/tutorials)

### Package Documentation
- [TextMeshPro](https://docs.unity3d.com/Packages/com.unity.textmeshpro@latest)
- [Visual Scripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@latest)
- [Timeline](https://docs.unity3d.com/Packages/com.unity.timeline@latest)

### MCP for Unity
- [MCP for Unity GitHub](https://github.com/CoplayDev/unity-mcp)
- Access via: `Window > MCP for Unity` in Unity Editor

---

## ❓ Troubleshooting

### Common Issues

1. **Scripts Not Compiling**
   - Check Console for errors
   - Verify .NET version compatibility
   - Ensure all dependencies are installed

2. **MCP Not Connecting**
   - Check Unity Bridge is running (`Window > MCP for Unity`)
   - Verify MCP configuration in `~/.cursor/mcp.json`
   - Restart both Unity and Cursor/VS Code

3. **Assets Not Loading**
   - Check file paths are correct
   - Verify assets are in correct folders
   - Check for missing dependencies

4. **Build Errors**
   - Verify all scenes in build settings
   - Check for missing references
   - Review Console for warnings

---

## 📞 Support & Contact

For questions or issues:
1. Check Unity Console for errors
2. Review this documentation
3. Consult Unity documentation
4. Use MCP AI assistant for code help

---

**Last Updated:** November 2024  
**Project Status:** Early Development  
**Unity Version:** 2022.3.62f3

