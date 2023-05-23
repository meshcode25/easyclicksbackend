const express = require("express")
const router= express.Router()


const loginController= require("../controllers/logincontoller")

//Here are the APIsfor varies sign up routes
//display the sign up form on route /get and /post
//router.get("/login", loginController.login_form_get);
router.get("/", res.send("you just requested a login access with get method"))
//loginController.login_form_post
//Handle the entered data for sign up after post request
//router.post("/", loginController.login_form_post)
router.post("/", res.send("you just requested a login access with post method"))
module.exports=router

