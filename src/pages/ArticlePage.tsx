import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Share2, Bookmark } from 'lucide-react';
import type { Post } from '../types/blog';
import { blogService } from '../services/blogService';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      blogService.getPostById(id).then(data => {
        if (data) setPost(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 space-y-8 animate-pulse">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 w-3/4 rounded-lg" />
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="text-center py-20">Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
        <ChevronLeft size={16} />
        Back to Feed
      </Link>

      <article className="space-y-10">
        <header className="space-y-6">
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-md uppercase tracking-wider">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={post.author?.avatar}
                alt={post.author?.name}
                className="w-12 h-12 rounded-full ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-950"
              />
              <div>
                <div className="font-bold">{post.author?.name}</div>
                <div className="text-sm text-slate-500">{post.publishedAt} · {post.readingTime} read</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
                <Bookmark size={18} />
              </Button>
              <Button variant="secondary" size="sm">
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </header>

        <GlassCard hoverable={false} className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </GlassCard>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
          <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
            {post.excerpt}
          </p>
          <div className="mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {post.content}
            <br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
