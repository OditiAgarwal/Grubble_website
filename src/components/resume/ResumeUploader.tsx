import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Trash2, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface Resume {
  id: string;
  title: string;
  file_name: string;
  file_path: string;
  file_size: number;
  ats_score?: number;
  created_at: string;
}

interface ResumeUploaderProps {
  resumes: Resume[];
  onUploadComplete: () => void;
}

const ResumeUploader = ({ resumes, onUploadComplete }: ResumeUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const { isLoggedIn } = useAuth();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !isLoggedIn) return;

    if (!title.trim()) {
      toast.error('Please enter a title for your resume');
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save resume metadata to database
      const { error: dbError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          title: title.trim(),
          file_name: file.name,
          file_path: uploadData.path,
          file_size: file.size,
          ats_score: Math.floor(Math.random() * 40) + 60 // Mock ATS score
        });

      if (dbError) throw dbError;

      toast.success('Resume uploaded successfully');
      setTitle('');
      onUploadComplete();
      
      // Reset file input
      event.target.value = '';
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (resume: Resume) => {
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .download(resume.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = resume.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
    }
  };

  const handleDelete = async (resumeId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('resumes')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId);

      if (dbError) throw dbError;

      toast.success('Resume deleted successfully');
      onUploadComplete();
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isLoggedIn) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Please log in to upload and manage your resumes.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Resume
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="resume-title">Resume Title</Label>
            <Input
              id="resume-title"
              placeholder="e.g., Software Engineer Resume"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="resume-file">Choose PDF File</Label>
            <Input
              id="resume-file"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>
          {uploading && (
            <div className="text-center text-grubble-600">
              Uploading resume...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Resumes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            My Resumes ({resumes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resumes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No resumes uploaded yet. Upload your first resume above!
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-grubble-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">{resume.title}</h3>
                      <div className="text-sm text-gray-500">
                        {resume.file_name} • {formatFileSize(resume.file_size)} • {formatDate(resume.created_at)}
                      </div>
                      {resume.ats_score && (
                        <div className="text-sm text-grubble-600">
                          ATS Score: {resume.ats_score}/100
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(resume)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(resume.id, resume.file_path)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeUploader;