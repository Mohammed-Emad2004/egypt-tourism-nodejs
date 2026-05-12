const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    id: Number,
    name: String,
    city: String,
    category: String,
    image: String,
    description: String,
    bestTime: String
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;