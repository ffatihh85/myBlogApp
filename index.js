const mongoose = require("mongoose"),
        express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        passport = require("passport"),
        LocalStrategy = require("passport-local"), //facebook ile giriş yapma, google  +  ile yapma... gibi stratejiler ....
        expressSession = require("express-session"),
        User = require("./models/userModel");


//routes
const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");

//app.config
mongoose.connect("mongodb://localhost/BlogApp");

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

//passport config
app.use(require("express-session")({
    secret: "Bu bizim güvenlik cümlemizdir.",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//share current user info within all routes
app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    next();
});

//routes using
app.use(indexRoutes);
app.use(adminRoutes);
app.use(blogRoutes);

const server =  app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("App started. Port number: %d", server.address().port);
    }
})
