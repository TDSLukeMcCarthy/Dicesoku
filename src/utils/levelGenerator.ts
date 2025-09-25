import { Level, DiceValue } from '@/types/game';

/**
 * Generates a solvable level using the solution-first approach
 */
export function generateLevel(size: number = 5): Level {
  const maxAttempts = 50; // Try multiple times to get a good level
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Step 1: Create blocked cells pattern
    const blocked = generateBlockedCells(size);
    
    // Step 2: Generate a valid solution by filling the grid intelligently
    const solution = generateSolution(size, blocked);
    
    // Step 3: Calculate target sums from the solution
    const targets = calculateTargets(solution, blocked);
    
    // Step 4: Count dice needed for the solution
    const dicePool = countDicePool(solution, blocked);
    
    // Step 5: Validate that the level is actually solvable
    const level = {
      size,
      blocked,
      targets,
      dicePool
    };
    
    // Quick validation: check if targets are reasonable
    if (isLevelReasonable(level)) {
      return level;
    }
  }
  
  // Fallback: generate a simpler level if all attempts failed
  return generateSimpleLevel(size);
}

function generateBlockedCells(size: number): boolean[][] {
  const blocked: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
  const totalCells = size * size;
  
  // Reduce blocked cell percentage for better solvability
  const blockedCount = Math.floor(totalCells * (0.15 + Math.random() * 0.15)); // 15-30%
  
  // Randomly place blocked cells, but avoid creating impossible patterns
  let placed = 0;
  let attempts = 0;
  const maxAttempts = blockedCount * 5;
  
  while (placed < blockedCount && attempts < maxAttempts) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    
    if (!blocked[row][col]) {
      // Temporarily block this cell and check if it makes the puzzle impossible
      blocked[row][col] = true;
      
      // Basic check: ensure we still have reasonable distribution
      const rowBlocked = blocked[row].filter(b => b).length;
      const colBlocked = blocked.map(r => r[col]).filter(b => b).length;
      
      // Don't block too many cells in one row/column
      if (rowBlocked <= Math.floor(size * 0.7) && colBlocked <= Math.floor(size * 0.7)) {
        placed++;
      } else {
        blocked[row][col] = false; // Undo blocking
      }
    }
    attempts++;
  }
  
  return blocked;
}

function generateSolution(size: number, blocked: boolean[][]): (DiceValue | null)[][] {
  const solution: (DiceValue | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  
  // Fill non-blocked cells with more balanced dice distribution
  // Use a weighted random approach to create more interesting puzzles
  const diceWeights = [1, 2, 3, 4, 5, 6]; // All dice values equally weighted initially
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!blocked[row][col]) {
        // Generate dice value with slight bias toward middle values for better puzzles
        const weights = [0.15, 0.2, 0.25, 0.25, 0.2, 0.15]; // Slight bias toward 3,4
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < weights.length; i++) {
          cumulative += weights[i];
          if (random <= cumulative) {
            solution[row][col] = (i + 1) as DiceValue;
            break;
          }
        }
        
        // Fallback if something went wrong
        if (solution[row][col] === null) {
          solution[row][col] = (Math.floor(Math.random() * 6) + 1) as DiceValue;
        }
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

// Validate that a level is reasonable and likely solvable
function isLevelReasonable(level: Level): boolean {
  // Check if any row or column has impossible target sums
  for (let row = 0; row < level.size; row++) {
    const emptyCellsInRow = level.blocked[row].filter(blocked => !blocked).length;
    const target = level.targets.rows[row];
    
    // Check if target is achievable (between min and max possible sums)
    const minPossible = emptyCellsInRow; // all 1s
    const maxPossible = emptyCellsInRow * 6; // all 6s
    
    if (target < minPossible || target > maxPossible) {
      return false;
    }
    
    // Check if we have reasonable density (not too easy, not too hard)
    const avgDiceValue = emptyCellsInRow > 0 ? target / emptyCellsInRow : 0;
    if (avgDiceValue < 1.5 || avgDiceValue > 5.5) {
      return false;
    }
  }
  
  for (let col = 0; col < level.size; col++) {
    const emptyCellsInCol = level.blocked.map(row => row[col]).filter(blocked => !blocked).length;
    const target = level.targets.cols[col];
    
    // Check if target is achievable
    const minPossible = emptyCellsInCol; // all 1s
    const maxPossible = emptyCellsInCol * 6; // all 6s
    
    if (target < minPossible || target > maxPossible) {
      return false;
    }
    
    // Check if we have reasonable density
    const avgDiceValue = emptyCellsInCol > 0 ? target / emptyCellsInCol : 0;
    if (avgDiceValue < 1.5 || avgDiceValue > 5.5) {
      return false;
    }
  }
  
  // Check dice pool reasonableness
  const totalDice = Object.values(level.dicePool).reduce((sum, count) => sum + count, 0);
  const totalEmptyCells = level.blocked.flat().filter(blocked => !blocked).length;
  
  if (totalDice !== totalEmptyCells) {
    return false;
  }
  
  // Check for reasonable dice distribution (not too many of one type)
  const maxDiceOfOneType = Math.ceil(totalDice * 0.4); // No more than 40% of one type
  for (const count of Object.values(level.dicePool)) {
    if (count > maxDiceOfOneType) {
      return false;
    }
  }
  
  return true;
}

// Generate a simpler, guaranteed solvable level as fallback
function generateSimpleLevel(size: number): Level {
  const blocked: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
  
  // Create a minimal blocked pattern (just a few cells)
  const blockedCount = Math.min(3, Math.floor(size * size * 0.1));
  for (let i = 0; i < blockedCount; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (!blocked[row][col]) {
      blocked[row][col] = true;
    }
  }
  
  // Generate a simple, balanced solution
  const solution: (DiceValue | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  
  // Fill with a simple pattern that ensures solvability
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!blocked[row][col]) {
        // Use a simple pattern: alternating values based on position
        const value = ((row + col) % 6) + 1;
        solution[row][col] = value as DiceValue;
      }
    }
  }
  
  const targets = calculateTargets(solution, blocked);
  const dicePool = countDicePool(solution, blocked);
  
  return {
    size,
    blocked,
    targets,
    dicePool
  };
}
