import React from 'react';
import { useBlog } from '../context/BlogContext';
import { PostCard } from '../components/PostCard';
import type { Category } from '../types/blog';

const CATEGORIES: (Category | 'All')[] = ['All', 'Technology', 'Design', 'Business', 'Lifestyle', 'DevOps'];

const HomePage: React.FC = () => {
  const { posts, isLoading, selectedCategory, setCategory } = useBlog();

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="space-y-12">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Insights from the Digital Frontier
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Discover the latest stories in design, technology, and indie business.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!isLoading && filteredPosts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No articles found for this category.
        </div>
      )}
    </div>
  );
};

export default HomePage;
