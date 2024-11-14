const express = require('express');
const CourseController = require('../../conreoller/admin/course/CourseController'); // Ensure the correct path
const router = express.Router();

//****Courses */

router.get('/course/course', CourseController.getCourse);
router.get('/add/course', CourseController.addcourseView);
router.post('/create/course', CourseController.createCourse);
router.get('/course/edit/:id', CourseController.editCourseView);
router.post('/course/edit/:id', CourseController.editCourse);
router.post('/course/delete/:id', CourseController.deleteCourse);
router.get('/course/activate/:id', CourseController.activateCourse);
router.get('/course/deactivate/:id', CourseController.deactivateCourse);

//****Faqs */

router.get('/course/faq', CourseController.getFaq);
router.get('/add/faq', CourseController.addfaqView);
router.post('/create/faq', CourseController.createFaq);
router.get('/faq/edit/:id', CourseController.editFaqView);
router.post('/faq/edit/:id', CourseController.editFaq);
router.post('/faq/delete/:id', CourseController.deleteFaq);
router.get('/faq/activate/:id', CourseController.activateFaq);
router.get('/faq/deactivate/:id', CourseController.deactivateFaq);

//****Applications */

router.get('/course/apply', CourseController.getApplyCourse);
router.post('/apply/delete/:id', CourseController.deleteApply);


module.exports = router;
