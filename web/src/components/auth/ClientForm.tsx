import { useState } from 'react';

interface ClientFormProps {
  onSubmit: (data: any) => void;
}

export const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    // Personal Data
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    country: '',
    city: '',
    email: '',
    phone: '',
    linkedIn: '',
    educationLevel: '',
    occupation: '',
    institution: '',
    languages: '',

    // Interests & Passion
    fieldsOfInterest: [] as string[],
    otherFieldOfInterest: '',
    opportunityTypes: [] as string[],
    otherOpportunityType: '',
    careerGoals: '',
    availability: [] as string[],
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    portfolio: null as File | null,
    recommendationLetters: [] as File[],
    otherDocuments: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ formData, files });
  };

  const genderOptions = ['Male', 'Female', 'Prefer not to say'];

  const educationLevelOptions = [
    'High School',
    "Bachelor's",
    "Master's",
    'PhD',
    'Other',
  ];

  const occupationOptions = [
    'Student',
    'Professional',
    'Entrepreneur',
    'Other',
  ];

  const fieldsOfInterestOptions = [
    'Technology',
    'Artificial Intelligence (AI)',
    'Climate Change & Sustainability',
    'Business & Entrepreneurship',
    'Education',
    'Public Policy & Governance',
    'Science & Research',
    'Finance & Economics',
    'Engineering & Innovation',
    'Health & Medicine',
    'Arts & Culture',
    'Law & Human Rights',
    'Social Impact & Advocacy',
  ];

  const opportunityTypesOptions = [
    'Scholarships',
    'Internships',
    'Fellowships',
    'Research Programs',
    'Training Programs',
    'Hackathons',
    'Grants',
    'Competitions',
    'Exchange Programs',
    'Advocacy & Delegation Roles',
    'Startup Accelerators',
    'Conferences & Networking Events',
  ];

  // const availabilityOptions = ['Full-time', 'Part-time', 'Remote', 'Hybrid'];



  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* Personal Data */}
      <div className='space-y-6'>
        <h3 className='text-xl font-semibold'>Personal Data</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              value={formData.fullName}
              onChange={e =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Date of Birth
            </label>
            <input
              type='date'
              value={formData.dateOfBirth}
              onChange={e =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={e =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            >
              <option value=''>Select Gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Nationality
            </label>
            <input
              type='text'
              value={formData.nationality}
              onChange={e =>
                setFormData({ ...formData, nationality: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Country of Residence
            </label>
            <input
              type='text'
              value={formData.country}
              onChange={e =>
                setFormData({ ...formData, country: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              City of Residence
            </label>
            <input
              type='text'
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input
              type='email'
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='tel'
              value={formData.phone}
              onChange={e =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              LinkedIn Profile (Optional)
            </label>
            <input
              type='url'
              value={formData.linkedIn}
              onChange={e =>
                setFormData({ ...formData, linkedIn: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Education Level
            </label>
            <select
              value={formData.educationLevel}
              onChange={e =>
                setFormData({ ...formData, educationLevel: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            >
              <option value=''>Select Education Level</option>
              {educationLevelOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Current Occupation
            </label>
            <select
              value={formData.occupation}
              onChange={e =>
                setFormData({ ...formData, occupation: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            >
              <option value=''>Select Occupation</option>
              {occupationOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Institution/Organization Name
            </label>
            <input
              type='text'
              value={formData.institution}
              onChange={e =>
                setFormData({ ...formData, institution: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Languages Spoken (with proficiency level)
            </label>
            <textarea
              value={formData.languages}
              onChange={e =>
                setFormData({ ...formData, languages: e.target.value })
              }
              placeholder='e.g., English (Native), Spanish (Intermediate), French (Basic)'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>
        </div>
      </div>

    {/* Interests & Passion */}
      <div className='space-y-6'>
        <h3 className='text-xl font-semibold'>Interests & Passion</h3>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Fields of Interest
          </label>
          <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
            {fieldsOfInterestOptions.map(field => (
              <label key={field} className='inline-flex items-center'>
                <input
                  type='checkbox'
                  checked={formData.fieldsOfInterest.includes(field)}
                  onChange={e => {
                    const newFields = e.target.checked
                      ? [...formData.fieldsOfInterest, field]
                      : formData.fieldsOfInterest.filter(f => f !== field);
                    setFormData({ ...formData, fieldsOfInterest: newFields });
                  }}
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{field}</span>
              </label>
            ))}
          </div>
          <div className="mt-2">
            <label className='block text-sm font-medium text-gray-700'>
              Other (Specify)
            </label>
            <input
              type='text'
              value={formData.otherFieldOfInterest}
              onChange={e => setFormData({ ...formData, otherFieldOfInterest: e.target.value })}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Preferred Opportunity Types
          </label>
          <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
            {opportunityTypesOptions.map(type => (
              <label key={type} className='inline-flex items-center'>
                <input
                  type='checkbox'
                  checked={formData.opportunityTypes.includes(type)}
                  onChange={e => {
                    const newTypes = e.target.checked
                      ? [...formData.opportunityTypes, type]
                      : formData.opportunityTypes.filter(t => t !== type);
                    setFormData({ ...formData, opportunityTypes: newTypes });
                  }}
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{type}</span>
              </label>
            ))}
          </div>
          <div className="mt-2">
            <label className='block text-sm font-medium text-gray-700'>
              Other (Specify)
            </label>
            <input
              type='text'
              value={formData.otherOpportunityType}
              onChange={e => setFormData({ ...formData, otherOpportunityType: e.target.value })}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Personal Career Goals & Motivations
          </label>
          <textarea
            value={formData.careerGoals}
            onChange={e => setFormData({ ...formData, careerGoals: e.target.value })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-32'
            placeholder='Describe your career goals and what motivates you...'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Availability for New Opportunities
          </label>
          <div className='mt-2 grid grid-cols-2 md:grid-cols-4 gap-4'>
            {['Full-time', 'Part-time', 'Remote', 'Hybrid'].map(option => (
              <label key={option} className='inline-flex items-center'>
                <input
                  type='checkbox'
                  checked={formData.availability.includes(option)}
                  onChange={e => {
                    const newAvailability = e.target.checked
                      ? [...formData.availability, option]
                      : formData.availability.filter(a => a !== option);
                    setFormData({ ...formData, availability: newAvailability });
                  }}
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Upload */}
      <div className='space-y-6'>
        <h3 className='text-xl font-semibold'>Upload Documents</h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              CV (PDF/DOCX)
            </label>
            <input
              type='file'
              accept='.pdf,.docx'
              onChange={e => setFiles({ ...files, cv: e.target.files?.[0] || null })}
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Portfolio (Optional, PDF/Link to Website)
            </label>
            <input
              type='file'
              accept='.pdf'
              onChange={e => setFiles({ ...files, portfolio: e.target.files?.[0] || null })}
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Recommendation Letters (Optional, PDF)
            </label>
            <input
              type='file'
              accept='.pdf'
              multiple
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setFiles(prev => ({ ...prev, recommendationLetters: files }));
              }}
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Other Supporting Documents (Certificates, Transcripts, etc.)
            </label>
            <input
              type='file'
              accept='.pdf,.docx,.jpg,.jpeg,.png'
              multiple
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setFiles(prev => ({ ...prev, otherDocuments: files }));
              }}
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
            />
          </div>
        </div>
      </div>

      <button
        type='submit'
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        Complete Registration
      </button>
    </form>
  );
};
