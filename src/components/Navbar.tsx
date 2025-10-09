import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, Users, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import DarkModeToggle from './DarkModeToggle';
import SearchBar from './SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-grubble-500 dark:text-grubble-400 overflow-hidden leading-none">
                <span className="inline-block animate-bounce">G</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>R</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>U</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>B</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>B</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>L</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>E</span>
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 transition-colors font-medium ${
                location.pathname === '/' ? 'text-grubble-500 dark:text-grubble-400' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/career-assessment"
              className={`text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 transition-colors font-medium ${
                location.pathname === '/career-assessment' ? 'text-grubble-500 dark:text-grubble-400' : ''
              }`}
            >
              Career Assessment
            </Link>
            <Link
              to="/learning-roadmap"
              className={`text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 transition-colors font-medium ${
                location.pathname === '/learning-roadmap' ? 'text-grubble-500 dark:text-grubble-400' : ''
              }`}
            >
              Roadmap
            </Link>
            <Link
              to="/course-comparison"
              className={`text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 transition-colors font-medium ${
                location.pathname === '/course-comparison' ? 'text-grubble-500 dark:text-grubble-400' : ''
              }`}
            >
              Course Comparison
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <DarkModeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <SearchBar />
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="px-3 py-2">
                <h1 className="text-xl font-bold text-grubble-500 dark:text-grubble-400 overflow-hidden leading-none">
                  <span className="inline-block animate-bounce">G</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>R</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>U</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>B</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>B</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>L</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>E</span>
                </h1>
              </div>
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/career-assessment"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/career-assessment' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Career Assessment
              </Link>
              <Link
                to="/learning-roadmap"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/learning-roadmap' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Roadmap
              </Link>
              <Link
                to="/course-comparison"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/course-comparison' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Course Comparison
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
