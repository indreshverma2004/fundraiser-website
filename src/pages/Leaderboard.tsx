
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeaderboardSection from '@/components/users/LeaderboardSection';
import BadgeDisplay from '@/components/users/BadgeDisplay';
import { users, badges } from '@/data/mockData';
import { Trophy, Award, Users } from 'lucide-react';

const Leaderboard: React.FC = () => {
  // Sort users by total raised amount (descending)
  const topUsers = [...users].sort((a, b) => b.totalRaised - a.totalRaised);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-8 md:py-12 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Leaderboard</h1>
              <p className="text-muted-foreground">
                Celebrating the incredible individuals and teams making a difference through their contributions.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="neo-card p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-amber-100 rounded-full p-4">
                    <Trophy className="h-12 w-12 text-amber-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{topUsers[0].name}</h3>
                <p className="text-muted-foreground mb-4">Top Contributor</p>
                <p className="text-3xl font-bold text-primary">${topUsers[0].totalRaised.toLocaleString()}</p>
                <div className="flex justify-center mt-4">
                  <BadgeDisplay badges={topUsers[0].badges} limit={5} />
                </div>
              </div>
              
              <div className="neo-card p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-slate-100 rounded-full p-4">
                    <Award className="h-12 w-12 text-slate-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Most Active Teams</h3>
                <p className="text-muted-foreground mb-4">Coming Soon</p>
                <p className="text-base">
                  Team challenges and competitions will be available soon to help increase participation and fundraising.
                </p>
              </div>
              
              <div className="neo-card p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-emerald-100 rounded-full p-4">
                    <Users className="h-12 w-12 text-emerald-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Community Impact</h3>
                <p className="text-muted-foreground mb-4">Global Reach</p>
                <p className="text-3xl font-bold text-primary">5 Countries</p>
                <p className="text-base mt-4">
                  Our community has made a difference in multiple countries across the world.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <LeaderboardSection users={users} />
            </div>
            
            <div className="neo-card">
              <div className="p-5 border-b border-border">
                <h3 className="text-xl font-semibold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Available Badges
                </h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-muted-foreground">
                  Earn these badges by participating in fundraising activities and achieving milestones.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {badges.map(badge => (
                    <div key={badge.id} className="flex items-start">
                      <div className="badge-shine h-14 w-14 flex items-center justify-center bg-primary/10 rounded-full text-2xl flex-shrink-0">
                        <span>{badge.icon}</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
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

export default Leaderboard;
