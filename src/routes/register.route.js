const express = require('express');
const router = express.Router();
const controllers = require('../controllers/register.controller');

// //middlewares check empty value
// router.use((req,res,next)=>{
//     const { username, password, phone, address } = req.body;
//     if(username==='' || password === '' || phone === '' || address === ''){
//         res.status(STATUS_CODE.BAD_REQUEST).json({errMsg:'Tất cả các trường không được bỏ trống'})
//     }
//     next();
// })
router.post('', controllers.register);
module.exports = router;