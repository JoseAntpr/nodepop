/**
 * Created by joseantpr on 19/5/17.
 */
"use strict";

const express = require('express');
const router = express.Router();
const url =require('url');

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');

const jwtAuth =  require('../../lib/jwtAuth');
router.use(jwtAuth)


//GET - Devuelve una lista de anuncios
router.get('/', function (req, res, next) {

    const name = req.query.name;
    const sale = req.query.sale;
    const tag = req.query.tag;
    const price = req.query.price;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);


    const filter = {}

    console.log("Name: " + name)
    if(name){
        filter.name = new RegExp('^' + name , "i");
        console.log(filter.name);
    }

    console.log("Sale: " + sale)
    if(sale){
        filter.sale = sale
    }

    console.log("Tag: " + tag);
    if(tag){
        filter.tags = tag.split(",");
        filter.tags = {$in: filter.tags};
    }

    console.log("Price: " + price);
    if(price){
        filter.price = filterPriceFunction(price);

    }


    const query = Ad.list(filter, limit, skip, function (err, rows) {
        if(err){
            let error = new Error('INTERNAL_ERROR');
            error.status = 500;
            return next(error);
        }
        rows.forEach(function (row) {
            row.imageURL = url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname:"/images/ads/" + row.imageURL
            });
        });
        res.json({success:true, result: rows})
    });


    
});

// GET - Devuelve una lista de Tags
router.get('/tags', function (req, res, next) {
    const query = Ad.find();
    query.select('tags');

    query.exec(function (err, rows) {
        if(err){
            console.log(err.message);
            let error = new Error('INTERNAL_ERROR');
            error.status = 500;
            return next(error);
        }

        const tags = [];

        rows.forEach((row) => {
            row.tags.forEach((tag) => {
               if( tags.indexOf(tag) === -1){
                   tags.push(tag)
               }
            });
        });

        res.json({success: true, result: tags})
    })

});

function filterPriceFunction(price) {
    const priceSplit = price.split('-');

    if(priceSplit.length === 2){
        if(priceSplit[0] == ""){
            return {'$lte': priceSplit[1]}
        }else if(priceSplit[1] == ""){
            return {'$gte': priceSplit[0]}
        }else{
            return {'$gte': priceSplit[0], '$lte': priceSplit[1]}
        }
    }else{
        return parseInt(price);
    }

}

module.exports = router;