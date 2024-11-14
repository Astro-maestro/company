import { motion } from "framer-motion";
import { useGetServicesQuery } from "../../redux/slices/homeSlice";

const Service = () => {
  const { data, isLoading, isError } = useGetServicesQuery();


  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading services data.</p>;

 

  const serviceContent = data?.services || [];
  console.log(serviceContent);

  return (
    <section id="service" className="py-16 bg-gray-100 overflow-hidden">
      <div className="mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x:20, y: 20 }}
          animate={{ opacity: 1, x:0, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-semibold">SERVICES</h2>
          <div className="flex justify-center my-4">
            <span className="w-16 h-1 rounded-xl bg-greenMango"></span>
          </div>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Laborum repudiandae omnis voluptatum consequatur mollitia ea est
            voluptas ut
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {serviceContent.map((service, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }} // Initial scale set to 0 (shrunk)
              animate={{ scale: 1 }} // Animate to original size
              transition={{ duration: 0.6, ease: "easeOut" }}
              className=" bg-white shadow-md p-6 flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 mb-4">
                {/* Base Image (image1) */}
                <img
                  src={`${import.meta.env.VITE_BACKEND_BASE_URL}${
                    service.image1
                  }`}
                  alt=""
                  className={`w-full h-full object-cover rounded-lg transition-colors duration-300 ${service.hover_color}`}
                />
                {/* Overlay Image (image2), centered over image1 */}
                
                <img
                  src={`${import.meta.env.VITE_BACKEND_BASE_URL}${
                    service.image2
                  }`}
                  alt=""
                  className={`absolute inset-0 m-auto w-12 h-12 object-cover rounded-full transition-colors duration-300 `}
                  style={{
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                  }}
                />
                {/* Hover effect */}
                <div
                  className={`absolute inset-0  opacity-0 rounded-lg transition-opacity duration-300 hover:opacity-100 flex items-center justify-center`}
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_BASE_URL}${
                      service.image2
                    }`}
                    alt=""
                    className="w-12 h-12 object-cover rounded-full"
                    /* style={{ filter: "brightness(0) invert(1)" }} */
                  />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
              <p className="text-gray-600">{service.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
