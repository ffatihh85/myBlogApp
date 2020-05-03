const express = require("express"),
      router = express.Router();
const  Blog   = require("../models/blogModel");      

// router.get("/", (req, res)=>{
//     res.send("Test ediyoruz..");
// })

// let data = [
//     {   
//         postTitle: "Blog denemesi",
//         postSubtitle: "Bu bir ilk blog denemesidir.",
//         image :"https://cdn.pixabay.com/photo/2017/03/08/19/53/overcoming-2127669_960_720.png"
//     },
//     {   
//         postTitle: "Testing a blog web site",
//         postSubtitle: "This is a blog testing",
//         image :"https://cdn.pixabay.com/photo/2020/03/10/16/47/moon-4919501_960_720.jpg"
//     },
//     {   
//         postTitle: "Mounting is not so far",
//         postSubtitle: "Nothing is impossible",
//         image :"https://cdn.pixabay.com/photo/2017/03/08/19/53/overcoming-2127669_960_720.png"
//     }
// ];

// router.get("/", (req, res) => {
//     res.render("home",{data:data});
// })

router.get("/", (req, res) => {
    Blog.find((er, foundBlogs)=>{
            if(er)
            {
                console.log("==================Error===================");
                console.log(er);            
            }
            else{
                console.log("==================All blogs===================");
                console.log(foundBlogs);
                res.render("home", {foundBlogs: foundBlogs});
            }
    });    
})

router.get("/about", (req, res) => {
    res.render("about");
})

router.get("/contact", (req, res) => {
    res.render("contact");
})



router.get("/resume", (req, res) => {
    res.render("resume");
})

module.exports = router; 