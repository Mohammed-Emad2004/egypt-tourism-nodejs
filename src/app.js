const express = require('express');
const cors = require('cors');
const path = require('path');

require('./config/db');

const app = express();

const destinationRoute = require('./routes/destinationRoute');
const messageRoute = require('./routes/messageRoute');

const {
    getGallery
} = require('./controllers/destinationController');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/destinations', destinationRoute);

app.get('/api/gallery', getGallery);

app.use('/api/contact', messageRoute);

module.exports = app;