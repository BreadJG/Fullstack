const express = require('express');
const router = express.Router();
const db = require('./models')


router.get('/admin', function(req, res, next) {
    db.Admin.findAll()
    .then((admins) => {
       res.render('admin', {adminData:data})
    });
});

module.exports = router;






