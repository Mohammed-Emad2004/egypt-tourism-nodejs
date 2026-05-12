const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const defaultUri = 'mongodb://127.0.0.1:27017/egypt_tourism';
const mongoUri = process.env.MONGO_URI && process.env.MONGO_URI.length > 0 ? process.env.MONGO_URI : defaultUri;

mongoose.connect(mongoUri)
    .then(() => {
        console.log(`Connected to MongoDB (${mongoUri.startsWith('mongodb://127.0.0.1') ? 'local' : 'remote'}) successfully!`);
    })
    .catch((error) => {
        console.error('✗ Error connecting to MongoDB:', error);
    });