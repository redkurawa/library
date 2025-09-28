import { getBooks } from '@/redux/book-slice';
import type { AppDispatch, RootState } from '@/redux/store';
import type { Book } from '@/types/books';
import { Capitalize } from '@/utils/capitalize';
import { LucideCircleUserRound } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BookList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector(
    (state: RootState) => state.book
  );

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const authorCounts = Object.entries(
    books.reduce(
      (acc: { [key: number]: { name: string; count: number } }, book: Book) => {
        const authorId = book.authorId;
        const authorName = book.author.name;
        if (!acc[authorId]) {
          acc[authorId] = { name: authorName, count: 0 };
        }
        acc[authorId].count += 1;
        return acc;
      },
      {}
    )
  )
    .map(([authorId, { name, count }]) => ({
      authorId: Number(authorId),
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className='mb-4 border-t pt-4 text-2xl font-bold md:mb-10 md:pt-12 md:text-4xl'>
        Popular Authors
      </h2>
      <div className='mb-4 grid grid-cols-1 gap-4 md:mb-29 md:grid-cols-4 md:gap-5'>
        {authorCounts.map((author) => (
          <div key={author.authorId} className='shadow-all rounded-[12px] p-4'>
            <div className='flex items-center gap-4'>
              <LucideCircleUserRound className='ball size-18' />
              <div>
                <p className='text-lg font-bold'>{Capitalize(author.name)}</p>
                <div className='text-md flex items-center font-medium'>
                  <img src='/icons/book.svg' alt='book' />
                  {author.count} {author.count == 1 ? 'book' : 'books'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
