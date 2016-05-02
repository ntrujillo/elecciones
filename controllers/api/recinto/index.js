'use strict'

var express = require('express');
var router = express.Router();
var ctrl = require('./recinto.junta.controller');


// routes canton parroquia
router.route('/:id_recinto/junta')
.get(ctrl.queryJunta)
.post(ctrl.createJunta);

router.route('/:id_recinto/junta/:_id')
.get(ctrl.getJuntaById)
.put(ctrl.updateJunta)
.delete(ctrl.deleteJunta);

module.exports = router;
