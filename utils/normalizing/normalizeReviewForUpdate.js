const normalizeReviewForUpdate = (rawReview) => {
    return {
        ...rawReview,  // Spread existing properties
        date: rawReview.date ? new Date(rawReview.date) : new Date(), // Use current date if not provided
    };
};

module.exports = { normalizeReviewForUpdate };
