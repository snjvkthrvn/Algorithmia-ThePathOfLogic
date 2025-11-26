import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { MenuScene } from '../scenes/MenuScene';
import { GameScene } from '../scenes/GameScene';
import { Puzzle_P0_1_Scene } from '../scenes/Puzzle_P0_1_Scene';
import { ConceptBridgeScene } from '../scenes/ConceptBridgeScene';
import { Room2Scene } from '../scenes/Room2Scene';
import { Puzzle_P0_2_Scene } from '../scenes/Puzzle_P0_2_Scene';
import Puzzle_AP1_Scene from '../scenes/Puzzle_AP1_Scene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1280,
  height: 720,
  backgroundColor: '#2d2d2d',
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
  
  scene: [BootScene, MenuScene, GameScene, Room2Scene, Puzzle_P0_1_Scene, Puzzle_P0_2_Scene, Puzzle_AP1_Scene, ConceptBridgeScene],
  pixelArt: true,
  antialias: false,
};