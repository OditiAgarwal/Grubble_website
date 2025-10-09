
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CareerPathsSection } from '@/components/home/CareerPathsSection';
import { AboutUsSection } from '@/components/home/AboutUsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import ChatBot from '@/components/ChatBot';
import SkillRoadmap from '@/components/roadmap/SkillRoadmap';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <SkillRoadmap />
      <FeaturesSection />
      <CareerPathsSection />
      <AboutUsSection />
      <TestimonialsSection />
      <CTASection />
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Home;
