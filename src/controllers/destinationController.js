const Destination = require('../models/destination');

exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDestinationById = async (req, res) => {
    try {
        const place = await Destination.findOne({
            id: parseInt(req.params.id)
        });

        res.json(place);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGallery = async (req, res) => {
    try {
        const gallery = await Destination.find();
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};