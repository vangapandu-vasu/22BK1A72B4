const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const shortid = require("shortid");
const space = require("./databases/urldb.js");
const { getuser } = require("./authen");
const cors = require("cors");

const app = express();
const port = 9000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/space")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Connection failed");
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

// Server start
app.listen(port, () => {
    console.log("Server started on port", port);
});

