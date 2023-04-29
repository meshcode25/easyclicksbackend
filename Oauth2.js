require("dotenv").config()

const nodemailer=require("nodemailer");
const {google}=require("googleapis");
const OAuth3=google.auth.OAuth2;

// console.log("Here is google apis    " + OAuth3);

const createTransporter =  (emailcontact, token2) => {
    const Easyclicksclient = new OAuth3(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    Easyclicksclient.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  
    const accessToken = () => {
      Easyclicksclient.getAccessToken((err, token)=>{
          if (err) {
           console.log("Failed to create access token ");
          
          }
            console.log("acces token successfullly created")
            return token
        });
    }
    // const accesstoken=accessToken();
    // console.log(accesstoken)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });
    const usermail=emailcontact;
    const username=usermail.substring(0,usermail.lastIndexOf("@"));


    transporter.sendMail({
        subject: "Please Verify Your Account",
        html: `
          <div>
           <p style="font-size:1.4rem" >Hello ${username},</p>

            <p>Thank you for subscribing... </p>
            
            <p>
              Please confirm your email by clicking on the following link
            </p>
          <a color="blue" href=http://localhost:3000/confirm/${token2}> Click here</a>
          <p>
            Or if your prefer Please copy and paste or click on this link to your browser to verify your Email, Thanks for subscribing!! 
          </p>
          <p>
          <a color="blue" href=http://localhost:3000/confirm/${token2}> http://localhost:3000/confirm/${token2}</a>
            </p>
          <p>
            Tschuss!!
            </p>
          </div>
            `,
    
        to: emailcontact,
        from: process.env.GMAIL
      });
    }
    // console.log("have sent the stupid email"), 



  
  module.exports=createTransporter