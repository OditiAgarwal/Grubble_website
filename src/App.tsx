
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import ScrollToTop from '@/components/ScrollToTop';

// Import pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import CareerAssessment from '@/pages/CareerAssessment';
import CourseComparison from '@/pages/CourseComparison';
import Gamification from '@/pages/Gamification';
import SkillWallet from '@/pages/SkillWallet';
import Resume from '@/pages/Resume';
import Pricing from '@/pages/Pricing';
import Payment from '@/pages/Payment';
import Paths from '@/pages/Paths';
import LearningRoadmap from '@/pages/LearningRoadmap';
import Community from '@/pages/Community';
import CommunityNetwork from '@/pages/CommunityNetwork';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import ChatBot from '@/components/ChatBot';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <AuthProvider>
            <ScrollToTop />
            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/paths" element={<Community />} />
                <Route path="/community" element={<CommunityNetwork />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/profile/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
                <Route path="/career-assessment" element={<CareerAssessment />} />
                <Route path="/course-comparison" element={<CourseComparison />} />
                <Route path="/gamification" element={<ProtectedRoute><Gamification /></ProtectedRoute>} />
                <Route path="/skill-wallet" element={<ProtectedRoute><SkillWallet /></ProtectedRoute>} />
                <Route path="/learning-roadmap" element={<LearningRoadmap />} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <ChatBot />
            <Toaster />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
