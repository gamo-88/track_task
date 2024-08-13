import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Erropage() {

    const navigate = useNavigate();

    const handleRedirect = () => {
      navigate('/');
    }
  return(
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page not found.
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={handleRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );

}
