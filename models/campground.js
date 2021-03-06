var mongoose = require("mongoose");


//setup schema
var campgroundSchema = new mongoose.Schema({
    
    name: String,
    image: String,
    description: String,
    cost: String,
    createdAt: { type: Date, default: Date.now },
    location: String,
    lat: Number,
    lng: Number,
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
    author:{
            id: {
                type:mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);