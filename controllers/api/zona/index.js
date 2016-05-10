'use strict'

var express = require('express');
var router = express.Router();
var ctrlZona = require('./zona.controller');
var ctrl = require('./zona.recinto.controller');


// routes zona
router.route('/')
.get(ctrlZona.queryZona);

router.route('/:_id')
.get(ctrlZona.getZonaById);

// routes zona recinto
router.route('/:id_zona/recinto')
.get(ctrl.queryRecinto)
.post(ctrl.createRecinto);

router.route('/:id_zona/recinto/:_id')
.get(ctrl.getRecintoById)
.put(ctrl.updateRecinto)
.delete(ctrl.deleteRecinto);

module.exports = router;
