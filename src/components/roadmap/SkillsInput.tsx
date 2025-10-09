import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface SkillsInputProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
  label: string;
  placeholder: string;
}

const SkillsInput = ({ skills, setSkills, label, placeholder }: SkillsInputProps) => {
  const [currentSkill, setCurrentSkill] = useState('');
  const [skillError, setSkillError] = useState('');

  const validSkills = [
    // Programming Languages
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'TypeScript',
    'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'MATLAB', 'SQL',
    
    // Web Technologies
    'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Next.js',
    'Bootstrap', 'Tailwind CSS', 'SASS', 'LESS', 'jQuery', 'Redux', 'Vuex',
    
    // Mobile Development
    'React Native', 'Flutter', 'Ionic', 'Xamarin', 'Android Development', 'iOS Development',
    
    // Backend & Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Django', 'Spring Boot',
    'Laravel', 'ASP.NET', 'GraphQL', 'REST API', 'Microservices',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub',
    'GitLab', 'CI/CD', 'Terraform', 'Ansible',
    
    // Data Science & AI
    'Machine Learning', 'Deep Learning', 'Data Analysis', 'Pandas', 'NumPy', 'TensorFlow',
    'PyTorch', 'Scikit-learn', 'Tableau', 'Power BI', 'Apache Spark',
    
    // Design & UI/UX
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'UI/UX Design',
    'Wireframing', 'Prototyping',
    
    // Other Technologies
    'Linux', 'Cybersecurity', 'Blockchain', 'IoT', 'AR/VR', 'Game Development',
    'Unity', 'Unreal Engine', 'Testing', 'Agile', 'Scrum'
  ];

  const validateSkill = (skill: string): boolean => {
    const normalizedSkill = skill.toLowerCase().trim();
    const normalizedValidSkills = validSkills.map(s => s.toLowerCase());
    
    // Check for exact match or partial match
    return normalizedValidSkills.some(validSkill => 
      validSkill.includes(normalizedSkill) || normalizedSkill.includes(validSkill)
    );
  };

  const getSuggestions = (input: string): string[] => {
    if (input.length < 2) return [];
    
    const normalizedInput = input.toLowerCase();
    return validSkills.filter(skill => 
      skill.toLowerCase().includes(normalizedInput) && 
      !skills.includes(skill)
    ).slice(0, 5);
  };

  const handleAddSkill = () => {
    const trimmedSkill = currentSkill.trim();
    
    if (!trimmedSkill) {
      setSkillError('Please enter a skill');
      return;
    }

    if (skills.includes(trimmedSkill)) {
      setSkillError('Skill already added');
      return;
    }

    if (!validateSkill(trimmedSkill)) {
      setSkillError('Please enter a valid technology skill. Check spelling or try a related term.');
      return;
    }

    setSkills([...skills, trimmedSkill]);
    setCurrentSkill('');
    setSkillError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addSuggestedSkill = (skill: string) => {
    setSkills([...skills, skill]);
    setCurrentSkill('');
    setSkillError('');
  };

  const suggestions = getSuggestions(currentSkill);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={currentSkill}
            onChange={(e) => {
              setCurrentSkill(e.target.value);
              setSkillError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${skillError ? 'border-red-500' : ''}`}
          />
          {currentSkill && (
            <div className="absolute right-2 top-2">
              {validateSkill(currentSkill) ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          )}
        </div>
        <Button onClick={handleAddSkill} type="button">Add</Button>
      </div>
      
      {skillError && (
        <p className="text-sm text-red-500">{skillError}</p>
      )}
      
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Suggestions:</p>
          <div className="flex flex-wrap gap-1">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSuggestedSkill(suggestion)}
                className="text-xs px-2 py-1 bg-grubble-50 text-grubble-600 rounded hover:bg-grubble-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1 px-3 py-1">
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
