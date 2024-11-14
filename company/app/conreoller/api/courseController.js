const Course = require('../../model/course');
const Faq = require('../../model/faq');
const Apply = require('../../model/apply');

class courseController{
    async getCourse(req,res){
        try {
            const courses = await Course.find();
            return res.status(200).json({ success: true, courses });  
        } catch (error) {
            console.error('Error fetching courses:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve courses!' });
        }
    }

    async getFaq(req,res){
        try {
            const faqs = await Faq.find();
            return res.status(200).json({ success: true, faqs });  
        } catch (error) {
            console.error('Error fetching faqs:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve faqs!' });
        }
    }

    async postApplication(req, res) {
        try {
            const { name, email, phoneNumber, address, course, query } = req.body;

            // Validate required fields
            if (!name || !email || !phoneNumber || !address || !course || !query) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required!'
                });
            }

            // Create a new application document
            const newApplication = new Apply({
                name,
                email,
                phoneNumber,
                address,
                course,
                query
            });

            // Save the application to the database
            await newApplication.save();

            return res.status(201).json({
                success: true,
                message: 'Application submitted successfully!',
                data: newApplication
            });
        } catch (error) {
            console.error('Error submitting application:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to submit application!',
                error: error.message
            });
        }
    }

}

module.exports=new courseController()