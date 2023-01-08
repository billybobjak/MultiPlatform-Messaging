const express = require("express");
const router = express.Router();
const todoController = require("../controllers/chat");

// Create a user
router.post('/new-user', todoController.createUser);

// Get a user
router.post('/get-user', todoController.getUserByUsername);

// Get chats
router.post('/get-chats', todoController.getChatsByUsername);

// Create a new direct message
router.post('/new-direct-message', todoController.createDirectMessage);

// Add a new message to chat
router.post('/add-message', todoController.addMessageToChat)

// Get direct message chats
router.post('/get-direct-message-chats', todoController.getDirectMessageChat)

// Search users
router.post('/search-users', todoController.searchUsers)

module.exports = router;
