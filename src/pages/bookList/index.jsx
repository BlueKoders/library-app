// components/BookList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function BookList() {
  const [books, setBooks] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    // Fetch books from API
    // For now, we'll use dummy data
    setBooks([
      { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { id: 2, title: '1984', author: 'George Orwell' },
    ]);
  }, []);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  return (
    <div className="flex">
      <Sidebar onToggle={handleSidebarToggle} />
      <main 
        className={`flex-1 p-6 transition-all duration-300`}
        style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }}
      >
        <h1 className="text-2xl font-bold mb-4">Book List</h1>
        <ul className="space-y-2">
          {books.map((book) => (
            <li key={book.id} className="bg-white p-4 rounded shadow">
              <Link to={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800">
                {book.title} by {book.author}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


export default BookList;