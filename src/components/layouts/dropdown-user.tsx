import { userDropDown } from '@/types/user-dropdown';
import { useNavigate } from 'react-router';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth-slice';
import { toast } from 'sonner';
import type { RootState } from '@/redux/store';

export function DropDownUserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <DropdownMenuContent className='w-56' side='bottom' align='end'>
      {isAdmin && (
        <DropdownMenuItem
          onClick={() => navigate('/admin')}
          className='animate-pulse font-bold text-green-600'
        >
          Admin
        </DropdownMenuItem>
      )}
      {userDropDown.map((data, i) => (
        <DropdownMenuItem
          key={i}
          onClick={() => {
            if (data.label === 'Logout') {
              dispatch(logout());
              navigate('/');
              toast.success('Logout success');
            } else {
              navigate(`${data.href}`);
            }
          }}
          className={data.label === 'Logout' ? 'font-bold text-red-600' : ''}
        >
          {data.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}
