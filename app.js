// import express from "express";
// import mongoose from "mongoose";

// import "./models/user.js"; // load
// import authRouter from "./routes/auth.js";
const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
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



// basic apis: 
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (Swaziland)", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];


  app.post('/search', (req, res) => {
    console.log("Someone Searched for", req.body.search);
    let search = req.body.search;
     if(!search){
            res.status(400).json({
                success: false,
                message: 'Search field is required',
                data: null
            });
     }

     let filteredCountries = countries.filter(country => country.toLowerCase().includes(search.toLowerCase()));
     res.status(200).json({
        success: true,
        message: 'Countries filtered successfully',
        data: filteredCountries
    });

})



let users = [
    {
        id: 1, 
        userName: "ramesh",
        password: "1234",
        token: ['LeKWoFSqn2OPEZh8', '1yqo6As45amS7gUE', 'k0r2dCYp9QqsMNtA', 'mOMwPyQX9zkSXq1I']
    },
    {
        id: 2, 
        userName: "suresh",
        password: "1234",
        token: ['M3IQ1tnz9d48xgrU', 'fiGLAm91fV3KTMbi', 'wJMuSdSlTVgy825R', 'fgDYQBdXfrpXGxW0']
    },
    {
        id: 3, 
        userName: "rajesh",
        password: "1234",
        token: ['adOjpqnKT65PVeGa', 'pIVp4VV56JzAKM28', 'jPvSRVige3FN40Mq', 'xYssCWTng7VM63Od']
    }
]

// let usersToken = []

// Book data
let books = [
    { id: 101, name: "The Alchemist", author: "Paulo Coelho", pages: 208 },
    { id: 102, name: "1984", author: "George Orwell", pages: 328 },
    { id: 103, name: "Sapiens", author: "Yuval Noah Harari", pages: 498 },
    { id: 104, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", pages: 336 },
    { id: 105, name: "Atomic Habits", author: "James Clear", pages: 320 },
    { id: 106, name: "The Power of Now", author: "Eckhart Tolle", pages: 236 },
    { id: 107, name: "Thinking, Fast and Slow", author: "Daniel Kahneman", pages: 499 },
    { id: 108, name: "The Lean Startup", author: "Eric Ries", pages: 336 },
    { id: 109, name: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", pages: 224 },
    { id: 110, name: "Zero to One", author: "Peter Thiel", pages: 195 }
];

// User book study data
let userBooks = [
    {
        userId: 1,
        books: [
            { bookId: 101, pagesRead: 100 },
            { bookId: 103, pagesRead: 250 },
            { bookId: 105, pagesRead: 150 },
            { bookId: 108, pagesRead: 300 }
        ]
    },
    {
        userId: 2,
        books: [
            { bookId: 102, pagesRead: 200 },
            { bookId: 104, pagesRead: 120 },
            { bookId: 106, pagesRead: 90 },
            { bookId: 109, pagesRead: 180 },
            { bookId: 110, pagesRead: 150 }
        ]
    },
    {
        userId: 3,
        books: [
            { bookId: 103, pagesRead: 400 },
            { bookId: 107, pagesRead: 250 },
            { bookId: 108, pagesRead: 310 },
            { bookId: 109, pagesRead: 190 }
        ]
    }
];



app.post('/login', (req, res) => {
    let {userName, password} = req.body;
    if(!userName || !password){
        res.status(400).json({
            success: false,
            message: 'Username and Password is required',
            data: null
        });
    }
   let user = users.find(user => user.userName === userName && user.password === password);
   
    if(user){
        // let token = uuidv4();
        // user.token = token;
       
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                id: user.id,
                userName: user.userName, 
                password: user.password
            },
            token: user.token[parseInt(Math.random()*4)]
        });
    }
    else{
        res.status(401).json({
            success: false,
            message: 'Invalid credentials',
            data: null
        });
    }
})



  const checkLogin =   (req, res, next) => {
        let token = req.headers.token;
        if(!token){
            res.status(401).json({
                success: false,
                message: 'Token is required',
                data: null
            });
            return;
        }
        let userId
        for(let user of users){
             for(let tok of user.token){
                if(tok == token){
                   userId = user.id
                   break
                }
             }
        }

        
        if(!userId){
            res.status(401).json({
                success: false,
                message: 'Invalid token',
                data: null
            });
            return;
        }
       
        
           
            req.user = userId;
            next();
}



app.get("/user/history", checkLogin, (req, res) => {
    let userId = req.user;
    
    let user = userBooks.find(user => user.userId == userId);
    if(user){
        let userHistory = [];
        user.books.forEach(book => {
            let bookData = books.find(b => b.id == book.bookId);
            let bookHistory = {
                bookId: book.bookId,
                name: bookData.name,    
                pagesRead: book.pagesRead,
            }
            userHistory.push(bookHistory);
         }
        )
        res.status(200).json({
            success: true,
            message: 'User history fetched successfully',
            data: userHistory
        });
    }
    else{
        res.status(404).json({
            success: false,
            message: 'User not found',
            data: null
        });
    }
})



app.get("/books/:bookId", checkLogin, (req, res) => {
    let bookId = req.params.bookId;
    let book = books.find(book => book.id == bookId);
    if(book){
        res.status(200).json({
            success: true,
            message: 'Book fetched successfully',
            data: book
        });
    }
    else{
        res.status(404).json({
            success: false,
            message: 'Book not found',
            data: null
        });
    }
})


























app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})