import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Sidebar from './components/Sidebar';
import UserProfileBar from '../userProfileBar';

// Main AddBook component
export default function AddBook() {
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    publisher: '',
    publishDate: '',
    numberOfPages: '',
    cover: '',
    content: '',
  });

  // State for authors list
  const [authors, setAuthors] = useState([]);

  // Fetch authors from the API
  const getAuthors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/authors`);
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Fetch authors when the component mounts
  useEffect(() => {
    getAuthors();
  }, []);

  const [setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const mockUser = {
    name: 'Theodora Apeadu',
    profilePicture: null,
  };

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/books`, formData);
      console.log('Book added:', response.data);
      alert('Book added successfully');
      navigate('/books');
    } catch (error) {
      console.error(error);
      alert('There was an error adding the book.');
    }
  };

  return (
    <PageFlipWrapper>
      <div
        className="min-h-screen flex flex-col bg-cover bg-center"
        style={{ backgroundImage: "url('./src/assets/images/lib-bg.jpg')" }}
      >
        <div className="flex flex-grow">
          {/* Sidebar component */}
          <Sidebar onToggle={setSidebarExpanded} />
          <div className="flex-grow flex flex-col">
            <div className="bg-white shadow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                  <div className="flex justify-start lg:w-0 lg:flex-1">
                    <h1 className="text-xl font-bold text-orange-600">ShelfLife.</h1>
                  </div>
                  <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                    <UserProfileBar user={mockUser} />
                  </div>
                </div>
              </div>
            </div>

            {/* Main form section */}
            <div className="flex-grow flex items-center justify-center p-4">
              <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Book</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title Input */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Author Select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="author">
                      Select Author
                    </label>
                    <select
                      name="author"
                      id="author"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      value={formData.author}
                      onChange={handleChange}
                    >
                      <option value="">Select an author</option>
                      {authors.map((author) => (
                        <option key={author._id} value={author._id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Summary Input */}
                  <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="summary"
                      name="summary"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      rows="3"
                      value={formData.summary}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Publisher Input */}
                  <div>
                    <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">
                      Publisher
                    </label>
                    <input
                      id="publisher"
                      type="text"
                      name="publisher"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      value={formData.publisher}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Publish Date Input */}
                  <div>
                    <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Publish Date (yy/mm/dd)
                    </label>
                    <input
                      id="publishDate"
                      type="text"
                      name="publishDate"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      value={formData.publishDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Number of Pages Input */}
                  <div>
                    <label htmlFor="numberOfPages" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Pages
                    </label>
                    <input
                      id="numberOfPages"
                      type="number"
                      name="numberOfPages"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      value={formData.numberOfPages}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Cover Upload Input */}
                  <div>
                    <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">
                      Book Cover (URL)
                    </label>
                    <input
                      id="cover"
                      type="text"
                      name="cover"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      value={formData.cover}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Book Content Upload Input */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Book Content (URL)
                    </label>
                    <input
                      id="content"
                      type="text"
                      name="content"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      value={formData.content}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Book
                    </button>
                  </div>
                </form>

                {/* Back to Library Link */}
                <div className="flex justify-center mt-4">
                  <Link to="/books" className="text-orange-500 hover:text-orange-700">
                    Back to Library
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageFlipWrapper>
  );
}
