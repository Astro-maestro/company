const Contact = require('../../../model/contact');
const Message = require('../../../model/message');

class ContactController{
    async getContact(req,res){
        try {
            const contacts = await Contact.find();
             
            res.render('contact/contact/list', { contacts }); 
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).render('error', { error: 'Failed to retrieve contacts!' });
        }
    }

    async addcontactView(req,res){
        res.render('contact/contact/add');
    }

    async createContact(req,res){
        try {
            const { location, emails, calls } = req.body;
            // Convert emails and calls to arrays (if they come as strings from the form)
            const emailArray = emails.split(',').map(email => email.trim()); // Assume comma-separated emails
            const callArray = calls.split(',').map(call => call.trim()); // Assume comma-separated calls
             // Create new contact document
            const newContact = new Contact({
                location,
                emails: emailArray,
                calls: callArray,
                isActive: true, // default value, you can also take this from the form
            });

            // Save the new contact to the database
            await newContact.save();
            res.redirect('/contact/contact');
        } catch (error) {
            if (error.message === 'Only one document is allowed in the Contact collection!') {
                res.status(400).render('contact/contact/add', {
                    error: 'Only one Contact section is allowed!'
                });
                
            }
                console.error('Error creating Contact section:', error);
                res.status(500).render('error', { error: 'Failed to create Contact section!' });
        }
    }

    async editContactView(req, res) {
        try {
            const contactId = req.params.id;
            const contact = await Contact.findById(contactId); 
            
            if (!contact) {
                return res.status(404).render('error', { error: 'Contact not found!' });
            }

            res.render('contact/contact/edit', { contact }); 
        } catch (error) {
            console.error('Error fetching contact for edit:', error);
            res.status(500).render('error', { error: 'Failed to load contact for editing!' });
        }
    }

    async editContact(req, res){
        try {
            const contactId = req.params.id; // Get contact ID from URL params
            const { location, emails, calls } = req.body;
    
            // Convert emails and calls to arrays (if they come as strings from the form)
            const emailArray = emails.split(',').map(email => email.trim());
            const callArray = calls.split(',').map(call => call.trim());
    
            // Find and update the contact by ID
            const updatedContact = await Contact.findByIdAndUpdate(contactId, {
                location,
                emails: emailArray,
                calls: callArray,
            }, { new: true, runValidators: true }); // `new: true` returns the updated document
    
            if (!updatedContact) {
                return res.status(404).render('error', { message: 'Contact not found!' });
            }

            res.redirect('/contact/contact'); 
        } catch (error) {
            console.error('Error updating contact:', error);
            res.status(500).render('error', { error: 'Failed to update contact!' });
        }
    }


    async deleteContact(req, res) {
        try {
            const contactId = req.params.id; 
            
            const deletedContact = await Contact.findByIdAndDelete(contactId); 
    
            if (!deletedContact) {
                return res.status(404).render('error', { error: 'Contact not found!' });
            }

            res.redirect('/contact/contact');
    
        } catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).render('error', { error: 'Failed to delete contact!' });
        }
    }

    async activateContact(req, res) {

        try {
            const contactId = req.params.id;
            const contact = await Contact.findById(contactId);
            
            if (!contact) {
                return res.status(404).render('error', { error: 'Contact not found!' });
            }

            // Update the isActive field to true
            contact.isActive = true;
            await contact.save();

            res.redirect('/contact/contact'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating contact:', error);
            res.status(500).render('error', { error: 'Failed to activate contact!' });
        }
    }

    async deactivateContact(req, res) {
        try {
            const contactId = req.params.id;
            const contact = await Contact.findById(contactId);

            if (!contact) {
                return res.status(404).render('error', { error: 'Contact not found!' });
            }

            // Update the isActive field to false
            contact.isActive = false;
            await contact.save();

            res.redirect('/contact/contact'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating contact:', error);
            res.status(500).render('error', { error: 'Failed to deactivate contact!' });
        }
    }

    async getMessage(req,res){
        try {
            const messages = await Message.find();
             
            res.render('contact/message/list', { messages }); 
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).render('error', { error: 'Failed to retrieve messages!' });
        }
    }



    async deleteMessage(req, res) {
        try {
            const messageId = req.params.id; 
            
            const deletedMessage = await Message.findByIdAndDelete(messageId); 
    
            if (!deletedMessage) {
                return res.status(404).render('error', { error: 'Message not found!' });
            }

            res.redirect('/contact/message');
    
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).render('error', { error: 'Failed to delete message!' });
        }
    }

}

module.exports =new  ContactController()