
import React, { useEffect, useState } from 'react';
import { Donation } from '@/data/mockData';
import { Heart } from 'lucide-react';

interface DonationFeedProps {
  donations: Donation[];
  limit?: number;
  showCampaign?: boolean;
}

const DonationFeed: React.FC<DonationFeedProps> = ({ 
  donations, 
  limit = 5,
  showCampaign = false
}) => {
  const [visibleDonations, setVisibleDonations] = useState<Donation[]>([]);
  
  useEffect(() => {
    // Show donations one by one with a delay
    const displayedDonations: Donation[] = [];
    const interval = setInterval(() => {
      if (displayedDonations.length < Math.min(donations.length, limit)) {
        displayedDonations.push(donations[displayedDonations.length]);
        setVisibleDonations([...displayedDonations]);
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, [donations, limit]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-4">
      {visibleDonations.map((donation, index) => (
        <div 
          key={donation.id} 
          className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-border animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="mr-3 bg-primary/10 rounded-full p-2">
            <Heart className="h-4 w-4 text-primary" />
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex flex-wrap justify-between items-center">
              <p className="font-medium truncate">
                {donation.isAnonymous ? 'Anonymous' : donation.donor.name}
              </p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(donation.date)}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground truncate">
              Donated <span className="font-medium text-foreground">${donation.amount}</span>
              {showCampaign && (
                <> to <span className="font-medium text-foreground">{donation.campaign.title}</span></>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {donations.length === 0 && (
        <p className="text-center text-muted-foreground py-4">No recent donations</p>
      )}
    </div>
  );
};

export default DonationFeed;
