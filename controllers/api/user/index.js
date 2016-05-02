'use strict'
var express = require('express');
var router = express.Router();
var controller = require('./users.controller');

// routes
router.post('/authenticate', controller.authenticateUser);
router.post('/register', controller.registerUser);
router.get('/current', controller.getCurrentUser);
router.put('/:_id', controller.updateUser);
router.delete('/:_id', controller.deleteUser);

module.exports = router;