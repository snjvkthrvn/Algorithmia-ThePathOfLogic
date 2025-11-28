/**
 * Spatial blueprint for the Prologue - Chamber of Flow overworld.
 * All measurements are in tile units unless stated otherwise.
 */

const TILE_SIZE = 64;

export interface PlatformArea {
  id: string;
  tileX: number;
  tileY: number;
  width: number;
  height: number;
  label?: string;
  variant?: 'hub' | 'puzzle' | 'bridge' | 'portal' | 'boss';
}

export interface PuzzleNodeSpec {
  id: string;
  keeper: 'RUNE_KEEPER' | 'SENTINEL_GUARDIAN';
  puzzleScene: string;
  position: { x: number; y: number };
  label: string;
  lockedBy?: string[];
}

export interface PortalSpec {
  id: 'origin' | 'boss_gate' | 'array_gate';
  position: { x: number; y: number };
  type: 'portal' | 'gate';
}

export interface RuneSpec {
  x: number;
  y: number;
  delay: number;
}

export interface ConsoleSpec {
  x: number;
  y: number;
  color: 'cyan' | 'purple' | 'orange';
}

const toCenter = (tileX: number, tileY: number) => ({
  x: tileX * TILE_SIZE + TILE_SIZE / 2,
  y: tileY * TILE_SIZE + TILE_SIZE / 2,
});

export const PROLOGUE_LAYOUT = {
  tileSize: TILE_SIZE,
  mapWidth: 20,
  mapHeight: 16,
  spawnPoint: toCenter(7.5, 8),

  platforms: [
    { id: 'origin', tileX: 1, tileY: 7, width: 3, height: 3, label: 'Origin Rift', variant: 'portal' },
    { id: 'hub', tileX: 4, tileY: 5, width: 8, height: 6, label: 'Central Hub', variant: 'hub' },
    { id: 'path_bridge', tileX: 7, tileY: 4, width: 2, height: 2, variant: 'bridge' },
    { id: 'path_platform', tileX: 6, tileY: 1, width: 4, height: 3, label: 'Path Runes', variant: 'puzzle' },
    { id: 'east_bridge', tileX: 10, tileY: 6, width: 2, height: 2, variant: 'bridge' },
    { id: 'console_platform', tileX: 12, tileY: 5, width: 4, height: 4, label: 'Flow Consoles', variant: 'puzzle' },
    { id: 'boss_bridge', tileX: 10, tileY: 9, width: 2, height: 2, variant: 'bridge' },
    { id: 'boss_platform', tileX: 9, tileY: 11, width: 4, height: 3, label: 'Sentinel Gate', variant: 'boss' },
    { id: 'array_bridge', tileX: 12, tileY: 13, width: 2, height: 2, variant: 'bridge' },
    { id: 'array_platform', tileX: 13, tileY: 14, width: 3, height: 2, label: 'Array Plains Gate', variant: 'portal' },
  ] as PlatformArea[],

  professorNode: {
    position: toCenter(7.3, 7.3),
  },

  puzzleNodes: [
    {
      id: 'P0-1',
      keeper: 'RUNE_KEEPER',
      puzzleScene: 'Puzzle_P0_1_Scene',
      position: toCenter(7.5, 2.6),
      label: 'Follow the Path',
    },
    {
      id: 'P0-2',
      keeper: 'SENTINEL_GUARDIAN',
      puzzleScene: 'Puzzle_P0_2_Scene',
      position: toCenter(13.8, 7),
      label: 'Flow Consoles',
      lockedBy: ['P0-1'],
    },
  ] as PuzzleNodeSpec[],

  portals: [
    { id: 'origin', position: toCenter(2.5, 8.5), type: 'portal' },
    { id: 'boss_gate', position: toCenter(10.5, 11.6), type: 'gate' },
    { id: 'array_gate', position: toCenter(14, 14.6), type: 'portal' },
  ] as PortalSpec[],

  runeSequence: [
    { x: toCenter(6.5, 1.5).x, y: toCenter(6.5, 1.5).y, delay: 0 },
    { x: toCenter(7.5, 1.2).x, y: toCenter(7.5, 1.2).y, delay: 150 },
    { x: toCenter(8.5, 1.4).x, y: toCenter(8.5, 1.4).y, delay: 300 },
    { x: toCenter(8.8, 2.4).x, y: toCenter(8.8, 2.4).y, delay: 450 },
    { x: toCenter(8.4, 3.0).x, y: toCenter(8.4, 3.0).y, delay: 600 },
    { x: toCenter(7.2, 3.2).x, y: toCenter(7.2, 3.2).y, delay: 750 },
  ] as RuneSpec[],

  consoles: [
    { x: toCenter(12.3, 5.5).x, y: toCenter(12.3, 5.5).y, color: 'cyan' },
    { x: toCenter(13.3, 6.8).x, y: toCenter(13.3, 6.8).y, color: 'purple' },
    { x: toCenter(12.6, 8.1).x, y: toCenter(12.6, 8.1).y, color: 'orange' },
  ] as ConsoleSpec[],
} as const;

export type PrologueLayout = typeof PROLOGUE_LAYOUT;

