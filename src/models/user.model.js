const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ROLE = require('../utils/role_list');
const userSchema = new Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    email: { type: String, require: true },
    fowllowing: { type: [mongoose.Types.ObjectId] },
    postsSaved: { type: [mongoose.Types.ObjectId] },
    refreshToken: { type: String },
    roles: { type: [Number], default: ROLE['USER'] },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model('User', userSchema);
