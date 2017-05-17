/**
 * Created by joseantpr on 17/5/17.
 */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String,
});

var User = mongoose.model('User', userSchema);