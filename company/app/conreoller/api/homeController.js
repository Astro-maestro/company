const Banner = require('../../model/banner');
const About = require('../../model/about');
const Service = require('../../model/service');
const Testimonial = require('../../model/testimonial');

class homeController {


    async getAllBanners(req, res) {
        try {
            const banners = await Banner.find(); 
            return res.status(200).json({ success: true, banners }); 
        } catch (error) {
            console.error('Error fetching banners:', error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve banners' }); 
        }
    }

    async getAbout(req, res) {
        try {
            const abouts = await About.find(); 
            return res.status(200).json({ success: true, abouts }); 
        } catch (error) {
            console.error('Error fetching about:', error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve about' }); 
        }
    }

    async getService(req,res){
        try {
            const services = await Service.find();
            return res.status(200).json({ success: true, services });  
        } catch (error) {
            console.error('Error fetching services:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve services!' });
        }
    }

    async getTestimonial(req,res){
        try {
            const testimonials = await Testimonial.find();
             
            return res.status(200).json( { success: true, testimonials }); 
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve testimonials!' });
        }
    }
}



module.exports=new homeController()