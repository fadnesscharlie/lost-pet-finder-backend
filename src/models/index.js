'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user.js');
const petModel = require('./pet.js');
const commentModel = require('./comment.js');
const mapMarkerModel = require('./mapMarker.js');

// heroku deployed production url
const HEROKU_POSTGRESQL_GREEN_URL =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.HEROKU_POSTGRESQL_GREEN_URL;

// locally deployed url 
// const DATABASE_URL =
  // process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const sequelizeOptions =
  process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

// heroku deployed db
const sequelize = new Sequelize(HEROKU_POSTGRESQL_GREEN_URL, sequelizeOptions);

// locally deployed db    
// const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  pets: petModel(sequelize, DataTypes),
  comments: commentModel(sequelize, DataTypes),
  markers: mapMarkerModel(sequelize, DataTypes)
};
