
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Globe,
  Github,
  Linkedin,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { userName, updateUserName } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userName || '',
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate developer focused on creating amazing user experiences. Always learning and growing in the tech space.',
    website: 'https://example.com',
    linkedin: 'https://linkedin.com/in/example',
    github: 'https://github.com/example'
  });

  const handleSave = () => {
    if (formData.fullName !== userName) {
      updateUserName(formData.fullName);
    }
    
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(prev => ({
      ...prev,
      fullName: userName || ''
    }));
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const skills = [
    { name: 'JavaScript', level: 'Advanced', progress: 85 },
    { name: 'React', level: 'Expert', progress: 95 },
    { name: 'Node.js', level: 'Intermediate', progress: 70 },
    { name: 'UI/UX Design', level: 'Beginner', progress: 45 },
  ];

  const achievements = [
    { title: 'JavaScript Mastery', description: 'Completed advanced JavaScript course', icon: BookOpen, date: '2024-01-15' },
    { title: 'React Rockstar', description: 'Built 5+ React applications', icon: TrendingUp, date: '2024-02-20' },
    { title: 'Node.js Ninja', description: 'Developed backend API using Node.js', icon: Target, date: '2024-03-10' },
  ];

  const projects = [
    { 
      name: 'E-commerce Website', 
      description: 'Developed a fully functional e-commerce platform with React and Node.js.',
      tech: ['React', 'Node.js', 'MongoDB'],
      status: 'Completed'
    },
    { 
      name: 'Mobile App UI Design', 
      description: 'Designed the UI/UX for a mobile application using Figma.',
      tech: ['Figma', 'UI/UX', 'Mobile Design'],
      status: 'In Progress'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Header Card */}
          <Card className="mb-8 overflow-hidden shadow-2xl border-0">
            <div className="bg-gradient-to-br from-grubble-500 via-teal-500 to-blue-600 text-white p-8 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <Avatar className="relative w-40 h-40 mx-auto lg:mx-0 border-4 border-white/30 shadow-xl">
                      <AvatarImage src="" alt="Profile picture" />
                      <AvatarFallback className="bg-white/20 text-white text-5xl font-bold backdrop-blur-sm">
                        {getInitials(formData.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-3 right-3 p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="text-3xl font-bold bg-white/10 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm rounded-xl py-3 px-4"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                          {formData.fullName || 'User'}
                        </h1>
                        <p className="text-2xl opacity-90 font-medium">
                          Full Stack Developer
                        </p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start my-6">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                        React
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                        Node.js
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                        JavaScript
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8 justify-center lg:justify-start">
                      <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                        <MapPin className="h-5 w-5" />
                        <span className="font-medium">{formData.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                        <Calendar className="h-5 w-5" />
                        <span className="font-medium">Joined Jan 2024</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 justify-center lg:justify-start">
                      {isEditing ? (
                        <div className="flex gap-3">
                          <Button 
                            onClick={handleSave} 
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                          >
                            <Save className="h-5 w-5 mr-2" /> Save Changes
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={handleCancel} 
                            className="text-white hover:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                          >
                            <X className="h-5 w-5 mr-2" /> Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setIsEditing(true)} 
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <Edit className="h-5 w-5 mr-2" /> Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

            {/* Enhanced Tabs */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <TabsTrigger 
                value="overview" 
                className="rounded-lg py-3 px-6 font-semibold transition-all duration-300 data-[state=active]:bg-grubble-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="skills" 
                className="rounded-lg py-3 px-6 font-semibold transition-all duration-300 data-[state=active]:bg-grubble-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="rounded-lg py-3 px-6 font-semibold transition-all duration-300 data-[state=active]:bg-grubble-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="rounded-lg py-3 px-6 font-semibold transition-all duration-300 data-[state=active]:bg-grubble-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Projects
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> Email
                          </Label>
                          {isEditing ? (
                            <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                          ) : (
                            <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Phone className="h-4 w-4" /> Phone
                          </Label>
                          {isEditing ? (
                            <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                          ) : (
                            <p className="text-gray-600 dark:text-gray-400">{formData.phone}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Bio</Label>
                        {isEditing ? (
                          <Textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400">{formData.bio}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Social Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4" /> LinkedIn
                          </Label>
                          {isEditing ? (
                            <Input value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
                          ) : (
                            <a href={formData.linkedin} className="text-grubble-500 hover:underline">{formData.linkedin}</a>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Github className="h-4 w-4" /> GitHub
                          </Label>
                          {isEditing ? (
                            <Input value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} />
                          ) : (
                            <a href={formData.github} className="text-grubble-500 hover:underline">{formData.github}</a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-grubble-50 dark:bg-grubble-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-grubble-500">2,450</div>
                        <p className="text-sm text-gray-600">Total Points</p>
                      </div>
                      <div className="text-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-teal-600">12</div>
                        <p className="text-sm text-gray-600">Completed Courses</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">5</div>
                        <p className="text-sm text-gray-600">Certificates</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>My Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-grubble-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500">{skill.progress}% proficiency</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>My Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.title} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="p-2 bg-grubble-100 dark:bg-grubble-900/20 rounded-lg">
                        <achievement.icon className="h-5 w-5 text-grubble-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Earned on {achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>My Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.name} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
