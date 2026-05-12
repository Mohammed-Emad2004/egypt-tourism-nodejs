const Review = require('../models/review');

exports.addReview = async (req, res) => {
    try {
        const review = new Review(req.body);

        await review.save();

        res.status(201).json(review);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();

        res.json(reviews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};