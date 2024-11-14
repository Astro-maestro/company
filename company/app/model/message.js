const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required!'],
    },
    message: {
        type: String,
        required: [true, 'Message is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    }
    
})

module.exports = mongoose.model('Message', messageSchema);