
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, Award, Target, 
  TrendingUp, Calendar, BookOpen, 
  Users, CheckCircle, Clock, Medal, 
  Zap, BarChart2, Share2, Download, Plus
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

// Sample data for skill wallet
const skillCategories = [
  {
    id: 1,
    name: "Development",
    skills: [
      { name: "React", level: 85, certified: true },
      { name: "JavaScript", level: 78, certified: true },
      { name: "TypeScript", level: 62, certified: false },
      { name: "Node.js", level: 45, certified: false },
      { name: "HTML/CSS", level: 90, certified: true }
    ]
  },
  {
    id: 2,
    name: "Data Science",
    skills: [
      { name: "Python", level: 68, certified: true },
      { name: "SQL", level: 75, certified: false },
      { name: "Data Visualization", level: 60, certified: false },
      { name: "Machine Learning", level: 32, certified: false }
    ]
  },
  {
    id: 3,
    name: "Design",
    skills: [
      { name: "UI Design", level: 72, certified: false },
      { name: "Figma", level: 80, certified: true },
      { name: "User Research", level: 65, certified: false }
    ]
  },
  {
    id: 4,
    name: "Soft Skills",
    skills: [
      { name: "Communication", level: 85, certified: true },
      { name: "Project Management", level: 70, certified: false },
      { name: "Problem Solving", level: 82, certified: false },
      { name: "Teamwork", level: 90, certified: true }
    ]
  }
];

// Skill progress history data
const skillGrowthData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 59 },
  { month: "May", value: 62 },
  { month: "Jun", value: 68 },
];

// Achievements data
const achievements = [
  {
    id: 1,
    title: "Frontend Master",
    description: "Completed all core frontend development courses",
    icon: <Trophy className="h-6 w-6 text-amber-500" />,
    date: "March 2025",
    points: 500
  },
  {
    id: 2,
    title: "Consistent Learner",
    description: "Completed at least one lesson every day for 30 days",
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    date: "February 2025",
    points: 300
  },
  {
    id: 3,
    title: "Perfect Score",
    description: "Achieved 100% on the JavaScript assessment",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    date: "January 2025",
    points: 250
  },
  {
    id: 4,
    title: "Certified React Developer",
    description: "Earned the official React developer certification",
    icon: <Award className="h-6 w-6 text-blue-500" />,
    date: "December 2024",
    points: 750
  }
];

// Credentials data
const credentials = [
  {
    id: 1,
    title: "React Developer Certification",
    issuer: "Grubble Academy",
    date: "December 2024",
    skills: ["React", "Redux", "JavaScript"],
    image: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 2,
    title: "Frontend Web Development",
    issuer: "Udacity",
    date: "October 2024",
    skills: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    issuer: "Coursera",
    date: "August 2024",
    skills: ["JavaScript", "ES6", "Async JS"],
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=100&h=100&q=80"
  }
];

