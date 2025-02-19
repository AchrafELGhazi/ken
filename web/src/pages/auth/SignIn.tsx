import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/UserContext';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Call context's login function with user data and token
      login(data.user, data.token);

      // Navigate based on user type
      if (data.user.type === 'client') {
        navigate('/client-dashboard');
      } else if (data.user.type === 'ngo') {
        navigate('/ngo-dashboard');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during login'
      );
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='text-center text-3xl font-bold text-gray-900'>
          Sign in to Ken
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {error && (
            <Alert variant='destructive' className='mb-6'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
