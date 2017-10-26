var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    
            {
                name: "Cloud's Rest", 
                image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
                description: "Bacon ipsum dolor amet swine t-bone cow beef ribs andouille fatback pancetta alcatra tri-tip venison. Tail frankfurter pork tongue bresaola venison bacon cupim ham jowl. Porchetta shank swine bacon. Salami pork belly beef ribs ground round, spare ribs shoulder ball tip ham hock tri-tip leberkas short ribs. Short ribs t-bone ball tip landjaeger porchetta kevin bresaola frankfurter alcatra turducken ham fatback ribeye pork shankle. Venison porchetta spare ribs swine, ground round beef ribs flank tri-tip pig corned beef meatloaf."
            },
            {
                name: "Desert Mesa", 
                image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
                description: "Bacon ipsum dolor amet swine t-bone cow beef ribs andouille fatback pancetta alcatra tri-tip venison. Tail frankfurter pork tongue bresaola venison bacon cupim ham jowl. Porchetta shank swine bacon. Salami pork belly beef ribs ground round, spare ribs shoulder ball tip ham hock tri-tip leberkas short ribs. Short ribs t-bone ball tip landjaeger porchetta kevin bresaola frankfurter alcatra turducken ham fatback ribeye pork shankle. Venison porchetta spare ribs swine, ground round beef ribs flank tri-tip pig corned beef meatloaf."
            },
            {
                name: "Canyon Floor", 
                image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
                description: "Bacon ipsum dolor amet swine t-bone cow beef ribs andouille fatback pancetta alcatra tri-tip venison. Tail frankfurter pork tongue bresaola venison bacon cupim ham jowl. Porchetta shank swine bacon. Salami pork belly beef ribs ground round, spare ribs shoulder ball tip ham hock tri-tip leberkas short ribs. Short ribs t-bone ball tip landjaeger porchetta kevin bresaola frankfurter alcatra turducken ham fatback ribeye pork shankle. Venison porchetta spare ribs swine, ground round beef ribs flank tri-tip pig corned beef meatloaf."
            }
        ];
        
function seedDB(){
    
    //Remove campgrounds
    Campground.remove({}, function(err){
    
        if(err){
            console.log(err);
        } else{
            console.log("Campgrounds Removed");
    
        }
                 //防止加完以后被删除
                //create campgrounds
                data.forEach(function(seed){
               
                Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err);
                   }else{
                       console.log("Campgrounds Added");
                       //create comment
                       Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                           
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else{
                                    //association data by using push
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("new comment created!");
                                }
                            }
                       );
                   }
                   
               })
                
            });
        
    
    });
    

}

module.exports = seedDB;
        
