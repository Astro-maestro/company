const About = require('../../../model/about');
const Team = require('../../../model/team');

class AboutController{
    async getAbout(req,res){
        try {
            const abouts = await About.find(); 
            res.render('about/about/list', { abouts }); 
        } catch (error) {
            console.log('Error fetching About:', error);
            res.status(500).render('error', { error: 'Failed to retrieve About section!' });
        }
    }

    async addaboutView(req,res){
        res.render('about/about/add');
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
            res.redirect('/about/about');
        } catch (error) {
            if (error.message === 'Only one document is allowed in the About collection!') {
                res.status(400).render('about/about/add', {
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

            res.render('about/about/edit', { about }); 
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

            res.redirect('/about/about'); 
        } catch (error) {
            console.error('Error updating about:', error);
            res.status(500).render('error', { error: 'Failed to update about!' });
        }
    }



    async deleteAbout(req, res) {
        try {
            const aboutId = req.params.id; 
            
            const deletedAbout = await About.findByIdAndDelete(aboutId); 
    
            if (!deletedAbout) {
                return res.status(404).render('error', { error: 'About not found!' });
            }
    
          
            res.redirect('/about/about');
    
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

            res.redirect('/about/about'); // Redirect to banner list after activation
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

            res.redirect('/about/about'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating about:', error);
            res.status(500).render('error', { error: 'Failed to deactivate about!' });
        }
    }

    async getTeam(req,res){
        try {
            const teams = await Team.find();
             
            res.render('about/team/list', { teams }); 
        } catch (error) {
            console.error('Error fetching teams:', error);
            res.status(500).render('error', { error: 'Failed to retrieve teams!' });
        }
    }

    async addteamView(req,res){
        res.render('about/team/add');
    }

    async createTeam(req, res) {
        try {
            const { name, position } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined; 
    
            const newTeam = new Team({
                name,
                position,
                image: image || 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg',
                isActive: true
            });
    
            await newTeam.save();
            res.redirect('/about/team');
        } catch (error) {
            console.error('Error creating team:', error);
            res.status(500).render('error', { error: 'Failed to create team!' });
        }
    }

    async editTeamView(req, res) {
        try {
            const teamId = req.params.id;
            const team = await Team.findById(teamId); 
            
            if (!team) {
                return res.status(404).render('error', { error: 'team not found!' });
            }

            res.render('about/team/edit', { team }); 
        } catch (error) {
            console.error('Error fetching team for edit:', error);
            res.status(500).render('error', { error: 'Failed to load team for editing!' });
        }
    }

    async editTeam(req, res) {
        try {
            const { name, position } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined;
            const teamId = req.params.id; 

            const updatedTeamData = {
                name,
                position
            };

            if (image) {
                updatedTeamData.image = image;
            }

            const updatedTeam = await Team.findByIdAndUpdate(teamId, updatedTeamData, { new: true });

            if (!updatedTeam) {
                return res.status(404).render('error', { error: 'Team not found!' });
            }

            res.redirect('/about/team'); 
        } catch (error) {
            console.error('Error updating team:', error);
            res.status(500).render('error', { error: 'Failed to update team!' });
        }
    }



    async deleteTeam(req, res) {
        try {
            const teamId = req.params.id; 
            
            const deletedTeam = await Team.findByIdAndDelete(teamId); 
    
            if (!deletedTeam) {
                return res.status(404).render('error', { error: 'Team not found!' });
            }
    
          
            res.redirect('/about/team');
    
        } catch (error) {
            console.error('Error deleting team:', error);
            res.status(500).render('error', { error: 'Failed to delete team!' });
        }
    }

    async activateTeam(req, res) {
        try {
            const teamId = req.params.id;
            const team = await Team.findById(teamId);
            
            if (!team) {
                return res.status(404).render('error', { error: 'Team not found!' });
            }

            // Update the isActive field to true
            team.isActive = true;
            await team.save();

            res.redirect('/about/team'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating team:', error);
            res.status(500).render('error', { error: 'Failed to activate team!' });
        }
    }

    async deactivateTeam(req, res) {
        try {
            const teamId = req.params.id;
            const team = await Team.findById(teamId);

            if (!team) {
                return res.status(404).render('error', { error: 'Team not found!' });
            }

            // Update the isActive field to false
            team.isActive = false;
            await team.save();

            res.redirect('/about/team'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating team:', error);
            res.status(500).render('error', { error: 'Failed to deactivate team!' });
        }
    }

}

module.exports =new  AboutController()