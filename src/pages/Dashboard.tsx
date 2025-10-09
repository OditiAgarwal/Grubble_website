
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PremiumCTA } from "@/components/PremiumCTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, Award, ChevronRight } from "lucide-react";

const progressData = [
  { name: 'Jan', progress: 30 },
  { name: 'Feb', progress: 45 },
  { name: 'Mar', progress: 60 },
  { name: 'Apr', progress: 75 },
  { name: 'May', progress: 85 },
];

const upcomingCourses = [
  { title: "UX Design Principles", category: "Design", duration: "3h 20m", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" },
  { title: "JavaScript for Beginners", category: "Development", duration: "5h 10m", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" },
];

const Dashboard = () => {
  const { userName } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="grid gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {userName || 'User'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Continue your learning journey and track your progress
                </p>
              </div>
              
              <div className="flex gap-3 self-start">
                <Button variant="outline" asChild>
                  <Link to="/profile">
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/settings">
                    Settings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="my-courses">My Courses</TabsTrigger>
              <TabsTrigger value="career-paths">Career Paths</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Courses in Progress
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-3xl font-bold">3</span>
                        <Book className="h-9 w-9 text-grubble-400 bg-grubble-50 dark:bg-grubble-900/20 p-1.5 rounded-lg" />
                      </div>
                      <Button variant="link" className="justify-start px-0 mt-4 text-grubble-500">
                        View all courses <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Weekly Learning Goal
                      </span>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">5h 30m / 8h</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-grubble-400 h-2 rounded-full" style={{ width: '68%' }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">68% of weekly goal completed</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Career Path Progress
                      </span>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-grubble-500 h-2 rounded-full" style={{ width: '42%' }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Frontend Developer Path</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Certificates Earned
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-3xl font-bold">5</span>
                        <Award className="h-9 w-9 text-grubble-400 bg-grubble-50 dark:bg-grubble-900/20 p-1.5 rounded-lg" />
                      </div>
                      <Button variant="link" className="justify-start px-0 mt-4 text-grubble-500">
                        View certificates <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="progress" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Points & Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-grubble-500">2,450</div>
                    <p className="text-sm text-gray-500 mb-5">Total Points Earned</p>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-grubble-100 dark:bg-grubble-800 p-2 rounded-full">
                            <Award className="h-5 w-5 text-grubble-500" />
                          </div>
                          <div>
                            <p className="font-medium">Fast Learner</p>
                            <p className="text-xs text-gray-500">Completed 3 courses in a week</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-grubble-100 dark:bg-grubble-800 p-2 rounded-full">
                            <Award className="h-5 w-5 text-grubble-500" />
                          </div>
                          <div>
                            <p className="font-medium">Quiz Master</p>
                            <p className="text-xs text-gray-500">Scored 100% in 5 quizzes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Continue Learning</h2>
                  <Button variant="link" className="text-grubble-500">
                    View all <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingCourses.map((course, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                      <div className="aspect-video relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium bg-grubble-50 dark:bg-grubble-900/20 text-grubble-600 dark:text-grubble-300 px-2.5 py-0.5 rounded">
                            {course.category}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            {course.duration}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="my-courses">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">My Enrolled Courses</h3>
                  <p className="text-gray-500">This tab would display all your enrolled courses.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="career-paths">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Your Career Paths</h3>
                  <p className="text-gray-500">This tab would display your selected career paths and progress.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Your Achievements</h3>
                  <p className="text-gray-500">This tab would display all your earned achievements and badges.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <PremiumCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
