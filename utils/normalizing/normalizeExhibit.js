const normalizeExhibit = (rawExhibit) => {
    return {
        ...rawExhibit,  // Spread existing properties
        status: rawExhibit.status || 'open',  // Default status to 'open' if not provided
        animals: rawExhibit.animals || [],  // Default animals array to empty if not provided
    };
};

module.exports = { normalizeExhibit };