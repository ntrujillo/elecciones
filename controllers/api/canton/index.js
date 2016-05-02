'use strict'

var express = require('express');
var router = express.Router();
var ctrl = require('./canton.parroquia.controller');


// routes canton parroquia
router.route('/:id_canton/parroquia')
.get(ctrl.queryParroquia)
.post(ctrl.createParroquia);

router.route('/:id_canton/parroquia/:_id')
.get(ctrl.getParroquiaById)
.put(ctrl.updateParroquia)
.delete(ctrl.deleteParroquia);

module.exports = router;
