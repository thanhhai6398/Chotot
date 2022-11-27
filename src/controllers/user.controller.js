const mongoose = require('mongoose');
const User = require('../models/user.model');
const STATUS_CODE = require('../utils/httpStatusCode');
const ROLE = require('../utils/role_list');

const getAll = async (req, res) => {
  return User.find()
    .then((data) => res.status(STATUS_CODE.OK).json({ data }))
    .catch((err) =>
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ errMsg: err.message })
    );
};
const getById = (req, res) => {
  const { id } = req.params;
  if (id) {
    User.findById(id)
      .then((data) => res.status(STATUS_CODE.OK).json({ data }))
      .catch((err) =>
        res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ errMsg: err.message })
      );
  }
};
const update = async (req, res) => {
  const { id } = req.params;
  const { username, password, phone, address, email } = req.body;
  const oldUser = User.findById(id)
    .then((user) => {
      if (user) {
        user.username = username;
        user.password = password;
        user.phone = phone;
        user.address = address;
        user.email = email;
        return user
          .save()
          .then((data) => res.status(STATUS_CODE.OK).json({ data }))
          .catch((err) =>
            res
              .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
              .json({ errMsg: err.message })
          );
      } else {
        res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ errMsg: 'not found user with id ' + id });
      }
    })
    .catch((err) =>
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ errMsg: err.message })
    );
};
const addAdmin = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    user?.roles.push(ROLE['ADMIN']);
    return user
      .save()
      .then((data) => res.status(STATUS_CODE.OK).json({ data }))
      .catch((err) =>
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err })
      );
  } else {
    res
      .status(STATUS_CODE.NOT_FOUND)
      .json({ errMsg: 'not found user with id ' + id });
  }
};
module.exports = {
  getAll,
  getById,
  update,
  addAdmin,
};
