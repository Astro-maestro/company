import { useState } from "react";
import { usePostMessageMutation } from "../../redux/slices/contactSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [postMessage, { isLoading }] = usePostMessageMutation();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Await the result of the postMessage mutation
      const result = await postMessage(form);

      if (result?.data) {
        // Handle success - message posted
        toast.success("Message posted successfully!");
        console.log("Message posted successfully!", result.data);
        // Optionally reset the form
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else if (result?.error) {
        // Handle the error response
        toast.error("Error posting message!");
        console.error("Error posting message:", result.error);
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      // Catch any unexpected errors
      toast.error("Failed to post message!");
      console.error("Failed to post message:", error.message || error);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} // Start off-screen (100px below)
    animate={{ opacity: 1, y: 0 }}    // Animate to visible and its original position
    transition={{
      type: "spring", // Smooth spring animation
      stiffness: 100,
      damping: 20,
      duration: 3, // Animation duration
    }} className="flex justify-center mt-12">
      <div className="w-[85%] max-w-screen-lg">
        <div className="shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-1 p-2 block w-full focus:outline-none  border-gray-300 rounded-md shadow-sm focus:border-greenMango"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="mt-1 p-2 block w-full focus:outline-none  border-gray-300 rounded-md shadow-sm  focus:border-greenMango"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="mt-1 p-2 block w-full focus:outline-none border border-gray-300 rounded-md shadow-sm  focus:border-greenMango"
              />
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                required
                rows="4"
                className="mt-1 p-2 block w-full focus:outline-none border border-gray-300 rounded-md shadow-sm  focus:border-greenMango"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-greenMango hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-sm transition duration-200"
              >
                {isLoading ? "Posting..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
