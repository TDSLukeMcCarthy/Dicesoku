'use client';

import React, { useState, useEffect } from 'react';
import { GameState, DiceValue } from '@/types/game';
import { generateLevel } from '@/utils/levelGenerator';
import { createGameState, placeDice, undoLastMove, selectDice, getRunningTotals, validateGame, autoSolvePuzzle } from '@/utils/gameLogic';
import GameGrid from './GameGrid';
import DicePool from './DicePool';

interface GameProps {
  levelNumber: number;
  gridSize: number;
  onGameComplete: (won: boolean) => void;
}

const Game: React.FC<GameProps> = ({ levelNumber, gridSize, onGameComplete }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Initialize game when level number or grid size changes
  useEffect(() => {
    const level = generateLevel(gridSize);
    const initialState = createGameState(level, levelNumber, gridSize);
    setGameState(initialState);
  }, [levelNumber, gridSize]);

  // Monitor game completion
  useEffect(() => {
    if (gameState && gameState.gameStatus !== 'playing') {
      // Delay callback to allow UI to update
      const timer = setTimeout(() => {
        onGameComplete(gameState.gameStatus === 'won');
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    // Check if all dice are used but game not won (lose condition)
    if (gameState && gameState.gameStatus === 'playing') {
      const allDiceUsed = Object.values(gameState.dicePool).every(count => count === 0);
      if (allDiceUsed) {
        const validation = validateGame(gameState.grid, gameState.level);
        if (!validation.isComplete || !validation.isValid) {
          // All dice used but targets not met exactly - this is a loss
          setGameState(prev => prev ? { ...prev, gameStatus: 'lost' } : null);
        }
      }
    }
  }, [gameState, onGameComplete]);

  if (!gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Generating level...</div>
      </div>
    );
  }

  const handleCellClick = (row: number, col: number) => {
    if (!gameState.selectedDice) {
      return;
    }

    const newState = placeDice(gameState, row, col, gameState.selectedDice);
    setGameState(newState);
  };

  const handleDiceSelect = (dice: DiceValue) => {
    const newState = selectDice(gameState, dice);
    setGameState(newState);
  };

  const handleUndo = () => {
    const newState = undoLastMove(gameState);
    setGameState(newState);
  };

  const handleDrop = (row: number, col: number, dice: DiceValue) => {
    const newState = placeDice(gameState, row, col, dice);
    setGameState(newState);
  };

  const handleDragStart = (dice: DiceValue) => {
    // Also select the dice for visual consistency
    const newState = selectDice(gameState, dice);
    setGameState(newState);
  };

  const handleAutoSolve = () => {
    if (!gameState) return;
    
    const solvedState = autoSolvePuzzle(gameState);
    if (solvedState) {
      setGameState(solvedState);
    } else {
      // Show a message that no solution was found (shouldn't happen with our generator)
      alert('No solution found! This puzzle may not be solvable.');
    }
  };

  const runningTotals = getRunningTotals(gameState);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Dice Sum Puzzle</h1>
          <p className="text-lg text-gray-600">Level {levelNumber}</p>
          
          {/* Game Status */}
          {gameState.gameStatus === 'won' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-lg font-semibold">
              🎉 Level Complete! Well done!
            </div>
          )}
          
          {gameState.gameStatus === 'lost' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-lg font-semibold">
              😞 Game Over! All dice used but targets not matched exactly.
            </div>
          )}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center items-center space-x-6">
          <button
            onClick={handleUndo}
            disabled={gameState.undosRemaining <= 0 || gameState.moveHistory.length === 0}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Undo ({gameState.undosRemaining} left)
          </button>
          
          <button
            onClick={handleAutoSolve}
            disabled={gameState.gameStatus !== 'playing'}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Auto Solve
          </button>
          
          <div className="text-lg font-semibold text-gray-700">
            Moves: {gameState.moveHistory.length}
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex justify-center">
          <GameGrid
            gameState={gameState}
            runningTotals={runningTotals}
            onCellClick={handleCellClick}
            onDrop={handleDrop}
          />
        </div>

        {/* Dice Pool */}
        <div className="flex justify-center">
          <DicePool
            dicePool={gameState.dicePool}
            selectedDice={gameState.selectedDice}
            onDiceSelect={handleDiceSelect}
            onDragStart={handleDragStart}
          />
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center space-y-2">
          <h3 className="font-semibold text-blue-800">How to Play:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>1. Select a dice from the pool or drag it to the grid</p>
            <p>2. Click on an empty cell or drop the dice to place it</p>
            <p>3. You can go over target sums (they&apos;ll show in red)</p>
            <p>4. Win by matching all targets exactly with all dice used</p>
            <p>5. Use undo wisely - you only get 5 per level!</p>
            <p>6. Stuck? Use the Auto Solve button for help!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
