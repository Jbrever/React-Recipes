const express = require('express');
const routes = express.Router();
const {userAuth} = require('../controller/index')

routes.post('/',userAuth)

module.exports = routes;
