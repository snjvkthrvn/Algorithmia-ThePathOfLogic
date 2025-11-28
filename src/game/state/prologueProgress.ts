/**
 * Lightweight persistence for the Prologue region so that puzzle progress,
 * spawn points, and cutscene flags survive scene reloads.
 */

export interface Coordinate {
  x: number;
  y: number;
}

export interface PrologueProgressState {
  completedPuzzles: string[];
  bossGateUnlocked: boolean;
  sentinelDefeated: boolean;
  lastSpawn?: Coordinate;
  flags: Record<string, boolean>;
}

const STORAGE_KEY = 'algorithmia_prologue_progress_v1';

const defaultState: PrologueProgressState = {
  completedPuzzles: [],
  bossGateUnlocked: false,
  sentinelDefeated: false,
  flags: {},
};

let cachedState: PrologueProgressState | null = null;

function readStorage(): PrologueProgressState {
  if (cachedState) return cachedState;
  if (typeof window === 'undefined') {
    cachedState = { ...defaultState };
    return cachedState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cachedState = { ...defaultState };
      return cachedState;
    }
    const parsed = JSON.parse(raw) as PrologueProgressState;
    cachedState = {
      ...defaultState,
      ...parsed,
      completedPuzzles: parsed.completedPuzzles || [],
      flags: parsed.flags || {},
    };
  } catch {
    cachedState = { ...defaultState };
  }
  return cachedState;
}

function writeStorage(state: PrologueProgressState): void {
  cachedState = state;
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors (private mode, etc.)
  }
}

function uniqueList(values: string[]): string[] {
  return Array.from(new Set(values));
}

export const prologueProgress = {
  getState(): PrologueProgressState {
    const state = readStorage();
    return {
      ...state,
      completedPuzzles: [...state.completedPuzzles],
      flags: { ...state.flags },
    };
  },

  reset(): void {
    writeStorage({ ...defaultState });
  },

  markPuzzleComplete(puzzleId: string): void {
    const state = readStorage();
    const completed = uniqueList([...state.completedPuzzles, puzzleId]);
    const bossGateUnlocked = completed.includes('P0-1') && completed.includes('P0-2');
    writeStorage({
      ...state,
      completedPuzzles: completed,
      bossGateUnlocked,
    });
  },

  markBossDefeated(): void {
    const state = readStorage();
    writeStorage({
      ...state,
      sentinelDefeated: true,
    });
  },

  setLastSpawn(point?: Coordinate): void {
    const state = readStorage();
    writeStorage({
      ...state,
      lastSpawn: point,
    });
  },

  setFlag(flag: string, value: boolean): void {
    const state = readStorage();
    writeStorage({
      ...state,
      flags: {
        ...state.flags,
        [flag]: value,
      },
    });
  },

  getFlag(flag: string): boolean {
    const state = readStorage();
    return Boolean(state.flags?.[flag]);
  },

  hasCompleted(puzzleId: string): boolean {
    const state = readStorage();
    return state.completedPuzzles.includes(puzzleId);
  },
};

