const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/db');
const Destination = require('./models/destination');
const Message = require('./models/message');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/destinations', async (req, res) => {
    const destinations = await Destination.find();
    res.json(destinations);
});

app.get('/api/gallery', async (req, res) => {
    const gallery = await Destination.find();
    res.json(gallery);
});

app.get('/api/destinations/:id', async (req, res) => {
    const place = await Destination.findOne({ id: parseInt(req.params.id) });
    res.json(place);
});

app.post('/api/contact', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.json({ success: true, message: "تم استلام رسالتك بنجاح!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "حدث خطأ أثناء الإرسال" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));