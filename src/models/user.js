'use strict';

require('dotenv').config();
// const uuid = require('uuid/v4');

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    userID: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    firstName: {  
      type: DataTypes.STRING,  
      required: true,  
    },  
    lastName: {  
      type: DataTypes.STRING,  
      required: true,  
    },  
    password: {  
      type: DataTypes.STRING,  
    },    
    role: {  
      type: DataTypes.STRING,  
    },  
    profilePic: {  
      type: DataTypes.BLOB,  
    }
  });
};


module.exports = userModel;