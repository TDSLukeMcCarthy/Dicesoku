import { GameState, DiceValue, ValidationResult, RunningTotals, Level } from '@/types/game';
import { calculateRunningTotals, isValidPlacement } from './levelGenerator';

/**
 * Creates initial game state from a level
 */
export function createGameState(level: Level, currentLevel: number, gridSize: number): GameState {
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
    replacementsRemaining: 10,
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
 * Moves a dice from one cell to another (costs a replacement token if moving from grid to grid)
 */
export function moveDice(
  gameState: GameState,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }

  // Check if source cell has a dice
  const diceValue = gameState.grid[fromRow][fromCol];
  if (!diceValue) {
    return gameState;
  }

  // Check if destination is valid
  if (!isValidPlacement(
    gameState.grid,
    gameState.level.blocked,
    gameState.level.targets,
    toRow,
    toCol,
    diceValue
  )) {
    return gameState;
  }

  // Check if we have replacement tokens (only needed for grid-to-grid moves)
  if (gameState.replacementsRemaining <= 0) {
    // No more replacements - this causes a loss
    return {
      ...gameState,
      gameStatus: 'lost'
    };
  }

  // Create new grid with dice moved
  const newGrid = gameState.grid.map((row, i) =>
    row.map((cell, j) => {
      if (i === fromRow && j === fromCol) return null; // Remove from source
      if (i === toRow && j === toCol) return diceValue; // Place at destination
      return cell;
    })
  );

  // Use a replacement token
  const newReplacementsRemaining = gameState.replacementsRemaining - 1;

  // Check win condition
  const validation = validateGame(newGrid, gameState.level);
  const allDiceUsed = Object.values(gameState.dicePool).every(count => count === 0);
  const newGameStatus = validation.isComplete && validation.isValid && allDiceUsed ? 'won' : 'playing';

  return {
    ...gameState,
    grid: newGrid,
    replacementsRemaining: newReplacementsRemaining,
    gameStatus: newGameStatus,
    selectedDice: null
  };
}

/**
 * Validates the current game state
 */
export function validateGame(
  grid: (DiceValue | null)[][],
  level: Level
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
 * Selects a dice from the grid for moving
 */
export function selectDiceFromGrid(gameState: GameState, row: number, col: number): GameState {
  const diceValue = gameState.grid[row][col];
  if (!diceValue || gameState.level.blocked[row][col]) {
    return gameState;
  }
  
  return {
    ...gameState,
    selectedDice: diceValue
  };
}

/**
 * Gets running totals for display
 */
export function getRunningTotals(gameState: GameState): RunningTotals {
  return calculateRunningTotals(gameState.grid);
}

/**
 * Auto solves the puzzle using optimized backtracking algorithm
 */
export function autoSolvePuzzle(gameState: GameState): GameState | null {
  // For large grids, use a timeout to prevent crashes
  const startTime = Date.now();
  const maxTime = 10000; // 10 seconds max
  
  // Create a copy of the game state to work with
  const workingState = JSON.parse(JSON.stringify(gameState)) as GameState;
  
  // First, check if the current state is already impossible
  if (!isPuzzleViable(workingState)) {
    return null;
  }
  
  // Get all empty cells, sorted by constraint (most constrained first)
  const emptyCells: Array<{row: number, col: number, possibleValues: DiceValue[]}> = [];
  for (let row = 0; row < workingState.level.size; row++) {
    for (let col = 0; col < workingState.level.size; col++) {
      if (!workingState.level.blocked[row][col] && workingState.grid[row][col] === null) {
        const possibleValues = getPossibleValues(workingState, row, col);
        emptyCells.push({row, col, possibleValues});
      }
    }
  }
  
  // Sort by number of possible values (most constrained first)
  emptyCells.sort((a, b) => a.possibleValues.length - b.possibleValues.length);
  
  // Convert dice pool to more efficient structure
  const diceCounter: Record<DiceValue, number> = {...workingState.dicePool};
  
  // Optimized backtracking solver with better pruning
  function solve(cellIndex: number): boolean {
    // Check timeout
    if (Date.now() - startTime > maxTime) {
      return false;
    }
    
    if (cellIndex >= emptyCells.length) {
      // All cells filled, check if solution is valid
      const validation = validateGame(workingState.grid, workingState.level);
      return validation.isValid && validation.isComplete;
    }
    
    const {row, col, possibleValues} = emptyCells[cellIndex];
    
    // Recalculate possible values based on current state
    const currentPossibleValues = possibleValues.filter(dice => {
      if (diceCounter[dice] <= 0) return false;
      
      // Check if placing this dice would violate constraints
      const currentRowSum = calculateRowSum(workingState.grid, row);
      const currentColSum = calculateColSum(workingState.grid, col);
      const rowTarget = workingState.level.targets.rows[row];
      const colTarget = workingState.level.targets.cols[col];
      
      return (currentRowSum + dice <= rowTarget) && (currentColSum + dice <= colTarget);
    });
    
    // If no possible values, this branch is dead
    if (currentPossibleValues.length === 0) {
      return false;
    }
    
    // Try dice values in order of scarcity (least available first)
    currentPossibleValues.sort((a, b) => diceCounter[a] - diceCounter[b]);
    
    for (const dice of currentPossibleValues) {
      // Place dice temporarily
      workingState.grid[row][col] = dice;
      diceCounter[dice]--;
      
      // Check if this placement maintains puzzle viability
      if (isPartialStateViable(workingState, diceCounter, emptyCells, cellIndex + 1)) {
        // Recursively solve the rest
        if (solve(cellIndex + 1)) {
          return true;
        }
      }
      
      // Backtrack
      workingState.grid[row][col] = null;
      diceCounter[dice]++;
    }
    
    return false;
  }
  
  // Attempt to solve
  if (solve(0)) {
    // Update the original game state with the solution
    const solvedState: GameState = {
      ...gameState,
      grid: workingState.grid,
      dicePool: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}, // All dice used
      gameStatus: 'won',
      selectedDice: null,
      moveHistory: [] // Clear history since we auto-solved
    };
    
    return solvedState;
  }
  
  return null; // No solution found or timed out
}

