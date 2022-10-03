const STATUS_CODE = require('../utils/httpStatusCode');
const User = require('../models/user.model');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(STATUS_CODE.NO_CONTENT);
    }
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
};
module.exports = {handleLogout};