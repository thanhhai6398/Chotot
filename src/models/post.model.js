const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category.model');
const User = require('./user.model');

const postSchema = new Schema(
    {
        title: { type: String, require: true },
        price: { type: Double, required: true },
        description: { type: String, require: true },
        address: { type: String, require: true },
        datePosted: { type: Date, require: true, default: new Date().toLocaleString() },
        images: { type: [String], require: true },
        delete_ymd: { type: Date, default: null },
        branchName: { type: String },
        year: { type: Number },
        warranty: { type: String },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        postedBy: {type:mongoose.Types.ObjectId, ref:'User'}
    },
    {
        versionKey: false
    }
);