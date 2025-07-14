// app/dashboard/page.js
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/redux/authSlice';

const DashboardPage = () => {
  const user = useSelector((state) => state.auth.user);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8 lg:p-12 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        <div className="p-6 sm:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Welcome back, {user?.username || user?.email || 'Guest'}!</h1>
          <p className="text-lg text-gray-600 mb-10">Manage your files with ease.</p>
          
          <div className="grid grid-cols-1 gap-8 lg:gap-12">
            <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-xl border border-blue-700">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">File Management</h2>
                <p className="text-blue-100 mb-6">Upload new documents or view your existing collection.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/dashboard/upload" className="flex items-center justify-center px-6 py-4 bg-white text-blue-700 rounded-xl shadow-md hover:bg-blue-50 transition-all duration-300 text-lg font-semibold border border-transparent hover:border-blue-300">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Upload New File
                  </Link>
                  
                  <Link href="/dashboard/files" className="flex items-center justify-center px-6 py-4 bg-white text-green-700 rounded-xl shadow-md hover:bg-green-50 transition-all duration-300 text-lg font-semibold border border-transparent hover:border-green-300">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    View My Files
                  </Link>
                  <button onClick={handleLogout} className="flex items-center justify-center px-6 py-4 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition-all duration-300 text-lg font-semibold border border-transparent hover:border-red-300">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;