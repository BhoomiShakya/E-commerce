const express=require('express');
const app=express();
const path=require('path')
const mongoose = require('mongoose');
const seedDB = require('./seed');
const methodOverride=require('method-override');
const productRoutes=require('./routes/productRoutes')
const reviewRoutes=require('./routes/reviewRoutes')
const authRoutes=require('./routes/authRoutes');
const cartRoutes=require('./routes/cartRoutes');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local');
const User = require('./model/User');



//connect--> return a promise
mongoose.connect('mongodb://127.0.0.1:27017/anime')
.then(()=>{console.log("DB CONNECTED")})
.catch((err)=>{console.log("DB NOT CONNECTED",err)})

//session
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie :{
        httpOnly: true,
        expires: Date.now()+24*7*60*60*1000,
        maxAge: 24*7*60*60*1000

    }
}

app.use(session(configSession));
app.use(flash());
 




//authentication
passport.use(new LocalStrategy(User.authenticate()))
 
app.use(passport.initialize());
//safe storage-- session
app.use(passport.session());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))



//midddleware for routers
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
//entering seed data
// seedDB()



let PORT=8080;
app.listen(8080,()=>{
    console.log(`server connected at port at ${PORT}`)
})