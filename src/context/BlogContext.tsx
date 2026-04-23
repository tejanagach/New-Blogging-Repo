import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Author, Category, BlogState } from '../types/blog';
import { blogService } from '../services/blogService';

interface BlogContextType extends BlogState {
  setCategory: (category: Category | 'All') => void;
  setCurrentAuthor: (author: Author | null) => void;
  refreshPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BlogState>({
    currentAuthor: null,
    selectedCategory: 'All',
    posts: [],
    isLoading: true,
  });

  const refreshPosts = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const posts = await blogService.fetchEveryPost();
      setState(prev => ({ ...prev, posts, isLoading: false }));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    refreshPosts();
    // Initialize with a default author for demo purposes
    blogService.getAuthors().then(authors => {
      if (authors.length > 0) {
        setState(prev => ({ ...prev, currentAuthor: authors[0] }));
      }
    });
  }, []);

  const setCategory = (category: Category | 'All') => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const setCurrentAuthor = (author: Author | null) => {
    setState(prev => ({ ...prev, currentAuthor: author }));
  };

  return (
    <BlogContext.Provider value={{ ...state, setCategory, setCurrentAuthor, refreshPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
