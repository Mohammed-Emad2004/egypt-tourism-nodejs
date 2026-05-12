const express = require('express');
const cors = require('cors');
const path = require('path');

require('./config/db');

const app = express();

const destinationRoutes = require('./routes/destinationRoutes');
const messageRoutes = require('./routes/messageRoutes');

const {
    getGallery
} = require('./controllers/destinationController');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/destinations', destinationRoutes);

app.get('/api/gallery', getGallery);

app.use('/api/contact', messageRoutes);

module.exports = app;