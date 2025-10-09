
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, Star, MapPin } from 'lucide-react';

interface Peer {
  id: string;
  name: string;
  location: string;
  skills: string[];
  rating: number;
  projects: number;
  avatar?: string;
  bio: string;
  availability: 'Available' | 'Busy' | 'Part-time';
}

const PeerMatchmaking = () => {
  const [peers] = useState<Peer[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js'],
      rating: 4.9,
      projects: 12,
      bio: 'Full-stack developer passionate about creating user-friendly applications',
      availability: 'Available'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      location: 'New York, NY',
      skills: ['Python', 'Data Science', 'Machine Learning'],
      rating: 4.7,
      projects: 8,
      bio: 'Data scientist with experience in AI and analytics',
      availability: 'Part-time'
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      location: 'Austin, TX',
      skills: ['UI/UX Design', 'Figma', 'React'],
      rating: 4.8,
      projects: 15,
      bio: 'Designer focused on creating beautiful and accessible user experiences',
      availability: 'Available'
    }
  ]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Part-time': return 'bg-yellow-100 text-yellow-800';
      case 'Busy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-grubble-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Find Collaboration Partners</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {peers.map((peer, index) => (
          <motion.div
            key={peer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarImage src={peer.avatar} alt={peer.name} />
                  <AvatarFallback className="bg-grubble-100 text-grubble-700 text-lg">
                    {getInitials(peer.name)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{peer.name}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {peer.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">{peer.bio}</p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {peer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{peer.rating}</span>
                  </div>
                  <span className="text-gray-500">{peer.projects} projects</span>
                </div>
                
                <div className="flex items-center justify-center">
                  <Badge className={getAvailabilityColor(peer.availability)}>
                    {peer.availability}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" className="flex-1 bg-grubble-500 hover:bg-grubble-600">
                    Connect
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

export default PeerMatchmaking;
