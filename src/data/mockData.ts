
export interface User {
  id: string;
  name: string;
  avatar: string;
  totalRaised: number;
  totalDonations: number;
  badges: Badge[];
  joinedDate: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  organizer: User;
  goal: number;
  raised: number;
  donorsCount: number;
  endDate: string;
  location: string;
  category: string;
  isHighlighted: boolean;
  donationHistory: Donation[];
}

export interface Donation {
  id: string;
  amount: number;
  donor: User;
  campaign: Campaign;
  message: string;
  date: string;
  isAnonymous: boolean;
}

export const badges: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Donation',
    icon: '🎖️',
    description: 'Made your first donation',
    earnedDate: '2023-05-15',
  },
  {
    id: 'badge-2',
    name: 'Top Contributor',
    icon: '🏆',
    description: 'One of the top 10 contributors',
    earnedDate: '2023-06-22',
  },
  {
    id: 'badge-3',
    name: 'Early Supporter',
    icon: '⭐',
    description: 'Supported a campaign in its first week',
    earnedDate: '2023-04-10',
  },
  {
    id: 'badge-4',
    name: 'Team Player',
    icon: '👥',
    description: 'Joined a fundraising team',
    earnedDate: '2023-07-05',
  },
  {
    id: 'badge-5',
    name: 'Milestone Maker',
    icon: '🏅',
    description: 'Helped a campaign reach a milestone',
    earnedDate: '2023-08-18',
  },
];

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Morgan',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    totalRaised: 5670,
    totalDonations: 12,
    badges: [badges[0], badges[2], badges[4]],
    joinedDate: '2023-03-15',
  },
  {
    id: 'user-2',
    name: 'Sam Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    totalRaised: 8930,
    totalDonations: 18,
    badges: [badges[0], badges[1], badges[3]],
    joinedDate: '2023-02-10',
  },
  {
    id: 'user-3',
    name: 'Jessica Parker',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    totalRaised: 12450,
    totalDonations: 25,
    badges: [badges[0], badges[1], badges[2], badges[3], badges[4]],
    joinedDate: '2023-01-05',
  },
  {
    id: 'user-4',
    name: 'Michael Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    totalRaised: 3250,
    totalDonations: 7,
    badges: [badges[0], badges[2]],
    joinedDate: '2023-04-20',
  },
  {
    id: 'user-5',
    name: 'Emma Davis',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    totalRaised: 9870,
    totalDonations: 19,
    badges: [badges[0], badges[1], badges[4]],
    joinedDate: '2023-02-25',
  },
];

export const campaigns: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Clean Water Initiative',
    description: 'Help us provide clean drinking water to communities in need. Our goal is to build sustainable water systems in 5 villages this year.',
    thumbnail: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    organizer: users[0],
    goal: 25000,
    raised: 18750,
    donorsCount: 235,
    endDate: '2023-12-31',
    location: 'Global',
    category: 'Environment',
    isHighlighted: true,
    donationHistory: [],
  },
  {
    id: 'campaign-2',
    title: 'Education for All',
    description: 'Support our mission to build a school and provide quality education to underprivileged children in rural areas.',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    organizer: users[1],
    goal: 50000,
    raised: 32450,
    donorsCount: 412,
    endDate: '2023-11-15',
    location: 'Africa',
    category: 'Education',
    isHighlighted: true,
    donationHistory: [],
  },
  {
    id: 'campaign-3',
    title: 'Animal Shelter Renovation',
    description: 'Help us renovate our animal shelter to provide better care for abandoned pets. We aim to double our capacity.',
    thumbnail: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    organizer: users[2],
    goal: 15000,
    raised: 10890,
    donorsCount: 178,
    endDate: '2023-10-20',
    location: 'United States',
    category: 'Animals',
    isHighlighted: false,
    donationHistory: [],
  },
  {
    id: 'campaign-4',
    title: 'Medical Supplies for Rural Clinics',
    description: 'Your donation will help provide essential medical supplies to rural clinics serving communities with limited healthcare access.',
    thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    organizer: users[3],
    goal: 35000,
    raised: 18200,
    donorsCount: 245,
    endDate: '2023-11-30',
    location: 'Asia',
    category: 'Healthcare',
    isHighlighted: false,
    donationHistory: [],
  },
  {
    id: 'campaign-5',
    title: 'Arts & Culture Festival',
    description: 'Support our annual arts festival that showcases local talent and provides free arts education workshops for children.',
    thumbnail: 'https://images.unsplash.com/photo-1560269507-c5313fe9d3a7',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    organizer: users[4],
    goal: 20000,
    raised: 12560,
    donorsCount: 189,
    endDate: '2023-09-15',
    location: 'Europe',
    category: 'Arts & Culture',
    isHighlighted: true,
    donationHistory: [],
  },
];

// Generate donation history for each campaign
campaigns.forEach(campaign => {
  const donationCount = Math.floor(Math.random() * 20) + 10;
  
  for (let i = 0; i < donationCount; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const amount = Math.floor(Math.random() * 500) + 10;
    const isAnonymous = Math.random() > 0.7;
    
    const donation: Donation = {
      id: `donation-${campaign.id}-${i}`,
      amount: amount,
      donor: randomUser,
      campaign: campaign,
      message: isAnonymous ? '' : 'Thank you for your amazing work!',
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      isAnonymous: isAnonymous,
    };
    
    campaign.donationHistory.push(donation);
  }
  
  // Sort by date, newest first
  campaign.donationHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const recentDonations: Donation[] = campaigns
  .flatMap(campaign => campaign.donationHistory)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 20);

export const statistics = {
  totalRaised: campaigns.reduce((sum, campaign) => sum + campaign.raised, 0),
  totalCampaigns: campaigns.length,
  totalDonors: new Set(recentDonations.map(donation => donation.donor.id)).size,
  averageDonation: recentDonations.reduce((sum, donation) => sum + donation.amount, 0) / recentDonations.length,
  donationsThisMonth: recentDonations.filter(donation => {
    const donationDate = new Date(donation.date);
    const now = new Date();
    return donationDate.getMonth() === now.getMonth() && donationDate.getFullYear() === now.getFullYear();
  }).length,
  campaignsByCategory: {
    'Education': campaigns.filter(c => c.category === 'Education').length,
    'Healthcare': campaigns.filter(c => c.category === 'Healthcare').length,
    'Environment': campaigns.filter(c => c.category === 'Environment').length,
    'Animals': campaigns.filter(c => c.category === 'Animals').length,
    'Arts & Culture': campaigns.filter(c => c.category === 'Arts & Culture').length,
  },
  monthlyDonations: [
    { month: 'Jan', amount: 32500 },
    { month: 'Feb', amount: 28700 },
    { month: 'Mar', amount: 38200 },
    { month: 'Apr', amount: 42800 },
    { month: 'May', amount: 35600 },
    { month: 'Jun', amount: 48900 },
    { month: 'Jul', amount: 52300 },
    { month: 'Aug', amount: 58100 },
  ],
};
