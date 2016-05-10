'use strict'

var express = require('express');
var router = express.Router();
var ctrlRecinto = require('./recinto.controller');
var ctrl = require('./recinto.junta.controller');


// routes recinto
router.route('/')
.get(ctrlRecinto.queryRecinto);

router.route('/:_id')
.get(ctrlRecinto.getRecintoById);


// routes recinto junta
router.route('/:id_recinto/junta')
.get(ctrl.queryJunta)
.post(ctrl.createJunta);

router.route('/:id_recinto/junta/:_id')
.get(ctrl.getJuntaById)
.put(ctrl.updateJunta)
.delete(ctrl.deleteJunta);

module.exports = router;
