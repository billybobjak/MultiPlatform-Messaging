const mongoose = require("mongoose");

// Schema for a chat
const chatSchema = mongoose.Schema({
    source: {type: String, required: true},
    destination: {type: String, required: true},
    content: {type: String, required: true},
    timeSent: {type: String}

});

module.exports = mongoose.model('Chat', chatSchema);
