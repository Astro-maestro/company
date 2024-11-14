const Contact = require('../../model/contact');
const Message = require('../../model/message');

class contactController{
    async getContact(req,res){
        try {
            const contacts = await Contact.find();
            return res.status(200).json(contacts);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }

    async postMessage(req, res) {
        try {
            // Destructure the required fields from the request body
            const { name, email, subject, message } = req.body;

            // Create a new message instance
            const newMessage = new Message({
                name,
                email,
                subject,
                message,
                isActive: true,  // Assuming isActive is default, no need to manually set it unless needed
            });

            // Save the message to the database
            await newMessage.save();

            // Send success response
            return res.status(200).json({
                success: true,
                message: "Message posted successfully!",
                data: newMessage
            });
        } catch (error) {
            // Handle any errors
            console.error("Error posting message:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to post the message!",
                error: error.message
            });
        }
    }

}

module.exports =new  contactController()