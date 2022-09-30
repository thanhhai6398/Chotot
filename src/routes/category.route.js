const express = require('express');
const Router = express.Router();
const controllers = require('../controllers/category.controller');

Router.post('',controllers.save);

module.exports = Router;
