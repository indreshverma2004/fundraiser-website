
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Campaign } from '@/data/mockData';
import CampaignCard from '../campaigns/CampaignCard';

interface FeaturedCampaignsProps {
  campaigns: Campaign[];
}

const FeaturedCampaigns: React.FC<FeaturedCampaignsProps> = ({ campaigns }) => {
  // Filter to show only highlighted campaigns or the first few if none are highlighted
  const featuredCampaigns = campaigns.filter(campaign => campaign.isHighlighted).slice(0, 3);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Campaigns</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover causes that need your support. From environmental initiatives 
              to education programs, your contribution makes a difference.
            </p>
          </div>
          
          <Button variant="ghost" asChild className="mt-4 md:mt-0">
            <Link to="/campaigns" className="inline-flex items-center">
              View all campaigns
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCampaigns.map((campaign, index) => (
            <div 
              key={campaign.id} 
              className="animate-scale-in" 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CampaignCard campaign={campaign} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
