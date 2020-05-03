const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {type: String, required : "Cannot be empty 1"},
    comSentence: {type: String, required : "Cannot be empty 2"},
    comImage: {type: String, required : "Cannot be empty 3"},
    blog: {type: String, required : "Cannot be empty 4"},
    date: {type: Date,default: Date.now },
    username : {type: String, required: "Cannot be empty 5"}
})

module.exports = mongoose.model("Blog", blogSchema);
