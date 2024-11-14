import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSkype } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Footer Top */}
      <div className="bg-shadowBlaze py-16 mx-auto">
        <div className=" px-4 mx-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Contact Section */}
            <div className="text-left ">
              <h3 className="text-lg font-semibold uppercase mb-4">Company</h3>
              <p className="text-sm text-gray-400">
                A108 Adam Street <br />
                New York, NY 535022<br />
                United States <br />
                <div className="mt-4 text-gray-400">
                <strong>Phone:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> info@example.com<br />
                </div>
              </p>
            </div>

            {/* Useful Links Section */}
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
              <ul className="space-y-2">
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Home</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">About us</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Services</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Terms of service</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Privacy policy</a></div></li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
              <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Web Design</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Web Development</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Product Management</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Marketing</a></div></li>
                <li><div className="flex items-center"><IoIosArrowForward className="text-greenMango "/> <a href="#" className="text-gray-400 hover:text-white">Graphic Design</a></div></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">Join Our Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Tamen quem nulla quae legam multos aute sint culpa legam noster magna.</p>
              <form className="relative">
                <input type="email" className="w-full p-2 pr-12 rounded-md focus:outline-none focus:border-none focus:ring-greenMango text-black" placeholder="Your Email" />
                <button type="submit" className="absolute inset-y-0 right-0 top-0 bg-greenMango text-white p-2 rounded-r-md hover:bg-greenMango">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" mx-28 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left text-sm">
          &copy; 2023 <strong>Company</strong>. All Rights Reserved.
          <p>Designed by <a href="https://bootstrapmade.com/" className="hover:underline text-greenMango">BootstrapMade</a></p>
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-white bg-shadowBlaze p-2 rounded hover:bg-greenMango"><FaTwitter/></a>
          <a href="#" className="text-white bg-shadowBlaze p-2 rounded hover:bg-greenMango"><FaFacebookF/></a>
          <a href="#" className="text-white bg-shadowBlaze p-2 rounded hover:bg-greenMango"><FaInstagram/></a>
          <a href="#" className="text-white bg-shadowBlaze p-2 rounded hover:bg-greenMango"><FaSkype/></a>
          <a href="#" className="text-white bg-shadowBlaze p-2 rounded hover:bg-greenMango"><FaLinkedinIn/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
