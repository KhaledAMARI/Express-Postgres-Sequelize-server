const { DataTypes } = require('sequelize');
const DB = require('../config/dbConfig');

const User = DB.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: "users"
})

module.exports = User;

// const bcrypt = require("bcryptjs");
// const crypto = require('crypto');
// const jwt = require("jsonwebtoken");


// UserSchema.pre("save", async function () {
//   const SALT_FACTOR = 10;
//   const salt = await bcrypt.genSalt(SALT_FACTOR);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.jwtSignUser = function () {
//   return jwt.sign(
//     { userID: this._id, name: this.name },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_TIME_TO_LIVE }
//   );
// };

// UserSchema.methods.confirmationEmailToken = function (size = 4) {
//     return crypto.randomBytes(size).toString('hex');
// };

// UserSchema.methods.isValidPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

