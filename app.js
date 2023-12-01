const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Create express instnace
const app = express();

// Connect to MongoDB
const dbURI = "mongodb+srv://rpeglow:DiqZI7e47KKCQql2@node-tut.xgff5ig.mongodb.net/"
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));




// registar view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// Export the server middleware
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index',{title: 'Home', blogs});
    });

app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
    });

app.get('/blogs/create', (req, res) => {    
    res.render('create',{title: 'Create A New Blog'});
    });

app.use((req, res) => {
    res.status(404).render('404',{title: '404'});
    });