
import { motion } from 'framer-motion';
import { Book, CheckSquare, Award, CircleCheck, Target, BarChart3, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import RoadmapStep from './RoadmapStep';

interface SkillRoadmapProps {
  roadmap?: { skill: string; courses: any[] }[];
}

const SkillRoadmap = ({ roadmap }: SkillRoadmapProps = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  
  const handleStepCompletion = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      const points = 50; // Points earned per completion
      setCompletedSteps([...completedSteps, stepIndex]);
      setTotalPoints(totalPoints + points);
      toast({
        title: "Step Completed! 🎉",
        description: `You earned ${points} points! Total: ${totalPoints + points} points`,
      });
    }
  };

  if (roadmap && roadmap.length > 0) {
    return (
      <div className="space-y-12">
        {/* Points Display */}
        <div className="flex justify-end items-center gap-2 text-primary">
          <Award className="w-6 h-6" />
          <span className="font-bold text-lg">{totalPoints} Points</span>
        </div>

        {/* Horizontal Roadmap Visualization */}
        <div className="relative py-8 overflow-x-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-300 dark:border-gray-600 -translate-y-1/2" />
          
          <div className="relative flex justify-start items-center min-w-max px-4 gap-16">
            {roadmap.map((item, index) => (
              <Popover key={index}>
                <PopoverTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative z-10 flex flex-col items-center cursor-pointer"
                  >
                    <div className={`bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg mb-4 transition-colors hover:shadow-xl ${
                      completedSteps.includes(index) ? 'ring-2 ring-green-500' : 'hover:ring-2 hover:ring-primary/50'
                    }`}>
                      {completedSteps.includes(index) ? (
                        <CircleCheck className="w-6 h-6 text-green-500" />
                      ) : index === 0 ? (
                        <Book className="w-6 h-6 text-primary" />
                      ) : index === roadmap.length - 1 ? (
                        <CheckSquare className="w-6 h-6 text-primary" />
                      ) : (
                        <Book className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="text-center space-y-2 w-48">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        Step {index + 1}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.skill}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Hover to see courses
                      </p>
                    </div>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" side="top">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{item.skill}</h4>
                      {!completedSteps.includes(index) && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStepCompletion(index)}
                          className="gap-2"
                        >
                          <CircleCheck className="w-4 h-4" />
                          Complete
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Recommended courses for {item.skill}:
                      </p>
                      {item.courses.slice(0, 4).map((course, courseIndex) => (
                        <div 
                          key={courseIndex}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-sm line-clamp-2">{course.title}</h5>
                            <a 
                              href={course.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:text-primary/80 ml-2"
                            >
                              View →
                            </a>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                              {course.provider}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {course.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {course.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete all steps to master your chosen career path!
          </p>
        </div>
      </div>
    );
  }

  // Default roadmap steps shown on the homepage
  const steps = [
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
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Your Learning Journey</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl">
            Follow these steps to create your personalized learning roadmap and achieve your career goals
          </p>
        </motion.div>

        <div className="relative">
          {/* Dotted path connecting the steps */}
          <div className="absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
          
          <motion.div 
            className="relative flex flex-wrap md:flex-nowrap justify-between items-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {steps.map((step, index) => (
              <RoadmapStep
                key={index}
                step={index + 1}
                Icon={step.Icon}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
              />
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={() => navigate('/learning-roadmap')}
          >
            Get Your Roadmap
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillRoadmap;
