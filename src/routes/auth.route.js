const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth.controller');

router.post('', controllers.authUser)

module.exports = router;