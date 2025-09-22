// src/components/BookList.tsx

// Import React hooks.
import React, { useEffect, useState } from 'react';
// Import Redux hooks.
// 'useDispatch' - To dispatch actions.
// 'useSelector' - To select state.
import { useDispatch, useSelector } from 'react-redux';
// Import types.
import type { AppDispatch, RootState } from '@/redux/store';
// Import thunk.
import { getBooks } from '@/redux/book-slice';
// Import Book type.
// import type { Book } from '../types/book';

// Functional component.
// 'const BookList: React.FC = () => { ... }' - Typed as React.FC (function component).
const BookList: React.FC = () => {
  // 'const dispatch = useDispatch<AppDispatch>();' - Typed dispatch.
  const dispatch = useDispatch<AppDispatch>();
  // Select state slices.
  // 'const { books, loading, error } = useSelector((state: RootState) => state.books);' - Destructures from books slice.
  const { books, loading, error } = useSelector(
    (state: RootState) => state.book
  );

  // console.log('isi books :', books);
  // Local state for pagination.
  // 'const [currentPage, setCurrentPage] = useState(1);' - Starts at page 1.
  const [currentPage, setCurrentPage] = useState(1);
  // 'const booksPerPage = 8;' - Constant for 8 books per page.
  const booksPerPage = 10;

  // Fetch books on mount.
  // 'useEffect(() => { dispatch(fetchBooks()); }, [dispatch]);' - Runs once, dispatches thunk.
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  // Calculate pagination.
  // 'const indexOfLastBook = currentPage * booksPerPage;' - End index.
  const indexOfLastBook = currentPage * booksPerPage;
  // 'const indexOfFirstBook = indexOfLastBook - booksPerPage;' - Start index.
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // 'const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);' - Slice array for current page.
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  // 'const totalPages = Math.ceil(books.length / booksPerPage);' - Total pages.
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Handle page change.
  // 'const paginate = (pageNumber: number) => setCurrentPage(pageNumber);' - Updates page.
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // JSX return.
  // If loading, show message.
  if (loading) return <p>Loading...</p>;
  // If error, show error.
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className='mb-5 text-2xl font-bold md:text-[36px]'>Recommendation</h1>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-5'>
        {currentBooks.map((book) => (
          <div key={book.id} className='shadow-all rounded-t-[12px]'>
            <div className='mb-5 h-[258px] md:h-[336px]'>
              {book.coverImage &&
              typeof book.coverImage === 'string' &&
              book.coverImage.trim() !== '' ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className='rounded-t-[12px]'
                />
              ) : (
                <div className='gray-placeholder rounded-t-2xl'></div>
              )}
            </div>
            <div className='p-3'>
              <p className='text-sm font-bold md:text-lg'>{book.title} </p>
              <p className='md:text-md text-sm font-medium'>
                {book.author.name}{' '}
              </p>
              <div className='flex items-center gap-1'>
                <img src='/icons/star.svg' alt='star' />
                <p className='md:text-md text-sm font-semibold'>
                  {book.rating}{' '}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          // Button for each page, calls paginate on click.
          <button key={page} onClick={() => paginate(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

// Export component.
export default BookList;
