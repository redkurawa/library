import { footerIcons } from '@/types/footer';
import { Logo } from '../ui/logo';

export const Footer = () => {
  return (
    <div className='border-t'>
      <div className='sm-container mt-10 flex flex-col items-center md:mt-20'>
        <div className='mb-5.5 flex items-center gap-4'>
          <Logo className='text-primary-300' />
          <h1 className='text-[32px] font-extrabold'>Booky</h1>
        </div>
        <p className='mb-10 text-center text-[16px] font-semibold'>
          Discover inspiring stories & timeless knowledge, ready to borrow
          anytime. Explore online or visit our nearest library branch.
        </p>
        <div className='mb-5 text-[16px] font-bold'>Follow on Social Media</div>
        <div className='flex gap-3'>
          {footerIcons.map((icon, i) => (
            <div key={i} className='ball size-10 border border-neutral-300'>
              <img src={icon} alt={`icon-${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
