'use strict';

// 3rd Party
const express = require('express');
const cors = require('cors');

// Route Imports
const authRoutes = require('./auth/authRoutes')

// Routes
const userRoutes = require('./routes/user')
const petRoutes = require('./routes/pet')
const commentRoutes = require('./routes/comment')

// Error Handlers
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

// Prepare the express app
const app = express();

// Use the middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(authRoutes);
// modularize later
app.get('/', (req, res) => { 
  res.status(200).send('You have reached the Wizard!');
});

// Routes
app.use(userRoutes)
app.use(petRoutes)
app.use(commentRoutes)

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

// Start
module.exports = {
  server: app,
  start: port => {
    if(!port) {
      throw new Error('Not the Mama!');
    }
    app.listen(port, () => {
      console.log(`Server up on ${port}`);
    });
  }
}
