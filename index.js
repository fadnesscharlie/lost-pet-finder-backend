'use strict';

require('dotenv').config();

const PORT = process.env.PORT ? process.env.PORT : 3005;

// db files
const { db } = require('./src/models/index.js');

const server = require('./src/server.js');

// connect to db and start server
db.sync()
  .then(() => {
    server.start(process.env.PORT || 3005)
  })
  .catch(console.error)

// server.start(process.env.PORT || 3005);