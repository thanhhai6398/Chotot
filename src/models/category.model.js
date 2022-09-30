const moongose = require('mongoose');
const Schema = moongose.Schema;

const CategorySchema = new Schema(
    {
        name:{type:String, require:true}
    },
    {
        versionKey:false
    }
);
const CategoryModel = moongose.model('Category',CategorySchema);
module.exports = CategoryModel;