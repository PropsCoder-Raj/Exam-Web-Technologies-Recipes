const jwt = require("jsonwebtoken");

const getJwtToken = (id) => {
  console
  return jwt.sign( {id:id}, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRY)
  });
};

const cookieToken = async(user, res) => {
    const token = await getJwtToken(user.Id);
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