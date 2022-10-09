const express = require('express');
const Sequelize = require('sequelize');
const { Interaction } = require('../models/interaction');
const { Admin } = require('../models/admin');
const router = express.Router();
const db = require('../models')


router.get('/', function(req, res, next) {
    Promise.all([db.Admin.findAll(), 
                 db.Interaction.findAll(),
                db.Customer.findAll()
    ])
    .then((data) => {
        const customerInteractions = [];
        data[1].forEach((interaction) => {
            customerInteractions.push({
                id: interaction.id,
                type: interaction.type,
                createdAt: interaction.createdAt,
                note: interaction.note,
                firstName: data[2].find((x) => x.id === interaction.customerId)?.firstName,
                lastName: data[2].find((x) => x.id === interaction.customerId)?.lastName,
                adminName: data[0].find((x) => x.id === interaction.adminId)?.name,
            })
        })
        console.log(customerInteractions);
        res.render('../views/interaction', {adminData:data[0], customerInteractions})
    });
});


module.exports = router;






