import React, { useEffect, useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { blogService } from '../services/blogService';
import type { Post } from '../types/blog';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { currentAuthor } = useBlog();
  const [authorPosts, setAuthorPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentAuthor) {
      blogService.getPostsByAuthor(currentAuthor.id).then(posts => {
        setAuthorPosts(posts);
        setLoading(false);
      });
    }
  }, [currentAuthor]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Author Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your published articles and drafts.</p>
        </div>
        <Button className="w-full md:w-auto gap-2">
          <Plus size={18} />
          New Article
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <GlassCard className="p-6 h-fit lg:col-span-1 space-y-6">
          <div className="text-center space-y-4">
            <img
              src={currentAuthor?.avatar}
              alt={currentAuthor?.name}
              className="w-24 h-24 rounded-full mx-auto ring-4 ring-indigo-600/20"
            />
            <div>
              <h2 className="font-bold text-xl">{currentAuthor?.name}</h2>
              <p className="text-sm text-slate-500">{authorPosts.length} Articles</p>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <p className="text-sm italic text-slate-600 dark:text-slate-400">"{currentAuthor?.bio}"</p>
          </div>
        </GlassCard>

        <div className="lg:col-span-3 space-y-6">
          <h3 className="font-bold text-xl">Recent Posts</h3>
          
          {loading ? (
             <div className="space-y-4">
               {[1,2,3].map(i => (
                 <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
               ))}
             </div>
          ) : (
            <div className="space-y-4">
              {authorPosts.map(post => (
                <GlassCard key={post.id} className="p-4 flex items-center gap-4 transition-all hover:bg-white/90 dark:hover:bg-slate-800/80">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {post.isDraft && (
                        <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded uppercase">
                          Draft
                        </span>
                      )}
                      <span className="text-xs text-slate-400 uppercase tracking-wider">{post.category}</span>
                    </div>
                    <h4 className="font-bold truncate pr-4">{post.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{post.publishedAt} · {post.readingTime} read</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-2 min-w-0">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 min-w-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
