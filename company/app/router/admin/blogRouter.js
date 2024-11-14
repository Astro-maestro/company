const express = require('express');
const BlogController = require('../../conreoller/admin/blog/BlogController');
const uploadBlogImage = require('../../helper/BlogImageUpload');

const router = express.Router();

//********blogs */
router.get('/blog/blog', BlogController.getBlog);
router.get('/add/blog', BlogController.addblogView);
router.post('/create/blog',uploadBlogImage.single('image'), BlogController.createBlog);
router.get('/blog/edit/:id', BlogController.editBlogView);
router.post('/blog/edit/:id',uploadBlogImage.single('image'), BlogController.editBlog);
router.post('/blog/delete/:id', BlogController.deleteBlog);
router.get('/blog/activate/:id', BlogController.activateBlog);
router.get('/blog/deactivate/:id', BlogController.deactivateBlog);

//********replies */
router.get('/blog/reply', BlogController.getReply);
router.post('/reply/delete/:id', BlogController.deleteReply);
router.get('/reply/activate/:id', BlogController.activateReply);
router.get('/reply/deactivate/:id', BlogController.deactivateReply);

module.exports = router;