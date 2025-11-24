/**
 * ARRAY PLAINS - THE FARMLANDS OF ORDER
 * Region 1: Teaching foundational array-based algorithms
 */

import { RegionConfig } from '../../types';

export const arrayPlainsConfig: RegionConfig = {
  id: 'arrayplains',
  name: 'array_plains',
  displayName: 'Array Plains',
  description: 'A vibrant farmland where crops grow in orderly rows and every tool has its place. Here, you will learn the foundational patterns of organization: sorting, indexing, hashing, and pairing.',

  theme: {
    primaryColor: '#8BC34A', // Bright green (farmland)
    secondaryColor: '#FFEB3B', // Warm yellow (sun, wheat)
    accentColor: '#795548', // Brown (earth, wood)
    atmosphere: 'peaceful, organized, pastoral, welcoming',
    visualStyle: 'Stardew Valley meets Pokémon - bright, cheerful, pixel art farmland with clear visual organization'
  },

  unlockRequirements: {
    regionsCompleted: ['prologue'],
    specificPuzzles: ['BOSS_FRACTURED_SENTINEL']
  },

  tilemapKey: 'arrayplains_tilemap',
  backgroundMusic: 'arrayplains_theme',
  ambientSound: 'farm_ambience',

  spawnPoint: {
    x: 640, // Center of the hub
    y: 360
  },

  exitPoints: [
    {
      id: 'to_prologue',
      position: { x: 50, y: 360 },
      leadsTo: 'prologue',
      requiresUnlock: false
    },
    {
      id: 'to_twinrivers',
      position: { x: 1230, y: 360 },
      leadsTo: 'twinrivers',
      requiresUnlock: true,
      unlockCondition: 'BOSS_SHUFFLER_defeated'
    }
  ],

  npcs: [
    {
      id: 'sorting_farmer',
      position: { x: 1000, y: 200 }, // East Storage Shed
      enabled: true
    },
    {
      id: 'basket_keeper',
      position: { x: 280, y: 200 }, // West Barn
      enabled: true
    },
    {
      id: 'crop_sorter',
      position: { x: 640, y: 100 }, // North Field Workshop
      enabled: true
    },
    {
      id: 'tile_worker',
      position: { x: 640, y: 620 }, // South Grounds
      enabled: true
    },
    {
      id: 'forge_keeper',
      position: { x: 640, y: 360 }, // Logic Forge (center)
      enabled: true
    },
    {
      id: 'village_elder',
      position: { x: 540, y: 360 },
      enabled: true
    }
  ],

  puzzles: [
    {
      id: 'AP1',
      position: { x: 1000, y: 200 }, // East Storage Shed
      enabled: true
    },
    {
      id: 'AP2',
      position: { x: 280, y: 200 }, // West Barn
      enabled: true
    },
    {
      id: 'AP3',
      position: { x: 640, y: 100 }, // North Field Workshop
      enabled: true
    },
    {
      id: 'AP4',
      position: { x: 640, y: 620 }, // South Grounds
      enabled: true
    },
    {
      id: 'BOSS_SHUFFLER',
      position: { x: 1150, y: 500 }, // Boss Arena (SE)
      enabled: false // Unlocks when all 4 puzzles complete
    }
  ],

  interactables: [
    {
      id: 'welcome_sign',
      type: 'sign',
      position: { x: 540, y: 300 },
      spriteKey: 'sign_wood',
      interaction: {
        prompt: 'Read sign',
        action: 'read',
        outcome: {
          type: 'dialogue',
          value: 'Welcome to Array Plains! Visit the four corners of our farmland to learn the patterns of order.'
        }
      }
    },
    {
      id: 'logic_forge_entrance',
      type: 'door',
      position: { x: 640, y: 360 },
      spriteKey: 'building_forge',
      interaction: {
        prompt: 'Enter Logic Forge',
        action: 'enter',
        outcome: {
          type: 'trigger_event',
          value: 'enter_logic_forge'
        }
      }
    },
    {
      id: 'boss_gate',
      type: 'door',
      position: { x: 1100, y: 500 },
      spriteKey: 'boss_gate_locked',
      interaction: {
        prompt: 'Examine the gate',
        action: 'inspect',
        requirement: 'AP1_completed AND AP2_completed AND AP3_completed AND AP4_completed',
        outcome: {
          type: 'unlock',
          value: 'BOSS_SHUFFLER'
        }
      }
    },
    {
      id: 'info_board_east',
      type: 'sign',
      position: { x: 900, y: 250 },
      spriteKey: 'sign_board',
      interaction: {
        prompt: 'Read board',
        action: 'read',
        outcome: {
          type: 'dialogue',
          value: 'EAST SHED: Learn about sorting - the foundation of organization.'
        }
      }
    },
    {
      id: 'info_board_west',
      type: 'sign',
      position: { x: 380, y: 250 },
      spriteKey: 'sign_board',
      interaction: {
        prompt: 'Read board',
        action: 'read',
        outcome: {
          type: 'dialogue',
          value: 'WEST BARN: Discover the power of direct access and indexing.'
        }
      }
    },
    {
      id: 'info_board_north',
      type: 'sign',
      position: { x: 640, y: 50 },
      spriteKey: 'sign_board',
      interaction: {
        prompt: 'Read board',
        action: 'read',
        outcome: {
          type: 'dialogue',
          value: 'NORTH WORKSHOP: Master the art of hashing and grouping.'
        }
      }
    },
    {
      id: 'info_board_south',
      type: 'sign',
      position: { x: 640, y: 670 },
      spriteKey: 'sign_board',
      interaction: {
        prompt: 'Read board',
        action: 'read',
        outcome: {
          type: 'dialogue',
          value: 'SOUTH GROUNDS: Learn the classic Two Sum pattern - a favorite of tech interviews!'
        }
      }
    }
  ],

  logicForge: {
    position: { x: 640, y: 360 },
    challenges: [
      {
        id: 'FORGE_SORT_STEPS',
        unlocked: false // Unlocks after AP1
      },
      {
        id: 'FORGE_HASH_BUCKETS',
        unlocked: false // Unlocks after AP3
      },
      {
        id: 'FORGE_TWO_SUM_DRILL',
        unlocked: false // Unlocks after AP4
      }
    ]
  }
};
