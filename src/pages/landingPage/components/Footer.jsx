<<<<<<< HEAD
import React from 'react'

const Footer = () => {
  return (
    <div>Footer</div>
  )
}

export default Footer;
=======
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
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
              <a href="#" className="hover:text-gray-400 transition">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">Explore Books</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">My Library</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">Contact Us</a>
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
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ShelfLife. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
>>>>>>> 0c0be6451947e32b1cb90ba2fe12d8d4f139ce0d
