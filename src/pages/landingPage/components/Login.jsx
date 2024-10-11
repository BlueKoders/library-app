import React, { useState } from 'react'; // Import React and the useState hook to manage component state
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { Eye, EyeOff } from 'lucide-react'; // Import icons from the lucide-react icon library

const Login = () => {
  // State variables to store the email, password, and visibility of the password field
  const [email, setEmail] = useState(''); // Stores the email input
  const [password, setPassword] = useState(''); // Stores the password input
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility (true = show password as text)

  // Function that handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page refresh)
    console.log('Login attempted with:', { email, password }); // For now, just log the email and password to the console
  };

  return (
    // Main container: centers the login form on the screen and gives it a background color
    <div className="min-h-screen flex items-center justify-center bg-orange-300">
      {/* Box containing the form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Icon at the top of the form */}
        <div className="flex justify-center mb-8">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" fill="#4A5568" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" fill="#4A5568" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Login form title */}
        <h2 className="text-2xl font-bold text-center text-orange-800 mb-8">Login to ShelfLife</h2>
        
        {/* Form element */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-orange-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email" // Input type set to email
              id="email" // Associate the input with the label
              className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter your email" // Placeholder text inside the input field
              value={email} // Bind the email state to the input value
              onChange={(e) => setEmail(e.target.value)} // Update state when the user types
              required // Make the email field required
            />
          </div>

          {/* Password input field with toggle for showing/hiding the password */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-orange-700 text-sm font-bold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password' types to show/hide password
              id="password" // Associate the input with the label
              className="w-full p-2 rounded bg-orange-100 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter your password" // Placeholder text inside the input field
              value={password} // Bind the password state to the input value
              onChange={(e) => setPassword(e.target.value)} // Update state when the user types
              required // Make the password field required
            />
            {/* Button to toggle password visibility */}
            <button
              type="button" // Button type set to 'button' so it doesn't submit the form
              className="absolute right-3 top-8 text-orange-600"
              onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state when clicked
            >
              {/* Show the appropriate icon based on whether the password is visible or hidden */}
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login button */}
          <div className="flex justify-center"> 
            <Link
              to="/add-new" // Link to another route (e.g., after login)
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50"
            >
              Log In
            </Link>
          </div>
        </form>

        {/* Sign-up link below the login button */}
        <div className="mt-4 text-center">
          <Link to="/sign-up" className="text-sm text-orange-500 hover:underline">
            Don't have an account? Sign Up! {/* Link to the sign-up page */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; // Export the component for use in other parts of the app
