const { DataTypes } = require('sequelize');
const DB = require('../config/dbConfig');

const Inscription = DB.define('Inscription', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  validated: {
    type: DataTypes.BOOLEAN
  },
  bearer_token: {
    type: DataTypes.STRING
  },
  validation_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},
{
  tableName: "inscription"
});

module.exports = Inscription;

