const mongoose = require('mongoose');
const Post = require('../models/post.model');
const STATUS_CODE = require('../utils/httpStatusCode');

const uploadPost = async (req, res) => {
    const { title, 
            price,
            description, 
            address, 

            images,

            branchName,
            year,
            warranty,
            category,
            postedBy } = req.body;
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
            category,
            postedBy
        });
        return newPost
        .save()
        .then(data => res.status(STATUS_CODE.OK).json( {data}))
        .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
    } catch(error){
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({errMsg: err});
    }
};

const editPost = async (req, res) => {
    const { id } = req.params;
    const { title,
            price,
            description, 
            address, 
            images,
            branchName,
            year,
            warranty,
            category } = req.body;
    const oldPost = Post.findById(id)
        .then(post => {
            if (post){
                post.title = title;
                post.price = price;
                post.description =description;
                post.address = address;
                post.images = images;
                post.branchName = branchName;
                post.year = year;
                post.warranty = warranty;
                post.category = category;
                return post.save()
                    .then(data => res.status(STATUS_CODE.OK).json({ data }))
                    .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
            } else {
                res.status(STATUS_CODE.BAD_REQUEST).json({ errMsg: 'not found post with id ' + id });
            }
        })
        .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err })); 
}
module.exports = {
    uploadPost,
    editPost
}