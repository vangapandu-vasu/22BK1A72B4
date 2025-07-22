const express=require("express");
const app=express();
const mongoose=require("mongoose");
const del=require("./databases/maindata");
const mod=require("./databases/urldb.js");
const port=9000;
const {setuser,getuser}=require("./authen");
const cookieParser = require("cookie-parser");
const {v4:uuidv4}=require("uuid");



app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(cookieParser());
app.use(express.urlencoded({express:true}));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/space')
.then(()=>console.log("database connected"))
.catch(()=>console.log("not connnected"));



app.post("/sginup",async(req,res)=>{
    const {name,email,password}=req.body;
    const check=await act.findOne({email});
    if(!check){
        res.send("The email already exists");
    }
    else{
        const user=await del.create({
        name,
        email,
        password,
    });
    }
    return res.send("done")
});

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await act.findOne({email,password})
    if(!user){
        console.log("invalid credentials");
        return res.send("wrong details");
    }
    else{
        const token=setuser(user);
        res.cookie("uid",token,
            {
                httpOnly: true, // Prevents JavaScript from accessing it
                secure: true, // Set true in production (HTTPS required)
                sameSite: "lax", // Allows sending cookies on same-site requests
            }
        );
        return res.send("access granted");
        return res.status(200).json({ message: "access granted", token });
    }
});

server.post("/urlshort",async(req,res)=>{
    const body=req.body
    if(body.url===""){
        return res.status(400).json("bad request it cannot be empty");
    }
    const shortId=shortid.generate();
    await mod.create({
        shortd:shortId,                   //creationnnn for url
        redirectlink:body.url,
        visitHistory:[]
    });
    console.log("data uploaded successfully");
    return res.render('home',{
        id:shortId,
    }
    );
});

server.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;

    console.log("Received request for shortId:", shortId);
    const entry=await mod.findOneAndUpdate(
        {
             shortd: shortId ,
        },
        {
            $push:{
                visitHistory:{timeStamp:Date.now()},             //updataion
            },
        },
        { new: true },
    );
    if(!entry){
        console.log("error in redirectlink");
        return res.status(404).json("not found");
    }
    else{
    console.log("its working");
    res.redirect(entry.redirectlink);
    }
});

server.get("/authen/allusers",async(req,res)=>{
    try{
        const token=req.cookies.uid;
        const verify=getuser(token);
        if(verify){
            return res.send("authentication done");
        }
        else{
            return res.send("not verified");            //used to know the authentication is working while running this
        }
    }catch(error){
        console.log("there exists a error",error);
        return res.status(500).json("server side error");
    };
    
}); 

app.listen(port,(req,res)=>{
    console.log("worked");
});