import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Sidebar from './components/Sidebar';
import UserProfileBar from '../userProfileBar';

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    publisher: '',
    publishDate: { year: '', month: '', day: '' },
    numberOfPages: '',
    cover: '',
    content: '',
  });

  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/authors`);
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const mockUser = {
    name: 'John Doe',
    profilePicture: null
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      publishDate: {
        ...prevState.publishDate,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = {
      ...formData,
      publishDate: `${formData.publishDate.year}-${formData.publishDate.month}-${formData.publishDate.day}`
    };

    try {
      const response = await axios.post(`${BASE_URL}/books`, submitData);
      console.log('Book added:', response.data);
      alert('Book added successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('There was an error adding the book.');
    }
  };

  return (
    <PageFlipWrapper>
      <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('./src/assets/images/lib-bg.jpg')" }}>
        <div className="flex flex-grow">
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
            <div className="flex-grow flex items-center justify-center p-4">
              <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Book</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      // value={formData.title}
                      // onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="author">Select Author</label>
                    <select
                      name="author"
                      id="author"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      // value={formData.author}
                      // onChange={handleChange}
                      required
                    >
                      <option value="">Select an author</option>
                      {authors.map((author) => (
                        <option key={author._id} value={author._id}>{author.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="summary"
                      name="summary"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      rows="3"
                      // value={formData.summary}
                      // onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                    <input
                      id="publisher"
                      type="text"
                      name="publisher"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      // value={formData.publisher}
                      // onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        name="year"
                        placeholder="Year"
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        // value={formData.publishDate.year}
                        // onChange={handleDateChange}
                        required
                      />
                      <input
                        type="number"
                        name="month"
                        placeholder="Month"
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        // value={formData.publishDate.month}
                        // onChange={handleDateChange}
                        required
                      />
                      <input
                        type="number"
                        name="day"
                        placeholder="Day"
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        // value={formData.publishDate.day}
                        // onChange={handleDateChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="numberOfPages" className="block text-sm font-medium text-gray-700 mb-1">Number of Pages</label>
                    <input
                      id="numberOfPages"
                      type="number"
                      name="numberOfPages"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      // value={formData.numberOfPages}
                      // onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                    <input
                      id="cover"
                      type="text"
                      name="cover"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      // value={formData.cover}
                      // onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Book Content</label>
                    <input
                      id="content"
                      type="text"
                      name="content"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      // value={formData.content}
                      // onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700"
                    >
                      Add Book
                    </button>
                  </div>
                </form>
                <div className="flex justify-center mt-4">
                  <Link to="/books" className="text-orange-500 hover:text-orange-700">Back to Library</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageFlipWrapper>
  );
}
