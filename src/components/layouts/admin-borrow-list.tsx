import { useAppSelector } from '@/redux/hooks';
import { GetService } from '@/services/service';
import type { TopBorrowedBook } from '@/types/admin-loans';
import { useEffect, useState } from 'react';

export const AdminBorrowList = () => {
  const [listLoans, setListLoans] = useState<TopBorrowedBook[]>([]);
  const { token } = useAppSelector((state) => state.auth);
  const { books } = useAppSelector((state) => state.book);
  const [bookCovers, setBookCovers] = useState<Record<string, string>>({});

  useEffect(() => {
    const coverMap: Record<string, string> = {};
    listLoans.forEach((loan) => {
      const matchedBook = books.find((book) => book.title === loan.title);
      if (matchedBook?.coverImage) {
        coverMap[loan.title] = matchedBook.coverImage;
      }
    });
    setBookCovers(coverMap);
  }, [listLoans, books]);

  useEffect(() => {
    if (!token) return;
    const getBorrow = async () => {
      const r = await GetService('admin/overview', token);
      setListLoans(r.data.topBorrowed);
    };
    getBorrow();
  }, []);

  return (
    <div className='sm-container mt-6'>
      <h1 className='text-[28px] font-bold'>Borrowed List</h1>
      <div>
        {listLoans.map((list) => (
          <div>
            <div className='shadow-all mb-5 flex gap-5 rounded-2xl p-5'>
              <div>
                {bookCovers[list.title] && (
                  <img
                    src={bookCovers[list.title]}
                    alt={`${list.title} cover`}
                    className='h-32 w-auto object-contain'
                  />
                )}
              </div>
              <div>
                <p className='w-fit rounded-sm border px-2 py-1 text-sm font-bold'>
                  {list.category.name}
                </p>
                <p className='text-md leading-loose font-bold md:text-xl'>
                  {list.title}
                </p>
                <p className='text-md leading-loose font-medium'>
                  {list.author.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
