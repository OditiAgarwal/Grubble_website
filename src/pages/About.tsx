import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, Lightbulb, Rocket, Award, ChevronRight, Linkedin, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/gradient-button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const teamMembers = [
  {
    name: "Latika Mukhi",
    role: "CEO",
    image: "./photos/latika.jpg",
    bio: "Visionary leader. Passionate about democratizing quality education through AI-powered learning platforms.",
    social: {
        linkedin: "http://linkedin.com/in/latika-mukhi-08b106250/",
      github: "http://github.com/LatikaMukhi"
    }
  },
  {
    name: "Oditi Agarwal",
    role: "Head of Product",
    image: "./photos/oditi.jpg",
    bio: "Product strategist. Expert in user experience design and product-market fit for educational platforms.",
    social: {
     linkedin: "https://www.linkedin.com/in/oditi-agarwal/",
      github: "https://github.com/OditiAgarwal"
    }
  },
  {
    name: "Astha Sharma",
    role: "CTO",
    image: "./photos/astha.jpg",
    bio: "AI researcher and tech innovator. Specialized in machine learning applications for personalized learning experiences and career development.",
    social: {
     linkedin: "http://www.linkedin.com/in/astha-sharma-105314265",
      github: "http://github.com/astha-2003"
    }
  }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                About <span className="bg-gradient-to-r from-grubble-500 to-teal-600 bg-clip-text text-transparent">Grubble</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8"
              >
                We're on a mission to transform career growth through AI-powered learning pathways tailored to each individual's goals and potential.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 relative max-w-5xl mx-auto"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Grubble team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="order-2 lg:order-1"
              >
                <motion.h2 
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Our Story
                </motion.h2>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-lg text-gray-600 dark:text-gray-400 mb-4"
                >
                  Grubble was founded in 2022 by a team of educators, technologists, and career development experts who saw a gap in the traditional learning and career advancement model.
                </motion.p>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-lg text-gray-600 dark:text-gray-400 mb-4"
                >
                  We realized that the one-size-fits-all approach to education wasn't working in a rapidly changing job market where personalization and adaptability are key to success.
                </motion.p>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-lg text-gray-600 dark:text-gray-400 mb-6"
                >
                  By leveraging AI and data science, we've created a platform that evolves with each learner, providing customized pathways that align with their unique career goals, learning styles, and industry trends.
                </motion.p>
                
                <motion.div variants={fadeIn}>
                  <Link to="/about/team">
                    <Button variant="outline" className="text-grubble-600 border-grubble-200 hover:bg-grubble-50">
                      Meet Our Team
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                      alt="Grubble founding team" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-grubble-500 to-teal-600 rounded-xl p-4 shadow-lg">
                    <p className="text-white font-medium">Founded in 2022</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Meet Our Team
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-600 dark:text-gray-400"
              >
                The passionate individuals behind Grubble's mission to transform career growth through technology.
              </motion.p>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.name}
                  variants={fadeIn}
                  className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className="mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                    <p className="text-grubble-500 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-grubble-500 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    
                    {member.social.github && (
                      <a href={member.social.github} className="text-gray-400 hover:text-grubble-500 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Our Mission Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Our Mission & Values
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-600 dark:text-gray-400"
              >
                We're committed to democratizing career advancement through personalized learning, cutting-edge technology, and community support.
              </motion.p>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div 
                variants={fadeIn} 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-grubble-100 dark:bg-grubble-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-grubble-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personalization</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe that learning should be tailored to individual goals, learning styles, and career aspirations.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Accessibility</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Quality education and career growth resources should be accessible to everyone, regardless of background.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-grubble-100 dark:bg-grubble-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Lightbulb className="h-6 w-6 text-grubble-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We continuously evolve our platform with cutting-edge AI technology to stay ahead of industry trends.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Rocket className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Growth Mindset</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We foster a culture that embraces challenges, persists in obstacles, and sees effort as a path to mastery.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-grubble-100 dark:bg-grubble-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-grubble-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Excellence</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to excellence in our content, technology, and service to help learners achieve their full potential.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Community</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in the power of collaborative learning and supporting each other along the career journey.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-grubble-500 to-teal-600 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Ready to Start Your Career Growth Journey?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-white/90 mb-8"
              >
                Join thousands of professionals who are accelerating their careers with AI-powered learning paths tailored to their goals.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-grubble-600 hover:bg-gray-100">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
