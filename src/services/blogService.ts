import type { Post, Author } from '../types/blog';

const MOCK_AUTHORS: Author[] = [
  {
    id: 'a11212',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    bio: 'Fullstack Developer & Design Enthusiast'
  },
  {
    id: 'a2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    bio: 'UI/UX Designer & Product Strategist'
  }
];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    headline: 'The Future of Glassmorphism in Web Design',
    summary: 'Exploring how frosted glass effects are evolving in 2024 and beyond.',
    content: 'Glassmorphism is more than just a trend; it is a sophisticated design language that leverages transparency and layered interfaces...',
    authorId: 'a2',
    category: 'Design',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop',
    publishedAt: '2024-03-15',
    readingTime: '5 min'
  },
  {
    id: '2',
    headline: 'Scaling React Applications with Modern Patterns',
    summary: 'A deep dive into server components, streaming, and advanced state management.',
    content: 'When building large-scale React applications, architectural decisions made early on can have massive impacts on performance...',
    authorId: 'a1',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    publishedAt: '2024-03-12',
    readingTime: '8 min      '
  },
  {
    id: '3',
    headline: 'Business Strategies for Indie Hackers',
    summary: 'How to transition from a side project to a sustainable business.',
    content: 'Indie hacking is about more than just writing code; it is about finding a market fit and building a sustainable business model...',
    authorId: 'a1',
    category: 'Business',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    publishedAt: '2024-03-10',
    readingTime: '6 min'
  },
  {
    id: '4',
    headline: 'Optimizing CI/CD Pipelines for Speed',
    summary: 'Practical tips to reduce your build times and improve developer experience.',
    content: 'Continuous Integration and Deployment are the backbone of modern software development, but slow pipelines can kill productivity...',
    authorId: 'a1',
    category: 'DevOps',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    publishedAt: '2024-03-08',
    readingTime: '10 min',
    isDraft: true
  }
];

export const blogService = {
  fetchEveryPost: async (): Promise<Post[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_POSTS.filter(p => !p.isDraft).map(post => ({
      ...post,
      author: MOCK_AUTHORS.find(a => a.id === post.authorId)
    }));
  },

  getPostById: async (id: string): Promise<Post | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const post = MOCK_POSTS.find(p => p.id === id);
    if (post) {
      return {
        ...post,
        author: MOCK_AUTHORS.find(a => a.id === post.authorId)
      };
    }
    return undefined;
  },

  getPostsByAuthor: async (authorId: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_POSTS.filter(p => p.authorId === authorId).map(post => ({
      ...post,
      author: MOCK_AUTHORS.find(a => a.id === post.authorId)
    }));
  },

  getAuthors: async (): Promise<Author[]> => {
    return MOCK_AUTHORS;
  }
};
