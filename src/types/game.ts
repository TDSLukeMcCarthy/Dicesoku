export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface Level {
  size: number;
  blocked: boolean[][];
  targets: {
    rows: number[];
    cols: number[];
  };
  dicePool: Record<DiceValue, number>;
}

export interface GameState {
  level: Level;
  currentLevel: number;
  gridSize: number;
  grid: (DiceValue | null)[][];
  dicePool: Record<DiceValue, number>;
  selectedDice: DiceValue | null;
  replacementsRemaining: number;
  gameStatus: 'playing' | 'won' | 'lost';
  moveHistory: Array<{
    row: number;
    col: number;
    dice: DiceValue;
  }>;
}

export interface CellState {
  value: DiceValue | null;
  isBlocked: boolean;
  row: number;
  col: number;
}

export interface RunningTotals {
  rows: number[];
  cols: number[];
}

export interface ValidationResult {
  isValid: boolean;
  exceededRows: number[];
  exceededCols: number[];
  isComplete: boolean;
}
