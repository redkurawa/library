export type BookCategory = {
  id: number;
  name: string;
};

export type BookAuthor = {
  id: number;
  name: string;
};

export type TopBorrowedBook = {
  id: number;
  title: string;
  borrowCount: number;
  rating: number;
  availableCopies: number;
  totalCopies: number;
  author: BookAuthor;
  category: BookCategory;
};

export type BorrowedBooks = {
  generatedAt: string;
  totals: {
    books: number;
    users: number;
  };
  loans: {
    active: number;
    overdue: number;
  };
  topBorrowed: TopBorrowedBook[];
};
