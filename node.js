const express = require('express');
const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');


const db = require('./models')

//ROUTERS
const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)
const interactionRouter = require('./routes/interaction')
app.use('/interaction', interactionRouter)
const customerRouter = require('./routes/customer')
app.use('/customers', customerRouter)

app.get('/', (req, res)=>{
    res.render('home');
});



// app.get('/admin', (req, res)=>{
//     res.render('admin', {db:db});
// });

// app.get('/customers', (req, res)=>{
//     res.render('customers', {db:db});
// });
    
// app.get('/interaction', (req, res)=>{
//     res.render('interaction', {db:db});
// });

var server = app.listen(4000, function() {
    console.log('Server running at http://localhost:4000/')
});


