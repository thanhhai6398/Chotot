const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, require: true },
        password: { type: String, require: true },
        phone: { type: String, require: true },
        address: { type: String, require: true },
        fowllowing: { type: [mongoose.Types.ObjectId] },
        postsSaved: { type: [mongoose.Types.ObjectId] },
        refreshToken: { type: String },
        roles: {
            User: {
                type: Number,
                default: 2001
            },
            Admin: Number
        },
    },
    {
        versionKey: false
    }
);
module.exports = mongoose.model('User', userSchema);