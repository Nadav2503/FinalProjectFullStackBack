const Animal = require("../animals/model/Animal");
const Exhibit = require("../exhibits/model/Exhibit");
const Review = require("../reviews/model/Review");
const Visitor = require("../visitors/model/Visitor");

const generateDemoData = async () => {
    try {
        // Generate and insert demo animals
        const demoAnimals = [
            {
                name: "Lion",
                type: "Mammal",
                gender: "male",
                age: 5,
                description: "King of the Jungle",
                diet: "carnivore",
                isEndangered: false,
                healthStatus: "Healthy",
                image: { url: "https://example.com/lion.jpg", alt: "Lion Image" }
            },
            {
                name: "Elephant",
                type: "Mammal",
                gender: "female",
                age: 10,
                description: "Largest land animal",
                diet: "herbivore",
                isEndangered: true,
                healthStatus: "Healthy",
                image: { url: "https://example.com/elephant.jpg", alt: "Elephant Image" }
            },
            {
                name: "Penguin",
                type: "Bird",
                gender: "female",
                age: 3,
                description: "A flightless bird native to the South Pole",
                diet: "omnivore",
                isEndangered: true,
                healthStatus: "Healthy",
                image: { url: "https://example.com/penguin.jpg", alt: "Penguin Image" }
            },
            {
                name: "Giraffe",
                type: "Mammal",
                gender: "male",
                age: 7,
                description: "Tallest land animal",
                diet: "herbivore",
                isEndangered: false,
                healthStatus: "Healthy",
                image: { url: "https://example.com/giraffe.jpg", alt: "Giraffe Image" }
            },
            {
                name: "Zebra",
                type: "Mammal",
                gender: "female",
                age: 4,
                description: "Striped horse-like animal",
                diet: "herbivore",
                isEndangered: false,
                healthStatus: "Healthy",
                image: { url: "https://example.com/zebra.jpg", alt: "Zebra Image" }
            }
        ];
        await Animal.insertMany(demoAnimals);

        // Generate and insert demo exhibits
        const demoExhibits = [
            {
                name: "Savannah",
                description: "Wide open grassland with few trees",
                location: "Africa",
                status: "open",
                capacity: 50
            },
            {
                name: "Jungle",
                description: "Tropical rainforest with dense vegetation",
                location: "Asia",
                status: "open",
                capacity: 40
            },
            {
                name: "Arctic",
                description: "Frozen tundra with snowy landscapes",
                location: "Antarctica",
                status: "open",
                capacity: 30
            },
            {
                name: "Desert",
                description: "Dry, arid landscape with little vegetation",
                location: "Australia",
                status: "open",
                capacity: 20
            },
            {
                name: "Coral Reef",
                description: "Vibrant underwater ecosystem with diverse marine life",
                location: "Australia",
                status: "open",
                capacity: 25
            }
        ];
        const exhibits = await Exhibit.insertMany(demoExhibits);

        // Link animals to exhibits
        const animals = await Animal.find({});
        await Exhibit.updateOne({ _id: exhibits[0]._id }, { $push: { animals: animals[0]._id, animals: animals[3]._id } });
        await Exhibit.updateOne({ _id: exhibits[1]._id }, { $push: { animals: animals[1]._id } });
        await Exhibit.updateOne({ _id: exhibits[2]._id }, { $push: { animals: animals[2]._id } });
        await Exhibit.updateOne({ _id: exhibits[3]._id }, { $push: { animals: animals[4]._id } });

        // Generate and insert demo visitors
        const demoVisitors = [
            {
                username: "john_doe",
                name: { first: "John", last: "Doe" },
                email: "john@example.com",
                password: "Password123!",
                membershipTier: "Tier 1 - Explorer",
                isAdmin: false,
                preferredAnimals: [],
                phone: "050-1234567",
                image: { url: "https://example.com/john.jpg", alt: "John Doe" }
            },
            {
                username: "jane_smith",
                name: { first: "Jane", last: "Smith" },
                email: "jane@example.com",
                password: "Password123@",
                membershipTier: "Tier 2 - Lionheart",
                isAdmin: false,
                preferredAnimals: [],
                phone: "052-2345678",
                image: { url: "https://example.com/jane.jpg", alt: "Jane Smith" }
            },
            {
                username: "susan_jones",
                name: { first: "Susan", last: "Jones" },
                email: "susan@example.com",
                password: "Password123#",
                membershipTier: "Tier 3 - Jungle king/queen",
                isAdmin: false,
                preferredAnimals: [],
                phone: "053-3456789",
                image: { url: "https://example.com/susan.jpg", alt: "Susan Jones" }
            },
            {
                username: "michael_brown",
                name: { first: "Michael", last: "Brown" },
                email: "michael@example.com",
                password: "Password123$",
                membershipTier: "Tier 4 - Safari leader",
                isAdmin: false,
                preferredAnimals: [],
                phone: "054-4567890",
                image: { url: "https://example.com/michael.jpg", alt: "Michael Brown" }
            },
            {
                username: "admin_user",
                name: { first: "Admin", last: "User" },
                email: "admin@example.com",
                password: "AdminPassword123!",
                membershipTier: "Tier 4 - Safari leader",
                isAdmin: true,
                preferredAnimals: [],
                phone: "050-0001234",
                image: { url: "https://example.com/admin.jpg", alt: "Admin User" }
            },
            {
                username: "alice_wilson",
                name: { first: "Alice", last: "Wilson" },
                email: "alice@example.com",
                password: "Password123%",
                membershipTier: "Tier 2 - Lionheart",
                isAdmin: false,
                preferredAnimals: [],
                phone: "055-6789012",
                image: { url: "https://example.com/alice.jpg", alt: "Alice Wilson" }
            }
        ];
        await Visitor.insertMany(demoVisitors);

        // Generate and insert demo reviews
        const visitors = await Visitor.find({});
        const demoReviews = [
            {
                visitorId: visitors[0]._id,
                animalId: animals[0]._id,
                rating: 5,
                comment: "Amazing experience watching the lions!",
                likes: []
            },
            {
                visitorId: visitors[1]._id,
                exhibitId: exhibits[0]._id,
                rating: 4,
                comment: "The savannah exhibit was amazing!",
                likes: []
            },
            {
                visitorId: visitors[2]._id,
                animalId: animals[2]._id,
                rating: 5,
                comment: "The penguin exhibit was a blast!",
                likes: []
            },
            {
                visitorId: visitors[3]._id,
                exhibitId: exhibits[1]._id,
                rating: 4,
                comment: "The jungle exhibit had fantastic animals!",
                likes: []
            },
            {
                visitorId: visitors[4]._id,
                animalId: animals[3]._id,
                rating: 4,
                comment: "Giraffes are amazing creatures!",
                likes: []
            }
        ];
        await Review.insertMany(demoReviews);

        console.log("Demo data generated successfully!");
    } catch (error) {
        console.error("Error generating demo data:", error);
    }
};

module.exports = generateDemoData;
