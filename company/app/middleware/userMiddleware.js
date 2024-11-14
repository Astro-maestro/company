// middleware/userMiddleware.js
const userMiddleware = (req, res, next) => {
    // Check if user is authenticated
    if (req.session.user) {
        res.locals.user = req.session.user; // Set user data in locals
    } else {
        res.locals.user = null; // No user is logged in
    }
    next(); // Call the next middleware
};

module.exports = userMiddleware;