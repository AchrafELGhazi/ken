import { Book, Globe, Users } from 'lucide-react';

export const PlatformOverview = () => {
  const sections = [
    {
      title: 'Opportunities',
      description:
        'Browse and apply for global opportunities in various fields.',
      icon: Globe,
      features: [
        'Search and filter by industry, region, and eligibility',
        'Save opportunities and set deadline reminders',
        'Engage with structured, well-detailed opportunity postings',
      ],
    },
    {
      title: 'Courses',
      description:
        'Learn at your own pace with our curated educational resources.',
      icon: Book,
      features: [
        'Self-paced Ultimate Course with weekly reminders',
        'Progress tracking for enrolled courses',
        'Expert-driven content to enhance skill development',
      ],
    },
    {
      title: 'Mentors',
      description:
        'Connect with industry professionals for guidance and career advice.',
      icon: Users,
      features: [
        'Browse mentors by expertise',
        'Book one-on-one mentorship sessions',
        'Gain insights from experienced professionals',
      ],
    },
  ];

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Platform Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {sections.map(section => (
            <div
              key={section.title}
              className='bg-white p-8 rounded-xl shadow-sm'
            >
              <section.icon className='w-12 h-12 text-indigo-600 mb-4' />
              <h3 className='text-2xl font-semibold mb-4'>{section.title}</h3>
              <p className='text-gray-600 mb-6'>{section.description}</p>
              <ul className='space-y-3'>
                {section.features.map(feature => (
                  <li key={feature} className='flex items-start'>
                    <span className='text-indigo-600 mr-2'>•</span>
                    <span className='text-gray-600'>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
