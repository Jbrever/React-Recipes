const express = require('express');
const routes = express.Router();
const {getLogin} = require('../controller/index')

routes.post('/',getLogin)

module.exports = routes;
