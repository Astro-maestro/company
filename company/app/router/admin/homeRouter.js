const express = require('express');
const HomeController = require('../../conreoller/admin/home/HomeController');
const uploadBannerImage = require('../../helper/BannerImageUpload');
const uploadImages = require('../../helper/ServiceImageUpload');
const uploadTestimonialImage = require('../../helper/TestimonialImageUpload');
const router = express.Router();

//********banner */

router.get('/add/banner', HomeController.addbannerView);
router.post('/create/banner',uploadBannerImage.single('image'), HomeController.createBanner);
router.get('/home/banner', HomeController.getBanner);
router.get('/banner/edit/:id', HomeController.editBannerView); // To render the edit form
router.post('/banner/edit/:id',uploadBannerImage.single('image'), HomeController.editBanner);
router.post('/banner/delete/:id', HomeController.deleteBanner);
router.get('/banner/activate/:id', HomeController.activateBanner);
router.get('/banner/deactivate/:id', HomeController.deactivateBanner);


//********about */
router.get('/home/about',HomeController.getAbout);
router.get('/add/about', HomeController.addaboutView);
router.post('/create/about', HomeController.createAbout);
router.get('/about/edit/:id', HomeController.editAboutView);
router.post('/about/edit/:id', HomeController.editAbout);
router.post('/about/delete/:id', HomeController.deleteAbout);
router.get('/about/activate/:id', HomeController.activateAbout);
router.get('/about/deactivate/:id', HomeController.deactivateAbout);

//********services */
router.get('/home/service', HomeController.getService);
router.get('/add/service', HomeController.addserviceView);
router.post('/create/service',uploadImages, HomeController.createService);
router.get('/service/edit/:id', HomeController.editServiceView);
router.post('/service/edit/:id',uploadImages, HomeController.editService);
router.post('/service/delete/:id', HomeController.deleteService);
router.get('/service/activate/:id', HomeController.activateService);
router.get('/service/deactivate/:id', HomeController.deactivateService);


//****testimonials */
router.get('/home/testimonial', HomeController.getTestimonial);
router.get('/add/testimonial', HomeController.addtestimonialView);
router.post('/create/testimonial',uploadTestimonialImage.single('image'), HomeController.createTestimonial);
router.get('/testimonial/edit/:id', HomeController.editTestimonialView);
router.post('/testimonial/edit/:id',uploadTestimonialImage.single('image'), HomeController.editTestimonial);
router.post('/testimonial/delete/:id', HomeController.deleteTestimonial);
router.get('/testimonial/activate/:id', HomeController.activateTestimonial);
router.get('/testimonial/deactivate/:id', HomeController.deactivateTestimonial); 


module.exports = router;