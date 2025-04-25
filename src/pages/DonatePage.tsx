import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DonatePage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    password: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDonate = async () => {
    if (!formData.name || !formData.contact || !formData.password || !formData.amount) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await fetch('https://fundraiser-950o.onrender.com/api/users/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, campaignId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Donation failed");

      toast.success("Donation successful!");
      navigate(`/campaigns`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Donate to Campaign</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount to Donate"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <Button className="w-full" onClick={handleDonate}>Confirm Donation</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;
