import React from 'react';
import { DiceValue } from '@/types/game';
import DicePips from './DicePips';

interface DicePoolProps {
  dicePool: Record<DiceValue, number>;
  selectedDice: DiceValue | null;
  onDiceSelect: (dice: DiceValue) => void;
  onDragStart?: (dice: DiceValue) => void;
}

const DicePool: React.FC<DicePoolProps> = ({ dicePool, selectedDice, onDiceSelect, onDragStart }) => {
  const diceValues: DiceValue[] = [1, 2, 3, 4, 5, 6];
  
  
  const getDiceClasses = (value: DiceValue) => {
    const baseClasses = 'w-16 h-16 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all shadow-sm';
    const isSelected = selectedDice === value;
    const isAvailable = dicePool[value] > 0;
    
    if (!isAvailable) {
      return `${baseClasses} bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-50`;
    }
    
    if (isSelected) {
      return `${baseClasses} bg-blue-500 border-blue-600 text-white shadow-lg transform scale-105`;
    }
    
    return `${baseClasses} bg-white border-gray-400 text-gray-800 hover:bg-blue-50 hover:border-blue-300 shadow-md`;
  };

  const handleDragStart = (e: React.DragEvent, value: DiceValue) => {
    if (dicePool[value] <= 0) {
      e.preventDefault();
      return;
    }
    
    e.dataTransfer.setData('text/plain', value.toString());
    e.dataTransfer.effectAllowed = 'move';
    
    // Visual feedback during drag
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
    
    onDragStart?.(value);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Reset visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Dice Pool</h3>
      
      <div className="flex space-x-4">
        {diceValues.map((value) => (
          <div key={value} className="flex flex-col items-center space-y-2">
            {/* Dice Visual */}
            <div
              className={getDiceClasses(value)}
              draggable={dicePool[value] > 0}
              onClick={() => dicePool[value] > 0 && onDiceSelect(value)}
              onDragStart={(e) => handleDragStart(e, value)}
              onDragEnd={handleDragEnd}
            >
              <DicePips value={value} size="small" />
            </div>
            
            {/* Count Below */}
            <div className="text-sm font-semibold text-gray-700">
              {dicePool[value]}x
            </div>
          </div>
        ))}
      </div>
      
      {selectedDice && (
        <div className="text-sm text-blue-600 font-medium flex items-center space-x-2">
          <span>Selected:</span>
          <div className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center">
            <DicePips value={selectedDice} size="small" />
          </div>
          <span>(Click a cell or drag to place)</span>
        </div>
      )}
      
      {!selectedDice && (
        <div className="text-sm text-gray-500 font-medium">
          Click to select or drag dice to the grid
        </div>
      )}
    </div>
  );
};

export default DicePool;
