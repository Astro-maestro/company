const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    question: {
        type: String,
        required: [true, 'Question is required!'],
    },
    answer: {
        type: String,
        required: [true, 'Answer is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    }
    
})

module.exports = mongoose.model('Faq', faqSchema);