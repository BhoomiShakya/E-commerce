const express=require('express');
const User=require('../model/User');
const passport = require('passport');

const router=express.Router() //mini instance or alternate for app
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

router.post('/register',async (req,res)=>{
    let {username,email,password,role}=req.body;
    let newuser=new User({username,email,role})
    let nayabnada = await User.register(newuser,password)
    // res.render('auth/login')
    req.login(newuser,function(err){
        if(err){
            return next(err)
        }
        req.flash('success','Welcome');
        return res.redirect('/products');
    });

})


router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login',
    passport.authenticate('local',
    {
        failureRedirect: '/login'
    }),
    (req,res)=>{
        console.log(req.currentUser);
        res.redirect('/products');
    }
);


//logout


router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','Thankyou For Visiting')
      res.redirect('/login');
    });
  });
module.exports=router;