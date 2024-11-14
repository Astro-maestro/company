import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../redux/slices/blogSlice";
import { motion } from "framer-motion";
import { GoPersonFill } from "react-icons/go";
import { GoClock } from "react-icons/go";
import { LiaCommentSolid } from "react-icons/lia";
import BlogComments from "./BlogComments";

const BlogDetails = () => {
  const { blogId } = useParams(); // Get the blog ID from the URL
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(blogId); // Fetch blog details by ID

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error loading blog details</div>;
  console.log(blog);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="w-full  mx-auto p-8 "
    >
      <div className="shadow-lg mb-4">
      <div className="p-8 ">
        <img
          src={`${import.meta.env.VITE_BACKEND_BASE_URL}${blog?.blog?.image}`}
          alt=""
          placeholder=""
          className="w-full"
        />
      </div>
      <div className="p-8 space-y-4">
        <h1 className="font-bold text-2xl text-left ">{blog?.blog?.title}</h1>
        <div className="flex space-x-4 text-gray-500">
          <div className="flex">
            <p className="flex items-center space-x-1">
              <GoPersonFill />
              <span>{blog?.blog?.author}</span>
            </p>
          </div>
          <div className="flex">
            <p className="flex items-center space-x-1">
              <GoClock />
              <span>
                {new Date(blog?.blog?.createdAt).toLocaleDateString("en-US", {
                  month: "short", // Display the abbreviated month (e.g., "Jan")
                  day: "numeric", // Display the day as a number (e.g., "1")
                  year: "numeric", // Display the year as a number (e.g., "2020")
                })}
              </span>
            </p>
          </div>
          <div className="flex">
            <p className="flex items-center space-x-1">
              <LiaCommentSolid />
              <span>12 comments</span>
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-left text-wrap">
          {blog?.blog?.content}
        </p>
      </div>
      </div>
      <div className=" mb-4 p-8 text-left justify-start">
        <BlogComments/>
      </div>
    </motion.div>
  );
};

export default BlogDetails;
