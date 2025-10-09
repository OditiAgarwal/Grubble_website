
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden py-12 md:py-20 bg-grubble-50 dark:bg-grubble-900/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Unlock Premium Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get access to advanced features, personalized learning paths, and priority support.
            </p>
            <div className="flex flex-wrap gap-4">
              <GradientButton size="lg" onClick={() => navigate('/pricing')}>
                Get Started
              </GradientButton>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/paths')}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] lg:h-[400px] mt-8 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
              alt="Premium Features"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
