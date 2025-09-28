import { useAppSelector } from '@/redux/hooks';
import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { AdminBookList } from '../layouts/admin-book-list';
import { AdminBorrowList } from '../layouts/admin-borrow-list';

export const Admin = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!user || user.id !== 1) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <div className='sm-container'>
        <Tabs defaultValue='borrowed' className='mt-12'>
          <TabsList aria-label='Admin Panel Tabs' className='w-1/2'>
            <TabsTrigger value='borrowed'>Borrowed List</TabsTrigger>
            <TabsTrigger value='user'>User</TabsTrigger>
            <TabsTrigger value='list'>Book List</TabsTrigger>
          </TabsList>
          <TabsContent value='borrowed'>
            <AdminBorrowList />
          </TabsContent>
          <TabsContent value='user'>Change your user here.</TabsContent>
          <TabsContent value='list'>
            <AdminBookList />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};
