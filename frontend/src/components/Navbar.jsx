import { useState } from "react";
import { NavLink, Outlet, useNavigate  } from "react-router-dom";
import { FaFacebookF, FaLinkedin, FaInstagram, FaTwitter, FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import Breadcrumbs from "./Breadcrumbs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); // Initialize the dispatch function
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

   // Handle logout function
   const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(result)) {
        toast.success("Logged out successfully!"); // Success message
        navigate("/login"); // Navigate to login
      } else {
        // Handle unsuccessful logout attempt
        throw new Error(result.payload.message || "Logout failed.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Error logging out: " + (error.message || "Please try again."));
    }
  };
  

  return (
    <div>
      <header className=" h-20 py-3 px-5 flex mx-auto items-center justify-between sticky top-0 shadow-md z-50 bg-white">
        <h1 className="flex mr-auto text-3xl font-bold text-center">
          <NavLink to="/"><span className="text-greenMango">COM</span>PANY</NavLink>
        </h1>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex gap-4 items-center font-bold text-sm">
          <NavLink to="/" className="px-2 hover:text-greenMango">HOME</NavLink>
          <NavLink to="/about" className="px-2 hover:text-greenMango">ABOUT</NavLink>
          <NavLink to="/courses" className="px-2 hover:text-greenMango">COURSES</NavLink>
          <NavLink to="/blog" className="px-2 hover:text-greenMango">BLOG</NavLink>
          <NavLink to="/contact" className="px-2 hover:text-greenMango">CONTACT</NavLink>
          {isLoggedIn ? "" : <NavLink to="/contact" className="px-2 hover:text-greenMango">LOGIN</NavLink>}
        </nav>

        <div className="px-4 items-center xs:flex text-center text-slate-500 hidden"> | </div>

        {/* Social Icons (visible on all screen sizes) */}
        <div className="hidden xs:flex items-center gap-4 text-slate-500">
          <span className="hover:text-greenMango"><FaFacebookF /></span>
          <span className="hover:text-greenMango"><FaTwitter /></span>
          <span className="hover:text-greenMango"><FaInstagram /></span>
          <span className="hover:text-greenMango"><FaLinkedin /></span>
        </div>

        {isLoggedIn ? (
          <div className="px-2 hidden sm:flex items-center gap-4 text-slate-800">
            <div>
              <p>Welcome, {user?.name?.split(" ")[0]}</p>
            </div>
          </div>
        ) : null}

        {/* Sign-in Button (visible on larger screens) */}
        <div className="hidden lg:flex items-center gap-4 px-4">
        {isLoggedIn ? (
              <Button className="hover:bg-greenMango" onClick={handleLogout}>Sign Out</Button>
          ) : (
            <NavLink to="/login">
              <Button className="hover:bg-greenMango">Sign In</Button>
            </NavLink>
          )}
        </div>

        {/* Hamburger Menu Icon (visible on smaller screens) */}
        <div className="lg:hidden px-4">
          <button onClick={toggleMenu} className="text-3xl text-greenMango focus:outline-none">
            <FaBars />
          </button>
        </div>
      </header>

      {/* Mobile Menu Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white rounded-lg">
          <DialogHeader>
            {isLoggedIn ? (<DialogTitle>Welcome,{" "}{user?.name}</DialogTitle>) : (<DialogTitle>Navigation</DialogTitle>)}
            <DialogClose onClick={toggleMenu} className="text-greenMango" />
          </DialogHeader>
          <nav className="flex flex-col items-center gap-4 py-4 font-bold text-sm">
            <NavLink to="/" className="hover:text-greenMango" onClick={toggleMenu}>HOME</NavLink>
            <NavLink to="/about" className="hover:text-greenMango" onClick={toggleMenu}>ABOUT</NavLink>
            <NavLink to="/courses" className="hover:text-greenMango" onClick={toggleMenu}>COURSES</NavLink>
            <NavLink to="/blog" className="hover:text-greenMango" onClick={toggleMenu}>BLOG</NavLink>
            <NavLink to="/contact" className="hover:text-greenMango" onClick={toggleMenu}>CONTACT</NavLink>
            <NavLink to="/contact" className="hover:text-greenMango" onClick={toggleMenu}>LOGIN</NavLink>
            {isLoggedIn ? (<NavLink to={`/update-password/${user?._id}`} className="hover:text-greenMango" onClick={toggleMenu}>UPDATE PASSWORD</NavLink>) : null}
            {isLoggedIn ? (
              <Button className="hover:bg-greenMango" onClick={handleLogout}>Sign Out</Button>
          ) : (
            <NavLink to="/login">
              <Button className="hover:bg-greenMango">Sign In</Button>
            </NavLink>
          )}
          </nav>
        </DialogContent>
      </Dialog>
      
      <Breadcrumbs />

      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
