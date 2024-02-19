// modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// import files
const frontRoutes = require('./routes/front.route');

// app instance
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'hbs');

// routes
app.use(frontRoutes);

// database connect
mongoose
    .connect("mongodb://127.0.0.1:27017/wd11amcrud")
    .then(function() {
        console.log("Database connected");
    })
    .catch(function(err) {
        console.log(err.message)
    })

// server listen
app.listen(8000, function() {
    console.log("server is listening on 8000")
})