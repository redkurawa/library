// import {
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from '@/components/ui/dropdown-menu';
// import { userDropDown } from '@/types/user-dropdown';
// import { Link } from 'react-router';

import { userDropDown } from '@/types/user-dropdown';
import { useNavigate } from 'react-router';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';

// export function DropDownUserMenu() {
//   return (
//     <DropdownMenuContent className='w-56' side='bottom' align='end'>
//       {userDropDown.map((data, i) => (
//         <DropdownMenuItem key={i}>
//           <Link to={data.href}>{data.label}</Link>
//         </DropdownMenuItem>
//       ))}
//     </DropdownMenuContent>
//   );
// }

// import { useNavigate, useLocation } from 'react-router-dom';
// import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown';
// import { userDropDown } from '@/constants/userDropDown';

export function DropDownUserMenu() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const isUserPage = location.pathname.startsWith('/user');

  return (
    <DropdownMenuContent className='w-56' side='bottom' align='end'>
      {userDropDown.map((data, i) => (
        <DropdownMenuItem key={i} onClick={() => navigate(`${data.href}`)}>
          {data.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}
