const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category.model');
const User = require('./user.model');

const postSchema = new Schema(
    {
        title: { type: String, require: true },
        price: { type: Number, required: true },
        description: { type: String, require: true },
        address: { type: String, require: true },
        datePosted: { type: String, require: true, default: new Date().toLocaleString() },
        images: { type: [String], require: true },
        last_update: { type: String, default: null },
        branchName: { type: String },
        year: { type: Number },
        warranty: { type: String },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'active', 'hide'], required: true, default: 'pending' }
    },
    {
        versionKey: false
    }
);
const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;