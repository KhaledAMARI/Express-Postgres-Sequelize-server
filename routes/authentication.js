const express = require("express");
const router = express.Router();


const {
  getAllInscriptions,
  login,
  validateInscription,
  sendToken
} = require("../Controllers/authentication");


router.get("/", getAllInscriptions);
router.post("/login", login);
router.post("/inscription/validation", validateInscription);
router.post("/inscription/send_token", sendToken);

module.exports = router;