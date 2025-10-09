
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, DollarSign, Users, BookOpen, Award } from "lucide-react";
import { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];

interface ComparisonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
}

export const ComparisonDialog = ({ isOpen, onClose, courses }: ComparisonDialogProps) => {
  if (courses.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Course Comparison
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {courses.map((course) => (
            <Card key={course.id} className="border-2 hover:border-grubble-300 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {course.provider}
                  </Badge>
                  <Badge 
                    variant={course.level === 'Beginner' ? 'secondary' : 
                            course.level === 'Intermediate' ? 'outline' : 'destructive'}
                  >
                    {course.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.category}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating and Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{course.provider}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold">${course.price}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Description</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Category
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Certificate */}
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Award className="h-4 w-4" />
                  <span>Certificate included</span>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-grubble-500 hover:bg-grubble-600">
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={onClose} className="px-8">
            Close Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
