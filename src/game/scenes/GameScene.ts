import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { DialogueSystem, NPCDialogues } from '../systems/DialogueSystem';
import type { DialogueLine } from '../systems/DialogueSystem';
import { PROLOGUE_LAYOUT } from '../config/prologueLayout';
import type { PlatformArea, PuzzleNodeSpec, PortalSpec, RuneSpec, ConsoleSpec } from '../config/prologueLayout';
import { PROLOGUE_TEXTURE_KEYS } from '../config/placeholderTextures';
import { prologueProgress } from '../state/prologueProgress';
import type { PrologueProgressState } from '../state/prologueProgress';

type ConsoleColor = 'cyan' | 'purple' | 'orange';

interface InteractableTarget {
  id: string;
  type: 'npc' | 'puzzle' | 'portal' | 'gate' | 'inspect';
  radius: number;
  position: () => Phaser.Math.Vector2;
  getPrompt: () => string;
  onInteract: () => void;
}

interface PuzzleNodeState {
  spec: PuzzleNodeSpec;
  container: Phaser.GameObjects.Container;
  aura: Phaser.GameObjects.Ellipse;
  keeper: Phaser.GameObjects.Image;
  state: 'locked' | 'available' | 'complete';
}

const PROFESSOR_INTRO: DialogueLine[] = [
  { speaker: 'Professor Node', text: 'Ah, you\'re awake. Welcome to the Chamber of Flow.' },
  { speaker: 'Professor Node', text: 'This void is the space between thought and understanding.' },
  { speaker: 'Professor Node', text: 'Step across these platforms and the patterns of logic will reveal themselves.' },
  { speaker: 'Professor Node', text: 'Begin with the runes to the north, then restore the consoles to the east.' },
];

const ORIGIN_PORTAL_LINES: DialogueLine[] = [
  { speaker: 'Void Echo', text: 'You sense whispers of the world you left behind, but the path only goes forward.' },
];

const BOSS_GATE_LOCKED_LINES: DialogueLine[] = [
  { speaker: 'Sentinel Gate', text: 'Two lessons. Two shards. Complete them and I shall open.' },
];

const ARRAY_GATE_LOCKED_LINES: DialogueLine[] = [
  { speaker: 'Gatekeeper', text: 'Calm the Fractured Sentinel to walk into the Array Plains.' },
];

const BOSS_PLACEHOLDER_LINES: DialogueLine[] = [
  { speaker: 'Sentinel Gate', text: 'The Sentinel encounter is still stabilizing. Return soon.' },
];

export class GameScene extends Phaser.Scene {
  private player?: Player;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private dialogueSystem!: DialogueSystem;
  private interactPrompt?: Phaser.GameObjects.Container;
  private interactText?: Phaser.GameObjects.Text;
  private interactables: InteractableTarget[] = [];
  private activeTarget: InteractableTarget | null = null;
  private runeTiles: Phaser.GameObjects.Image[] = [];
  private consoleNodes: Partial<Record<ConsoleColor, Phaser.GameObjects.Container>> = {};
  private puzzleNodes = new Map<string, PuzzleNodeState>();
  private bossGate?: Phaser.GameObjects.Image;
  private arrayPortal?: Phaser.GameObjects.Image;
  private progress!: PrologueProgressState;
  private readonly tileSize = PROLOGUE_LAYOUT.tileSize;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.progress = prologueProgress.getState();
    this.cameras.main.setBackgroundColor('#0a0a1a');
    this.physics.world.setBounds(0, 0, PROLOGUE_LAYOUT.mapWidth * this.tileSize, PROLOGUE_LAYOUT.mapHeight * this.tileSize);

    this.createAtmosphere();
    this.createPlatforms();
    this.createPathRunes();
    this.createFlowConsoles();
    this.createPortals();
    this.createPuzzleKeepers();
    this.createProfessorNode();
    this.createPlayer();
    this.createUI();

