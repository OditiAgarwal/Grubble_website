
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface CreatePostDialogProps {
  children: React.ReactNode;
}

const CreatePostDialog = ({ children }: CreatePostDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');

  const suggestedTags = ['React', 'JavaScript', 'Python', 'WebDevelopment', 'DataScience', 'MachineLearning', 'UI/UX', 'Career'];

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handlePost = () => {
    if (postContent.trim()) {
      toast.success('Post shared successfully!');
      setPostContent('');
      setSelectedTags([]);
      setIsOpen(false);
    } else {
      toast.error('Please write something to share!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">Your Name</p>
              <p className="text-sm text-gray-500">Share your thoughts with the community</p>
            </div>
          </div>
          
          <Textarea
            placeholder="What's on your mind? Share your achievements, ask for help, or start a discussion..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  #{tag}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-grubble-50"
                  onClick={() => handleAddTag(tag)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
              />
              <Button size="sm" variant="outline" onClick={handleAddCustomTag}>
                Add
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePost} className="bg-grubble-500 hover:bg-grubble-600">
              Share Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
