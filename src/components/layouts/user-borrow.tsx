import { getLoanDay } from '@/lib/get-days';
import StarRating from '@/lib/StarRating';
import { useAppSelector } from '@/redux/hooks';
import { GetService, PostService } from '@/services/service';
import type { Loan } from '@/types/loans';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';

export const UserBorrow = () => {
  // const token = useAppSelector((state) => state.auth);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [bookDetails, setBookDetails] = useState<
    Record<number, { category: string; author: string }>
  >({});
  const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getLoan = async () => {
      if (user.token) {
        const r = await GetService('loans/my', user.token);
        console.log(r.data.loans);
        setLoans(r.data.loans);
      }
    };
    getLoan();
  }, [user.token]);
  // console.log('loans:', loans);

  useEffect(() => {
    const fetchDetails = async () => {
      const details: Record<number, { category: string; author: string }> = {};
      for (const loan of loans) {
        const r = await GetService(`books/${loan.book.id}`);
        // console.log('Fetched book:', r.data);
        details[loan.book.id] = {
          category: r.data.category.name,
          author: r.data.author.name,
        };
      }
      setBookDetails(details);
    };

    if (loans.length > 0) {
      fetchDetails();
    }
  }, [loans]);

  const handleReview = async (loan: Loan) => {
    if (user.token) {
      try {
        console.log(rating);
        const payload = {
          bookId: loan.book.id,
          star: rating,
          comment: review,
        };
        const r = await PostService('reviews', payload, user.token);
        console.log(r);
        if (r.data?.success === false) {
          toast.error(r.data.message || 'Gagal review buku');
        } else {
          toast.success('Review saved');
        }
      } catch (e: any) {
        const msg = e?.response?.data?.message || 'post review failed';
        toast.error(msg);
      }
    }
  };

  return (
    <>
      <div className='mx-auto w-full max-w-250'>
        {loans.map((loan) => {
          return (
            <div key={loan.id} className='shadow-all mb-4 rounded-2xl px-5'>
              <div className='flex justify-between border-b py-5'>
                <h1 className='text-md font-bold'>
                  Status :{' '}
                  {loan.status === 'BORROWED' ? 'active' : 'return'}{' '}
                </h1>
                <h1 className='text-md font-bold'>
                  Due Date{' '}
                  <span className='text-accent-red bg-[#EE1D521A] px-3 py-1 text-sm'>
                    {dayjs(loan.dueAt).format('DD MMM YYYY')}{' '}
                  </span>
                </h1>
                {/* <h1></h1> */}
              </div>
              <div className='flex gap-3 py-5'>
                <div className='w-23'>
                  <img
                    src={loan.book.coverImage}
                    alt={loan.book.title}
                    className='object-cover'
                  />
                </div>
                <div className='block w-full justify-between sm:flex'>
                  <div className=''>
                    <p className='w-fit rounded-sm border px-2 py-1 text-sm font-bold'>
                      {bookDetails[loan.book.id]?.category || 'Loading...'}
                    </p>
                    <p className='text-md leading-loose font-bold md:text-xl'>
                      {loan.book.title}
                    </p>
                    <p className='text-md leading-loose font-medium'>
                      {bookDetails[loan.book.id]?.author || 'Loading...'}
                    </p>
                    <p className='md:text-md text-sm font-bold'>
                      {dayjs(loan.borrowedAt).format('DD MMM YYYY')} .{' '}
                      {getLoanDay(loan.borrowedAt, loan.dueAt)}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button variant={'secondary'} size={'md'}>
                            Give Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Give Review</DialogTitle>
                            <DialogDescription className='hidden'></DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4'>
                            <div className='mx-auto grid gap-3'>
                              <h1 className='text-center'>Give Rating</h1>
                              <StarRating value={rating} onChange={setRating} />
                            </div>
                            <div className='grid gap-3'>
                              <Textarea
                                rows={4}
                                id='review'
                                name='review'
                                placeholder='Please share your thoughts about this book'
                                className='resize-none'
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type='submit'
                                variant={'secondary'}
                                // size={'md'}
                                className='w-full'
                                onClick={() => handleReview(loan)}
                              >
                                Save changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
