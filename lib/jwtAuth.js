/**
 * Created by joseantpr on 3/5/17.
 */
"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');


//Middleware de autenticacion
module.exports = function (req, res, next) {
    //Recoger el token
    const token = req.body.token || req.query.token || req.get('x-access-token');

    if (!token){
        const error = new Error('NO_TOKEN_PROVIDED');
        error.status = 401;
        return next(error);
    }

    jwt.verify(token, localConfig.jwt.secret, function (err, decoded) {
        if(err){
            return next(new error('INVALID_TOKEN'));
        }
        next();

    });

};