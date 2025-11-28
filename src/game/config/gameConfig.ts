import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { MenuScene } from '../scenes/MenuScene';
import { PrologueScene } from '../scenes/PrologueScene';
import { Puzzle_P0_1_Scene } from '../scenes/Puzzle_P0_1_Scene';
import { Puzzle_P0_2_Scene } from '../scenes/Puzzle_P0_2_Scene';
import { Boss_Fractured_Sentinel_Scene } from '../scenes/Boss_Fractured_Sentinel_Scene';
import { ConceptBridgeScene } from '../scenes/ConceptBridgeScene';
import { GameScene } from '../scenes/GameScene';
import { Room2Scene } from '../scenes/Room2Scene';
import Puzzle_AP1_Scene from '../scenes/Puzzle_AP1_Scene';

/**
 * Main Phaser game configuration
 * Optimized for retro 2D RPG style gameplay
 */
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1280,
  height: 720,
  backgroundColor: '#0a0a1a',
  
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  
  // Scene order: Boot -> Menu -> Game scenes
  scene: [
    BootScene,
    MenuScene,
    // Prologue region
    PrologueScene,
    Puzzle_P0_1_Scene,
    Puzzle_P0_2_Scene,
    Boss_Fractured_Sentinel_Scene,
    // Shared scenes
    ConceptBridgeScene,
    // Legacy scenes (Array Plains)
    GameScene,
    Room2Scene,
    Puzzle_AP1_Scene,
  ],
  
  // Pixel art rendering settings
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  
  // Render settings
  render: {
    pixelArt: true,
    antialias: false,
  },
  
  // Audio settings
  audio: {
    disableWebAudio: false,
  },
};

/**
 * Game constants used across scenes
 */
export const GAME_CONSTANTS = {
  // Tile sizes
  TILE_SIZE: 64,
  
  // Player settings
  PLAYER_SPEED: 160,
  
  // Colors (matching the design spec)
  COLORS: {
    // Prologue palette
    VOID_BLACK: 0x0a0a1a,
    COSMIC_PURPLE: 0x1a1a3e,
    CYAN_GLOW: 0x06b6d4,
    PURPLE_CRYSTAL: 0x8b5cf6,
    ORANGE_ACCENT: 0xf97316,
    GOLD_ACCENT: 0xfbbf24,
    
    // UI colors
    SUCCESS: 0x22c55e,
    ERROR: 0xef4444,
    WARNING: 0xf97316,
    
    // Text colors
    TEXT_LIGHT: 0xffffff,
    TEXT_MUTED: 0x9ca3af,
    TEXT_DARK: 0x4a5568,
    
    // Platform colors
    PLATFORM_DARK: 0x1a1a2e,
    PLATFORM_EDGE: 0x3a3a5e,
    TILE_HIGHLIGHT: 0x5a5a7e,
  },
  
  // Regions
  REGIONS: {
    PROLOGUE: 'prologue',
    ARRAY_PLAINS: 'array_plains',
    TWIN_RIVERS: 'twin_rivers',
  },
  
  // Puzzle IDs
  PUZZLES: {
    P0_1: 'P0-1',
    P0_2: 'P0-2',
    BOSS_FRACTURED_SENTINEL: 'BOSS_FRACTURED_SENTINEL',
  },
};
