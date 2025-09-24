import { GameState, DiceValue, ValidationResult, RunningTotals } from '@/types/game';
import { calculateRunningTotals, isValidPlacement } from './levelGenerator';

/**
 * Creates initial game state from a level
 */
export function createGameState(level: any, currentLevel: number, gridSize: number): GameState {
  const grid: (DiceValue | null)[][] = Array(level.size)
    .fill(null)
    .map(() => Array(level.size).fill(null));

  return {
    level,
    currentLevel,
    gridSize,
    grid,
    dicePool: { ...level.dicePool },
    selectedDice: null,
    undosRemaining: 5,
    gameStatus: 'playing',
    moveHistory: []
  };
}

/**
 * Places a dice on the grid if valid
 */
export function placeDice(
  gameState: GameState,
  row: number,
  col: number,
  dice: DiceValue
): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }

  // Check if placement is valid (cell is available)
  if (!isValidPlacement(
    gameState.grid,
    gameState.level.blocked,
    gameState.level.targets,
    row,
    col,
    dice
  )) {
    return gameState; // Invalid placement (blocked cell or already occupied)
  }

  // Check if we have the dice available
  if (gameState.dicePool[dice] <= 0) {
    return gameState;
  }

  // Create new grid with the dice placed
  const newGrid = gameState.grid.map((gridRow, i) =>
    gridRow.map((cell, j) => (i === row && j === col ? dice : cell))
  );

  // Update dice pool
  const newDicePool = {
    ...gameState.dicePool,
    [dice]: gameState.dicePool[dice] - 1
  };

  // Add to move history
  const newMoveHistory = [
    ...gameState.moveHistory,
    { row, col, dice }
  ];

  // Check win condition (only win if all sums match exactly and all dice used)
  const validation = validateGame(newGrid, gameState.level);
  const allDiceUsed = Object.values(newDicePool).every(count => count === 0);
  const newGameStatus = validation.isComplete && validation.isValid && allDiceUsed ? 'won' : 'playing';

  return {
    ...gameState,
    grid: newGrid,
    dicePool: newDicePool,
    moveHistory: newMoveHistory,
    gameStatus: newGameStatus,
    selectedDice: null
  };
}

/**
 * Undoes the last move
 */
export function undoLastMove(gameState: GameState): GameState {
  if (gameState.undosRemaining <= 0 || gameState.moveHistory.length === 0) {
    return gameState;
  }

  const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
  
  // Create new grid with the dice removed
  const newGrid = gameState.grid.map((row, i) =>
    row.map((cell, j) => 
      (i === lastMove.row && j === lastMove.col) ? null : cell
    )
  );

  // Return dice to pool
  const newDicePool = {
    ...gameState.dicePool,
    [lastMove.dice]: gameState.dicePool[lastMove.dice] + 1
  };

  // Remove from move history
  const newMoveHistory = gameState.moveHistory.slice(0, -1);

  return {
    ...gameState,
    grid: newGrid,
    dicePool: newDicePool,
    moveHistory: newMoveHistory,
    undosRemaining: gameState.undosRemaining - 1,
    gameStatus: 'playing' // Reset to playing state
  };
}

/**
 * Validates the current game state
 */
export function validateGame(
  grid: (DiceValue | null)[][],
  level: any
): ValidationResult {
  const runningTotals = calculateRunningTotals(grid);
  const exceededRows: number[] = [];
  const exceededCols: number[] = [];
  
  // Check for exceeded rows
  for (let i = 0; i < runningTotals.rows.length; i++) {
    if (runningTotals.rows[i] > level.targets.rows[i]) {
      exceededRows.push(i);
    }
  }
  
  // Check for exceeded columns
  for (let i = 0; i < runningTotals.cols.length; i++) {
    if (runningTotals.cols[i] > level.targets.cols[i]) {
      exceededCols.push(i);
    }
  }
  
  const isValid = exceededRows.length === 0 && exceededCols.length === 0;
  
  // Check if complete (all targets exactly met)
  const isComplete = runningTotals.rows.every((sum, i) => sum === level.targets.rows[i]) &&
                    runningTotals.cols.every((sum, i) => sum === level.targets.cols[i]);
  
  return {
    isValid,
    exceededRows,
    exceededCols,
    isComplete
  };
}

/**
 * Selects a dice from the pool
 */
export function selectDice(gameState: GameState, dice: DiceValue): GameState {
  if (gameState.dicePool[dice] <= 0) {
    return gameState;
  }
  
  return {
    ...gameState,
    selectedDice: gameState.selectedDice === dice ? null : dice
  };
}

/**
 * Gets running totals for display
 */
export function getRunningTotals(gameState: GameState): RunningTotals {
  return calculateRunningTotals(gameState.grid);
}
