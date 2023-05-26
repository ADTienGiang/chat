const express = require('express');
const router  =  express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const routerUser = require('./UserRouter');
const routerAPI = require('./LoginUserApi')
router.use(routerUser,routerAPI);


module.exports = router;