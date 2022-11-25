const mongoose = require("mongoose");

const Schema= mongoose.Schema

const blogSchema= new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},{timestamps:true})

const Blog =new mongoose.model("Blog",blogSchema)
module.exports =Blog