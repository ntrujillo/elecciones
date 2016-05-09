'use strict'

var express = require('express');
var router = express.Router();
var ctrlParroquia = require('./parroquia.controller');
var ctrl = require('./parroquia.zona.controller');


// routes parroquia
router.route('/')
.get(ctrlParroquia.queryParroquia);

router.route('/:_id')
.get(ctrlParroquia.getParroquiaById);

// routes parroquia zona
router.route('/:id_parroquia/zona')
.get(ctrl.queryZona)
.post(ctrl.createZona);

router.route('/:id_parroquia/zona/:_id')
.get(ctrl.getZonaById)
.put(ctrl.updateZona)
.delete(ctrl.deleteZona);

module.exports = router;
