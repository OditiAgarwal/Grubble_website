export interface Course {
  id: string;
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
}

// Map of career paths to required skills
export const careerPathSkills: Record<string, string[]> = {
  'frontend-developer': [
    'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git', 'Responsive Design', 
    'RESTful APIs', 'Performance Optimization', 'Testing'
  ],
  'backend-developer': [
    'Node.js', 'Python', 'SQL', 'MongoDB', 'RESTful APIs', 'GraphQL', 
    'Authentication', 'Security', 'Git', 'Testing'
  ],
  'full-stack-developer': [
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'SQL', 
    'TypeScript', 'RESTful APIs', 'MongoDB', 'Authentication', 'Testing'
  ],
  'mobile-developer': [
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI Design', 
    'App Store Optimization', 'Push Notifications', 'Offline Storage', 'Mobile Testing', 'Git'
  ],
  'data-scientist': [
    'Python', 'R', 'SQL', 'Data Visualization', 'Statistics', 'Machine Learning', 
    'Data Cleaning', 'Pandas', 'NumPy', 'Jupyter', 'Big Data', 'Data Mining'
  ],
  'data-analyst': [
    'SQL', 'Python', 'R', 'Excel', 'Data Visualization', 'Statistics', 
    'Tableau', 'Power BI', 'Data Cleaning', 'Business Intelligence'
  ],
  'machine-learning-engineer': [
    'Python', 'TensorFlow', 'PyTorch', 'Statistics', 'Linear Algebra', 'Neural Networks', 
    'Natural Language Processing', 'Computer Vision', 'MLOps', 'Deep Learning'
  ],
  'devops-engineer': [
    'Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Cloud Platforms', 
    'Monitoring', 'Scripting', 'Version Control', 'Configuration Management'
  ],
  'cybersecurity-specialist': [
    'Network Security', 'Ethical Hacking', 'Penetration Testing', 'Cryptography', 
    'Security Protocols', 'Risk Assessment', 'SIEM', 'Identity Management', 
    'Secure Coding Practices', 'Security Compliance'
  ],
  'cloud-architect': [
    'AWS', 'Azure', 'Google Cloud', 'Infrastructure as Code', 'Cloud Security', 
    'Serverless', 'Microservices', 'Networking', 'Cost Optimization', 'DevOps'
  ],
  'ui-ux-designer': [
    'User Research', 'Wireframing', 'Prototyping', 'UI Design', 'Interaction Design', 
    'Usability Testing', 'Figma', 'Adobe XD', 'Design Systems', 'Accessibility'
  ],
  'product-manager': [
    'Agile Methodologies', 'User Stories', 'Market Research', 'Data Analysis', 
    'Product Strategy', 'Roadmapping', 'Stakeholder Management', 'A/B Testing', 
    'Product Analytics', 'Technical Knowledge'
  ],
  'qa-engineer': [
    'Manual Testing', 'Automation Testing', 'Test Planning', 'Bug Tracking', 
    'Selenium', 'API Testing', 'Performance Testing', 'Security Testing', 'CI/CD', 'Git'
  ],
  'blockchain-developer': [
    'Solidity', 'Ethereum', 'Smart Contracts', 'Web3', 'Cryptography', 
    'Distributed Systems', 'JavaScript', 'Node.js', 'Security', 'Testing'
  ],
  'game-developer': [
    'Unity', 'Unreal Engine', 'C#', 'C++', 'Game Design', '3D Modeling', 
    'Animation', 'Physics', 'Graphics Programming', 'Version Control'
  ],
  'embedded-systems': [
    'C', 'C++', 'Microcontrollers', 'Real-time Systems', 'Hardware Debugging', 
    'RTOS', 'Communication Protocols', 'Circuit Design', 'Assembly Language', 'Testing'
  ],
  'ai-researcher': [
    'Python', 'Machine Learning', 'Deep Learning', 'Research Methodology', 'Statistics', 
    'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Academic Writing'
  ],
  'database-administrator': [
    'SQL', 'Database Design', 'Performance Tuning', 'Backup and Recovery', 'Security', 
    'MySQL', 'PostgreSQL', 'Oracle', 'Monitoring', 'Scripting'
  ],
  'systems-analyst': [
    'Systems Analysis', 'Business Analysis', 'Requirements Gathering', 'Process Modeling', 
    'Documentation', 'Database Design', 'Project Management', 'Communication', 'Problem Solving', 'Testing'
  ],
  'technical-writer': [
    'Technical Writing', 'Documentation', 'API Documentation', 'Content Strategy', 
    'Information Architecture', 'Version Control', 'Markdown', 'Content Management', 'Research', 'Communication'
  ]
};

