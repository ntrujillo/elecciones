'use strict'
var ZonaService = require('services/zona.service');

function queryZona(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    ZonaService.query(q,fields, sort, page, perPage)
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
    ZonaService.getById(req.params._id)
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

module.exports.queryZona=queryZona;
module.exports.getZonaById=getZonaById;
