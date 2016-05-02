'use strict'

var express = require('express');
var router = express.Router();
var ctrl = require('./zona.recinto.controller');


// routes canton parroquia
router.route('/:id_zona/recinto')
.get(ctrl.queryRecinto)
.post(ctrl.createRecinto);

router.route('/:id_zona/recinto/:_id')
.get(ctrl.getRecintoById)
.put(ctrl.updateRecinto)
.delete(ctrl.deleteRecinto);

module.exports = router;
