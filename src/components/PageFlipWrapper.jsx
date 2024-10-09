// components/PageFlipWrapper.js
import React from 'react';
import { motion } from 'framer-motion';

const pageFlipVariants = {
  initial: {
    rotateY: -90, // Start flipped 90 degrees (like turning the page)
    opacity: 0,
  },
  enter: {
    rotateY: 0, // Rotate back to normal (0 degrees)
    opacity: 1,
    transition: {
      duration: 0.8, // Adjust for smoothness
      ease: "easeInOut",
    },
  },
  exit: {
    rotateY: 90, // Rotate forward for the next page
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const PageFlipWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageFlipVariants}
      style={{ perspective: "1000px" }} // Apply perspective to create 3D effect
    >
      {children}
    </motion.div>
  );
};

export default PageFlipWrapper;
