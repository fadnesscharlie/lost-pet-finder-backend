'use strict';

require('dotenv').config();

const commentModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Comments', {
    commentID: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    commentText: {  
      type: DataTypes.STRING,  
    }, 
    userID: {
      type: DataTypes.UUID,
      required: true
    }, 
    petId: {  
      type: DataTypes.UUID,  
    },
    reply: {  
      type: DataTypes.BOOLEAN,
    }  
  });
  return model
};


module.exports = commentModel;
