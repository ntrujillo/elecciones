'use strict'

var Recinto = require('../models/./recinto');
var Junta = require('../models/./junta');

var service = {};

service.query = query;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function query(id_recinto,q,fields,sort,page,perPage){

    var criteria = {};
    var response = {};
    var deferred = Q.defer();

    if(id_recinto){
        criteria.recinto=id_recinto;
    }
    
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
    
    Junta.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(err);
        }
        
        response.count = count;      
        //exec me permite dar mas especificaciones a find
        Junta.find(criteria)
        .select(fields)
        .sort(sort)
        .skip(perPage * (page-1))
        .limit(perPage)
        .exec(function(error, juntas){
            if(error){
                   deferred.reject(err);
            }
            response.juntas = juntas;
            deferred.resolve(response);  
        });
        
    });
    return deferred.promise;
}

function getById(id_recinto,id_junta) {
    var deferred = Q.defer();
    Junta.findOne({recinto:id_recinto,_id:id_junta}, function (err, item) {
        if (err) deferred.reject(err);
        if (item) {           
            deferred.resolve(item);
        } else {
            // not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};


function create(id_recinto, body) {
    var deferred = Q.defer();

    // validation  
    Junta.findOne(
        { code: body.code },
        function (err, item) {
            if (err) deferred.reject(err);

            if (item) {
                // already exists
                deferred.reject('Code "' + body.code + '" is already taken');
            } else {
                createJunta(body);
            }
        });   
   

    function createJunta(obj) {   
        obj.recinto = id_recinto;

         Junta.create(
            obj,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }else {

                    Recinto.findById(id_recinto,function(err,recinto){
                        recinto.juntas.push(doc);
                        recinto.save(function(error,parr){
                            if(error) deferred.reject(error);
                        });
                    });
                }

                deferred.resolve();
            });


    }

    return deferred.promise;
};

function update(id_recinto, id_junta, body) {
    var deferred = Q.defer();
    // validation
    Junta.findOne({recinto:id_recinto,_id:id_junta}, function (err, item) {
        if (err) deferred.reject(err);

        if (item.code !== body.code) {          
            // code has changed so check if the new code is already taken
            Junta.findOne(
                { code: body.code },
                function (err, item) {
                    if (err) deferred.reject(err);

                    if (item) {
                        // username already exists
                        deferred.reject('Code "' + body.code + '" is already taken')
                    } else {
                        updateJunta(body);
                    }
                });
        } else {
            updateJunta(body);
        }
    });

    function updateJunta(obj) {        
        Junta.findOne( {recinto:id_recinto,_id:id_junta},function (err, jun) {
                if (err) deferred.reject(err);
                jun.name = obj.name;
                jun.code = obj.code;
                jun.save(function(err){
                    if(err)deferred.reject(err);
                    deferred.resolve();
                });

                
            });
    }

    return deferred.promise;
};

function _delete(id_recinto, id_junta) {
    var deferred = Q.defer();

    Junta.remove(
        { _id: id_recinto },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
};
