import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>
            Unlock Your Potential with Ken
          </h1>
          <p className='text-xl mb-8'>
            Facilitating connections between students and organizations through
            access to opportunities, education, and mentorship.
          </p>
          <div className='space-x-4'>
            <Link
              to='/opportunities'
              className='bg-white text-indigo-600 px-6 py-3 rounded-md font-medium'
            >
              Explore Opportunities
            </Link>
            <Link
              to='/signup'
              className='bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium'
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
