const normalizeReview = (rawReview) => {
    return {
        ...rawReview,  // Spread existing properties
        exhibitId: rawReview.exhibitId || null, // Set to null if not provided
        animalId: rawReview.animalId || null, // Set to null if not provided
        likes: Array.isArray(rawReview.likes) ? rawReview.likes : [], // Default to empty array if not provided
        date: rawReview.date ? new Date(rawReview.date) : new Date(), // Use current date if not provided
    };
};

module.exports = { normalizeReview };
