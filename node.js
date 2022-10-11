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
let userLogged = [];

// Use the session middleware
app.use(session({ secret: 'digital crafts', cookie: { maxAge: 60000 }}))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/admin', checkAuth, adminRouter);
app.use('/interaction', checkAuth, interactionRouter);
app.use('/customers', checkAuth, customerRouter);
// app.use(
//     session({
//         secret:'secret',
//         resave: false,
//         saveUninitialized: true,
//         store: store,
//     }),
// );
// store.sync();


//ROUTES
app.get('/', (req, res) => {
    if (session.username){
        let login = true;
        res.render('home', {login:login, user:userLogged});
    }else{
        let login = false;
        res.render('home', {login:login, user:userLogged});
    }
    
});


function checkAuth(req, res, next) {
    if (session.username){
        next();
    } else {
        res.redirect('/')
    }};

//REGISTER ROUTE
app.get('/register', (req, res) => {
    res.render('./register')
})

app.post('/register', async(req, res, next)=>{
    const hashPassword = await bcrypt.genSalt(10);
    var usr = {
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      password : await bcrypt.hash(req.body.password, hashPassword)
    };
    created_user = await db.Admin.create(usr);
    res.redirect('/')
  });

//LOGIN ROUTE

app.post('/',async(req,res,next)=>{
 const user = await db.Admin.findOne({ where : {email: req.body.emailInput} });
 if(user){
    const password_valid = await bcrypt.compare(req.body.passwordInput,user.password);
    if(password_valid){
        let login = true;
        sessions = req.session;
        session.username=user.name;
        session.id=user.id;
        res.render('home', {user:user, login:login});
        userLogged.push(user);
    }
    else{
        res.send('Invalid username or password');
    };
}});

//LOG OUT

app.get('/logout',(req,res) => {
    req.session.destroy();
    session.username = false
    let login = false;
    let userLogged = []
    res.render('home', {login:login, user:userLogged});
    return userLogged
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


app.post('/customer', checkAuth, async (req, res) =>{
    let newCustomer = await db.Customer.create({
        firstName: req.body.inputFirstName,
        lastName: req.body.inputLastName,
        phone: req.body.inputPhone,
        email: req.body.inputEmail,
        city: req.body.inputCity,
        state: req.body.selectState,
        addedBy: session.id,
    })
    res.redirect('back');
});


const server = app.listen(4000, function() {
    console.log('Server running at http://localhost:4000/')
});