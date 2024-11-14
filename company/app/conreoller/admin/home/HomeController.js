const Banner = require('../../../model/banner');
const About = require('../../../model/about');
const Service = require('../../../model/service');
const Testimonial = require('../../../model/testimonial');

class HomeController {


   async addbannerView(req,res){
        res.render('home/banner/add');
    }

    async createBanner(req, res) {
        try {
            const { title, subtitle } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined; 
    
            const newBanner = new Banner({
                title,
                subtitle,
                image: image || 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg',
                isActive: true
            });
    
            await newBanner.save();
            res.redirect('/home/banner');
        } catch (error) {
            console.error('Error creating banner:', error);
            res.status(500).render('error', { error: 'Failed to create banner!' });
        }
    }

    async getBanner(req,res){
        try {
            const banners = await Banner.find();
             
            res.render('home/banner/list', { banners }); 
        } catch (error) {
            console.error('Error fetching banners:', error);
            res.status(500).render('error', { error: 'Failed to retrieve banners!' });
        }
    }

    async editBannerView(req, res) {
        try {
            const bannerId = req.params.id;
            const banner = await Banner.findById(bannerId); 
            
            if (!banner) {
                return res.status(404).render('error', { error: 'Banner not found!' });
            }

            res.render('home/banner/edit', { banner }); 
        } catch (error) {
            console.error('Error fetching banner for edit:', error);
            res.status(500).render('error', { error: 'Failed to load banner for editing!' });
        }
    }

    async editBanner(req, res) {
        try {
            const { title, subtitle } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined;
            const bannerId = req.params.id; 

            const updatedBannerData = {
                title,
                subtitle
            };

            if (image) {
                updatedBannerData.image = image;
            }

            const updatedBanner = await Banner.findByIdAndUpdate(bannerId, updatedBannerData, { new: true });

            if (!updatedBanner) {
                return res.status(404).render('error', { error: 'Banner not found!' });
            }

            res.redirect('/home/banner'); 
        } catch (error) {
            console.error('Error updating banner:', error);
            res.status(500).render('error', { error: 'Failed to update banner!' });
        }
    }
    
    async deleteBanner(req, res) {
        try {
            const bannerId = req.params.id; 
            
            const deletedBanner = await Banner.findByIdAndDelete(bannerId); 
    
            if (!deletedBanner) {
                return res.status(404).render('error', { error: 'Banner not found!' });
            }
    
          
            res.redirect('/home/banner');
    
        } catch (error) {
            console.error('Error deleting banner:', error);
            res.status(500).render('error', { error: 'Failed to delete banner!' });
        }
    }

    async deleteBannerView(req, res) {
        try {
            const bannerId = req.params.id;
            const banner = await Banner.findById(bannerId); 
            
            if (!banner) {
                return res.status(404).render('error', { error: 'Banner not found!' });
            }

            res.render('home/banner/delete', { banner }); 
        } catch (error) {
            console.error('Error fetching banner for edit:', error);
            res.status(500).render('error', { error: 'Failed to load banner for editing!' });
        }
    }
    
