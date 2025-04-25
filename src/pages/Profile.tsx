import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Donation {
  amountDonated: number;
  campaignName: string;
  date: string;
}

interface User {
  name: string;
  contact: string;
  totalDonations: number;
}

const Profile: React.FC = () => {
  const [contact, setContact] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchDonations = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://fundraiser-950o.onrender.com/api/users/get-donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setDonations(data.donations);
      } else {
        setError(data.message || "Failed to fetch donations.");
      }
    } catch (err) {
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {!user ? (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <h2 className="text-3xl font-bold text-white text-center">
                User Profile
              </h2>
              <p className="text-blue-100 text-center mt-2">
                Sign in to view your contributions
              </p>
            </div>

            <form onSubmit={fetchDonations} className="p-8">
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-700 border border-red-200 text-center">
                  {error}
                </div>
              )}

              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Signing In</span>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-white">Welcome, {user.name}!</h1>
              <div className="mt-4 bg-white/20 rounded-full px-6 py-2 backdrop-blur-sm">
                <p className="text-white text-lg">
                  Total Contributions: <span className="font-bold text-xl ml-1">${user.totalDonations}</span>
                </p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Contributions</h2>
                <Link to="/campaigns" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition">
                  Donate Again
                </Link>
              </div>

              {donations.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600">
                        <th className="px-6 py-4 text-left font-semibold">Campaign Name</th>
                        <th className="px-6 py-4 text-center font-semibold">Amount</th>
                        <th className="px-6 py-4 text-right font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {donations.map((donation, index) => (
                        <tr
                          key={index}
                          className="bg-white hover:bg-blue-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-800">{donation.campaignName}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center bg-green-100 text-green-800 font-medium px-4 py-1 rounded-full">
                              ${donation.amountDonated}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-500">
                            {new Date(donation.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-2xl">📊</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No contributions yet</h3>
                  <p className="text-gray-500 max-w-sm mx-auto mb-6">
                    Start making a difference by donating to a campaign today!
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                    Browse Campaigns
                  </button>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button className="text-gray-600 hover:text-red-600 transition flex items-center gap-2 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;