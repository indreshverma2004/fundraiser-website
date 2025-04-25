
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CampaignForm from '@/components/campaigns/CampaignForm';

const CreateCampaign: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Create a Campaign</h1>
            <p className="text-muted-foreground">
              Start your fundraising journey and make a difference for the causes you care about.
            </p>
          </div>
          
          <div className="neo-card p-6">
            <CampaignForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCampaign;
