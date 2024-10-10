import React, { useState } from 'react';
import { Upload, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PageFlipWrapper from '../../components/PageFlipWrapper';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Sidebar from './components/Sidebar';
import UserProfileBar from '../userProfileBar';

const authors = ["J.K. Rowling", "George R.R. Martin", "Stephen King", "Jane Austen", "Mark Twain"];

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    selectedAuthor: '',
    customAuthors: '',
    description: '',
    publisher: '',
    publishDate: { year: '', month: '', day: '' },
    numberOfPages: '',
    coverImage: null,
    bookFile: null,
  });
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  // Mock user data for UserProfileBar
  const mockUser = {
    name: 'John Doe',
    profilePicture: null // Set to null to test the placeholder
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
    if (formData.coverImage) submitData.append('coverImage', formData.coverImage);
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
      <div className="min-h-screen flex flex-col bg-cover bg-center" style={{backgroundImage: "url('./src/assets/images/lib-bg.jpg')"}}>
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
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="selectedAuthor" className="block text-sm font-medium text-gray-700 mb-1">Select Author</label>
                    <select
                      id="selectedAuthor"
                      name="selectedAuthor"
                      value={formData.selectedAuthor}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      required
                    >
                      <option value="">Select an author</option>
                      {authors.map((author, index) => (
                        <option key={index} value={author}>{author}</option>
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
                      value={formData.customAuthors}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
                      value={formData.publisher}
                      onChange={handleChange}
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
                        value={formData.publishDate.year}
                        onChange={handleDateChange}
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        required
                      />
                      <input
                        type="number"
                        name="month"
                        placeholder="Month"
                        value={formData.publishDate.month}
                        onChange={handleDateChange}
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        required
                        min="1"
                        max="12"
                      />
                      <input
                        type="number"
                        name="day"
                        placeholder="Day"
                        value={formData.publishDate.day}
                        onChange={handleDateChange}
                        className="w-1/3 p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        required
                        min="1"
                        max="31"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="numberOfPages" className="block text-sm font-medium text-gray-700 mb-1">Number of Pages</label>
                    <input
                      id="numberOfPages"
                      type="number"
                      name="numberOfPages"
                      value={formData.numberOfPages}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                    <div className="flex items-center space-x-2 bg-orange-100 p-2 rounded border border-orange-200">
                      <label htmlFor="coverImage" className="cursor-pointer flex items-center">
                        <Upload size={20} className="mr-2" />
                        <span>Upload Cover Image</span>
                      </label>
                      <input
                        type="file"
                        id="coverImage"
                        name="coverImage"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Book File</label>
                    <div className="flex items-center space-x-2 bg-orange-100 p-2 rounded border border-orange-200">
                      <label htmlFor="bookFile" className="cursor-pointer flex items-center">
                        <Upload size={20} className="mr-2" />
                        <span>Upload Book File</span>
                      </label>
                      <input
                        type="file"
                        id="bookFile"
                        name="bookFile"
                        className="hidden"
                        accept=".pdf,.epub,.mobi"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-300"
                  >
                    Add Book
                  </button>
                </form>
                <Link to="/books" className="block mt-4 text-blue-500 hover:text-blue-600">Back to Book List</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageFlipWrapper>
  );
}