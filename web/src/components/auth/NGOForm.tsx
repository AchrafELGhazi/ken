import { useState } from 'react';

interface NGOFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const NGOForm = ({ onSubmit, isLoading }: NGOFormProps) => {
  const [formData, setFormData] = useState({
    // Basic Information
    orgName: '',
    orgType: '',
    otherOrgType: '',
    establishmentYear: '',
    country: '',
    city: '',
    website: '',
    email: '',
    password: '',
    phone: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: '',
    },
    representative: {
      name: '',
      role: '',
      email: '',
      phone: '',
    },

    // Focus Areas
    expertise: [] as string[],
    otherExpertise: '',
    missionStatement: '',
    keyPrograms: [] as string[],
    collaborationInterests: [] as string[],
    fundingPrograms: '',
  });

  const [files, setFiles] = useState({
    orgProfile: null as File | null,
    reports: [] as File[],
    brochures: [] as File[],
    projects: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ formData, files });
  };

  const orgTypeOptions = [
    'University',
    'NGO/Non-Profit',
    'Research Center',
    'Government Body',
    'Private Company',
    'Public Institution',
    'Other',
  ];

  const expertiseOptions = [
    'Education & Training',
    'Research & Development',
    'Climate Change & Sustainability',
    'Technology & Innovation',
    'Public Policy & Governance',
    'Social Impact & Human Rights',
    'Business & Entrepreneurship',
    'Arts & Culture',
    'Healthcare & Medicine',
    'Engineering & Infrastructure',
    'Law & Legal Affairs',
  ];

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* Basic Information */}
      <div className='space-y-6'>
        <h3 className='text-xl font-semibold'>Basic Information</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Institution/Organization Name
            </label>
            <input
              type='text'
              value={formData.orgName}
              onChange={e =>
                setFormData({ ...formData, orgName: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Type of Institution
            </label>
            <select
              value={formData.orgType}
              onChange={e =>
                setFormData({ ...formData, orgType: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            >
              <option value=''>Select Type</option>
              {orgTypeOptions.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formData.orgType === 'Other' && (
              <input
                type='text'
                value={formData.otherOrgType}
                onChange={e =>
                  setFormData({ ...formData, otherOrgType: e.target.value })
                }
                placeholder='Specify other type'
                className='mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              />
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Year of Establishment
            </label>
            <input
              type='number'
              value={formData.establishmentYear}
              onChange={e =>
                setFormData({ ...formData, establishmentYear: e.target.value })
              }
              min='1800'
              max={new Date().getFullYear()}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Country
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
              City
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
              Official Website
            </label>
            <input
              type='url'
              value={formData.website}
              onChange={e =>
                setFormData({ ...formData, website: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email Address (General Contact)
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
              Password
            </label>
            <input
              type='password'
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
              minLength={6}
              placeholder='Enter your password'
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

          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Social Media Links (Optional)
            </label>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
              <input
                type='url'
                value={formData.socialMedia.linkedin}
                onChange={e =>
                  setFormData({
                    ...formData,
                    socialMedia: {
                      ...formData.socialMedia,
                      linkedin: e.target.value,
                    },
                  })
                }
                placeholder='LinkedIn URL'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              />
              <input
                type='url'
                value={formData.socialMedia.twitter}
                onChange={e =>
                  setFormData({
                    ...formData,
                    socialMedia: {
                      ...formData.socialMedia,
                      twitter: e.target.value,
                    },
                  })
                }
                placeholder='Twitter URL'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              />
              <input
                type='url'
                value={formData.socialMedia.facebook}
                onChange={e =>
                  setFormData({
                    ...formData,
                    socialMedia: {
                      ...formData.socialMedia,
                      facebook: e.target.value,
                    },
                  })
                }
                placeholder='Facebook URL'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              />
            </div>
          </div>

          <div className='col-span-2 space-y-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Representative Contact Person
            </label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input
                type='text'
                value={formData.representative.name}
                onChange={e =>
                  setFormData({
                    ...formData,
                    representative: {
                      ...formData.representative,
                      name: e.target.value,
                    },
                  })
                }
                placeholder='Full Name'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                required
              />
              <input
                type='text'
                value={formData.representative.role}
                onChange={e =>
                  setFormData({
                    ...formData,
                    representative: {
                      ...formData.representative,
                      role: e.target.value,
                    },
                  })
                }
                placeholder='Role'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                required
              />
              <input
                type='email'
                value={formData.representative.email}
                onChange={e =>
                  setFormData({
                    ...formData,
                    representative: {
                      ...formData.representative,
                      email: e.target.value,
                    },
                  })
                }
                placeholder='Email'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                required
              />
              <input
                type='tel'
                value={formData.representative.phone}
                onChange={e =>
                  setFormData({
                    ...formData,
                    representative: {
                      ...formData.representative,
                      phone: e.target.value,
                    },
                  })
                }
                placeholder='Phone Number'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Focus Areas & Mission */}
      <div className='space-y-6'>
        <h3 className='text-xl font-semibold'>Focus Areas & Mission</h3>

        {/* Fields of Expertise */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Fields of Expertise (Select multiple if needed)
          </label>
          <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
            {expertiseOptions.map(field => (
              <label key={field} className='inline-flex items-center'>
                <input
                  type='checkbox'
                  checked={formData.expertise.includes(field)}
                  onChange={e => {
                    const newExpertise = e.target.checked
                      ? [...formData.expertise, field]
                      : formData.expertise.filter(f => f !== field);
                    setFormData({ ...formData, expertise: newExpertise });
                  }}
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{field}</span>
              </label>
            ))}
          </div>
          <div className='mt-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Other (Specify)
            </label>
            <input
              type='text'
              value={formData.otherExpertise}
              onChange={e =>
                setFormData({ ...formData, otherExpertise: e.target.value })
              }
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              placeholder='Enter other fields of expertise'
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Mission Statement
          </label>
          <textarea
            value={formData.missionStatement}
            onChange={e =>
              setFormData({ ...formData, missionStatement: e.target.value })
            }
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-32'
            placeholder='Brief description of the institution mission and purpose'
            required
          />
        </div>

        {/* Key Programs & Initiatives */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Key Programs & Initiatives
          </label>
          <div className='mt-2 space-y-2'>
            {formData.keyPrograms.map((program, index) => (
              <div key={index} className='flex gap-2'>
                <input
                  type='text'
                  value={program}
                  onChange={e => {
                    const newPrograms = [...formData.keyPrograms];
                    newPrograms[index] = e.target.value;
                    setFormData({ ...formData, keyPrograms: newPrograms });
                  }}
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  placeholder='Enter program or initiative name'
                />
                <button
                  type='button'
                  onClick={() => {
                    const newPrograms = formData.keyPrograms.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, keyPrograms: newPrograms });
                  }}
                  className='p-2 text-red-600 hover:text-red-800'
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() =>
                setFormData({
                  ...formData,
                  keyPrograms: [...formData.keyPrograms, ''],
                })
              }
              className='mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Add Program
            </button>
          </div>
        </div>

        {/* Collaboration Interests */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Collaboration Interests
          </label>
          <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
            {[
              'Research Partnerships',
              'Student Engagement',
              'Funding Opportunities',
              'Knowledge Exchange',
              'Resource Sharing',
              'Joint Programs',
              'Technical Cooperation',
            ].map(interest => (
              <label key={interest} className='inline-flex items-center'>
                <input
                  type='checkbox'
                  checked={formData.collaborationInterests.includes(interest)}
                  onChange={e => {
                    const newInterests = e.target.checked
                      ? [...formData.collaborationInterests, interest]
                      : formData.collaborationInterests.filter(
                          i => i !== interest
                        );
                    setFormData({
                      ...formData,
                      collaborationInterests: newInterests,
                    });
                  }}
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Funding & Support Programs */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Funding & Support Programs
          </label>
          <textarea
            value={formData.fundingPrograms}
            onChange={e =>
              setFormData({ ...formData, fundingPrograms: e.target.value })
            }
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-32'
            placeholder='Specify available scholarships, grants, and other funding opportunities'
          />
        </div>
      </div>

      {/* Documents Upload */}
      <div className='space-y-6'>
        <h3 className='text-xl font-semibold'>Additional Documents & Media</h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Organization Profile (PDF/DOCX Format)
            </label>
            <input
              type='file'
              accept='.pdf,.docx'
              onChange={e =>
                setFiles({ ...files, orgProfile: e.target.files?.[0] || null })
              }
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Recent Reports/Publications (Optional, PDF)
            </label>
            <input
              type='file'
              accept='.pdf'
              multiple
              onChange={e => {
                const selectedFiles = Array.from(e.target.files || []);
                setFiles(prev => ({ ...prev, reports: selectedFiles }));
              }}
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Brochures & Marketing Materials (PDF/PNG/JPG)
            </label>
            <input
              type='file'
              accept='.pdf,.png,.jpg,.jpeg'
              multiple
              onChange={e => {
                const selectedFiles = Array.from(e.target.files || []);
                setFiles(prev => ({ ...prev, brochures: selectedFiles }));
              }}
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Past Projects & Achievements (PDF/Link to Website)
            </label>
            <input
              type='file'
              accept='.pdf'
              multiple
              onChange={e => {
                const selectedFiles = Array.from(e.target.files || []);
                setFiles(prev => ({ ...prev, projects: selectedFiles }));
              }}
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100'
            />
          </div>
        </div>
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed'
        onClick={() => console.log('Button clicked')}
      >
        {isLoading ? 'Registering...' : 'Complete Registration'}
      </button>
    </form>
  );
};
