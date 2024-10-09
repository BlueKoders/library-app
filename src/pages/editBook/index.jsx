import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import Sidebar from './components/Sidebar';

function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book details from API
    // For now, we'll use dummy data
    setTitle('To Kill a Mockingbird');
    setAuthor('Harper Lee');
    setYear('1960');
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update book API call would go here
    alert('Book updated successfully');
    navigate(`/books/${id}`);
  };

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  return (
    <>
      <PageFlipWrapper>
        <div className="flex h-screen"> {/* Ensure full height for the layout */}
          <Sidebar onToggle={handleSidebarToggle} />
          <main 
            className={`flex-1 p-6 transition-all duration-300`} 
            style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }} // Sidebar width adjustment
          >

            <div className="bg-white p-6 rounded-lg shadow-md">
             <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
             <form onSubmit={handleSubmit} className="space-y-4">

             <div>
               <label htmlFor="title" className="block mb-1 font-medium">Title:</label>
               <input 
                 type="text" 
                 id="title" 
                 value={title} 
                 onChange={(e) => setTitle(e.target.value)} 
                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 required 
               />
             </div>

             <div>
               <label htmlFor="author" className="block mb-1 font-medium">Author:</label>
               <input 
                 type="text" 
                 id="author" 
                 value={author} 
                 onChange={(e) => setAuthor(e.target.value)}
                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required 
               />
             </div>

             <div>
               <label htmlFor="year" className="block mb-1 font-medium">Year:</label>
               <input 
                 type="number" 
                 id="year" 
                 value={year} 
                 onChange={(e) => setYear(e.target.value)}
                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 required 
               />
             </div>

             <div className="flex space-x-4">
               <button 
                 type="submit" 
                 className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors" 
               >
                 Update Book
               </button>
               <Link
                 to={`/books/${id}`}
                 className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
               >
                 Cancel
               </Link>
             </div>
            </form>
          </div>
        </main>
      </div>
    </PageFlipWrapper>
    </>
  );
}

export default EditBook;