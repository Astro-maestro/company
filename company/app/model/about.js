const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    subtitle: {
        type: String,
        required: [true, 'Sub-Title is required!']
    },
    details: {
        type: String,
        required: [true, 'Details is required!']
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Pre-save hook to enforce only one document in the collection
aboutSchema.pre('save', async function (next) {
    try {
        // Count the number of documents in the About collection
        const count = await mongoose.models.About.countDocuments();

        // If there is already a document, throw an error
        if (count >= 1 && this.isNew) {
            return next(new Error('Only one document is allowed in the About collection!'));
        }

        // If no existing document, proceed with saving
        next();
    } catch (error) {
        return next(error); // Pass any error to the next middleware
    }
});

module.exports = mongoose.model('About', aboutSchema);