// Sample courses data for skills
export const coursesData: Record<string, Course[]> = {
  'HTML': [
    {
      id: 'html-1',
      title: 'HTML5 and CSS3 Fundamentals',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/html5-fundamentals-for-beginners/',
      duration: '6 hours',
      level: 'Beginner'
    },
    {
      id: 'html-2',
      title: 'Web Development: HTML and CSS',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/html-and-css',
      duration: '4 weeks',
      level: 'Beginner'
    },
    {
      id: 'html-3',
      title: 'HTML Crash Course',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/courses/106/105/106105165/',
      duration: '8 hours',
      level: 'Beginner'
    },
    {
      id: 'html-4',
      title: 'Modern HTML & CSS',
      provider: 'Oracle',
      url: 'https://education.oracle.com/learning-explorer',
      duration: '12 hours',
      level: 'Intermediate'
    }
  ],
  'CSS': [
    {
      id: 'css-1',
      title: 'CSS - The Complete Guide 2023',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/',
      duration: '22 hours',
      level: 'Intermediate'
    },
    {
      id: 'css-2',
      title: 'Advanced CSS and Sass',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/advanced-css-and-sass/',
      duration: '28 hours',
      level: 'Advanced'
    },
    {
      id: 'css-3',
      title: 'CSS Grid and Flexbox',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/css-grid-flexbox',
      duration: '3 weeks',
      level: 'Intermediate'
    },
    {
      id: 'css-4',
      title: 'Responsive Web Design with CSS',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/courses/106/105/106105166/',
      duration: '10 hours',
      level: 'Intermediate'
    }
  ],
  'JavaScript': [
    {
      id: 'js-1',
      title: 'JavaScript Basics for Beginners',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/javascript-basics-for-beginners/',
      duration: '6.5 hours',
      level: 'Beginner'
    },
    {
      id: 'js-2',
      title: 'JavaScript: Understanding the Weird Parts',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/understand-javascript/',
      duration: '11.5 hours',
      level: 'Advanced'
    },
    {
      id: 'js-3',
      title: 'Modern JavaScript Development',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/modern-javascript',
      duration: '6 weeks',
      level: 'Intermediate'
    },
    {
      id: 'js-4',
      title: 'JavaScript ES6+ Features',
      provider: 'Oracle',
      url: 'https://education.oracle.com/learning-explorer',
      duration: '8 hours',
      level: 'Intermediate'
    },
    {
      id: 'js-5',
      title: 'JavaScript Algorithms and Data Structures',
      provider: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
      duration: '300 hours',
      level: 'Intermediate'
    }
  ],
  'React': [
    {
      id: 'react-1',
      title: 'React - The Complete Guide',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
      duration: '48 hours',
      level: 'Intermediate'
    },
    {
      id: 'react-2',
      title: 'Front-End Web Development with React',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/front-end-react',
      duration: '4 weeks',
      level: 'Intermediate'
    },
    {
      id: 'react-3',
      title: 'React Hooks and Context API',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/react-hooks-context/',
      duration: '12 hours',
      level: 'Advanced'
    },
    {
      id: 'react-4',
      title: 'Building React Applications',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/courses/106/105/106105167/',
      duration: '16 hours',
      level: 'Intermediate'
    },
    {
      id: 'react-5',
      title: 'React Native - The Practical Guide',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/react-native-the-practical-guide/',
      duration: '32 hours',
      level: 'Advanced'
    }
  ],
  'TensorFlow': [
    {
      id: 'tf-1',
      title: 'Complete Guide to TensorFlow for Deep Learning with Python',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/complete-guide-to-tensorflow-for-deep-learning-with-python/',
      duration: '14 hours',
      level: 'Advanced'
    },
    {
      id: 'tf-2',
      title: 'TensorFlow Developer Certificate in 2024',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/tensorflow-developer-certificate-machine-learning-zero-to-mastery/',
      duration: '64 hours',
      level: 'Intermediate'
    },
    {
      id: 'tf-3',
      title: 'Introduction to TensorFlow for Artificial Intelligence',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/introduction-tensorflow',
      duration: '4 weeks',
      level: 'Beginner'
    },
    {
      id: 'tf-4',
      title: 'TensorFlow: Advanced Techniques Specialization',
      provider: 'Coursera',
      url: 'https://www.coursera.org/specializations/tensorflow-advanced-techniques',
      duration: '5 months',
      level: 'Advanced'
    },
    {
      id: 'tf-5',
      title: 'TensorFlow and Keras for Deep Learning',
      provider: 'Oracle',
      url: 'https://education.oracle.com/tensorflow-keras',
      duration: '20 hours',
      level: 'Intermediate'
    }
  ],
  'Node.js': [
    {
      id: 'node-1',
      title: 'Node.js API Masterclass',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/nodejs-api-masterclass/',
      duration: '14 hours',
      level: 'Intermediate'
    },
    {
      id: 'node-2',
      title: 'Server-side Development with NodeJS, Express and MongoDB',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/server-side-nodejs',
      duration: '4 weeks',
      level: 'Intermediate'
    },
    {
      id: 'node-3',
      title: 'Node.js Security Best Practices',
      provider: 'Oracle',
      url: 'https://education.oracle.com/learning-explorer',
      duration: '6 hours',
      level: 'Advanced'
    },
    {
      id: 'node-4',
      title: 'Building RESTful APIs with Node.js',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/courses/106/105/106105168/',
      duration: '12 hours',
      level: 'Intermediate'
    }
  ],
  'Python': [
    {
      id: 'python-1',
      title: 'Python for Data Science and Machine Learning',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
      duration: '25 hours',
      level: 'Intermediate'
    },
    {
      id: 'python-2',
      title: 'Python for Everybody',
      provider: 'Coursera',
      url: 'https://www.coursera.org/specializations/python',
      duration: '8 months',
      level: 'Beginner'
    },
    {
      id: 'python-3',
      title: 'Advanced Python Programming',
      provider: 'Oracle',
      url: 'https://education.oracle.com/learning-explorer',
      duration: '18 hours',
      level: 'Advanced'
    },
    {
      id: 'python-4',
      title: 'Python Programming Fundamentals',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/courses/106/105/106105169/',
      duration: '20 hours',
      level: 'Beginner'
    }
  ],
  'TypeScript': [
    {
      id: 'ts-1',
      title: 'TypeScript: The Complete Developer\'s Guide',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/typescript-the-complete-developers-guide/',
      duration: '27 hours',
      level: 'Intermediate'
    },
    {
      id: 'ts-2',
      title: 'Understanding TypeScript',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/understanding-typescript/',
      duration: '15 hours',
      level: 'Beginner'
    },
    {
      id: 'ts-3',
      title: 'TypeScript Fundamentals',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/typescript-fundamentals',
      duration: '3 weeks',
      level: 'Beginner'
    }
  ],
  'Git': [
    {
      id: 'git-1',
      title: 'Git Complete: The definitive guide',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/git-complete/',
      duration: '6 hours',
      level: 'Beginner'
    },
    {
      id: 'git-2',
      title: 'Version Control with Git',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/version-control-with-git',
      duration: '4 weeks',
      level: 'Beginner'
    },
    {
      id: 'git-3',
      title: 'Advanced Git Techniques',
      provider: 'Oracle',
      url: 'https://education.oracle.com/git-advanced',
      duration: '8 hours',
      level: 'Advanced'
    }
  ],
  'SQL': [
    {
      id: 'sql-1',
      title: 'The Complete SQL Course 2023',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/the-complete-sql-course/',
      duration: '12 hours',
      level: 'Beginner'
    },
    {
      id: 'sql-2',
      title: 'SQL for Data Science',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/sql-for-data-science',
      duration: '4 weeks',
      level: 'Intermediate'
    },
    {
      id: 'sql-3',
      title: 'Advanced SQL for Analytics',
      provider: 'Oracle',
      url: 'https://education.oracle.com/sql-analytics',
      duration: '16 hours',
      level: 'Advanced'
    }
  ],
  'MongoDB': [
    {
      id: 'mongo-1',
      title: 'MongoDB Complete Developer Course',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/mongodb-complete/',
      duration: '18 hours',
      level: 'Intermediate'
    },
    {
      id: 'mongo-2',
      title: 'Introduction to MongoDB',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/introduction-mongodb',
      duration: '3 weeks',
      level: 'Beginner'
    },
    {
      id: 'mongo-3',
      title: 'MongoDB Performance Optimization',
      provider: 'Oracle',
      url: 'https://education.oracle.com/mongodb-performance',
      duration: '10 hours',
      level: 'Advanced'
    }
  ],
  'RESTful APIs': [
    {
      id: 'api-1',
      title: 'REST API Design, Development & Management',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/rest-api/',
      duration: '16 hours',
      level: 'Intermediate'
    },
    {
      id: 'api-2',
      title: 'Building RESTful Web Services',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/restful-web-services',
      duration: '5 weeks',
      level: 'Intermediate'
    },
    {
      id: 'api-3',
      title: 'API Security Best Practices',
      provider: 'Oracle',
      url: 'https://education.oracle.com/api-security',
      duration: '8 hours',
      level: 'Advanced'
    }
  ],
  'GraphQL': [
    {
      id: 'graphql-1',
      title: 'Modern GraphQL Complete Course',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/graphql-bootcamp/',
      duration: '14 hours',
      level: 'Intermediate'
    },
    {
      id: 'graphql-2',
      title: 'GraphQL with React and Apollo',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/graphql-react',
      duration: '4 weeks',
      level: 'Advanced'
    },
    {
      id: 'graphql-3',
      title: 'GraphQL Fundamentals',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/graphql-fundamentals',
      duration: '12 hours',
      level: 'Beginner'
    }
  ],
  'Authentication': [
    {
      id: 'auth-1',
      title: 'Complete Authentication Course',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/authentication-course/',
      duration: '10 hours',
      level: 'Intermediate'
    },
    {
      id: 'auth-2',
      title: 'OAuth 2.0 and JWT Security',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/oauth-jwt',
      duration: '3 weeks',
      level: 'Advanced'
    },
    {
      id: 'auth-3',
      title: 'Web Security and Authentication',
      provider: 'Oracle',
      url: 'https://education.oracle.com/web-security',
      duration: '12 hours',
      level: 'Intermediate'
    }
  ],
  'Security': [
    {
      id: 'security-1',
      title: 'Complete Cyber Security Course',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/cyber-security-course/',
      duration: '20 hours',
      level: 'Intermediate'
    },
    {
      id: 'security-2',
      title: 'Introduction to Cybersecurity',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/intro-cyber-security',
      duration: '4 weeks',
      level: 'Beginner'
    },
    {
      id: 'security-3',
      title: 'Advanced Security Concepts',
      provider: 'Oracle',
      url: 'https://education.oracle.com/advanced-security',
      duration: '18 hours',
      level: 'Advanced'
    }
  ],
  'Testing': [
    {
      id: 'testing-1',
      title: 'Complete Software Testing Course',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/software-testing/',
      duration: '15 hours',
      level: 'Beginner'
    },
    {
      id: 'testing-2',
      title: 'Automated Testing with Selenium',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/selenium-testing',
      duration: '5 weeks',
      level: 'Intermediate'
    },
    {
      id: 'testing-3',
      title: 'Test-Driven Development',
      provider: 'Oracle',
      url: 'https://education.oracle.com/tdd',
      duration: '10 hours',
      level: 'Advanced'
    }
  ]
};

