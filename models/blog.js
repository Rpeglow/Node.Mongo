const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        },
    snippet: {
        type: String,
        required: true,
        },
    body: {
        type: String,
        required: true,
        },
    }, {timestamps: true});

    // Model name is singular and will be pluralized by mongoose ex: Blog -> blogs
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;