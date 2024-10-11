import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import Sidebar from './components/Sidebar';
import Footer from '../landingPage/components/Footer';

function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://library-api-qzhf.onrender.com/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery) ||
      (book.author && book.author.name.toLowerCase().includes(searchQuery)) // Adjusted to search by author name
    );
    setFilteredBooks(filtered);
  };

  return (
    <PageFlipWrapper>
      <div className="flex h-full">
        <Sidebar onToggle={handleSidebarToggle} />
        <main
          className="flex-1 p-6 transition-all duration-300"
          style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }}
        >
          <h1 className="text-5xl font-bold text-orange-600 mt-4 mb-4">Book List</h1>

          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow p-5 mt-6 rounded-l border border-orange-300 focus:outline-none focus:border-orange-500 transition"
            />
            <button
              onClick={handleSearch}
              className="p-5 mt-6 bg-orange-600 text-white rounded-r hover:bg-orange-700 transition"
            >
              Search
            </button>
          </div>

          {isLoading ? (
            <p>Loading books...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <ul className="books space-y-2">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <li key={book._id} className="flex items-center bg-white p-4 mt-4 rounded shadow">
                    {/* Book Cover Image */}
                    {book.cover && (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-24 h-36 object-cover mr-4 rounded"
                      />
                    )}

                    {/* Book Title and Author */}
                    <div>
                      <Link to={`/books/${book._id}`} className="text-orange-600 font-bold hover:text-orange-800">
                        {book.title || 'Untitled'}
                      </Link>
                      {book.author && (
                        <p className="text-sm text-gray-600">{book.author.name}</p>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="bg-white p-4 rounded shadow">No books found.</li>
              )}
            </ul>
          )}
        </main>
      </div>
    </PageFlipWrapper>
  );
}

export default BookList;
