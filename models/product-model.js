const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    image:Buffer,
    name:String,
    category:String,
    price:Number,
    discount:[
        {
            type:Number,
            default:0
        }
    ],
    bgcolor:String,
    panelcolor:String,
    textColor:String
})
module.exports=mongoose.model("product",productSchema);