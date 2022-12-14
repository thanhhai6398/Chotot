const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controller');

router.get('/:id', controllers.getFollowing);

module.exports = router;