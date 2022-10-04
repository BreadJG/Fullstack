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
        let customer = customers.find((customer) => {
            // console.log(customer.dataValues.firstName + customer.dataValues.lastName)
            return customer.dataValues.firstName + customer.dataValues.lastName === slug;
        })
        res.render('../views/customerProfile', {customerData:customer})
    });
});

module.exports = router;






