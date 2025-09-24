import React from 'react';
import { DiceValue } from '@/types/game';

interface DicePipsProps {
  value: DiceValue;
  size?: 'small' | 'medium' | 'large';
}

const DicePips: React.FC<DicePipsProps> = ({ value, size = 'medium' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-8 h-8',
          pip: 'w-1.5 h-1.5'
        };
      case 'large':
        return {
          container: 'w-12 h-12',
          pip: 'w-3 h-3'
        };
      default: // medium
        return {
          container: 'w-10 h-10',
          pip: 'w-2 h-2'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const renderPips = () => {
    const pipClass = `${sizeClasses.pip} bg-black rounded-full`;
    
    switch (value) {
      case 1:
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full p-1">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className={pipClass}></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full p-1">
            <div className={pipClass}></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className={pipClass}></div>
          </div>
        );
      
      case 3:
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full p-1">
            <div className={pipClass}></div>
            <div></div>
            <div></div>
            <div></div>
            <div className={pipClass}></div>
            <div></div>
            <div></div>
            <div></div>
            <div className={pipClass}></div>
          </div>
        );
      
      case 4:
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full p-1">
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
            <div></div>
            <div></div>
            <div></div>
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
          </div>
        );
      
      case 5:
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full p-1">
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
          </div>
        );
      
      case 6:
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full p-1">
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
            <div className={pipClass}></div>
            <div></div>
            <div className={pipClass}></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`${sizeClasses.container} flex items-center justify-center`}>
      {renderPips()}
    </div>
  );
};

export default DicePips;
