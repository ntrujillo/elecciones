var express = require('express');
var router = express.Router();
var provinciaService = require('services/provincia.service');

// routes
router.route('/')
.get(queryProvincia)
.post(createProvincia);

router.route('/:_id')
.get(getProvinciaById)
.put(updateProvincia)
.delete(deleteProvincia);

module.exports = router;

function queryProvincia(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    provinciaService.query(q,fields, sort, page, perPage)
        .then(function (response) {
            if (response.provincias) {
                res.header('X-Total-Count',response.count);
                res.send(response.provincias);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getProvinciaById(req, res) {
    provinciaService.getById(req.params._id)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function createProvincia(req, res) {
    provinciaService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateProvincia(req, res) {   
    provinciaService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteProvincia(req, res) {    
    provinciaService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};