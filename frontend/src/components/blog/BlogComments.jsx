import { usePostReplyMutation } from "../../redux/slices/blogSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
const BlogComments = () => {
  const [replyForm, setReplyForm] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
  });
  const [postReply, { isLoading }] = usePostReplyMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReplyForm({ ...replyForm, [name]: value });
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const replyData = {
        ...replyForm
      };
      const result = await postReply(replyData);

      if (result?.data) {
        toast.success('Reply posted successfully!');
        setReplyForm({
          name: '',
          email: '',
          website: '',
          comment: '',
        });
      } else if (result?.error) {
        toast.error('Failed to post reply.');
      }
    } catch (error) {
      console.error("Failed to submit Comment:", error.message || error);
      toast.error('An unexpected error occurred.');
    }
  };


  return (
    <motion.div  initial={{ opacity: 0, y: 30 }} // Start off-screen (100px below)
    animate={{ opacity: 1, y: 0 }} // Animate to visible and its original position
    transition={{
      type: "spring", // Smooth spring animation
      stiffness: 100,
      damping: 20,
      duration: 3, // Animation duration
    }} className="blog-comments">
      <h4 className="text-2xl font-bold mb-4">Comments</h4>

      <div id="comment-1" className="comment mb-6 p-4">
        <h5 className="text-lg font-semibold">
          <a href="#" className="hover:text-greenMango">
            Georgia Reader
          </a>
        </h5>
        <time className="text-sm text-gray-500" dateTime="2020-01-01">
          01 Jan, 2020
        </time>
        <p className="text-gray-500 mt-2 text-wrap">
          Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et.
          Est ad aut sapiente quis molestiae est qui cum soluta. Vero aut rerum
          vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
        </p>
      </div>

      <div className=" shadow-lg p-4 mt-8">
        <h4 className="text-2xl font-bold mb-2">Leave a Reply</h4>
        <p className="text-gray-600 mb-4">
          Your email address will not be published. Required fields are marked *
        </p>
        <form onSubmit={handleReplySubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              name="name"
              type="text"
              value={replyForm.name}
              onChange={handleInputChange}
              className="form-input p-3 border rounded-sm w-full focus:outline-none focus:border-blue-500"
              placeholder="Your Name*"
            />
            <input
              name="email"
              type="text"
              value={replyForm.email}
              onChange={handleInputChange}
              className="form-input p-3 border rounded-sm w-full focus:outline-none focus:border-blue-500"
              placeholder="Your Email*"
            />
          </div>
          <div className="mb-4">
            <input
              name="website"
              type="text"
              value={replyForm.website}
              onChange={handleInputChange}
              className="form-input p-3 border rounded-sm w-full focus:outline-none focus:border-blue-500"
              placeholder="Your Website"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="comment"
              value={replyForm.comment}
              onChange={handleInputChange}
              className="form-textarea p-3 border rounded-sm w-full focus:outline-none focus:border-blue-500"
              placeholder="Your Comment*"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-greenMango text-md mb-4 text-white py-2 px-4 rounded-sm hover:bg-green-500 transition duration-300"
          >
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default BlogComments;
