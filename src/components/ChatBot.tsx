
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
      content: 'Hello! I\'m your AI career assistant. I can help you with career guidance, skill development, interview preparation, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<number | null>(null);

  const getContextualQuestions = (lastBotMessage: string): string[] => {
    const message = lastBotMessage.toLowerCase();
    
    // Extended question sets for better variety
    const questionSets = {
      skills: [
        "What are the most in-demand tech skills for 2024?",
        "How long does it take to master React.js?",
        "Which certification should I pursue first?",
        "What's the difference between frontend and backend skills?",
        "Should I learn Python or JavaScript first?",
        "What are the essential skills for DevOps?",
        "How to stay updated with latest tech trends?",
        "Which cloud platform should I learn - AWS or Azure?",
        "What's the learning path for becoming a data scientist?",
        "How important are soft skills in tech careers?"
      ],
      interview: [
        "What are common coding interview questions?",
        "How to explain projects in technical interviews?",
        "What should I wear to a tech company interview?",
        "How to negotiate salary after getting an offer?",
        "How to prepare for system design interviews?",
        "What questions should I ask the interviewer?",
        "How to handle technical interview stress?",
        "Should I mention salary expectations early?",
        "How to follow up after an interview?",
        "What are red flags to watch for in interviews?"
      ],
      career: [
        "What's the average salary for a software developer in India?",
        "How to transition from testing to development?",
        "Which companies hire remote developers?",
        "What are the growth opportunities in data science?",
        "How to choose between startup vs established company?",
        "What's the difference between product and service companies?",
        "How to build a personal brand in tech?",
        "When should I consider changing jobs?",
        "How to find mentorship in tech?",
        "What are the pros and cons of freelancing?"
      ],
      resume: [
        "How many pages should a tech resume be?",
        "Should I include personal projects in my resume?",
        "What keywords should I use for ATS optimization?",
        "How to highlight achievements without experience?",
        "Should I include a photo in my resume?",
        "How to describe technical projects effectively?",
        "What format is best for tech resumes?",
        "Should I mention college CGPA on resume?",
        "How to handle employment gaps in resume?",
        "What sections are mandatory in a tech resume?"
      ],
      salary: [
        "When is the right time to ask for a raise?",
        "How to research market salary rates?",
        "What benefits should I negotiate besides salary?",
        "How to handle counter-offers from current employer?",
        "What's the typical salary progression in tech?",
        "How do stock options work in startups?",
        "Should I accept equity over higher salary?",
        "How to negotiate work from home allowance?",
        "What's the difference between CTC and in-hand salary?",
        "How do performance bonuses work in tech companies?"
      ],
      portfolio: [
        "How many projects should be in my portfolio?",
        "What makes a project portfolio stand out?",
        "Should I include group projects or only solo work?",
        "How to showcase projects without revealing company code?",
        "What's the ideal tech stack for portfolio projects?",
        "Should I host my portfolio on GitHub Pages?",
        "How to document projects in portfolio?",
        "What's more important - quality or quantity of projects?",
        "Should I include academic projects in portfolio?",
        "How to get contributions for open source projects?"
      ]
    };
    
    if (message.includes('skill') || message.includes('learn') || message.includes('development')) {
      return questionSets.skills;
    }
    
    if (message.includes('interview') || message.includes('preparation')) {
      return questionSets.interview;
    }
    
    if (message.includes('career') || message.includes('path') || message.includes('job')) {
      return questionSets.career;
    }

    if (message.includes('resume') || message.includes('cv')) {
      return questionSets.resume;
    }

    if (message.includes('salary') || message.includes('negotiate') || message.includes('compensation')) {
      return questionSets.salary;
    }

    if (message.includes('portfolio') || message.includes('project')) {
      return questionSets.portfolio;
    }

    // Default questions for initial conversation - more variety
    return [
      "What skills should I learn for web development?",
      "How do I prepare for a software engineer interview?",
      "What are the best career paths in tech?",
      "How to write a good resume for tech companies?",
      "What programming languages are most in-demand?",
      "How to switch from non-tech to tech career?",
      "Which bootcamp should I choose for learning?",
      "How important is a computer science degree?",
      "What are the highest paying tech jobs in India?",
      "How to build experience without a job?",
      "Should I do internships or freelance projects?",
      "What's the future of AI and machine learning jobs?"
    ];
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
    
    if (input.includes('skill') || input.includes('learn')) {
      return "Great question! For web development, I recommend starting with HTML, CSS, and JavaScript. Then move to React.js for frontend and Node.js for backend. For data science, focus on Python, SQL, and machine learning libraries like Pandas and Scikit-learn. The key is consistent practice with real projects!";
    }
    
    if (input.includes('interview')) {
      return "Interview preparation is crucial! Focus on: 1) Data structures and algorithms (practice on LeetCode, HackerRank), 2) System design basics, 3) Behavioral questions using STAR method, 4) Company-specific research, 5) Mock interviews. For Indian companies, also prepare for aptitude tests and group discussions.";
    }
    
    if (input.includes('career') || input.includes('path')) {
      return "Popular tech career paths in India include: Software Development (₹4-25L), Data Science (₹6-30L), Product Management (₹8-40L), DevOps (₹5-28L), Cybersecurity (₹5-25L), and UI/UX Design (₹4-20L). Each has excellent growth potential with the right skills and dedication!";
    }
    
    if (input.includes('resume')) {
      return "For tech companies, your resume should be: 1) ATS-friendly with standard sections, 2) Include relevant keywords from job descriptions, 3) Quantify achievements with numbers, 4) Keep it 1-2 pages, 5) Add your LinkedIn/GitHub profiles, 6) Include relevant certifications, 7) Highlight technical projects with impact.";
    }

    if (input.includes('salary') || input.includes('negotiate')) {
      return "Salary negotiation tips: 1) Research market rates on Glassdoor, PayScale, 2) Highlight your unique value proposition, 3) Consider the complete package (salary + benefits + learning), 4) Be prepared to walk away, 5) Time it right (after job offer). Fresh graduates can expect 10-15% negotiation room.";
    }

    if (input.includes('portfolio')) {
      return "Build a strong portfolio with: 1) 3-5 quality projects showcasing different skills, 2) Include live demos and GitHub links, 3) Write clear project descriptions with tech stack used, 4) Show problem-solving process, 5) Include responsive designs, 6) Add testimonials if available, 7) Keep it updated regularly.";
    }

    if (input.includes('programming language') || input.includes('which language')) {
      return "For beginners, I recommend: JavaScript (versatile for web development), Python (great for data science and automation), or Java (enterprise applications). Choose based on your career goals: Web Development → JavaScript, Data Science → Python, Mobile Apps → Swift/Kotlin, Enterprise → Java.";
    }

    if (input.includes('certification')) {
      return "Valuable certifications include: AWS Cloud Practitioner (cloud computing), Google Analytics (digital marketing), Scrum Master (project management), Oracle Java (programming), Microsoft Azure (cloud services). Choose certifications that align with your career path and are recognized by employers in your target companies.";
    }
    
    return "That's an interesting question! I'd be happy to help you explore that topic. Can you provide more specific details about what you'd like to know? I can assist with career guidance, skill development, interview preparation, resume building, and more!";
  };

  const handleSampleQuestionClick = (question: string) => {
    // Cancel any previous typing
    if (typingIntervalRef.current) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setIsTyping(true);
    setInputMessage('');

    // Auto-type effect and auto-send
    let i = 0;
    const id = window.setInterval(() => {
      if (i < question.length) {
        setInputMessage(question.slice(0, i + 1));
        i++;
      } else {
        window.clearInterval(id);
        typingIntervalRef.current = null;
        // Auto-scroll to bottom and send after typing
        setTimeout(() => {
          handleSendMessage();
          const messagesContainer = document.querySelector('.messages-container') as HTMLElement | null;
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
          setIsTyping(false);
        }, 200);
      }
    }, 24);
    typingIntervalRef.current = id;
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
