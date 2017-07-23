/**
 * Created by joseantpr on 20/5/17.
 */
"use strict";

module.exports = {
    jwt: {
        secret: 'secretsupersecreta',
        expiresIn: '2d',
    },

    languages: {
        default: 'en',
        availables: ['es', 'en']
    },
    bd: {
        database: 'mongodb://127.0.0.1:27017/nodepop'
    }
};