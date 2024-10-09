const { DEFAULT_VALIDATION } = require("../../models/defaults");

const exhibitSchema = new mongoose.Schema({
    name: {
        ...DEFAULT_VALIDATION,
        unique: true,
    },
    description: DEFAULT_VALIDATION,
    location: {
        type: String,
        required: true,
        enum: ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica'],
    },
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true, // Can still be an empty array
    }],
    status: {
        type: String,
        enum: ['open', 'closed', 'under maintenance'],
        default: 'open',
        required: true,
    },
    capacity: {
        type: Number,
        required: true, // Ensure maximum capacity is set
        min: 0, // Minimum capacity can be 0
        max: 100, // maximum capacity
    },
});

// Create the model
const Exhibit = mongoose.model('Exhibit', exhibitSchema);

module.exports = Exhibit;
