import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, UserCircle } from 'lucide-react';
import { isClientUser, isNGOUser, useAuth } from '@/context/UserContext';

export const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserName = () => {
    if (!user) return '';
    if (isClientUser(user)) return user.fullName;
    if (isNGOUser(user)) return user.orgName;
    return '';
  };

  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='text-2xl font-bold text-indigo-600'>
              Ken
            </Link>
          </div>

          <div className='flex items-center space-x-8'>
            <Link to='/' className='text-gray-700 hover:text-indigo-600'>
              Home
            </Link>
            <Link
              to='/opportunities'
              className='text-gray-700 hover:text-indigo-600'
            >
              Opportunities
            </Link>
            <Link to='/courses' className='text-gray-700 hover:text-indigo-600'>
              Courses
            </Link>
            <Link to='/mentors' className='text-gray-700 hover:text-indigo-600'>
              Mentors
            </Link>

            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 rounded-full'>
                        <UserCircle className='h-6 w-6' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className='w-56'
                      align='end'
                      forceMount
                    >
                      <div className='flex flex-col space-y-1 p-2'>
                        <p className='text-sm font-medium leading-none'>
                          {getUserName()}
                        </p>
                        <p className='text-xs leading-none text-gray-500'>
                          {user.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => navigate('/dashboard')}>
                        <User className='mr-2 h-4 w-4' />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate('/profile')}>
                        <UserCircle className='mr-2 h-4 w-4' />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate('/settings')}>
                        <Settings className='mr-2 h-4 w-4' />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={handleLogout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className='flex items-center space-x-4'>
                    <Link
                      to='/signin'
                      className='text-gray-700 hover:text-indigo-600'
                    >
                      Sign In
                    </Link>
                    <Link
                      to='/signup'
                      className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
