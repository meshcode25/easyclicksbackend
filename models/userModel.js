var mongoose = require ("mongoose") ;
var moment= require("moment")
var async= require("async");
const verificationCode = require("../verificationCode");


var Schema= mongoose.Schema;

var UserSchema= new Schema({
    first_name: {type:String, required: false, max:100},
    email: {type:String, required: true},
    password:{type:String, required:true},
    role:{type:String, required:true},
    status:{type:String, required: false},
    refreshtoken_id:{
        type:mongoose.Types.ObjectId,
        ref:"refreshtoken",
    },
    verificationcode:{type:String, required: false},
})


UserSchema.virtual("url").get(function(){
    return "user"
})


module.exports = mongoose.model("user",UserSchema);