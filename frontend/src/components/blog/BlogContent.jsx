import { useState } from "react";
import { useGetBlogsQuery } from "../../redux/slices/blogSlice";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import BlogPagination from "./BlogPagination"; // Assuming pagination exists

const BlogContent = ({ searchTerm }) => {
  const { data = {}, isLoading, isError } = useGetBlogsQuery();
  const blogs = data?.blogs || [];

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error loading Blogs</div>;

  return (
    <div className="w-full flex flex-col justify-center ">
      {/* Render only the filtered blogs */}
      {currentBlogs.map((blog) => (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 3,
          }}
          key={blog._id}
          className="w-full md:w-[80%] mb-12 h-auto space-y-4 shadow-lg flex flex-col justify-center md:ml-36 text-left"
        >
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_BASE_URL}${blog.image}`}
              alt={blog.title}
            />
            <div className="p-8 space-y-4">
              <h1 className="font-bold text-2xl">{blog.title}</h1>
              <div className="flex space-x-4 text-gray-500">
                <div className="flex items-center">
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <span>12 comments</span>
                </div>
              </div>
              <p className="text-gray-500">{blog.content.slice(0, 100)}...</p>
              <div className="pt-4 flex justify-end">
                <NavLink to={`/blogs/${blog._id}`}>
                  <button className="px-6 py-2 bg-greenMango hover:bg-greenTeal text-white rounded-sm">
                    Read More
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Render Pagination Component */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 3,
        }}
        className="my-4"
      >
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </motion.div>
    </div>
  );
};

export default BlogContent;
