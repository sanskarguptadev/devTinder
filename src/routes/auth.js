const express = require("express");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require('../models/user');
const validator = require('validator');

const authRouter = express.Router();

// app.get and router.get works same
authRouter.post("/signup", async (req, res) => {
  //   console.log(req.body); //data you are sending here but you can't directly ready here, req.body -> undefined because data is sent in json format and our server is not able to read the json data to read that json we need a middle ware
  //   // will be used in all the api -> already middleware by express called expressJson Middleware
  //   const user = new User(req.body); //creating new instance of user model

  try {
    // validation of data
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    // Encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save(); //data will be save in db this function return a promise

    res.status(200).send("User Added Successfully");
  } catch (err) {
    res.status(400).json({
      error: err.message,
      code: err.code || "VALIDATION_FAILED",
    });
  }
});

authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if(!validator.isEmail(email)) {
          throw new Error("Enter valid mail Id");
      }
  
      const user = await User.findOne({ email: email });
  
      if(!user) {
          throw new Error("Invalid Username or Password");
      }
  
      const isPasswordValid = await user.validatePassword(password);
   
      if(isPasswordValid) {
          // cookie work
          // create a JWT token
          const token = await user.getJWT();
          // Add the token to cookie and send the response back to user
          res.cookie("token", token, { httpOnly: true });
          res.status(200).send('user login successfully');
      } else {
          res.status(200).send('Invalid Username or Password');
      }
    } catch (err) {
      res.status(400).json({
        error: err.message,
        code: err.code || "VALIDATION_FAILED",
      });
    }
  });

  authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });

    res.status(200).send("Logout successfully")
  });

module.exports = authRouter;
 