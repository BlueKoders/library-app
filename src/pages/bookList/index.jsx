// components/BookList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from API
    // For now, we'll use dummy data
    setBooks([
      { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { id: 2, title: '1984', author: 'George Orwell' },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow">
            <Link to={`/book/${book.id}`} className="text-blue-500 hover:text-blue-700">
              {book.title} by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;