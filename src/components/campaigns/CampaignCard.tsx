
import React from 'react';
import { Link } from 'react-router-dom';
import { Campaign } from '@/data/mockData';
import ProgressBar from './ProgressBar';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, className = "" }) => {
  const { id, title, description, thumbnail, organizer, goal, raised, endDate, location, category } = campaign;
  
  const formattedDate = new Date(endDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  // Truncate description to avoid overly long card content
  const truncatedDescription = description.length > 120
    ? `${description.substring(0, 120)}...`
    : description;
  
  return (
    <div className={`neo-card overflow-hidden group h-full flex flex-col ${className}`}>
      <div className="relative overflow-hidden">
        <Link to={`/campaigns`}>
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 object-cover transition duration-500 transform group-hover:scale-105"
          />
        </Link>
        <Badge className="absolute top-3 right-3 bg-white/80 text-primary hover:bg-white/90">
          {category}
        </Badge>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 mb-3">
          <img 
            src={organizer.avatar} 
            alt={organizer.name} 
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            by {organizer.name}
          </span>
        </div>
        
        <Link to={`/campaigns`} className="block mb-2 group-hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg">{title}</h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{truncatedDescription}</p>
        
        <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Ends {formattedDate}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        
        <ProgressBar 
          current={raised} 
          goal={goal} 
        />
      </div>
    </div>
  );
};

export default CampaignCard;
