import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, Medal, Star, Award, Gift, 
  TrendingUp, Users, BookOpen, Target, 
  Crown, Zap, Flame, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const leaderboardData = [
  { id: 1, name: "Alex Johnson", points: 9850, badges: 32, streak: 45, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 2, name: "Sophia Chen", points: 9320, badges: 29, streak: 60, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 3, name: "Marcus Williams", points: 8760, badges: 27, streak: 30, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 4, name: "Emily Rodriguez", points: 8540, badges: 25, streak: 38, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 5, name: "David Kim", points: 7980, badges: 24, streak: 15, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 6, name: "You", points: 7450, badges: 21, streak: 22, avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&h=100&q=80", isCurrentUser: true },
  { id: 7, name: "Lisa Thompson", points: 7120, badges: 20, streak: 28, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 8, name: "Michael Brown", points: 6850, badges: 18, streak: 12, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 9, name: "Sarah Taylor", points: 6720, badges: 19, streak: 8, avatar: "https://images.unsplash.com/photo-1580489915913-4f8f5cb481c4?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 10, name: "Jason Lee", points: 6540, badges: 17, streak: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80" }
];

const badges = [
  { 
    id: 1, 
    name: "Knowledge Seeker", 
    description: "Complete 10 courses", 
    progress: 100, 
    achieved: true, 
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    color: "blue" 
  },
  { 
    id: 2, 
    name: "Consistent Learner", 
    description: "Maintain a 30-day streak", 
    progress: 73, 
    achieved: false, 
    icon: <Flame className="h-8 w-8 text-orange-500" />,
    color: "orange"
  },
  { 
    id: 3, 
    name: "Quiz Master", 
    description: "Score 90%+ on 5 quizzes", 
    progress: 100, 
    achieved: true, 
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    color: "yellow"
  },
  { 
    id: 4, 
    name: "Skill Champion", 
    description: "Master a skill at 100%", 
    progress: 100, 
    achieved: true, 
    icon: <Trophy className="h-8 w-8 text-amber-500" />,
    color: "amber"
  },
  { 
    id: 5, 
    name: "Team Player", 
    description: "Complete 3 group projects", 
    progress: 67, 
    achieved: false, 
    icon: <Users className="h-8 w-8 text-indigo-500" />,
    color: "indigo"
  },
  { 
    id: 6, 
    name: "Fast Learner", 
    description: "Complete a course in record time", 
    progress: 100, 
    achieved: true, 
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    color: "purple"
  },
  { 
    id: 7, 
    name: "Goal Crusher", 
    description: "Achieve 10 personal learning goals", 
    progress: 40, 
    achieved: false, 
    icon: <Target className="h-8 w-8 text-red-500" />,
    color: "red"
  },
  { 
    id: 8, 
    name: "Certificate Collector", 
    description: "Earn 5 certificates", 
    progress: 80, 
    achieved: false, 
    icon: <Award className="h-8 w-8 text-teal-500" />,
    color: "teal"
  }
];

const rewards = [
  { 
    id: 1, 
    name: "Premium Course Access", 
    description: "30-day free access to any premium course", 
    pointsCost: 5000, 
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&h=200&q=80" 
  },
  { 
    id: 2, 
    name: "1-on-1 Mentoring Session", 
    description: "30-minute session with an industry expert", 
    pointsCost: 7500, 
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&h=200&q=80" 
  },
  { 
    id: 3, 
    name: "$15 Learning Credit", 
    description: "Credit toward any course or resource", 
    pointsCost: 3000, 
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=300&h=200&q=80" 
  },
  { 
    id: 4, 
    name: "Exclusive Workshop Access", 
    description: "Attend a special industry workshop", 
    pointsCost: 10000, 
    image: "https://images.unsplash.com/photo-1515168833906-d503d9a75eb2?auto=format&fit=crop&w=300&h=200&q=80" 
  }
];

const brandDeals = [
  {
    id: 1,
    brand: "Bewakoof",
    discount: "40% OFF",
    points: 2500,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&h=200&q=80",
    description: "Exclusive discount on trendy apparel"
  },
  {
    id: 2,
    brand: "boAt",
    discount: "25% OFF",
    points: 3000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&h=200&q=80",
    description: "Premium audio products at special prices"
  },
  {
    id: 3,
    brand: "Urban Monkey",
    discount: "30% OFF",
    points: 2000,
    image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=300&h=200&q=80",
    description: "Streetwear essentials for GenZ"
  },
  {
    id: 4,
    brand: "Noise",
    discount: "20% OFF",
    points: 2800,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&h=200&q=80",
    description: "Smart wearables for the tech-savvy"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Gamification = () => {
  const [currentUserPoints] = useState(7450);
  
  const handleRedeemReward = (rewardId: number) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward) {
      if (currentUserPoints >= reward.pointsCost) {
        toast.success(`Successfully redeemed: ${reward.name}`);
      } else {
        toast.error(`Not enough points to redeem ${reward.name}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-8">
            <div className="bg-gradient-to-r from-grubble-500 to-teal-600 rounded-xl p-8 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Learning Gamified</h1>
                <p className="text-lg text-white/90 mb-6">
                  Earn points, collect badges, compete on leaderboards, and redeem rewards as you learn.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">{currentUserPoints.toLocaleString()}</div>
                    <div className="text-sm text-white/80">Total Points</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">21</div>
                    <div className="text-sm text-white/80">Badges Earned</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">22</div>
                    <div className="text-sm text-white/80">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <Tabs defaultValue="leaderboard">
            <div className="mb-6">
              <TabsList className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-1 rounded-lg w-full">
                <TabsTrigger value="leaderboard" className="flex-1 rounded-md data-[state=active]:bg-grubble-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-grubble-500 dark:data-[state=active]:text-grubble-300">
                  Leaderboard
                </TabsTrigger>
                <TabsTrigger value="badges" className="flex-1 rounded-md data-[state=active]:bg-grubble-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-grubble-500 dark:data-[state=active]:text-grubble-300">
                  Badges
                </TabsTrigger>
                <TabsTrigger value="rewards" className="flex-1 rounded-md data-[state=active]:bg-grubble-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-grubble-500 dark:data-[state=active]:text-grubble-300">
                  Rewards
                </TabsTrigger>
                <TabsTrigger value="brands" className="flex-1 rounded-md data-[state=active]:bg-grubble-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-grubble-500 dark:data-[state=active]:text-grubble-300">
                  Brand Deals
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="leaderboard">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Global Leaderboard
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    See how you rank against other learners this month
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Badges
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Streak
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {leaderboardData.map((user, index) => (
                        <tr 
                          key={user.id} 
                          className={`${
                            user.isCurrentUser 
                              ? 'bg-grubble-50 dark:bg-grubble-900/20' 
                              : index % 2 === 0 
                                ? 'bg-white dark:bg-gray-800' 
                                : 'bg-gray-50 dark:bg-gray-700/50'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index === 0 ? (
                              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30">
                                <Crown className="h-4 w-4 text-amber-500" />
                              </div>
                            ) : index === 1 ? (
                              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700">
                                <Medal className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                              </div>
                            ) : index === 2 ? (
                              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-amber-50 dark:bg-amber-900/20">
                                <Medal className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                              </div>
                            ) : (
                              <div className="text-center font-mono text-gray-700 dark:text-gray-300 text-lg">
                                {index + 1}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={user.avatar} 
                                  alt={user.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {user.name} {user.isCurrentUser && <span className="text-grubble-500">(You)</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {user.points.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                            <div className="flex items-center">
                              <Trophy className="h-4 w-4 text-amber-500 mr-2" />
                              {user.badges}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Flame className="h-4 w-4 text-orange-500 mr-2" />
                              <span className="text-gray-700 dark:text-gray-300">{user.streak} days</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {badges.map((badge) => (
                  <motion.div 
                    key={badge.id}
                    variants={fadeIn}
                    className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden border ${
                      badge.achieved 
                        ? `border-${badge.color}-200 dark:border-${badge.color}-900` 
                        : 'border-gray-100 dark:border-gray-700'
                    } shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className={`h-3 bg-${badge.color}-500`}></div>
                    <div className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className={`h-20 w-20 rounded-full ${
                          badge.achieved 
                            ? `bg-${badge.color}-100 dark:bg-${badge.color}-900/30` 
                            : 'bg-gray-100 dark:bg-gray-700'
                        } flex items-center justify-center`}>
                          {badge.achieved ? badge.icon : (
                            <div className="opacity-30">
                              {badge.icon}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                          {badge.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {badge.description}
                        </p>
                      </div>
                      
                      {badge.achieved ? (
                        <Badge className={`w-full justify-center bg-${badge.color}-100 dark:bg-${badge.color}-900/30 text-${badge.color}-700 dark:text-${badge.color}-300 border-${badge.color}-200 dark:border-${badge.color}-900`}>
                          Achieved
                        </Badge>
                      ) : (
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className={`h-2 bg-gray-100 dark:bg-gray-700`} indicatorClassName={`bg-${badge.color}-500`} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="rewards">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Redeem Your Points</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Use your earned points to unlock exclusive rewards and perks
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="bg-grubble-50 dark:bg-grubble-900/20 rounded-lg p-3 flex items-center">
                      <Gift className="h-5 w-5 text-grubble-500 mr-2" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {currentUserPoints.toLocaleString()} available points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {rewards.map((reward) => (
                  <motion.div 
                    key={reward.id}
                    variants={fadeIn}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm"
                  >
                    <div className="relative h-48">
                      <img 
                        src={reward.image} 
                        alt={reward.name} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{reward.name}</h3>
                        <p className="text-sm text-white/90">{reward.description}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center text-gray-900 dark:text-white font-bold">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        {reward.pointsCost.toLocaleString()} points
                      </div>
                      
                      <Button 
                        className={currentUserPoints >= reward.pointsCost 
                          ? "bg-grubble-500 hover:bg-grubble-600 text-white" 
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"}
                        onClick={() => handleRedeemReward(reward.id)}
                        disabled={currentUserPoints < reward.pointsCost}
                      >
                        {currentUserPoints >= reward.pointsCost ? "Redeem" : "Not Enough Points"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="brands">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Exclusive Brand Deals</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Unlock special discounts from your favorite GenZ brands
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="bg-grubble-50 dark:bg-grubble-900/20 rounded-lg p-3 flex items-center">
                      <Gift className="h-5 w-5 text-grubble-500 mr-2" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {currentUserPoints.toLocaleString()} available points
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {brandDeals.map((deal) => (
                  <motion.div 
                    key={deal.id}
                    variants={fadeIn}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <img 
                        src={deal.image} 
                        alt={deal.brand} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white border-none">
                          {deal.discount}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {deal.brand}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {deal.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-900 dark:text-white font-bold">
                          <Star className="h-5 w-5 text-yellow-500 mr-2" />
                          {deal.points.toLocaleString()} points
                        </div>
                        <Button 
                          className={currentUserPoints >= deal.points 
                            ? "bg-grubble-500 hover:bg-grubble-600 text-white" 
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"}
                          onClick={() => handleRedeemReward(deal.id)}
                          disabled={currentUserPoints < deal.points}
                        >
                          Claim Deal
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gamification;
