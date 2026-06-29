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
  aiHint?: string; // For placeholder image search
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departureTime: string; // ISO String
  arrivalTime: string;   // ISO String
  departureCity: string;
  arrivalCity: string;
  duration: string;
  price: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
}
