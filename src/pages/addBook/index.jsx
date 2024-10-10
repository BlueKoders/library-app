import React, { useState } from 'react'; // Import React and useState hook for state management
import { Upload, User } from 'lucide-react'; // Import icons from lucide-react library
import { Link, useNavigate } from 'react-router-dom'; // Import React Router components for navigation
import PageFlipWrapper from '../../components/PageFlipWrapper'; // Import a custom component for page flip effect
import axios from 'axios'; // Import axios for making HTTP requests
import { BASE_URL } from '../../constants'; // Import the base URL from constants file for API requests
import Sidebar from './components/Sidebar'; // Import Sidebar component
import UserProfileBar from '../userProfileBar'; // Import UserProfileBar component for user profile display

// Predefined list of authors
const authors = ["J.K. Rowling", "George R.R. Martin", "Stephen King", "Jane Austen", "Mark Twain"];

export default function AddBook() {
  // State to store form input data
  const [formData, setFormData] = useState({
    title: '',
    selectedAuthor: '',
    customAuthors: '',
    description: '',
    publisher: '',
    publishDate: { year: '', month: '', day: '' },
    numberOfPages: '',
    coverImage: null, // For storing the uploaded cover image file
    bookFile: null,   // For storing the uploaded book file
  });
  
  const [sidebarExpanded, setSidebarExpanded] = useState(false); // State to handle sidebar toggle
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Mock user data for the user profile bar
  const mockUser = {
    name: 'John Doe',
    profilePicture: null // Test with null to check the placeholder behavior
  };

  // Handle change in text inputs (title, description, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Update the corresponding field in formData
    }));
  };

  // Handle change in publish date inputs (year, month, day)
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      publishDate: {
        ...prevState.publishDate,
        [name]: value // Update the correct part of the publishDate object
      }
    }));
  };

  // Handle file input changes (cover image and book file)
  const handleFileChange = (e) => {
    const { name, files } = e.target; // Extract files from input
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0] // Update with the selected file
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const submitData = new FormData(); // Create FormData object for handling file uploads
    submitData.append('title', formData.title); // Add title to the form data
    submitData.append('authors[]', formData.selectedAuthor); // Add selected author
    formData.customAuthors.split(',').forEach(author => submitData.append('customAuthors[]', author.trim())); // Add custom authors
    submitData.append('description', formData.description); // Add description
    submitData.append('publisher', formData.publisher); // Add publisher
    submitData.append('publishDate', `${formData.publishDate.year}-${formData.publishDate.month}-${formData.publishDate.day}`); // Add formatted publish date
    submitData.append('numberOfPages', formData.numberOfPages); // Add number of pages
    if (formData.coverImage) submitData.append('coverImage', formData.coverImage); // Add cover image if present
    if (formData.bookFile) submitData.append('bookFile', formData.bookFile); // Add book file if present

    // Submit the form data via API request
    try {
      const response = await axios.post(`${BASE_URL}/books`, submitData); // Post request to add book
      console.log('Book added:', response.data); // Log response
      alert('Book added successfully'); // Notify user of success
      navigate('/'); // Redirect to home page after submission
    } catch (error) {
      console.error(error); // Log error in case of failure
      alert('There was an error adding the book.'); // Notify user of failure
    }
  };

  // JSX returned for rendering the AddBook component
  return (
    <PageFlipWrapper> {/* Wrapping the page content in PageFlipWrapper component */}
      <div className="min-h-screen flex flex-col bg-cover bg-center" style={{backgroundImage: "url('./src/assets/images/lib-bg.jpg')"}}> {/* Background image */}
        <div className="flex flex-grow">
          <Sidebar onToggle={setSidebarExpanded} /> {/* Sidebar component */}
          <div className="flex-grow flex flex-col">
            <div className="bg-white shadow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                  <div className="flex justify-start lg:w-0 lg:flex-1">
                    <h1 className="text-xl font-bold text-orange-600">ShelfLife.</h1> {/* Page title */}
                  </div>
                  <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                    <UserProfileBar user={mockUser} /> {/* User profile bar */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center justify-center p-4">
              <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Book</h2>
                {/* Form for adding a new book */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Input for book title */}
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

                  {/* Dropdown for selecting author */}
                  <div>
                    <label htmlFor="selectedAuthor" className="block text-sm font-medium text-gray-700 mb-1">Select Author</label>
                    <select
                      id="selectedAuthor"
                      name="selectedAuthor"
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      required
                    >
                      <option value="">Select an author</option>
                      {authors.map((author, index) => (
                        <option key={index} value={author}>{author}</option>
                      ))}
                    </select>
                  </div>

                  {/* Input for custom authors */}
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

                  {/* Input for description */}
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

                  {/* Input for publisher */}
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

                  {/* Inputs for publish date (year, month, day) */}
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

                  {/* Input for number of pages */}
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

                  {/* File input for cover image */}
                  <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                    <input
                      id="coverImage"
                      type="file"
                      name="coverImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>

                  {/* File input for book file */}
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

                  {/* Submit button */}
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
