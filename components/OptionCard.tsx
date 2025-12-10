import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  id: string;
  label: string;
  emoji?: string;
  selected: boolean;
  type: 'radio' | 'checkbox';
  layout?: 'list' | 'grid' | 'cards-side';
  onClick: () => void;
}

const OptionCard: React.FC<Props> = ({ id, label, emoji, selected, type, layout, onClick }) => {
  const isGrid = layout === 'grid';
  const isSide = layout === 'cards-side';
  const isList = !isGrid && !isSide;
  
  // Base classes
  const baseClasses = `
    relative cursor-pointer transition-all duration-200 ease-in-out
    rounded-xl border-2 
    ${selected 
      ? 'border-teal bg-teal-light shadow-md' 
      : 'border-transparent bg-white shadow-sm hover:shadow-md'
    }
  `;

  // Layout specific sizing
  const layoutClasses = isList 
    ? 'flex items-center p-4 w-full mb-3 text-left' // List: Row layout
    : isGrid 
      ? 'flex flex-col items-center justify-center p-4 h-32 text-center' // Grid: Column
      : 'flex flex-col items-center justify-center p-6 text-center h-full'; // Cards Side: Column

  return (
    <div 
      role={type}
      aria-checked={selected}
      onClick={onClick}
      className={`${baseClasses} ${layoutClasses}`}
    >
      {/* 1. EMOJI (List View Only) - Appears first */}
      {isList && emoji && (
        <span className="text-2xl mr-4 flex-shrink-0 select-none">
          {emoji}
        </span>
      )}

      {/* 2. INDICATOR (List View Only) - Appears second */}
      {isList && (
        <div className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
          ${selected ? 'border-teal bg-teal' : 'border-gray-300 bg-white'}
        `}>
          {selected && <Check size={14} className="text-white" strokeWidth={3} />}
        </div>
      )}

      {/* 3. CONTENT (Label + Emoji for Grid/Side views) */}
      <div className="flex flex-col flex-1">
        {/* Emoji for Grid/Side View (Appears above text) */}
        {!isList && emoji && (
          <span className={`${isGrid || isSide ? 'text-3xl mb-2' : ''}`}>
            {emoji}
          </span>
        )}
        
        <span className={`font-medium leading-tight ${selected ? 'text-teal-900' : 'text-gray-700'}`}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default OptionCard;