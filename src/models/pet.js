'use strict';

require('dotenv').config();

const petModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Pets', {
    petID: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    petName: {
      type: DataTypes.STRING,
      required: true,
    },
    userID: {
      type: DataTypes.UUID,
      required: true
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    image: {
      type: DataTypes.BLOB,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    breed: {
      type: DataTypes.STRING,
    },
    lostLocation: {
      type: DataTypes.STRING,
      required: true,
    },
    lastLocation: {
      type: DataTypes.STRING,
    },
    trackerChip: {
      type: DataTypes.BOOLEAN,
    },
    reward: {
      type: DataTypes.INTEGER,
    }
  });
};

module.exports = petModel;