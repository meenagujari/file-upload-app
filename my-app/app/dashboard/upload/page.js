'use client';

import React, { useState } from 'react';
import { uploadFile } from '../../../lib/api/api';
import { useRouter } from 'next/navigation';

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    // Client-side validation
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

    if (selectedFile.size > MAX_FILE_SIZE) {
      setMessage('File size exceeds 5MB limit.');
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setMessage('Only PDF, JPG, JPEG, PNG files are allowed.');
      return;
    }

    setMessage('Uploading...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await uploadFile(formData);
      setMessage(`File '${response.data.file.fileName}' uploaded successfully!`);
      setSelectedFile(null);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000); // Optional: short delay to show the message
    } catch (error) {
      setMessage(error.response?.data?.message || 'File upload failed.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload File</h2>
        {message && (
          <p className={`mt-2 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="file-upload" className="sr-only">Choose file</label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="block w-full text-sm text-gray-900
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
              onChange={handleFileChange}
            />
          </div>
          {selectedFile && (
            <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
          )}
          <div>
            <button
              type="submit"
              onClick={handleUpload}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;