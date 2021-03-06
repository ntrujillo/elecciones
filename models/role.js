'use strict'
//mongoose es una libreria que me permite conectarme a MongoDB pero existen otras 
var mongoose = require('mongoose');

//cuando levanto la bdd MongoDB en modo desarrollo y el schema que especifico no existe
//MongoDB por default lo crea , en modo producción hay que crear primero el schema en la BDD
var Schema = mongoose.Schema;

var Role= new Schema({
	name:String,	
	description:String,	
	active:Boolean,	
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	rolemenu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoleMenu' }]
});

Role.index({name:'text'});

module.exports = mongoose.model('Role',Role);