import Phaser from 'phaser';

/**
 * Texture keys used across the Prologue region.
 * Replace the generated placeholders by loading real art with the same keys.
 */
export const PROLOGUE_TEXTURE_KEYS = {
  player: 'prologue_player',
  professor: 'prologue_professor',
  runeKeeper: 'prologue_rune_keeper',
  consoleKeeper: 'prologue_console_keeper',
  platformTile: 'prologue_tile_platform',
  bridgeTile: 'prologue_tile_bridge',
  runeTile: 'prologue_tile_rune',
  consoleTile: 'prologue_tile_console',
  portalOrigin: 'prologue_portal_origin',
  portalArray: 'prologue_portal_array',
  bossGateLocked: 'prologue_gate_locked',
  bossGateOpen: 'prologue_gate_open',
  shardCyan: 'prologue_shard_cyan',
  shardPurple: 'prologue_shard_purple',
  shardOrange: 'prologue_shard_orange',
  interactionIcon: 'prologue_interact_icon',
} as const;

type PlaceholderKey = (typeof PROLOGUE_TEXTURE_KEYS)[keyof typeof PROLOGUE_TEXTURE_KEYS];

interface PlaceholderSpec {
  key: PlaceholderKey;
  width: number;
  height: number;
  draw: (graphics: Phaser.GameObjects.Graphics) => void;
}

const TILE_FILL = 0x1a1a3e;
const TILE_BORDER = 0x3a3a5e;
const TILE_HIGHLIGHT = 0x5a5a7e;

