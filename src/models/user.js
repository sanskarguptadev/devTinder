const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 20,
        validate: {
            validator: function (v) {
                return /^[A-Za-z]+$/.test(v);
            },
            message: props => `${props.value} is not a valid first name!`
        }
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
                    const err = new Error("Invalid email format");
                    err.code = "EMAIL_INVALID_001";   
                    throw err;                     
                }
                return true;
            }
        }
    },
    password: {
        type: String,
        minlength: 3,
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

// mongoose model

const User = mongoose.model("User", userSchema); // Model name should start from capital letter this act as class
module.exports = User;