/**
 * Created by joseantpr on 16/5/17.
 */
"use strict";

var mongoose = require('mongoose');
var conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function (err) {
    console.log("Error en la conexíon con la Base de datos", err);
    process.exit(1);
});

conn.once('open', function () {
    console.log("Conectado a mongodb.");
});

mongoose.connect('mongodb://127.0.0.1:27017/nodepop');