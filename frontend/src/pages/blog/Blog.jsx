import { useState } from "react";
import BlogSidebar from "@/components/blog/BlogSidedar";
import Footer from "@/components/Footer";
import BlogContent from "@/components/blog/BlogContent";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");  // State to manage search term

  return (
    <div className="">
      <div className="w-full h-auto mt-4 mb-16 md:mx-4 flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
        {/* Pass setSearchTerm to BlogSidebar, and searchTerm to BlogContent */}
        <div className="w-full md:w-2/3 mt-4 pt-2 px-4">
          <BlogContent searchTerm={searchTerm} />
        </div>
        <div className="w-full md:w-1/3 ">
          <BlogSidebar setSearchTerm={setSearchTerm} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
