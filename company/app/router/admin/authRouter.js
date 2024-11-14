const  express = require('express');
const AuthController = require('../../conreoller/admin/auth/AuthController');
const router = express.Router();

router.get('/login', AuthController.loginView);
// Handle login form submission
router.post('/login', AuthController.login);

// Handle logout
router.post('/logout', AuthController.logout);


module.exports = router;