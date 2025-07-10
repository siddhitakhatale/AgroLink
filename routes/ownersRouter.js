const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
const {registerOwner,loginOwner}=require("../controllers/authController");
const isLogged=require("../middlewares/islogged")

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0){
            return res
              .status(503)
              .send("you dont have any permission to create an user");
            
        }
        let {fullname,email,password}=req.body;
        let createOwner=await ownerModel.create({
            fullname,
            email,
            password,
           
        })
        res.status(201).send(createOwner);
            
    })
}


router.get("/admin",isLogged,function(req,res){
    let success=req.flash("success");
    res.render("createproduct",{success});
})
router.post("/register",registerOwner);

router.post("/login",loginOwner);


module.exports = router;