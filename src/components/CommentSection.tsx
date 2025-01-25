import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { api } from '../lib/api';
import AuthModal from './AuthModal';

interface Comment {
  id: number;
  comment: string;
  created_at: string;
  user_email: string;
}

interface CommentSectionProps {
  contentType: 'character' | 'movie';
  contentId: string;
}

export default function CommentSection({ contentType, contentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await api.getComments(contentType, contentId);
        setComments(comments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [contentType, contentId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      const updatedComments = await api.addComment(contentType, contentId, newComment.trim());
      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading comments...</div>;
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-2 text-yellow-400">
        <MessageSquare className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Comments</h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            rows={3}
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
        >
          Sign in to comment
        </button>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 p-4 rounded">
            <p className="text-gray-300">{comment.comment}</p>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{comment.user_email}</span>
              <span>{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => setUser(true)}
      />
    </div>
  );
}