// // starting point of your application
// const express = require('express');
// const { adminAuth } = require('./middlewares/auth'); 

// const app = express();

// app.use("/admin", adminAuth);
// //how to handle diffrent routes
// app.use('/test', (req, res) => {
//     res.send("Hello from test123!!!") ;
// });

// // universal route for the application, code start matching from top to bottom order matters 
// app.use("/", (req, res) => {
//     res.send("Hello from Server!!!");
// });

// app.listen(3000, () => {
//     console.log("Server is successfully listen on port 3000");
// });

const express = require("express");
const connectDB =  require("./config/database"); // this file always run first connect with db then you should listen to requests
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Sahil",
        lastName: "Gupta",
        email: "sahil1995@gmail.com",
        password: "abc"
    };

    const user = new User(userObj); //creating new instance of user model

    await user.save(); // data will be save in db this function return a promise

    res.status(200).send("User Added Successfully")
});

connectDB().then(() => {
    console.log("Connected with DB")
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777");
    })
}).catch((err) => {
    console.error("Database cannot be connected!!");
});