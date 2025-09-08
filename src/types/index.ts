// Database types
export interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface Post {
  id: bigint;
  author_id: string;
  title: string;
  content: string | null;
  published: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
  slug: string | null;
  // Note: thumbnail_url, excerpt, and reading_time will be added to database later
}

export interface Category {
  id: bigint;
  name: string;
}

export interface PostCategory {
  post_id: bigint;
  category_id: bigint;
}

// Extended types with relations
export interface PostWithAuthor extends Post {
  users: Pick<User, 'first_name' | 'last_name'>;
  post_categories: Array<{
    categories: Category;
  }>;
}

export interface PostWithDetails extends PostWithAuthor {
  _count?: {
    post_categories: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm extends LoginForm {
  first_name: string;
  last_name: string;
  confirmPassword: string;
}

export interface PostForm {
  title: string;
  content: string;
  published: boolean;
  categories: string[];
  thumbnail?: File;
}

// API Response types
export interface ApiResponse<T = object> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// UI State types
export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  loading: boolean;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}
