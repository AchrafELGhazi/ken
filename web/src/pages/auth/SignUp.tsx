import { ClientForm } from '@/components/auth/ClientForm';
import { NGOForm } from '@/components/auth/NGOForm';
import { useState } from 'react';

type UserType = 'client' | 'ngo';

export const SignUp = () => {
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', { userType, data });
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-8'>
            Create your account
          </h2>

          {/* User Type Selection */}
          <div className='space-y-4 mb-8'>
            <label className='block text-sm font-medium text-gray-700'>
              Account Type
            </label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <button
                type='button'
                onClick={() => setUserType('client')}
                className={`p-4 border rounded-lg text-left ${
                  userType === 'client'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                }`}
              >
                <h3 className='font-medium'>Individual</h3>
                <p className='text-sm text-gray-500'>
                  For students, professionals, and individuals seeking
                  opportunities
                </p>
              </button>
              <button
                type='button'
                onClick={() => setUserType('ngo')}
                className={`p-4 border rounded-lg text-left ${
                  userType === 'ngo'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                }`}
              >
                <h3 className='font-medium'>Organization</h3>
                <p className='text-sm text-gray-500'>
                  For institutions, NGOs, and organizations offering
                  opportunities
                </p>
              </button>
            </div>
          </div>

          {/* Render appropriate form based on user type */}
          {userType === 'client' && <ClientForm onSubmit={handleSubmit} />}
          {userType === 'ngo' && <NGOForm onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
};
