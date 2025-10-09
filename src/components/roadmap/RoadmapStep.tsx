
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoadmapStepProps {
  step: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  isLast?: boolean;
}

const RoadmapStep = ({ step, title, description, Icon, isLast }: RoadmapStepProps) => {
  return (
    <motion.div 
      className="flex flex-1 flex-col items-center relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
    >
      <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-center space-y-2">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Step {step}
        </span>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[200px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default RoadmapStep;
