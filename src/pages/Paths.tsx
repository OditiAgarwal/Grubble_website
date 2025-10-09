
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, ArrowDownUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GradientButton } from '@/components/ui/gradient-button';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample data for career paths
const careerPaths = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Learn modern web development techniques and frameworks to create responsive user interfaces.",
    courseCount: 12,
    skills: ["HTML", "CSS", "JavaScript", "React", "Vue", "TypeScript"],
    level: "Beginner to Advanced",
    duration: "6 months",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=300&q=80"
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Master data analysis, machine learning, and visualization techniques for in-demand data science roles.",
    courseCount: 18,
    skills: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization", "Big Data"],
    level: "Intermediate",
    duration: "8 months",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=300&q=80"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    description: "Develop skills in user research, interaction design, and prototyping to create amazing user experiences.",
    courseCount: 10,
    skills: ["Figma", "Sketch", "User Research", "Prototyping", "Information Architecture"],
    level: "Beginner to Intermediate",
    duration: "5 months",
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=600&h=300&q=80"
  },
  {
    id: 4,
    title: "Cloud Engineer",
    description: "Learn to design, implement and manage cloud infrastructure using leading platforms and technologies.",
    courseCount: 15,
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps", "CI/CD"],
    level: "Intermediate to Advanced",
    duration: "7 months",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&h=300&q=80"
  },
  {
    id: 5,
    title: "Product Manager",
    description: "Develop product management skills to drive innovation and create successful products.",
    courseCount: 9,
    skills: ["Product Strategy", "User Stories", "Roadmapping", "Analytics", "Agile", "Leadership"],
    level: "Intermediate",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=300&q=80"
  }
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

const Paths = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [level, setLevel] = useState('all');
  const [filteredPaths, setFilteredPaths] = useState(careerPaths);

  // Filter paths based on search term and level
  const filterPaths = () => {
    return careerPaths.filter(path => {
      const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            path.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLevel = level === 'all' || path.level.toLowerCase().includes(level.toLowerCase());
      
      return matchesSearch && matchesLevel;
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredPaths(filterPaths());
  };

  // Handle level filter change
  const handleLevelChange = (value: string) => {
    setLevel(value);
    setFilteredPaths(filterPaths());
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setLevel('all');
    setFilteredPaths(careerPaths);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-grubble-500 to-teal-600 rounded-xl p-8 md:p-12 text-white">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Career Path</h1>
                <p className="text-lg md:text-xl mb-6 text-white/90">
                  Discover curated learning paths designed by industry experts to help you achieve your career goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-grubble-600 hover:bg-white/90">
                    Browse Paths
                  </Button>
                  <Link to="/career-assessment">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-semibold text-purple-100">
                      Take Career Assessment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* Search and Filters */}
          <section className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search by path name, skill, or keyword..."
                    className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Tabs value={level} onValueChange={handleLevelChange} className="w-full sm:w-auto">
                    <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-md w-full">
                      <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 rounded-sm">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="beginner" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 rounded-sm">
                        Beginner
                      </TabsTrigger>
                      <TabsTrigger value="intermediate" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 rounded-sm">
                        Intermediate
                      </TabsTrigger>
                      <TabsTrigger value="advanced" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 rounded-sm">
                        Advanced
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {(searchTerm || level !== 'all') && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                    >
                      <X size={16} className="mr-1" /> Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* Career Paths Grid */}
          <section>
            {filteredPaths.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPaths.map((path) => (
                  <motion.div 
                    key={path.id}
                    variants={fadeIn}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40">
                      <img 
                        src={path.image} 
                        alt={path.title} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center text-white">
                          <span className="text-xs font-medium bg-black/40 px-2 py-1 rounded flex items-center">
                            {path.duration}
                          </span>
                          <span className="ml-2 text-xs font-medium bg-black/40 px-2 py-1 rounded flex items-center">
                            {path.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{path.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{path.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {path.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-700 text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {path.skills.length > 4 && (
                            <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700 text-xs">
                              +{path.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {path.courseCount} courses
                        </span>
                        <Link to={`/paths/${path.id}`}>
                          <GradientButton size="sm">
                            View Path
                          </GradientButton>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No paths found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We couldn't find any paths matching your criteria.
                </p>
                <Button onClick={clearFilters} className="bg-grubble-500 hover:bg-grubble-600 text-white">
                  Clear Filters
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Paths;
