const defaultVisitorImageUrl = "/images/placeholderVisitorPicture.png"; // Path to default visitor image

const normalizeVisitor = (rawVisitor) => {
    return {
        ...rawVisitor,  // Spread existing properties to retain all visitor fields
        image: {
            url: rawAnimal.image?.url || defaultVisitorImageUrl, // Use the default visitor image if no specific image URL is provided
            alt: rawAnimal.image?.alt || "Default visitor image", // Set a default alt text
        },
        membershipTier: rawVisitor.membershipTier || 'Tier 1 - Explorer', // Default to 'Tier 1 - Explorer' if not specified
        preferredAnimals: rawVisitor.preferredAnimals || [],  // Default 'preferredAnimals' to an empty array if not provided
        isAdmin: rawVisitor.isAdmin || false, // Default 'isAdmin' to false if not provided
    };
};

module.exports = { normalizeVisitor };