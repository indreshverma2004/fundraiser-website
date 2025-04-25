
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { statistics } from '@/data/mockData';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-primary/5 w-1/2 h-1/2 rounded-bl-full transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 bg-primary/5 w-1/2 h-1/2 rounded-tr-full transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center h-10 rounded-full bg-primary/10 px-4 mb-2">
              <Heart className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">Make a difference today</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">Empower Change.</span>
              <span className="block">Fund <span className="text-primary">Hope.</span></span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Connect with causes that matter. Create campaigns, track donations, 
              and build a community of giving that transforms lives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link to="/campaigns">
                  Browse Campaigns
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/create-campaign" className="inline-flex items-center">
                  Start Fundraising
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl text-center transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-primary mb-1">
                  ${statistics.totalRaised.toLocaleString()}
                </h3>
                <p className="text-sm text-muted-foreground">Total funds raised</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl text-center transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-primary mb-1">
                  {statistics.totalCampaigns}
                </h3>
                <p className="text-sm text-muted-foreground">Active campaigns</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl text-center transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-primary mb-1">
                  {statistics.totalDonors}
                </h3>
                <p className="text-sm text-muted-foreground">Generous donors</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl text-center transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-3xl font-bold text-primary mb-1">
                  ${Math.round(statistics.averageDonation)}
                </h3>
                <p className="text-sm text-muted-foreground">Average donation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
