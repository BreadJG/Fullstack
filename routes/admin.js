const express = require('express');
const Sequelize = require('sequelize');
const { Admin } = require('../models/admin');
const router = express.Router();
const db = require('../models')


router.get('/', function(req, res, next) {
    db.Admin.findAll()
    .then((admins) => {
       res.render('../views/admin', {adminData:admins})
    });
});

module.exports = router;






