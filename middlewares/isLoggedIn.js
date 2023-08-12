const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const sendResponse = require('../utilities/response');


const isLoggedIn = async (req, res, next) => {
    let token = req.headers.authorization;
  
    if (!token) {
      return sendResponse(res, false, 'You must be logged in', null);
    }
  
    token = token.split(" ")[1];

    if (!token) {
      return sendResponse(res, false, 'You must be logged in', null);
    }
  
    try {
      const foundUser = await User.findOne({ token });
  
      if (!foundUser) {
        return sendResponse(res, false, 'User not found', null);
      }
  
      req.user = foundUser;
      next();
    } catch (err) {
      console.log('Token is invalid', err);
      return sendResponse(res, false, 'Token is invalid', null);
    }
  };

module.exports = isLoggedIn;