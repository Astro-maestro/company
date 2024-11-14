const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    website: {
        type: String,
        required: [true, 'Website is required!'],
    },
    comment: {
        type: String,
        required: [true, 'Comment is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    }
    
},{ timestamps: true })

module.exports = mongoose.model('Reply', replySchema);