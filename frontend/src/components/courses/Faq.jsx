import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io"; // Import the arrow icon
import { useGetFaqsQuery } from "../../redux/slices/courseSlice";
import { motion, AnimatePresence } from "framer-motion"; // Import framer motion
import { FaRegQuestionCircle } from "react-icons/fa";

const Faq = () => {
  // Initialize openFAQ to 0 to have the first item open by default
  const [openFAQ, setOpenFAQ] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const { data = {}, isLoading, isError } = useGetFaqsQuery();
  const faqs = data?.faqs || [];

  if (isLoading) return <p>Loading...</p>; // Render a loader if data is loading
  if (isError) return <div>Error loading FAQs</div>; // Error handling

  return (
    <section id="faq" className="py-16 bg-gray-100 overflow-hidden">
      <div className="mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="relative text-3xl font-semibold text-center">
            FREQUENTLY ASKED QUESTIONS
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-16px] w-16 rounded-xl h-1 bg-greenMango"></span>
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="space-y-4 my-12 pt-6 px-12 md:px-24 lg:px-48"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between hover:text-greenMango items-center w-full px-4 py-3 bg-white text-left text-lg font-medium text-gray-900 transition"
              >
                <span
                  className={`${
                    openFAQ === index ? "text-greenMango" : ""
                  } hover:text-green-500 flex text-center gap-2 justify-center items-center`}
                >
                  <span className="text-gray-300">
                    <FaRegQuestionCircle />
                  </span>
                  {faq.question}
                </span>
                <IoIosArrowDown
                  className={`transform transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180 text-greenMango" : ""
                  }`}
                  size={20} // Adjust size as needed
                />
              </button>

              {/* Animated answer section */}
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden px-4 py-3 text-left text-gray-700 bg-white"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
