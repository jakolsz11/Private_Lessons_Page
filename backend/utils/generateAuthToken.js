const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastName, email, phoneNumber, isAdmin) => {
  return jwt.sign(
    {_id, name, lastName, email, phoneNumber, isAdmin},
    process.env.JWT_SECRET_KEY,
    {expiresIn: "12h"}
  );
};

module.exports = generateAuthToken;
