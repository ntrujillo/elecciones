
var Provincia = require('../models/./provincia');
var Q = require('q');

var service = {};

service.query = query;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function query(q,fields,sort,page,perPage){
    var criteria = {};
    var response = {};
    var deferred = Q.defer();
    
    if(q){
        criteria.$text = {$search:q}
    } 
    if(sort){
        sort = sort.replace(plus,'');
        sort = sort.replace(comma,' ');
    }
    if(fields){
        fields = fields.replace(comma,' ');
    }
    if(page){
        page = parseInt(page);
        if(perPage){
            perPage = parseInt(perPage);
        }else{
            perPage = 10;
        }
    }   
    
    Provincia.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(err);
        }
        
        response.count = count;      
        //exec me permite dar mas especificaciones a find
        Provincia.find(criteria)
        .select(fields)
        .sort(sort)
        .skip(perPage * (page-1))
        .limit(perPage)
        .exec(function(error, provincias){
            if(error){
                   deferred.reject(err);
            }
            response.provincias = provincias;
            deferred.resolve(response);  
        });
        
    });
    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    Provincia.findById(_id, function (err, provincia) {
        if (err) deferred.reject(err);

        if (provincia) {           
            deferred.resolve(provincia);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};


function create(provinciaParam) {
    var deferred = Q.defer();
    // validation
    Provincia.findOne(
        { code: provinciaParam.code },
        function (err, provincia) {
            if (err) deferred.reject(err);

            if (provincia) {
                // username already exists
                deferred.reject('Code "' + provinciaParam.code + '" is already taken');
            } else {
                createProvincia(provincia);
            }
        });

    function createProvincia(provincia) {

        Provincia.create(
            provincia,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
};

function update(_id, provinciaParam) {
    var deferred = Q.defer();
    // validation
    Provincia.findById(_id, function (err, provincia) {
        if (err) deferred.reject(err);

        if (provincia.code !== provinciaParam.code) {
            // code has changed so check if the new code is already taken
            Provincia.findOne(
                { code: provinciaParam.code },
                function (err, provincia) {
                    if (err) deferred.reject(err);

                    if (provincia) {
                        // username already exists
                        deferred.reject('Code "' + req.body.code + '" is already taken')
                    } else {
                        updateUser(provincia);
                    }
                });
        } else {
            updateProvincia(provincia);
        }
    });

    function updateProvincia(provincia) {
        // fields to update
        var set = {
            name: provincia.name,
            code: provincia.code         
        };      

        Provincia.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
};

function _delete(_id) {
    var deferred = Q.defer();

    Provincia.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
};
