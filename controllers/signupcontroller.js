require("dotenv").config()
const role=require("../models/rolesModel")
const User=require("../models/userModel")
const bcrypt= require("bcryptjs")
const verificationCode = require("../verificationCode")
const moment =require("moment")
const Refreshtoken=require("../models/refreshtoken");
// exports.signup_form_get= function(req,res, next)
const sendMail = require("../nodemailer")
const nodemailer= require("../nodemailer")

const jwt=require("jsonwebtoken");
// const secret= require("../authConfig")
const secret=process.env.SECRET
const sendEmail=require("../Oauth2")
// console.log(`Is this the undefinedd?? ${secret}`);

exports.signup_form_post= function(req,res, next){
    //console.log(req)
    console.log(req.body.email)
    User.findOne({
        email:req.body.email
    }).exec().then(user=>{
        if(user){
            // console.log(user)
           return res.status(200).send({message:"Email Already Registered, Please Login!" })
        }  
        else{
    
            const verification=verificationCode();
            console.log("this is the verification code we are talking about  " + verification)
            var user= new User({
                email:req.body.email,
                role:req.body.role,
                password:bcrypt.hashSync(req.body.password, 8),
                status:"pending",
                verificationcode:verification
            })


            // console.log(user)
            user.save((err)=>{
            if(err){
                return res.send({message:err})
            }
            else{
            var refreshnow=verificationCode();
         
            const refresh_token=jwt.sign({exp:Math.floor(Date.now()/1000 + (5*60)),user:user }, process.env.REFRESH_SECRET)
           
            var refreshtoken= new Refreshtoken({
                userid:user._id,
                refreshtoken:refresh_token,
                
            })

            refreshtoken.save((err)=>{
                if(err){
                    console.log("could not save the refresh token ")
                     res.status(401).send({message:err});
                }
                else{
                    // console.log(`This is the one for verify refreshtoken + ${refreshtoken}`);
                    // console.log(refreshtoken)
                }
            })
            // .catch(err=>{console.error(`Error in saving new refresh token to database ${err}`)})
            
            const token=jwt.sign({exp:Math.floor(Date.now()/1000)+ (60*2), user:user}, secret)   
   
          
            console.log(sendMail, user.email);
            sendMail(user.email,token);
                // res.setHeader('x-access-token', 'Bearer '+ token);
                return res.status(201).send({message:`Account Created Successfully,check your Email to Verify your Account`, refreshtoken:refresh_token, accesstoken:token})
            }
        })  
        }
    }).catch(err => console.error(`An error occured while loking at the database for sign up ${err}`))

}         
          
