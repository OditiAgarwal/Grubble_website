
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Target, Lightbulb } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const AboutUsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="bg-gradient-to-r from-grubble-500 to-teal-600 bg-clip-text text-transparent">Grubble</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              We're transforming career growth through AI-powered learning pathways tailored to each individual's goals and potential. Our mission is to democratize access to quality education and career advancement opportunities.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Founded by a team of educators, technologists, and career development experts, we believe in personalized learning that adapts to your unique journey.
            </p>
            <Link to="/about">
              <Button className="bg-grubble-500 hover:bg-grubble-600 text-white">
                Learn More About Us
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="h-12 w-12 bg-grubble-100 dark:bg-grubble-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-grubble-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Our Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join thousands of learners on their career growth journey
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Personalized learning paths for every career goal
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm sm:col-span-2">
              <div className="h-12 w-12 bg-grubble-100 dark:bg-grubble-900 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-grubble-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cutting-edge AI technology to match your learning style and career aspirations
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
