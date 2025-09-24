import { navbars } from '@/types/navbar';
import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <div className='sm-container my-8 grid w-full grid-cols-3 gap-3 px-2 md:grid-cols-6 md:gap-5'>
      {navbars.map((data, i) => (
        <div key={i} className='shadow-all rounded-2xl p-2'>
          <div className='hover:border-primary-300 hover:bg-primary-200 flex-center rounded-2xl border bg-[#E0ECFF] py-1 md:py-4'>
            <Link to='/category'>
              <img src={data.src} alt={data.name} className='size-13' />
            </Link>
          </div>
          <div className='md:text-md mt-3 text-sm font-semibold md:text-center'>
            {data.name}
          </div>
        </div>
      ))}
    </div>
  );
};
