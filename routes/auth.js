
// import express from 'express';
// const authRouter = express.Router()
// import mongoose from "mongoose";
// const user =  mongoose.model("User");
// import bcrypt from "bcrypt";
// import {v4 as uuid4} from 'uuid';
// import isLoggedIn from "../middlewares/isLoggedIn.js";





const express = require('express');
const authRouter =  express.Router()
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const { v4:uuid4 } = require('uuid'); 
const isLoggedIn = require("../middlewares/isLoggedIn.js");
// const jwt = require("jsonwebtoken")
const sendResponse = require('../utilities/response');



const zukuMessage = [
  "Just asked my team to code a 'dislike' button, but only for photos of my dog Beast. He's getting a bit too much love these days!",
"Did you know? If you tilt your head 15 degrees to the left while browsing Facebook, it actually enhances your social media experience. #FakeTips",
"Who needs AI when you have a toddler who hides your things randomly around the house. New level of unpredictability unlocked.",
"Switched my job title to 'Chief Bug Creator.' The engineers seemed to agree wholeheartedly.",
"Tried to add 'Father of the Internet' to my bio, but my wife made me change it back.",
"Stepping up my game. Learning how to 'share' and 'like' posts simultaneously.",
"Spent the whole day trying to find the 'logout' button on Facebook. Can anyone help?",
"Just coded a feature to block all memes making fun of my haircut. Feels good.",
"Tried to create a Facebook profile for my dog Beast, but he was too young to meet the age requirement.",
"Some days I feel like I'm running a tech company. Other days, it's more like a digital zoo.",
"Decided to invent time travel, just so I can go back and invest in Bitcoin.",
"My New Year's resolution: Stop trying to sneak new features past the QA team.",
"Hired a personal assistant today. It's an AI bot, but I promise it won't take over the world... yet.",
"Adding a new Facebook feature: 'Poke+.' It's like a regular poke, but more awkward.",
"Thought about adding a 'Seen by Mark Zuckerberg' feature to every post, but then realized I don't have time to browse all your food pictures.",
"Someone asked me to fix their computer today. Just because I created Facebook doesn't mean I can help you with your printer issues.",
"Just made a new rule at the office: No talking about MySpace on Throwback Thursdays.",
"Had a dream last night that Twitter bought Facebook. Woke up in a cold sweat.",
"Just to clarify, I don't get a notification every time you post a status. But the NSA says 'Hi'.",
"Planning to invent an 'I'm Feeling Lucky' feature for Facebook. It randomly likes a photo from 2009."
]




authRouter.post('/signup', async (req, res) => {
   const { name, email, password } = req.body;
 
   // Check if all fields are filled
   if (!name || !email || !password) {
     return sendResponse(res, false, 'Please add all the fields', null,400);
   }
 
   try {
     // Check if user email already exists in database
     const existingUser = await User.findOne({ email });
 
     if (existingUser) {
       return sendResponse(res, false, 'User already exists with that email', null, 400);
     }
 
     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Create a new user
     let newUser = new User({
       name,
       email,
       password: hashedPassword
     });
 
     // Save the new user
     let savedUser = await newUser.save();
 
     if (!savedUser) {
       return sendResponse(res, false, 'User not saved', null,400);
     }
 
     // Generate token
     let token = uuid4();
     savedUser.token = token;
     await savedUser.save();
 
     return sendResponse(res, true, 'User saved successfully', savedUser);
 
   } catch (err) {
     console.log(err);
     return sendResponse(res, false, 'Server error', null,500);
   }
 });


 authRouter.post('/login', async (req, res) => {
   const { email, password } = req.body;
 
   if (!email || !password) {
     return sendResponse(res, false, 'Please add all the fields', null,400);
   }
 
   try {
     const foundUser = await User.findOne({ email });
 
     if (!foundUser) {
       return sendResponse(res, false, 'User not found', null,400);
     }
 
     const isMatch = await bcrypt.compare(password, foundUser.password);
 
     if (!isMatch) {
       return sendResponse(res, false, 'Invalid password', null,400);
     }
 
     // Generate token
     let token = uuid4();
     foundUser.token = token;
     await foundUser.save();
 
     return sendResponse(res, true, 'User logged in successfully', foundUser);
 
   } catch (err) {
     console.log('Issue while searching email in database', err);
     return sendResponse(res, false, 'Server error', null, 500);
   }
 });




authRouter.delete('/logout', isLoggedIn, async (req, res) => {
   try {
     req.user.token = null;
     const savedUser = await req.user.save();
 
     return sendResponse(res, true, 'User logged out successfully', savedUser);
   } catch (err) {
     console.log('Logout Failed', err);
     return sendResponse(res, false, 'Logout Failed', null, 500);
   }
 });


  authRouter.get('/zuku', isLoggedIn, async (req, res) => {
      let name = req.user.name;
      let randomIndex = Math.floor(Math.random() * zukuMessage.length);
      return sendResponse(res, true, 'Message from Mark Zuckerberg', { message: zukuMessage[randomIndex], user: req.user});
  })



module.exports = authRouter;

