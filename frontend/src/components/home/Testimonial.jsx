import { motion } from "framer-motion";
import { useGetTestimonialsQuery } from "../../redux/slices/homeSlice";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const Testimonial = () => {
  const { data, isLoading, isError } = useGetTestimonialsQuery();

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading testimonials data.</p>;

  const testimonialContent = data?.testimonials || [];
  console.log(testimonialContent);

  return (
    <section id="testimonial" className="py-16 bg-gray-100 overflow-hidden">
      <div className="mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-semibold">TESTIMONIALS</h2>
          <div className="flex justify-center my-4">
            <span className="w-16 h-1 rounded-xl bg-greenMango"></span>
          </div>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Laborum repudiandae omnis voluptatum consequatur mollitia ea est voluptas ut
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 ">
          {testimonialContent.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }} // initial position (slightly below)
              animate={{ opacity: 1, y: 0 }} // end position (normal)
              transition={{
                delay: 0.2 * index, // stagger based on index
                duration: 0.8,
                ease: "easeOut",
              }}
              className="bg-white shadow-md p-6 flex flex-col items-start text-center justify-start"
            >
              <div className="flex space-x-4">
              <div className="relative w-24 h-24 mb-4">
                <img
                  src={`${import.meta.env.VITE_BACKEND_BASE_URL}${service.image}`}
                  alt={service.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="block text-left">
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <h4 className="text-gray-500 mb-4 font-semibold">{service.position}</h4>
              </div>
              </div>
              <div className="relative mb-4">
                <p className="text-gray-600 italic text-left">
                  <RiDoubleQuotesL className="inline text-4xl text-gray-300" />
                  {service.comment}
                  <RiDoubleQuotesR className="inline text-4xl text-gray-300" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
