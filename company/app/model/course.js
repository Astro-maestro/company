const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    price: {
        type: String,
        required: [true, 'Price is required!']
    },
    details: {
        type: String,
        required: [true, 'Details is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdvanced: {
        type: Boolean,
        default: false
    },
    isGreen: {
        type: Boolean,
        default: false
    },
    isFree: {
        type: Boolean,
        default: false
    }
    
})

module.exports = mongoose.model('Course', courseSchema);