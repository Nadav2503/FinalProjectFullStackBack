const normalizeAnimal = (rawAnimal) => {
    return {
        ...rawAnimal,  // Spread existing properties
        image: {
            url: rawAnimal.image?.url || "https://default-animal-image-url.com/default.jpg", // Set a default image URL
            alt: rawAnimal.image?.alt || "Default animal image", // Set a default alt text
        },
        healthStatus: rawAnimal.healthStatus || "Unknown", // Set a default health status if not provided
    };
};

module.exports = { normalizeAnimal };