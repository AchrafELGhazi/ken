export const Testimonials = () => {
  const testimonials = [
    {
      type: 'Student',
      quote:
        'Ken helped me find amazing opportunities that aligned perfectly with my career goals.',
      author: 'Sarah Johnson',
      role: 'Computer Science Student',
    },
    {
      type: 'Organization',
      quote:
        "We've connected with talented students who bring fresh perspectives to our projects.",
      author: 'Tech Innovators Inc',
      role: 'Partner Organization',
    },
  ];

  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Success Stories
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {testimonials.map(testimonial => (
            <div
              key={testimonial.author}
              className='bg-gray-50 p-8 rounded-xl shadow-sm'
            >
              <div className='text-indigo-600 mb-2'>
                {testimonial.type} Success Story
              </div>
              <p className='text-gray-800 text-lg mb-4 italic'>
                "{testimonial.quote}"
              </p>
              <div className='text-gray-600'>
                <div className='font-semibold'>{testimonial.author}</div>
                <div className='text-sm'>{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
