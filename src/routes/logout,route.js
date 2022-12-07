const express = require('express');
const router = express.Router();
const controllers = require('../controllers/logout.controller');

router.get('', controllers.handleLogout);

module.exports = router;