// Helper function to check if the puzzle is viable from the start
function isPuzzleViable(gameState: GameState): boolean {
  // Basic check: do we have the right number of dice for empty cells?
  let emptyCells = 0;
  for (let row = 0; row < gameState.level.size; row++) {
    for (let col = 0; col < gameState.level.size; col++) {
      if (!gameState.level.blocked[row][col] && gameState.grid[row][col] === null) {
        emptyCells++;
      }
    }
  }
  
  const totalDice = Object.values(gameState.dicePool).reduce((sum, count) => sum + count, 0);
  return totalDice === emptyCells;
}

// Helper function to get possible dice values for a cell
function getPossibleValues(gameState: GameState, row: number, col: number): DiceValue[] {
  const possibleValues: DiceValue[] = [];
  const currentRowSum = calculateRowSum(gameState.grid, row);
  const currentColSum = calculateColSum(gameState.grid, col);
  const rowTarget = gameState.level.targets.rows[row];
  const colTarget = gameState.level.targets.cols[col];
  
  for (let dice = 1; dice <= 6; dice++) {
    const diceValue = dice as DiceValue;
    if (gameState.dicePool[diceValue] > 0 && 
        currentRowSum + dice <= rowTarget && 
        currentColSum + dice <= colTarget) {
      possibleValues.push(diceValue);
    }
  }
  
  return possibleValues;
}

// Enhanced viability check for partial states
function isPartialStateViable(
  workingState: GameState,
  diceCounter: Record<DiceValue, number>,
  emptyCells: Array<{row: number, col: number, possibleValues: DiceValue[]}>,
  nextCellIndex: number
): boolean {
  // Quick check: do we have enough dice left?
  const remainingCells = emptyCells.length - nextCellIndex;
  const remainingDice = Object.values(diceCounter).reduce((sum, count) => sum + count, 0);
  
  if (remainingDice !== remainingCells) {
    return false;
  }
  
  // Check if any remaining cell has no possible values
  for (let i = nextCellIndex; i < emptyCells.length; i++) {
    const {row, col} = emptyCells[i];
    const currentRowSum = calculateRowSum(workingState.grid, row);
    const currentColSum = calculateColSum(workingState.grid, col);
    const rowTarget = workingState.level.targets.rows[row];
    const colTarget = workingState.level.targets.cols[col];
    
    let hasPossibleValue = false;
    for (let dice = 1; dice <= 6; dice++) {
      const diceValue = dice as DiceValue;
      if (diceCounter[diceValue] > 0 && 
          currentRowSum + dice <= rowTarget && 
          currentColSum + dice <= colTarget) {
        hasPossibleValue = true;
        break;
      }
    }
    
    if (!hasPossibleValue) {
      return false;
    }
  }
  
  // For larger grids, do a more thorough check
  if (workingState.level.size <= 6) {
    // Check if targets are still achievable
    for (let row = 0; row < workingState.level.size; row++) {
      const currentSum = calculateRowSum(workingState.grid, row);
      const target = workingState.level.targets.rows[row];
      const emptyCellsInRow = emptyCells.slice(nextCellIndex).filter(cell => cell.row === row).length;
      
      if (currentSum > target) {
        return false;
      }
      
      // Check if we can reach exactly the target
      const minPossible = currentSum + emptyCellsInRow; // minimum with all 1s
      const maxPossible = currentSum + (emptyCellsInRow * 6); // maximum with all 6s
      
      if (target < minPossible || target > maxPossible) {
        return false;
      }
    }
    
    for (let col = 0; col < workingState.level.size; col++) {
      const currentSum = calculateColSum(workingState.grid, col);
      const target = workingState.level.targets.cols[col];
      const emptyCellsInCol = emptyCells.slice(nextCellIndex).filter(cell => cell.col === col).length;
      
      if (currentSum > target) {
        return false;
      }
      
      // Check if we can reach exactly the target
      const minPossible = currentSum + emptyCellsInCol; // minimum with all 1s
      const maxPossible = currentSum + (emptyCellsInCol * 6); // maximum with all 6s
      
      if (target < minPossible || target > maxPossible) {
        return false;
      }
    }
  }
  
  return true;
}

function calculateRowSum(grid: (DiceValue | null)[][], row: number): number {
  return grid[row].reduce((sum, cell) => sum + (cell || 0), 0);
}

function calculateColSum(grid: (DiceValue | null)[][], col: number): number {
  return grid.reduce((sum, row) => sum + (row[col] || 0), 0);
}
