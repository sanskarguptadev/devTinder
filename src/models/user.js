const mongoose = require("mongoose");
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
      validate: {
        validator: function (v) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
            const err = new Error("Invalid email format");
            err.code = "EMAIL_INVALID_001";
            throw err;
          }
          return true;
        },
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

// mongoose model

const User = mongoose.model("User", userSchema); // Model name should start from capital letter this act as class
module.exports = User;
