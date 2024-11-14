import client1 from "../../assets/img/clients/client-1.png";
import client2 from "../../assets/img/clients/client-2.png";
import client3 from "../../assets/img/clients/client-3.png";
import client4 from "../../assets/img/clients/client-4.png";
import client5 from "../../assets/img/clients/client-5.png";
import client6 from "../../assets/img/clients/client-6.png";
import client7 from "../../assets/img/clients/client-7.png";
import client8 from "../../assets/img/clients/client-8.png";
import { motion } from "framer-motion";

const Company = () => {
  return (
    <section id="clients" className="py-16 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-6 md:px-12"
        data-aos="fade-up"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-semibold">COMPANYS</h2>
          <div className="flex justify-center my-4">
            <span className="w-16 h-1 rounded-xl bg-greenMango"></span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 "
        >
          {/* Each client logo */}
          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client1}
              alt="Client 1"
              className="max-w-[50%]  h-32 object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>

          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client2}
              alt="Client 2"
              className="max-w-[50%]  h-32 object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>

          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client3}
              alt="Client 3"
              className="max-w-[50%]  h-32 object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>

          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client4}
              alt="Client 4"
              className="max-w-[50%]  h-32 object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>

          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client5}
              alt="Client 5"
              className="max-w-[50%]  h-32 object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>

          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client6}
              alt="Client 6"
              className="max-w-[50%]  h-32 object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>

          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client7}
              alt="Client 7"
              className="max-w-[50%] h-32  object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>

          <div className="flex justify-center border border-gray-200 p-4">
            <img
              src={client8}
              alt="Client 8"
              className="max-w-[50%] h-32 object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-150"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Company;
