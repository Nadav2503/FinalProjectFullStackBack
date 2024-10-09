// Function to get the current time in a structured format
const currentTime = () => {
    const now = new Date(); // Get the current date and time

    // Extract year, month, day, hours, minutes, seconds, and day name
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Get the name of the day
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[now.getDay()]; // Get the day of the week (0-6)

    // Return an object containing the current time and day name
    return { year, month, day, hours, minutes, seconds, dayName };
};

// Export the currentTime function
module.exports = { currentTime };
