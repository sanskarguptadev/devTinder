const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      validate: {
        validator: function (v) {
          return /^[A-Za-z]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid first name!`,
      },
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error("Invalid Email:"+ value); 
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is default description",
    },
    skills: {
      type: [String], //schema has array by default it will create empty space
    },
  },
  {
    timestamps: true, //timestamps helps in finding when user is registered for the first time
  }
);


//schema methods
userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DEV", {
        expiresIn: "1d",
    });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;

    const result = await bcrypt.compare(passwordInputByUser, user.password);

    return result;
}

// mongoose model
const User = mongoose.model("User", userSchema); // Model name should start from capital letter this act as class
module.exports = User;
