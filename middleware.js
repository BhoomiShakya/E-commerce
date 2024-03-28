const { productSchema } = require("./schema");
const { reviewSchema } = require("./schema");
const Product = require('./model/Product');

const validateProduct = (req,res,next)=>{
    const {name, img, price , desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc});
    
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}

const validateReview = (req,res,next)=>{

    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});

    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}
const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Please Login First')
        return res.redirect('/login');
    }
    next();
}

const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You Do Not Have Access ')
        return res.redirect('/products')
    }
    else if(req.user.role!='seller'){
        req.flash('error','You Do Not Have Access ')
        return res.redirect('/products')
    }
    next();
}

const isProductSeller=async (req,res,next)=>{
    let {id}=req.params;
    let product = await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('error','You are not the authorised user ')
        return res.redirect('/products')
    }
    next()
}

module.exports = {validateProduct ,validateReview,isLoggedIn,isSeller,isProductSeller} ;