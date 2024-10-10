import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import Sidebar from './components/Sidebar';
import UserProfileBar from '../userProfileBar';

function BookDetails() {
  const [book, setBook] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock user data - replace this with actual user data from your auth system
  const user = {
    name: 'John Doe',
    profilePicture: null // or provide a URL if available
  };

  useEffect(() => {
    // Fetch book details from API
    // Dummy data for now. You can replace this with an API call to fetch actual data.
    setBook({
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      year: 1960,
      description: 'A novel about the serious issues of race, class, gender, and family in the Deep South.',
      numberOfPages: 281,
      publisher: 'J.B. Lippincott & Co.',
      coverImage: 'path/to/cover.jpg', // Update with the actual path
      bookFile: 'path/to/book.pdf' // Update with the actual path
    });
  }, [id]);

  const handleDelete = () => {
    // Delete book API call would go here
    alert('Book deleted successfully');
    navigate('/books');
  };

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  // Loading state 
  if (!book) return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-md p-4">
        <UserProfileBar user={user} />
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <main 
          className={`flex-1 p-6 transition-all duration-300`}
          style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }}
        >
          Loading...
        </main>
      </div>
    </div>
  );

  return (
    <PageFlipWrapper>
      <div className="flex flex-col h-screen">
        <div className="bg-white shadow-md p-4">
          <UserProfileBar user={user} />
        </div>
        <div className="flex flex-1">
          <Sidebar 
            onToggle={handleSidebarToggle} 
          />
          <main 
            className={`details-bg flex-1 p-6 transition-all duration-300 overflow-y-auto`}
            style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              {book.coverImage && (
                <div className="mb-4">
                  <img src={book.coverImage} alt={`Cover of ${book.title}`} className="max-w-xs rounded-md" />
                </div>
              )}
              <p className="text-xl mb-2"><span className="font-semibold">Author:</span> {book.author}</p>
              <p className="text-xl mb-2"><span className="font-semibold">Publisher:</span> {book.publisher}</p>
              <p className="text-xl mb-2"><span className="font-semibold">Number of Pages:</span> {book.numberOfPages}</p>
              <p className="text-xl mb-4"><span className="font-semibold">Year:</span> {book.year}</p>
              <p className="mb-4"><span className="font-semibold">Description:</span> {book.description}</p>
              <div className="mb-4">
                <span className="font-semibold">Book File:</span>
                <a href={book.bookFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> Download</a>
              </div>
              <div className="mt-6 space-x-4">
                <Link 
                  to={`/edit/${book.id}`} 
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
              <Link 
                to="/books" 
                className="block mt-6 text-blue-500 hover:text-blue-600 transition-colors"
              >
                Back to Book List
              </Link>
            </div>
          </main>
        </div>
      </div>
    </PageFlipWrapper>
  );
}

export default BookDetails;