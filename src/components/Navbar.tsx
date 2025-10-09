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
              <h1 className="text-2xl font-bold overflow-hidden leading-none bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                <span className="inline-block animate-bounce">G</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>r</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>u</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>b</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>b</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>l</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>e</span>
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
              to="/course-comparison"
              className={`text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 transition-colors font-medium ${
                location.pathname === '/course-comparison' ? 'text-grubble-500 dark:text-grubble-400' : ''
              }`}
            >
              Course Comparison
            </Link>
            <Link
              to="/gamification"
              className={`text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 transition-colors font-medium ${
                location.pathname === '/gamification' ? 'text-grubble-500 dark:text-grubble-400' : ''
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/skill-wallet"
              className={`text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 transition-colors font-medium ${
                location.pathname === '/skill-wallet' ? 'text-grubble-500 dark:text-grubble-400' : ''
              }`}
            >
              Skill Wallet
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 font-medium">
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/profile/resume" className="flex items-center gap-2 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-grubble-50 dark:hover:bg-grubble-900/30">
                    <FileText className="h-4 w-4" />
                    Resume Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/community" className="flex items-center gap-2 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-grubble-50 dark:hover:bg-grubble-900/30">
                    <Users className="h-4 w-4" />
                    Community
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/paths" className="flex items-center gap-2 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-grubble-50 dark:hover:bg-grubble-900/30">
                    <Lightbulb className="h-4 w-4" />
                    Project Hub
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <DarkModeToggle />
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-grubble-500 text-grubble-500 dark:border-grubble-400 dark:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-grubble-500 hover:bg-grubble-600 text-white dark:bg-grubble-600 dark:hover:bg-grubble-700">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <SearchBar />
            <DarkModeToggle />
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
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
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && !isLoggedIn && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="px-3 py-2">
                <h1 className="text-xl font-bold overflow-hidden leading-none bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                  <span className="inline-block animate-bounce">G</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>r</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>u</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>b</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>b</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>l</span>
                  <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>e</span>
                </h1>
              </div>
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Home
              </Link
              >
              <Link
                to="/career-assessment"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/career-assessment' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Career Assessment
              </Link>
              <Link
                to="/course-comparison"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/course-comparison' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Course Comparison
              </Link>
              <Link
                to="/profile/resume"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/profile/resume' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Resume Builder
              </Link>
              <Link
                to="/community"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/community' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Community
              </Link>
              <Link
                to="/paths"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/paths' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Project Hub
              </Link>
              <Link
                to="/gamification"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/gamification' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Leaderboard
              </Link>
              <Link
                to="/skill-wallet"
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-grubble-500 dark:hover:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30 ${
                  location.pathname === '/skill-wallet' ? 'bg-grubble-50 dark:bg-grubble-900/30 text-grubble-500 dark:text-grubble-400' : ''
                }`}
              >
                Skill Wallet
              </Link>
              <div className="mt-4 flex flex-col space-y-2 px-3">
                <Link
                  to="/login"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full border-grubble-500 text-grubble-500 dark:border-grubble-400 dark:text-grubble-400 hover:bg-grubble-50 dark:hover:bg-grubble-900/30"
                  >
                    Log in
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  className="w-full"
                >
                  <Button className="w-full bg-grubble-500 hover:bg-grubble-600 text-white dark:bg-grubble-600 dark:hover:bg-grubble-700">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
