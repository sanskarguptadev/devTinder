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

app.use(express.json()); // middleware will be actived for all the routes

app.post("/signup", async (req, res) => {
    console.log(req.body); //data you are sending here but you can't directly ready here, req.body -> undefined because data is sent in json format and our server is not able to read the json data to read that json we need a middle ware
    // will be used in all the api -> already middleware by express called expressJson Middleware
    const user = new User(req.body); //creating new instance of user model

    try {
        await user.save(); //data will be save in db this function return a promise

        res.status(200).send("User Added Successfully")
    } catch (err) {
        res.status(400).json({
            error: err.message,
            code: err.code || "VALIDATION_FAILED",
            details: err.errors || err
        });
    }
    
});

// get user by email

app.get("/user", async(req, res) => {
    const userEmail = req.body.email;
    try {
       const user = await User.findOne({ email: userEmail }).exec();
       if(user.length === 0) {
        res.status(200).send("No User Found")
       }
       res.send(user);
    } catch(err) {
        res.status(400).send( err);
    }
});

app.get("/feed", async(req, res) => {
    try {
        const users = await User.find({});

        res.send(users)
    } catch(err) {
        res.status(401).send("error found", err);
    }
});

connectDB().then(() => {
    console.log("Connected with DB")
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777");
    })
}).catch((err) => {
    console.error("Database cannot be connected!!");
});