import { useAppSelector } from '@/redux/hooks';
import { GetService } from '@/services/service';
import type { Review } from '@/types/page-reviews';
import { useEffect, useState } from 'react';
import { StarRated } from '../ui/star-rating';
import dayjs from 'dayjs';
// import { Header } from './header';
// import { Footer } from './footer';

export const UserReviews = () => {
  const user = useAppSelector((state) => state.auth);
  const [reviews, setReviews] = useState<Review[]>([]);

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
    console.log('Updated reviews:', reviews);
  }, [reviews]);

  return (
    <>
      <div>
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
                <p className='text-sm font-bold'>category</p>
                <p className='text-xl font-bold'>{review.book.title}</p>
                <p className='text-md font-medium'>Author</p>
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
