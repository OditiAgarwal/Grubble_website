
import { motion } from 'framer-motion';
import { Sparkles, Route, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Grubble Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our AI-powered platform creates personalized learning experiences tailored to your career goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/career-assessment')}
          >
            <div className="h-12 w-12 bg-grubble-100 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-grubble-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Assessment</h3>
            <p className="text-gray-600">
              Our AI analyzes your current skills and experience to identify strengths and growth opportunities.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/learning-roadmap')}
          >
            <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
              <Route className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Roadmap</h3>
            <p className="text-gray-600">
              Get custom learning paths with curated courses, projects, and resources matched to your goals.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/skill-wallet')}
          >
            <div className="h-12 w-12 bg-grubble-100 rounded-lg flex items-center justify-center mb-6">
              <LineChart className="h-6 w-6 text-grubble-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Course comparison</h3>
            <p className="text-gray-600">
                Discover the right courses for you by comparing curriculum, duration, and cost to accelerate your professional growth.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
