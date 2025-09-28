import { useAppSelector } from '@/redux/hooks';
import { GetService } from '@/services/service';
import type { Review } from '@/types/page-reviews';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { StarRated } from '../ui/star-rating';

export const UserReviews = () => {
  const user = useAppSelector((state) => state.auth);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookDetails, setBookDetails] = useState<
    Record<number, { category: string; author: string }>
  >({});

  useEffect(() => {
    const getReview = async () => {
      if (user.token) {
        const r = await GetService('me/reviews', user.token);
        setReviews(r.data.reviews);
      }
    };
    getReview();
  }, [user.token]);

  useEffect(() => {
    const fetchDetails = async () => {
      const details: Record<number, { category: string; author: string }> = {};
      for (const review of reviews) {
        const r = await GetService(`books/${review.book.id}`);
        // console.log('Fetched book:', r.data);
        details[review.book.id] = {
          category: r.data.category.name,
          author: r.data.author.name,
        };
      }
      setBookDetails(details);
    };

    if (reviews.length > 0) {
      fetchDetails();
    }
  }, [reviews]);

  // useEffect(() => {
  //   // console.log('Updated reviews:', reviews);
  //   console.log('Updated reviews:', bookDetails);
  // }, [bookDetails]);

  return (
    <>
      <div className=''>
        {reviews.map((review) => (
          <div key={review.id} className='shadow-all mb-6 rounded-2xl p-5'>
            <p className='text-md border-b pb-5 font-semibold'>
              {dayjs(review.createdAt).format('DD MMM YYYY, HH:MM')}
            </p>
            <div className='flex gap-5 border-b py-5'>
              <img
                src={review.book.coverImage}
                alt={review.book.title}
                className='w-23 object-cover'
              />
              <div className='py-5'>
                <p className='w-fit rounded-sm border px-2 py-1 text-sm font-bold'>
                  {bookDetails[review.book.id]?.category || 'Loading...'}
                </p>
                <p className='text-xl leading-loose font-bold'>
                  {review.book.title}
                </p>
                <p className='text-md leading-loose font-medium'>
                  {bookDetails[review.book.id]?.author || 'Loading...'}
                </p>
              </div>
            </div>
            <div className='pt-5 pb-2'>
              <StarRated star={review.star} />
            </div>
            <div className='text-md font-semibold'>{review.comment}</div>
          </div>
        ))}
      </div>
    </>
  );
};
