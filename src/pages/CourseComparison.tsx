import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { FilterSection } from '@/components/course-comparison/FilterSection';
import { ComparisonDialog } from '@/components/course-comparison/ComparisonDialog';
import CourseDetailDialog from '@/components/course-comparison/CourseDetailDialog';
import { Star, Clock, DollarSign, Users, BookOpen, GitCompare, Search, Eye, ExternalLink } from 'lucide-react';
import { coursesData, CourseData } from '@/data/coursesData';

type Course = CourseData;

const CourseComparison = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses] = useState<Course[]>(coursesData);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    platform: 'all',
    level: 'all',
    duration: [0, 100] as [number, number],
    rating: 'any',
    priceRange: 'all'
  });

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDetail(true);
  };

  // Helpers for filtering
  const durationToHours = (d: string) => {
    const num = parseInt(d);
    if (d.toLowerCase().includes('hour')) return num;
    if (d.toLowerCase().includes('week')) return num * 10; // approx
    if (d.toLowerCase().includes('month')) return num * 40; // approx
    return num;
  };

  // Filter courses based on search query and sidebar filters
  const filteredCourses = courses
    .filter(course => {
      const q = searchQuery.toLowerCase();
      return (
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.provider.toLowerCase().includes(q) ||
        course.skills.some(skill => skill.toLowerCase().includes(q))
      );
    })
    .filter(course => {
      // Platform
      if (filters.platform !== 'all' && course.provider.toLowerCase() !== filters.platform) return false;
      // Level
      if (filters.level !== 'all' && course.level.toLowerCase() !== filters.level) return false;
      // Rating
      if (filters.rating !== 'any' && course.rating < parseFloat(filters.rating)) return false;
      // Price
      if (filters.priceRange !== 'all') {
        const price = course.price;
        const isFree = price === 0;
        if (filters.priceRange === 'free' && !isFree) return false;
        if (filters.priceRange === 'paid' && isFree) return false;
        if (filters.priceRange === 'under-50' && !(price > 0 && price < 50)) return false;
        if (filters.priceRange === '50-100' && !(price >= 50 && price <= 100)) return false;
        if (filters.priceRange === 'over-100' && !(price > 100)) return false;
      }
      // Duration
      const hours = durationToHours(course.duration);
      if (hours < filters.duration[0] || hours > filters.duration[1]) return false;
      return true;
    });

  const handleCourseSelect = (courseId: string, isSelected: boolean) => {
    if (isSelected) {
      if (selectedCourses.length < 3) {
        setSelectedCourses([...selectedCourses, courseId]);
      }
    } else {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    }
  };

  const getSelectedCourses = () => {
    return courses.filter(course => selectedCourses.includes(course.id));
  };

  const handleCompare = () => {
    if (selectedCourses.length >= 2) {
      setShowComparison(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grubble-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="pt-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Compare Courses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Find the perfect course for your learning goals. Compare features, pricing, and content to make the best decision.
            </p>
          </motion.div>

          {/* Compare Button - Fixed Position */}
          {selectedCourses.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            >
              <Button
                onClick={handleCompare}
                className="bg-grubble-500 hover:bg-grubble-600 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold"
              >
                <GitCompare className="h-5 w-5 mr-2" />
                Compare {selectedCourses.length} Courses
              </Button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <FilterSection 
                filters={filters}
                onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
                onApply={() => { /* no-op, filtering is reactive */ }}
              />
            </motion.div>

            {/* Courses Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search courses by title, provider, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
              </div>

              {/* Selection Info */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Select 2-3 courses to compare. Currently selected: {selectedCourses.length}/3
                  {filteredCourses.length !== courses.length && (
                    <span className="ml-2">• Showing {filteredCourses.length} of {courses.length} courses</span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const isSelected = selectedCourses.includes(course.id);
                  const canSelect = selectedCourses.length < 3 || isSelected;
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`transition-all duration-200 ${
                        isSelected ? 'ring-2 ring-grubble-500' : ''
                      }`}
                    >
                      <Card className={`hover:shadow-lg transition-shadow ${
                        !canSelect ? 'opacity-50' : ''
                      } h-full`}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => 
                                handleCourseSelect(course.id, !!checked)
                              }
                              disabled={!canSelect}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">{course.provider}</Badge>
                                <Badge 
                                  variant={course.level === 'Beginner' ? 'secondary' : 
                                          course.level === 'Intermediate' ? 'outline' : 'destructive'}
                                  className="text-xs"
                                >
                                  {course.level}
                                </Badge>
                              </div>
                              <CardTitle className="text-sm mb-2 line-clamp-2 h-10">{course.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="p-4 space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="font-medium">{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-green-500" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 text-purple-500" />
                              <span className="font-semibold">
                                {course.price === 0 ? 'Free' : `$${course.price}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3 text-blue-500" />
                              <span>{course.category}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
                            {course.description}
                          </p>

                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {course.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                  {skill}
                                </Badge>
                              ))}
                              {course.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  +{course.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="flex-1 bg-grubble-500 hover:bg-grubble-600"
                              onClick={() => handleViewDetails(course)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1"
                              onClick={() => window.open(course.url, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No courses found matching your search criteria.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <ComparisonDialog
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        courses={getSelectedCourses()}
      />

      <CourseDetailDialog
        course={selectedCourse}
        isOpen={showCourseDetail}
        onClose={() => setShowCourseDetail(false)}
      />
      
      <Footer />
    </div>
  );
};

export default CourseComparison;