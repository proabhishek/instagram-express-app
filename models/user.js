// import mongoose from "mongoose"; 
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
},
    { timestamps: true }
)


mongoose.model("User", userSchema)


// jwt => json web token 




