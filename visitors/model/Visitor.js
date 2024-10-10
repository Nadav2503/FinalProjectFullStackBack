const mongoose = require('mongoose');
const NAME = require('../../models/Name'); // Name schema
const { EMAIL, USERNAME, PHONE } = require('../../models/defaults'); // defaults schema
const IMAGE = require('../../models/Image'); // Image schema

// Define the Visitor schema
const visitorSchema = new mongoose.Schema({
    username: USERNAME,
    name: NAME,
    email: EMAIL,
    password: {
        type: String,
        required: true
    },
    membershipTier: {
        type: String,
        enum: ['Tier 1 - Explorer', 'Tier 2 - Lionheart', 'Tier 3 - Jungle king/queen', 'Tier 4 - Safari leader'],
        default: 'Tier 1 - explorer'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    preferredAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }], // Array of Animal IDs
    image: IMAGE,
    phone: PHONE,
});

// Create the Visitor model
const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
