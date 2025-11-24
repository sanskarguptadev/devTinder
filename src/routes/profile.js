const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");

profileRouter.get("/view", userAuth, async(req, res) => {
    try {    
        const user = req.user; 
    
        res.status(200).send(user);
    } catch(err) {
        res.status(400).send('Error :' + err.message)
    }
   
});

profileRouter.patch("/edit", userAuth, async(req, res) => {
    try {
        if(!validateProfileData(req)) {
            throw new Error("Invalid Profile Data")
        }

        const user = req.user;

        Object.keys(req.body).forEach((key) => user[key] = req.body[key]);

        console.log(user);

        await user.save();
        res.json({
            message: "Profile Updated",
            updatedProfile: user
        });

    } catch(err) {
        res.status(400).send("Error :" + err.message);
    }
})

module.exports = profileRouter;
