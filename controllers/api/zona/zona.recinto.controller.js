'use strict'

var service = require('services/zona.recinto.service');

function queryRecinto(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    service.query(req.params.id_zona, q, fields, sort, page, perPage)
        .then(function (response) {
            if (response.parroquias) {
                res.header('X-Total-Count',response.count);
                res.send(response.recintos);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getRecintoById(req, res) {
    service.getById(req.params.id_zona, req.params._id)
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

function createRecinto(req, res) {
    service.create(req.params.id_zona, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateRecinto(req, res) {   
    service.update(req.params.id_zona, req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteRecinto(req, res) {    
    service.delete(req.params.id_zona, req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports.queryRecinto = queryRecinto;
module.exports.getRecintoById = getRecintoById;
module.exports.createRecinto = createRecinto;
module.exports.updateRecinto = updateRecinto;
module.exports.deleteRecinto = deleteRecinto;