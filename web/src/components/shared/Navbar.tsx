// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// src/components/shared/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='text-2xl font-bold text-indigo-600'>
              Ken
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-8'>
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
            <Link to='/signin' className='text-gray-700 hover:text-indigo-600'>
              Sign In
            </Link>
            <Link
              to='/signup'
              className='bg-indigo-600 text-white px-4 py-2 rounded-md'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
