/**
 * Created by joseantpr on 19/5/17.
 */
const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();
const localConfig = require('../../localConfig');

const mongoose = require('mongoose');
const User = mongoose.model('User');

//POST - Creación de usuario
router.post('/', function(req, res, next){

    //Recogemos los datos del usuario
    const name = req.body.name;
    const email = req.body.email;
    const clave = crypto.createHash('sha256').update(req.body.clave).digest('base64');

    //Buscamos en la base de datos
    User.findOne({email: email}).exec(function (err, user) {
        console.log("Entra");
        if(err){
            let error = new Error('INTERNAL_ERROR');
            error.status = 500;
            return next(error);
        }
        //Si encontramos al usuario
        console.log(user);
        if(user){
            let error = new Error('USER_ALREADY_EXIST');
            error.status = 406;
            return next(error);
        }
        //Si no lo encontramos entonces procedemos a crearlo en mongodb
        const usuario = new User(req.body);
        usuario.clave = clave;

        usuario.save(function (err, usuarioGuardado) {
           if(err){
               let error = new Error('ERROR_SAVE');
               error.status = 406;
               return next(error);
           }
           res.json({success: true, result: usuarioGuardado});
        });

    });
});

//POST - Autenticación de usuarios
router.post('/authenticate', function (req, res, next) {

    const email = req.body.email;
    const clave = crypto.createHash('sha256').update(req.body.clave).digest('base64');
    User.findOne({email: email}).exec(function (err, user) {
        if (err){
            let error = new Error('INTERNAL_ERROR');
            error.status = 500;
            return next(error);
        }

        //Si no encontramos al usuario
        if(!user){
            let error = new Error('USER_NOT_FOUND');
            error.status = 404;
            return next(error);
        }

        if(clave !== user.clave){
            let error = new Error('INVALID_PASSWORD');
            error.status = 401;
            return next(error);
        }

        //Creamos nuestro Token
        jwt.sign({user_id: user._id}, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, function (err, token) {
            res.json({success: true, token});
        });

    });

});

module.exports = router;