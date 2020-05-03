const express = require("express"),
      router = express.Router(),
      User   = require("../models/userModel"),
      passport = require("passport")   ;


let adminActions = [
    {
        actionId: 1,
        actionName: "changeHomeImage",
        displayName :"Change Home Image"
    },
    {
        actionId: 2,
        actionName: "changeAboutImage",
        displayName :"Change About Image"
    },
    {
        actionId: 3,
        actionName: "changeAboutText",
        displayName :"Change About Text"
    },
    {
        actionId: 4,
        actionName: "addNewBlog",
        displayName :"Add New Blog"
    },
    {
        actionId: 5,
        actionName: "listAllBlogs",
        displayName :"List All Blogs"
    }
];

router.get("/admin", isLoggedIn, (req, res) => {
        res.render("admin/admin", {adminActions: adminActions});
    })

router.get("/signin", (req, res) => {
    res.render("admin/signin", {message: ""});
})

router.get("/signin/:hata",  (req, res) => {
    res.render("admin/signin", {message: req.params.hata});   
  });

router.get("/signup/:hata",isLoggedIn, (req, res) => {
    res.render("admin/signup", {message: req.params.hata});
})

router.get("/signup",isLoggedIn, (req, res) => {
    res.render("admin/signup", {message: ""});
})


router.post("/signin", passport.authenticate("local", 
{
    successRedirect: "/",    
    failureRedirect: "/signin" 
}), 
    (req, res)=>  {    
});

router.post("/signup", isLoggedIn, (req, res) => {
        let newUser = new User({ username: req.body.username});
        User.register(newUser, req.body.password, (err, user)=>{
            if(err)
            {
                console.log("*********");
                console.log(err);
                res.redirect("/signup/:"+ err.message);
            }
            else {
                passport.authenticate("local")(req, res, ()=>{
                res.redirect("/");
                });
            }
        });
});

router.get("/signout", (req, res) =>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}


module.exports = router; 