/**
 * Algorithmia: The Path of Logic - Game Data Types
 *
 * Type definitions for regions, puzzles, NPCs, dialogue, and game content
 */

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

export const Difficulty = {
  VERY_EASY: 'very_easy',
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  VERY_HARD: 'very_hard',
} as const;
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const AlgorithmType = {
  PATTERN_MATCHING: 'pattern_matching',
  SEQUENTIAL_REASONING: 'sequential_reasoning',
  SPATIAL_MAPPING: 'spatial_mapping',
  SORTING: 'sorting',
  ARRAY_INDEXING: 'array_indexing',
  HASHING: 'hashing',
  TWO_SUM: 'two_sum',
  TWO_POINTERS: 'two_pointers',
  POINTER_CONVERGENCE: 'pointer_convergence',
  SLIDING_WINDOW: 'sliding_window',
  ADVANCED_POINTERS: 'advanced_pointers',
  HYBRID: 'hybrid',
} as const;
export type AlgorithmType = (typeof AlgorithmType)[keyof typeof AlgorithmType];

export const PuzzleType = {
  INTERACTIVE: 'interactive',
  BOSS: 'boss',
  MINI_FORGE: 'mini_forge',
} as const;
export type PuzzleType = (typeof PuzzleType)[keyof typeof PuzzleType];

export const NPCType = {
  MENTOR: 'mentor',
  GUIDE: 'guide',
  VILLAGER: 'villager',
  BOSS: 'boss',
} as const;
export type NPCType = (typeof NPCType)[keyof typeof NPCType];

// ============================================================================
// REGION TYPES
// ============================================================================

export interface RegionConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  theme: RegionTheme;
  unlockRequirements: UnlockRequirements;
  tilemapKey: string;
  backgroundMusic: string;
  ambientSound?: string;
  spawnPoint: Position;
  exitPoints: ExitPoint[];
  npcs: NPCReference[];
  puzzles: PuzzleReference[];
  interactables: Interactable[];
  logicForge?: LogicForgeConfig;
}

export interface RegionTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  atmosphere: string;
  visualStyle: string;
}

export interface UnlockRequirements {
  puzzlesCompleted?: number;
  regionsCompleted?: string[];
  codexEntries?: number;
  specificPuzzles?: string[];
}

export interface Position {
  x: number;
  y: number;
}

export interface ExitPoint {
  id: string;
  position: Position;
  leadsTo: string;
  requiresUnlock?: boolean;
  unlockCondition?: string;
}

// ============================================================================
// PUZZLE TYPES
// ============================================================================

export interface PuzzleReference {
  id: string;
  position: Position;
  enabled: boolean;
}

export interface PuzzleConfig {
  id: string;
  name: string;
  displayName: string;
  type: PuzzleType;
  difficulty: Difficulty;
  algorithmConcept: AlgorithmType;
  description: string;
  location: string;
  npcId?: string;
  mechanics: PuzzleMechanics;
  solution: PuzzleSolution;
  hints: string[];
  timeLimit?: number; // in seconds, optional
  rewards: PuzzleRewards;
  conceptBridge: ConceptBridge;
  codexEntry: CodexEntry;
}

export interface PuzzleMechanics {
  type: string;
  elements: PuzzleElement[];
  rules: string[];
  controls: ControlScheme;
  victoryCriteria: VictoryCriteria;
}

export interface PuzzleElement {
  id: string;
  type: string;
  initialState: any;
  properties: Record<string, any>;
}

export interface ControlScheme {
  input: string[];
  actions: string[];
  instructions: string;
}

export interface VictoryCriteria {
  type: string;
  conditions: string[];
  checkFunction?: string; // Reference to check function
}

export interface PuzzleSolution {
  steps: string[];
  acceptableVariations?: string[];
  optimalMoves?: number;
}

export interface PuzzleRewards {
  codexUnlock: boolean;
  conceptBridgeTriggered: boolean;
  progressionPoints: number;
  unlocks?: string[];
}

// ============================================================================
// CONCEPT BRIDGE TYPES
// ============================================================================

