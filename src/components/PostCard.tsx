import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types/blog';
import { GlassCard } from './GlassCard';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/article/${post.id}`}>
      <GlassCard className="h-full flex flex-col group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-indigo-600/80 backdrop-blur-md text-white text-xs font-bold rounded-md uppercase tracking-wider">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 dark:text-slate-400">
            <time>{post.publishedAt}</time>
            <span>•</span>
            <span>{post.readingTime} read</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          
          <div className="mt-auto flex items-center gap-3">
            <img
              src={post.author?.avatar}
              alt={post.author?.name}
              className="w-8 h-8 rounded-full border border-white/20"
            />
            <span className="text-sm font-medium">{post.author?.name}</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};
