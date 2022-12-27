const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    source: {type: String, required: true},
    destination: {type: String, required: true},
    content: {type: String, required: true},
    timeSent: {type: String}

});

module.exports = mongoose.model('Chat', chatSchema);
