'use strict'
var service = require('services/menu.service');

function queryMenu(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    service.query(q,fields, sort, page, perPage)
        .then(function (response) {
            if (response.menus) {
                res.header('X-Total-Count',response.count);
                res.send(response.menus);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getMenuById(req, res) {
    service.getById(req.params._id)
        .then(function (obj) {
            if (obj) {
                res.send(obj);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function createMenu(req, res) {
    service.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateMenu(req, res) {   
    service.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteMenu(req, res) {    
    service.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports.queryMenu=queryMenu;
module.exports.getMenuById=getRoleById;
module.exports.createMenu=createMenu;
module.exports.updateMenu=updateMenu;
module.exports.deleteMenu=deleteMenu;