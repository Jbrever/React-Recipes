const express = require('express');
const routes = express.Router();
const {postLogin} = require('../controller/index')

routes.post('/',postLogin)

module.exports = routes;
