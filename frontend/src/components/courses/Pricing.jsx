// src/components/Pricing.js

import { useGetCoursesQuery } from "../../redux/slices/courseSlice";
import { Button } from "@/components/ui/button"; // Shadcn button component
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";


const Pricing = () => {
  const { data = {}, isLoading, isError } = useGetCoursesQuery();
  const courses = data.courses || [];

  if (isLoading) return <p>loading...</p>; // Render a loader if data is loading
  if (isError) return <div>Error loading courses</div>; // Error handling
  console.log(courses);

  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start off-screen (100px below)
          animate={{ opacity: 1, y: 0 }} // Animate to visible and its original position
          transition={{
            type: "spring", // Smooth spring animation
            stiffness: 100,
            damping: 20,
            duration: 3, // Animation duration
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12"
        >
          {courses.map((course) => (
            <div
              key={course._id}
              className={`relative overflow-hidden rounded-lg shadow-lg bg-white `}
            >
              <div
                className={`${
                  course.isGreen ? "bg-greenMango" : "bg-gray-100"
                } p-4 rounded-t-lg text-center`}
              >
                {/* Advanced ribbon */}
                {course.isAdvanced && (
                  <span className="absolute  top-4 right-[-30px] transform rotate-45 text-sm py-1 w-32 z-10 bg-greenMango text-white">
                    Advanced
                  </span>
                )}

                <h3
                  className={`text-xl font-semibold text-center ${
                    course.isGreen ? "text-white" : "text-gray-500"
                  }`}
                >
                  {course.name}
                </h3>
              </div>
              <h4 className="text-4xl font-bold text-center my-6">
                <span className="text-greenMango">
                  <sup className="text-lg">$</sup>
                  {course.price}
                </span>{" "}
                <span className="text-sm font-thin text-gray-400">/ month</span>
              </h4>
              <ul className="text-gray-700 mb-6 list-none">
                {course.details.split(",").map((detail, index) => {
                  const shouldStrikeThroughFree =
                    (detail.trim() === "Pharetra massa" ||
                      detail.trim() === "Massa ultricies mi") &&
                    course.isFree;

                  const shouldStrikeThroughGreen =
                    detail.trim() === "Massa ultricies mi" && course.isGreen;

                  const isStrikethrough =
                    shouldStrikeThroughFree || shouldStrikeThroughGreen;

                  return (
                    <li key={index}>
                      {isStrikethrough ? (
                        <span className="text-gray-400 line-through">
                          {detail.trim()}
                        </span>
                      ) : (
                        detail.trim()
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="text-center bg-gray-100 p-6 rounded-b-lg ">
                <NavLink to="/course/apply">
                <Button
                  className={`w-full ${
                    course.isGreen ? "bg-greenMango" : "bg-greenMango"
                  } hover:bg-green-500`}
                >
                  {course.isFree ? "Apply Course" : "Buy Now"}
                </Button>
                </NavLink>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
