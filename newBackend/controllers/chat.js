const Chat = require("../models/chat");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const DirectMessage = require("../models/directMessage");
const mongoose = require('mongoose')
const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json");

// Create admin credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });


// Creates an item
exports.createUser = (req, res, next) => {  
        
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            notifToken: ""
        });
        
        
        user
            .save()
            .then((result) => {
                
                res.status(201).json({
                    
                    message: "User added successfully",
                    post: {
                        ...result,
                        id: result._id,
                    },
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Email already in use!',
                    
                });
            });
};

// Retrieve the user with username and password
exports.getUserByUsername = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then((post) => {
            if (post) {
                post.comparePassword(req.body.password, (err, isMatch) => {
                    if (!isMatch) {
                        res.status(404).json({ message: "Incorrect Password!"});
                    }
                    else {
                        
                        User.findOneAndUpdate({username: req.body.username}, { $set: {"notifToken": req.body.token}}, {upsert: true}, function(err, success) {
                            if (err) {
                                console.log(err)
                            }
                        })
                        res.status(200).json(post);
                    }

                })

            } else {
                res.status(404).json({ message: "User not found!"});
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Fetching user failed!",
            });
        });
        
};

// Return searched users
exports.searchUsers = (req, res, next) => {
    let results = []
    User.find({ "username": { "$regex": req.body.searchUsername, "$options": "i"}}, function(err, users) {
        
        for (let i = 0; i < users.length; i++) {
            results[i] = users[i].username
        }
        if (results.length === 0) {
            return res.status(200).json(results);
        }

        const isEqual = (element) => element === req.body.searchUsername
        let hit = results.findIndex(isEqual)
        if (hit !== -1) {
            let prev = results[0]
            results[0] = results[hit]
            results[hit] = results[0]
        }

        return res.status(200).json(results);
    }).limit(5);
}

// Create a new direct message
exports.createDirectMessage = (req, res, next) => {
    User.findOne({username: req.body.hostUsername})
        .then((host) => {
            if (host) {
                User.findOne({username: req.body.guestUsername})
                    .then((guest) => {
                        if (guest) {

                            DirectMessage.find( {participants: {$all: [req.body.guestUsername, req.body.hostUsername]}})
                            .then((existing) => {
                                console.log(existing)
                                if (existing.length !== 0) {
                                    res.status(400).json({ message: "Chat already exists!"});
                                }
                                else {

                                

                                const directMessage = new DirectMessage({
                                    owner: req.body.hostUsername,
                                    participants: [req.body.hostUsername, req.body.guestUsername],
                                    chats: []
                                })
                                    directMessage
                                    .save()
                                    .then((result) => {
                                        
                                        res.status(201).json({
                                            
                                            message: "Direct Message added successfully",
                                            post: {
                                                ...result,
                                                id: result._id,
                                            },
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(500).json({
                                            message: 'Unknown error',
                                            
                                        });
                                    });
                                }
                            })
                        }
                        else {
                            res.status(404).json({ message: "Guest user not found!"});
                        }
                    })
            }
            else {
                res.status(404).json({ message: "Host user not found!"});
            }
        })
}

// Get chats by username
exports.getChatsByUsername = (req, res, next) => {
    let directMessages = []
    User.findOne({username: req.body.username})
        .then((user) => {
            if (user) {
                if (req.body.password !== user.password) {
                    return res.status(404).json({ message: "Incorrect Password"});
                }
                else {
                    DirectMessage.find({participants: {$in: req.body.username}}).sort({lastSent: "descending"})
                    .then((result) => {
                        
                        for (let i = 0; i < result.length; i++) {
                            if(result[i].participants[0] === req.body.username) {
                                directMessages.push(result[i].participants[1])
                            }
                            else {
                                directMessages.push(result[i].participants[0]);
                            }
                            
                        }
                        return res.status(200).json({
                                
                            message: "Direct Messages Returned",
                            post: {
                                ...directMessages,
                                id: result._id,
                            },
                        });

                    })
                    .catch((err) => {
                        return res.status(500).json({
                            message: 'Unknown error',
                            
                        });
                    })
                }

            } else {
                return res.status(404).json({ message: "User not found!"});
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Fetching user failed!",
            });

        });
}

// Add a new message to the chat
exports.addMessageToChat = (req, res, next) => {
    let time = Date.now();
    DirectMessage.findOneAndUpdate( {participants: {$all: [req.body.source, req.body.destination]}}, 
        {
            $set:{ 
                lastSent: time
            }, 
                
            $push:{
                chats: {source: req.body.source, destination: req.body.destination, content: req.body.content, timeSent: time}
            }
            
        
        }, function(err, success) {

        if (err) {
            res.status(500).json({
                message: 'Unknown error',
                
            });
        }
        else {
            User.findOne({username: req.body.destination})

                .then((post) => {

                    sendNotification(post.notifToken, null, "New Message", req.body.source + ": " + req.body.content)
                    res.status(201).json({
                                   
                        message: "Message sent successfully",
                        
                    });
                })
        }
    })
        
}

// Get existing direct message chats from a user
exports.getDirectMessageChat = (req, res, next) => {
    DirectMessage.findOne( {participants: {$all: [req.body.userOne, req.body.userTwo]}})
    .then((dm) => {
        if (dm) {
            console.log(dm.chats)
            res.status(200).json({
                                
                message: "Direct Message Chats Returned",
                post: {
                    ...dm.chats,
                    id: dm._id,
                },
            });
        }
        else {
            res.status(500).json({
                message: 'Chat not found',
                
            });    

        }
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Unknown error',
            
        });
    }) 
}


// Send a notification
const sendNotification =  function(deviceToken, topic, title, body) {

      const message = {
        notification: {
            title: title,
            body: body
          },
        data: {
        },
        token: deviceToken
      };


  admin.messaging().send(message)
  .then((response) => {

    console.log('Successfully sent message:', response);
    return
  })
  .catch((error) => {
    console.log('Error sending message:', error);
    return
  });
 }
