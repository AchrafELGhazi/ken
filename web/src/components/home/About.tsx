export const About = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>About Ken</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-gray-50 p-8 rounded-xl shadow-sm'>
            <h3 className='text-2xl font-semibold mb-4'>Our Mission</h3>
            <p className='text-gray-600 leading-relaxed'>
              Empower students to reach their full potential by providing access
              to opportunities and educational resources while helping
              organizations connect with a wide audience of young talents.
            </p>
          </div>
          <div className='bg-gray-50 p-8 rounded-xl shadow-sm'>
            <h3 className='text-2xl font-semibold mb-4'>Our Vision</h3>
            <p className='text-gray-600 leading-relaxed'>
              To be the leading platform for youth development through
              structured learning, mentorship, and global opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
