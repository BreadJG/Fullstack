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


module.exports = router;






