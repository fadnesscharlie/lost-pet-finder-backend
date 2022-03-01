'use strict';

// 3rd Party
const express = require('express');
const cors = require('cors');

// Middleware


// Error Handlers
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

// Prepare the express app
const app = express();

// Use the middleware
app.use(cors());
app.use(express.json());

// Routes 
// modularize later
app.get('/', (req, res) => { 
  res.status(200).send('You have reached the Wizard!');
});

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