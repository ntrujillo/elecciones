'use strict'
//mongoose es una libreria que me permite conectarme a MongoDB pero existen otras 
var mongoose = require('mongoose');

//cuando levanto la bdd MongoDB en modo desarrollo y el schema que especifico no existe
//MongoDB por default lo crea , en modo producción hay que crear primero el schema en la BDD
var Schema = mongoose.Schema;

var Junta= new Schema({
	name:String,
	code:String,
	recinto: { type: mongoose.Schema.Types.ObjectId, ref: 'Recinto' }
});

Junta.index({name:'text'});

module.exports = mongoose.model('Junta',Junta);