const express = require('express');
const Sequelize = require('sequelize');
const { Interaction } = require('../models/interaction');
const router = express.Router();
const db = require('../models')


router.get('/', function(req, res, next) {
    Promise.all([db.Interaction.findAll(),
        db.Admin.findAll(),
        db.Customer.findAll(),
    ])
    .then((data) => {
        const customers = [];
        const admins =[];
        data[2].forEach((customer) =>{
            customers.push({
                firstName: customer.firstName,
                lastName: customer.lastName
            })
        })
        data[1].forEach((admin) =>{
            admins.push({
                adminName: admin.name,
            })
        })
       res.render('../views/interaction', {interactionData:data[0], customers, admins})
    });
});

module.exports = router;






