// starting point of your application
const express = require('express');

const app = express();
//how to handle diffrent routes
app.use('/test', (req, res) => {
    res.send("Hello from test123!!!");
});

// universal route for the application
app.use("/", (req, res) => {
    res.send("Hello from Server!!!");
});

app.listen(3000, () => {
    console.log("Server is successfully listen on port 3000");
});