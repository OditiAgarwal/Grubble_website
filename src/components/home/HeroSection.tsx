
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/gradient-button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const HeroSection = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="absolute top-0 left-1/2 right-0 -z-10 -translate-x-1/2 transform-gpu overflow-hidden blur-3xl sm:top-0">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Discover Your <span className="bg-gradient-to-r from-grubble-500 to-teal-600 bg-clip-text text-transparent">Career Path</span> With AI Guidance
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0"
            >
              Grubble uses AI to map your skills, interests, and goals to personalized learning paths and career opportunities. Start your journey today.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {isLoggedIn ? (
                <GradientButton 
                  size="lg" 
                  onClick={() => navigate('/learning-roadmap')}
                >
                  Get Your Roadmap <ArrowRight className="ml-2 h-5 w-5" />
                </GradientButton>
              ) : (
                <GradientButton 
                  size="lg" 
                  onClick={() => navigate('/signup')}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </GradientButton>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className="border-grubble-500 text-grubble-500 hover:bg-grubble-50"
                onClick={() => navigate('')}
              >
                Explore Paths
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                onClick={() => navigate('/pricing')}
              >
                <Zap className="mr-2 h-4 w-4 text-purple-600" />
                Try Premium
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-grubble-500 to-teal-600 opacity-30 blur"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                  alt="Career development"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
