const express = require('express');
const Sequelize = require('sequelize');
const { Admin } = require('../models/admin');
const { Interaction } = require('../models/interaction');
const router = express.Router();
const db = require('../models')

router.get('/', function(req, res, next) {
    db.Admin.findAll()
    .then((admins) => {
       res.render('../views/admin', {adminData:admins})
    });
});

router.get('/:slug', function(req, res, next) {
    let {slug} = req.params;
    let index = slug - 1;
    Promise.all([db.Admin.findByPk(slug), 
                 db.Interaction.findAll({
                    where: {adminId: slug}
                }),
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
                lastName: data[2].find((x) => x.id === interaction.customerId)?.lastName
            })
        })
        res.render('../views/adminProfile', {adminData:data[0], customerInteractions})
    });
});



module.exports = router;