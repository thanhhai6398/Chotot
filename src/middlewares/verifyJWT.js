const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });
const STATUS_CODE = require('../utils/httpStatusCode');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(STATUS_CODE.FORBIDDEN).json({ errMsg: err.message });
    }
    console.log(decoded);
    req.phone = decoded.UserInfo.phone;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};
module.exports = verifyJWT;
