
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, Trash2, FileText, Upload, Palette, BarChart3, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import ResumeTemplates from "@/components/resume/ResumeTemplates";
import ATSScoreAnalyzer from "@/components/resume/ATSScoreAnalyzer";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumeGenerator from "@/components/resume/ResumeGenerator";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { supabase } from "@/integrations/supabase/client";

interface SavedResume {
  id: string;
  name: string;
  template: string;
  createdAt: string;
  data: any;
}

const Resume = () => {
  const { toast } = useToast();
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showATSScore, setShowATSScore] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [generatedResumeData, setGeneratedResumeData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Mock saved resumes data - in real app this would come from backend
  const [savedResumes] = useState<SavedResume[]>([
    {
      id: "1",
      name: "Software Engineer Resume",
      template: "modern-tech",
      createdAt: "2024-01-15",
      data: { personalInfo: { fullName: "John Doe" } }
    },
    {
      id: "2", 
      name: "Data Scientist Resume",
      template: "professional",
      createdAt: "2024-01-10",
      data: { personalInfo: { fullName: "Jane Smith" } }
    }
  ]);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large", 
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const filePath = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from('resumes').upload(filePath, file, { upsert: true });

      if (error) throw error;

      setUploadedResume(file);
      setUploadedPath(filePath);
      setActiveTab("preview");
      
      toast({
        title: "Resume uploaded successfully",
        description: `File ${file.name} has been uploaded to storage and analyzed.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error?.message || "There was an error uploading your resume. Please try again. If the 'resumes' bucket doesn't exist, create it in Supabase Storage.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = () => {
    setUploadedResume(null);
    setActiveTab("upload");
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted successfully.",
    });
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setActiveTab("create");
    toast({
      title: "Template selected",
      description: "Template has been applied. Fill in your information to generate your resume.",
    });
  };

  const handleGenerateResume = (resumeData?: any) => {
    if (resumeData) {
      setGeneratedResumeData(resumeData);
      setActiveTab("preview");
      toast({
        title: "Resume generated successfully",
        description: "Your professional resume has been created.",
      });
    } else {
      setActiveTab("templates");
      toast({
        title: "Ready to generate!",
        description: "Please select a template to create your professional resume.",
      });
    }
  };

  const handleDownloadResume = async () => {
    toast({
      title: "Download initiated",
      description: "Preparing your resume PDF...",
    });
    const el = document.querySelector('.resume-pdf-area') as HTMLElement | null;
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // Add multi-page support
      let remainingHeight = imgHeight;
      let y = 0;
      while (remainingHeight > 0) {
        pdf.addImage(imgData, 'PNG', 0, y ? 0 : 0, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
        if (remainingHeight > 0) pdf.addPage();
        y += pageHeight;
      }
    }
    pdf.save('grubble-resume.pdf');
  };

  const handleResumePreview = (resume: SavedResume) => {
    setGeneratedResumeData(resume.data);
    setSelectedTemplate(resume.template);
    setActiveTab("preview");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-grubble-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-grubble-500 to-teal-600 bg-clip-text text-transparent mb-4">
              Resume Builder
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Create a professional resume that stands out to Indian recruiters
            </p>
          </motion.div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 shadow-lg">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Resume
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Create Resume
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview & History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                  <CardHeader className="bg-gradient-to-r from-grubble-500 to-teal-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Your Resume for ATS Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {!uploadedResume ? (
                        <div className="border-2 border-dashed border-grubble-300 dark:border-grubble-600 rounded-lg p-8 text-center bg-grubble-50 dark:bg-grubble-900/20">
                          <div className="flex flex-col items-center gap-4">
                            <Upload className="h-12 w-12 text-grubble-500" />
                            <div>
                              <p className="font-medium text-lg">Drop your resume here or click to browse</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Support for PDF, DOC, or DOCX files up to 10MB
                              </p>
                            </div>
                            <label htmlFor="resumeFile">
                              <div className="cursor-pointer">
                                <Button 
                                  variant="outline" 
                                  className="border-grubble-500 text-grubble-500 hover:bg-grubble-50"
                                  disabled={isUploading}
                                >
                                  {isUploading ? "Uploading..." : "Browse Files"}
                                </Button>
                                <input
                                  id="resumeFile"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  className="hidden"
                                  onChange={handleResumeUpload}
                                  disabled={isUploading}
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
                            <FileText className="h-8 w-8 mr-4 text-green-600" />
                            <div className="flex-1">
                              <p className="font-medium text-lg">{uploadedResume.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(uploadedResume.size / 1024).toFixed(2)} KB uploaded and analyzed
                              </p>
                            </div>
                              <div className="flex items-center gap-2">
                                {uploadedPath && (
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={async () => {
                                      if (!uploadedPath) return;
                                      const { data, error } = await supabase.storage.from('resumes').download(uploadedPath);
                                      if (error || !data) {
                                        toast({ title: 'Download failed', description: error?.message || 'Unable to download file.', variant: 'destructive' });
                                        return;
                                      }
                                      const url = URL.createObjectURL(data);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = uploadedResume?.name || 'resume';
                                      document.body.appendChild(a);
                                      a.click();
                                      a.remove();
                                      URL.revokeObjectURL(url);
                                    }}
                                    className="hover:bg-grubble-50"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={handleDeleteResume}
                                  className="hover:bg-red-100 dark:hover:bg-red-900/30"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="create">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <ResumeForm onGenerateResume={handleGenerateResume} selectedTemplate={selectedTemplate} />
              </motion.div>
            </TabsContent>

            <TabsContent value="templates">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                  <CardContent className="p-8">
                    <ResumeTemplates onSelectTemplate={handleTemplateSelect} />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="preview">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {/* Resume History */}
                <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Your Resume History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedResumes.map((resume) => (
                        <Card key={resume.id} className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-sm">{resume.name}</h3>
                                <p className="text-xs text-gray-500">Template: {resume.template}</p>
                                <p className="text-xs text-gray-400">Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResumePreview(resume)}
                                className="flex-1"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Preview
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={handleDownloadResume}
                                className="flex-1 bg-grubble-500 hover:bg-grubble-600"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Preview */}
                {generatedResumeData && (
                  <ResumeGenerator 
                    data={generatedResumeData}
                    templateId={selectedTemplate || 'modern-tech'}
                    onDownload={handleDownloadResume}
                  />
                )}
              </motion.div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Resume;
