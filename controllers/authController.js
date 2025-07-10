const userModel = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { generateToken }=require("../utils/generateToken");
const { use } = require("../routes");
const flash=require("connect-flash");
const ownerModel = require("../models/owners-model");
module.exports.registerUser= async function (req, res) {
    try {
        let { fullname,email, password } = req.body;
         
        let user=await userModel.findOne({email:email})
        if(user){
            req.flash("error","you have aldready account please login ")
            return res.redirect("/");
        }
        


        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname: fullname,
                        email: email,
                        password: hash
                        
                    });
                    let token=generateToken(user);
                    res.cookie("token",token);
                    let success=req.flash("success");
                    req.flash("success","user created successfully please login");
                    return res.redirect("/");
                }
            })
        })
        
        
    }
    catch (err) {
        console.log(err.message);
    }


};

module.exports.loginUser=async function(req,res) {
    let {email,password}=req.body;
    let user=await userModel.findOne({email:email});
    if(!user) return res.send("email and password are incorrect");
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            // let success=req.flash("success");
           
            let token=generateToken(user);
            res.cookie("token",token);
            return res.redirect("/home");
        }else{
            req.flash("error","email or password are incorrect");
            return res.redirect("/");
        }
    })

}
module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/")
}
module.exports.registerOwner= async function (req, res) {
    try {
        let { fullname,email, password } = req.body;
         
        let user=await ownerModel.findOne({email:email})
        if(user){
            req.flash("error","you have aldready account please login ")
            return res.redirect("/");
        }
        


        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else {
                    let owner = await ownerModel.create({
                        fullname: fullname,
                        email: email,
                        password: hash
                        
                    });
                    let token=generateToken(user);
                    res.cookie("token",token);
                    let success=req.flash("success");
                    req.flash("success","Farmer registred successfully please login");
                    return res.redirect("/owners");
                }
            })
        })
        
        
    }
    catch (err) {
        console.log(err.message);
    }


};
module.exports.loginOwner=async function(req,res) {
    let {email,password}=req.body;
    let owner=await ownerModel.findOne({email:email});
    if(!owner) return res.send("email and password are incorrect");
    bcrypt.compare(password,owner.password,function(err,result){
        if(result){
            let success=req.flash("success");
           
            let token=generateToken(owner);
            res.cookie("token",token);
            req.flash("success","Farmer logged in successfully");
            return res.redirect("/owners/admin");
        }else{
            req.flash("error","email or password are incorrect");
            return res.redirect("/owners");
        }
    })

}