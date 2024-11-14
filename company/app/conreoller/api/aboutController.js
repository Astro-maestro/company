const Team = require('../../model/team');
const About = require('../../model/about');


class aboutController {
    async getTeam(req,res){
        try {
            const teams = await Team.find();
            return res.status(200).json({ success: true, teams });  
        } catch (error) {
            console.error('Error fetching teams:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve teams!' });
        }
    }

    async getAllAbout(req,res){
        try {
            const abouts = await About.find();
            return res.status(200).json({ success: true, abouts });  
        } catch (error) {
            console.error('Error fetching abouts:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve abouts!' });
        }
    }

}


module.exports=new aboutController()