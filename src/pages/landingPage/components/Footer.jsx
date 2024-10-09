import React from 'react';
import { Link } from 'react-router-dom'; // Ensure to import Link
import { FaFacebook, FaInstagram, FaGithub, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Column 1: About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About ShelfLife</h3>
          <p className="text-sm">
            ShelfLife is a modern library management app designed to help users efficiently manage their book collections, keep track of borrowings, and explore new reads.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-gray-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/explore" className="hover:text-gray-400 transition">Explore Books</Link>
            </li>
            <li>
              <Link to="/library" className="hover:text-gray-400 transition">My Library</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400 transition">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">
            <strong>Email:</strong> support@shelflife.com
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +123-456-7890
          </p>
          <p className="text-sm">
            <strong>Address:</strong> 123 Library Street, Booktown
          </p>
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaGithub size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaWhatsapp size={20} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} BlueKoders. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;