
import React from 'react';
import { statistics } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsSection: React.FC = () => {
  const chartData = statistics.monthlyDonations;
  
  // Calculate category counts for the pie chart
  const categoryData = Object.entries(statistics.campaignsByCategory).map(([name, value]) => ({
    name,
    value
  }));
  
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact Dashboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track the real-time progress of all our charitable efforts combined. 
            Every dollar and every donation brings us closer to our goals.
          </p>
        </div>
        
        <div className="neo-card overflow-hidden mb-8">
          <div className="p-5 border-b border-border bg-white">
            <h3 className="text-xl font-semibold">Monthly Donations</h3>
            <p className="text-sm text-muted-foreground">Tracking our growth together</p>
          </div>
          
          <div className="p-5 bg-white h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                  labelStyle={{ fontWeight: 'bold' }}
                  contentStyle={{
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="rgba(59, 130, 246, 0.8)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="neo-card p-6 text-center">
            <h3 className="text-4xl font-bold text-primary">${statistics.totalRaised.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground mt-2">Total raised across all campaigns</p>
          </div>
          
          <div className="neo-card p-6 text-center">
            <h3 className="text-4xl font-bold text-primary">{statistics.totalDonors}</h3>
            <p className="text-sm text-muted-foreground mt-2">Generous donors contributing</p>
          </div>
          
          <div className="neo-card p-6 text-center">
            <h3 className="text-4xl font-bold text-primary">{statistics.donationsThisMonth}</h3>
            <p className="text-sm text-muted-foreground mt-2">Donations this month</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
