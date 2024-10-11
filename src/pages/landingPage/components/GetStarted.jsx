import React from 'react';
import { Link } from 'react-router-dom';
// import PageFlipWrapper from '../../../components/PageFlipWrapper';

const GetStarted = () => {
    return (
        <section>
            {/* <PageFlipWrapper> */}
            <div className="  flex justify-center items-center min-h-screen bg-orange-300">
                <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-4xl">
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-6xl font-bold mb-2 text-orange-700">Sign up for ShelfLife!</h1>
                        <p className="text-gray-600 text-2xl">Your library catalog available anywhere, anytime.</p>
                    </div>

                    {/* Form */}
                    <form>
                        {/* Account Info Label */}
                        <h2 className="text-xl font-semibold text-orange-500 mb-4">Account info:</h2>

                        {/* Name fields */}
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text" placeholder='John'
                                    id="firstName"
                                    name="firstName"
                                    className="mt-1 p-2 block w-full bg-orange-100 border-2 border-orange-200 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-100"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text" placeholder='Doe'
                                    id="lastName"
                                    name="lastName"
                                    className="mt-1 p-2 block w-full bg-orange-100 border-2 border-orange-200 rounded-md shadow-sm focus:ring-orang-300 focus:border-orange-100"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email and Password fields */}
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email" placeholder='johndoe@gmail.com'
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 block w-full bg-orange-100 border-2 border-orange-200 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-100"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password" placeholder='J*******!'
                                    id="password"
                                    name="password"
                                    className="mt-1 p-2 block w-full bg-orange-100 border-2 border-orange-200 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-100"
                                    required
                                />
                            </div>
                        </div>

                        {/* Country field */}
                        <div className="mb-4">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                className="mt-1 p-2 block w-full bg-orange-100 border-2 border-orange-200 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-100 "
                                required
                            >
                                <option value="">Select your country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                                <option value="GB">United Kingdom</option>
                                {/* Add more country options as needed */}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <Link to="/login"
                                type="submit"
                                className="w-48 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2">
                                Sign-up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            {/* </PageFlipWrapper> */}
        </section>
    );
};

export default GetStarted;
