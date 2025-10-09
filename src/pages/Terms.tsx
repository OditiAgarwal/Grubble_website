
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-grubble dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing or using Grubble's platform, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Accounts</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>You must be 13 years or older to use this service</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>Your account must not be used for any illegal purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Content and Conduct</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Users are responsible for their conduct and content when using our platform.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
