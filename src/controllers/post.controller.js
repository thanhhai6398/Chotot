const mongoose = require('mongoose');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const HTTP_STATUS_CODE = require('../utils/httpStatusCode');
const STATUS_CODE = require('../utils/httpStatusCode');
const POST_STATUS = require('../utils/postStatusEnum');
const { getPagination } = require('../utils/query');
const DIR = require('../utils/uploadDir');
//const findSameImages = require('./services/compareImage');

const uploadPost = async (req, res) => {
  const {
    title,
    price,
    description,
    address,

    images,

    branchName,
    year,
    warranty,
    version,
    category,
    postedBy,
  } = req.body;
  console.log('BE:');
  console.log(req.body);
  try {
    const newPost = new Post({
      _id: new mongoose.Types.ObjectId(),
      title,
      price,
      description,
      address,

      images,

      branchName,
      year,
      warranty,
      version,
      category,
      postedBy,
    });
    return newPost
      .save()
      .then((data) => res.status(STATUS_CODE.OK).json({ data }))
      .catch((err) =>
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err })
      );
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    price,
    description,
    address,
    images,
    branchName,
    year,
    warranty,
    version,
    category,
  } = req.body;
  console.log(images);
  const oldPost = Post.findById(id)
    .then((post) => {
      if (post) {
        post.title = title;
        post.price = price;
        post.description = description;
        post.address = address;
        post.images = images;
        post.branchName = branchName;
        post.year = year;
        post.warranty = warranty;
        post.category = category;
        this.version = version;
        return post
          .save()
          .then((data) => res.status(STATUS_CODE.OK).json({ data }))
          .catch((err) =>
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err })
          );
      } else {
        res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ errMsg: 'not found post with id ' + id });
      }
    })
    .catch((err) =>
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err })
    );
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Post.findById(id)
      .populate('category')
      .populate('postedBy', '_id username phone address');
    return res.status(STATUS_CODE.OK).json({ data });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ errMsg: error.message });
  }
};
const getAll = async (req, res) => {
  const { page, size } = req.query;
  const { skip, limit } = getPagination(page, size);
  try {
    const data = await Post.find()
      .populate('category')
      .populate('postedBy', '_id username phone address')
      .limit(limit)
      .skip(skip)
      .exec();

    //get total documents
    const count = await Post.countDocuments();

    //total pages
    const totalPages = Math.ceil(count / limit);
    return res.status(STATUS_CODE.OK).json({
      count,
      totalPages,
      page,
      data,
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ errMsg: error.message });
  }
};

const getPostsByStatusId = async (req, res) => {
  const { id } = req.params;
  const { page, size } = req.query;
  const { skip, limit } = getPagination(page, size);
  try {
    const data = await Post.find({ status: id })
      .populate('category')
      .populate('postedBy', '_id username phone address')
      .limit(limit)
      .skip(skip)
      .exec();

    //get total documents
    const count = await Post.find({ status: id }).countDocuments();

    //total pages
    const totalPages = Math.ceil(count / limit);
    return res.status(STATUS_CODE.OK).json({
      count,
      totalPages,
      page,
      data,
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ errMsg: error.message });
  }
};

const getPostByUserId = async (req, res) => {
  const { id } = req.params;
  const { page, size } = req.query;
  const { skip, limit } = getPagination(page, size);
  try {
    const data = await Post.find({ postedBy: id })
      .populate('category')
      .populate('postedBy', '_id username phone address')
      .limit(limit)
      .skip(skip)
      .exec();

    //get total documents
    const count = await Post.find({ postedBy: id }).countDocuments();

    //total pages
    const totalPages = Math.ceil(count / limit);
    return res.status(STATUS_CODE.OK).json({
      count,
      totalPages,
      page,
      data,
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ errMsg: error.message });
  }
};

const activePost = async (req, res) => {
  const { id } = req.params;
  const oldPost = await Post.findById(id);
  if (oldPost) {
    oldPost.status = POST_STATUS['ACTIVE'];
    return oldPost
      .save()
      .then((data) => res.status(HTTP_STATUS_CODE.OK).json({ data }))
      .catch((err) =>
        res
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ errMsg: err.message })
      );
  }
};

const hidePost = async (req, res) => {
  const { id } = req.params;
  const oldPost = await Post.findById(id);
  if (oldPost) {
    oldPost.status = POST_STATUS['HIDE'];
    return oldPost
      .save()
      .then((data) => res.status(HTTP_STATUS_CODE.OK).json({ data }))
      .catch((err) =>
        res
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ errMsg: err.message })
      );
  }
};
const findPostByName = async (req, res) => {
  const { nameSearch } = req.params;
  try {
    Post.find({
      title: new RegExp(nameSearch, 'i'),
    })
      .populate('category')
      .populate('postedBy', '_id name phone address')
      //.exec()
      .then((data) => {
        return res.status(STATUS_CODE.OK).json({
          data,
        });
      });
  } catch (err) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ errMsg: err.message });
  }
};

const findPostByImage = async (req, res) => {
  const searchImage = `http://localhost:5000/static/upload/${req.file.filename}`;
  const categoryId = req.body.categoryId;
  const posts = req.body.posts;
  console.log(searchImage);
  return res.status(STATUS_CODE.OK).json({ data: searchImage });
const savePost = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params);
  try {
    const user = await User.find({
      phone: req.phone,
      postsSaved: id,
    });
    if (user.length > 0) {
      return res
        .status(400)
        .json({ msg: "You have already saved this post." });
    }

    const newUser = await User.findOneAndUpdate(
      { phone: req.phone },
      {
        $push: { postsSaved: id },
      },
      {
        new: true,
      }
    );

    if (!newUser) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const unSavePost = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params);
  try {
    const newUser = await User.findOneAndUpdate(
      { phone: req.phone },
      {
        $pull: { postsSaved: id },
      },
      {
        new: true,
      }
    );

    if (!newUser) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getPostsSaved = async (req, res) => {
  try {
    const user = await User.findOne({
      phone: req.phone,
    });
    const postsSaved = await Post.find({ _id: { $in: user.postsSaved } });

    res.json({
      postsSaved,
      result: postsSaved.length
    })

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  uploadPost,
  editPost,
  getById,
  getAll,
  findPostByName,
  activePost,
  hidePost,
  getPostByUserId,
  getPostsByStatusId,
<<<<<<< HEAD
  findPostByImage,
=======

  savePost,
  unSavePost,
  getPostsSaved,
>>>>>>> cb09abaa85f51a47b55b68b5b0c40dcf79fc867e
};
