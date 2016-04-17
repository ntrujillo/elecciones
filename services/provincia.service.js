
var Provincia = require('../models/./provincia');
var Q = require('q');

var service = {};

service.query = query;
service.getById = getById;
service.search = search;

module.exports = service;

function query(q,fields,sort,page,perPage){
    //url?param1=1&param2=2
    //req.query  ={param1:1,param2:2}
    //en caso que no vengan parametros en el url req.query = {}
    var criteria = {}
    var q = req.query.q;    
    var sort = req.query.sort;
    var fields = req.query.fields;
    var page = req.query.page;
    var perPage = req.query.per_page;
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
    
    console.log('criteria: '+criteria);
    
    Provincia.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(err);
        }
        
        res.header('X-Total-Count',count);
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
            deferred.resolve(provincias);  
        });
        
    });
    return deferred.promise;
}


function search(q){
     var deferred = Q.defer();
    Provincia.find({$text:{$search:q}},function(err, provincias){
        if(error){
            deferred.reject(err);
        }
        deferred.resolve(provincias);
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

