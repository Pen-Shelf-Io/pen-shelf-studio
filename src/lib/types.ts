export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  price: number;
  category: string;
  pages: number;
  publishedDate: string; // YYYY-MM-DD
  isbn: string;
  featured?: boolean;
  aiHint?: string; // For placeholder image search
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
