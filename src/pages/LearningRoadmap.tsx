
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillsInput from '@/components/roadmap/SkillsInput';
import CareerPathSelect from '@/components/roadmap/CareerPathSelect';
import SkillRoadmap from '@/components/roadmap/SkillRoadmap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generateRoadmap } from '@/data/roadmapData';
import { Book, Target, BarChart3, GraduationCap, CheckSquare } from 'lucide-react';

const LearningRoadmap = () => {
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [careerPath, setCareerPath] = useState<string>('');
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [isRoadmapGenerated, setIsRoadmapGenerated] = useState(false);

  const handleGenerateRoadmap = () => {
    if (userSkills.length === 0 || !careerPath) return;

    const generatedRoadmap = generateRoadmap(userSkills, careerPath);
    setRoadmap(generatedRoadmap);
    setIsRoadmapGenerated(true);
  };

  const resetForm = () => {
    setUserSkills([]);
    setCareerPath('');
    setRoadmap([]);
    setIsRoadmapGenerated(false);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Define the default roadmap steps for visualization
  const defaultSteps = [
    {
      Icon: Book,
      title: "Current Skills",
      description: "Share your existing skills"
    },
    {
      Icon: Target,
      title: "Career Goal",
      description: "Choose your target role"
    },
    {
      Icon: BarChart3,
      title: "Gap Analysis",
      description: "Identify missing skills"
    },
    {
      Icon: GraduationCap,
      title: "Learning Path",
      description: "Get course recommendations"
    },
    {
      Icon: CheckSquare,
      title: "Track Progress",
      description: "Monitor your journey"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-28 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Personalized Learning Roadmap
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-lg text-gray-600 dark:text-gray-300"
            >
              Discover the skills you need to achieve your career goals
            </motion.p>
          </div>

          {!isRoadmapGenerated ? (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-12"
              >
                {/* Visualization of the roadmap process */}
                <div className="absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
                
                <motion.div 
                  className="relative flex flex-wrap md:flex-nowrap justify-between items-start gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {defaultSteps.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="flex flex-1 flex-col items-center relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg mb-4">
                        <step.Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-center space-y-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          Step {index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[200px]">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="max-w-3xl mx-auto"
              >
                <Card>
                  <CardContent className="p-6">
                    <motion.div variants={fadeIn} className="mb-6">
                      <SkillsInput 
                        skills={userSkills}
                        setSkills={setUserSkills}
                        label="What skills do you currently have?"
                        placeholder="e.g., JavaScript, Python, React"
                      />
                    </motion.div>
                    
                    <motion.div variants={fadeIn} className="mb-8">
                      <CareerPathSelect 
                        value={careerPath}
                        onChange={setCareerPath}
                      />
                    </motion.div>
                    
                    <motion.div variants={fadeIn} className="flex justify-center">
                      <Button 
                        onClick={handleGenerateRoadmap}
                        className="w-full sm:w-auto bg-grubble-500 hover:bg-grubble-600 text-white"
                        disabled={userSkills.length === 0 || !careerPath}
                      >
                        Generate My Roadmap
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-xl font-semibold">Results for: {
                    careerPath && careerPath.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')
                  }</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on your {userSkills.length} existing skills
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="self-start"
                >
                  Start Over
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <SkillRoadmap roadmap={roadmap} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningRoadmap;
