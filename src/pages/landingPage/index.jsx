import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'; // Importing the navigation bar component
import { Link } from 'react-router-dom'; // Importing Link for routing
import Footer from './components/Footer'; // Importing the footer component
import libraryVideo from '/public/videos/landing-libvid.mp4'; // Importing a video for the main section
import ShelfVideo from '/public/videos/libshelf.mp4'; // Importing a video for the splash screen

const LandingPage = () => {
  // State to manage the splash screen and text animations
  const [showSplash, setShowSplash] = useState(true); // Controls the visibility of the splash screen
  const [splashExit, setSplashExit] = useState(false); // Tracks whether the splash screen is exiting
  const [text1, setText1] = useState(''); // Holds the first line of animated text
  const [text2, setText2] = useState(''); // Holds the second line of animated text
  const fullText1 = "Welcome to ShelfLife Cataloging!"; // Full text for the first line
  const fullText2 = "Cataloging made easier..."; // Full text for the second line
  const [index1, setIndex1] = useState(0); // Index for animating text1
  const [index2, setIndex2] = useState(0); // Index for animating text2
  const [firstPartDone, setFirstPartDone] = useState(false); // Tracks if the first part of text animation is done

  // Effect for managing splash screen timeout
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashExit(true); // Start the fade-out effect
      const removeSplashTimer = setTimeout(() => {
        setShowSplash(false); // Remove splash screen after fade-out
      }, 1000); // 1 second delay for the exit animation
      return () => clearTimeout(removeSplashTimer);
    }, 5000); // Show splash screen for 5 seconds

    return () => clearTimeout(splashTimer);
  }, []);

  // Effect for animating the first line of text
  useEffect(() => {
    if (index1 < fullText1.length) {
      const timer = setTimeout(() => {
        setText1((prevText) => prevText + fullText1[index1]); // Append next character to text1
        setIndex1((prevIndex) => prevIndex + 1); // Move to the next character
      }, 100); // 100ms delay between characters

      return () => clearTimeout(timer);
    } else if (!firstPartDone) {
      setFirstPartDone(true); // Mark the first part as done
    }
  }, [index1, firstPartDone]);

  // Effect for animating the second line of text
  useEffect(() => {
    if (firstPartDone && index2 < fullText2.length) {
      const timer = setTimeout(() => {
        setText2((prevText) => prevText + fullText2[index2]); // Append next character to text2
        setIndex2((prevIndex) => prevIndex + 1); // Move to the next character
      }, 100); // 100ms delay between characters

      return () => clearTimeout(timer);
    }
  }, [index2, firstPartDone]);

  // Effect to reset the animation after the full text is displayed
  useEffect(() => {
    if (index1 === fullText1.length && index2 === fullText2.length) {
      const resetTimer = setTimeout(() => {
        setText1(''); // Reset the first line
        setText2(''); // Reset the second line
        setIndex1(0); // Reset index for text1
        setIndex2(0); // Reset index for text2
        setFirstPartDone(false); // Reset the flag for first part completion
      }, 2000); // 2-second delay before resetting

      return () => clearTimeout(resetTimer);
    }
  }, [index1, index2]);

  return (
    <>
      {/* Conditional rendering: Show splash screen first, then the landing page */}
      {showSplash ? (
        <div className={`relative h-screen overflow-hidden bg-gray-900 ${splashExit ? 'fade-out' : 'fade-in'}`}>
          <video
            src={ShelfVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </div>
      ) : (
        <>
          {/* Main landing page section */}
          <header className="relative h-screen flex items-center justify-center text-white">
            <Navbar /> {/* Navigation bar */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: "url('./public/images/landing-img2.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Dark overlay for contrast */}
            <div className="relative z-20 text-center">
              {/* Animated text */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Kaushan Script, cursive' }}>
                {text1}
                {firstPartDone && <br />} {/* Break after first part */}
                {text2}
                <span className="animate-blink">|</span> {/* Blinking cursor effect */}
              </h1>
              {/* Subtext */}
              <p className="text-xl md:text-2xl mb-8" style={{ fontFamily: 'Tillana, cursive', fontSize: '30px' }}>
                Your library has never looked so good.
              </p>
              {/* CTA button */}
              <Link
                to="/sign-up"
                className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </header>

          {/* Video section */}
          <div className="bg-orange-200">
            <div className="relative -mt-20 z-30 flex justify-center">
              {/* Responsive video container */}
              <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <video
                  src={libraryVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Info section */}
            <div className="flex flex-col items-center text-center py-16">
              <h1 className="font-bold text-4xl mb-4" style={{ fontFamily: 'Kaushan Script, cursive', fontSize: '40px' }}>
                Create & Share Your Collection
              </h1>
              <p className="text-gray-700 text-xl pt-2.5" style={{ fontFamily: 'Tillana, cursive', fontSize: '22px' }}>
                Our library management service caters to libraries, schools, organizations, and home catalogs. Our <br /> online software lets you create multiple collections, catalog books, board games, movies, music, <br /> and video games, create tags, leave notes, import/export, share your collections and much more. <br /> We offer two different subscription options to best fit your needs. ShelfLife is the best place for <br /> cataloging and managing your media available online. Now which version is the best for you?
              </p>
            </div>
          </div>

          <Footer /> {/* Footer component */}
        </>
      )}
    </>
  );
};

export default LandingPage; // Export the component for use
