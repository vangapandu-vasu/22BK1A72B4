import mongoose from "mongoose";

const dataschema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});

const del=new mongoose.model("sample",dataschema);

module.exports=del;
