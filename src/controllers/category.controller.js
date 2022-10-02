const mongoose = require('mongoose');
const Category = require('../models/category.model');
const STATUS_CODE = require('../utils/httpStatusCode');


const getAll = async (req, res) => {
    return Category.find()
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(500).json({ errMsg: err }));

};
const getById = (req, res) => {
    const { id } = req.params;
    if (id) {
        Category.findById(id)
            .then(data => res.status(STATUS_CODE.OK).json({ data }))
            .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
    }
};
const save = (req, res) => {
    const { name } = req.body;
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name,
    });
    category
        .save()
        .then(data => res.status(STATUS_CODE.OK).json({ data }))
        .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
};
const deleteById = (req, res) => {
    const { id } = req.params;
    Category.findByIdAndDelete(id)
        .then(category => {
            if (category) {
                res.status(STATUS_CODE.OK).json({ 'message': 'Deleted category with id ' + id });
            }
            else res.status(STATUS_CODE.BAD_REQUEST).json({ errMsg: "not found" });
        })
        .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
};
const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const oldCategory = Category.findById(id)
        .then(category => {
            if (category) {
                category.name = name;
                return category.save()
                    .then(data => res.status(STATUS_CODE.OK).json({ data }))
                    .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
            } else {
                res.status(STATUS_CODE.BAD_REQUEST).json({ errMsg: 'not found category with id ' + id });
            }
        })
        .catch(err => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errMsg: err }));
};
module.exports = {
    getAll,
    getById,
    save,
    deleteById,
    update
}