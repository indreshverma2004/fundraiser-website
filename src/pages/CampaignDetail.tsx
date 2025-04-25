import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Campaign {
  _id: string;
  name: string;
  location: string;
  endDate: string;
  photo?: string;
  description: string;
  totalContributionNeeded: number;
  collectedSoFar: number;
  category: string;
}

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`https://fundraiser-950o.onrender.com/api/campaigns/${id}`);
        if (!response.ok) throw new Error("Failed to fetch campaign details");
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        toast.error("Campaign not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-28 flex items-center justify-center">
          <h2 className="text-xl font-medium">Loading campaign details...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-28 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
            <Button asChild>
              <Link to="/campaigns">Browse Campaigns</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/campaigns" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to campaigns
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="overflow-hidden mb-8">
                <img src={campaign.photo || '/default_campaign.jpg'} alt={campaign.name} className="w-full h-[400px] object-cover"/>
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{campaign.location}</span>
                    </div>
                  </div>
                  <p className="text-lg">{campaign.description}</p>
                  <Button className="mt-4" onClick={() => navigate(`/donate/${campaign._id}`)}>Donate Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CampaignDetail;
