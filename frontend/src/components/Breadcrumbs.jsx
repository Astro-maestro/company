import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation(); // Get the current location
  
  const pathParts = location.pathname.split('/').filter(Boolean); // Split the pathname and filter out empty parts
  const currentPage = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'Home'; // Get the last part of the path
  const capitalizedPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize the first letter

  // Define valid routes
  const validRoutes = ['home', 'about', 'courses', 'blog', 'contact']; // Add more valid routes as needed

  // Hide breadcrumbs for specific routes
  if (
    location.pathname === '/' || 
    currentPage === 'login' || 
    currentPage === 'forgot-password' || 
    pathParts[0] === 'update-password' || // This will hide for any update-password/:id route
    !validRoutes.includes(currentPage.toLowerCase()) // Hide for any random route not in validRoutes
  ) return null; // Hide breadcrumbs for these routes

  return (
    <motion.section
      id="breadcrumbs"
      className="bg-greenMango py-6 mt-18"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-white">{capitalizedPage || 'Home'}</h2> {/* Display dynamic page title */}
          <ol className="flex space-x-2">
            <li>
              <a href="/" className="text-white hover:underline">Home</a>
            </li>
            {capitalizedPage !== 'Home' && (
              <li className="text-white">/ {" "}{capitalizedPage}</li> 
            )}
          </ol>
        </div>
      </div>
    </motion.section>
  );
}

export default Breadcrumbs;
