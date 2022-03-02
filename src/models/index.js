'use strict';

require('dotenv').config();
const {  Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user.js');
const petModel = require('./pet.js');
const commentModel = require('./comment.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  pets: petModel(sequelize, DataTypes),
  comments: commentModel(sequelize, DataTypes)
};