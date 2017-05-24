/**
 * Created by joseantpr on 24/5/17.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const languages = require('../localConfig').languages;


var languagesloaded = [];

function errorTranslated(lang, message, resolve, reject){
    if(languagesloaded[lang][message] === undefined){
        return reject('Error: ' + message + ' not exists in this file for language' + lang)
    }
    return resolve(languagesloaded[lang][message]);
}

function loadErrors(file) {

    let promesa = new Promise(function(resolve, reject){

        let ruta = path.join('json', file);

        fs.readFile(ruta, 'utf8', function (err, data) {
           if(err){
               reject(err);
               return;
           }

           languagesloaded = JSON.parse(data);
           resolve();
        });

    });

    return promesa;

}


module.exports = function (lang, message) {

    let promise = new Promise(function (resolve, reject) {

        let languagesSelected = languages.default;

        if(languages.availables.indexOf(lang) != -1){
            languagesSelected = lang;
        }

        if(languagesloaded[languagesSelected] != undefined){
            return errorTranslated(languagesSelected, message, resolve, reject);
        }else{
            loadErrors('errors.json').then(() => {
                return errorTranslated(languagesSelected, message, resolve, reject);
            }).catch(function (err) {
                console.log("Entra");
                return reject(err);
            });
        }

    });

    return promise;

}