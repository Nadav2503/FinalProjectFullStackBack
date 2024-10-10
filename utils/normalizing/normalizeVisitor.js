const normalizeVisitor = (rawVisitor) => {
    return {
        ...rawVisitor,  // Spread existing properties to retain all visitor fields
        membershipTier: rawVisitor.membershipTier || 'Tier 1 - Explorer', // Default to 'Tier 1 - Explorer' if not specified
        preferredAnimals: rawVisitor.preferredAnimals || [],  // Default 'preferredAnimals' to an empty array if not provided
        isAdmin: rawVisitor.isAdmin || false, // Default 'isAdmin' to false if not provided
    };
};

module.exports = { normalizeVisitor };