// Function to get the current time in a structured format
const currentTime = () => {
    const now = new Date(); // Get the current date and time

    // Extract year, month, day, hours, minutes, and seconds
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Return an object containing the current time
    return { year, month, day, hours, minutes, seconds };
};

// Export the currentTime function
module.exports = { currentTime };
