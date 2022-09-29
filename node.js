const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const db = require('./models')

const adminRouter = require('./routes/admin')

app.use('/admin', adminRouter)

// db.Admin.findAll()
//     .then((admins) => {
//         admins.forEach((admin) =>{
//             console.log(admin.name, admin.id, admin.email, admin.phone)
//         })
//     });


app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/admin', (req, res)=>{
    res.render('admin', {db:db});
});


app.get('/customers', (req, res)=>{
    res.render('customers', {db:db});
});
    

var server = app.listen(4000, function() {
    console.log('Server running at http://localhost:4000/')
});


