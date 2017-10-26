var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//show all campgrounds 
router.get("/", function(req, res){
    
    //get all camps from db
    Campground.find({}, function(err, allCampgrounds){
       
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});

       }
        
    });
    
});

//Create Post
//post的route可以任意取，但是惯例是增加的是什么就用什么与get的route一样，但是性质完全不一样
router.post("/", middleware.isLoggedIn, function(req, res){
    
    //注意body的用法，得到data from post
    var name =  req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newCampground = {name: name, image: image, description: description, author: author};
    //campgrounds.push(campground);
    
    Campground.create(newCampground, function(err, newlyCampground){
       
       if(err){
           console(err);
       } else{
            res.redirect("/campgrounds");

       }
        
    });
    
});

//New campground. Display form 
router.get("/new", middleware.isLoggedIn, function(req, res){
   
   res.render("campgrounds/new");
    
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    // Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
        
    });
    
});


//Edit campground routes
// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;