require('dotenv').config();
const mongoose = require('mongoose');

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

// ✅ Connect & Insert
async function createTestMessage() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");

        const msg = new Message({
            wa_id: "919876543210",
            name: "Ridhi",
            text: "Hello from test script 👋",
            fromMe: true,
            timestamp: new Date(),
            status: "sent"
        });

        await msg.save();
        console.log("✅ Test message inserted:", msg);

        mongoose.disconnect();
    } catch (error) {
        console.error("❌ Error inserting message:", error);
    }
}

createTestMessage();