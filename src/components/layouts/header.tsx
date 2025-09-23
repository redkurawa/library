import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Logo } from '../ui/logo';

export const Header = () => {
  return (
    <div className='h-20 border-b'>
      <div className='sm-container flex h-20 items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Logo className='text-primary-300' />
          <h1 className='text-[32px] font-extrabold'>Booky</h1>
        </div>
        <div>
          <div className='text-md hidden items-center gap-4 md:flex'>
            <Button
              className='cursor-pointer text-neutral-950 hover:border-0 hover:bg-neutral-200/40 hover:text-black'
              variant={'outline'}
              size={'md'}
            >
              <Link to='/login'>Login</Link>
            </Button>
            <Button
              className='cursor-pointer hover:bg-neutral-200/30 hover:text-white'
              variant={'secondary'}
              size={'md'}
            >
              <Link to='/register'>Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
