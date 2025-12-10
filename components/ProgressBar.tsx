import React from 'react';

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-teal-light fixed top-0 left-0 z-50">
      <div 
        className="h-full bg-teal transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;