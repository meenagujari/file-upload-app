"use client";
import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../lib/api/api';
import { setCredentials } from '../../../lib/redux/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      dispatch(setCredentials(response.data));
      setMessage('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      console.log('Login error:', error);
      setMessage(error.response?.data?.message || error.message || 'Login failed.');
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email-address" className={`block mb-2 text-sm font-medium ${message.includes('successful') ? 'text-green-700 dark:text-green-500' : message ? 'text-red-700 dark:text-red-500' : 'text-gray-900'}`}>Email address</label>
            <input
              type="email"
              id="email-address"
              name="email"
              autoComplete="email"
              required
              className={`border text-sm rounded-lg block w-full p-2.5 ${message.includes('successful') ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500' : message ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'}`}
              placeholder="name@flowbite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {message && (
              <p className={`mt-2 text-sm ${message.includes('successful') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                <span className="font-medium">{message.includes('successful') ? 'Success!' : 'Oops!'}</span> {message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className={`block mb-2 text-sm font-medium ${message.includes('successful') ? 'text-green-700 dark:text-green-500' : message ? 'text-red-700 dark:text-red-500' : 'text-gray-900'}`}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className={`border text-sm rounded-lg block w-full p-2.5 ${message.includes('successful') ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500' : message ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/auth/register" className="text-blue-600 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;