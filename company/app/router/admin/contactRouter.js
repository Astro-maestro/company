const express = require('express');
const ContactController = require('../../conreoller/admin/contact/ContactController');
const router = express.Router();


//****Contacts */

router.get('/contact/contact', ContactController.getContact);
router.get('/add/contact', ContactController.addcontactView);
router.post('/create/contact', ContactController.createContact);
router.get('/contact/edit/:id', ContactController.editContactView);
router.post('/contact/edit/:id', ContactController.editContact);
router.post('/contact/delete/:id', ContactController.deleteContact);
router.get('/contact/activate/:id', ContactController.activateContact);
router.get('/contact/deactivate/:id', ContactController.deactivateContact);

//****Messages */
router.get('/contact/message', ContactController.getMessage);
router.post('/message/delete/:id', ContactController.deleteMessage);


module.exports = router;