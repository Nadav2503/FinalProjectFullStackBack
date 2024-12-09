const defaultVisitorImageUrl = "/images/placeholderVisitorPicture.png"; // Path to default visitor image

const normalizeVisitorForUpdate = (rawVisitor) => {
    return {
        ...rawVisitor,  // Spread existing properties to retain all visitor fields
        image: {
            url: rawVisitor.image?.url || defaultVisitorImageUrl, // Use the default visitor image if no specific image URL is provided
            alt: rawVisitor.image?.alt || "Default visitor image", // Set a default alt text
        },

    };
};

module.exports = { normalizeVisitorForUpdate };