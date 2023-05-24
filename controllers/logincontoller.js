const User=require("../models/userModel")
const role=require("../models/rolesModel")
const jwt= require("jsonwebtoken")

const authconfig= require("../authConfig")
const bcrypt = require("bcryptjs")
const secret=authconfig.secret
// console.log(secret)

// jwt.sign({exp: Math.floor(Date.now()/1000) + 2*60}, secret)

// exports.login_form_get= function(req,res, next){


// }

exports.login_form_post=function(req,res,next){
    

          // Website you wish to allow to connect
          res.setHeader('Access-Control-Allow-Origin', 'https://easyclickspmsclient.vercel.app/o/auth/login/');
        
          // Request methods you wish to allow
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
          // Request headers you wish to allow
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
          // Set to true if you need the website to include cookies in the requests sent
          // to the API (e.g. in case you use sessions)
          //res.setHeader('Access-Control-Allow-Credentials', true);
          
          // Pass to next layer of middleware
          next();
    

    User.findOne({
        email:req.body.email
    }).exec().then(user=>{
        if(user){
            const validPassword= bcrypt.compareSync(
                req.body.password,
                user.password
            )

            const isVerifiedEmail=()=>{
                if(user.status==="pending"){
                    return false
                }
                else{
                    return true
                }
               
            }
          
          const verified=isVerifiedEmail()
            console.log(verified);
            console.log(user);
            if(!validPassword){
                return res.status(200).send({message: "Invalid Password or Email", accesstoken:null, color: "red", type:"invaliduser",  header:"Access-Control-Allow-Origin', 'https://easyclickspmsclient.vercel.app/o/auth/login/"})
            }
            else{
                if(!verified){
                    return res.status(200).send({message: "Unverified Email, Please Check you Email to Verify your Account", color: "red", type:"unverified",  header:"Access-Control-Allow-Origin', 'https://easyclickspmsclient.vercel.app/o/auth/login/"})
                
                }else{    
                    const token=jwt.sign({exp:Math.floor(Date.now()/1000)+ (60*2), user:user}, process.env.SECRET)   
                    const refreshtoken=jwt.sign({exp:Math.floor(Date.now()/1000)+ (60*5), user:user}, process.env.SECRET)
                    console.log(user)

                    return res.status(201).send({
                        // email:user.email,
                        accesstoken:token, 
                        type:"successlogin",
                        message:"Login Success, wait as we redirect you to the next page",
                        refreshtoken:refreshtoken,
                        // accesstoken: token, 
                        color:"green",
                        header:"Access-Control-Allow-Origin', 'https://easyclickspmsclient.vercel.app/o/auth/login/"
                    })
                }   
            }
        }  
        else{
//           return  res.setHeader('Access-Control-Allow-Origin', 'https://easyclickspmsclient.vercel.app/o/auth/login/')
            return res.status(200).send({message:"Invalidd Email or Password", color: "red", type:"invaliduser", Headers:"Access-Control-Allow-Origin', 'https://easyclickspmsclient.vercel.app/o/auth/login/"})  
    }
    }).catch(err => console.error(`An error occured while looking at the database for login ${err}`))
}