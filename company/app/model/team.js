const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    image: {
        type: String,
       default: 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg'
     },
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: true
    },
    position: {
        type: String,
        required: [true, 'Position is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Team', teamSchema);