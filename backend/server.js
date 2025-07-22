const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dat=require("./databases/maindata");


app.use(express.json());
app.use(express.urlencoded({express:true}));

mongoose.connect('mongodb://127.0.0.1:27017/space')
.then(()=>console.log("database connected"))
.catch(()=>console.log("not connnected"));


app.post("/sginup",async(req,res)=>{
    const {name,email,password}=req.body;
    const user=await dat.create({
        name,
        email,
        password,
    });
    return res.send("done")
});

app.listen(9000,(req,res)=>{
    console.log("worked");
});