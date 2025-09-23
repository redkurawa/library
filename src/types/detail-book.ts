// Tipe untuk data pengguna yang membuat ulasan
export interface User {
  id: number;
  name: string;
}

// Tipe untuk ulasan buku
export interface Review {
  id: number;
  bookId: number;
  userId: number;
  user: User; // Objek pengguna terkait dengan ulasan
  comment: string;
  star: number;
  createdAt: string; // Menggunakan string untuk tanggal ISO 8601
}

// Tipe untuk data penulis buku
export interface Author {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

// Tipe untuk data kategori buku
export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Tipe utama untuk data buku
export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  authorId: number;
  author: Author; // Objek penulis terkait
  categoryId: number;
  category: Category; // Objek kategori terkait
  coverImage: string; // Representasi string dari gambar (base64)
  availableCopies: number;
  totalCopies: number;
  borrowCount: number;
  rating: number;
  reviewCount: number;
  reviews: Review[]; // Array dari objek ulasan
  createdAt: string;
  updatedAt: string;
}
