const mongoose = require("mongoose")
const Article = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        required: true,
        default: new Date()
    },
    thumbnail: {
        type: String,
        required: true
    }
}, {collection: "articles"})

module.exports = mongoose.model("Article", Article)