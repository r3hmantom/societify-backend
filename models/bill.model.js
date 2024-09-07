const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    // Define your bill schema fields here
    // For example:
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Add more fields as needed

    // Timestamps for createdAt and updatedAt
    timestamps: true
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;