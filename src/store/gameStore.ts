import { create } from 'zustand';

interface GameState {
  // Game progress
  currentRegion: string;
  puzzlesCompleted: number;
  codexEntriesUnlocked: number;

  // Player state
  playerPosition: { x: number; y: number };
  playerHealth: number;

  // UI state
  isMenuOpen: boolean;
  isCodexOpen: boolean;
  isDialogueActive: boolean;

  // Actions
  setCurrentRegion: (region: string) => void;
  incrementPuzzlesCompleted: () => void;
  unlockCodexEntry: () => void;
  updatePlayerPosition: (x: number, y: number) => void;
  setMenuOpen: (isOpen: boolean) => void;
  setCodexOpen: (isOpen: boolean) => void;
  setDialogueActive: (isActive: boolean) => void;
  resetGame: () => void;
}

const initialState = {
  currentRegion: 'tutorial',
  puzzlesCompleted: 0,
  codexEntriesUnlocked: 0,
  playerPosition: { x: 0, y: 0 },
  playerHealth: 100,
  isMenuOpen: false,
  isCodexOpen: false,
  isDialogueActive: false,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  setCurrentRegion: (region) => set({ currentRegion: region }),

  incrementPuzzlesCompleted: () =>
    set((state) => ({ puzzlesCompleted: state.puzzlesCompleted + 1 })),

  unlockCodexEntry: () =>
    set((state) => ({ codexEntriesUnlocked: state.codexEntriesUnlocked + 1 })),

  updatePlayerPosition: (x, y) => set({ playerPosition: { x, y } }),

  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),

  setCodexOpen: (isOpen) => set({ isCodexOpen: isOpen }),

  setDialogueActive: (isActive) => set({ isDialogueActive: isActive }),

  resetGame: () => set(initialState),
}));
