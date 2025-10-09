
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface PostInteractionHandlerProps {
  postId: string;
  initialLikes: number;
  initialComments: number;
}

const PostInteractionHandler = ({ postId, initialLikes, initialComments }: PostInteractionHandlerProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments] = useState(initialComments);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
      toast.success('Removed like');
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      toast.success('Post liked!');
    }
  };

  const handleComment = () => {
    toast.info('Comment feature coming soon!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out this post: Post ${postId}`);
    toast.success('Post link copied to clipboard!');
  };

  return (
    <div className="flex justify-between items-center pt-3 border-t">
      <div className="flex gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleComment}>
          <MessageCircle className="h-4 w-4" />
          {comments}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default PostInteractionHandler;
