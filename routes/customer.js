const express = require('express');
const Sequelize = require('sequelize');
const { Customer } = require('../models/customer');
const router = express.Router();
const db = require('../models')


router.get('/', function(req, res, next) {
    db.Customer.findAll()
    .then((customers) => {
       res.render('../views/customers', {customerData:customers})
    });
});

router.get('/:slug', function(req, res, next) {
    db.Customer.findAll()
    .then((customers) => {
        let {slug} = req.params;
        let index = slug - 1;
        res.render('../views/customerProfile', {customerData:customers[index]})
    });
});

module.exports = router;






