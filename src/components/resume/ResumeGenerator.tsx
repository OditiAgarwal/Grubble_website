
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  workExperiences: Array<{
    company: string;
    designation: string;
    startDate: string;
    endDate: string;
    salary: string;
    description: string;
  }>;
  educations: Array<{
    schoolName: string;
    percentage: string;
    startDate: string;
    endDate: string;
    collegeName: string;
    degree: string;
    collegePercentage: string;
    collegeStartDate: string;
    collegeEndDate: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
  activities: Array<{
    type: string;
    organization: string;
    role: string;
    description: string;
    startDate: string;
    endDate: string;
  }>;
}

interface ResumeGeneratorProps {
  data: ResumeData;
  templateId: string;
  onDownload: () => void;
}

const ResumeGenerator = ({ data, templateId, onDownload }: ResumeGeneratorProps) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Generated Resume
        </h2>
        <Button onClick={onDownload} className="bg-grubble-500 hover:bg-grubble-600">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto bg-white shadow-lg resume-pdf-area">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="text-center border-b-2 border-grubble-500 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {data.personalInfo.fullName || 'Aarav Kumar Sharma'}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.portfolio && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {data.personalInfo.portfolio}
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-grubble-700 mb-3 border-b border-gray-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700">
              Motivated {data.personalInfo.fullName ? 'professional' : 'software engineer'} with strong technical skills and passion for innovation. 
              Experienced in modern technologies and committed to delivering high-quality solutions.
            </p>
          </div>

          {/* Work Experience */}
          {data.workExperiences.some(exp => exp.company) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-grubble-700 mb-3 border-b border-gray-300 pb-1">
                WORK EXPERIENCE
              </h2>
              {data.workExperiences.map((exp, index) => (
                exp.company && (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.designation}</h3>
                        <p className="text-grubble-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
                        {exp.salary && <p>₹{exp.salary}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 text-sm">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {data.educations.some(edu => edu.schoolName || edu.collegeName) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-grubble-700 mb-3 border-b border-gray-300 pb-1">
                EDUCATION
              </h2>
              {data.educations.map((edu, index) => (
                <div key={index} className="mb-4">
                  {edu.collegeName && (
                    <div className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-grubble-600">{edu.collegeName}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{formatDate(edu.collegeStartDate)} - {formatDate(edu.collegeEndDate)}</p>
                          {edu.collegePercentage && <p>{edu.collegePercentage}%</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  {edu.schoolName && (
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">Class XII</h3>
                          <p className="text-grubble-600">{edu.schoolName}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                          {edu.percentage && <p>{edu.percentage}%</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Technical Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-grubble-700 mb-3 border-b border-gray-300 pb-1">
                TECHNICAL SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-grubble-100 text-grubble-700 px-3 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.some(project => project.name) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-grubble-700 mb-3 border-b border-gray-300 pb-1">
                PROJECTS
              </h2>
              {data.projects.map((project, index) => (
                project.name && (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      {project.link && (
                        <a href={project.link} className="text-grubble-600 text-sm hover:underline">
                          View Project
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                    )}
                    {project.technologies && (
                      <p className="text-grubble-600 text-sm">
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Extracurricular Activities */}
          {data.activities.some(activity => activity.type) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-grubble-700 mb-3 border-b border-gray-300 pb-1">
                EXTRACURRICULAR ACTIVITIES
              </h2>
              {data.activities.map((activity, index) => (
                activity.type && (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{activity.role}</h3>
                        <p className="text-grubble-600">{activity.organization} - {activity.type}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</p>
                      </div>
                    </div>
                    {activity.description && (
                      <p className="text-gray-700 text-sm">{activity.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeGenerator;
