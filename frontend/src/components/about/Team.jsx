import {
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useGetTeamsQuery } from "@/redux/slices/aboutSlice";
import { motion } from "framer-motion";

const Team = () => {
  const { data = {}, isLoading, isError } = useGetTeamsQuery();
  const teams = data.teams || [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error loading FAQs</div>;

  // Animation variants for the cards
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2, // Adjust delay to control speed of sequence
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="team" className="py-16 bg-gray-100 overflow-hidden">
      <div className="mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-semibold text-center">OUR TEAM</h2>
          <div className="flex justify-center my-4">
            <span className="w-16 h-1 rounded-xl bg-greenMango"></span>
          </div>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
            aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
            quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center -mx-4"
        >
          {teams.map((member, index) => (
            <motion.div
              key={member._id}
              custom={index} // Pass index to control stagger delay
              variants={cardVariant}
              className="w-full sm:w-1/2 md:w-1/5 px-4 mb-8"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative group">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_BASE_URL}${member.image}`}
                    alt={member.name}
                    className="w-full object-fit h-56"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-12 flex justify-center items-center bg-white bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="text-black text-lg hover:text-greenMango"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href="#"
                        className="text-black text-lg hover:text-greenMango"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href="#"
                        className="text-black text-lg hover:text-greenMango"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href="#"
                        className="text-black text-lg hover:text-greenMango"
                      >
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-gray-500">{member.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
