'use strict'
//mongoose es una libreria que me permite conectarme a MongoDB pero existen otras 
var mongoose = require('mongoose');

//cuando levanto la bdd MongoDB en modo desarrollo y el schema que especifico no existe
//MongoDB por default lo crea , en modo producción hay que crear primero el schema en la BDD
var Schema = mongoose.Schema;

var Menu= new Schema({
	name:String,
	url:String,
	icon:String,
	description:String,
	uistate:String,
	status:Boolean,
	menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },	
	rolemenu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoleMenu' }]
});

Menu.index({name:'text'});

module.exports = mongoose.model('Menu',Menu);