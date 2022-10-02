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
    db.Admin.findAll()
    .then((admins) => {
        let {slug} = req.params;
        let admin = admins.find((admin) => {
            return admin.dataValues.id === parseInt(slug);
        })
        res.render('../views/adminProfile', {adminData:admin})
    });
});

module.exports = router;

// app.get('/ceo/:slug', (req, res)=> {
//     let {slug} = req.params;
//     let index = db.map(e => e.slug).indexOf(slug);
//     let ceo = db[index];
//     res.render('partials/ceo-information', {db:db, ceo});
// });  