export interface ConceptBridge {
  id: string;
  puzzleId: string;
  sections: ConceptBridgeSection[];
  miniForge?: MiniForgeChallenge;
}

export interface ConceptBridgeSection {
  type: 'story_recap' | 'pattern_reveal' | 'pseudocode' | 'practice' | 'unlock';
  title: string;
  content: string | string[];
  code?: CodeBlock;
  interactive?: boolean;
}

export interface CodeBlock {
  language: string;
  code: string;
  explanation: string;
}

export interface MiniForgeChallenge {
  title: string;
  description: string;
  challenge: string;
  correctAnswer: any;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

// ============================================================================
// CODEX TYPES
// ============================================================================

export interface CodexEntry {
  id: string;
  algorithmName: string;
  category: AlgorithmType;
  unlockedBy: string; // puzzle id
  sections: CodexSection[];
  relatedConcepts: string[];
  difficulty: Difficulty;
}

export interface CodexSection {
  type: 'what_you_felt' | 'plain_explanation' | 'pattern_steps' | 'real_world' | 'unlocked_ability';
  title: string;
  content: string | string[];
}

// ============================================================================
// NPC & DIALOGUE TYPES
// ============================================================================

export interface NPCReference {
  id: string;
  position: Position;
  enabled: boolean;
}

export interface NPCConfig {
  id: string;
  name: string;
  type: NPCType;
  spriteKey: string;
  defaultPosition: Position;
  dialogue: DialogueTree;
  questRelated?: boolean;
}

export interface DialogueTree {
  nodes: DialogueNode[];
  startNodeId: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string | string[];
  emotion?: string;
  choices?: DialogueChoice[];
  nextNodeId?: string;
  conditions?: DialogueCondition[];
  actions?: DialogueAction[];
}

export interface DialogueChoice {
  text: string;
  nextNodeId: string;
  condition?: DialogueCondition;
}

export interface DialogueCondition {
  type: 'puzzle_completed' | 'item_has' | 'flag_set' | 'codex_unlocked';
  value: any;
}

export interface DialogueAction {
  type: 'set_flag' | 'give_item' | 'unlock_puzzle' | 'trigger_cutscene';
  value: any;
}

// ============================================================================
// INTERACTABLE TYPES
// ============================================================================

export interface Interactable {
  id: string;
  type: 'door' | 'chest' | 'sign' | 'lever' | 'button' | 'portal';
  position: Position;
  spriteKey: string;
  interaction: InteractionConfig;
}

export interface InteractionConfig {
  prompt: string;
  action: string;
  requirement?: string;
  outcome: InteractionOutcome;
}

export interface InteractionOutcome {
  type: 'dialogue' | 'item' | 'unlock' | 'teleport' | 'trigger_event';
  value: any;
}

// ============================================================================
// LOGIC FORGE TYPES
// ============================================================================

export interface LogicForgeConfig {
  position: Position;
  challenges: ForgeChallengeReference[];
}

export interface ForgeChallengeReference {
  id: string;
  unlocked: boolean;
}

export interface ForgeChallenge {
  id: string;
  name: string;
  description: string;
  type: 'sort_steps' | 'hash_buckets' | 'trace_execution' | 'debug_code';
  difficulty: Difficulty;
  content: any;
  solution: any;
  hints: string[];
  rewards: {
    progressionPoints: number;
    unlocks?: string[];
  };
}

// ============================================================================
// BOSS TYPES
// ============================================================================

export interface BossConfig extends PuzzleConfig {
  phases: BossPhase[];
  healthBarVisible: boolean;
  defeatDialogue: string[];
  victoryRewards: VictoryRewards;
}

export interface BossPhase {
  phaseNumber: number;
  name: string;
  mechanics: PuzzleMechanics;
  healthThreshold?: number;
  timeLimit?: number;
  difficulty: Difficulty;
}

export interface VictoryRewards {
  codexEntries: string[];
  unlockedRegions: string[];
  progressionPoints: number;
  specialItems?: string[];
}
