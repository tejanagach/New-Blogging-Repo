export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export type Category = 'Technology' | 'Design' | 'Business' | 'Lifestyle' | 'DevOps';

export interface Post {
  id: string;
  headline: string;
  summary: string;
  content: string;
  authorId: string;
  author?: Author;
  category: Category;
  coverImage: string;
  publishedAt: string;
  readingTime: string;
  isDraft?: boolean;
}

export interface BlogState {
  currentAuthor: Author | null;
  selectedCategory: Category | 'All';
  posts: Post[];
  isLoading: boolean;
}
