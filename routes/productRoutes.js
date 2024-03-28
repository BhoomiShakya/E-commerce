const express=require('express');
const Product = require('../model/Product');
const Review = require('../model/Review');
const { validateProduct , isLoggedIn,isSeller,isProductSeller } = require('../middleware');
const router=express.Router() //mini instance or alternate for app

//READ
router.get('/products',isLoggedIn, async (req,res)=>{
    try{
        let products=await Product.find({}); //promise
        console.log(req.user);
        res.render('products/index',{products})
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
    
})

// TO SHOW A PARTICULAR PRODUCT
router.get('/products/:id' ,isLoggedIn, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        console.log(foundProduct);
        res.render('products/show' , {foundProduct})
    }
    
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})

//to show a new form
router.get('/product/new',isLoggedIn,(req,res)=>{
    try{
        res.render('products/new');
    }
   
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})  

//to actually adding data
router.post('/products',isLoggedIn,validateProduct,isSeller,async(req,res)=>{
    try{
        let {name ,img , price , desc} = req.body;
        await Product.create({name,img,price,desc,author:req.user._id});
        req.flash('success','Product Added Successfully')
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})



// FORM TO EDIT A PARTIICULAR PRODUCT
router.get('/products/:id/edit' ,isLoggedIn, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        console.log('sam1',foundProduct,'sam');
        res.render('products/edit' , {foundProduct})
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})


// TO ACTUALLY CHANGE IN db
router.patch('/products/:id' ,isLoggedIn,validateProduct,async(req,res)=>{
    try{
        let {id} = req.params;
       let {name , img , price , desc} = req.body;
        await Product.findByIdAndUpdate( id , {name , img , price , desc});
        req.flash('success','Product Edited Successfully')
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

// DELETE THE EXISTING PRODUCT
router.delete('/products/:id' ,isLoggedIn,isProductSeller,async(req,res)=>{
    try{
        let {id} = req.params;
        let product=await Product.findById(id)
        for(let idd of product.reviews){
        await Review.findByIdAndDelete(idd);
        }
    
        await Product.findByIdAndDelete(id);
        req.flash('success','Product Deleted Successfully')
    
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

module.exports=router;
