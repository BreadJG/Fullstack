const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const db = require('./models')

// db.Admin.()
//     .then((admins) => {
//         admins.forEach((admin) =>{
//             console.log(admin.name)
//         })
//     });

db.Admin.findByPk(1)
    .then((admins) =>{
        console.log(admins)
    })

app.get('/', (req, res)=>{
    
    res.render('home');
    
});

app.get('/admin', (req, res)=>{
    res.render('admin', {});
});


app.get('/customers', (req, res)=>{
    
    res.render('customers', {db:db});
});
    

var server = app.listen(4000, function() {
    
    console.log('Server running at http://localhost:4000/')
    
});


