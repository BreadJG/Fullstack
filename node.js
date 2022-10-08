const express = require('express');
const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

const db = require('./models')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//ROUTERS
const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)
const interactionRouter = require('./routes/interaction')
app.use('/interaction', interactionRouter)
const customerRouter = require('./routes/customer');
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const { sequelize, Sequelize } = require('./models');
const { DATE } = require('sequelize');
app.use('/customers', customerRouter)

app.get('/', (req, res)=>{
    console.log({type: Sequelize.DATE})
    res.render('home');
});

app.post('/customer/:slug', async (req, res) =>{
    let newInteraction = await db.Interaction.create({
        customerId: req.body.custId,
        adminId: req.body.selectID,
        type: req.body.selectType,
        note: req.body.inputNote,
    })
    res.redirect('back');
});

app.post('/customer', async (req, res) =>{
    let newCustomer = await db.Customer.create({
        firstName: req.body.inputFirstName,
        lastName: req.body.inputLastName,
        phone: req.body.inputPhone,
        email: req.body.inputEmail,
        city: req.body.inputCity,
        state: req.body.selectState,
    })
    res.redirect('back');
});


var server = app.listen(4000, function() {
    console.log('Server running at http://localhost:4000/')
});


