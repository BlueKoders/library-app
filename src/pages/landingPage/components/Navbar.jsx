import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BookOpen className={`h-8 w-8 ${isScrolled ? 'text-orange-500' : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>ShelfLife.</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className={`px-3 py-2 rounded-md text-sm font-medium ${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
              Contact Us
            </button>
            <Link 
              to="/login" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Login
            </Link>
            <Link 
              to="/sign-up" 
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;