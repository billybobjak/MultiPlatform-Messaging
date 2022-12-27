const express = require("express");
const serverless = require('serverless-http');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const chatRoutes = require("./routes/chats.js");
const { mongooseLogin } = require("./keys.js");

main()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongooseLogin);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use("", chatRoutes);

module.exports.handler = serverless(app);


 // Used only for local testing
 app.listen(8080, () => {
     console.log("listening on port 8080")
 });