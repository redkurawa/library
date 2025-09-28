export interface User {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  bookId: number;
  userId: number;
  user: User;
  comment: string;
  star: number;
  createdAt: string;
}

export interface Author {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  authorId: number;
  author: Author;
  categoryId: number;
  category: Category;
  coverImage: string;
  availableCopies: number;
  totalCopies: number;
  borrowCount: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}
