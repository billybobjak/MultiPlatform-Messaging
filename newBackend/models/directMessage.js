const mongoose = require("mongoose");
const Chat = require("../models/chat").schema;


const directMessageSchema = mongoose.Schema({
    owner: {type : String, required: true},
    participants: {type: Array, required: true},
    chats: [{source: String, destination: String, content: String, timeSent: String}],
    lastSent: {type: String}
});

module.exports = mongoose.model('DirectMessage', directMessageSchema);