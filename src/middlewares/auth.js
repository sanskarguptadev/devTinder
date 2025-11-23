const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const adminAuth = (req, res, next) => {
//     const token = 'xyz';
//     const isAdminAuthorized = token === 'xyz';

//     if(!isAdminAuthorized) {
//         res.status(401).send("Unauthorized Request");
//     }
//     next();
// }

const userAuth = async (req, res, next) => {
   try {
     // read the token

     const { token } = req.cookies;

     console.log(":>", !token)

     if(!token) {
        throw new Error("Token not found")
     }

     // validate the token
    const decodedObj = await jwt.verify(token, "DEV")
    // find the user

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if(!user) {
        throw new Error("User not found");
    }

    req.user = user;

    next();
   } catch(err) {
        res.status(400).send("Error" + err);
   }
}

module.exports = {
    userAuth,
}