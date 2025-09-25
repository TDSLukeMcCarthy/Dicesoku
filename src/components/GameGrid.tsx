import React from 'react';
import { GameState, DiceValue, RunningTotals } from '@/types/game';
import DicePips from './DicePips';

interface GameGridProps {
  gameState: GameState;
  runningTotals: RunningTotals;
  onCellClick: (row: number, col: number) => void;
  onDrop?: (row: number, col: number, dice: DiceValue, fromGrid?: {row: number, col: number}) => void;
  onDragStart?: (row: number, col: number, dice: DiceValue) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ gameState, runningTotals, onCellClick, onDrop, onDragStart }) => {
  const { level, grid } = gameState;
  const [dragHoverCell, setDragHoverCell] = React.useState<{row: number, col: number} | null>(null);
  const [dragFromGrid, setDragFromGrid] = React.useState<{row: number, col: number} | null>(null);
  
  const getCellClasses = (row: number, col: number) => {
    // Dynamic sizing based on grid size
    const sizeClass = gameState.gridSize <= 5 ? 'w-16 h-16 text-xl' : 
                     gameState.gridSize <= 7 ? 'w-12 h-12 text-lg' : 
                     'w-10 h-10 text-base';
    const baseClasses = `${sizeClass} border border-gray-400 rounded-md flex items-center justify-center font-bold cursor-pointer transition-colors`;
    
    if (level.blocked[row][col]) {
      return `${baseClasses} bg-gray-800 text-white cursor-not-allowed shadow-inner`;
    }
    
    if (grid[row][col] !== null) {
      return `${baseClasses} bg-gray-100 text-blue-800 hover:bg-gray-200 shadow-inner`;
    }
    
    // Check if this cell is being hovered during drag
    const isDragHover = dragHoverCell?.row === row && dragHoverCell?.col === col;
    
    if (isDragHover && !level.blocked[row][col] && grid[row][col] === null) {
      return `${baseClasses} bg-green-200 border-green-400 shadow-inner`;
    }
    
    if (gameState.selectedDice) {
      return `${baseClasses} bg-green-50 hover:bg-green-100 border-green-300 shadow-inner`;
    }
    
    return `${baseClasses} bg-gray-50 hover:bg-gray-100 shadow-inner`;
  };
  
  const getTargetClasses = (current: number, target: number) => {
    if (current > target) {
      return 'text-red-600 font-bold';
    }
    if (current === target) {
      return 'text-green-600 font-bold';
    }
    return 'text-gray-700';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    setDragHoverCell({ row, col });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear hover if we're leaving the cell completely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragHoverCell(null);
    }
  };

  const handleDrop = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    setDragHoverCell(null);
    
    const diceValue = parseInt(e.dataTransfer.getData('text/plain')) as DiceValue;
    const fromGridData = e.dataTransfer.getData('fromGrid');
    
    if (diceValue && onDrop) {
      const fromGrid = fromGridData ? JSON.parse(fromGridData) : undefined;
      onDrop(row, col, diceValue, fromGrid);
    }
    
    setDragFromGrid(null);
  };

  const handleCellDragStart = (e: React.DragEvent, row: number, col: number) => {
    const diceValue = grid[row][col];
    if (!diceValue || level.blocked[row][col]) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData('text/plain', diceValue.toString());
    e.dataTransfer.setData('fromGrid', JSON.stringify({row, col}));
    e.dataTransfer.effectAllowed = 'move';
    
    setDragFromGrid({row, col});
    
    // Visual feedback during drag
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
    
    if (onDragStart) {
      onDragStart(row, col, diceValue);
    }
  };

  const handleCellDragEnd = (e: React.DragEvent) => {
    // Reset visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDragFromGrid(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Column targets */}
      <div className="flex space-x-1">
        <div className="w-20"></div> {/* Spacer for row labels */}
        {level.targets.cols.map((target, col) => {
          const sizeClass = gameState.gridSize <= 5 ? 'w-16' : 
                           gameState.gridSize <= 7 ? 'w-12' : 
                           'w-10';
          const current = runningTotals.cols[col];
          return (
            <div
              key={col}
              className={`${sizeClass} h-16 flex flex-col items-center justify-center text-sm font-semibold ${
                getTargetClasses(current, target)
              }`}
            >
              <div className="text-sm">{target}</div>
              <div className="text-xs opacity-70 mt-1">
                {current > 0 ? current : ''}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Grid with row targets */}
      <div className="flex flex-col space-y-1">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center space-x-2">
            {/* Row target */}
            <div
              className={`w-20 ${gameState.gridSize <= 5 ? 'h-16' : gameState.gridSize <= 7 ? 'h-12' : 'h-10'} flex flex-col items-center justify-center text-sm font-semibold ${
                getTargetClasses(runningTotals.rows[rowIndex], level.targets.rows[rowIndex])
              }`}
            >
              <div className="text-sm">{level.targets.rows[rowIndex]}</div>
              <div className="text-xs opacity-70 mt-1">
                {runningTotals.rows[rowIndex] > 0 ? runningTotals.rows[rowIndex] : ''}
              </div>
            </div>
            
            {/* Grid cells */}
            <div className="flex space-x-1">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellClasses(rowIndex, colIndex)}
                draggable={!level.blocked[rowIndex][colIndex] && cell !== null}
                onClick={() => onCellClick(rowIndex, colIndex)}
                onDragStart={(e) => handleCellDragStart(e, rowIndex, colIndex)}
                onDragEnd={handleCellDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, rowIndex, colIndex)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
              >
                {level.blocked[rowIndex][colIndex] ? (
                  <span className="text-3xl font-bold text-gray-600">✕</span>
                ) : cell ? (
                  <DicePips 
                    value={cell} 
                    size={gameState.gridSize <= 5 ? 'medium' : gameState.gridSize <= 7 ? 'small' : 'small'} 
                  />
                ) : (
                  ''
                )}
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
