import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

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
    <header className="relative h-screen flex items-center justify-center text-white">
      {/* Background image */}
      <Navbar />
     
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{backgroundImage: "url('./src/assets/images/library2.jpg')"}}
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
          Your library has never looked so good
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default LandingPage;
