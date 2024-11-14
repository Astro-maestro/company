const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applySchema = new Schema({
    
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    phoneNumber: {
        type: String,
        required: [true, 'PhoneNumber is required!']
    },
    address: {
        type: String,
        required: [true, 'Address is required!']
    },
    course: {
        type: String,
        required: [true, 'Course is required!']
    },
    query: [{
        type: String,
        required: [true, 'Query is required!'],
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
},{timestamps: true});

module.exports = mongoose.model('Apply', applySchema);