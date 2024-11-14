const express = require('express');
const AboutController = require('../../conreoller/admin/about/AboutController');
const uploadTeamImage = require('../../helper/TeamImageUpload');

const router = express.Router();

//********about */
router.get('/about/about',AboutController.getAbout);
router.get('/add/about/about', AboutController.addaboutView);
router.post('/create/about/about', AboutController.createAbout);
router.get('/about/about/edit/:id', AboutController.editAboutView);
router.post('/about/about/edit/:id', AboutController.editAbout);
router.post('/about/about/delete/:id', AboutController.deleteAbout);
router.get('/about/about/activate/:id', AboutController.activateAbout);
router.get('/about/about/deactivate/:id', AboutController.deactivateAbout);

//********team */
router.get('/about/team',AboutController.getTeam);
router.get('/add/team', AboutController.addteamView);
router.post('/create/team',uploadTeamImage.single('image'), AboutController.createTeam);
router.get('/team/edit/:id', AboutController.editTeamView);
router.post('/team/edit/:id',uploadTeamImage.single('image'), AboutController.editTeam);
router.post('/team/delete/:id', AboutController.deleteTeam);
router.get('/team/activate/:id', AboutController.activateTeam);
router.get('/team/deactivate/:id', AboutController.deactivateTeam);

module.exports = router;