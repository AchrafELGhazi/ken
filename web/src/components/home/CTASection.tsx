import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className='py-16 bg-indigo-600 text-white'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold mb-6'>
          Join Ken today and start your journey toward success!
        </h2>
        <Link
          to='/signup'
          className='inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};
