const mongoose = require('mongoose');
const Category = require('../models/category.model');

const save = (req,res,next)=>{
    const {name} = req.body;
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name,
      });
    return category
    .save()
    .then(cate => res.status(200).json({category:cate}))
    .catch(err => res.status(500).json({err}));
};

module.exports = {
    save
}