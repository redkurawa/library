import type { Book } from '@/types/books';
import { useState } from 'react';

export const BookCard = ({ book }: { book: Book }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidCover =
    book.coverImage &&
    typeof book.coverImage === 'string' &&
    book.coverImage.trim() !== '' &&
    !imageError;

  return (
    <div className='flex h-[468px] flex-col shadow-all rounded-t-[12px]'>
      <div className='h-48 overflow-hidden'>
        {hasValidCover ? (
          <img
            src={book.coverImage as string}
            alt={book.title}
            className='h-full w-full rounded-t-[12px] object-cover'
            onError={() => setImageError(true)}
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-t-[12px] bg-gray-200'>
            <svg
              className='h-12 w-12 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col justify-between p-3'>
        <div>
          <p className='mb-1 line-clamp-2 text-sm font-bold md:text-lg'>{book.title}</p>
          <p className='mb-2 line-clamp-1 text-sm font-medium md:text-md'>{book.author.name}</p>
        </div>
        <div className='flex items-center gap-1'>
          <img src='/icons/star.svg' alt='star' />
          <p className='text-sm font-semibold md:text-md'>{book.rating}</p>
        </div>
      </div>
    </div>
  );
};
