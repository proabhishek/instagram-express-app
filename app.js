// import express from "express";
// import mongoose from "mongoose";

// import "./models/user.js"; // load
// import authRouter from "./routes/auth.js";
const express = require("express");
const mongoose = require("mongoose");
require("./models/user.js"); // load
require("./models/post.js"); // load
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");

const cors = require("cors");

const app = express();
const PORT = 5000;


// Database connection: //insta// xZ5oDX5Q0WFEWMbJ
//127.0.0.1:27017

mongoose.connect("mongodb+srv://insta:xZ5oDX5Q0WFEWMbJ@instagram-shared.u1de39h.mongodb.net/")
mongoose.connection.on("connected", () => {console.log("Connected to database")})
mongoose.connection.on("error", () => {console.log("Error connecting to database")})

// Middleware: 
app.use(cors());
app.use(express.json()) 
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.get("/", (req, res) => {
    res.send("Hello world to this insta app, Its a backend app so no output here");
})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})