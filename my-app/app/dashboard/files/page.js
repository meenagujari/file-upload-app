'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '@/lib/redux/authSlice';
import { useRouter } from 'next/navigation';

const FilesPage = () => {
  const token = useSelector(selectToken);
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleViewFile = async (fileId) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/auth/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid, redirect to login
            router.push('/auth/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [token, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading files...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Uploaded Files</h1>
        {files.length === 0 ? (
          <p className="text-center text-gray-600">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file) => (
              <li key={file._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L14.414 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                  <div>
                    <p className="text-lg font-semibold text-gray-700">{file.fileName}</p>
                    <p className="text-sm text-gray-500">{file.fileType} - {(file.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-sm text-gray-500">Uploaded on: {new Date(file.uploadDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewFile(file._id)}
                  className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                >
                  View File
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilesPage;