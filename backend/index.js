require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Message Schema
const MessageSchema = new mongoose.Schema({
    wa_id: String,
    name: String,
    text: String,
    fromMe: Boolean,
    timestamp: Date,
    status: String
});
const Message = mongoose.model('Message', MessageSchema);

// ✅ Get All Messages
app.get('/messages', async (req, res) => {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
});

// ✅ Send Message
app.post('/messages', async (req, res) => {
    try {
        const newMessage = new Message({
            wa_id: req.body.wa_id || "919876543210",
            name: req.body.name || "Ridhi",
            text: req.body.text,
            fromMe: req.body.fromMe || true,
            timestamp: new Date(),
            status: "sent"
        });

        await newMessage.save();
        res.status(201).json({ success: true, message: "Message sent!", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});