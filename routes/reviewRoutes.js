const express=require('express');
const Product = require('../model/Product');
const Review = require('../model/Review');
const { validateReview } = require('../middleware');
const router=express.Router() //mini instance or alternate for app


// adding in database
router.post('/products/:id/review',validateReview, async (req,res)=>{
    try{
        let {id}=req.params;
        let{rating,comment}=req.body;    
        let review=new Review({rating,comment});
        let product=await Product.findById(id);
        product.reviews.push(review);
        await product.save();
        await review.save();
        req.flash('success','Review Added Successfully')
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})




//export so that you can use it in app.js
module.exports=router;
