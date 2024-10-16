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
        <div className="flex h-screen bg-orange-300"> {/* Ensure full height for the layout */}
          <Sidebar onToggle={handleSidebarToggle} />
          <main 
            className={`flex-1 p-6 transition-all duration-300`} 
            style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }} // Sidebar width adjustment
          >

            <div className="backdrop-blur-2xl bg-white p-6 rounded-lg shadow-2xl w-fit mx-auto">
             <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
             <form onSubmit={handleSubmit} className="space-y-4">

             <div>
               <label htmlFor="title" className="block mb-1 font-medium">Title:</label>
               <input 
                 type="text" 
                 id="title" 
                 className="w-96 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" 
                 required 
               />
             </div>

             <div>
               <label htmlFor="author" className="block mb-1 font-medium">Author:</label>
               <input 
                 type="text" 
                 id="author" 
                 className="w-96 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                 required 
               />
             </div>

             <div>
               <label htmlFor="year" className="block mb-1 font-medium">Year:</label>
               <input 
                 type="number" 
                 id="year" 
                 className="w-96 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" 
                 required 
               />
             </div>
                <div>
                  <label for="description" class="block mb-1 font-medium">Description:</label>
                  <textarea
                    id="description"
                    class="w-full h-32 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 resize-none"
                    required
                  ></textarea>
                </div>

             <div className="flex space-x-4">
               <button 
                 type="submit" 
                 className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors" 
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