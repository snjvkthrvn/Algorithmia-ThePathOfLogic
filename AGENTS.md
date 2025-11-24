# AGENTS.md — Algorithmia: The Path of Logic (AI Coding Agent Instructions)

## 🎮 Overview
This repository powers **Algorithmia**, a Pokémon‑style game that teaches Data Structures & Algorithms (DSA) through intuitive puzzles, world exploration, and pattern‑recognition training.

This `AGENTS.md` file provides **explicit instructions for Codex/Cursor AI coding agents**, so they can safely and correctly contribute to this project.

---

# ✅ 1. Agent Mission

Codex is an engineering partner responsible for:

- Generating high‑quality, production‑ready code  
- Maintaining project architecture  
- Creating systems, utilities, tools, and infrastructure  
- Following the GDD (Game Design Document) + Puzzle Design Docs  
- Ensuring correctness, modularity, and clarity  
- Producing well‑commented, readable code  
- Avoiding over‑engineering or unnecessary abstractions  

Codex should always prioritize:

1. **Early Access (EA) milestone requirements**  
2. **Stability and clarity**  
3. **Incremental, reviewable changes**  
4. **File structure consistency**  

---

# ✅ 2. Core Technologies Codex Must Use

### **Frontend (Web EA Version)**
- **Next.js (App Router)**
- **React + TypeScript**
- **TailwindCSS**
- **ShadCN/UI**
- **Framer Motion (light animations only)**

### **Backend**
- **Supabase (Auth + Postgres + Storage)**
- **Edge Functions (for secure logic)**

### **Game Execution Sandbox**
- **Dockerized Judge Service (later milestone)**  
(Not needed for EA.)

### **AI/Logic Systems**
- Logic Forge (simple ordered-step checks)
- Pattern Recognition Bridges
- Region/Puzzle JSON loaders

---

# ✅ 3. File Structure Codex Must Maintain

```
/
└── algorithmia/
    ├── app/                      # Next.js application
    ├── components/               # UI components
    ├── scenes/                   # Regions, maps, and puzzle UIs
    ├── puzzles/                  # Puzzle logic (non-UI)
    ├── codex/                    # Pattern explanations & unlock modules
    ├── data/                     # JSON puzzle configs & region metadata
    ├── lib/                      # Utils (math, sequencing, timing, checks)
    ├── public/                   # Static assets
    ├── supabase/                 # Schema, migrations, policies
    └── docs/                     # GDD, Puzzle Docs, design notes
```

---

# ✅ 4. Codex Interaction Protocol

### **Step 1 — Read the User Request**
Codex must understand:
- WHAT file to modify  
- WHICH part of the game it affects  
- HOW it fits into system architecture  

### **Step 2 — Propose a Plan**
Before writing code, Codex should output a **brief 3–7 step plan**.

### **Step 3 — Execute the Change**
Codex should:
- Create or modify files  
- Use clean, typed, well-commented code  
- Avoid touching irrelevant files  
- Keep changes small and modular  

### **Step 4 — Summarize Completed Work**
After generating code, Codex must summarize:
- Files touched
- Key functions added/changed
- Any assumptions made

---

# ✅ 5. Rules Codex Must Follow

### **Rule A — Respect the GDD & Puzzle Design Doc**
Codex must ALWAYS align with:
- region structure  
- puzzle logic  
- concept bridges  
- EA milestone scope  

### **Rule B — No backend overbuild**
Backend for EA should be simple:
- Player session
- Puzzle completion
- Codex unlocks
- Basic progression

### **Rule C — Avoid hidden complexity**
Codex should:
❌ NOT create unnecessary abstractions  
❌ NOT introduce unfamiliar patterns  
❌ NOT build future features prematurely  

### **Rule D — Use comments liberally**
Each file must include readable comments explaining purpose & logic.

### **Rule E — Maintain the Puzzle Architecture**
Puzzle system is:

```
JSON → Puzzle Engine → Puzzle UI → Concept Bridge → Codex Unlock
```

Codex must not break this structure.

---

# ✅ 6. Early Access Gameplay Requirements (What Codex Must Build)

### **Regions Included**
- Region 0: Prologue (2 puzzles + boss)
- Region 1: Array Plains (4 puzzles + boss)
- Region 2: Twin Rivers (4 puzzles + boss)

### **Core Systems**
- Movement system (simple top-down navigation)
- Puzzle interaction triggers
- Puzzle UI templates
- Pattern Bridge scenes
- Codex system (unlocks per puzzle)
- Region loader from JSON

### **What is NOT included yet**
- Full battle system  
- Advanced regions  
- Inventory  
- Quests  
- Full coding sandbox  

Codex should NOT implement these unless the user explicitly asks.

---

# ✅ 7. Coding Style Rules

- Use TypeScript everywhere.
- Functional components only.
- Prefer small reusable components.
- Avoid class components.
- Keep functions pure unless absolutely necessary.
- Use `zod` for validation.
- Favor React hooks for logic.
- Follow Next.js App Router patterns strictly.

---

# ✅ 8. How Cursor + Codex Should Interact

### **Tip 1 — Always highlight the target file in Cursor**
Codex performs best when the file is selected or referenced.

### **Tip 2 — Use /init once**
Only run `/init` the first time to install this AGENTS.md.

### **Tip 3 — Use /review frequently**
Lets you:
- catch mistakes  
- get patch diffs  
- revert unwanted changes  

### **Tip 4 — Use /approvals strategically**
Approve safe actions like:
- editing existing files  
- creating new files in /app, /components, /data  
But require approval for:
- backend changes  
- schema migrations  
- deleting files  

### **Tip 5 — Ask Codex for architecture diagrams**
Cursor will render them perfectly.

### **Tip 6 — Ask for tests**
Codex can generate lightweight unit tests for puzzle logic.

---

# ✅ 9. Example Commands for Working with Codex

### **Create a new puzzle**
```
Create a new puzzle in /puzzles/ called AP4_TwoSum.
Use the Puzzle Template. Connect it to region JSON.
```

### **Build a UI scene**
```
Generate a React client component for Puzzle TR3 Sliding Window.
Include animated pointer markers and controllable window frame.
```

### **Add a Concept Bridge**
```
Generate the Concept Bridge UI for AP3.
Pull text from docs/AP3.md.
```

---

# 🎉 END OF FILE
