const fs = require("fs");
const { QueryTypes } = require('sequelize');
const Inscription = require('../Models/Inscription');
const DB = require('../config/dbConfig');
const { isValidPassword } = require("./user");
const { sendEmail, jwtSignInscription } = require("../utils/utils.js");
const plugin = require("../utils/mail_templates/mail_plugin");

const getAllInscriptions = async () => {
  try {
    var inscriptions = await DB.query("SELECT * FROM inscription", { type: QueryTypes.SELECT });
  } catch (error) {
    console.log(error.message);
  };
  return inscriptions;
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ error: "UNAUTHORIZED_ERROR: Please check your inputs", userInfos: req.body });
  };
  try {
    var [inscription] = await DB.query(`SELECT * FROM inscription where email='${req.body.email}'`, { type: QueryTypes.SELECT });
  } catch (error) {
    console.log(error.message);
  };
  if (inscription === undefined) {
    return res.status(404).json({ error: "DB_NOT_FOUND ERROR: No registred user has such email" });
  };
  const isValidPWD = await isValidPassword({user_id: inscription.user_id, entredPassword: req.body.password});
  if (!isValidPWD) {
    return res.status(401).json({ error: "Invalid password" });
  };
  let allInscriptions = await DB.query(`SELECT name, lastname, email, validated  FROM inscription`, { type: QueryTypes.SELECT });
  res.status(202).json({
    allInscriptions
  });
};

const validateInscription = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please provide a user email" });
  };
  var k = await DB.query(`SELECT * FROM inscription where email='${email}';`, { type: QueryTypes.SELECT });
  console.log("===================validate===========");
  console.log(k);
  console.log("===================/validate===========");
  if (inscription) {
    inscription = await DB.query(`UPDATE inscription SET bearer_token=${token} WHERE email='${email}';`, { type: QueryTypes.SELECT });
  };
  try {
    const html = plugin.template();
    await sendEmail(email, html);
    return res
      .status(200)
      .json({
        message:
          "An confirmation token is sent to your inbox, Please check your email",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const sendToken = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please provide a user email" });
  };
  try {
    var k = await DB.query(`SELECT * FROM inscription where email='${req.body.email}'`, { type: QueryTypes.SELECT });
    console.log(k);
    const token = jwtSignInscription(inscription);
    if (inscription) {
      inscription = await DB.query(`UPDATE inscription SET bearer_token=${token} WHERE email='${req.body.email}'`, { type: QueryTypes.SELECT });
      console.log(inscription);
    };
    const html = plugin.template(token);
    await sendEmail(email, html);
    // missed updates of validated field
    res
      .status(200)
      .json({
        message:
          "A bearer token is sent to your inbox, Please check your email",
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllInscriptions,
  login,
  validateInscription,
  sendToken
};
