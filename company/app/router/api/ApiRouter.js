const  express = require('express');
const homeController = require('../../conreoller/api/homeController');
const aboutController = require('../../conreoller/api/aboutController');
const courseController = require('../../conreoller/api/courseController');
const blogController = require('../../conreoller/api/blogController');
const contactController = require('../../conreoller/api/contactController');


const Apirouter = express.Router();


Apirouter.get('/banner',homeController.getAllBanners);
Apirouter.get('/about',homeController.getAbout);
Apirouter.get('/service',homeController.getService);
Apirouter.get('/testimonial',homeController.getTestimonial);


Apirouter.get('/allabout',aboutController.getAllAbout);
Apirouter.get('/team',aboutController.getTeam);


Apirouter.get('/course',courseController.getCourse);
Apirouter.get('/faq',courseController.getFaq);
Apirouter.post('/apply', courseController.postApplication);

Apirouter.get('/blog',blogController.getBlog);
Apirouter.get('/blogs/:blogId', blogController.getBlogById); 
Apirouter.get('/reply',blogController.getReply);
Apirouter.post('/post/reply',blogController.postReply);
Apirouter.get('/search', blogController.searchBlogByTitle);


Apirouter.get('/contact',contactController.getContact);

Apirouter.post('/post/message',contactController.postMessage);


module.exports = Apirouter;

