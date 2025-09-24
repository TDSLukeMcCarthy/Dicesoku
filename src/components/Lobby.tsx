'use client';

import React from 'react';

interface LobbyProps {
  currentLevel: number;
  gridSize: number;
  onPlayClick: () => void;
  onGridSizeChange: (size: number) => void;
}

const Lobby: React.FC<LobbyProps> = ({ currentLevel, gridSize, onPlayClick, onGridSizeChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Game Title */}
        <div className="text-center space-y-4">
          <div className="text-6xl">🎲</div>
          <h1 className="text-4xl font-bold text-gray-800">Dice Sum Puzzle</h1>
          <p className="text-lg text-gray-600">
            Place dice to match row and column target sums
          </p>
        </div>

        {/* Current Level Display */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Current Progress</h2>
          <div className="text-3xl font-bold text-blue-600">Level {currentLevel}</div>
          
          {currentLevel > 1 && (
            <p className="text-sm text-gray-500">
              You've completed {currentLevel - 1} level{currentLevel > 2 ? 's' : ''}!
            </p>
          )}
        </div>

        {/* Grid Size Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 text-center">Grid Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {[3, 4, 5, 6, 7, 8, 9].map((size) => (
              <button
                key={size}
                onClick={() => onGridSizeChange(size)}
                className={`p-3 rounded-lg font-semibold transition-all ${
                  gridSize === size
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                }`}
              >
                {size}×{size}
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            {gridSize <= 4 && "Easy - Perfect for beginners"}
            {gridSize === 5 && "Medium - Balanced challenge"}
            {gridSize >= 6 && gridSize <= 7 && "Hard - For experienced players"}
            {gridSize >= 8 && "Expert - Maximum difficulty"}
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={onPlayClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg transform hover:scale-105"
        >
          Play Level {currentLevel}
        </button>

        {/* Game Rules */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">How to Play</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">1.</span>
              <span>Select a dice from the pool</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">2.</span>
              <span>Place it on an empty cell in the grid</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">3.</span>
              <span>Make row and column sums match the targets</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">4.</span>
              <span>Use your 5 undos wisely!</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Each level is procedurally generated</p>
          <p>Complete a level to unlock the next one</p>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
