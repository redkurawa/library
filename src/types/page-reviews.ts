export type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string; // ISO date string
  book: {
    id: number;
    title: string;
    coverImage: string;
  };
};
