// app/auth/register/page.js
"use client";
import React, { useState, useEffect } from 'react';
// import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../lib/api/api';
// import { setCredentials } from '../../../lib/redux/authSlice';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  // const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('isAuthenticated changed:', isAuthenticated);
    if (isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ username, email, password });
      // Removed dispatch(setCredentials(response.data));
      setMessage('Registration successful!');
      router.push('/auth/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="username-input"
              className={`block mb-2 text-sm font-medium ${message.includes('successful') ? 'text-green-700 dark:text-green-500' : message.includes('failed') ? 'text-red-700 dark:text-red-500' : 'text-gray-900 dark:text-white'}`}
            >
              Your username
            </label>
            <input
              type="text"
              id="username-input"
              className={`bg-gray-50 border ${message.includes('successful') ? 'border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500' : message.includes('failed') ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600'} text-sm rounded-lg block w-full p-2.5 dark:text-white`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {message && (
              <p className={`mt-2 text-sm ${message.includes('successful') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                <span className="font-medium">{message.includes('successful') ? 'Alright!' : 'Oops!'}</span> {message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email-input"
              className={`block mb-2 text-sm font-medium ${message.includes('successful') ? 'text-green-700 dark:text-green-500' : message.includes('failed') ? 'text-red-700 dark:text-red-500' : 'text-gray-900 dark:text-white'}`}
            >
              Your email
            </label>
            <input
              type="email"
              id="email-input"
              className={`bg-gray-50 border ${message.includes('successful') ? 'border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500' : message.includes('failed') ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600'} text-sm rounded-lg block w-full p-2.5 dark:text-white`}
              placeholder="name@flowbite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password-input"
              className={`block mb-2 text-sm font-medium ${message.includes('successful') ? 'text-green-700 dark:text-green-500' : message.includes('failed') ? 'text-red-700 dark:text-red-500' : 'text-gray-900 dark:text-white'}`}
            >
              Your password
            </label>
            <input
              type="password"
              id="password-input"
              className={`bg-gray-50 border ${message.includes('successful') ? 'border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500' : message.includes('failed') ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600'} text-sm rounded-lg block w-full p-2.5 dark:text-white`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;