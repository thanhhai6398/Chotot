const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });
const User = require('../models/user.model');
const STATUS_CODE = require('../utils/httpStatusCode');

const authUser = async (req, res) => {
  const { phone, password } = req.body;
  const foundUser = await User.findOne({ phone: phone });
  if (!foundUser) {
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ errMsg: 'Tài khoản không tồn tại' });
  }
  try {
    const matchPwd = await brypt.compare(password, foundUser.password);
    if (matchPwd) {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      //create jwt
      const accessToken = jwt.sign(
        {
          UserInfo: {
            phone: foundUser.phone,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1 day' }
      );
      //create refresh totken
      const refreshToken = jwt.sign(
        { phone: foundUser.phone },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '30 days' }
      );
      //save refresh totken with logged user
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      // Creates Secure Cookie with refresh token
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to user
      return res.json({
        user: foundUser,
        accessToken,
      });
    } else {
      return res.status(STATUS_CODE.CONFLICT).json({ errMsg: 'Sai mật khẩu' });
    }
  } catch (error) {
    if (error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ errMsg: error.message });
  }
};
module.exports = { authUser };
