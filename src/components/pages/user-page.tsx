// import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Header } from '../layouts/header';
import { Footer } from '../layouts/footer';
import { useNavigate, useParams } from 'react-router';
import { UserBorrow } from '../layouts/user-borrow';
import { UserReviews } from '../layouts/user-reviews';
import { UserProfile } from '../layouts/user-profile';

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const tabValue = id ?? 'profile';
  // console.log(tabValue);

  return (
    <>
      <Header />
      <div className='mx-auto w-full max-w-250 px-2'>
        <Tabs
          value={tabValue}
          onValueChange={(val) => navigate(`/user/${val}`)}
          className='mt-12'
        >
          <TabsList className='w-1/2'>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='borrow'>Borrowed List</TabsTrigger>
            <TabsTrigger value='review'>Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value='profile'>
            <UserProfile />
          </TabsContent>
          <TabsContent value='borrow'>
            <h1 className='py-6 text-[28px] font-bold'>Borrowed List</h1>
            <UserBorrow />
          </TabsContent>
          <TabsContent value='review'>
            <h1 className='py-6 text-[28px] font-bold'>Rivews</h1>
            <UserReviews />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};
