import { useAppSelector } from '@/redux/hooks';
import { api } from '@/services/api';
import { Capitalize } from '@/utils/capitalize';
import { Dialog, DialogOverlay } from '@radix-ui/react-dialog';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useRef } from 'react';

export const AdminBookList = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { token } = useAppSelector((state) => state.auth);

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await api.delete(`books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Book deleted successfully');
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Delete failed';
      toast.error(msg);
      console.error('Delete failed:', e);
    } finally {
    }
  };

  const { books } = useAppSelector((state) => state.book);
  return (
    <div className='mt-6'>
      <h1 className='text-[28px] font-bold'>Book List</h1>
      <Link to='/add'>
        <Button className='my-6' variant={'secondary'} size={'md'}>
          Add Book
        </Button>
      </Link>
      {books.map((book) => (
        <div className='shadow-all mb-4 flex gap-4 rounded-2xl p-5'>
          <div className='w-23'>
            {book.coverImage &&
            typeof book.coverImage === 'string' &&
            book.coverImage.trim() !== '' ? (
              <img src={book.coverImage} alt={book.title} className='' />
            ) : (
              <div className='gray-placeholder rounded-t-2xl'></div>
            )}
          </div>
          <div className='flex w-full justify-between'>
            <div>
              <span className='rounded-sm border px-2 text-sm font-bold'>
                {Capitalize(book.category.name)}
              </span>
              <h1 className='mt-2 text-lg font-bold'>{book.title}</h1>
              <h2 className='text-md mt-2 font-medium'>
                {Capitalize(book.author.name)}
              </h2>
            </div>
            <div className='flex items-center gap-3.5'>
              <Link to={`/books/${book.id}`}>
                <Button
                  variant={'outline'}
                  size={'md'}
                  className='text-md cursor-pointer px-4.5 py-5 font-bold'
                >
                  Preview
                </Button>
              </Link>
              <Button
                variant={'outline'}
                size={'md'}
                className='text-md cursor-pointer px-4.5 py-5 font-bold'
              >
                Edit
              </Button>
              <Dialog>
                <DialogOverlay className='fixed inset-0 bg-transparent' />
                <DialogTrigger>
                  <Button
                    variant={'outline'}
                    size={'md'}
                    className='text-accent-red text-md cursor-pointer px-4.5 py-5 font-bold'
                  >
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className='data-[state=open]:bg-opacity-100 w-1/2 max-w-1/2 bg-white'>
                  <DialogHeader>
                    <DialogTitle className='text-lg font-bold'>
                      Delete Data
                    </DialogTitle>
                    <DialogDescription>
                      Once deleted, you won’t be able to recover this data.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className='flex sm:justify-center sm:gap-10'>
                    <DialogClose asChild>
                      <Button
                        type='button'
                        variant='outline'
                        size='md'
                        className='w-40'
                        ref={closeRef}
                      >
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      type='button'
                      variant='secondary'
                      className='hover:text-accent-red w-40 border-0 bg-red-700 font-bold hover:bg-red-200'
                      size={'md'}
                      onClick={() => {
                        handleDelete(book.id);
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
