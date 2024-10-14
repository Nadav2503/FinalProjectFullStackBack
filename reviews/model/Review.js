const mongoose = require('mongoose');

// Define Review model
const reviewSchema = new mongoose.Schema({
    // Reference to the Visitor who created the review
    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    // Optional reference to the associated Exhibit
    exhibitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exhibit'
    },
    // Optional reference to the associated Animal
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    },
    // Array of Visitor IDs who liked this review
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor'
    }],
    // Date when the review was created 
    date: {
        type: Date,
        default: Date.now
    },
    // Rating given in the review, must be between 1 and 5 
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
});

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

// Export the Review model
module.exports = Review;
