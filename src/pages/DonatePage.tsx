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
  
    const amountInPaise = parseInt(formData.amount) * 100;
  
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      const options = {
        key: "rzp_test_X5Z3WEj29Kjeew",
        amount: amountInPaise,
        currency: "INR",
        name: "Fundraising Platform",
        description: `Donation for Campaign`,
        handler: async (response: any) => {
          // After payment is successful, call backend to store donation
          try {
            const res = await fetch("https://fundraiser-950o.onrender.com/api/users/contribute", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...formData, campaignId, paymentId: response.razorpay_payment_id }),
            });
  
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Donation failed");
  
            toast.success("Donation successful!");
            navigate("/campaigns");
          } catch (err: any) {
            toast.error(err.message);
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.contact,
        },
        theme: {
          color: "#007BFF",
        },
      };
  
      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        toast.error("Razorpay failed to load.");
      }
    };
  
    document.body.appendChild(script);
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
