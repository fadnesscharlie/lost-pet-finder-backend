'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const uuid = require('uuid/v4');

const SECRET = process.env.SECRET;

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    userID: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    username: {
      type: DataTypes.STRING,
      // required: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: false,
    },
    lastName: {
      type: DataTypes.STRING,
      required: false,
    },
    email: {
      type: DataTypes.STRING,
      required: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          { username: this.username }, 
          SECRET, 
          // { expiresIn: '15m' }
          );
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
      required: true, defaultValue: 'user'
    },
    profilePic: {
      type: DataTypes.BLOB,
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message)
    }
  };

  return model;

};

module.exports = userModel;
