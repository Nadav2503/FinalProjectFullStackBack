const defaultAnimalImageUrl = "/images/placeholderAnimalPicture.webp"; // Path to default animal image

const normalizeAnimal = (rawAnimal) => {
    return {
        ...rawAnimal,  // Spread existing properties
        image: {
            url: rawAnimal.image?.url || defaultAnimalImageUrl, // Use the default animal image if no specific image URL is provided
            alt: rawAnimal.image?.alt || "Default animal image", // Set a default alt text
        },
        healthStatus: rawAnimal.healthStatus || "Unknown", // Set a default health status if not provided
    };
};

module.exports = { normalizeAnimal };
