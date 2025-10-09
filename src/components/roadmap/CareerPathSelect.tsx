
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CareerPathSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CareerPathSelect = ({ value, onChange }: CareerPathSelectProps) => {
  const careerPaths = [
    { value: 'frontend-developer', label: 'Frontend Developer', description: 'Build user interfaces and experiences' },
    { value: 'backend-developer', label: 'Backend Developer', description: 'Build server-side applications and APIs' },
    { value: 'full-stack-developer', label: 'Full Stack Developer', description: 'Build complete web applications' },
    { value: 'mobile-developer', label: 'Mobile App Developer', description: 'Create mobile applications for iOS/Android' },
    { value: 'data-scientist', label: 'Data Scientist', description: 'Analyze data and build ML models' },
    { value: 'data-analyst', label: 'Data Analyst', description: 'Analyze and interpret business data' },
    { value: 'machine-learning-engineer', label: 'Machine Learning Engineer', description: 'Build and deploy ML systems' },
    { value: 'devops-engineer', label: 'DevOps Engineer', description: 'Manage infrastructure and deployment' },
    { value: 'cybersecurity-specialist', label: 'Cybersecurity Specialist', description: 'Protect systems from security threats' },
    { value: 'cloud-architect', label: 'Cloud Architect', description: 'Design cloud infrastructure solutions' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer', description: 'Design user interfaces and experiences' },
    { value: 'product-manager', label: 'Product Manager', description: 'Manage product development and strategy' },
    { value: 'qa-engineer', label: 'QA Engineer', description: 'Test and ensure software quality' },
    { value: 'blockchain-developer', label: 'Blockchain Developer', description: 'Build decentralized applications' },
    { value: 'game-developer', label: 'Game Developer', description: 'Create video games and interactive media' },
    { value: 'embedded-systems', label: 'Embedded Systems Engineer', description: 'Develop software for hardware devices' },
    { value: 'ai-researcher', label: 'AI Researcher', description: 'Research and develop AI technologies' },
    { value: 'database-administrator', label: 'Database Administrator', description: 'Manage and optimize databases' },
    { value: 'systems-analyst', label: 'Systems Analyst', description: 'Analyze and improve IT systems' },
    { value: 'technical-writer', label: 'Technical Writer', description: 'Create technical documentation' }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        What's your target career path?
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your desired career path" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {careerPaths.map((path) => (
            <SelectItem key={path.value} value={path.value}>
              <div className="flex flex-col items-start">
                <span className="font-medium">{path.label}</span>
                <span className="text-xs text-gray-500">{path.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CareerPathSelect;
