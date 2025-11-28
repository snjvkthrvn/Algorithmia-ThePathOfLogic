/**
 * PROLOGUE - CHAMBER OF FLOW
 * Tutorial region introducing basic game mechanics and sequential thinking
 */

import type { RegionConfig } from '../../types';

export const prologueConfig: RegionConfig = {
  id: 'prologue',
  name: 'chamber_of_flow',
  displayName: 'Chamber of Flow',
  description: 'A void-like abstract space where logic takes form. Floating white tiles guide your first steps into the world of algorithms.',

  theme: {
    primaryColor: '#FFFFFF', // Pure white tiles
    secondaryColor: '#00FFFF', // Cyan glow
    accentColor: '#1A1A1A', // Dark void background
    atmosphere: 'ethereal, quiet, focused',
    visualStyle: 'minimalist, abstract, glowing elements on dark void'
  },

  unlockRequirements: {
    // No requirements - starting region
  },

  tilemapKey: 'prologue_tilemap',
  backgroundMusic: 'prologue_ambient',
  ambientSound: 'void_echo',

  spawnPoint: {
    x: 640,
    y: 360
  },

  exitPoints: [
    {
      id: 'to_array_plains',
      position: { x: 1200, y: 360 },
      leadsTo: 'arrayplains',
      requiresUnlock: true,
      unlockCondition: 'boss_fractured_sentinel_defeated'
    }
  ],

  npcs: [
    {
      id: 'professor_node',
      position: { x: 640, y: 300 },
      enabled: true
    }
  ],

  puzzles: [
    {
      id: 'P0-1',
      position: { x: 400, y: 360 },
      enabled: true
    },
    {
      id: 'P0-2',
      position: { x: 800, y: 360 },
      enabled: true
    },
    {
      id: 'BOSS_FRACTURED_SENTINEL',
      position: { x: 1100, y: 360 },
      enabled: false // Unlocks after P0-1 and P0-2 are completed
    }
  ],

  interactables: [
    {
      id: 'intro_portal',
      type: 'portal',
      position: { x: 100, y: 360 },
      spriteKey: 'portal_white',
      interaction: {
        prompt: 'Where did I come from?',
        action: 'inspect',
        outcome: {
          type: 'dialogue',
          value: 'intro_portal_dialogue'
        }
      }
    },
    {
      id: 'boss_gate',
      type: 'door',
      position: { x: 1000, y: 360 },
      spriteKey: 'boss_gate_locked',
      interaction: {
        prompt: 'Examine the gate',
        action: 'inspect',
        requirement: 'P0-1_completed AND P0-2_completed',
        outcome: {
          type: 'unlock',
          value: 'BOSS_FRACTURED_SENTINEL'
        }
      }
    }
  ]
};
