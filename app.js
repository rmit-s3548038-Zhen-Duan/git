var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js");
var User = require("./models/user.js");
var seedDB = require("./seeds.js");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var connectFlash = require("connect-flash");

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://root:root>@ds231715.mlab.com:31715/yelp_camp");



app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));



//这行的作用是 tell express to search public
app.use(express.static(__dirname + "/public"));

app.use(connectFlash());


//seedDB();

//require routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")



//use express-session
app.use(require("express-session")({
    secret: "Please include the following file with any support request",
    resave: false,
    saveUninitialized: false
}));

//set up passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set up current user functionality 有点不懂
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
   next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});
