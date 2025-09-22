export type Book = {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
  };
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type BookResponse = {
  success: boolean;
  message: string;
  data: {
    books: Book[];
  };
};

// export type Book = {
//   id: number;
//   title: string;
//   description?: string | null;
//   isbn: string;
//   publishedYear?: number | null;
//   coverImage?: string | null;
//   rating: number;
//   reviewCount: number;
//   totalCopies: number;
//   availableCopies: number;
//   borrowCount: number;
//   authorId: number;
//   categoryId: number;
//   createdAt: string; // ISO 8601 date-time string, e.g., "2023-10-05T14:30:00Z"
//   updatedAt: string; // ISO 8601 date-time string, e.g., "2023-10-05T14:30:00Z"
// };
