
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, TrendingUp, BookOpen, Search, Plus, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import CreatePostDialog from '@/components/community/CreatePostDialog';
import PostInteractionHandler from '@/components/community/PostInteractionHandler';

const CommunityNetwork = () => {
  const posts = [
    {
      id: 1,
      author: {
        name: "Priya Sharma",
        role: "Software Engineer at TCS",
        avatar: "/placeholder.svg",
        initials: "PS"
      },
      content: "Just completed my first React project! The journey from learning basics to building a full-stack application has been incredible. Thanks to the amazing Grubble community for the support! 🚀",
      likes: 45,
      comments: 12,
      timeAgo: "2 hours ago",
      tags: ["React", "FullStack", "WebDevelopment"]
    },
    {
      id: 2,
      author: {
        name: "Rahul Kumar",
        role: "Data Scientist at Wipro",
        avatar: "/placeholder.svg",
        initials: "RK"
      },
      content: "Looking for collaboration partners for a machine learning project on predicting stock prices. Anyone interested in working together? Experience with Python and TensorFlow is a plus!",
      likes: 23,
      comments: 8,
      timeAgo: "4 hours ago",
      tags: ["MachineLearning", "Python", "Collaboration"]
    },
    {
      id: 3,
      author: {
        name: "Anjali Patel",
        role: "UX Designer at Infosys",
        avatar: "/placeholder.svg",
        initials: "AP"
      },
      content: "Sharing my latest UI design for a mobile banking app. Would love to get feedback from the community! Design thinking and user research really make a difference.",
      likes: 67,
      comments: 15,
      timeAgo: "6 hours ago",
      tags: ["UIDesign", "UXDesign", "MobileApp"]
    }
  ];

  const suggestedConnections = [
    { name: "Arjun Mehta", role: "Backend Developer", skills: "Node.js, MongoDB", initials: "AM" },
    { name: "Sneha Gupta", role: "Frontend Developer", skills: "React, Vue.js", initials: "SG" },
    { name: "Vikram Singh", role: "DevOps Engineer", skills: "AWS, Docker", initials: "VS" }
  ];

  const handleConnect = (personName: string) => {
    toast.success(`Connection request sent to ${personName}!`);
  };

  const handleMessage = (personName: string) => {
    toast.info(`Opening chat with ${personName}...`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Search functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Community Network
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Connect, share, and grow with fellow professionals in your field
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Suggested Connections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestedConnections.map((person, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{person.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.role}</p>
                        <p className="text-xs text-gray-400">{person.skills}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleConnect(person.name)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded">
                    <span className="text-sm">#ReactJS</span>
                    <span className="text-xs text-gray-500">2.5k posts</span>
                  </div>
                  <div className="flex justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded">
                    <span className="text-sm">#MachineLearning</span>
                    <span className="text-xs text-gray-500">1.8k posts</span>
                  </div>
                  <div className="flex justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded">
                    <span className="text-sm">#WebDevelopment</span>
                    <span className="text-xs text-gray-500">3.2k posts</span>
                  </div>
                  <div className="flex justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded">
                    <span className="text-sm">#DataScience</span>
                    <span className="text-xs text-gray-500">1.4k posts</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card>
                <CardContent className="p-4">
                  <CreatePostDialog>
                    <div className="flex gap-3 cursor-pointer">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>YU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                          <p className="text-gray-500 dark:text-gray-400">
                            Share your thoughts, achievements, or ask for help...
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="cursor-pointer hover:bg-grubble-50">
                              Add Tags
                            </Badge>
                          </div>
                          <Button className="bg-grubble-500 hover:bg-grubble-600">
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CreatePostDialog>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{post.author.name}</h3>
                            <p className="text-sm text-gray-500">{post.author.role}</p>
                            <p className="text-xs text-gray-400">{post.timeAgo}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          {post.content}
                        </p>
                        
                        <div className="flex gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <PostInteractionHandler
                          postId={post.id.toString()}
                          initialLikes={post.likes}
                          initialComments={post.comments}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch}>
                    <Input placeholder="Search posts, people, topics..." />
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Recent Learning Paths
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-grubble-50 dark:bg-grubble-900/20 rounded-lg cursor-pointer hover:bg-grubble-100 dark:hover:bg-grubble-900/30">
                    <p className="font-medium text-sm">Full Stack Development</p>
                    <p className="text-xs text-gray-500">85% completed</p>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-grubble-500 h-1 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-900/30">
                    <p className="font-medium text-sm">Data Science Fundamentals</p>
                    <p className="text-xs text-gray-500">62% completed</p>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-teal-500 h-1 rounded-full" style={{width: '62%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityNetwork;
