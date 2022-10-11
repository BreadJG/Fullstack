const express = require('express');
const app = express();
const db = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize});
const bcrypt = require('bcrypt');
const adminRouter = require('./routes/admin');
const interactionRouter = require('./routes/interaction');
const customerRouter = require('./routes/customer');
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const { sequelize, Sequelize } = require('./models');
const { DATE } = require('sequelize');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/admin', checkAuth, adminRouter);
app.use('/interaction', checkAuth, interactionRouter);
app.use('/customers', checkAuth, customerRouter);
app.use(
    session({
        secret:'secret',
        resave: false,
        saveUninitialized: true,
        store: store,
    }),
);
store.sync();


//ROUTES
app.get('/', (req, res) => {
    // console.log({type: Sequelize.DATE})
    res.render('home');
});


function checkAuth(req, res, next) {
    if (req.session.user){
        next();
    } else {
        alert("Please log in before proceeding."),
        res.redirect('/')
    }
};

//Do we need to adjust the sequelize model to accept new admins from register page?
//then store session data in sequelize session DB instead of local/cookies 

//REGISTER ROUTE
app.get('/register', (req, res) => {
    res.render('./register')
})

//REGISTER ROUTE
app.post('/register', (req, res) => {
    const {name, email, phone, password} = req.body;
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        let newAdmin = await db.Admin.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
        })
        .then((result) => {
            console.log('it works')
            res.redirect('/')
        })
    })
});

// app.post('/register', async (req, res) => {
//     const hash = bcrypt.hashSync(req.body.password, 10);
//     let newAdmin = await db.Admin.create({
//         name: req.session.name,
//         email: req.session.email,
//         phone: req.session.phone,
//         password: hash,
//     })
//     .then((result) => {
//         res.redirect('/');
//     })
// });


//LOGIN ROUTE
app.post('/', (req, res) => {
    const {username, password} = req.body;
    db.Admin.findOne({
        where: {username},
    }).then((Admin) => {
        bcrypt.compare(password, Admin.password, (err, match) => {
            if(match) {
                //handle successful login
                res.send('password matched')
            } else {
                //handle login failure
                res.send('password did not match')
            }
        })
    })
})


app.post('/customer/:slug', checkAuth, async (req, res) =>{
    let newInteraction = await db.Interaction.create({
        customerId: req.body.custId,
        adminId: req.body.selectID,
        type: req.body.selectType,
        note: req.body.inputNote,
    })
    res.redirect('back', {
        user: req.session.user,
    });
});


app.post('/customer', checkAuth, async (req, res) =>{
    let newCustomer = await db.Customer.create({
        firstName: req.body.inputFirstName,
        lastName: req.body.inputLastName,
        phone: req.body.inputPhone,
        email: req.body.inputEmail,
        city: req.body.inputCity,
        state: req.body.selectState,
    })
    res.redirect('back', {
        user: req.session.user,
    });
});


const server = app.listen(4000, function() {
    console.log('Server running at http://localhost:4000/')
});


