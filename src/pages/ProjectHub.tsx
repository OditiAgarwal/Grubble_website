import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Cpu, 
  Palette,
  Brain,
  Shield,
  Cloud,
  Gamepad2,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  ArrowRight,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

// Sample project data with more projects
const sampleProjects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "Build a full-stack e-commerce platform with React, Node.js, and MongoDB. Includes payment integration, user authentication, and admin dashboard.",
    category: "Web Development",
    difficulty: "Intermediate",
    duration: "6-8 weeks",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    icon: <Globe className="h-6 w-6" />,
    rating: 4.8,
    participants: 1240,
    features: ["User Authentication", "Payment Gateway", "Admin Panel", "Product Catalog", "Order Management"],
    learningOutcomes: ["Full-stack development", "Database design", "API integration", "State management"]
  },
  {
    id: 2,
    title: "Mobile Fitness App",
    description: "Create a React Native fitness tracking app with workout plans, progress tracking, and social features.",
    category: "Mobile Development",
    difficulty: "Advanced",
    duration: "8-10 weeks",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    icon: <Smartphone className="h-6 w-6" />,
    rating: 4.7,
    participants: 890,
    features: ["Workout Tracking", "Progress Analytics", "Social Feed", "Nutrition Plans", "Offline Mode"],
    learningOutcomes: ["Mobile development", "State management", "Firebase integration", "UI/UX design"]
  },
  {
    id: 3,
    title: "AI Chatbot",
    description: "Develop an intelligent chatbot using Python and natural language processing libraries.",
    category: "AI/ML",
    difficulty: "Advanced",
    duration: "4-6 weeks",
    technologies: ["Python", "TensorFlow", "NLP", "Flask"],
    icon: <Brain className="h-6 w-6" />,
    rating: 4.9,
    participants: 567,
    features: ["Natural Language Processing", "Intent Recognition", "Context Awareness", "Multi-language Support"],
    learningOutcomes: ["Machine learning", "NLP techniques", "API development", "Model training"]
  },
  {
    id: 4,
    title: "Task Management System",
    description: "Build a comprehensive task management application with team collaboration features.",
    category: "Web Development",
    difficulty: "Beginner",
    duration: "3-4 weeks",
    technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
    icon: <Target className="h-6 w-6" />,
    rating: 4.5,
    participants: 2100,
    features: ["Task Creation", "Priority Levels", "Due Dates", "Progress Tracking", "Team Assignments"],
    learningOutcomes: ["DOM manipulation", "Local storage", "Event handling", "Responsive design"]
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Create a stunning personal portfolio website to showcase your projects and skills.",
    category: "Web Design",
    difficulty: "Beginner",
    duration: "2-3 weeks",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    icon: <Palette className="h-6 w-6" />,
    rating: 4.6,
    participants: 3200,
    features: ["Responsive Design", "Smooth Animations", "Contact Form", "Project Gallery", "Blog Section"],
    learningOutcomes: ["Web design principles", "CSS animations", "Responsive layouts", "SEO basics"]
  },
  {
    id: 6,
    title: "Data Visualization Dashboard",
    description: "Build an interactive dashboard for data visualization using D3.js and Python.",
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "5-7 weeks",
    technologies: ["Python", "D3.js", "Pandas", "Flask", "Chart.js"],
    icon: <Database className="h-6 w-6" />,
    rating: 4.7,
    participants: 780,
    features: ["Interactive Charts", "Real-time Data", "Export Functions", "Custom Filters", "Multiple Data Sources"],
    learningOutcomes: ["Data processing", "Visualization techniques", "API development", "Statistical analysis"]
  },
  {
    id: 7,
    title: "Cryptocurrency Tracker",
    description: "Develop a real-time cryptocurrency tracking application with price alerts and portfolio management.",
    category: "Finance Tech",
    difficulty: "Intermediate",
    duration: "4-5 weeks",
    technologies: ["React", "Node.js", "WebSocket", "Chart.js", "CoinGecko API"],
    icon: <TrendingUp className="h-6 w-6" />,
    rating: 4.8,
    participants: 1100,
    features: ["Real-time Prices", "Portfolio Tracking", "Price Alerts", "Historical Data", "News Feed"],
    learningOutcomes: ["API integration", "Real-time updates", "Data visualization", "Financial calculations"]
  },
  {
    id: 8,
    title: "Weather App",
    description: "Create a beautiful weather application with location-based forecasts and interactive maps.",
    category: "Web Development",
    difficulty: "Beginner",
    duration: "2-3 weeks",
    technologies: ["JavaScript", "Weather API", "Geolocation", "CSS3"],
    icon: <Cloud className="h-6 w-6" />,
    rating: 4.4,
    participants: 2800,
    features: ["Current Weather", "5-day Forecast", "Location Search", "Weather Maps", "Offline Storage"],
    learningOutcomes: ["API consumption", "Geolocation services", "Async programming", "Error handling"]
  },
  {
    id: 9,
    title: "Game Development",
    description: "Build a 2D platformer game using Unity and C# with level progression and scoring system.",
    category: "Game Development",
    difficulty: "Advanced",
    duration: "8-12 weeks",
    technologies: ["Unity", "C#", "2D Graphics", "Audio"],
    icon: <Gamepad2 className="h-6 w-6" />,
    rating: 4.9,
    participants: 650,
    features: ["Character Movement", "Level Design", "Scoring System", "Sound Effects", "Power-ups"],
    learningOutcomes: ["Game mechanics", "Physics simulation", "Audio integration", "User interface design"]
  },
  {
    id: 10,
    title: "Cybersecurity Scanner",
    description: "Develop a network security scanner to identify vulnerabilities and generate reports.",
    category: "Cybersecurity",
    difficulty: "Advanced",
    duration: "6-8 weeks",
    technologies: ["Python", "Nmap", "Security Libraries", "Report Generation"],
    icon: <Shield className="h-6 w-6" />,
    rating: 4.8,
    participants: 420,
    features: ["Port Scanning", "Vulnerability Detection", "Report Generation", "Network Mapping", "Risk Assessment"],
    learningOutcomes: ["Network security", "Ethical hacking", "Report writing", "Risk analysis"]
  },
  {
    id: 11,
    title: "Recipe Sharing Platform",
    description: "Create a social platform for sharing and discovering recipes with user ratings and reviews.",
    category: "Web Development",
    difficulty: "Intermediate",
    duration: "5-6 weeks",
    technologies: ["Vue.js", "Firebase", "Vuex", "CSS3"],
    icon: <Users className="h-6 w-6" />,
    rating: 4.6,
    participants: 950,
    features: ["Recipe Upload", "User Reviews", "Search & Filter", "Favorites", "Social Feed"],
    learningOutcomes: ["Vue.js framework", "Firebase integration", "Social features", "Content management"]
  },
  {
    id: 12,
    title: "IoT Home Automation",
    description: "Build a smart home automation system using Arduino and mobile app control.",
    category: "IoT",
    difficulty: "Advanced",
    duration: "10-12 weeks",
    technologies: ["Arduino", "React Native", "WiFi Modules", "Sensors"],
    icon: <Cpu className="h-6 w-6" />,
    rating: 4.9,
    participants: 340,
    features: ["Device Control", "Sensor Monitoring", "Mobile App", "Automation Rules", "Energy Monitoring"],
    learningOutcomes: ["IoT development", "Hardware programming", "Mobile integration", "System design"]
  }
];

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Data Science",
  "Game Development",
  "Cybersecurity",
  "IoT",
  "Web Design",
  "Finance Tech"
];

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const ProjectHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Project Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Discover hands-on projects to build your skills, collaborate with others, and create an impressive portfolio that showcases your abilities.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {sampleProjects.length} projects
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-grubble-100 dark:bg-grubble-900/20 rounded-lg text-grubble-600 dark:text-grubble-400">
                        {project.icon}
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-grubble-600 dark:group-hover:text-grubble-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      {project.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.participants}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {project.duration}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Key Features:</h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-grubble-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-grubble-500 hover:bg-grubble-600 text-white">
                      Start Project
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </main>
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default ProjectHub;