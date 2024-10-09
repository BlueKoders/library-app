import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
// import PageFlipWrapper from '../../components/PageFlipWrapper';

const LandingPage = () => {
  const [showSplash, setShowSplash] = useState(true); // State for splash screen visibility
  const [splashExit, setSplashExit] = useState(false); // State for exit animation
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const fullText1 = "Welcome to ShelfLife Cataloging!";
  const fullText2 = "Cataloging made easier...";
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [firstPartDone, setFirstPartDone] = useState(false);

  // Splash screen effect with animation
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashExit(true); // Start the exit animation
      const removeSplashTimer = setTimeout(() => {
        setShowSplash(false); // Hide splash screen after exit animation
      }, 1000); // 1 second exit animation
      return () => clearTimeout(removeSplashTimer);
    }, 5000); // 5 seconds for splash screen

    return () => clearTimeout(splashTimer); // Clean up timer
  }, []);

  useEffect(() => {
    if (index1 < fullText1.length) {
      const timer = setTimeout(() => {
        setText1((prevText) => prevText + fullText1[index1]);
        setIndex1((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timer);
    } else if (!firstPartDone) {
      setFirstPartDone(true);
    }
  }, [index1, firstPartDone]);

  useEffect(() => {
    if (firstPartDone && index2 < fullText2.length) {
      const timer = setTimeout(() => {
        setText2((prevText) => prevText + fullText2[index2]);
        setIndex2((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [index2, firstPartDone]);

  // Reset the effect to loop once both texts are completed
  useEffect(() => {
    if (index1 === fullText1.length && index2 === fullText2.length) {
      const resetTimer = setTimeout(() => {
        setText1('');
        setText2('');
        setIndex1(0);
        setIndex2(0);
        setFirstPartDone(false);
      }, 2000); // Adjust delay for how long you want to wait before restarting

      return () => clearTimeout(resetTimer);
    }
  }, [index1, index2]);

  return (
    <>
    {/* <PageFlipWrapper> */}
      {showSplash ? (
        <div
          className={`h-screen flex items-center justify-center bg-gray-900 ${
            splashExit ? 'fade-out' : 'fade-in'
          }`}
        >
          {/* Splash screen content */}
          <img
            src="./src/pages/landingPage/components/images/landing-img.png"
            alt="Splash Screen"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <>
          <header className="relative h-screen flex items-center justify-center text-white">
            {/* Background image */}
            <Navbar />
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: "url('./src/assets/images/landing-img2.jpg')" }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Content */}
            <div className="relative z-20 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {text1}
                {firstPartDone && <br />}
                {text2}
                <span className="animate-blink">|</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Your library has never looked so good.
              </p>
              <Link to="/sign-up" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                Get Started
              </Link>
            </div>
          </header>

          <div>
            <div>
              <video src=""></video>
            </div>
            <div>
              <h1>Create & Share Your Collection</h1>
              <p>
                Our library management service caters to libraries, schools, organizations, and home catalogs. Our online software lets you create multiple collections, catalog books, board games, movies, music, and video games, create tags, leave notes, import/export, share your collections, and much more. We offer two different subscription options to best fit your needs. Libib is the best place for cataloging and managing your media available online. Now, which version is the best for you?
              </p>
            </div>
          </div>

          <Footer />
          
        </>
      )}
      {/* </PageFlipWrapper> */}
    </>
  );
};

export default LandingPage;
