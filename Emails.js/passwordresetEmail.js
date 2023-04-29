// const nodemailer= require("nodemailer")
// const authconfig=require("../authConfig")



// const transport=nodemailer.createTransport({
//     service:"GMAIL",
//     auth:{
//         user:authconfig.owner,
//         pass:authconfig.pass
//     } 
        
// })

// ///
// const sendMail=(email)=>{
//     console.log("Passwor Reset Email Sent")
    
    
//     transport.sendMail({
//         from:authconfig.user,
//         to:email,
//         subject: "Password Reset Request Recieved,",
//         html: `<h1>Reset Your Password</h1>
//             <h3>Hello there</h3>
//             <p>We have recieved your Request to reset Your password. Please click on the link below to complete your passoword reset Request</p>
//              <a color="blue" href=http://localhost:3000/confirm/${verificationcode}> Click here</a>
//             </div>`,
//       }).catch(err => console.log(err));
   
   
   

// }





// module.exports=sendMail