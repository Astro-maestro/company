import { Carousel } from "flowbite-react";
import { useGetBannersQuery } from "../../redux/slices/homeSlice";
import { motion } from "framer-motion"; 

const Caraousel = () => {
  const { data, isLoading, isError } = useGetBannersQuery();

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading banner data.</p>;

  const bannerContent = data?.banners || [];
  


  return (
    <div className="h-[42rem]">
      <Carousel slide={false} className="rounded-none">
        {bannerContent.map((banner) => (
          <div key={banner._id} className="relative w-full h-full">
            <img
              src={`${import.meta.env.VITE_BACKEND_BASE_URL}${banner.image}`}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay with title and subtitle */}
            <motion.div initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }} className="absolute inset-0 flex justify-center items-end pb-16 space-y-4">
              <div className="bg-black bg-opacity-70 text-white p-4 text-center max-w-2xl mx-auto relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-greenMango"></div>
                <h2 className="text-xl md:text-2xl font-bold text-left mt-4">{banner.title}</h2>
                <p className=" text-left font-semibold text-lg md:text-base mt-4">{banner.subtitle}</p>
                <button className="mt-4 px-4 py-2 font-semibold  border-2 border-greenMango hover:bg-greenMango rounded-md">Read More</button>
              </div>
            </motion.div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Caraousel;
