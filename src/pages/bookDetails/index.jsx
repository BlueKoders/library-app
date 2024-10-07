// components/BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function BookDetails() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book details from API
    // For now, we'll use dummy data
    setBook({ id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 });
  }, [id]);

  const handleDelete = () => {
    // Delete book API call would go here
    alert('Book deleted successfully');
    navigate('/');
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <div className="mt-4 space-x-2">
        <Link to={`/edit/${book.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookDetails;