import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PageFlipWrapper from '../../components/PageFlipWrapper';

function AddBook() {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState(['']); // Accepting multiple authors
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishDate, setPublishDate] = useState({ year: '', month: '', day: '' });
  const [numberOfPages, setNumberOfPages] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null); // State for the book file
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add book API call would go here
    console.log('Book Details:', {
      title,
      authors,
      description,
      publisher,
      publishDate,
      numberOfPages,
      coverImage,
      bookFile
    });
    alert('Book added successfully');
    navigate('/');
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]); // Handle cover image upload
  };

  const handleBookFileChange = (e) => {
    setBookFile(e.target.files[0]); // Handle book file upload
  };

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };

  const handleAuthorChange = (index, event) => {
    const newAuthors = [...authors];
    newAuthors[index] = event.target.value;
    setAuthors(newAuthors);
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, '']); // Add another author input
  };

  return (
    <>
      <PageFlipWrapper>
        <div className="flex">
          <Sidebar onToggle={handleSidebarToggle} />
          <main 
            className={`flex-1 p-6 transition-all duration-300`}
            style={{ marginLeft: sidebarExpanded ? '256px' : '64px' }}
          >
            <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-1">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Authors:</label>
                {authors.map((author, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e)}
                      placeholder={`Author ${index + 1}`}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddAuthor} className="mt-2 text-blue-500">
                  Add Another Author
                </button>
              </div>
              <div>
                <label htmlFor="publisher" className="block mb-1">Publisher:</label>
                <input
                  type="text"
                  id="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="publishDate" className="block mb-1">Publish Date:</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Year"
                    value={publishDate.year}
                    onChange={(e) => setPublishDate({ ...publishDate, year: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Month"
                    value={publishDate.month}
                    onChange={(e) => setPublishDate({ ...publishDate, month: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Day"
                    value={publishDate.day}
                    onChange={(e) => setPublishDate({ ...publishDate, day: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="numberOfPages" className="block mb-1">Number of Pages:</label>
                <input
                  type="number"
                  id="numberOfPages"
                  value={numberOfPages}
                  onChange={(e) => setNumberOfPages(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="coverImage" className="block mb-1">Upload Cover Image:</label>
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="bookFile" className="block mb-1">Upload Book File:</label>
                <input
                  type="file"
                  id="bookFile"
                  accept=".pdf,.epub,.mobi" 
                  onChange={handleBookFileChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows="4"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Add Book
              </button>
            </form>
            <Link to="/books" className="block mt-4 text-blue-500 hover:text-blue-600">Back to Book List</Link>
          </main>
        </div>
      </PageFlipWrapper>
    </>
  );
}

export default AddBook;