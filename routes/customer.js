const express = require('express');
const Sequelize = require('sequelize');
const { Customer } = require('../models/customer');
const router = express.Router();
const db = require('../models');
const interaction = require('../models/interaction');
const { json } = require('body-parser');
const admin = require('../models/admin');
const { application } = require('express');


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
            return customer.dataValues.firstName + customer.dataValues.lastName === slug;
        })
        Promise.all([db.Customer.findByPk(customer.id), 
            db.Interaction.findAll({
            where: {customerId: customer.id}
        }),   
    ])
        .then((data) => {
            res.render('../views/customerProfile', {customerData: customer, interactionData:data[1]})
        });
        
    });
});



module.exports = router;






