
import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Course {
  id: string;
  title: string;
  provider: 'Udemy' | 'Coursera' | 'Oracle' | 'NPTEL' | string;
  url: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface CourseListProps {
  skill: string;
  courses: Course[];
}

const CourseList = ({ skill, courses }: CourseListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const providerColors: Record<string, string> = {
    'Udemy': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    'Coursera': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    'Oracle': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    'NPTEL': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
  };

  const levelColors: Record<string, string> = {
    'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-800/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{skill}</h3>
        <Button variant="ghost" size="sm">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      {isOpen && (
        <div className="p-4 space-y-3">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="border border-gray-100 dark:border-gray-700 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{course.title}</h4>
                <a 
                  href={course.url} 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-grubble-500 hover:text-grubble-600 dark:text-grubble-400 dark:hover:text-grubble-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="secondary"
                  className={providerColors[course.provider] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}
                >
                  {course.provider}
                </Badge>
                <Badge 
                  variant="secondary"
                  className={levelColors[course.level] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}
                >
                  {course.level}
                </Badge>
                <Badge variant="outline">{course.duration}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
