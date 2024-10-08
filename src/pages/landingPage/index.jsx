import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import libraryVideo from '/public/videos/libvideo.mp4';


const LandingPage = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const fullText1 = "Welcome to ShelfLife Cataloging!";
  const fullText2 = "Cataloging made easier...";
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [firstPartDone, setFirstPartDone] = useState(false);

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

  useEffect(() => {
    if (index1 === fullText1.length && index2 === fullText2.length) {
      const resetTimer = setTimeout(() => {
        setText1('');
        setText2('');
        setIndex1(0);
        setIndex2(0);
        setFirstPartDone(false);
      }, 2000);

      return () => clearTimeout(resetTimer);
    }
  }, [index1, index2]);

  return (
    <>
      <header className="relative h-screen flex items-center justify-center text-white">
        <Navbar />

        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('./src/assets/images/library2.jpg')" }}
        ></div>

        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

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
      <div className='bg-orange-200'>
        <div className="relative -mt-20 z-30 flex justify-center">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <video src={libraryVideo} className="w-full h-full object-cover" autoPlay muted loop playsInline >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div class="flex flex-col items-center text-center py-16">
          <h1 class="font-bold text-4xl mb-4">Create & Share Your Collection</h1>
          <p class="text-gray-700 text-xl pt-2.5">
            Our library management service caters to libraries, schools, organizations, and home catalogs. Our <br /> online software lets you create multiple collections, catalog books, board games, movies, music, <br /> and video games, create tags, leave notes, import/export, share your collections and much more. <br /> We offer two different subscription options to best fit your needs. Libib is the best place for <br /> cataloging and managing your media available online. Now which version is the best for you?
          </p>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default LandingPage;