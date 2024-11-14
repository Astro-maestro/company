import { IoSearchOutline } from "react-icons/io5";
import { useGetBlogsQuery } from "../../redux/slices/blogSlice";
import {motion} from 'framer-motion';
import { NavLink } from "react-router-dom";

const BlogSidebar = ({ setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);  // Update search term in parent (Blog)
  };
  
  const { data = {}, isLoading, isError } = useGetBlogsQuery();
  const blogs = data?.blogs || [];
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error loading Blogs</div>;
  const recentPosts = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  return (
    <motion.div  initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }} className="w-[80%] h-auto p-4 md:p-8 space-y-4 mt-4 shadow-lg flex flex-col justify-start items-start">
      {/* Search Section */}
      <h1 className="font-bold text-xl">Search</h1>
      <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="w-full p-2 rounded-md focus:outline-none focus:border-none focus:ring-greenMango text-black border-2 border-gray-200"
          placeholder="Search here..."
          onChange={handleSearch}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 top-0 bg-greenMango text-white p-3 rounded-r-md hover:bg-greenMango"
        >
          <IoSearchOutline />
        </button>
      </form>

      {/* Categories Section */}
      <h1 className="font-bold text-xl pt-3">Categories</h1>
      <ul className="text-left space-y-2">
        <li className="hover:text-greenMango">General<span className="text-gray-500"> (25)</span></li>
        <li className="hover:text-greenMango">LifeStyle<span className="text-gray-500"> (12)</span></li>
        <li className="hover:text-greenMango">Travel<span className="text-gray-500"> (5)</span></li>
        <li className="hover:text-greenMango">Design<span className="text-gray-500"> (22)</span></li>
        <li className="hover:text-greenMango">Creative<span className="text-gray-500"> (8)</span></li>
        <li className="hover:text-greenMango">Education<span className="text-gray-500"> (14)</span></li>
      </ul>

      {/* Recent Posts Section */}
      <h1 className="font-bold text-xl pt-3">Recent Posts</h1>

      {isLoading && <p>Loading recent posts...</p>}
      {isError && <p>Error loading recent posts.</p>}

      {!isLoading &&
        !isError &&
        recentPosts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col sm:flex-row mb-4 items-center"
          >
            <div className="mr-4 w-20 h-20 flex-shrink-0 items-center">
              <img
                src={`${import.meta.env.VITE_BACKEND_BASE_URL}${post.image}`}
                alt={post.title}
                className="w-20 h-20 object-cover"
              />
            </div>
            <div className="flex flex-col space-y-1 text-center sm:text-left justify-start">
              <NavLink to={`/blogs/${post._id}`}>
                <h1 className="font-semibold hover:text-greenMango text-sm sm:text-base">
                  {post.title}
                </h1>
              </NavLink>
              <p className="text-gray-500 italic text-xs sm:text-sm">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
    </motion.div>
  );
};

export default BlogSidebar;