    this.dialogueSystem = new DialogueSystem(this);
    this.setupInput();
    this.refreshWorldState();
    this.showRegionIntro();
    this.runOpeningCutscene();
  }

  update(): void {
    if (!this.player || !this.cursors || !this.wasd) return;

    if (this.dialogueSystem.isDialogueActive()) {
      this.player.setVelocity(0, 0);
      return;
    }

    this.player.handleMovement(this.cursors, this.wasd);
    this.enforcePlatformBounds();
    this.evaluateInteractables();
  }

  private createAtmosphere(): void {
    const width = PROLOGUE_LAYOUT.mapWidth * this.tileSize;
    const height = PROLOGUE_LAYOUT.mapHeight * this.tileSize;

    for (let i = 0; i < 120; i++) {
      const star = this.add.circle(Phaser.Math.Between(0, width), Phaser.Math.Between(0, height), Phaser.Math.Between(1, 3), 0xffffff, Phaser.Math.FloatBetween(0.2, 0.6));
      star.setDepth(-10);
      this.tweens.add({
        targets: star,
        alpha: { from: star.alpha, to: star.alpha * 0.3 },
        duration: Phaser.Math.Between(1500, 3500),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      });
    }

    const nebula = this.add.graphics();
    nebula.setDepth(-9);
    nebula.fillGradientStyle(0x1a1a3e, 0x1a1a3e, 0x0a0a1a, 0x0a0a1a, 0.35);
    nebula.fillRect(0, 0, width, height);
  }

  private createPlatforms(): void {
    PROLOGUE_LAYOUT.platforms.forEach((area) => this.paintPlatformArea(area));
  }

  private paintPlatformArea(area: PlatformArea): void {
    for (let row = 0; row < area.height; row++) {
      for (let col = 0; col < area.width; col++) {
        const x = (area.tileX + col) * this.tileSize;
        const y = (area.tileY + row) * this.tileSize;
        const texture = this.getTileTexture(area.variant);
        this.add.image(x, y, texture).setOrigin(0).setDepth(-4);
      }
    }

    if (area.label) {
      this.add.text((area.tileX + area.width / 2) * this.tileSize, (area.tileY - 0.3) * this.tileSize, area.label, {
        fontSize: '10px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#6b7280',
      }).setOrigin(0.5).setDepth(5);
    }
  }

  private getTileTexture(variant?: PlatformArea['variant']): string {
    if (variant === 'bridge') return PROLOGUE_TEXTURE_KEYS.bridgeTile;
    if (variant === 'puzzle') return PROLOGUE_TEXTURE_KEYS.platformTile;
    if (variant === 'portal') return PROLOGUE_TEXTURE_KEYS.platformTile;
    if (variant === 'boss') return PROLOGUE_TEXTURE_KEYS.platformTile;
    return PROLOGUE_TEXTURE_KEYS.platformTile;
  }

  private createPathRunes(): void {
    PROLOGUE_LAYOUT.runeSequence.forEach((spec: RuneSpec) => {
      const rune = this.add.image(spec.x, spec.y, PROLOGUE_TEXTURE_KEYS.runeTile).setDepth(6).setAlpha(0.7);
      this.tweens.add({
        targets: rune,
        alpha: { from: 0.4, to: 1 },
        duration: 900,
        delay: spec.delay,
        yoyo: true,
        repeat: -1,
      });
      this.runeTiles.push(rune);
    });
  }

  private createFlowConsoles(): void {
    const colorToTexture: Record<ConsoleColor, string> = {
      cyan: PROLOGUE_TEXTURE_KEYS.shardCyan,
      purple: PROLOGUE_TEXTURE_KEYS.shardPurple,
      orange: PROLOGUE_TEXTURE_KEYS.shardOrange,
    };

    PROLOGUE_LAYOUT.consoles.forEach((spec: ConsoleSpec) => {
      const container = this.add.container(spec.x, spec.y);
      const base = this.add.image(0, 0, PROLOGUE_TEXTURE_KEYS.consoleTile).setDepth(4);
      const shard = this.add.image(0, -10, colorToTexture[spec.color]).setDepth(5);
      const glow = this.add.circle(0, 0, 24, 0xffffff, 0.06).setDepth(3);
      container.add([glow, base, shard]);
      container.setDepth(5);
      this.tweens.add({
        targets: shard,
        y: shard.y - 4,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      this.consoleNodes[spec.color] = container;
    });
  }

  private createPortals(): void {
    PROLOGUE_LAYOUT.portals.forEach((portal: PortalSpec) => {
      if (portal.id === 'origin') {
        const image = this.add.image(portal.position.x, portal.position.y, PROLOGUE_TEXTURE_KEYS.portalOrigin).setDepth(8);
        this.addPortalInteractable(portal, image);
      } else if (portal.id === 'boss_gate') {
        this.bossGate = this.add.image(portal.position.x, portal.position.y, PROLOGUE_TEXTURE_KEYS.bossGateLocked).setDepth(8);
        this.addPortalInteractable(portal, this.bossGate);
      } else {
        this.arrayPortal = this.add.image(portal.position.x, portal.position.y, PROLOGUE_TEXTURE_KEYS.portalArray).setDepth(8);
        this.addPortalInteractable(portal, this.arrayPortal);
      }
    });
  }

  private addPortalInteractable(portal: PortalSpec, sprite: Phaser.GameObjects.Image): void {
    const promptMap: Record<PortalSpec['id'], string> = {
      origin: 'Inspect the Rift',
      boss_gate: 'Approach the Gate',
      array_gate: 'Travel to Array Plains',
    };

    this.addInteractable({
      id: portal.id,
      type: portal.type,
      radius: 90,
      position: () => new Phaser.Math.Vector2(sprite.x, sprite.y),
      getPrompt: () => promptMap[portal.id],
      onInteract: () => this.handlePortalInteraction(portal.id),
    });
  }

  private createPuzzleKeepers(): void {
    PROLOGUE_LAYOUT.puzzleNodes.forEach((spec) => {
      const container = this.add.container(spec.position.x, spec.position.y);
      const aura = this.add.ellipse(0, 20, 90, 30, 0x06b6d4, 0.2);
      const keeperTexture = spec.keeper === 'RUNE_KEEPER' ? PROLOGUE_TEXTURE_KEYS.runeKeeper : PROLOGUE_TEXTURE_KEYS.consoleKeeper;
      const keeper = this.add.image(0, -10, keeperTexture).setOrigin(0.5, 1);
      const label = this.add.text(0, -70, spec.label.toUpperCase(), {
        fontSize: '10px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#fbbf24',
        stroke: '#000',
        strokeThickness: 4,
      }).setOrigin(0.5);
      container.add([aura, keeper, label]);
      container.setDepth(10);
      this.tweens.add({
        targets: keeper,
        y: keeper.y - 2,
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      this.puzzleNodes.set(spec.id, {
        spec,
        container,
        aura,
        keeper,
        state: 'locked',
      });

      this.addInteractable({
        id: spec.id,
        type: 'puzzle',
        radius: 120,
        position: () => new Phaser.Math.Vector2(container.x, container.y),
        getPrompt: () => this.getPuzzlePrompt(spec.id),
        onInteract: () => this.handlePuzzleInteraction(spec.id),
      });
    });
  }

  private createProfessorNode(): void {
    const position = PROLOGUE_LAYOUT.professorNode.position;
    const container = this.add.container(position.x, position.y);
    const aura = this.add.circle(0, 20, 30, 0x8b5cf6, 0.15);
    const sprite = this.add.image(0, -10, PROLOGUE_TEXTURE_KEYS.professor).setOrigin(0.5, 1);
    const label = this.add.text(0, -70, 'PROFESSOR NODE', {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#8b5cf6',
    }).setOrigin(0.5);
    container.add([aura, sprite, label]);
    container.setDepth(10);

    this.addInteractable({
      id: 'professor_node',
      type: 'npc',
      radius: 100,
      position: () => new Phaser.Math.Vector2(container.x, container.y),
      getPrompt: () => 'Speak with Professor Node',
      onInteract: () => this.handleNPCInteraction('professor_node'),
    });
  }

  private createPlayer(): void {
    const spawn = this.progress.lastSpawn ?? PROLOGUE_LAYOUT.spawnPoint;
    this.player = new Player(this, spawn.x, spawn.y);
    this.player.setDepth(15);
    this.player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, PROLOGUE_LAYOUT.mapWidth * this.tileSize, PROLOGUE_LAYOUT.mapHeight * this.tileSize);
  }

  private createUI(): void {
    const { width, height } = this.cameras.main;
    this.add.text(width / 2, 24, 'PROLOGUE — CHAMBER OF FLOW', {
      fontSize: '14px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
      stroke: '#000',
      strokeThickness: 4,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    this.interactPrompt = this.add.container(width / 2, height - 80);
    this.interactPrompt.setScrollFactor(0).setDepth(200).setVisible(false);
    const promptBg = this.add.graphics();
    promptBg.fillStyle(0x000000, 0.85);
    promptBg.fillRoundedRect(-100, -18, 200, 36, 8);
    promptBg.lineStyle(2, 0xfbbf24, 1);
    promptBg.strokeRoundedRect(-100, -18, 200, 36, 8);
    this.interactText = this.add.text(0, 0, '[SPACE]', {
      fontSize: '11px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    this.interactPrompt.add([promptBg, this.interactText]);

    this.add.text(width / 2, height - 30, 'WASD / Arrows to move • SPACE to interact • ESC for Menu', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#6b7280',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
  }

  private setupInput(): void {
    if (!this.input.keyboard) return;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D') as { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };

    this.input.keyboard.on('keydown-SPACE', () => this.handleInteraction());
    this.input.keyboard.on('keydown-ESC', () => {
      if (!this.dialogueSystem.isDialogueActive()) {
        this.scene.start('MenuScene');
      }
    });
  }

  private refreshWorldState(): void {
    this.progress = prologueProgress.getState();
    this.updatePuzzleNodes();
    this.updateGateStates();
    this.updateRuneState();
    this.updateConsoleState();
  }

  private updatePuzzleNodes(): void {
    this.puzzleNodes.forEach((node, id) => {
      const isComplete = prologueProgress.hasCompleted(id);
      const isLocked = node.spec.lockedBy?.some((dep) => !prologueProgress.hasCompleted(dep)) ?? false;
      const newState: PuzzleNodeState['state'] = isComplete ? 'complete' : isLocked ? 'locked' : 'available';
      node.state = newState;

      this.tweens.killTweensOf(node.aura);
      if (newState === 'locked') {
        node.aura.setFillStyle(0x1f2937, 0.3);
        node.keeper.setAlpha(0.7);
      } else if (newState === 'available') {
        node.aura.setFillStyle(0x06b6d4, 0.25);
        node.keeper.setAlpha(1);
        this.tweens.add({
          targets: node.aura,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 1500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });
      } else {
        node.aura.setFillStyle(0x22c55e, 0.35);
        node.keeper.setAlpha(1);
        this.tweens.add({
          targets: node.aura,
          alpha: { from: 0.2, to: 0.5 },
          duration: 800,
          yoyo: true,
          repeat: -1,
        });
      }
    });
  }

  private updateGateStates(): void {
    if (this.bossGate) {
      const texture = this.progress.bossGateUnlocked ? PROLOGUE_TEXTURE_KEYS.bossGateOpen : PROLOGUE_TEXTURE_KEYS.bossGateLocked;
      this.bossGate.setTexture(texture);
    }

    if (this.arrayPortal) {
      this.arrayPortal.setAlpha(this.progress.sentinelDefeated ? 1 : 0.5);
    }
  }

  private updateRuneState(): void {
    const mastered = this.progress.completedPuzzles.includes('P0-1');
    this.runeTiles.forEach((tile) => {
      if (mastered) {
        tile.setTint(0x22c55e);
      } else {
        tile.clearTint();
      }
    });
  }

  private updateConsoleState(): void {
    const restored = this.progress.completedPuzzles.includes('P0-2');
    Object.values(this.consoleNodes).forEach((node) => {
      if (!node) return;
      node.setAlpha(restored ? 1 : 0.8);
    });
  }

  private enforcePlatformBounds(): void {
    if (!this.player) return;
    const tileX = Math.floor(this.player.x / this.tileSize);
    const tileY = Math.floor(this.player.y / this.tileSize);
    const onPlatform = PROLOGUE_LAYOUT.platforms.some(
      (area) => tileX >= area.tileX && tileX < area.tileX + area.width && tileY >= area.tileY && tileY < area.tileY + area.height,
    );
    if (!onPlatform) {
      this.respawnPlayer();
    }
  }

  private respawnPlayer(): void {
    if (!this.player) return;
    const fallback = PROLOGUE_LAYOUT.spawnPoint;
    this.player.setPosition(fallback.x, fallback.y);
    this.cameras.main.shake(200, 0.01);
    this.cameras.main.flash(200, 50, 0, 100);
    this.showWorldMessage('The void rejects you back to the hub.');
  }

  private evaluateInteractables(): void {
    if (!this.player || !this.interactPrompt || !this.interactText) return;

    let closest: InteractableTarget | null = null;
    let distance = Number.MAX_VALUE;
    for (const target of this.interactables) {
      const pos = target.position();
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, pos.x, pos.y);
      if (dist < target.radius && dist < distance) {
        distance = dist;
        closest = target;
      }
    }

    this.activeTarget = closest;
    if (closest) {
      this.interactText.setText(closest.getPrompt());
      this.interactPrompt.setVisible(true);
    } else {
      this.interactPrompt.setVisible(false);
    }
  }

  private handleInteraction(): void {
    if (this.dialogueSystem.isDialogueActive()) return;
    if (!this.activeTarget) return;
    this.activeTarget.onInteract();
  }

  private handleNPCInteraction(id: string): void {
    if (id === 'professor_node') {
      const dialogue = NPCDialogues.PROFESSOR_NODE;
      if (dialogue?.greeting) {
        this.dialogueSystem.startDialogue(dialogue.greeting);
      }
    }
  }

  private getPuzzlePrompt(id: string): string {
    const node = this.puzzleNodes.get(id);
    if (!node) return '[SPACE]';
    if (node.state === 'locked') return 'Lesson Locked';
    if (node.state === 'complete') return 'Puzzle Mastered';
    return 'Begin Lesson';
  }

  private handlePuzzleInteraction(id: string): void {
    const node = this.puzzleNodes.get(id);
    if (!node) return;
    const dialogue = NPCDialogues[node.spec.keeper];
    let script: DialogueLine[] = [];
    if (node.state === 'locked' && dialogue?.hint) {
      script = dialogue.hint;
    } else if (node.state === 'complete' && dialogue?.onComplete) {
      script = dialogue.onComplete;
    } else if (dialogue?.greeting) {
      script = dialogue.puzzleIntro ? [...dialogue.greeting, ...dialogue.puzzleIntro] : dialogue.greeting;
    } else {
      script = [{ speaker: 'Guide', text: 'This keeper has nothing to share yet.' }];
    }

    this.dialogueSystem.startDialogue(script, () => {
      if (node.state === 'available') {
        this.startPuzzle(node.spec);
      }
    });
  }

  private startPuzzle(spec: PuzzleNodeSpec): void {
    if (!this.player) return;
    prologueProgress.setLastSpawn({ x: this.player.x, y: this.player.y });
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(spec.puzzleScene, { returnScene: 'GameScene' });
    });
  }

  private handlePortalInteraction(id: PortalSpec['id']): void {
    if (id === 'origin') {
      this.dialogueSystem.startDialogue(ORIGIN_PORTAL_LINES);
      return;
    }

    if (id === 'boss_gate') {
      if (!this.progress.bossGateUnlocked) {
        this.dialogueSystem.startDialogue(BOSS_GATE_LOCKED_LINES);
      } else if (!this.progress.sentinelDefeated) {
        this.dialogueSystem.startDialogue(BOSS_PLACEHOLDER_LINES);
      } else {
        this.dialogueSystem.startDialogue([{ speaker: 'Sentinel Gate', text: 'The boss encounter will live here.' }]);
      }
      return;
    }

    if (!this.progress.sentinelDefeated) {
      this.dialogueSystem.startDialogue(ARRAY_GATE_LOCKED_LINES);
      return;
    }

    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('Room2Scene');
    });
  }

  private addInteractable(target: InteractableTarget): void {
    this.interactables.push(target);
  }

  private showWorldMessage(text: string): void {
    const { width, height } = this.cameras.main;
    const message = this.add.text(width / 2, height / 2 + 100, text, {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
      align: 'center',
      wordWrap: { width: width - 120 },
      stroke: '#000',
      strokeThickness: 4,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(500);

    this.tweens.add({
      targets: message,
      alpha: 0,
      duration: 1500,
      delay: 800,
      onComplete: () => message.destroy(),
    });
  }

  private showRegionIntro(): void {
    const { width, height } = this.cameras.main;
    const titleContainer = this.add.container(width / 2, height / 2);
    titleContainer.setScrollFactor(0).setDepth(400).setAlpha(0);
    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.75);
    bg.fillRoundedRect(-220, -70, 440, 140, 12);
    const subtitle = this.add.text(0, -10, 'PROLOGUE', {
      fontSize: '14px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#8b5cf6',
    }).setOrigin(0.5);
    const title = this.add.text(0, 30, 'CHAMBER OF FLOW', {
      fontSize: '22px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
    }).setOrigin(0.5);
    titleContainer.add([bg, subtitle, title]);

    this.cameras.main.fadeIn(600);
    this.tweens.add({
      targets: titleContainer,
      alpha: 1,
      duration: 400,
      onComplete: () => {
        this.time.delayedCall(1800, () => {
          this.tweens.add({
            targets: titleContainer,
            alpha: 0,
            duration: 400,
            onComplete: () => titleContainer.destroy(),
          });
        });
      },
    });
  }

  private runOpeningCutscene(): void {
    if (prologueProgress.getFlag('met_professor')) return;
    this.time.delayedCall(800, () => {
      this.dialogueSystem.startDialogue(PROFESSOR_INTRO, () => {
        prologueProgress.setFlag('met_professor', true);
      });
    });
  }
}
