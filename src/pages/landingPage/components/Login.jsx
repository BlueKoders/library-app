import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
// import PageFlipWrapper from '../../../components/PageFlipWrapper';

const Login = () => {
  // State hooks for form inputs and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual login logic here
    console.log('Login attempted with:', { email, password });
  };

  return (
    <>
    {/* <PageFlipWrapper> */}
    {/* Main container with full height and centered content */}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Login form card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG paths for open book logo */}
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" fill="#4A5568" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" fill="#4A5568" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Login form title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login to ShelfLife</h2>
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input field with show/hide toggle */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Show/hide password toggle button */}
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* Login submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>
        {/* Sign up link */}
        <div className="mt-4 text-center">
          <Link to="/sign-up" className="text-sm text-blue-500 hover:underline">
            Don't have an account? Sign Up!
          </Link>
        </div>
      </div>
    </div>
    {/* </PageFlipWrapper> */}
    </>
  );
};

export default Login;