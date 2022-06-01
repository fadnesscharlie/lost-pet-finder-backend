"use strict";

// 3rd Party
const express = require("express");
const cors = require('cors');

// Route Imports
const authRoutes = require("./auth/authRoutes");

// Routes
const userRoutes = require("./routes/user");
const petRoutes = require("./routes/pet");
const commentRoutes = require("./routes/comment");
const markerRoutes = require("./routes/marker");

// Error Handlers
const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");

// Prepare the express app
const app = express();

// Use the middleware

// Creates your own cors middleware?
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

// Routes
app.use(authRoutes);
// modularize later
app.get("/", (req, res) => {
  res.status(200).send("You have reached the Wizard! Whoo!");
});
app.get("/bad", (req, res) => {
  res.status(404).send({ notFound });
});

// Routes
app.use(userRoutes);
app.use(petRoutes);
app.use(commentRoutes);
app.use(markerRoutes);

// Catchalls
app.use("*", notFound);
app.use(errorHandler);

// Start
module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error("Not the Mama!");
    }
    app.listen(port, () => {
      console.log(`Server up on ${port}`);
    });
  },
};
