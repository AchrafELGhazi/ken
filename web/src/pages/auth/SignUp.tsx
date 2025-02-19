import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ClientForm } from '@/components/auth/ClientForm';
import { NGOForm } from '@/components/auth/NGOForm';
import { useAuth } from '@/context/UserContext';

type UserType = 'client' | 'ngo';

interface NGOFiles {
  orgProfile: File | null;
  reports: File[];
  brochures: File[];
  projects: File[];
}

interface ClientFiles {
  cv: File | null;
  portfolio: File | null;
  recommendationLetters: File[];
  otherDocuments: File[];
}

interface SubmissionData {
  formData: Record<string, any>;
  files: NGOFiles | ClientFiles;
}

export const SignUp = () => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

 const handleSubmit = async (data: SubmissionData) => {
   if (!userType) return;

   const formData = new FormData();

   // Add all form fields
   Object.entries(data.formData).forEach(([key, value]) => {
     if (value !== null && value !== undefined) {
       if (Array.isArray(value)) {
         // Special handling for availability array
         if (key === 'availability') {
           value.forEach(item => {
             formData.append('availability', item);
           });
         }
         // Handle other arrays
         else if (
           key === 'expertise' ||
           key === 'keyPrograms' ||
           key === 'collaborationInterests'
         ) {
           value.forEach(item => {
             formData.append(`${key}`, item);
           });
         } else {
           formData.append(key, JSON.stringify(value));
         }
       } else if (key === 'representative') {
         const representative = value as {
           name: string;
           role: string;
           email: string;
           phone: string;
         };

         Object.entries(representative).forEach(([repKey, repValue]) => {
           formData.append(`representative[${repKey}]`, repValue);
         });
       } else if (key === 'socialMedia') {
         const socialMedia = value as {
           linkedin: string;
           twitter: string;
           facebook: string;
         };

         Object.entries(socialMedia).forEach(([socialKey, socialValue]) => {
           formData.append(`socialMedia[${socialKey}]`, socialValue);
         });
       } else if (typeof value === 'object') {
         formData.append(key, JSON.stringify(value));
       } else {
         formData.append(key, String(value));
       }
     }
   });

   // Handle file uploads
   if (userType === 'ngo') {
     const ngoFiles = data.files as NGOFiles;
     if (ngoFiles.orgProfile) {
       formData.append('orgProfile', ngoFiles.orgProfile);
     }
     ngoFiles.reports.forEach(file => formData.append('reports', file));
     ngoFiles.brochures.forEach(file => formData.append('brochures', file));
     ngoFiles.projects.forEach(file => formData.append('projects', file));
   } else {
     const clientFiles = data.files as ClientFiles;
     if (clientFiles.cv) formData.append('cv', clientFiles.cv);
     if (clientFiles.portfolio)
       formData.append('portfolio', clientFiles.portfolio);
     clientFiles.recommendationLetters.forEach(file =>
       formData.append('recommendationLetters', file)
     );
     clientFiles.otherDocuments.forEach(file =>
       formData.append('otherDocuments', file)
     );
   }

   setIsLoading(true);
   setError(null);

   try {
     const response = await fetch(`${API_URL}/auth/register/${userType}`, {
       method: 'POST',
       body: formData,
     });

     const data = await response.json();

     if (!response.ok) {
       throw new Error(data.message || 'Registration failed');
     }

     // Update auth context with user data and token
     login(data.user, data.token);

     alert('Registration successful!');
     navigate('/signin');
   } catch (err) {
     console.error('Registration error:', err);
     setError(
       err instanceof Error
         ? err.message
         : 'An error occurred during registration'
     );
   } finally {
     setIsLoading(false);
   }
 };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-8'>
            Create your account
          </h2>

          {error && (
            <Alert variant='destructive' className='mb-6'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className='space-y-4 mb-8'>
            <label className='block text-sm font-medium text-gray-700'>
              Account Type
            </label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <button
                type='button'
                onClick={() => {
                  setError(null);
                  setUserType('client');
                }}
                disabled={isLoading}
                className={`p-4 border rounded-lg text-left ${
                  userType === 'client'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <h3 className='font-medium'>Individual</h3>
                <p className='text-sm text-gray-500'>
                  For students, professionals, and individuals seeking
                  opportunities
                </p>
              </button>
              <button
                type='button'
                onClick={() => {
                  setError(null);
                  setUserType('ngo');
                }}
                disabled={isLoading}
                className={`p-4 border rounded-lg text-left ${
                  userType === 'ngo'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <h3 className='font-medium'>Organization</h3>
                <p className='text-sm text-gray-500'>
                  For institutions, NGOs, and organizations offering
                  opportunities
                </p>
              </button>
            </div>
          </div>

          {userType === 'client' && (
            <ClientForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}
          {userType === 'ngo' && (
            <NGOForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};
