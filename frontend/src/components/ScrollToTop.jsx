import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion"; // Import framer-motion

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 200px
  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page when clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  useEffect(() => {
    // Add event listener on scroll
    window.addEventListener("scroll", toggleVisibility);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      <motion.button
        onClick={scrollToTop}
        className="fixed w-10 h-10 flex items-center justify-center rounded-sm right-4 bottom-4 bg-greenMango text-white z-[99999]"
        initial={{ opacity: 0 }} // Start with the button invisible
        animate={{ opacity: isVisible ? 1 : 0 }} // Animate opacity based on visibility
        transition={{
          opacity: { duration: 0.5, ease: "easeInOut" }, // Smooth fade effect
        }}
      >
        <IoIosArrowUp className="text-2xl font-bold" />
      </motion.button>
    </div>
  );
};

export default ScrollToTop;
