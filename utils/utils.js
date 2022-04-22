require('dotenv').config();
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const jwtSignInscription = (inscription) => {
  return jwt.sign(
    { userID: inscription.user_id, name: inscription.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TIME_TO_LIVE }
  );
};

const sendEmail = async (email, html) => {
  try {
      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_AUTH_HOST,
      port: process.env.MAIL_AUTH_PORT,
      // secure: false, // true for 465, false for other ports
      secureConnection: process.env.MAIL_AUTH_SECURE,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_SECRET,
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM, // sender address
      to: email, // list of receivers
      subject: "Mail Confirmation", // Subject line
      html: html, // html body
    });
    console.log(`mail sended from ${info.envelope.from}, to: <${info.envelope.to}> `);
  } catch (error) {
    console.log(error);
  };
};


module.exports = { sendEmail, jwtSignInscription }