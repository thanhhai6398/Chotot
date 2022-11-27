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
<<<<<<< HEAD
const auhtorizationUser = async (req, res) => {
    // const {id} = req.params;
    // const {roles} = req.body;
    // const user = await User.findById(id);
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
};
const follow = async (req, res) => {
    try {
        const user = await User.find({
            _id: req.user._id,
            fowllowing: req.params.id,
        });
        if (user.length > 0)
            return res
                .status(500)
                .json({ msg: "You are already following this user." });

        const newUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { fowllowing: req.params.id } },
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
            { _id: req.user._id },
            { $pull: { fowllowing: req.params.id } },
            { new: true }
        );

        res.json({ newUser });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
const getFollowing = async (req, res) => {
    try {
        const following = await Post.find({ _id: { $in: req.user.fowllowing } });

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
        auhtorizationUser,
        follow,
        unfollow,
        getFollowing
    }
=======
module.exports = {
  getAll,
  getById,
  update,
  addAdmin,
};
>>>>>>> 6c0749390a4672bd0f41938a569d07c8e1c76786