// Platform connections
const connectedPlatforms = [
  { name: "Coursera", connected: true, icon: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=50&h=50&q=80" },
  { name: "Udemy", connected: true, icon: "https://images.unsplash.com/photo-1506729623306-b5a934d88b53?auto=format&fit=crop&w=50&h=50&q=80" },
  { name: "LinkedIn Learning", connected: false, icon: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=50&h=50&q=80" },
  { name: "Pluralsight", connected: true, icon: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=50&h=50&q=80" },
  { name: "FreeCodeCamp", connected: false, icon: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=50&h=50&q=80" },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const SkillWallet = () => {
  const { userName } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get all skills across categories
  const allSkills = skillCategories.flatMap(category => category.skills);
  
  // Calculate total skill level average
  const averageSkillLevel = Math.round(
    allSkills.reduce((acc, curr) => acc + curr.level, 0) / allSkills.length
  );
  
  // Count certified skills
  const certifiedSkillsCount = allSkills.filter(skill => skill.certified).length;
  
  // Handle connect platform
  const handleConnectPlatform = (platformName: string) => {
    toast.success(`Connected to ${platformName} successfully!`);
  };
  
  // Handle disconnect platform
  const handleDisconnectPlatform = (platformName: string) => {
    toast.success(`Disconnected from ${platformName} successfully!`);
  };
  
  // Handle share profile
  const handleShareProfile = () => {
    toast.success("Profile link copied to clipboard!");
  };
  
  // Handle download certificate
  const handleDownloadCertificate = (credentialId: number) => {
    const credential = credentials.find(c => c.id === credentialId);
    if (credential) {
      toast.success(`Downloading ${credential.title} certificate...`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-grubble-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Enhanced Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-grubble-500 to-teal-600 text-white rounded-2xl p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {userName || 'User'}'s Skill Wallet
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Track your learning progress and showcase your achievements
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">{allSkills.length}</div>
                <div className="text-sm">Skills Tracked</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">{certifiedSkillsCount}</div>
                <div className="text-sm">Certifications</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">{averageSkillLevel}%</div>
                <div className="text-sm">Avg. Level</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Skill Stats Overview */}
        <section className="mb-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeIn} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-grubble-100 dark:bg-grubble-900/50 flex items-center justify-center mr-3">
                  <BarChart2 className="h-5 w-5 text-grubble-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Skill Level</h3>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{averageSkillLevel}%</div>
                </div>
              </div>
              <Progress value={averageSkillLevel} className="h-2 bg-gray-100 dark:bg-gray-700" />
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Skills Tracked</h3>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{allSkills.length}</div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {certifiedSkillsCount} certified
                </span>
                <span className="text-grubble-500">
                  {allSkills.length - certifiedSkillsCount} in progress
                </span>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Growth This Month</h3>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">+6%</div>
                </div>
              </div>
              <div className="flex justify-between h-10">
                {skillGrowthData.map((point, i) => (
                  <div key={i} className="flex flex-col items-center justify-end h-full">
                    <div 
                      className="w-4 bg-blue-500 rounded-t"
                      style={{ height: `${point.value * 0.2}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{point.month}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Interactive Skills Dashboard */}
        <section className="mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-grubble-500/10 to-teal-500/10 p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-grubble-500" />
                Interactive Skills Dashboard
              </h2>
            </div>
            
            <Tabs defaultValue={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
                <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-md">
                  {skillCategories.map(category => (
                    <TabsTrigger 
                      key={category.id}
                      value={category.id.toString()}
                      className="rounded-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <div className="p-6">
                {skillCategories.map(category => (
                  <TabsContent key={category.id} value={category.id.toString()}>
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                      className="space-y-6"
                    >
                      {category.skills.map((skill, index) => (
                        <motion.div 
                          key={index} 
                          variants={fadeIn} 
                          className="group p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grubble-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                                {skill.name.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                                {skill.certified && (
                                  <Badge className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 text-xs">
                                    ✓ Certified
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {skill.level}%
                              </span>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {skill.level > 75 ? 'Expert' : skill.level > 50 ? 'Intermediate' : 'Beginner'}
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <Progress 
                              value={skill.level} 
                              className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full" 
                              indicatorClassName={`transition-all duration-500 rounded-full ${
                                skill.level > 75 ? "bg-gradient-to-r from-green-400 to-green-600" : 
                                skill.level > 50 ? "bg-gradient-to-r from-blue-400 to-blue-600" : 
                                "bg-gradient-to-r from-grubble-400 to-grubble-600"
                              }`}
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                              {skill.level}%
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </section>
        
        {/* Achievements & Credentials Tabs */}
        <section className="mb-8">
          <Tabs defaultValue="achievements">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-md">
                <TabsTrigger value="achievements" className="rounded-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="credentials" className="rounded-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  Credentials
                </TabsTrigger>
                <TabsTrigger value="platforms" className="rounded-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  Connected Platforms
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="achievements">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {achievements.map((achievement) => (
                  <motion.div 
                    key={achievement.id}
                    variants={fadeIn}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                        {achievement.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{achievement.date}</span>
                      <Badge className="bg-grubble-500">{achievement.points} XP</Badge>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="credentials">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-4"
              >
                {credentials.map((credential) => (
                  <motion.div 
                    key={credential.id}
                    variants={fadeIn}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <img 
                          src={credential.image} 
                          alt={credential.issuer} 
                          className="h-16 w-16 rounded-md object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{credential.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Issued by {credential.issuer} • {credential.date}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {credential.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-700">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-200 dark:border-gray-600"
                          onClick={handleShareProfile}
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-grubble-500 hover:bg-grubble-600 text-white"
                          onClick={() => handleDownloadCertificate(credential.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="platforms">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Connect your learning platforms to automatically import your skills and credentials.
                </p>
                
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {connectedPlatforms.map((platform, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeIn}
                      className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center">
                        <img 
                          src={platform.icon} 
                          alt={platform.name} 
                          className="h-10 w-10 rounded-md object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{platform.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {platform.connected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      
                      {platform.connected ? (
                        <Button 
                          variant="outline" 
                          className="border-gray-200 dark:border-gray-600"
                          onClick={() => handleDisconnectPlatform(platform.name)}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          className="bg-grubble-500 hover:bg-grubble-600 text-white"
                          onClick={() => handleConnectPlatform(platform.name)}
                        >
                          Connect
                        </Button>
                      )}
                    </motion.div>
                  ))}
                  
                  <motion.div variants={fadeIn} className="mt-6">
                    <Button variant="outline" className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 py-6">
                      <Plus className="h-5 w-5 mr-2" />
                      Connect another platform
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkillWallet;