    async activateBanner(req, res) {
        try {
            const bannerId = req.params.id;
            const banner = await Banner.findById(bannerId);
            
            if (!banner) {
                return res.status(404).render('error', { error: 'Banner not found!' });
            }

            // Update the isActive field to true
            banner.isActive = true;
            await banner.save();

            res.redirect('/home/banner'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating banner:', error);
            res.status(500).render('error', { error: 'Failed to activate banner!' });
        }
    }

    // Method to deactivate a banner
    async deactivateBanner(req, res) {
        try {
            const bannerId = req.params.id;
            const banner = await Banner.findById(bannerId);

            if (!banner) {
                return res.status(404).render('error', { error: 'Banner not found!' });
            }

            // Update the isActive field to false
            banner.isActive = false;
            await banner.save();

            res.redirect('/home/banner'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating banner:', error);
            res.status(500).render('error', { error: 'Failed to deactivate banner!' });
        }
    }

    async getAbout(req,res){
        try {
            const abouts = await About.find(); 
            res.render('home/about/listAbout', { abouts }); 
        } catch (error) {
            console.log('Error fetching About:', error);
            res.status(500).render('error', { error: 'Failed to retrieve About section!' });
        }
    }

    async addaboutView(req,res){
        res.render('home/about/addAbout');
    }

    async createAbout(req,res){
        try {
            const { title, subtitle, details } = req.body;
            const about = new About({
                title,
                subtitle,
                details
            });

            await about.save();
            res.redirect('/home/about');
        } catch (error) {
            if (error.message === 'Only one document is allowed in the About collection!') {
                res.status(400).render('home/about/addAbout', {
                    error: 'Only one About section is allowed!',
                    title: req.body.title,
                    subtitle: req.body.subtitle,
                    details: req.body.details
                });
                
            } else {
                console.error('Error creating About section:', error);
                res.status(500).render('error', { error: 'Failed to create About section!' });
            }
        }
    }

    async editAboutView(req, res) {
        try {
            const aboutId = req.params.id;
            const about = await About.findById(aboutId); 
            
            if (!about) {
                return res.status(404).render('error', { error: 'About not found!' });
            }

            res.render('home/about/editAbout', { about }); 
        } catch (error) {
            console.error('Error fetching about for edit:', error);
            res.status(500).render('error', { error: 'Failed to load about for editing!' });
        }
    }

    async editAbout(req, res){
        try {
            const { title, subtitle, details } = req.body;
            
            const aboutId = req.params.id; 

            const updatedAboutData = {
                title,
                subtitle,
		        details
            };
            const updatedAbout = await About.findByIdAndUpdate(aboutId, updatedAboutData, { new: true });

            if (!updatedAbout) {
                return res.status(404).render('error', { error: 'About not found!' });
            }

            res.redirect('/home/about'); 
        } catch (error) {
            console.error('Error updating about:', error);
            res.status(500).render('error', { error: 'Failed to update about!' });
        }
    }

    async deleteAboutView(req, res) {
        try {
            const aboutId = req.params.id;
            const about = await About.findById(aboutId); 
            
            if (!about) {
                return res.status(404).render('error', { error: 'About not found!' });
            }

            res.render('home/about/deleteAbout', { about }); 
        } catch (error) {
            console.error('Error fetching about for edit:', error);
            res.status(500).render('error', { error: 'Failed to load about for editing!' });
        }
    }

    async deleteAbout(req, res) {
        try {
            const aboutId = req.params.id; 
            
            const deletedAbout = await About.findByIdAndDelete(aboutId); 
    
            if (!deletedAbout) {
                return res.status(404).render('error', { error: 'About not found!' });
            }
    
          
            res.redirect('/home/about');
    
        } catch (error) {
            console.error('Error deleting about:', error);
            res.status(500).render('error', { error: 'Failed to delete about!' });
        }
    }

    async activateAbout(req, res) {
        try {
            const aboutId = req.params.id;
            const about = await About.findById(aboutId);
            
            if (!about) {
                return res.status(404).render('error', { error: 'About not found!' });
            }

            // Update the isActive field to true
            about.isActive = true;
            await about.save();

            res.redirect('/home/about'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating about:', error);
            res.status(500).render('error', { error: 'Failed to activate about!' });
        }
    }

    // Method to deactivate a banner
    async deactivateAbout(req, res) {
        try {
            const aboutId = req.params.id;
            const about = await About.findById(aboutId);

            if (!about) {
                return res.status(404).render('error', { error: 'About not found!' });
            }

            // Update the isActive field to false
            about.isActive = false;
            await about.save();

            res.redirect('/home/about'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating about:', error);
            res.status(500).render('error', { error: 'Failed to deactivate about!' });
        }
    }

    async getService(req,res){
        try {
            const services = await Service.find();
             
            res.render('home/service/list', { services }); 
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).render('error', { error: 'Failed to retrieve services!' });
        }
    }

    async addserviceView(req,res){
        res.render('home/service/add');
    }

    async createService(req, res) {
        try {
            const { title, subtitle, hover_color } = req.body;
            console.log(req.files);
    
            const image1 = req.files['image1'] ? `/uploads/${req.files['image1'][0].filename}` : undefined;
            const image2 = req.files['image2'] ? `/uploads/${req.files['image2'][0].filename}` : undefined;
    
            const newService = new Service({
                title,
                subtitle,
                hover_color,
                image1,
                image2,
                isActive: true
            });
    
            await newService.save();
            res.redirect('/home/service');
        } catch (error) {
            console.error('Error creating service:', error);
            res.status(500).render('error', { error: 'Failed to create service!' });
        }
    }
    
    async editServiceView(req, res) {
        try {
            const serviceId = req.params.id;
            const service = await Service.findById(serviceId); 
            
            if (!service) {
                return res.status(404).render('error', { error: 'service not found!' });
            }

            res.render('home/service/edit', { service }); 
        } catch (error) {
            console.error('Error fetching service for edit:', error);
            res.status(500).render('error', { error: 'Failed to load service for editing!' });
        }
    }

    async editService(req, res) {
        try {
            const { title, subtitle, hover_color } = req.body;
            const serviceId = req.params.id;
    
            // Extract image1 and image2 if they were uploaded
            const image1 = req.files['image1'] ? `/uploads/${req.files['image1'][0].filename}` : undefined;
            const image2 = req.files['image2'] ? `/uploads/${req.files['image2'][0].filename}` : undefined;
    
            // Construct the updated data object
            const updatedServiceData = {
                title,
                subtitle,
                hover_color
            };
    
            // Only update image1 if it was uploaded
            if (image1) {
                updatedServiceData.image1 = image1;
            }
    
            // Only update image2 if it was uploaded
            if (image2) {
                updatedServiceData.image2 = image2;
            }
    
            // Perform the update in the database
            const updatedService = await Service.findByIdAndUpdate(serviceId, updatedServiceData, { new: true });
    
            if (!updatedService) {
                return res.status(404).render('error', { error: 'Service not found!' });
            }
    
            // Redirect to the service list page
            res.redirect('/home/service');
        } catch (error) {
            console.error('Error updating service:', error);
            res.status(500).render('error', { error: 'Failed to update service!' });
        }
    }
    

    async deleteServiceView(req, res) {
        try {
            const serviceId = req.params.id;
            const service = await Service.findById(serviceId); 
            
            if (!service) {
                return res.status(404).render('error', { error: 'Service not found!' });
            }

            res.render('home/service/delete', { service }); 
        } catch (error) {
            console.error('Error fetching service for edit:', error);
            res.status(500).render('error', { error: 'Failed to load service for editing!' });
        }
    }

    async deleteService(req, res) {
        try {
            const serviceId = req.params.id; 
            
            const deletedService = await Service.findByIdAndDelete(serviceId); 
    
            if (!deletedService) {
                return res.status(404).render('error', { error: 'Service not found!' });
            }
    
          
            res.redirect('/home/service');
    
        } catch (error) {
            console.error('Error deleting service:', error);
            res.status(500).render('error', { error: 'Failed to delete service!' });
        }
    }

    async activateService(req, res) {
        try {
            const serviceId = req.params.id;
            const service = await Service.findById(serviceId);
            
            if (!service) {
                return res.status(404).render('error', { error: 'Service not found!' });
            }

            // Update the isActive field to true
            service.isActive = true;
            await service.save();

            res.redirect('/home/service'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating service:', error);
            res.status(500).render('error', { error: 'Failed to activate service!' });
        }
    }

    async deactivateService(req, res) {
        try {
            const serviceId = req.params.id;
            const service = await Service.findById(serviceId);

            if (!service) {
                return res.status(404).render('error', { error: 'Service not found!' });
            }

            // Update the isActive field to false
            service.isActive = false;
            await service.save();

            res.redirect('/home/service'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating service:', error);
            res.status(500).render('error', { error: 'Failed to deactivate service!' });
        }
    }

    async getTestimonial(req,res){
        try {
            const testimonials = await Testimonial.find();
             
            res.render('home/testimonial/list', { testimonials }); 
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            res.status(500).render('error', { error: 'Failed to retrieve testimonials!' });
        }
    }

    async addtestimonialView(req,res){
        res.render('home/testimonial/add');
    }

    async createTestimonial(req,res){
        try {
            const { name, position, comment } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined; 
            const testimonial = new Testimonial({
                name,
                position,
                comment,
                image: image || 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg',
            });

            await testimonial.save();
            res.redirect('/home/testimonial');
        } catch (error) {
                console.error('Error creating Testimonial section:', error);
                res.status(500).render('error', { error: 'Failed to create Testimonial section!' });
        }
    }

    async editTestimonialView(req, res) {
        try {
            const testimonialId = req.params.id;
            const testimonial = await Testimonial.findById(testimonialId); 
            
            if (!testimonial) {
                return res.status(404).render('error', { error: 'Testimonial not found!' });
            }

            res.render('home/testimonial/edit', { testimonial }); 
        } catch (error) {
            console.error('Error fetching testimonial for edit:', error);
            res.status(500).render('error', { error: 'Failed to load testimonial for editing!' });
        }
    }

    async editTestimonial(req, res){
        try {
            const { name, position, comment } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined;
            
            const testimonialId = req.params.id; 

            const updatedTestimonialData = {
                name,
                position,
		        comment
            };
            if (image) {
                updatedTestimonialData.image = image;
            }
            const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, updatedTestimonialData, { new: true });

            if (!updatedTestimonial) {
                return res.status(404).render('error', { error: 'Testimonial not found!' });
            }

            res.redirect('/home/testimonial'); 
        } catch (error) {
            console.error('Error updating testimonial:', error);
            res.status(500).render('error', { error: 'Failed to update testimonial!' });
        }
    }

    async deleteTestimonialView(req, res) {
        try {
            const testimonialId = req.params.id;
            const testimonial = await Testimonial.findById(testimonialId); 
            
            if (!testimonial) {
                return res.status(404).render('error', { error: 'Testimonial not found!' });
            }

            res.render('home/testimonial/delete', { testimonial }); 
        } catch (error) {
            console.error('Error fetching testimonial for edit:', error);
            res.status(500).render('error', { error: 'Failed to load testimonial for editing!' });
        }
    }

    async deleteTestimonial(req, res) {
        try {
            const testimonialId = req.params.id; 
            
            const deletedTestimonial = await Testimonial.findByIdAndDelete(testimonialId); 
    
            if (!deletedTestimonial) {
                return res.status(404).render('error', { error: 'Testimonial not found!' });
            }
    
          
            res.redirect('/home/testimonial');
    
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            res.status(500).render('error', { error: 'Failed to delete testimonial!' });
        }
    }

    async activateTestimonial(req, res) {
        try {
            const testimonialId = req.params.id;
            const testimonial = await Testimonial.findById(testimonialId);
            
            if (!testimonial) {
                return res.status(404).render('error', { error: 'Testimonial not found!' });
            }

            // Update the isActive field to true
            testimonial.isActive = true;
            await testimonial.save();

            res.redirect('/home/testimonial'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating testimonial:', error);
            res.status(500).render('error', { error: 'Failed to activate testimonial!' });
        }
    }

    async deactivateTestimonial(req, res) {
        try {
            const testimonialId = req.params.id;
            const testimonial = await Testimonial.findById(testimonialId);

            if (!testimonial) {
                return res.status(404).render('error', { error: 'Testimonial not found!' });
            }

            // Update the isActive field to false
            testimonial.isActive = false;
            await testimonial.save();

            res.redirect('/home/testimonial'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating testimonial:', error);
            res.status(500).render('error', { error: 'Failed to deactivate testimonial!' });
        }
    }
}


module.exports =new  HomeController()