const mongoose = require('mongoose');
const User = require('../models/user.model');
const STATUS_CODE = require('../utils/httpStatusCode');
const ROLE_LIST = require('../utils/role_list');

const getAll = async (req, res) => {
    return User.find()
        .then(data => res.status(STATUS_CODE.OK).json({ data }))
        .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
};
const getById = (req, res) => {
    const { id } = req.params;
    if (id) {
        User.findById(id)
            .then(data => res.status(STATUS_CODE.OK).json({ data }))
            .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
    }
};
const update = async (req, res) => {
    const { id } = req.params;
    const { username,
        password,
        phone,
        address,
        email
    } = req.body;
    const oldUser = User.findById(id)
        .then(user => {
            if (user) {
                user.username = username;
                user.password = password;
                user.phone = phone;
                user.address = address;
                user.email = email;
                return user.save()
                    .then(data => res.status(STATUS_CODE.OK).json({ data }))
                    .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
            } else {
                res.status(STATUS_CODE.BAD_REQUEST).json({ errMsg: 'not found category with id ' + id });
            }
        })
        .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
};
const auhtorizationUser = async (req, res) => {
    // const {id} = req.params;
    // const {roles} = req.body;
    // const user = await User.findById(id);
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
}
module.exports = {
    getAll,
    getById,
    update,
    auhtorizationUser
}