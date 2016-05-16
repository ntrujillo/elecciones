'use strict'

var Menu = require('../models/./menu');
var Q = require('q');
var plus = "+";
var comma=",";
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
    
    Menu.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(error);
        }
        
        response.count = count;      
        //exec me permite dar mas especificaciones a find
        Menu.find(criteria)
        .select(fields)      
        .skip(perPage * (page-1))
        .limit(perPage)
        .sort(sort)
        //.populate('rolemenu')
        .exec(function(error, menus){
            if(error){
                   deferred.reject(err);
            }
            response.menus = menus;
            deferred.resolve(response);  
        });
        
    });
    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();
    Menu.findOne({_id:id})
    //.populate('rolemenu')
    .exec(function (err, role) {
        if (err) deferred.reject(err);

        if (role) {           
            deferred.resolve(role);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};


function create(object) {
    var deferred = Q.defer();
    // validation  
    Menu.findOne(
        { name: object.name },
        function (err, obj) {
            if (err) deferred.reject(err);

            if (obj) {
                // username already exists
                deferred.reject('Name "' + object.name + '" is already taken');
            } else {
                createMenu(object);
            }
        });

    function createMenu(role) {
         Menu.create(
            role,
            function (err, doc) {
                if (err) deferred.reject(err);
                deferred.resolve();
            });
    }

    return deferred.promise;
};

function update(_id, object) {
    var deferred = Q.defer();
    // validation
    Menu.findById(_id, function (err, obj) {
        if (err) deferred.reject(err);

        if (obj.name !== object.name) {
            // code has changed so check if the new code is already taken
            Menu.findOne(
                { name: object.name },
                function (err, menu) {
                    if (err) deferred.reject(err);

                    if (menu) {
                        // username already exists
                        deferred.reject('Name "' + object.name + '" is already taken')
                    } else {
                        updateMenu(object);
                    }
                });
        } else {
            updateMenu(object);
        }
    });

    function updateMenu(menu) {        
        Menu.findById(_id,
            function (err, tmp) {
                if (err) deferred.reject(err);
                tmp.name = menu.name;
                tmp.url = menu.url;
                tmp.icon = menu.icon;
                tmp.status = menu.status;
                tmp.uistate = menu.uistate;
                tmp.menu = menu.menu;
                tmp.save(function(err){
                    if(err)deferred.reject(err);
                    deferred.resolve();
                });                
            });
    }

    return deferred.promise;
};

function _delete(_id) {
    var deferred = Q.defer();
    Menu.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);
            deferred.resolve();
        });
    return deferred.promise;
};
