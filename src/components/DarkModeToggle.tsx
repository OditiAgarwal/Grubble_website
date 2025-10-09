
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has previously set a preference
    if (typeof localStorage !== 'undefined') {
      const storedPreference = localStorage.getItem('dark-mode');
      if (storedPreference) {
        return storedPreference === 'true';
      }
      // If no preference is stored, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Update the theme when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Toggle
      pressed={darkMode}
      onPressedChange={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="rounded-full bg-gray-100 dark:bg-gray-700 p-2 h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
    >
      {darkMode ? (
        <Moon className="h-5 w-5 text-yellow-400" />
      ) : (
        <Sun className="h-5 w-5 text-orange-500" />
      )}
    </Toggle>
  );
};

export default DarkModeToggle;
