'use strict'
//mongoose es una libreria que me permite conectarme a MongoDB pero existen otras 
var mongoose = require('mongoose');

//cuando levanto la bdd MongoDB en modo desarrollo y el schema que especifico no existe
//MongoDB por default lo crea , en modo producción hay que crear primero el schema en la BDD
var Schema = mongoose.Schema;

var Zona= new Schema({
	name:String,
	code:String,
	parroquia: { type: mongoose.Schema.Types.ObjectId, ref: 'Parroquia' },
	recintos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recinto' }]
});

Zona.index({code:'text', name:'text'});

module.exports = mongoose.model('Zona',Zona);