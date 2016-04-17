'use strict'
//mongoose es una libreria que me permite conectarme a MongoDB pero existen otras 
var mongoose = require('mongoose');

//cuando levanto la bdd MongoDB en modo desarrollo y el schema que especifico no existe
//MongoDB por default lo crea , en modo producción hay que crear primero el schema en la BDD
var Schema = mongoose.Schema;

var Votos= new Schema({
	cod_provincia:String,
	cod_canton:String,
	cod_parroquia:String,
	cod_recinto:String,
	cod_zona:String,
	cod_junta:String,
	nulos:Number,
	blancos:Number,
	validos:Number	
});

Votos.index({cod_junta:'text'});

module.exports = mongoose.model('Votos',Votos);