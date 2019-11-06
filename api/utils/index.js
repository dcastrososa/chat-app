const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("./../models");

/**
 * Returns the user from the token.
 * @param {String} token, Encoded token.
 * @returns {Object}
 */
const getUserFromToken = async token => {
  const decoded = jwt.verify(token, config.secret);
  const { email } = decoded;

  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = { getUserFromToken };
