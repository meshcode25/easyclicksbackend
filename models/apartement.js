const mongoose=require("mongoose")
const moment=require("moment")
const async= require("async")

var Schema= mongoose.Schema

var apartementSchema= new Schema({
        apartement_first_name:{type: String, required:true, max:100},
        apartement_last_name: {type:String, required:false, max:100},
        landlord: {type:Array, ref:"unit"},
        caretaker: {type:Array, ref:"unit"},
        apartement_address:{type:Array, ref:"unit"},
        units: {type:Array, ref:"unit"},
        units_pictures:{type:Schema.ObjectId, ref:"unitsimages"},
})

//virtual cretions of the apartements
apartementSchema.virtual('apartementname').get (function(){
        var apartementname= ""

        if(!first_name)
        return "propertymanager/apartement/" + this.id;
    })   


apartementSchema.virtual("apartementname").get(function(){
        var apartementname="";
        if(first_name && last_name){
            apartementname= first_name + "," + last_name;
        }
        if(!fist_name && !family_name){
            apartementname=" ";
        }
        return apartementname;
    })
module.exports= mongoose.model("apartement", apartementSchema);
    