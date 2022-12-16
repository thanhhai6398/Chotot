const STATUS_CODE = require('../utils/httpStatusCode');

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }
    const roles = [...allowedRoles];
    const result = req.roles
      .map((role) => roles.includes(role))
      .find((val) => val === true);
    if (!result) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }
    next();
  };
};

module.exports = verifyRoles;
