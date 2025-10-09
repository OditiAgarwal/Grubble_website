
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchResults: SearchResult[] = [
    { title: 'Career Assessment', description: 'Take our AI-powered career assessment', path: '/career-assessment', category: 'Features' },
    { title: 'Dashboard', description: 'View your learning progress', path: '/dashboard', category: 'Navigation' },
    { title: 'Profile', description: 'Manage your profile and settings', path: '/profile', category: 'Account' },
    { title: 'Skill Wallet', description: 'Track your skills and achievements', path: '/skill-wallet', category: 'Features' },
    { title: 'Course Comparison', description: 'Compare different courses', path: '/course-comparison', category: 'Features' },
    { title: 'Resume Builder', description: 'Build and optimize your resume', path: '/profile/resume', category: 'Tools' },
    { title: 'Leaderboard', description: 'See top performers and gamification', path: '/gamification', category: 'Community' },
    { title: 'Community', description: 'Connect with other learners', path: '/community', category: 'Social' },
  ];

  const filteredResults = query.length > 0 
    ? searchResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchResults;

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative w-8 h-8 p-0 text-gray-600 hover:text-grubble-500 md:w-auto md:px-3 md:justify-start"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline-flex ml-2 text-sm text-gray-500">Search...</span>
        <kbd className="hidden md:inline-flex ml-2 pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <Command className="h-3 w-3" />K
        </kbd>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Grubble
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              placeholder="Search for features, pages, or tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
              autoFocus
            />
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result.path)}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{result.title}</h4>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        {result.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{result.description}</p>
                  </div>
                </div>
              ))}
              
              {filteredResults.length === 0 && query.length > 0 && (
                <div className="text-center py-8 text-gray-500">
                  No results found for "{query}"
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
