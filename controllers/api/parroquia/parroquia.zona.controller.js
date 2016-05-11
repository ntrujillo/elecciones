'use strict'

var service = require('services/parroquia.zona.service');


function queryZona(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    service.query(req.params.id_parroquia, q, fields, sort, page, perPage)
        .then(function (response) {
            if (response.zonas) {
                res.header('X-Total-Count',response.count);
                res.send(response.zonas);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function getZonaById(req, res) {
    service.getById(req.params.id_parroquia, req.params._id)
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

function createZona(req, res) {
    service.create(req.params.id_parroquia, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateZona(req, res) {   
    service.update(req.params.id_parroquia, req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteZona(req, res) {    
    service.delete(req.params.id_parroquia, req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports.queryZona = queryZona;
module.exports.getZonaById = getZonaById;
module.exports.createZona = createZona;
module.exports.updateZona = updateZona;
module.exports.deleteZona = deleteZona;