// For skills not explicitly defined, generate sample courses
export const generateCoursesForSkill = (skill: string): Course[] => {
  const providers = ['Udemy', 'Coursera', 'Oracle', 'NPTEL'] as const;
  const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;
  
  return [
    {
      id: `${skill.toLowerCase()}-1`,
      title: `${skill} Fundamentals`,
      provider: providers[0],
      url: `https://www.udemy.com/course/${skill.toLowerCase()}-fundamentals`,
      duration: '8 hours',
      level: 'Beginner'
    },
    {
      id: `${skill.toLowerCase()}-2`,
      title: `Advanced ${skill}`,
      provider: providers[1],
      url: `https://www.coursera.org/learn/advanced-${skill.toLowerCase()}`,
      duration: '12 hours',
      level: 'Advanced'
    },
    {
      id: `${skill.toLowerCase()}-3`,
      title: `${skill} Masterclass`,
      provider: providers[2],
      url: `https://education.oracle.com/${skill.toLowerCase()}-course`,
      duration: '15 hours',
      level: 'Intermediate'
    },
    {
      id: `${skill.toLowerCase()}-4`,
      title: `Complete ${skill} Guide`,
      provider: providers[3],
      url: `https://nptel.ac.in/${skill.toLowerCase()}-guide`,
      duration: '10 hours',
      level: 'Intermediate'
    }
  ];
};

// Get courses for a specific skill
export const getCoursesForSkill = (skill: string): Course[] => {
  return coursesData[skill] || generateCoursesForSkill(skill);
};

// Generate a learning roadmap based on user's skills and desired career path
export const generateRoadmap = (
  userSkills: string[], 
  careerPath: string
): { skill: string; courses: Course[] }[] => {
  // Get required skills for the selected career path
  const requiredSkills = careerPathSkills[careerPath] || [];
  
  // Find missing skills
  const missingSkills = requiredSkills.filter(
    skill => !userSkills.some(userSkill => 
      userSkill.toLowerCase() === skill.toLowerCase()
    )
  );
  
  // Generate roadmap with courses for each missing skill
  return missingSkills.map(skill => ({
    skill,
    courses: getCoursesForSkill(skill)
  }));
};
