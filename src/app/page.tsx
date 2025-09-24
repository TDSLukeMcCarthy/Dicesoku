'use client';

import React, { useState, useEffect } from 'react';
import Lobby from '@/components/Lobby';
import Game from '@/components/Game';

type GameScreen = 'lobby' | 'game';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('lobby');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gridSize, setGridSize] = useState(5);

  // Load progress and preferences from localStorage
  useEffect(() => {
    const savedLevel = localStorage.getItem('dicesoku-level');
    const savedGridSize = localStorage.getItem('dicesoku-grid-size');
    
    if (savedLevel) {
      setCurrentLevel(parseInt(savedLevel, 10));
    }
    if (savedGridSize) {
      setGridSize(parseInt(savedGridSize, 10));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('dicesoku-level', currentLevel.toString());
  }, [currentLevel]);

  // Save grid size preference to localStorage
  useEffect(() => {
    localStorage.setItem('dicesoku-grid-size', gridSize.toString());
  }, [gridSize]);

  const handlePlayClick = () => {
    setCurrentScreen('game');
  };

  const handleGameComplete = (won: boolean) => {
    if (won) {
      setCurrentLevel(prev => prev + 1);
    }
    
    // Return to lobby after a short delay
    setTimeout(() => {
      setCurrentScreen('lobby');
    }, 2000);
  };

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
  };

  const handleBackToLobby = () => {
    setCurrentScreen('lobby');
  };

  if (currentScreen === 'lobby') {
    return (
      <Lobby
        currentLevel={currentLevel}
        gridSize={gridSize}
        onPlayClick={handlePlayClick}
        onGridSizeChange={handleGridSizeChange}
      />
    );
  }

  return (
    <div className="relative">
      <Game
        levelNumber={currentLevel}
        gridSize={gridSize}
        onGameComplete={handleGameComplete}
      />
      
      {/* Back to Lobby button */}
      <button
        onClick={handleBackToLobby}
        className="fixed top-4 left-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
      >
        ← Back to Lobby
      </button>
    </div>
  );
}