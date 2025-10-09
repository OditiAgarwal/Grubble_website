
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Target, BookOpen, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
}

const CareerAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const questions: Question[] = [
    {
      id: 1,
      question: "What type of work environment energizes you most?",
      options: [
        "Fast-paced and dynamic with constant change",
        "Structured and organized with clear processes",
        "Collaborative and team-focused atmosphere",
        "Independent and research-oriented setting"
      ]
    },
    {
      id: 2,
      question: "Which problem-solving approach appeals to you?",
      options: [
        "Breaking complex problems into smaller, manageable pieces",
        "Analyzing patterns and trends in large datasets",
        "Creating visual solutions that users can interact with",
        "Building secure and reliable systems"
      ]
    },
    {
      id: 3,
      question: "What motivates you most in your daily work?",
      options: [
        "Seeing immediate results and user feedback",
        "Discovering insights from complex information",
        "Creating experiences people use every day",
        "Protecting and securing important information"
      ]
    },
    {
      id: 4,
      question: "How do you prefer to learn new concepts?",
      options: [
        "Hands-on experimentation and building",
        "Reading research papers and documentation",
        "Visual tutorials and interactive examples",
        "Structured courses with practical exercises"
      ]
    },
    {
      id: 5,
      question: "Which type of impact excites you most?",
      options: [
        "Creating tools that solve everyday problems",
        "Uncovering insights that drive business decisions",
        "Building experiences millions of people use",
        "Ensuring digital safety and privacy"
      ]
    },
    {
      id: 6,
      question: "What aspect of technology fascinates you?",
      options: [
        "How different systems connect and communicate",
        "Patterns and predictions hidden in data",
        "The psychology behind user interactions",
        "Methods to protect against digital threats"
      ]
    },
    {
      id: 7,
      question: "Which work style suits you best?",
      options: [
        "Building and iterating on prototypes quickly",
        "Deep analysis and methodical investigation",
        "Designing and refining user experiences",
        "Planning and implementing security measures"
      ]
    },
      {
        id: 8,
        question: "What kind of challenges energize you?",
        options: [
          "Optimizing performance and scalability",
          "Finding meaningful patterns in chaos",
          "Making complex things simple and intuitive",
          "Staying ahead of emerging threats"
        ]
      },
      {
        id: 9,
        question: "Which work environment excites you most?",
        options: [
          "Fast-paced startup with cutting-edge technology",
          "Research-focused environment with data analysis",
          "Creative agency with focus on user experience",
          "Security-focused organization protecting digital assets"
        ]
      },
      {
        id: 10,
        question: "What drives your professional satisfaction?",
        options: [
          "Building scalable applications used by millions",
          "Discovering insights that drive business decisions",
          "Creating intuitive interfaces that users love",
          "Protecting organizations from cyber threats"
        ]
      }
  ];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || '');
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const getRecommendation = () => {
    const scores = { webDev: 0, dataScience: 0, mobile: 0, cybersecurity: 0 };
    
    answers.forEach((answer, index) => {
      if (answer.includes('Building and iterating') || answer.includes('systems connect') || answer.includes('Optimizing performance')) {
        scores.webDev++;
      }
      if (answer.includes('patterns and trends') || answer.includes('complex information') || answer.includes('research papers') || answer.includes('meaningful patterns')) {
        scores.dataScience++;
      }
      if (answer.includes('user interactions') || answer.includes('experiences people use') || answer.includes('user experiences') || answer.includes('simple and intuitive')) {
        scores.mobile++;
      }
      if (answer.includes('secure and reliable') || answer.includes('digital safety') || answer.includes('security measures') || answer.includes('emerging threats')) {
        scores.cybersecurity++;
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const topCareer = Object.keys(scores).find(key => scores[key] === maxScore) || 'webDev';

    const recommendations = {
      webDev: {
        title: "Full Stack Developer",
        description: "Build comprehensive web applications from frontend to backend",
        skills: ["React", "Node.js", "JavaScript", "HTML/CSS", "MongoDB"],
        growth: "Junior Developer → Senior Developer → Tech Lead → Engineering Manager"
      },
      dataScience: {
        title: "Data Scientist",
        description: "Extract insights and build predictive models from complex data",
        skills: ["Python", "Machine Learning", "SQL", "Statistics", "Pandas"],
        growth: "Data Analyst → Data Scientist → Senior Data Scientist → Chief Data Officer"
      },
      mobile: {
        title: "Mobile App Developer",
        description: "Create engaging mobile experiences for iOS and Android",
        skills: ["React Native", "Flutter", "Swift", "Kotlin", "Mobile UI/UX"],
        growth: "Mobile Developer → Senior Mobile Developer → Mobile Architect → CTO"
      },
      cybersecurity: {
        title: "Cybersecurity Specialist",
        description: "Protect digital assets and ensure system security",
        skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance", "Incident Response"],
        growth: "Security Analyst → Security Engineer → Security Architect → CISO"
      }
    };

    return recommendations[topCareer];
  };

  // Intro screen with career information
  if (showIntro) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Career Assessment
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Discover your ideal tech career path through our comprehensive assessment. 
                Learn about different specializations and current industry trends.
              </p>
              <Button 
                onClick={() => setShowIntro(false)}
                className="bg-grubble-500 hover:bg-grubble-600 text-lg px-8 py-3"
              >
                Take Assessment
              </Button>
            </motion.div>

            {/* Career Specializations Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Tech Career Specializations
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Full Stack Development */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Full Stack Development
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Build complete web applications from frontend to backend. Average salary: ₹6-25L
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Node.js</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">MongoDB</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Science */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Data Science
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Extract insights from data using ML and AI. Average salary: ₹8-30L
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Python</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">ML</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">SQL</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Development */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <ChevronRight className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Mobile Development
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Create mobile apps for iOS and Android. Average salary: ₹5-22L
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Flutter</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">React Native</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Swift</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Cybersecurity */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Cybersecurity
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Protect digital assets and systems. Average salary: ₹7-28L
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Ethical Hacking</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Network Security</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">CISSP</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Trending News Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Industry Trends & News
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      AI/ML Jobs Growing 40% YoY
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Machine learning roles see unprecedented growth with companies investing heavily in AI initiatives.
                    </p>
                    <span className="text-xs text-grubble-500 font-medium">Tech News • 2 days ago</span>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Remote Work Here to Stay
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      75% of Indian tech companies offering permanent remote options, changing how we work.
                    </p>
                    <span className="text-xs text-grubble-500 font-medium">Career Insights • 1 week ago</span>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Cybersecurity Skills Gap
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      India faces shortage of 3M cybersecurity professionals, creating massive opportunities.
                    </p>
                    <span className="text-xs text-grubble-500 font-medium">Industry Report • 3 days ago</span>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Button 
                onClick={() => setShowIntro(false)}
                className="bg-grubble-500 hover:bg-grubble-600 text-lg px-8 py-3"
              >
                Start Your Assessment Now
              </Button>
              <p className="text-gray-500 text-sm mt-2">
                Takes 5-7 minutes • Get personalized career recommendations
              </p>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Assessment Complete!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Here's your personalized career recommendation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-grubble-500 to-teal-600 text-white">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5" />
                    Your Ideal Career Path
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-grubble-700 dark:text-grubble-300 mb-2">
                        {recommendation.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {recommendation.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Essential Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recommendation.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-grubble-100 dark:bg-grubble-900/30 text-grubble-700 dark:text-grubble-300 px-2 py-1 rounded text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Career Progression
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {recommendation.growth}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => navigate('/learning-roadmap')}
                        className="flex-1 bg-grubble-500 hover:bg-grubble-600"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCurrentQuestion(0);
                          setAnswers([]);
                          setSelectedAnswer('');
                          setShowResults(false);
                        }}
                        className="flex-1"
                      >
                        Retake Assessment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Discover Your Tech Career
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Take our assessment to find your perfect tech career path
            </p>
            <div className="inline-flex items-center gap-2 bg-grubble-100 dark:bg-grubble-900/30 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-grubble-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-grubble-700 dark:text-grubble-300">
                {questions.length} questions
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-grubble-500 to-teal-600 text-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Question {currentQuestion + 1} of {questions.length}
                  </CardTitle>
                  <div className="text-sm">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </div>
                </div>
                <Progress 
                  value={((currentQuestion + 1) / questions.length) * 100} 
                  className="mt-3 h-2"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                      {questions[currentQuestion].question}
                    </h2>
                  </div>

                  <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-sm ${
                            selectedAnswer === option
                              ? 'border-grubble-500 bg-grubble-50 dark:bg-grubble-900/20'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-grubble-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem 
                              value={option} 
                              id={`option-${index}`} 
                              className="mt-1"
                            />
                            <Label 
                              htmlFor={`option-${index}`}
                              className="text-gray-800 dark:text-gray-200 cursor-pointer flex-1 leading-relaxed"
                            >
                              {option}
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="px-4"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className="bg-grubble-500 hover:bg-grubble-600 px-4"
                    >
                      {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareerAssessment;
