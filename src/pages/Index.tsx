
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCampaigns from '@/components/home/FeaturedCampaigns';
import StatisticsSection from '@/components/home/StatisticsSection';
import LeaderboardSection from '@/components/users/LeaderboardSection';
import DonationFeed from '@/components/common/DonationFeed';
import { campaigns, users, recentDonations } from '@/data/mockData';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedCampaigns campaigns={campaigns} />
        
        <StatisticsSection />
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Activity</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See who's making a difference and how you can join them in creating positive change.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LeaderboardSection users={users} />
              </div>
              
              <div>
                <div className="neo-card">
                  <div className="p-5 border-b border-border">
                    <h3 className="text-xl font-semibold">Recent Donations</h3>
                  </div>
                  <div className="p-5">
                    <DonationFeed donations={recentDonations} limit={8} showCampaign={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
