import React, { useEffect, useState } from 'react';
import { Upload, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Sidebar from './components/Sidebar';
import UserProfileBar from '../userProfileBar';

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    selectedAuthor: '',
    customAuthors: '',
    description: '',
    publisher: '',
    publishDate: { year: '', month: '', day: '' },
    numberOfPages: '',
    coverImage: '',
    bookFile: null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('authors[]', formData.selectedAuthor);
    formData.customAuthors.split(',').forEach(author => submitData.append('customAuthors[]', author.trim()));
    submitData.append('description', formData.description);
    submitData.append('publisher', formData.publisher);
    submitData.append('publishDate', `${formData.publishDate.year}-${formData.publishDate.month}-${formData.publishDate.day}`);
    submitData.append('numberOfPages', formData.numberOfPages);
    submitData.append('coverImage', formData.coverImage);
    if (formData.bookFile) submitData.append('bookFile', formData.bookFile);

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
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="selectedAuthor">Select Author</label>
                    <select
                      name="selectedAuthor"
                      id="selectedAuthor"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      required
                    >
                      <option value="">Select an author</option>
                      {authors.map((author) => (
                        <option key={author._id} value={author._id}>{author.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="customAuthors" className="block text-sm font-medium text-gray-700 mb-1">Custom Authors</label>
                    <input
                      id="customAuthors"
                      type="text"
                      name="customAuthors"
                      placeholder="Enter custom authors (comma-separated)"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      rows="3"
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
                        required
                      />
                      <input
                        type="number"
                        name="month"
                        placeholder="Month"
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        required
                      />
                      <input
                        type="number"
                        name="day"
                        placeholder="Day"
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                    <input
                      id="coverImage"
                      type="text"
                      name="coverImage"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="bookFile" className="block text-sm font-medium text-gray-700 mb-1">Book File (PDF)</label>
                    <input
                      id="bookFile"
                      type="file"
                      name="bookFile"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageFlipWrapper>
  );
}