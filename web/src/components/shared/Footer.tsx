import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/' className='hover:text-white'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/opportunities' className='hover:text-white'>
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to='/courses' className='hover:text-white'>
                  Courses
                </Link>
              </li>
              <li>
                <Link to='/mentors' className='hover:text-white'>
                  Mentors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-white font-semibold mb-4'>Resources</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/blog' className='hover:text-white'>
                  Blog
                </Link>
              </li>
              <li>
                <Link to='/support' className='hover:text-white'>
                  Support
                </Link>
              </li>
              <li>
                <Link to='/faq' className='hover:text-white'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-white font-semibold mb-4'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/privacy' className='hover:text-white'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='/terms' className='hover:text-white'>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-white font-semibold mb-4'>Connect With Us</h3>
            <div className='flex space-x-4'>
              <a href='#' className='hover:text-white'>
                <Facebook className='w-6 h-6' />
              </a>
              <a href='#' className='hover:text-white'>
                <Twitter className='w-6 h-6' />
              </a>
              <a href='#' className='hover:text-white'>
                <Instagram className='w-6 h-6' />
              </a>
              <a href='#' className='hover:text-white'>
                <Linkedin className='w-6 h-6' />
              </a>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-8 pt-8 text-center'>
          <p>
            &copy; {new Date().getFullYear()} Ken Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
