import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import Sidebar from './components/Sidebar';


function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    // Fetch books from API
    // For now, we'll use dummy data
    const fetchedBooks = [
      { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { id: 2, title: '1984', author: 'George Orwell' },
      { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
    ];
    setBooks(fetchedBooks);
    setFilteredBooks(fetchedBooks); // Initially set filtered books to all books
  }, []);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter books based on the search query
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  return (
    <PageFlipWrapper>
      <div className="flex h-screen"> {/* Ensure full height for the layout */}
        <Sidebar onToggle={handleSidebarToggle} />
        <main 
          className={`flex-1 p-6 transition-all duration-300`} 
          style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }} // Adjust margin based on sidebar width
        >
          <h1 className="text-2xl font-bold mb-4">Book List</h1>

          {/* Search Area */}
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search for books..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <ul className="space-y-2">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <li key={book.id} className="bg-white p-4 rounded shadow">
                  <Link to={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800">
                    {book.title} by {book.author}
                  </Link>
                </li>
              ))
            ) : (
              <li className="bg-white p-4 rounded shadow">No books found.</li>
            )}
          </ul>
        </main>
      </div>
    </PageFlipWrapper>
  );
}

export default BookList;