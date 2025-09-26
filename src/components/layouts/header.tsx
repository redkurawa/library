import { useAppSelector } from '@/redux/hooks';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Logo } from '../ui/logo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DropDownUserMenu } from './dropdown-user';

export const Header = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  return (
    <div className='h-20 border-b'>
      <div className='sm-container flex h-20 items-center justify-between px-1 md:px-0'>
        <Link to='/'>
          <div className='flex items-center gap-4'>
            <Logo className='text-primary-300' />
            <h1 className='text-[32px] font-extrabold'>Booky</h1>
          </div>
        </Link>
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=''>
              <div className='flex items-center gap-3'>
                <img src='/icons/face.png' alt='' />
                {user?.name}
              </div>
            </DropdownMenuTrigger>
            <DropDownUserMenu />
          </DropdownMenu>
        ) : (
          <>
            <div className='text-md hidden items-center gap-4 md:flex'>
              <Button
                className='cursor-pointer'
                variant={'outline'}
                size={'md'}
              >
                <Link to='/login'>Login</Link>
              </Button>
              <Button
                className='cursor-pointer hover:bg-neutral-200/30'
                variant={'secondary'}
                size={'md'}
              >
                <Link to='/register'>Register</Link>
              </Button>
            </div>
            <div className='md:hidden'>
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent side='top' className='w-full'>
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  <div className='text-md flex justify-around gap-4 p-5'>
                    <Button
                      className='cursor-pointer'
                      variant={'outline'}
                      size={'md'}
                    >
                      <Link to='/login'>Login</Link>
                    </Button>
                    <Button
                      className='cursor-pointer hover:bg-neutral-200/30'
                      variant={'secondary'}
                      size={'md'}
                    >
                      <Link to='/register'>Register</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
        {/* <div></div> */}
      </div>
    </div>
  );
};
