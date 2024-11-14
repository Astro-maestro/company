import { useState } from "react";
import { usePostApplicationMutation } from "../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ApplyCourse = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    course: "",
    query: "",
  });
  const [postApplication, { isLoading }] = usePostApplicationMutation();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data object
      const applicationData = {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address: form.address,
        course: form.course,
        query: [form.query], // Assuming `query` is an array
      };

      // Await the result of the postApplication mutation
      const result = await postApplication(applicationData);

      if (result?.data) {
        // Handle success - application posted
        toast.success("Application submitted successfully!");
        console.log("Application submitted successfully!", result.data);
        // Optionally reset the form
        setForm({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          course: "",
          query: "",
        });
      } else if (result?.error) {
        // Handle the error response
        toast.error("Error submitting application!");
        console.error("Error submitting application:", result.error);
        setForm({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          course: "",
          query: "",
        });
      }
    } catch (error) {
      // Catch any unexpected errors
      toast.error("Failed to submit application!");
      console.error("Failed to submit application:", error.message || error);
      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        course: "",
        query: "",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Start off-screen (100px below)
      animate={{ opacity: 1, y: 0 }} // Animate to visible and its original position
      transition={{
        type: "spring", // Smooth spring animation
        stiffness: 100,
        damping: 20,
        duration: 3, // Animation duration
      }}
      className="flex justify-center mt-12"
    >
      <div className="w-[85%] max-w-screen-lg">
        <div className="shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name, Email, PhoneNumber Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-1 p-2 focus:border-none focus:ring-greenMango block w-full focus:outline-none border-gray-300 rounded-md shadow-sm focus:border-greenMango"
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
                  className="mt-1 p-2 block w-full focus:border-none focus:ring-greenMango focus:outline-none border-gray-300 rounded-md shadow-sm focus:border-greenMango"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                  className="mt-1 p-2 block w-full focus:border-none focus:ring-greenMango focus:outline-none border-gray-300 rounded-md shadow-sm focus:border-greenMango"
                />
              </div>
            </div>

            {/* Address and Course Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  required
                  className="mt-1 p-2 focus:border-none focus:ring-greenMango block w-full focus:outline-none border-gray-300 rounded-md shadow-sm focus:border-greenMango"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Course you are applying for"
                  required
                  className="mt-1 p-2 block w-full focus:border-none focus:ring-greenMango focus:outline-none border-gray-300 rounded-md shadow-sm focus:border-greenMango"
                />
              </div>
            </div>

            {/* Query Field */}
            <div>
              <textarea
                name="query"
                value={form.query}
                onChange={handleChange}
                placeholder="Any questions or queries?"
                required
                rows="4"
                className="mt-1 p-2 block w-full focus:border-none focus:ring-greenMango focus:outline-none border border-gray-300 rounded-md shadow-sm focus:border-greenMango"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-greenMango hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-sm transition duration-200"
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplyCourse;
