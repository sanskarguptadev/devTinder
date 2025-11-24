const express = require("express");
const connectDB = require("./config/database"); // this file always run first connect with db then you should listen to requests
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json()); // middleware will be actived for all the routes
app.use(cookieParser()); // middle ware to read the cookies

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const request = require('./routes/request');

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", request)

connectDB()
  .then(() => {
    console.log("Connected with DB");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
