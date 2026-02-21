import { loginUser } from '@/redux/auth-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../ui/logo';
import { LoginSchema } from '@/schema/login-schema';

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const { user, isLoading, error, token } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginSchema) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user) {
      user.id == 2 ? navigate('/admin') : navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='sm-container mx-auto flex min-h-screen w-full flex-wrap'>
      <div className='flex-center mx-auto min-h-screen w-full basis-1/2 lg:min-h-0'>
        <div className=''>
          <div className='mb-5 flex items-center'>
            <Logo className='text-primary-300' />
            <span className={`ml-2 text-[32px] font-extrabold text-black`}>
              Booky
            </span>
          </div>
          <h1 className='text-[28px] font-extrabold'>Login</h1>
          <p className='mb-5 text-[16px] font-medium'>
            Sign in to manage your library account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label className='text-sm font-bold' htmlFor='email'>
              Email
            </Label>
            <Input id='email' {...register('email')} className='my-2' />
            {errors.email && (
              <p className='text-sm font-bold text-red-500'>
                {errors.email.message}
              </p>
            )}
            <Label className='text-sm font-bold' htmlFor='password'>
              Password
            </Label>
            <Input id='password' {...register('password')} className='my-2' />
            {errors.password && (
              <p className='text-sm font-bold text-red-500'>
                {errors.password.message}
              </p>
            )}
            <Button
              className='h-12 w-full rounded-full py-2'
              type='submit'
              disabled={isLoading}
              variant={'secondary'}
            >
              {isLoading ? (
                <span className='flex items-center gap-2'>
                  <Loader2 className='size-8 animate-spin text-red-100' />
                  Loading...
                </span>
              ) : (
                'Login'
              )}
            </Button>
          </form>
          {user && (
            <div>
              <h3>Welcome, {user.name}!</h3>
              <p>Email: {user.email}</p>
              <p className='break-all whitespace-normal'>token: {token}</p>
            </div>
          )}
          {error && <p>Error: {error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
