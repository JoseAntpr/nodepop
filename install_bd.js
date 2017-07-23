/**
 * Created by joseantpr on 17/5/17.
 *
 */
"use strict";
//Requires
var mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const localConfig = require('../localConfig');

require('./models/Ad');
require('./models/User');

//Creación de variables
const ad = mongoose.model('Ad');
const user = mongoose.model('User');



//Script de inicialización de la base de datos
console.log("Comenzando el Script");

//Comienza el código de conexión con la base de datos
var conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function (err) {
    console.log("Error en la conexíon con la Base de datos", err);
    process.exit(1);
});

conn.once('open', function () {
    console.log("Conectado a mongodb.");
});

mongoose.connect(localConfig.bd.database);


function saveData(data, collection) {
   let collectionName = mongoose.model(collection).collection.collectionName;
   
   data[collectionName].forEach(function (item) {
       let newData;
       if (collectionName === 'ads'){
           console.log(item);
           newData = new ad(item);


       }else if(collectionName === 'users'){
           console.log(item);
           item.clave = crypto.createHash('sha256').update(item.clave).digest('base64');
           newData = new user(item);

       }else{
           console.log("Coleccion inválida");
       }

       newData.save(function (err, itemSave) {
           if(err){
               console.log("El elemento no ha sido guardado");
               return;
           }
           console.log("Los elementos de "+ collectionName + " han sido guardados")

       });


   });



}


function dropCollections(collection) {
    var promesa =  new Promise(function (resolve, reject) {

        mongoose.model(collection).remove({}, function (err) {
            if(err){
                reject (err);
                return
            }
        });

        resolve('la Collection '+ collection + 'ha sido borrada ');


    });

    return promesa;
}

function loadJson(file, collection) {

    let promesa = new Promise(function (resolve, reject) {

        let ruta = path.join('json', file);

        fs.readFile(ruta, 'utf8', function (err, data) {
            if(err){
                console.log('Se ha producido un error al leer el archivo' + file, err)
            }

            var datajson = JSON.parse(data);

            saveData(datajson, collection);
            resolve('Se ha cargado correctamente');

        });


        
    });

    return promesa;
}

async function main(collection, file){
    try {
        console.log('Comenzando el reseteo de la coleccion: ... ' + collection);
        await dropCollections(collection);
        await loadJson(file, collection);
        console.log('Fin del reseteo de la colección ' + collection);

    }catch(err) {
        console.log(' Se ha producido un error en el reseto de la colección ' + collection, err)
    }
    return;

}

async function execute(){
    await main('Ad', 'ads.json');
    await main('User', 'users.json');
    console.log("...Desconexión con MongoDB");
    await conn.close();
}

execute();








