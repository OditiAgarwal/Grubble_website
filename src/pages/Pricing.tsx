
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  highlighted = false,
  trialDays = 0,
  planId
}: { 
  title: string;
  price?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  trialDays?: number;
  planId: string;
}) => (
  <div className={`p-6 rounded-xl border ${
    highlighted 
      ? 'border-primary/50 bg-primary/5 dark:bg-primary/10' 
      : 'border-border bg-card dark:bg-gray-800'
  }`}>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    {price && (
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
      </div>
    )}
    <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
    {trialDays > 0 && (
      <div className="mb-4 bg-green-100 dark:bg-green-900/20 p-3 rounded-lg text-green-800 dark:text-green-300 text-sm">
        Try free for {trialDays} days. No credit card required until trial ends.
      </div>
    )}
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    <Link to={`/payment/${planId}`}>
      <Button className="w-full" variant={highlighted ? "default" : "outline"}>
        {price ? "Choose Plan" : "Contact Sales"}
      </Button>
    </Link>
  </div>
);

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto pt-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Select the perfect plan for your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingTier
              title="Free Plan"
              price="₹0"
              description="Perfect for students and learners starting their journey"
              features={[
                "Limited access to personalized learning modules",
                "Basic resume builder (export as PDF)",
                "Career roadmap for one role",
                "Access to community forums",
                "Limited job/internship postings",
                "Weekly skill-based newsletter",
                "1 mock interview/month",
                "AI-based quiz & progress tracking (limited attempts)"
              ]}
              planId="free"
            />

            <PricingTier
              title="Premium Plan (Grubble Plus)"
              price="₹299/month"
              description="For users serious about getting job-ready faster"
              highlighted={true}
              trialDays={7}
              features={[
                "Full access to all AI-personalized learning paths",
                "Advanced resume builder with expert templates",
                "Multiple career role roadmaps with milestones",
                "Unlimited mock interviews with feedback",
                "Direct recruiter connect & early access to jobs",
                "Real-time industry trend dashboards",
                "Access to mentor sessions & alumni Q&A",
                "AI career coach chatbot (24/7)",
                "Skill certification badges"
              ]}
              planId="premium"
            />

            <PricingTier
              title="Recruiter/Partner Plan"
              description="For companies & institutions looking to hire or collaborate"
              features={[
                "Access to filtered job-ready candidates",
                "Posting jobs/internships with custom filters",
                "Dashboard for candidate analytics",
                "Brand visibility on Grubble's career ecosystem",
                "Collaboration on workshops and events"
              ]}
              planId="recruiter"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
