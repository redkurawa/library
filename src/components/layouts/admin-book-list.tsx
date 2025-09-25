import { useAppSelector } from '@/redux/hooks';
import { Capitalize } from '@/utils/capitalize';
import { Button } from '../ui/button';

export const AdminBookList = () => {
  const { books } = useAppSelector((state) => state.book);
  return (
    <div>
      AdminBookList
      <h1>Book List</h1>
      <Button>Add Book</Button>
      {books.map((book) => (
        <div className='shadow-all flex gap-4 p-5'>
          <div className='w-23'>
            {book.coverImage &&
            typeof book.coverImage === 'string' &&
            book.coverImage.trim() !== '' ? (
              <img src={book.coverImage} alt={book.title} className='' />
            ) : (
              <div className='gray-placeholder rounded-t-2xl'></div>
            )}
          </div>
          <div>
            <span className='rounded-sm border px-2 text-sm font-bold'>
              {Capitalize(book.category.name)}
            </span>
            <h1 className='mt-2 text-lg font-bold'>{book.title}</h1>
            <h2 className='text-md mt-2 font-medium'>
              {Capitalize(book.author.name)}
            </h2>
          </div>
        </div>
        // <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
