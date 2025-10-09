
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Users, Clock, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  collaborators?: number;
  rating: number;
}

const SmartSuggestions = () => {
  const [suggestions] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce React App',
      description: 'Build a full-stack e-commerce platform with React, Node.js, and MongoDB',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      difficulty: 'Intermediate',
      duration: '4-6 weeks',
      collaborators: 3,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Data Visualization Dashboard',
      description: 'Create interactive charts and graphs using Python and D3.js',
      skills: ['Python', 'Data Visualization', 'D3.js'],
      difficulty: 'Advanced',
      duration: '3-4 weeks',
      collaborators: 2,
      rating: 4.6
    },
    {
      id: '3',
      title: 'Mobile App Prototype',
      description: 'Design and prototype a mobile app using Figma and React Native',
      skills: ['UI/UX Design', 'React Native', 'Figma'],
      difficulty: 'Beginner',
      duration: '2-3 weeks',
      collaborators: 4,
      rating: 4.9
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-6 w-6 text-grubble-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Project Suggestions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{project.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {project.duration}
                  </div>
                  {project.collaborators && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.collaborators} collaborators
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant={project.difficulty === 'Beginner' ? 'default' : project.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                    {project.difficulty}
                  </Badge>
                  <Button size="sm" className="bg-grubble-500 hover:bg-grubble-600">
                    Start Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions;
