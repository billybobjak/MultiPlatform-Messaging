const express = require("express");
const router = express.Router();
const todoController = require("../controllers/chat");

router.post('/new-user', todoController.createUser);

router.post('/get-user', todoController.getUserByUsername);

router.post('/get-chats', todoController.getChatsByUsername);

router.post('/new-direct-message', todoController.createDirectMessage);

router.post('/add-message', todoController.addMessageToChat)

router.post('/get-direct-message-chats', todoController.getDirectMessageChat)

router.post('/search-users', todoController.searchUsers)

module.exports = router;
