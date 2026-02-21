import { useAppSelector } from '@/redux/hooks';
import { GetService } from '@/services/service';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  profilePhoto: string | null;
  role: string;
  createdAt: string;
}

export const AdminUserList = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;
    const getUsers = async () => {
      const r = await GetService('admin/users?page=1&limit=10', token);
      setUsers(r.data.users);
    };
    getUsers();
  }, [token]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='sm-container mt-6'>
      <h1 className='text-[28px] font-bold'>List Register User</h1>
      <div className='relative mt-4'>
        <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500' />
        <input
          type='text'
          placeholder='Search User'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:outline-none'
        />
      </div>
      <div className='mt-6 overflow-x-auto'>
        <table className='w-full table-auto border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-200 px-4 py-2 text-left text-sm font-bold'>
                No
              </th>
              <th className='border border-gray-200 px-4 py-2 text-left text-sm font-bold'>
                Name
              </th>
              <th className='border border-gray-200 px-4 py-2 text-left text-sm font-bold'>
                Nomer Handphone
              </th>
              <th className='border border-gray-200 px-4 py-2 text-left text-sm font-bold'>
                Email
              </th>
              <th className='border border-gray-200 px-4 py-2 text-left text-sm font-bold'>
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className='hover:bg-gray-50'>
                <td className='border border-gray-200 px-4 py-2 text-sm'>
                  {index + 1}
                </td>
                <td className='border border-gray-200 px-4 py-2 text-sm font-medium'>
                  {user.name}
                </td>
                <td className='border border-gray-200 px-4 py-2 text-sm'>
                  {user.phone || 'N/A'}
                </td>
                <td className='border border-gray-200 px-4 py-2 text-sm'>
                  {user.email}
                </td>
                <td className='border border-gray-200 px-4 py-2 text-sm'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
