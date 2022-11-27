const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('./category.model')
const User = require('./user.model')
const POST_STATUS = require('../utils/postStatusEnum')

const postSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, required: true },
    description: { type: String, require: true },
    address: { type: String, require: true },
    datePosted: {
      type: String,
      require: true,
      default: new Date().toLocaleString(),
    },
    images: { type: [String], require: true },
    last_update: { type: String, default: null },
    branchName: { type: String },
    year: { type: Number },
    warranty: { type: String },
    version: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    status: {
      type: Number,
      enum: [
        POST_STATUS['PENDING'],
        POST_STATUS['ACTIVE'],
        POST_STATUS['HIDE'],
      ],
      required: true,
      default: POST_STATUS['PENDING'],
    },
  },
  {
    versionKey: false,
  }
)
const PostModel = mongoose.model('Post', postSchema)
module.exports = PostModel
