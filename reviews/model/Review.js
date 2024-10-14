const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    exhibitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exhibit'
    },
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Visitor'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
});

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
