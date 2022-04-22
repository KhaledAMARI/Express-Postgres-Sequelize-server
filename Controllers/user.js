const User = require("../Models/User");


const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.findAll();
  } catch (error) {
    console.log(error.message);
  };
  res.status(200).json({users});
};

const isValidPassword = async ({user_id, entredPassword}) => {
  const user = await User.findOne({ where: {user_id}});
  if (!user) {
    return false;
  };
  return user.password === entredPassword;
};

module.exports = { isValidPassword, getAllUsers };
