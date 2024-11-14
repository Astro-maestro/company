const  express = require('express');
const AuthController = require('../../conreoller/api/AuthController');
const uploadUserImage = require('../../helper/UserImageUpload');
const authCheck = require('../../middleware/auth');
const authenticateToken = require('../../middleware/authenticateToken');
const router = express.Router();

router.post('/register', uploadUserImage.single('image'), AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', authenticateToken, AuthController.logout);
router.get('/dashboard', authCheck, AuthController.dashboard);
router.post('/update-password', authenticateToken, AuthController.updatePassword);
router.post('/forget-password', AuthController.forgetPassword);

module.exports = router;