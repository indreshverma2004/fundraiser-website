import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trophy } from "lucide-react";

interface User {
  _id: string;
  name: string;
  totalDonations: number;
}

const LeaderboardSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://fundraiser-950o.onrender.com/api/users/leaderboard"); // Update with actual API URL
        const sortedUsers = response.data.sort((a: User, b: User) => b.totalDonations - a.totalDonations);
        setUsers(sortedUsers);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-5">Loading leaderboard...</div>;
  if (error) return <div className="text-center py-5 text-red-500">{error}</div>;

  return (
    <div className="rounded-xl overflow-hidden neo-card">
      <div className="p-5 border-b border-border bg-secondary/50">
        <h3 className="text-xl font-semibold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-amber-500" />
          Leaderboard
        </h3>
      </div>

      <div className="p-5">
        {users.map((user, index) => (
          <div key={user._id} className="p-4 rounded-lg shadow-md mb-3 bg-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 w-8 h-8 flex items-center justify-center font-bold rounded-full bg-primary/10">
                {index + 1}
              </div>
              <h4 className="font-medium">{user.name}</h4>
            </div>

            {/* Badges Section */}
            <div className="flex items-center space-x-2">
              {/* "Top 10 Contributor" badge for top 10 contributors */}
              {index < 10 && (
                <span className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded">
                  🏆 Top 10 Contributor
                </span>
              )}
              {/* "First Contribution" badge for every contributor */}
              <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
                🎉 First Contribution
              </span>
              {/* "Milestone Achiever" badge for donations over ₹1,00,000 */}
              {user.totalDonations >= 100000 && (
                <span className="px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded">
                  🌟 Milestone Achiever
                </span>
              )}
            </div>

            {/* Total Donations */}
            <div className="font-semibold">{user.totalDonations.toLocaleString()} donations</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardSection;
