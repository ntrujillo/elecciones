'use strict'
//mongoose es una libreria que me permite conectarme a MongoDB pero existen otras 
var mongoose = require('mongoose');

//cuando levanto la bdd MongoDB en modo desarrollo y el schema que especifico no existe
//MongoDB por default lo crea , en modo producción hay que crear primero el schema en la BDD
var Schema = mongoose.Schema;

var RoleMenu= new Schema({		
	active:Boolean,	
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
	menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }
});

module.exports = mongoose.model('RoleMenu',RoleMenu);