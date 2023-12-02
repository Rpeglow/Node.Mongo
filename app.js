const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Create express instance
const app = express();

// Connect to MongoDB
const dbURI = "mongodb+srv://rpeglow:Baldlime@atlasdb.wsfajmf.mongodb.net/test"
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000);
        console.log("Connected to MongoDB and listening on port 3000");
    })
    .catch((err) => console.log(err));

// registar view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
});

// blog routes
app.get('/blogs/create', (req, res) => {    
    res.render('create',{title: 'Create A New Blog'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((blogs) => {
            res.render('index',{title: 'All Blogs', blogs: blogs})
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findById(id)
        .then((blog) => {
            res.render('details',{ blog: blog, title: 'Blog Details'});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => {
            res.json({redirect: '/blogs'});
        })
        .catch((err) => {
            console.log(err);
        });
});


app.use((req, res) => {
    res.status(404).render('404',{title: '404'});
});