const placeholderSpecs: PlaceholderSpec[] = [
  {
    key: PROLOGUE_TEXTURE_KEYS.player,
    width: 32,
    height: 48,
    draw: (g) => {
      g.fillStyle(0x0f172a, 1);
      g.fillRoundedRect(4, 8, 24, 34, 6);
      g.fillStyle(0x06b6d4, 1);
      g.lineStyle(2, 0x06b6d4, 1);
      g.strokeRoundedRect(4, 8, 24, 34, 6);
      g.fillStyle(0xffe7c7, 1);
      g.fillCircle(16, 12, 8);
      g.fillStyle(0x000000, 1);
      g.fillCircle(12, 12, 2);
      g.fillCircle(20, 12, 2);
      g.fillStyle(0x06b6d4, 0.4);
      g.fillEllipse(16, 42, 26, 6);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.professor,
    width: 32,
    height: 48,
    draw: (g) => {
      g.fillStyle(0xffffff, 1);
      g.fillRoundedRect(5, 10, 22, 30, 4);
      g.fillStyle(0x1e40af, 1);
      g.fillRoundedRect(8, 22, 16, 14, 4);
      g.fillStyle(0xffddb0, 1);
      g.fillCircle(16, 12, 8);
      g.fillStyle(0x000000, 1);
      g.fillCircle(12, 12, 2);
      g.fillCircle(20, 12, 2);
      g.lineStyle(2, 0x9ca3af, 1);
      g.strokeRoundedRect(8, 22, 16, 14, 4);
      g.fillStyle(0x9ca3af, 1);
      g.fillEllipse(16, 42, 24, 6);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.runeKeeper,
    width: 32,
    height: 48,
    draw: (g) => {
      g.fillStyle(0x0f172a, 1);
      g.fillRoundedRect(6, 10, 20, 30, 10);
      g.fillStyle(0x06b6d4, 0.8);
      g.lineStyle(2, 0x06b6d4, 1);
      g.strokeRoundedRect(6, 10, 20, 30, 10);
      g.fillStyle(0x06b6d4, 0.3);
      g.fillCircle(16, 12, 6);
      g.fillStyle(0xffffff, 0.2);
      g.fillCircle(16, 42, 20);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.consoleKeeper,
    width: 32,
    height: 48,
    draw: (g) => {
      g.fillStyle(0x1e1b4b, 1);
      g.fillRoundedRect(6, 10, 20, 30, 6);
      g.lineStyle(2, 0x8b5cf6, 1);
      g.strokeRoundedRect(6, 10, 20, 30, 6);
      g.fillStyle(0xffddb0, 1);
      g.fillCircle(16, 12, 7);
      g.fillStyle(0x8b5cf6, 0.4);
      g.fillCircle(16, 42, 18);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.platformTile,
    width: 64,
    height: 64,
    draw: (g) => {
      g.fillStyle(0x000000, 0.4);
      g.fillRect(4, 4, 60, 60);
      g.fillStyle(TILE_FILL, 1);
      g.fillRect(0, 0, 60, 60);
      g.lineStyle(2, TILE_BORDER, 1);
      g.strokeRect(0, 0, 60, 60);
      g.lineStyle(1, TILE_HIGHLIGHT, 0.5);
      g.lineBetween(0, 0, 0, 60);
      g.lineBetween(0, 0, 60, 0);
      g.lineBetween(30, 0, 30, 60);
      g.lineBetween(0, 30, 60, 30);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.bridgeTile,
    width: 64,
    height: 64,
    draw: (g) => {
      g.fillStyle(0x000000, 0.4);
      g.fillRect(6, 6, 52, 52);
      g.fillStyle(0x262640, 1);
      g.fillRect(0, 0, 52, 52);
      g.lineStyle(2, 0x44446a, 1);
      g.strokeRect(0, 0, 52, 52);
      g.lineStyle(1, 0x56567a, 0.3);
      g.strokePath();
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.runeTile,
    width: 64,
    height: 64,
    draw: (g) => {
      g.fillStyle(0x1e1b4b, 1);
      g.fillCircle(32, 32, 24);
      g.lineStyle(3, 0x06b6d4, 1);
      g.strokeCircle(32, 32, 22);
      g.lineStyle(2, 0xffffff, 0.8);
      g.strokeCircle(32, 32, 10);
      g.fillStyle(0x06b6d4, 0.2);
      g.fillCircle(32, 32, 20);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.consoleTile,
    width: 64,
    height: 64,
    draw: (g) => {
      g.fillStyle(0x1a1a2e, 1);
      g.fillRoundedRect(10, 10, 44, 44, 6);
      g.lineStyle(3, 0x8b5cf6, 0.9);
      g.strokeRoundedRect(10, 10, 44, 44, 6);
      g.fillStyle(0x06b6d4, 0.4);
      g.fillCircle(32, 32, 8);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.portalOrigin,
    width: 96,
    height: 128,
    draw: (g) => {
      g.fillStyle(0xffffff, 0.1);
      g.fillCircle(48, 64, 32);
      g.lineStyle(4, 0xffffff, 0.6);
      g.strokeEllipse(48, 64, 60, 100);
      g.lineStyle(2, 0x06b6d4, 0.8);
      g.strokeEllipse(48, 64, 80, 110);
      g.fillStyle(0x06b6d4, 0.3);
      g.fillEllipse(48, 64, 40, 80);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.portalArray,
    width: 96,
    height: 128,
    draw: (g) => {
      g.fillStyle(0x8b5cf6, 0.2);
      g.fillEllipse(48, 64, 70, 110);
      g.lineStyle(3, 0xf97316, 0.8);
      g.strokeEllipse(48, 64, 50, 90);
      g.lineStyle(2, 0xffffff, 0.5);
      g.strokeEllipse(48, 64, 80, 110);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.bossGateLocked,
    width: 128,
    height: 160,
    draw: (g) => {
      g.fillStyle(0x1a1a2e, 1);
      g.fillRoundedRect(16, 16, 96, 128, 12);
      g.lineStyle(4, 0x8b5cf6, 1);
      g.strokeRoundedRect(16, 16, 96, 128, 12);
      g.fillStyle(0x2a2a4a, 0.8);
      g.fillRoundedRect(32, 32, 64, 96, 8);
      g.fillStyle(0xf97316, 1);
      g.fillCircle(48, 80, 8);
      g.fillCircle(80, 80, 8);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.bossGateOpen,
    width: 128,
    height: 160,
    draw: (g) => {
      g.fillStyle(0x1a1a2e, 1);
      g.fillRoundedRect(16, 16, 96, 128, 12);
      g.lineStyle(4, 0x22c55e, 1);
      g.strokeRoundedRect(16, 16, 96, 128, 12);
      g.fillStyle(0x06b6d4, 0.4);
      g.fillRoundedRect(32, 32, 64, 96, 8);
      g.fillStyle(0xffffff, 0.2);
      g.fillEllipse(64, 80, 70, 110);
    },
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.shardCyan,
    width: 24,
    height: 36,
    draw: (g) => drawShard(g, 0x06b6d4),
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.shardPurple,
    width: 24,
    height: 36,
    draw: (g) => drawShard(g, 0x8b5cf6),
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.shardOrange,
    width: 24,
    height: 36,
    draw: (g) => drawShard(g, 0xf97316),
  },
  {
    key: PROLOGUE_TEXTURE_KEYS.interactionIcon,
    width: 64,
    height: 32,
    draw: (g) => {
      g.fillStyle(0x000000, 0.7);
      g.fillRoundedRect(0, 0, 64, 32, 8);
      g.lineStyle(2, 0xfbbf24, 1);
      g.strokeRoundedRect(0, 0, 64, 32, 8);
      g.fillStyle(0xfbbf24, 1);
      g.fillRect(10, 8, 14, 16);
      g.fillRect(28, 12, 20, 8);
    },
  },
];

function drawShard(graphics: Phaser.GameObjects.Graphics, color: number): void {
  graphics.fillStyle(color, 1);
  graphics.beginPath();
  graphics.moveTo(12, 0);
  graphics.lineTo(22, 12);
  graphics.lineTo(18, 30);
  graphics.lineTo(6, 30);
  graphics.lineTo(2, 12);
  graphics.closePath();
  graphics.fillPath();
  graphics.lineStyle(2, 0xffffff, 0.3);
  graphics.strokePath();
}

/**
 * Generates placeholder textures the first time the game boots.
 * When custom art is available, simply load it with the same texture keys.
 */
export function registerProloguePlaceholders(scene: Phaser.Scene): void {
  placeholderSpecs.forEach((spec) => {
    if (scene.textures.exists(spec.key)) return;
    const gfx = scene.add.graphics();
    spec.draw(gfx);
    gfx.generateTexture(spec.key, spec.width, spec.height);
    gfx.destroy();
  });
}

