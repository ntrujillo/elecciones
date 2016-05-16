'use strict'
var express = require('express');
var router = express.Router();
var ctrl = require('./menu.controller');

// routes menu
router.route('/')
.get(ctrl.queryMenu)
.post(ctrl.createMenu);

router.route('/:_id')
.get(ctrl.getMenuById)
.put(ctrl.updateMenu)
.delete(ctrl.deleteMenu);

// routes menu childs
router.route('/:id_menu/menu')
.get(ctrl.queryMenuChild)
.post(ctrl.createMenuChild);

router.route('/:id_menu/menu/:_id')
.get(ctrl.getMenuChildById)
.put(ctrl.updateMenuChild)
.delete(ctrl.deleteMenuChild);

module.exports = router;