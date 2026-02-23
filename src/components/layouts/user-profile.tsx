import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Button } from '../ui/button';
import { EditProfileDialog } from './edit-profile-dialog';

export const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className='mb-27.5 w-full sm:max-w-1/2'>
      <h1 className='my-6 text-[28px] font-bold'>UserProfile</h1>
      <div className='shadow-all rounded-2xl p-5'>
        <img src='/icons/face.png' alt='' className='mb-3' />
        <div className='mb-6 flex justify-between'>
          <div className='text-md font-medium'>
            <p className='mb-3'>Name</p>
            <p className='mb-3'>Email</p>
            <p className='mb-3'>Nomor Handphone</p>
          </div>
          <div className='text-md text-right font-bold'>
            <p className='mb-3'>{user?.name}</p>
            <p className='mb-3'>{user?.email}</p>
            <p className='mb-3'>{user?.phone || '-'}</p>
          </div>
        </div>
        <Button
          className='h-9 w-full'
          variant={'secondary'}
          size={'md'}
          onClick={() => setIsDialogOpen(true)}
        >
          Update profile
        </Button>
      </div>
      <EditProfileDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};
