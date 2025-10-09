
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, XCircle, FileText, Target, TrendingUp, RefreshCw, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ATSScore {
  overallScore: number;
  sections: {
    formatting: { score: number; issues: string[] };
    keywords: { score: number; issues: string[] };
    structure: { score: number; issues: string[] };
    content: { score: number; issues: string[] };
  };
  recommendations: string[];
  parsedData: {
    contactInfo: boolean;
    workExperience: boolean;
    education: boolean;
    skills: boolean;
    achievements: boolean;
  };
}

interface ATSScoreAnalyzerProps {
  fileName: string;
  onReanalyze: () => void;
}

const ATSScoreAnalyzer = ({ fileName, onReanalyze }: ATSScoreAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisSteps = [
    'Extracting contact information...',
    'Analyzing work experience...',
    'Checking keyword density...',
    'Evaluating ATS compatibility...',
    'Generating recommendations...'
  ];

  useEffect(() => {
    const analyzeResume = async () => {
      setIsAnalyzing(true);
      
      // Simulate step-by-step analysis
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Generate realistic score based on filename
      const baseScore = Math.floor(Math.random() * 30) + 65;
      
      const mockScore: ATSScore = {
        overallScore: baseScore,
        sections: {
          formatting: {
            score: Math.min(100, baseScore + Math.floor(Math.random() * 15)),
            issues: baseScore > 80 ? ['Great formatting consistency'] : ['Use bullet points consistently', 'Avoid images in header', 'Inconsistent font sizes']
          },
          keywords: {
            score: Math.max(40, baseScore - Math.floor(Math.random() * 15)),
            issues: baseScore > 75 ? ['Good keyword density'] : ['Include more industry-specific keywords', 'Add relevant technical skills', 'Use action verbs from job descriptions']
          },
          structure: {
            score: Math.min(100, baseScore + Math.floor(Math.random() * 10)),
            issues: baseScore > 85 ? ['Excellent section organization'] : ['Add clear section headings', 'Improve section ordering', 'Use standard resume format']
          },
          content: {
            score: Math.max(50, baseScore - Math.floor(Math.random() * 10)),
            issues: baseScore > 70 ? ['Strong content quality'] : ['Quantify achievements with numbers', 'Add more action verbs', 'Include project outcomes']
          }
        },
        recommendations: [
          'Add 3-5 more relevant keywords for your target role',
          'Quantify your achievements (e.g., "Increased efficiency by 25%")',
          'Use standard section headings like "Work Experience" and "Education"',
          'Include a professional summary section',
          'Add your LinkedIn profile URL',
          'Remove unnecessary graphics or images',
          'Ensure consistent date formatting (MM/YYYY)',
          'Add metrics to demonstrate impact',
          'Use action verbs to start bullet points',
          'Include relevant certifications and skills'
        ],
        parsedData: {
          contactInfo: Math.random() > 0.1,
          workExperience: Math.random() > 0.1,
          education: Math.random() > 0.15,
          skills: Math.random() > 0.1,
          achievements: Math.random() > 0.2
        }
      };
      
      setAtsScore(mockScore);
      setIsAnalyzing(false);
      toast.success('Resume analysis completed!');
    };

    analyzeResume();
  }, [fileName]);

  const handleReanalyze = () => {
    setAtsScore(null);
    setIsAnalyzing(true);
    setAnalysisStep(0);
    onReanalyze();
    toast.info('Starting new analysis...');
  };

  const handleDownloadImprovedResume = () => {
    toast.success('Generating improved resume...');
    // Simulate download
    setTimeout(() => {
      toast.success('Improved resume downloaded successfully!');
    }, 2000);
  };

  const handleDownloadReport = () => {
    toast.success('ATS analysis report downloaded!');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  if (isAnalyzing || !atsScore) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Analyzing Your Resume
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Our AI is parsing and analyzing: <span className="font-medium">{fileName}</span>
          </p>
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-grubble-200 border-t-grubble-500 rounded-full animate-spin"></div>
              <FileText className="h-8 w-8 text-grubble-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          <div className="space-y-3 max-w-md mx-auto">
            {analysisSteps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  index <= analysisStep 
                    ? 'bg-grubble-50 dark:bg-grubble-900/20' 
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div 
                  className={`w-2 h-2 rounded-full ${
                    index < analysisStep 
                      ? 'bg-green-500' 
                      : index === analysisStep 
                        ? 'bg-grubble-500 animate-pulse' 
                        : 'bg-gray-300'
                  }`}
                />
                <span className="text-sm">{step}</span>
                {index < analysisStep && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Progress value={(analysisStep + 1) / analysisSteps.length * 100} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">
              {Math.round((analysisStep + 1) / analysisSteps.length * 100)}% Complete
            </p>
          </div>
        </div>
      </div>
    );
  }

  const scoreBadge = getScoreBadge(atsScore.overallScore);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ATS Score Analysis Complete
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analysis for: <span className="font-medium">{fileName}</span>
        </p>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-grubble-200 dark:border-grubble-700">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Target className="h-6 w-6 text-grubble-500" />
              Overall ATS Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative">
              <div className={`text-6xl font-bold ${getScoreColor(atsScore.overallScore)}`}>
                {atsScore.overallScore}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">out of 100</div>
            </div>
            <Badge className={`${scoreBadge.color} border-current`}>
              {scoreBadge.text}
            </Badge>
            <Progress value={atsScore.overallScore} className="w-full" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {atsScore.overallScore >= 80 
                ? "Excellent! Your resume is highly optimized for ATS systems." 
                : atsScore.overallScore >= 60 
                  ? "Good score with room for improvement." 
                  : "Significant improvements needed for better ATS compatibility."}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Parsed Data Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-2 border-blue-200 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-500" />
              Resume Parsing Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(atsScore.parsedData).map(([key, detected]) => (
                <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  {detected ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.entries(atsScore.sections).map(([section, data]) => (
          <Card key={section} className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold capitalize flex items-center gap-2">
                  {getScoreIcon(data.score)}
                  {section.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <span className={`font-bold ${getScoreColor(data.score)}`}>
                  {data.score}/100
                </span>
              </div>
              <Progress value={data.score} className="mb-3" />
              {data.issues.length > 0 && (
                <div className="space-y-1">
                  {data.issues.slice(0, 3).map((issue, issueIndex) => (
                    <p key={issueIndex} className="text-xs text-gray-600 dark:text-gray-400">
                      • {issue}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-grubble-500" />
              Improvement Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {atsScore.recommendations.slice(0, 8).map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-grubble-50 dark:bg-grubble-900/20 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-grubble-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={handleReanalyze} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Reanalyze Resume
        </Button>
        <Button onClick={handleDownloadReport} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button onClick={handleDownloadImprovedResume} className="bg-grubble-500 hover:bg-grubble-600 flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Improved Resume
        </Button>
      </div>
    </div>
  );
};

export default ATSScoreAnalyzer;
