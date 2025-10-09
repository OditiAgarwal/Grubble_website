
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Join Our Team</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center">
            Help us shape the future of online education and career development
          </p>

          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Senior Full Stack Developer</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We're looking for an experienced developer to help build and scale our platform.
              </p>
              <Button className="w-full sm:w-auto">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Product Designer</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join us in creating intuitive and engaging user experiences.
              </p>
              <Button className="w-full sm:w-auto">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
