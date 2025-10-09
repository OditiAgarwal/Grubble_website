
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Grubble assistant. I can help you discover our features like Career Assessment, Learning Roadmap, and Course Comparison. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<number | null>(null);

  const getContextualQuestions = (lastBotMessage: string): string[] => {
    const message = lastBotMessage.toLowerCase();
    
    // Platform-focused question sets
    const questionSets = {
      assessment: [
        "How does the Career Assessment work?",
        "What career paths are available on Grubble?",
        "How accurate is the career assessment test?",
        "Can I retake the career assessment?",
        "How long does the assessment take?"
      ],
      roadmap: [
        "How do I create a learning roadmap?",
        "What skills should I learn first?",
        "How to track my progress on the roadmap?",
        "Can I customize my learning path?",
        "How often should I update my roadmap?"
      ],
      courses: [
        "How does course comparison work on Grubble?",
        "Which courses are best for beginners?",
        "How to choose between multiple courses?",
        "Are the courses on Grubble free?",
        "Can I get certificates from the courses?"
      ],
      platform: [
        "What features does Grubble offer?",
        "How can Grubble help my career?",
        "Is Grubble free to use?",
        "How do I get started on Grubble?",
        "What makes Grubble different from other platforms?"
      ]
    };
    
    if (message.includes('assessment') || message.includes('test') || message.includes('career path')) {
      return questionSets.assessment;
    }
    
    if (message.includes('roadmap') || message.includes('learning path') || message.includes('skill')) {
      return questionSets.roadmap;
    }
    
    if (message.includes('course') || message.includes('comparison') || message.includes('certification')) {
      return questionSets.courses;
    }

    // Default to platform-related questions
    return questionSets.platform;
  };

  const getCurrentQuestions = (): string[] => {
    const allQuestions = getContextualQuestions(messages.length > 1 ? 
      messages.filter(m => m.sender === 'bot').pop()?.content || '' : '');
    
    // Shuffle and return different questions each time
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('assessment') || input.includes('test')) {
      return "The Career Assessment on Grubble is designed to help you discover the best career path based on your skills, interests, and goals. It takes about 10-15 minutes and provides personalized recommendations with detailed learning paths. You can access it from the navigation menu!";
    }
    
    if (input.includes('roadmap') || input.includes('learning path')) {
      return "Grubble's Learning Roadmap feature helps you create a personalized learning journey! It shows you step-by-step what skills to learn, recommended courses, and tracks your progress. Start by taking the Career Assessment, then access your custom roadmap from the navigation menu.";
    }
    
    if (input.includes('course') || input.includes('comparison')) {
      return "Our Course Comparison tool lets you compare different courses side-by-side based on duration, difficulty, cost, and user ratings. You can filter courses by category, compare multiple options at once, and make informed decisions about your learning journey. Check it out in the Course Comparison section!";
    }
    
    if (input.includes('feature') || input.includes('what does grubble')) {
      return "Grubble offers three powerful features: 1) Career Assessment - Find your ideal career path, 2) Learning Roadmap - Get a personalized learning journey, 3) Course Comparison - Compare and choose the best courses. All designed to help you succeed in your tech career!";
    }

    if (input.includes('free') || input.includes('cost') || input.includes('price')) {
      return "Grubble's core features including Career Assessment, Learning Roadmap, and Course Comparison are completely free to use! We believe everyone should have access to quality career guidance tools.";
    }

    if (input.includes('get started') || input.includes('how to use') || input.includes('begin')) {
      return "Getting started with Grubble is easy! 1) Take the Career Assessment to discover your ideal path, 2) View your personalized Learning Roadmap, 3) Use Course Comparison to find the best courses. Start with the Career Assessment from the navigation menu!";
    }

    if (input.includes('different') || input.includes('unique') || input.includes('special')) {
      return "Grubble stands out by offering a complete career guidance system with personalized assessments, detailed roadmaps, and smart course comparisons - all in one platform! We focus on helping you make informed decisions about your career journey with data-driven insights.";
    }
    
    return "I'm here to help you navigate Grubble's features! I can tell you about the Career Assessment, Learning Roadmap, and Course Comparison tools. What would you like to know more about?";
  };

  const handleSampleQuestionClick = (question: string) => {
    // Cancel any previous typing
    if (typingIntervalRef.current) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    // Directly send the message without typing animation
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(question),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Scroll to bottom
      const messagesContainer = document.querySelector('.messages-container') as HTMLElement | null;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 500);
  };

  const currentQuestions = getCurrentQuestions();

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-grubble-500 hover:bg-grubble-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw]"
          >
            <Card className="h-[600px] flex flex-col shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-grubble-500 to-teal-600 text-white rounded-t-lg p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bot className="h-5 w-5" />
                    Career Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50 messages-container">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] ${
                        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`p-2 rounded-full ${
                          message.sender === 'user' 
                            ? 'bg-grubble-500 text-white' 
                            : 'bg-white dark:bg-gray-800 text-grubble-500'
                        }`}>
                          {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`p-3 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-grubble-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Dynamic Question Suggestions */}
                  <motion.div
                    key={`suggestions-${messages.length}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 mt-4"
                  >
                    <div className="text-xs text-gray-400 dark:text-gray-500 text-center mb-2">
                      💡 You might also ask:
                    </div>
                    {currentQuestions.slice(0, 3).map((question, index) => (
                      <motion.button
                        key={`${messages.length}-${index}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => !isTyping && handleSampleQuestionClick(question)}
                        className={`w-full text-left p-2 rounded-lg text-xs bg-gray-100/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 hover:border-grubble-300 dark:hover:border-grubble-600 ${isTyping ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        aria-disabled={isTyping}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about careers..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      size="icon"
                      className="bg-grubble-500 hover:bg-grubble-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
