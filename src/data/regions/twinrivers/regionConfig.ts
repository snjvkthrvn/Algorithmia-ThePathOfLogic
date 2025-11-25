/**
 * TWIN RIVERS - THE MIRRORED STREAMS
 * Region 2: Teaching pointer-based algorithms and traversal techniques
 */

import { RegionConfig } from '../../types';

export const twinRiversConfig: RegionConfig = {
  id: 'twinrivers',
  name: 'twin_rivers',
  displayName: 'Twin Rivers',
  description: 'Two rivers flow in perfect symmetry - one warm orange, one cool blue. Floating bridges connect mirrored banks. Here, you will learn the art of pointer techniques: two pointers, convergence, and sliding windows.',

  theme: {
    primaryColor: '#2196F3', // Cool blue (blue river)
    secondaryColor: '#FF9800', // Warm orange (orange river)
    accentColor: '#E0F7FA', // Light cyan (bridges, mist)
    atmosphere: 'flowing, balanced, meditative, symmetric',
    visualStyle: 'Mirrored riverbanks with flowing water, floating platforms, symmetric architecture, zen-like aesthetic with dual color palette'
  },

  unlockRequirements: {
    regionsCompleted: ['prologue', 'arrayplains'],
    specificPuzzles: ['BOSS_SHUFFLER']
  },

  tilemapKey: 'twinrivers_tilemap',
  backgroundMusic: 'twinrivers_theme',
  ambientSound: 'flowing_water',

  spawnPoint: {
    x: 640, // Center bridge
    y: 360
  },

  exitPoints: [
    {
      id: 'to_arrayplains',
      position: { x: 50, y: 360 },
      leadsTo: 'arrayplains',
      requiresUnlock: false
    },
    {
      id: 'to_next_region',
      position: { x: 1230, y: 360 },
      leadsTo: 'graphgrove', // Future region
      requiresUnlock: true,
      unlockCondition: 'BOSS_MIRROR_SERPENT_defeated'
    }
  ],

  npcs: [
    {
      id: 'mirror_walker',
      position: { x: 640, y: 300 }, // Center island
      enabled: true
    },
    {
      id: 'convergence_monk',
      position: { x: 400, y: 200 }, // North - Blue bank
      enabled: true
    },
    {
      id: 'window_weaver',
      position: { x: 880, y: 500 }, // South - Orange bank
      enabled: true
    },
    {
      id: 'current_keeper',
      position: { x: 200, y: 360 }, // West bridge
      enabled: true
    },
    {
      id: 'river_sage',
      position: { x: 640, y: 450 },
      enabled: true
    }
  ],

  puzzles: [
    {
      id: 'TR1',
      position: { x: 300, y: 250 }, // Blue river - North
      enabled: true
    },
    {
      id: 'TR2',
      position: { x: 500, y: 400 }, // Center convergence point
      enabled: true
    },
    {
      id: 'TR3',
      position: { x: 900, y: 300 }, // Orange river - East
      enabled: true
    },
    {
      id: 'TR4',
      position: { x: 700, y: 550 }, // Combined challenge - South
      enabled: true
    },
    {
      id: 'BOSS_MIRROR_SERPENT',
      position: { x: 1100, y: 360 }, // Far east - serpent's lair
      enabled: false // Unlocks after all 4 puzzles
    }
  ],

  interactables: [
    {
      id: 'entrance_monument',
      type: 'sign',
      position: { x: 100, y: 360 },
      spriteKey: 'monument_stone',
      interaction: {
        prompt: 'Read inscription',
        action: 'read',
        outcome: {
          type: 'dialogue',
          value: 'Two rivers flow as one. Two pointers move in harmony. Balance is the key to flow.'
        }
      }
    },
    {
      id: 'blue_river_shrine',
      type: 'sign',
      position: { x: 300, y: 150 },
      spriteKey: 'shrine_blue',
      interaction: {
        prompt: 'Examine shrine',
        action: 'inspect',
        outcome: {
          type: 'dialogue',
          value: 'The Blue River represents the LEFT pointer - beginning, slow, thoughtful.'
        }
      }
    },
    {
      id: 'orange_river_shrine',
      type: 'sign',
      position: { x: 980, y: 570 },
      spriteKey: 'shrine_orange',
      interaction: {
        prompt: 'Examine shrine',
        action: 'inspect',
        outcome: {
          type: 'dialogue',
          value: 'The Orange River represents the RIGHT pointer - end, fast, decisive.'
        }
      }
    },
    {
      id: 'symmetry_bell',
      type: 'button',
      position: { x: 640, y: 300 },
      spriteKey: 'bell_bronze',
      interaction: {
        prompt: 'Ring the bell',
        action: 'activate',
        outcome: {
          type: 'trigger_event',
          value: 'show_symmetry_visualization'
        }
      }
    },
    {
      id: 'boss_gate',
      type: 'door',
      position: { x: 1050, y: 360 },
      spriteKey: 'boss_gate_mirror',
      interaction: {
        prompt: 'Approach the Mirror Gate',
        action: 'inspect',
        requirement: 'TR1_completed AND TR2_completed AND TR3_completed AND TR4_completed',
        outcome: {
          type: 'unlock',
          value: 'BOSS_MIRROR_SERPENT'
        }
      }
    }
  ]
};
