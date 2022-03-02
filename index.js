'use strict';

require('dotenv').config();

const PORT = process.env.PORT ? process.env.PORT : 3005;

// db files
const { db } = require('./src/models/index.js');

const server = require('./src/server.js');

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3005)
  })
  .catch(console.error)

// server.start(process.env.PORT || 3005);