'use strict'

var express = require('express');
var router = express.Router();
var ctrl = require('./parroquia.zona.controller');


// routes canton parroquia
router.route('/:id_parroquia/zona')
.get(ctrl.queryZona)
.post(ctrl.createZona);

router.route('/:id_parroquia/zona/:_id')
.get(ctrl.getZonaById)
.put(ctrl.updateZona)
.delete(ctrl.deleteZona);

module.exports = router;
