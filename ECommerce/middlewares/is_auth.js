const jwt = require("jsonwebtoken");
const key = require("../utils/keys");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorised, you must login to continue" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, key.Secret_Key);
  } catch (err) {
    return res.status(500).json({ message: "Token Doesn't match, Try again" });
  }
  if (!decodedToken) {
    return res
      .status(401)
      .json({ message: "Unauthorised, you must login to continue" });
  }
  req.id = decodedToken.id;
  req.email = decodedToken.email;
  next();
};
