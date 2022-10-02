const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const STATUS_CODE = require('../utils/httpStatusCode');


const register = async (req, res) => {
    const { username, password, phone, address } = req.body;
    const duplicate = await User.findOne({ phone }).exec();
    if (duplicate) {
        res.status(409).json('Số điện thoại đã tồn tại');
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hashedPwd,
            phone,
            address
        });
        newUser
            .save()
            .then(data => res.status(STATUS_CODE.OK).json({ data }))
            .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err });
    }


};
module.exports = {
    register
}