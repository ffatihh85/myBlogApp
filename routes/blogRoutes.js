const express = require("express"),
  router = express.Router();
const Blog = require("../models/blogModel");

router.get("/addNewBlog",isLoggedIn, (req, res) => {
  res.render("blog/newBlog");
  // res.send("aasdasda");
});

//   router.post("/addNewBlog", (req, res) => {
//     alert("fatih ere3z");
//   //  res.send("merhaba dünya");
//   // res.send("aasdasda");
// });

router.post("/addNewBlog", (req, res) => {

  let blogTitle = req.body.data.blogTitle;
  let comSentence = req.body.data.comSentence;
  let comImage = req.body.data.comImage;
  let blog = req.body.data.blog;
  let username = req.body.data.username;

  let newBlog = {
    title: blogTitle,
    comSentence: comSentence,
    comImage: comImage,
    blog: blog,
    username : username
  };

  Blog.create(newBlog).then((newBlog) => {
    console.log(newBlog);
    res.status(201).json(newBlog);
  })
    .catch((er) => {
      console.log("==================Error===================");
      console.log(er);
      res.send(er);
    });

});

router.get("/blogs/:blogId", (req, res) => {
  Blog.findById(req.params.blogId)
    .then((foundBlog) => {
      res.render("blog/showBlog", { foundBlog: foundBlog });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
});


router.get("/testing", (req, res) => {
  Blog.find()
    .then((foundBlogs) => {
      res.json(foundBlogs);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;       