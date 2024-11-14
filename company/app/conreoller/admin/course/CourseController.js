const Course = require('../../../model/course');
const Faq = require('../../../model/faq');
const Apply = require('../../../model/apply');

class CourseController {

    async getApplyCourse(req,res){
        try {
            const apply = await Apply.find();
             
            res.render('course/apply/list', { apply }); 
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).render('error', { error: 'Failed to retrieve applications!' });
        }
    }

    async deleteApply(req, res) {
        try {
            const applyId = req.params.id;
            
            const deletedApply = await Apply.findByIdAndDelete(applyId); 
    
            if (!deletedApply) {
                return res.status(404).render('error', { error: 'Application not found!' });
            }
    
            res.redirect('/course/apply'); // Redirect to application list after deletion
        } catch (error) {
            console.error('Error deleting application:', error);
            res.status(500).render('error', { error: 'Failed to delete Application!' });
        }
    }
    

    async getCourse(req,res){
        try {
            const courses = await Course.find();
             
            res.render('course/course/list', { courses }); 
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).render('error', { error: 'Failed to retrieve courses!' });
        }
    }

    async addcourseView(req,res){
        res.render('course/course/add');
    }

    async createCourse(req,res){
        try {
            const { name, price, details } = req.body;
            const course = new Course({
                name,
                price,
                details
            });

            await course.save();
            res.redirect('/course/course');
        } catch (error) {
                console.error('Error creating Course section:', error);
                res.status(500).render('error', { error: 'Failed to create Course section!' });
        }
    }

    async editCourseView(req, res) {
        try {
            const courseId = req.params.id;
            const course = await Course.findById(courseId); 
            
            if (!course) {
                return res.status(404).render('error', { error: 'Course not found!' });
            }

            res.render('course/course/edit', { course }); 
        } catch (error) {
            console.error('Error fetching course for edit:', error);
            res.status(500).render('error', { error: 'Failed to load course for editing!' });
        }
    }

    async editCourse(req, res){
        try {
            const { name, price, details } = req.body;
            
            const courseId = req.params.id; 

            const updatedCourseData = {
                name,
                price,
		        details
            };
            const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedCourseData, { new: true });

            if (!updatedCourse) {
                return res.status(404).render('error', { error: 'Course not found!' });
            }

            res.redirect('/course/course'); 
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).render('error', { error: 'Failed to update course!' });
        }
    }



    async deleteCourse(req, res) {
        try {
            const courseId = req.params.id; 
            
            const deletedCourse = await Course.findByIdAndDelete(courseId); 
    
            if (!deletedCourse) {
                return res.status(404).render('error', { error: 'Course not found!' });
            }
    
          
            res.redirect('/course/course');
    
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).render('error', { error: 'Failed to delete course!' });
        }
    }

    async activateCourse(req, res) {
        try {
            const courseId = req.params.id;
            const course = await Course.findById(courseId);
            
            if (!course) {
                return res.status(404).render('error', { error: 'Course not found!' });
            }

            // Update the isActive field to true
            course.isActive = true;
            await course.save();

            res.redirect('/course/course'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating course:', error);
            res.status(500).render('error', { error: 'Failed to activate course!' });
        }
    }

    async deactivateCourse(req, res) {
        try {
            const courseId = req.params.id;
            const course = await Course.findById(courseId);

            if (!course) {
                return res.status(404).render('error', { error: 'Course not found!' });
            }

            // Update the isActive field to false
            course.isActive = false;
            await course.save();

            res.redirect('/course/course'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating course:', error);
            res.status(500).render('error', { error: 'Failed to deactivate course!' });
        }
    }

    async getFaq(req,res){
        try {
            const faqs = await Faq.find();
             
            res.render('course/faq/list', { faqs }); 
        } catch (error) {
            console.error('Error fetching faqs:', error);
            res.status(500).render('error', { error: 'Failed to retrieve faqs!' });
        }
    }

    async addfaqView(req,res){
        res.render('course/faq/add');
    }

    async createFaq(req,res){
        try {
            const { question, answer } = req.body;
            const faq = new Faq({
                question,
                answer
            });

            await faq.save();
            res.redirect('/course/faq');
        } catch (error) {
                console.error('Error creating Faq section:', error);
                res.status(500).render('error', { error: 'Failed to create Faq section!' });
        }
    }

    async editFaqView(req, res) {
        try {
            const faqId = req.params.id;
            const faq = await Faq.findById(faqId); 
            
            if (!faq) {
                return res.status(404).render('error', { error: 'Faq not found!' });
            }

            res.render('course/faq/edit', { faq }); 
        } catch (error) {
            console.error('Error fetching faq for edit:', error);
            res.status(500).render('error', { error: 'Failed to load faq for editing!' });
        }
    }

    async editFaq(req, res){
        try {
            const { question, answer } = req.body;
            
            const faqId = req.params.id; 

            const updatedFaqData = {
                question,
                answer
		        
            };
            const updatedFaq = await Faq.findByIdAndUpdate(faqId, updatedFaqData, { new: true });

            if (!updatedFaq) {
                return res.status(404).render('error', { error: 'Faq not found!' });
            }

            res.redirect('/course/faq'); 
        } catch (error) {
            console.error('Error updating faq:', error);
            res.status(500).render('error', { error: 'Failed to update faq!' });
        }
    }



    async deleteFaq(req, res) {
        try {
            const faqId = req.params.id; 
            
            const deletedFaq = await Faq.findByIdAndDelete(faqId); 
    
            if (!deletedFaq) {
                return res.status(404).render('error', { error: 'Faq not found!' });
            }
    
          
            res.redirect('/course/faq');
    
        } catch (error) {
            console.error('Error deleting faq:', error);
            res.status(500).render('error', { error: 'Failed to delete faq!' });
        }
    }

    async activateFaq(req, res) {
        try {
            const faqId = req.params.id;
            const faq = await Faq.findById(faqId);
            
            if (!faq) {
                return res.status(404).render('error', { error: 'Faq not found!' });
            }

            // Update the isActive field to true
            faq.isActive = true;
            await faq.save();

            res.redirect('/course/faq'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating faq:', error);
            res.status(500).render('error', { error: 'Failed to activate faq!' });
        }
    }

    async deactivateFaq(req, res) {
        try {
            const faqId = req.params.id;
            const faq = await Faq.findById(faqId);

            if (!faq) {
                return res.status(404).render('error', { error: 'Faq not found!' });
            }

            // Update the isActive field to false
            faq.isActive = false;
            await faq.save();

            res.redirect('/course/faq'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating faq:', error);
            res.status(500).render('error', { error: 'Failed to deactivate faq!' });
        }
    }

}

module.exports =new  CourseController()