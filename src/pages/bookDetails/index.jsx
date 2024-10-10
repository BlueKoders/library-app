import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import hooks for URL parameters, navigation, and links
import PageFlipWrapper from '../../components/PageFlipWrapper'; // Custom wrapper component for a page-flip effect
import Sidebar from './components/Sidebar'; // Import Sidebar component
import UserProfileBar from '../userProfileBar'; // Import UserProfileBar component to display user info

function BookDetails() {
  // State to hold the details of the book to be displayed
  const [book, setBook] = useState(null); // 'book' starts as null and is updated when data is fetched
  const [sidebarExpanded, setSidebarExpanded] = useState(false); // Track whether the sidebar is expanded or collapsed
  const { id } = useParams(); // Retrieve the 'id' parameter from the URL to know which book to display
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Mock user data - in a real application, this would come from an authentication system
  const user = {
    name: 'John Doe',
    profilePicture: null // The user's profile picture, or null if none is available
  };

  useEffect(() => {
    // UseEffect to fetch the book details when the component mounts or 'id' changes
    // Currently using dummy data, replace this with an API call to get actual book data
    setBook({
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      year: 1960,
      description: 'A novel about the serious issues of race, class, gender, and family in the Deep South.',
      numberOfPages: 281,
      publisher: 'J.B. Lippincott & Co.',
      coverImage: 'path/to/cover.jpg', // Placeholder path to cover image
      bookFile: 'path/to/book.pdf' // Placeholder path to book file
    });
  }, [id]); // Dependency array with 'id', so this runs when 'id' changes

  const handleDelete = () => {
    // Function to handle deleting a book
    // You would call a delete API here
    alert('Book deleted successfully'); // Alert the user after deletion
    navigate('/books'); // Redirect to the list of books after deletion
  };

  const handleSidebarToggle = (expanded) => {
    // Function to handle toggling the sidebar between expanded and collapsed
    setSidebarExpanded(expanded);
  };

  // Return a loading message if the book data hasn't been loaded yet
  if (!book) return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-md p-4">
        <UserProfileBar user={user} /> {/* Show the user's profile */}
      </div>
      <div className="flex flex-1">
        <Sidebar /> {/* Sidebar with no toggle functionality here */}
        <main 
          className={`flex-1 p-6 transition-all duration-300`}
          style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }} // Adjust main content margin based on sidebar state
        >
          Loading... {/* Display while waiting for book data */}
        </main>
      </div>
    </div>
  );

  // Main return statement: rendering the book details once the data is available
  return (
    <PageFlipWrapper> {/* Wrapper component for the page flip effect */}
      <div className="flex flex-col h-screen">
        <div className="bg-white shadow-md p-4">
          <UserProfileBar user={user} /> {/* Display the user's profile */}
        </div>
        <div className="flex flex-1">
          <Sidebar 
            onToggle={handleSidebarToggle} // Sidebar component with toggle functionality
          />
          <main 
            className={`details-bg flex-1 p-6 transition-all duration-300 overflow-y-auto`} // Adjust for a smooth layout transition
            style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }} // Sidebar affects the left margin
          >
            <div className="bg-white p-6 rounded-lg shadow-md"> {/* Container for book details */}
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1> {/* Display the book's title */}
              
              {/* If there's a cover image, display it */}
              {book.coverImage && (
                <div className="mb-4">
                  <img src={book.coverImage} alt={`Cover of ${book.title}`} className="max-w-xs rounded-md" />
                </div>
              )}

              {/* Display book details */}
              <p className="text-xl mb-2"><span className="font-semibold">Author:</span> {book.author}</p>
              <p className="text-xl mb-2"><span className="font-semibold">Publisher:</span> {book.publisher}</p>
              <p className="text-xl mb-2"><span className="font-semibold">Number of Pages:</span> {book.numberOfPages}</p>
              <p className="text-xl mb-4"><span className="font-semibold">Year:</span> {book.year}</p>
              <p className="mb-4"><span className="font-semibold">Description:</span> {book.description}</p>

              {/* Provide a download link for the book file */}
              <div className="mb-4">
                <span className="font-semibold">Book File:</span>
                <a href={book.bookFile} target="_blank" rel="noopener noreferrer" className="text-orange-500 underline"> Download</a>
              </div>

              {/* Buttons for editing or deleting the book */}
              <div className="mt-6 space-x-4">
                <Link 
                  to={`/edit/${book.id}`} // Link to the edit page for the book
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Edit
                </Link>
                <button 
                  onClick={handleDelete} // Delete button triggers the handleDelete function
                  className="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>

              {/* Link to go back to the list of books */}
              <Link 
                to="/books" 
                className="block mt-6 text-orange-500 hover:text-orange-700 transition-colors"
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

export default BookDetails; // Export the component for use elsewhere in the application
