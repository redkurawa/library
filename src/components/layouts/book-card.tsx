import type { Book } from '@/types/books';

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className='shadow-all rounded-t-[12px]'>
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
        <p className='md:text-md text-sm font-medium'>{book.author.name} </p>
        <div className='flex items-center gap-1'>
          <img src='/icons/star.svg' alt='star' />
          <p className='md:text-md text-sm font-semibold'>{book.rating} </p>
        </div>
      </div>
    </div>
  );
};
