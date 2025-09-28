import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { getBooks } from '@/redux/book-slice';
import { Link } from 'react-router';
import { BookCard } from './book-card';
const BookList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector(
    (state: RootState) => state.book
  );
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className='mb-5 text-2xl font-bold md:text-[36px]'>Recommendation</h1>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-5'>
        {currentBooks.map((book) => (
          <Link key={book.id} to={`books/${book.id}`}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
      <div className='m-5 mx-auto flex w-full justify-center'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className='m-1 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600'
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
