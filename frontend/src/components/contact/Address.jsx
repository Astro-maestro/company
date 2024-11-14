import { IoLocationSharp } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { useGetContactsQuery } from '../../redux/slices/contactSlice';
import { motion } from 'framer-motion';

const Address = () => {
  const { data: contacts, error, isLoading } = useGetContactsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts!</p>;
  console.log(contacts);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} // Start off-screen (100px below)
    animate={{ opacity: 1, y: 0 }}    // Animate to visible and its original position
    transition={{
      type: "spring", // Smooth spring animation
      stiffness: 100,
      damping: 20,
      duration: 3, // Animation duration
    }} className="flex justify-center">
      <div className="w-[85%] max-w-screen-lg">
        <div className="shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Location Info */}
            <div className=" flex  gap-3">
              <div className="rounded-full px-3 text-greenMango hover:text-white hidden border-2 border-greenMango w-10 h-10 xs:flex items-center justify-center transition-colors duration-300 hover:bg-greenMango">
                <IoLocationSharp/>
              </div>
              <div className="text-wrap text-left ">
                <h4 className="text-lg font-semibold ">Location:</h4>
                <p className="text-gray-600">
                  {contacts[0]?.location}
                </p>
              </div>
            </div>

            {/* Email Info */}
            <div className=" flex  gap-3">
              <div className="rounded-full px-3 text-greenMango hover:text-white hidden border-2 border-greenMango w-10 h-10 xs:flex items-center justify-center transition-colors duration-300 hover:bg-greenMango">
                <FaEnvelope/>
              </div>
              <div className="text-wrap text-left ">
                <h4 className="text-lg font-semibold items-center">Email:</h4>
                <p className="text-gray-600">
                {contacts[0]?.emails[0]}
                  <br />
                  {contacts[0]?.emails[1]}
                </p>
              </div>
            </div>

            {/* Phone Info */}
            <div className="flex  gap-3">
              <div className="rounded-full px-3 text-greenMango hover:text-white hidden xs:flex border-2 border-greenMango w-10 h-10  items-center justify-center transition-colors duration-300 hover:bg-greenMango">
                <IoCallSharp/>
              </div>
              <div className="text-wrap text-left ">
                <h4 className="text-lg font-semibold ">Call:</h4>
                <p className="text-gray-600">
                  {contacts[0]?.calls[0]}
                  <br />
                  {contacts[0]?.calls[1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Address;
