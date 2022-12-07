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
  const user = await User.findById(id).exec();
  console.log(user);
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

const auhtorizationUser = async (req, res) => {
  // const {id} = req.params;
  // const {roles} = req.body;
  // const user = await User.findById(id);
  return res.sendStatus(STATUS_CODE.NOT_FOUND);
};
const follow = async (req, res) => {
  try {
    const user = await User.find({
      phone: req.phone,
      fowllowing: req.params,
    });
    if (user.length > 0)
      return res
        .status(500)
        .json({ msg: "You are already following this user." });

    const newUser = await User.findOneAndUpdate(
      { phone: req.phone },
      { $push: { fowllowing: req.params } },
      { new: true }
    );

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const unfollow = async (req, res) => {
  try {
    const newUser = await User.findOneAndUpdate(
      { phone: req.phone },
      { $pull: { fowllowing: req.params } },
      { new: true }
    );

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const getFollowing = async (req, res) => {
  try {
    const user = await User.find({
      phone: req.phone,
    });
    const following = await User.find({ _id: { $in: user.fowllowing } });

    res.json({
      following,
      result: following.length
    })

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = {
  getAll,
  getById,
  update,
  addAdmin,
  auhtorizationUser,
  follow,
  unfollow,
  getFollowing
};
