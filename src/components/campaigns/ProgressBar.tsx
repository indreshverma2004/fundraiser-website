
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  current: number;
  goal: number;
  className?: string;
  showText?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  goal, 
  className = "", 
  showText = true 
}) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Calculate percentage capped at 100%
    const percentage = Math.min(Math.round((current / goal) * 100), 100);
    
    // Set the progress width with a slight delay for animation
    setTimeout(() => {
      document.documentElement.style.setProperty('--progress-width', `${percentage}%`);
      setWidth(percentage);
    }, 100);
  }, [current, goal]);

  return (
    <div className={`space-y-2 ${className}`}>
      {showText && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            ${current.toLocaleString()} raised
          </span>
          <span>
            {width}% of ${goal.toLocaleString()}
          </span>
        </div>
      )}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }} // Set width dynamically
        />
      </div>
    </div>
  );
};

export default ProgressBar;
