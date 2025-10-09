
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Star, Crown, Zap, User, Briefcase, Palette, GraduationCap, TrendingUp, Building } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  isPremium: boolean;
  rating: number;
  tags: string[];
}

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

const ResumeTemplates = ({ onSelectTemplate }: ResumeTemplatesProps) => {
  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'modern-tech': return <FileText className="h-8 w-8" />;
      case 'corporate-executive': return <Briefcase className="h-8 w-8" />;
      case 'creative-designer': return <Palette className="h-8 w-8" />;
      case 'fresh-graduate': return <GraduationCap className="h-8 w-8" />;
      case 'consultant-analyst': return <TrendingUp className="h-8 w-8" />;
      case 'startup-founder': return <Building className="h-8 w-8" />;
      default: return <User className="h-8 w-8" />;
    }
  };

  const templates: ResumeTemplate[] = [
    {
      id: 'modern-tech',
      name: 'Modern Tech Professional',
      description: 'Clean, ATS-friendly design perfect for software engineers and tech professionals',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNGOUZBRkIiIHN0cm9rZT0iI0U1RTdFQiIvPgo8cGF0aCBkPSJNNDAgNDBIMjYwVjEwMEg0MFY0MFoiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI1MCIgeT0iNTAiPgo8cGF0aCBkPSJNMTQgMlY4SDIwTDE0IDJaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTQgMkg2QTIgMiAwIDAgMCA0IDRWMjBBMiAyIDAgMCAwIDYgMjJIMThBMiAyIDAgMCAwIDIwIDIwVjhMMTQgMloiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvcGF0aD4KPC9zdmc+Cg==',
      isPremium: false,
      rating: 4.8,
      tags: ['ATS-Friendly', 'Tech', 'Clean']
    },
    {
      id: 'corporate-executive',
      name: 'Corporate Executive',
      description: 'Professional design suitable for management and executive positions',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNGNUY1RjQiIHN0cm9rZT0iIzM3NDE0OSIvPgo8cGF0aCBkPSJNNDAgNDBIMjYwVjEwMEg0MFY0MFoiIGZpbGw9IiMzNzQxNDkiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI1MCIgeT0iNTAiPgo8cGF0aCBkPSJNMjAgMTRWNkE0IDQgMCAwIDAgMTYgMkg4QTQgNCAwIDAgMCA0IDZWMTRNMjAgMTRWMjBBMiAyIDAgMCAxIDE4IDIySDZBMiAyIDAgMCAxIDQgMjBWMTRNMjAgMTRINCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==',
      isPremium: true,
      rating: 4.9,
      tags: ['Executive', 'Professional', 'Leadership']
    },
    {
      id: 'creative-designer',
      name: 'Creative Designer',
      description: 'Visually appealing template for designers and creative professionals',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNGRUY3RkYiIHN0cm9rZT0iI0Y0NzNBMCIvPgo8cGF0aCBkPSJNNDAgNDBIMjYwVjEwMEg0MFY0MFoiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MF9saW5lYXJfMV8xIiB4MT0iNDAiIHkxPSI0MCIgeDI9IjI2MCIgeTI9IjEwMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRjQ3M0EwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzlBM0FGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iNTAiIHk9IjUwIj4KPHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=',
      isPremium: true,
      rating: 4.7,
      tags: ['Creative', 'Design', 'Visual']
    },
    {
      id: 'fresh-graduate',
      name: 'Fresh Graduate',
      description: 'Perfect for students and fresh graduates entering the job market',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNGN0ZFRkQiIHN0cm9rZT0iIzIyQzU1RSIvPgo8cGF0aCBkPSJNNDAgNDBIMjYwVjEwMEg0MFY0MFoiIGZpbGw9IiMyMkM1NUUiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI1MCIgeT0iNTAiPgo8cGF0aCBkPSJNMjIgMTBWNkw1IDZNMjIgMTBMMTggMTRNMjIgMTBMMTggNk0yIDEwSDIyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K',
      isPremium: false,
      rating: 4.6,
      tags: ['Student', 'Entry-Level', 'Simple']
    },
    {
      id: 'consultant-analyst',
      name: 'Business Consultant',
      description: 'Professional template for consultants and business analysts',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNGRUY0RkYiIHN0cm9rZT0iIzg4NTVGRiIvPgo8cGF0aCBkPSJNNDAgNDBIMjYwVjEwMEg0MFY0MFoiIGZpbGw9IiM4ODU1RkYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI1MCIgeT0iNTAiPgo8cGF0aCBkPSJNMjIgMTJMMTggMTZMOCAxM0w2IDE0VjJMOCA0TDE4IDEyWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==',
      isPremium: true,
      rating: 4.8,
      tags: ['Business', 'Consulting', 'Analytics']
    },
    {
      id: 'startup-founder',
      name: 'Startup Entrepreneur',
      description: 'Dynamic template for startup founders and entrepreneurs',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNGRkZCRUIiIHN0cm9rZT0iI0Y1OTUxNiIvPgo8cGF0aCBkPSJNNDAgNDBIMjYwVjEwMEg0MFY0MFoiIGZpbGw9IiNGNTk1MTYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI1MCIgeT0iNTAiPgo8cGF0aCBkPSJNMiAzSDEzQTE0IDE0IDAgMCAxIDEzIDMxSDJBMiAyIDAgMCAxIDAgMjlWNUEyIDIgMCAwIDEgMiAzWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==',
      isPremium: false,
      rating: 4.5,
      tags: ['Startup', 'Entrepreneur', 'Innovation']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Resume Template
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a professional template that matches your career goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-2 hover:border-grubble-300 transition-all duration-200 hover:shadow-lg group">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-lg h-48 flex items-center justify-center">
                  <div className="text-grubble-600 dark:text-grubble-400">
                    {getTemplateIcon(template.id)}
                  </div>
                  <img
                    src={template.preview}
                    alt={`${template.name} template preview`}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg opacity-80"
                  />
                  {template.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-white dark:bg-gray-800 rounded px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{template.rating}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {template.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    onClick={() => onSelectTemplate(template.id)}
                    className={`w-full ${
                      template.isPremium
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                        : 'bg-grubble-500 hover:bg-grubble-600'
                    } text-white`}
                  >
                    {template.isPremium ? (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Use Premium Template
                      </>
                    ) : (
                      'Use This Template'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
