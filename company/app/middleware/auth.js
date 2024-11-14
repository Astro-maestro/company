// auth.js
function authCheck(req, res, next) {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login if not authenticated
    }
  
    // Check if user role is ADMIN
    if (req.session.user.role !== 'ADMIN') {
      return res.redirect('/login'); // Redirect if user is not an admin
    }
  
    // If authenticated and has admin role, proceed to the next middleware/controller
    next();
  }
  
  module.exports = authCheck;
  