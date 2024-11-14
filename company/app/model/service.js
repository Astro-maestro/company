const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    image1: {
        type: String,
        default: 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg', // Default URL for image1
    },
    image2: {
        type: String,
        default: 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg', // Default URL for image2
    },
    hover_color: {
        type: String,
        required: [true, 'Hover Color is required!'],
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
        unique: true
    },
    subtitle: {
        type: String,
        required: [true, 'Sub-Title is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Service', serviceSchema);