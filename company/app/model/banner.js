const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        unique: true
    },
    subtitle: {
        type: String,
        required: [true, 'Sub-Title is required!']
    },
    image: {
        type: String,
       default: 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg'
     },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Banner', bannerSchema);