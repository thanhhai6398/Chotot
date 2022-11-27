const mongoose = require('mongoose');
const Post = require('../models/post.model');
<<<<<<< HEAD
const User = require('../models/post.model');
=======
const HTTP_STATUS_CODE = require('../utils/httpStatusCode');
>>>>>>> 6c0749390a4672bd0f41938a569d07c8e1c76786
const STATUS_CODE = require('../utils/httpStatusCode');
const POST_STATUS = require('../utils/postStatusEnum');

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
  const { offSet, limit } = req.query;
  try {
    const data = await Post.find()
      .populate('category')
      .populate('postedBy', '_id username phone address')
      .limit(limit * 1)
      .skip((offSet - 1) * limit)
      .exec();

    //get total documents
    const count = await Post.countDocuments();

    //total pages
    const totalPages = Math.ceil(count / limit);
    return res.status(STATUS_CODE.OK).json({
      count,
      totalPages,
      offSet,
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
  const { offSet, limit } = req.query;
  try {
    const data = await Post.find({ status: id })
      .populate('category')
      .populate('postedBy', '_id username phone address')
      .limit(limit * 1)
      .skip((offSet - 1) * limit)
      .exec();

    //get total documents
    const count = await Post.countDocuments();

    //total pages
    const totalPages = Math.ceil(count / limit);
    return res.status(STATUS_CODE.OK).json({
      count,
      totalPages,
      offSet,
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
  const { offSet, limit } = req.query;
  try {
    const data = await Post.find({ postedBy: id })
      .populate('category')
      .populate('postedBy', '_id username phone address')
      .limit(limit * 1)
      .skip((offSet - 1) * limit)
      .exec();

    //get total documents
    const count = await Post.countDocuments();

    //total pages
    const totalPages = Math.ceil(count / limit);
    return res.status(STATUS_CODE.OK).json({
      count,
      totalPages,
      offSet,
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
    PostModel.find({
      title: { $regex: '.*' + nameSearch + '.*' },
    })
      .populate('category')
      .populate('postedBy')
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

<<<<<<< HEAD
}
const savePost = async (req, res) => {
    try {
        const user = await User.find({
            _id: req.user._id,
            postsSaved: req.params.id,
        });
        if (user.length > 0) {
            return res
                .status(400)
                .json({ msg: "You have already saved this post." });
        }

        const save = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $push: { postsSaved: req.params.id },
            },
            {
                new: true,
            }
        );

        if (!save) {
            return res.status(400).json({ msg: "User does not exist." });
        }

        res.json({ msg: "Post saved successfully." });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const unSavePost = async (req, res) => {
    try {
        const save = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $pull: { postsSaved: req.params.id },
            },
            {
                new: true,
            }
        );

        if (!save) {
            return res.status(400).json({ msg: "User does not exist." });
        }

        res.json({ msg: "Post removed from collection successfully." });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const getPostsSaved = async (req, res) => {
    try {
        //const features = new APIfeatures(Post.find({ id: { $in: req.user.postsSaved } }), req.query).paginating();

        const postsSaved = await Post.find({ _id: { $in: req.user.postsSaved } });

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
    savePost,
    unSavePost,
    getPostsSaved,
}
=======
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
};
>>>>>>> 6c0749390a4672bd0f41938a569d07c8e1c76786
