import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

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

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://fundraiser-950o.onrender.com/api/campaigns'); // Replace with your actual API endpoint
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const categories = ['all', ...new Set(campaigns.map(campaign => campaign.category.toLowerCase()))];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || campaign.category.toLowerCase() === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28">
        <section className="py-8 md:py-12 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Campaigns</h1>
              <p className="text-muted-foreground">
                Browse through active fundraising campaigns and contribute to causes that resonate with you.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search campaigns..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaigns Display */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium">Loading campaigns...</h3>
              </div>
            ) : filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCampaigns.map((campaign) => (
                  <div 
                    key={campaign._id}
                    className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                  >
                    {/* Campaign Image */}
                    <img
                      src={campaign.photo || '/default_campaign.jpg'}
                      alt={campaign.name}
                      className="w-full h-48 object-cover"
                    />

                    {/* Campaign Details */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{campaign.location}</p>

                      {/* Progress Bar */}
                      <div className="h-2 bg-gray-300 rounded-full overflow-hidden my-2">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(campaign.collectedSoFar / campaign.totalContributionNeeded) * 100}%` }}
                        ></div>
                      </div>

                      <p className="text-sm text-gray-600">
                        Raised ₹{campaign.collectedSoFar.toLocaleString()} / ₹{campaign.totalContributionNeeded.toLocaleString()}
                      </p>

                      <p className="text-sm text-muted-foreground my-2">{campaign.description.slice(0, 80)}...</p>

                      <Button asChild className="w-full mt-2">
  <Link to={`/campaign/${campaign._id}`}>View Details</Link>
</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No campaigns found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Campaigns;
