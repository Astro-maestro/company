const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"name required"],
    },
    email: {
        type: String,
        required: [true,"email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"password required"],
    },
    image: {
        type: String,
       default: 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg'
     },
    mobile: {
        type: String,
        required: [true,"mobile required"]
    },
    nickname: {
        type: String,
        required: [true,"childhood name required"]
    },
    role: {
        type: String,
        enum: ["USER","ADMIN"],
        default:"USER"
    },
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);