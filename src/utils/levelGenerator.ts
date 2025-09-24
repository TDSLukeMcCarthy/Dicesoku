import { Level, DiceValue } from '@/types/game';

/**
 * Generates a solvable level using the solution-first approach
 */
export function generateLevel(size: number = 5): Level {
  // Step 1: Create blocked cells pattern (10-20% of grid)
  const blocked = generateBlockedCells(size);
  
  // Step 2: Generate a valid solution by filling the grid
  const solution = generateSolution(size, blocked);
  
  // Step 3: Calculate target sums from the solution
  const targets = calculateTargets(solution, blocked);
  
  // Step 4: Count dice needed for the solution
  const dicePool = countDicePool(solution, blocked);
  
  return {
    size,
    blocked,
    targets,
    dicePool
  };
}

function generateBlockedCells(size: number): boolean[][] {
  const blocked: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
  const totalCells = size * size;
  const blockedCount = Math.floor(totalCells * (0.3 + Math.random() * 0.2)); // 30-50%
  
  // Randomly place blocked cells
  let placed = 0;
  while (placed < blockedCount) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    
    if (!blocked[row][col]) {
      blocked[row][col] = true;
      placed++;
    }
  }
  
  return blocked;
}

function generateSolution(size: number, blocked: boolean[][]): (DiceValue | null)[][] {
  const solution: (DiceValue | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  
  // Fill non-blocked cells with random dice values
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!blocked[row][col]) {
        solution[row][col] = (Math.floor(Math.random() * 6) + 1) as DiceValue;
      }
    }
  }
  
  return solution;
}

function calculateTargets(solution: (DiceValue | null)[][], blocked: boolean[][]) {
  const size = solution.length;
  const rows: number[] = [];
  const cols: number[] = [];
  
  // Calculate row sums
  for (let row = 0; row < size; row++) {
    let sum = 0;
    for (let col = 0; col < size; col++) {
      if (!blocked[row][col] && solution[row][col] !== null) {
        sum += solution[row][col]!;
      }
    }
    rows.push(sum);
  }
  
  // Calculate column sums
  for (let col = 0; col < size; col++) {
    let sum = 0;
    for (let row = 0; row < size; row++) {
      if (!blocked[row][col] && solution[row][col] !== null) {
        sum += solution[row][col]!;
      }
    }
    cols.push(sum);
  }
  
  return { rows, cols };
}

function countDicePool(solution: (DiceValue | null)[][], blocked: boolean[][]): Record<DiceValue, number> {
  const pool: Record<DiceValue, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  };
  
  const size = solution.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!blocked[row][col] && solution[row][col] !== null) {
        pool[solution[row][col]!]++;
      }
    }
  }
  
  return pool;
}

/**
 * Validates if a placement is legal (cell is available)
 */
export function isValidPlacement(
  grid: (DiceValue | null)[][],
  blocked: boolean[][],
  targets: { rows: number[]; cols: number[] },
  row: number,
  col: number,
  _dice: DiceValue
): boolean {
  // Only check if the cell is available (not blocked and empty)
  return !blocked[row][col] && grid[row][col] === null;
}

function calculateRowSum(grid: (DiceValue | null)[][], row: number): number {
  return grid[row].reduce((sum, cell) => sum + (cell || 0), 0);
}

function calculateColSum(grid: (DiceValue | null)[][], col: number): number {
  return grid.reduce((sum, row) => sum + (row[col] || 0), 0);
}

/**
 * Calculates running totals for all rows and columns
 */
export function calculateRunningTotals(grid: (DiceValue | null)[][]): {
  rows: number[];
  cols: number[];
} {
  const size = grid.length;
  const rows: number[] = [];
  const cols: number[] = [];
  
  // Calculate row sums
  for (let row = 0; row < size; row++) {
    rows.push(calculateRowSum(grid, row));
  }
  
  // Calculate column sums
  for (let col = 0; col < size; col++) {
    cols.push(calculateColSum(grid, col));
  }
  
  return { rows, cols };
}
