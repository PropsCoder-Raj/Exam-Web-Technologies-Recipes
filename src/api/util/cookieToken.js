const jwt = require("jsonwebtoken");

const getJwtToken = (id, userType) => {
  return jwt.sign({ id: id, userType: userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const cookieToken = async(user, res) => {
    const token = await getJwtToken(user.Id, user.UserType);
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    user.Password = undefined;

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
      options
    });
  };
  
  module.exports = cookieToken;