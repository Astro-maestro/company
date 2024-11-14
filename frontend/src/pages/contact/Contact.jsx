import { motion } from "framer-motion";
import Map from "@/components/contact/Map";
import Address from "@/components/contact/Address";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="">
      <Map />
      <section className="w-full py-12">
        {/* Animated Div */}
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start off-screen (100px below)
          animate={{ opacity: 1, y: 0 }}    // Animate to visible and its original position
          transition={{
            type: "spring", // Smooth spring animation
            stiffness: 100,
            damping: 20,
            duration: 3, // Animation duration
          }}
          className="w-full py-2 mx-auto"
        >
          <Address />
          <ContactForm />
        </motion.div>
      </section>
      <Footer/>
    </div>
  );
};

export default Contact;
