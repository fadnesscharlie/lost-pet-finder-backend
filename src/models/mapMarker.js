'use strict';

require('dotenv').config();

const mapMarkerModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Markers', {
    lat: {
      type: DataTypes.DECIMAL,
      require: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      required: true,
    },
    petID: {
      type: DataTypes.STRING,
      required: true
    },
    time: {
      type: DataTypes.STRING,
      required: true,
    }
  });
  return model
};

module.exports = mapMarkerModel;
