
import React from 'react';
import { Badge as BadgeType } from '@/data/mockData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BadgeDisplayProps {
  badges: BadgeType[];
  limit?: number;
  showDetails?: boolean;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badges,
  limit,
  showDetails = false
}) => {
  const displayBadges = limit ? badges.slice(0, limit) : badges;
  const extraBadges = limit && badges.length > limit ? badges.length - limit : 0;
  
  return (
    <div className="flex flex-wrap gap-2">
      {displayBadges.map((badge) => (
        <TooltipProvider key={badge.id}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div 
                className="badge-shine h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full text-lg transition-transform hover:scale-110"
                role="button"
                aria-label={badge.name}
              >
                <span>{badge.icon}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-3 max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                {showDetails && (
                  <p className="text-xs">Earned on {new Date(badge.earnedDate).toLocaleDateString()}</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      
      {extraBadges > 0 && (
        <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-full text-sm font-medium">
          +{extraBadges}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
