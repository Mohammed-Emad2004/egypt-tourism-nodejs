const express = require('express');
const router = express.Router();

const {
    getAllDestinations,
    getDestinationById,
    getGallery
} = require('../controllers/destinationController');

router.get('/', getAllDestinations);

router.get('/gallery/all', getGallery);

router.get('/:id', getDestinationById);

module.exports = router;