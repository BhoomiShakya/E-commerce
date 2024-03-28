const express=require('express');
const router=express.Router()
const Product = require('../model/Product');
const { isLoggedIn } = require('../middleware');
const User = require('../model/User');


//route to see cart
router.get('/user/cart', isLoggedIn,async (req,res)=>{
    let user=await User.findById(req.user._id).populate('cart')
    res.render('cart/cart',{user})

})



//actually adding product to cart
router.post('/user/:productId/add',isLoggedIn,async (req,res)=>{
    let {productId}=req.params;
    let userId=req.user._id;
    let product=await Product.findById(productId);
    let user=await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
})


module.exports=router;