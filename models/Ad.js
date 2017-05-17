/**
 * Created by joseantpr on 16/5/17.
 */
"use strict";

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    imageURL: String,
    tags:[String]
});

var Ad = mongoose.model('Ad',adSchema);
