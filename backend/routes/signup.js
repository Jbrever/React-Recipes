const express = require('express');
const routes = express.Router();
const {postSignup} = require('../controller/index')

routes.post('/',postSignup);

module.exports = routes