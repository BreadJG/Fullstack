const express = require('express');
const Sequelize = require('sequelize');
const { Interaction } = require('../models/interaction');
const router = express.Router();
const db = require('../models')


router.get('/', function(req, res, next) {
    db.Interaction.findAll()
    .then((interactions) => {
       res.render('../views/interaction', {interactionData:interactions})
    });
});

module.exports = router;






