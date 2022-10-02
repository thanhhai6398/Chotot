const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth.controller');

router.post('',controllers)

module.exports = router;