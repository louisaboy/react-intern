// Imported required packages
require('dotenv').config({ path: '.env.sample' });
const port = process.env.PORT || 3001;
const path = require("path");

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

// NOT SURE KUNG ILALAGAY PA
// var route = require('./routes/route')


// Created express server
const app = express();

// need middleware to check all the data coming in and out
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const mongoDatabase = process.env.MONGO_URI

mongoose.connect(mongoDatabase).catch(err => console.log(err));

var route = require('./routes/routes')

app.use("/", route);

// app.get("/api", (req, res) => {
//     res.send("test");
// });

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }

        }
    )
});

app.listen(process.env.PORT || 3001, function () {
    console.log(`Server is running on port: ${port}`);
    console.log(`Connected Database: ${mongoDatabase}`);
});

module.export = app;