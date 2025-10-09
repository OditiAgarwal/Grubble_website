
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Book, LineChart, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const careerPaths = [
  {
    title: "Web Development",
    description: "Master full-stack development, from JavaScript to React, Node.js, and modern frameworks.",
    icon: <Sparkles className="h-10 w-10 text-grubble-500" />,
    color: "bg-grubble-50",
    link: "/learning-roadmap"
  },
  {
    title: "Data Science",
    description: "Learn Python, statistics, machine learning, and data visualization for data-driven decisions.",
    icon: <LineChart className="h-10 w-10 text-teal-600" />,
    color: "bg-teal-50",
    link: "/learning-roadmap"
  },
  {
    title: "Product Management",
    description: "Develop the skills to lead product strategy, roadmaps, and cross-functional teams.",
    icon: <Calendar className="h-10 w-10 text-grubble-500" />,
    color: "bg-grubble-50",
    link: "/learning-roadmap"
  },
  {
    title: "UX/UI Design",
    description: "Create engaging user experiences through research, design thinking, and prototyping.",
    icon: <MessageSquare className="h-10 w-10 text-teal-600" />,
    color: "bg-teal-50",
    link: "/learning-roadmap"
  }
];

export const CareerPathsSection = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handlePathClick = (path: string) => {
    if (!isLoggedIn) {
      toast.error("Please login to access this feature");
      navigate('/login');
      return;
    }
    navigate(path);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Career Paths</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover learning journeys designed to help you reach your career goals, from beginner to expert.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careerPaths.map((path, index) => (
            <motion.div
              key={path.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className={`${path.color} rounded-xl p-8 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => handlePathClick(path.link)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  {path.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                  <p className="mt-2 text-gray-600">{path.description}</p>
                  <div 
                    className="mt-4 inline-flex items-center text-grubble-500 hover:text-grubble-600 font-medium"
                  >
                    Explore path <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* <div className="mt-12 text-center">
          <Link to="">
            <Button variant="outline" className="border-grubble-500 text-grubble-500 hover:bg-grubble-50">
              Join Community
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};
