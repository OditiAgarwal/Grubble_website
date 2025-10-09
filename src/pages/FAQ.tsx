
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { Search, MessageCircle, BookOpen, Users, Award, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      items: [
        {
          question: "How do I get started with Grubble?",
          answer: "Sign up for a free account, complete your profile, and explore our learning paths. You can start with beginner-friendly courses and progress at your own pace."
        },
        {
          question: "Are the courses self-paced?",
          answer: "Yes, all courses are self-paced. You can learn at your own speed and revisit content as needed."
        },
        {
          question: "What's the best way to begin my tech career journey?",
          answer: "Start with our career assessment to identify your ideal path, then follow the personalized roadmap we create for you."
        }
      ]
    },
    {
      icon: Award,
      title: "Certificates & Progress",
      color: "text-green-600",
      bgColor: "bg-green-100",
      items: [
        {
          question: "How do certificates work?",
          answer: "Upon completing a course, you'll receive a verified certificate that you can add to your profile and share on LinkedIn or other platforms."
        },
        {
          question: "How is my progress tracked?",
          answer: "Our AI system tracks your learning progress, completed modules, skill improvements, and provides detailed analytics on your dashboard."
        }
      ]
    },
    {
      icon: Zap,
      title: "Subscription Plans",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      items: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes limited access to personalized learning modules, a basic resume builder, career roadmap for one role, access to community forums, limited job postings, a weekly newsletter, one mock interview per month, and limited AI-based quiz tracking."
        },
        {
          question: "What additional benefits does the Premium Plan offer?",
          answer: "The Premium Plan includes full access to all AI-personalized learning paths, advanced resume tools, multiple career roadmaps, unlimited mock interviews with feedback, direct recruiter connections, industry trend dashboards, mentor sessions, AI career coaching, and skill certification badges."
        },
        {
          question: "Can I try Premium features before subscribing?",
          answer: "Yes, we offer a 7-day free trial of our Premium Plan. You'll get full access to all premium features during this period with no obligation to continue."
        }
      ]
    },
    {
      icon: Users,
      title: "Community & Support",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      items: [
        {
          question: "How can I connect with other learners?",
          answer: "Join our community forums, participate in study groups, and attend virtual networking events to connect with fellow learners and industry professionals."
        },
        {
          question: "Is there mentorship available?",
          answer: "Premium members get access to one-on-one mentor sessions with industry experts who can guide your career development."
        }
      ]
    }
  ];

  const allFAQs = faqCategories.flatMap(category => 
    category.items.map(item => ({ ...item, category: category.title }))
  );

  const filteredFAQs = searchTerm 
    ? allFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFAQs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-grubble-100 dark:bg-grubble-900/30 rounded-full mb-6">
              <MessageCircle className="h-8 w-8 text-grubble-600 dark:text-grubble-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Find answers to common questions about Grubble's features, plans, and how to get the most out of your learning journey.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-grubble-500 transition-colors"
              />
            </div>
          </motion.div>

          {/* FAQ Categories or Search Results */}
          {searchTerm ? (
            // Search Results
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Search Results ({filteredFAQs.length})
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`search-${index}`} className="border-none">
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <AccordionTrigger className="p-6 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {faq.question}
                          </h3>
                          <span className="text-sm text-grubble-600 dark:text-grubble-400">
                            {faq.category}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ) : (
            // Categories View
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg border-0">
                    <div className={`${category.bgColor} p-6`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-white/80 ${category.color}`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <h2 className={`text-2xl font-bold ${category.color}`}>
                          {category.title}
                        </h2>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible>
                        {category.items.map((item, itemIndex) => (
                          <AccordionItem 
                            key={itemIndex} 
                            value={`${categoryIndex}-${itemIndex}`} 
                            className="border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <span className="text-lg font-medium text-gray-900 dark:text-white text-left">
                                {item.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                {item.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-grubble-500 to-teal-600 rounded-2xl text-white"
          >
            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
            <p className="text-lg opacity-90 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-grubble-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/community"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Join Community
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
