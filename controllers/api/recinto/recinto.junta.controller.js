'use strict'

var service = require('services/recinto.junta.service');

function queryJunta(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    service.query(req.params.id_recinto, q, fields, sort, page, perPage)
        .then(function (response) {
            if (response.juntas) {
                res.header('X-Total-Count',response.count);
                res.send(response.juntas);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getJuntaById(req, res) {
    service.getById(req.params.id_recinto, req.params._id)
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

function createJunta(req, res) {
    service.create(req.params.id_recinto, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateJunta(req, res) {   
    service.update(req.params.id_recinto, req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteJunta(req, res) {    
    service.delete(req.params.id_recinto, req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports.queryJunta = queryJunta;
module.exports.getJuntaById = getJuntaById;
module.exports.createJunta = createJunta;
module.exports.updateJunta = updateJunta;
module.exports.deleteJunta = deleteJunta;