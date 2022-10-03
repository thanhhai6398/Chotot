const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const STATUS_CODE = require('../utils/httpStatusCode');


const register = async (req, res) => {
    const { username, password, phone, address } = req.body;
    const duplicate = await User.findOne({ phone: phone }).exec();
    if (duplicate) {
        return res.status(STATUS_CODE.CONFLICT).json({ errMsg: 'Số điện thoại đã tồn tại' });
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
        return newUser
            .save()
            .then(data => res.status(STATUS_CODE.OK).json({ data }))
            .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
    } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err });
    }


};
module.exports = {
    register
}