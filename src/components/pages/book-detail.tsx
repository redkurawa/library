import { addCart } from '@/redux/cart-slice';
import { useAppSelector } from '@/redux/hooks';
import type { AppDispatch } from '@/redux/store';
import { GetService, PostService } from '@/services/service';
import type { Book } from '@/types/detail-book';
import { Capitalize } from '@/utils/capitalize';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { BookCard } from '../layouts/book-card';
import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';
import { Button } from '../ui/button';
import { StarRated } from '../ui/star-rating';

export const BookDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<Book | null>(null);
  const url = `books/${id}`;
  const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const r = await GetService(url);
        const bookData: Book = r.data;
        // console.log('Data received:', bookData);
        setDetail(bookData);
      } catch (err) {}
    };
    getDetail();
  }, []);

  const { books } = useAppSelector((state) => state.book);
  const relatedBook = books.filter(
    (book) => book.category.name === detail?.category.name
  );
  // console.log({ relatedBook });

  const cartItems = useAppSelector((state) => state.cart);
  // console.log(cartItems);

  const handleCart = () => {
    // console.log('User value:', user.user);
    if (!user.user) {
      // console.log('User is null or undefined');
      toast.error('harap login terlebih dahulu');
      return;
    }
    if (
      !detail?.id ||
      !detail?.title ||
      !detail?.author?.name ||
      !detail?.category?.name
    )
      return;
    const isExist = cartItems.some((item) => item.idBook === detail?.id);

    if (isExist) {
      toast.warning('Buku sudah ada di keranjang');
      return;
    }

    dispatch(
      addCart({
        idBook: detail?.id,
        title: detail?.title,
        author: detail?.author?.name,
        category: detail?.category?.name,
      })
    );

    toast.success('Buku berhasil ditambahkan ke keranjang');
  };

  // const handleBorrow = () => {
  //   if (!user.token) {
  //     // console.log('User is null or undefined');
  //     toast.error('harap login terlebih dahulu');
  //     return;
  //   }
  //   const payload = { bookId: detail?.id, days: 7 };
  //   console.log(payload);
  //   const r = PostService('loans', payload, user.token);
  //   return r;
  // };

  const handleBorrow = async () => {
    if (!user.token) {
      toast.error('Harap login terlebih dahulu');
      return;
    }

    const payload = { bookId: detail?.id, days: 7 };

    try {
      const res = await PostService('loans', payload, user.token);

      // Jika backend mengembalikan success: false tapi tidak melempar error
      if (res.data?.success === false) {
        toast.error(res.data.message || 'Gagal meminjam buku');
      } else {
        toast.success('Sukses pinjam buku');
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        'Terjadi kesalahan saat meminjam buku';
      toast.error(msg);
    }
  };

  return (
    <>
      <Header />
      <div className='sm-container mx-auto mt-25 flex gap-9 border-b pb-16'>
        <div>
          <img
            src={detail?.coverImage}
            alt={detail?.title}
            className='h-auto max-h-[400px] w-auto flex-none object-contain'
          />
        </div>

        <div className='flex-1'>
          <h1 className='mb-2 text-3xl font-bold'>{detail?.title}</h1>
          <p className='mb-1 py-1 text-lg text-gray-600'>
            {detail?.author.name}
          </p>
          <p className='mb-4 text-sm text-yellow-500'>⭐{detail?.rating} </p>
          <div className='grid grid-cols-[102px_102px_102px_1fr] gap-10'>
            <div className='border-r'>
              <h1 className='text-2xl leading-9'>1</h1>
              <p className='text-md'>Page</p>
            </div>
            <div className='border-r'>
              <h1 className='text-2xl leading-9'>2</h1>
              <p className='text-md'>Rating</p>
            </div>
            <div className='border-r'>
              <h1 className='text-2xl leading-9'>{detail?.authorId}</h1>
              <p className='text-md'>Reviews</p>
            </div>
            <div></div>
          </div>
          <div>
            <h2 className='mt-6 mb-2 border-t pt-5 text-xl font-bold'>
              Description
            </h2>
            <p className='leading-relaxed text-gray-800'>
              {detail?.description}
            </p>
          </div>
          <div className='mt-5 flex gap-3'>
            <Button variant={'outline'} size={'md'} onClick={handleCart}>
              Add to cart
            </Button>
            <Button variant={'secondary'} size={'md'} onClick={handleBorrow}>
              Borrow
            </Button>
          </div>
        </div>
      </div>
      <div className='sm-container pb-16'>
        {/* <h1 className='mt-16 mb-5 text-4xl font-bold'>Review</h1> */}
        <ShowReview detail={detail} />
      </div>
      <div className='sm-container pb-16'>
        <h1 className='mt-16 mb-10 text-4xl font-bold'>Related Books</h1>
        {/* <div>Kategory buku : {detail?.category.name}</div> */}
        <div className='grid grid-cols-5 gap-5'>
          {relatedBook.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const ShowReview = ({ detail }: { detail: Book | null }) => {
  if (!detail || detail.reviewCount === 0) return null;
  return (
    <div className='border-b pb-16'>
      <h1 className='mt-16 mb-5 text-4xl font-bold'>Review</h1>
      <div className='grid grid-cols-2 gap-5'>
        {detail.reviews.map((review) => (
          <div key={review.id} className='shadow-all rounded-2xl p-4'>
            <div className='mb-4 flex items-center gap-3'>
              <img src='/icons/face.png' alt='' />
              <div>
                <div className='text-lg font-bold'>
                  {Capitalize(review.user.name)}
                </div>
                <div className='text-md font-medium'>
                  {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
                </div>
              </div>
            </div>
            <StarRated star={review.star} />
            <div className='text-md mt-2 font-semibold'>{review.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
