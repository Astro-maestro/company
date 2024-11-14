const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    location: {
        type: String,
        required: [true, 'Location is required!'],
    },
    emails: [{
        type: String,
        required: [true, 'Email is required!'],
    }],
    calls: [{
        type: String,
        required: [true, 'Call is required!'],
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
});

// Middleware to ensure only one contact per location
contactSchema.pre('save', async function (next) {
    try {
        // Count the number of documents in the About collection
        const count = await mongoose.models.Contact.countDocuments();

        // If there is already a document, throw an error
        if (count >= 1 && this.isNew) {
            return next(new Error('Only one document is allowed in the Contact collection!'));
        }

        // If no existing document, proceed with saving
        next();
    } catch (error) {
        return next(error); // Pass any error to the next middleware
    }
});

module.exports = mongoose.model('Contact', contactSchema);