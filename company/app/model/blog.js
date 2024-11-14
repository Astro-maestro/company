const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    image: {
        type: String,
       default: 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg'
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
    content: {
        type: String,
        required: [true, 'Content is required!']
    },
    author: {
        type: String,
        required: [true, 'Author is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true})

module.exports = mongoose.model('Blog', blogSchema);