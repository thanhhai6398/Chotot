const express = require('express');
const router = express.Router();
const controllers = require('../controllers/register.controller');

router.post('', controllers.register);
module.exports = router;
