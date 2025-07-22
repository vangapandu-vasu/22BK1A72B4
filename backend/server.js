const express=require("express");
const app=express();
const mongoose=require("mongoose");
const del=require("./databases/logdata");
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
    if(check){
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
    }
});
// POST route to shorten URL
app.post("/urlshort", async (req, res) => {
    const url = req.body.url;

    if (!url || url === "") {
        return res.status(400).json({ message: "Input field is empty" });
    }

    const shortd = shortid.generate();

    await space.create({
        shortd: shortd,
        redirectlink: url,
        visitHistory: []
    });

    console.log("New short URL created:", shortd);
    res.status(201).json({ id: shortd });
});

// GET route for redirection based on short ID
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await space.findOneAndUpdate(
        { shortd: shortId },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ message: "Short URL not found" });
    }

    console.log("Redirecting to:", entry.redirectlink);
    res.redirect(entry.redirectlink);
});

// Route to check authentication
app.get("/authen/allusers", async (req, res) => {
    try {
        const cookie = req.cookies.uid;
        const check = getuser(cookie);

        if (check) {
            res.status(200).json({ authenticated: true });
        } else {
            res.status(401).json({ authenticated: false });
        }
    } catch (err) {
        res.status(500).json({ error: "Authentication check failed" });
    }
});
app.listen(port,(req,res)=>{
    console.log("worked");
});