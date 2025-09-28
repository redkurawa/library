import { useAppSelector } from '@/redux/hooks';
import { GetService } from '@/services/service';
import type { TopBorrowedBook } from '@/types/admin-loans';
import { useEffect, useState } from 'react';

export const AdminBorrowList = () => {
  const [listLoans, setListLoans] = useState<TopBorrowedBook[]>([]);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;
    const getBorrow = async () => {
      const r = await GetService('admin/overview', token);
      console.log(r.data.topBorrowed);
      setListLoans(r.data.topBorrowed);
    };
    getBorrow();
  }, []);
  return (
    <div className='sm-container mt-6'>
      <h1 className='text-[28px] font-bold'>Borrowed List</h1>
      <div>
        {listLoans.map((list) => (
          <div className='shadow-all mb-5 rounded-2xl'>
            <div>{list.category.name}</div>
            <div>{list.title}</div>
            <div>{list.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
