import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Users, BookOpen, ExternalLink, Award, Globe } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];

interface CourseDetailDialogProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

const CourseDetailDialog = ({ course, isOpen, onClose }: CourseDetailDialogProps) => {
  if (!course) return null;

  const handleEnroll = () => {
    window.open(course.url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-grubble-700">
            {course.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Image */}
          {course.image_url && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img 
                src={course.image_url} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{course.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{course.duration}</div>
                <div className="text-sm text-gray-600">Duration</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Globe className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{course.provider}</div>
                <div className="text-sm text-gray-600">Provider</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{course.level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Course Description</h3>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-grubble-100 text-grubble-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Course Category */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Category</h3>
            <Badge variant="outline" className="text-base py-2 px-4">
              {course.category}
            </Badge>
          </div>

          {/* Pricing */}
          <div className="bg-grubble-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-grubble-700">Price</h3>
                <div className="text-3xl font-bold text-grubble-600">
                  ${course.price}
                </div>
              </div>
              <Button 
                onClick={handleEnroll}
                className="bg-grubble-500 hover:bg-grubble-600 text-white px-8 py-3 text-lg"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Enroll Now
              </Button>
            </div>
          </div>

          {/* What You'll Learn */}
          <div>
            <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-grubble-500 flex-shrink-0" />
                  <span className="text-gray-700">Master {skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Highlights */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Course Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-grubble-500" />
                <span>Certificate of completion</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-grubble-500" />
                <span>Hands-on projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-grubble-500" />
                <span>Community support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-grubble-500" />
                <span>Lifetime access</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;