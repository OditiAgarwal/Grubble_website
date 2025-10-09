
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmartSuggestions from '@/components/SmartSuggestions';
import PeerMatchmaking from '@/components/PeerMatchmaking';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Community = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Connect with fellow learners, discover project suggestions tailored to your skills, 
              and find the perfect collaboration partners for your next project.
            </p>
          </div>

          <Tabs defaultValue="suggestions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
              <TabsTrigger value="matchmaking">Find Partners</TabsTrigger>
            </TabsList>
            
            <TabsContent value="suggestions" className="space-y-6">
              <SmartSuggestions />
            </TabsContent>
            
            <TabsContent value="matchmaking" className="space-y-6">
              <PeerMatchmaking />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
