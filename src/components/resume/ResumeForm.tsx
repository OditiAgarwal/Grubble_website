import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Download, Plus, X, Briefcase, GraduationCap, Code, Trophy, FileText } from "lucide-react";

interface ResumeFormProps {
  onGenerateResume: (data?: any) => void;
  selectedTemplate: string | null;
}

interface WorkExperience {
  company: string;
  designation: string;
  startDate: string;
  endDate: string;
  salary: string;
  description: string;
}

interface Education {
  schoolName: string;
  percentage: string;
  startDate: string;
  endDate: string;
  collegeName: string;
  degree: string;
  collegePercentage: string;
  collegeStartDate: string;
  collegeEndDate: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface Activity {
  type: string;
  organization: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface ResumeFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  workExperiences: WorkExperience[];
  educations: Education[];
  skills: string[];
  projects: Project[];
  activities: Activity[];
}

const ResumeForm = ({ onGenerateResume, selectedTemplate }: ResumeFormProps) => {
  const { toast } = useToast();
  const [workExperiences, setWorkExperiences] = useState([{ id: 1 }]);
  const [educations, setEducations] = useState([{ id: 1 }]);
  const [projects, setProjects] = useState([{ id: 1 }]);
  const [activities, setActivities] = useState([{ id: 1 }]);
  const [skillsInput, setSkillsInput] = useState("");
  
  const form = useForm<ResumeFormData>({
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: ""
      },
      workExperiences: [{ company: "", designation: "", startDate: "", endDate: "", salary: "", description: "" }],
      educations: [{ schoolName: "", percentage: "", startDate: "", endDate: "", collegeName: "", degree: "", collegePercentage: "", collegeStartDate: "", collegeEndDate: "" }],
      skills: [],
      projects: [{ name: "", description: "", technologies: "", link: "" }],
      activities: [{ type: "", organization: "", role: "", description: "", startDate: "", endDate: "" }]
    },
  });

  const designationOptions = [
    "Software Engineer Intern",
    "Data Science Intern", 
    "Product Management Intern",
    "Marketing Intern",
    "Business Development Intern",
    "Research Intern",
    "Teaching Assistant",
    "Junior Developer",
    "Associate Software Engineer",
    "Business Analyst",
    "Content Writer",
    "Graphic Designer"
  ];

  const activityTypes = [
    "Volunteer Work",
    "Student Government",
    "Cultural Activities",
    "Sports & Athletics",
    "Technical Clubs",
    "Debate & Public Speaking",
    "Community Service",
    "Leadership Programs",
    "Organizing Events",
    "Mentoring Programs"
  ];

  const skillSuggestions = [
    "JavaScript", "Python", "Java", "React", "Node.js", "MongoDB", "SQL", "Git",
    "HTML/CSS", "TypeScript", "Express.js", "AWS", "Docker", "Machine Learning",
    "Data Analysis", "Project Management", "Leadership", "Communication",
    "Problem Solving", "Team Collaboration", "Agile Methodology", "Scrum"
  ];

  const onSubmit = (data: ResumeFormData) => {
    if (!selectedTemplate) {
      onGenerateResume();
      return;
    }
    
    console.log("Resume data:", data);
    onGenerateResume(data);
    toast({
      title: "Resume created successfully",
      description: "Your professional resume has been created and saved.",
    });
  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { id: Date.now() }]);
    const currentExperiences = form.getValues("workExperiences");
    form.setValue("workExperiences", [...currentExperiences, { company: "", designation: "", startDate: "", endDate: "", salary: "", description: "" }]);
  };

  const removeWorkExperience = (id: number, index: number) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
    const currentExperiences = form.getValues("workExperiences");
    currentExperiences.splice(index, 1);
    form.setValue("workExperiences", currentExperiences);
  };

  const addEducation = () => {
    setEducations([...educations, { id: Date.now() }]);
    const currentEducations = form.getValues("educations");
    form.setValue("educations", [...currentEducations, { schoolName: "", percentage: "", startDate: "", endDate: "", collegeName: "", degree: "", collegePercentage: "", collegeStartDate: "", collegeEndDate: "" }]);
  };

  const removeEducation = (id: number, index: number) => {
    setEducations(educations.filter(edu => edu.id !== id));
    const currentEducations = form.getValues("educations");
    currentEducations.splice(index, 1);
    form.setValue("educations", currentEducations);
  };

  const addProject = () => {
    setProjects([...projects, { id: Date.now() }]);
    const currentProjects = form.getValues("projects");
    form.setValue("projects", [...currentProjects, { name: "", description: "", technologies: "", link: "" }]);
  };

  const removeProject = (id: number, index: number) => {
    setProjects(projects.filter(proj => proj.id !== id));
    const currentProjects = form.getValues("projects");
    currentProjects.splice(index, 1);
    form.setValue("projects", currentProjects);
  };

  const addActivity = () => {
    setActivities([...activities, { id: Date.now() }]);
    const currentActivities = form.getValues("activities");
    form.setValue("activities", [...currentActivities, { type: "", organization: "", role: "", description: "", startDate: "", endDate: "" }]);
  };

  const removeActivity = (id: number, index: number) => {
    setActivities(activities.filter(act => act.id !== id));
    const currentActivities = form.getValues("activities");
    currentActivities.splice(index, 1);
    form.setValue("activities", currentActivities);
  };

  const addSkill = (skill: string) => {
    const currentSkills = form.getValues("skills");
    if (!currentSkills.includes(skill)) {
      form.setValue("skills", [...currentSkills, skill]);
    }
    setSkillsInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", currentSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader className="bg-gradient-to-r from-grubble-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Create Your Professional Resume
          {selectedTemplate && (
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              Template: {selectedTemplate}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Personal Information Section */}
            <Card className="border border-grubble-200 dark:border-grubble-700">
              <CardHeader className="bg-grubble-50 dark:bg-grubble-900/20">
                <CardTitle className="flex items-center gap-2 text-grubble-700 dark:text-grubble-300">
                  <Briefcase className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="personalInfo.fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Aarav Kumar Sharma" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalInfo.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="aarav.sharma@gmail.com" type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalInfo.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalInfo.location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai, Maharashtra" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalInfo.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input placeholder="linkedin.com/in/aarav-sharma" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalInfo.portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio Website</FormLabel>
                        <FormControl>
                          <Input placeholder="aaravportfolio.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Work Experience Section */}
            <Card className="border border-grubble-200 dark:border-grubble-700">
              <CardHeader className="bg-grubble-50 dark:bg-grubble-900/20">
                <CardTitle className="flex items-center gap-2 text-grubble-700 dark:text-grubble-300">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {workExperiences.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      {workExperiences.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkExperience(exp.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`workExperiences.${index}.company` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Tata Consultancy Services" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`workExperiences.${index}.designation` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {designationOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`workExperiences.${index}.startDate` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date *</FormLabel>
                            <FormControl>
                              <Input type="month" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`workExperiences.${index}.endDate` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type="month" placeholder="Leave blank if current" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`workExperiences.${index}.salary` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Salary (₹ per annum)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. ₹5,00,000" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`workExperiences.${index}.description` as const}
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your key responsibilities and achievements..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include specific achievements, technologies used, and impact created
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addWorkExperience}
                  className="w-full border-grubble-300 text-grubble-600 hover:bg-grubble-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Experience
                </Button>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="border border-grubble-200 dark:border-grubble-700">
              <CardHeader className="bg-grubble-50 dark:bg-grubble-900/20">
                <CardTitle className="flex items-center gap-2 text-grubble-700 dark:text-grubble-300">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {educations.map((edu, index) => (
                  <div key={edu.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      {educations.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* School Details */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-grubble-700">School/Higher Secondary</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`educations.${index}.schoolName` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>School Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Delhi Public School, Mumbai" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.percentage` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Percentage/CGPA</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 92.5%" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.startDate` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.endDate` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* College Details */}
                    <div className="space-y-4 mt-6">
                      <h5 className="font-medium text-grubble-700">College/University</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`educations.${index}.collegeName` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>College/University Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Indian Institute of Technology, Delhi" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.degree` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. B.Tech in Computer Science" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.collegePercentage` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CGPA/Percentage</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 8.5 CGPA" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.collegeStartDate` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`educations.${index}.collegeEndDate` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addEducation}
                  className="w-full border-grubble-300 text-grubble-600 hover:bg-grubble-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Education
                </Button>
              </CardContent>
            </Card>

            {/* Technical Skills Section */}
            <Card className="border border-grubble-200 dark:border-grubble-700">
              <CardHeader className="bg-grubble-50 dark:bg-grubble-900/20">
                <CardTitle className="flex items-center gap-2 text-grubble-700 dark:text-grubble-300">
                  <Code className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <FormLabel>Add Skills</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      placeholder="Type a skill and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (skillsInput.trim()) {
                            addSkill(skillsInput.trim());
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (skillsInput.trim()) {
                          addSkill(skillsInput.trim());
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Press Enter or click Add to include each skill. Suggestions: JavaScript, Python, React, Node.js, AWS, etc.
                  </p>
                </div>
                
                {/* Skills suggestions */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Quick Add Popular Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions.map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSkill(skill)}
                        className="h-8 text-xs"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Display added skills */}
                {form.watch("skills").length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Added Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {form.watch("skills").map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 bg-grubble-100 text-grubble-700 px-3 py-1 rounded-md text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 text-grubble-500 hover:text-grubble-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="border border-grubble-200 dark:border-grubble-700">
              <CardHeader className="bg-grubble-50 dark:bg-grubble-900/20">
                <CardTitle className="flex items-center gap-2 text-grubble-700 dark:text-grubble-300">
                  <Code className="h-5 w-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {projects.map((project, index) => (
                  <div key={project.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Project {index + 1}</h4>
                      {projects.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(project.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.name` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. E-commerce Website" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`projects.${index}.link` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Link</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. https://github.com/username/project" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`projects.${index}.technologies` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technologies Used</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. React, Node.js, MongoDB" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`projects.${index}.description` as const}
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project, its features, and your role..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addProject}
                  className="w-full border-grubble-300 text-grubble-600 hover:bg-grubble-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Project
                </Button>
              </CardContent>
            </Card>

            {/* Extracurricular Activities Section */}
            <Card className="border border-grubble-200 dark:border-grubble-700">
              <CardHeader className="bg-grubble-50 dark:bg-grubble-900/20">
                <CardTitle className="flex items-center gap-2 text-grubble-700 dark:text-grubble-300">
                  <Trophy className="h-5 w-5" />
                  Extracurricular Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Activity {index + 1}</h4>
                      {activities.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeActivity(activity.id, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`activities.${index}.type` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Activity Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select activity type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {activityTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`activities.${index}.organization` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization/Club</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. National Service Scheme" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`activities.${index}.role` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Role</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Team Leader, Volunteer" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name={`activities.${index}.startDate` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`activities.${index}.endDate` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name={`activities.${index}.description` as const}
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your responsibilities and achievements..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addActivity}
                  className="w-full border-grubble-300 text-grubble-600 hover:bg-grubble-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Activity
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1 bg-grubble-500 hover:bg-grubble-600 text-white">
                <FileText className="h-4 w-4 mr-2" />
                {selectedTemplate ? 'Generate Resume' : 'Choose Template'}
              </Button>
              <Button variant="outline" type="button" className="flex-1 border-grubble-500 text-grubble-500 hover:bg-grubble-50">
                <Download className="h-4 w-4 mr-2" />
                Download as PDF
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
