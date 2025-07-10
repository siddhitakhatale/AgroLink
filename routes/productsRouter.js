const express = require("express");
const router = express.Router();
const upload = require("../config/multer-cofig");
const prductModel = require("../models/product-model");
const isLogged=require("../middlewares/islogged")

router.post("/create",isLogged, upload.single("image"), async function (req, res) {
    try {
        let { name,category, price, discount, bgcolor, panelcolor, textColor } = req.body;
        let product = await prductModel.create({
            image: req.file.buffer,
            name,
            category,
            price,
            discount,
            bgcolor,
            panelcolor,
            textColor
        });
        req.flash("success","product created successfully");
        res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message);
    }
});

module.exports = router;