 const nodemailer= require("nodemailer")
 const authconfig=require("./authConfig")



 const transport=nodemailer.createTransport({
     service:"GMAIL",
     auth:{
        user:process.env.OWNER,
        pass:process.env.PASSWORD
     } 
        
 })


 const sendMail=(email,verificationcode)=>{
     console.log("Verify Email Password Sent")
    
    
     transport.sendMail({
         from:process.env.OWNER,
         to:email,
         subject: "Please Verify Your Account",
         html: `<h1>Email Confirmation</h1>
             <h3>Hello there</h3>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
             <a color="blue" href=http://localhost:3000/confirm/${verificationcode}> Click here</a>
             <p>
             Or if your prefer Please copy and paste or click on this link to your browser to verify your Email, Thanks for subscribing!! 
           </p>
           <p>
           <a color="blue" href=http://localhost:3000/confirm/${verificationcode}> http://localhost:3000/confirm/${verificationcode}}</a>
             </p>
           <p>
             Tschuss!!
             </p>
             </div>`,
       }).catch(err => console.log(err));
   
   
   

 }





 module.exports=sendMail