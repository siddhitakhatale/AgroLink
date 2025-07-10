const express = require("express");
const { route } = require("./ownersRouter");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { generateToken }=require("../utils/generateToken");
const isLoggedIn=require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const { emit } = require("mutter");
// const userModel=require("../models/user")

router.get("/", function (req, res) {
    let error=req.flash("error");
    res.render("index",{error});
})
router.get("/owners",function(req,res){
    res.render("ownerlogin")
})
router.get("/home" ,isLoggedIn,async function(req,res){
    let products=await productModel.find()
    let success=req.flash("success");
    res.render("home",{products,success});
})
router.get("/addtocart/:productid",isLoggedIn,async function(req,res) {
   let user=await userModel.findOne({email:req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success","Added to cart");
   res.redirect("/home")
});

router.get("/cart",isLoggedIn,async function(req,res){
    let user=await userModel.findOne({email:req.user.email})
    .populate("cart");
    const bill=Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart",{user,bill});
    // console.log(user.cart);
})
router.get("/logout",isLoggedIn,function(req,res){
    res.render("/");
})
router.get("/blog",async function(req,res){
    res.render("blog");
})
router.get("/aboutUs",async function(req,res){
    res.render("about");
})
router.get("/shop",async function(req,res){
    res.render("shop");
})


module.exports = router;