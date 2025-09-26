type LoanStatus = 'BORROWED' | 'RETURNED' | 'OVERDUE';

interface Book {
  id: number;
  title: string;
  coverImage: string;
}

export interface Loan {
  id: number;
  userId: number;
  bookId: number;
  book: Book;
  borrowedAt: string; // ISO date string
  dueAt: string; // ISO date string
  returnedAt: string | null;
  status: LoanStatus;
}
