'use strict'

var Zona = require('../models/./zona');
var Q = require('q');

var service = {};

service.query = query;
service.getById = getById;


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
    
    Zona.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(err);
        }
        
        response.count = count;      
        //exec me permite dar mas especificaciones a find
        Zona.find(criteria)
        .select(fields)
        .sort(sort)
        .skip(perPage * (page-1))
        .limit(perPage)
        .populate('recintos')
        .exec(function(error, zonas){
            if(error){
                   deferred.reject(err);
            }
            response.zonas = zonas;
            deferred.resolve(response);  
        });
        
    });
    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();
    Zona.findOne({_id:id})
    .populate('zonas')
    .exec(function (err, zona) {
        if (err) deferred.reject(err);

        if (zona) {           
            deferred.resolve(zona);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};


