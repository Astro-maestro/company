import { motion } from "framer-motion";
import { useGetAboutQuery } from "../../redux/slices/aboutSlice";
import { RiCheckDoubleFill } from "react-icons/ri";

const AboutUs = () => {
  const { data, isLoading, isError } = useGetAboutQuery();

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading about section data.</p>;

  // Check if `abouts` array exists and has at least one item
  const aboutContent = data?.abouts?.[0] || {};

  // Destructure the fields from `aboutContent`
  const { title, subtitle, details } = aboutContent;
  console.log(aboutContent);

  const formattedDetails = details
    ?.split(":")
    .filter((segment) => segment.trim());

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, x: -50, y: 50 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, x: 50, y: 50 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <section id="about-us" className="py-16 overflow-hidden">
      <div className="mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-semibold text-center">ABOUT US</h2>
          <div className="flex justify-center my-4">
            <span className="w-16 h-1 rounded-xl bg-greenMango"></span>
          </div>
          <section id="about-us" className="py-8 bg-white px-2">
            <div className="mx-8 md:mx-32 px-4">
              <div className="flex flex-col md:flex-row items-start md:items-start text-gray-700">
                {/* Title and Subtitle Section */}
                <motion.div
                  className="md:w-1/2 mb-6 md:mb-0"
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                >
                  <h2 className="text-2xl md:text-5xl font-bold mb-2 text-left uppercase">
                    {title}
                  </h2>
                  <h3 className="text-lg md:text-xl font-semibold text-left">
                    {subtitle}
                  </h3>
                </motion.div>

                {/* Details Section */}
                <motion.div
                  className="md:w-1/2 mt-4 md:mt-0 text-left"
                  initial="hidden"
                  animate="visible"
                  variants={detailsVariants}
                >
                  <div className="mt-4 md:mt-0 text-left space-y-4">
                    {formattedDetails?.map((paragraph, index) => (
                      <div
                        key={index}
                        className="leading-relaxed mb-2 flex items-center"
                      >
                        {index !== 0 &&
                          index !== formattedDetails.length - 1 && (
                            <div>
                              <RiCheckDoubleFill className="text-greenMango text-xl mx-2" />
                            </div>
                          )}
                        <p
                          className={`px-2 ${
                            paragraph.includes("%") ? "italic" : ""
                          }`}
                        >
                          {paragraph.replace("%", "")}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
