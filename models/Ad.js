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

adSchema.statics.list = function (filter, limit, skip, cb) {
    const query = Ad.find(filter);
    query.limit(limit);
    query.exec(cb)

}

var Ad = mongoose.model('Ad',adSchema);
