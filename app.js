require("dotenv").config()
const mongoose= require("mongoose")
const express = require("express")
const createError= require("http-errors")
const helmet= require("helmet")
const compression= require('compression') 
const path= require("path")
const cors=require("cors")
const auth=require("./middlewares/authentification")
const http= require('http')
const cookieParser = require("cookie-parser")

//require("jsonwebtoken")




// configure server
const app= express()


//set the roots to be used for the app
const loginRouter= require ("./routes/loginRouter")
const indexRouter= require("./routes/indexRouter")
const signupRouter= require("./routes/signupRouter")
const verifyemailRouter=require("./routes/verifyemailRouter")
const passwordresetRouter= require("./routes/passwordresetRouter")
const propertyMangerRouter= require("./routes/propertymanagerRouter")
//const landLordRouter= require("./routes/landlordRouter")
//const tenantRouter= require("./routes/tenantRouter")
//const maintenanceRouter= require("./routes/maintenanceRouter")

//populateDatabase
//var populatedDatabase= require("./populatedb");
//populatedDatabase();

//configure MongoDb database
//var db_url="mongodb://localhost:27017/pmsdatabase"
//mongoose.connect(db_url, {useNewUrlParser:true})

/*
const db_url= "mongodb+srv://mesh:mesh@cluster0-gbbbe.mongodb.net/test?retryWrites=true&w=majority"
mongoDB= process.env.mongoDB|| db_url;
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});
*/


const { MongoClient } = require("mongodb");
const username = encodeURIComponent("yegon");
const password = encodeURIComponent("Yegon@20**");
const cluster = "<clusterName>";
const authSource = "<authSource>";
const authMechanism = "<authMechanism>";


const mongodb_uri= `mongodb+srv://${username}:${password}@pmscluster.0rags3f.mongodb.net/test`

//mongodb+srv://yegon:<password>@pmscluster.0rags3f.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(`${mongodb_uri}`);

//mongoose.connect("mongodb+srv://yegon:Yegon@20**@pmscluster.0rags3f.mongodb.net/test", {useNewUrlParser:true})

const db=mongoose.connection
db.on("error", (error)=>{console.error(error)})
db.once("open", ()=>{console.log("Mongoose database has been successfully connected")})

//let uri =`mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;


  
  
  /* 
 
//const indexhtmlpath= path.join( publicPath,'pmsclient')

//set views and public folder for use
//app.set(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });


/*
const index=()=>{
  console.log("Please work man am loosing it")
  sendFile("hey what the fuck man!!")
  
}
*/

const corsOptions={
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  
}
  app.use(cors(corsOptions))


//body parser and urlencode
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.use(auth);
//use url paths as middlewares
app.use("/o/auth/passwordreset",  passwordresetRouter)
app.use("/o/auth/login",    loginRouter)
app.use("/o/auth/verify", verifyemailRouter)
app.use("/o/auth/signup",  signupRouter)
app.use("/", indexRouter)


app.use("/properties", propertyMangerRouter)

/*app.use("/landlord", landLordRouter)

app.use("/tenant", tenantRouter)
app.use("/maintenance", maintenanceRouter)
*/


//middlewares
app.use(compression())
app.use(helmet())
app.use(cookieParser())



//const renderToString  =require('react-dom/server');


// const publicPath = path.join(__dirname, "../pmsclient");

// app.get("/*", (req, res, next) => {
//   console.log(`Request URL = ${req.url}`);
//   if (req.url !== '/') {
//     return next();
//   }
//   const reactApp = ReactDOMServer.renderToString(React.createElement(App));
//   console.log(reactApp);
  
//   const indexFile = path.resolve(publicPath, "build", "index.html");
//   console.log("this is the indexfile route:", indexFile)
//   fs.readFile(indexFile, "utf8", (err, data) => {
//     if (err) {
//       const errMsg = `There is an error: ${err}`;
//       console.error(errMsg);
//       return res.status(500).send(errMsg);
//     }

//     return res.send(
//       data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
//     );
//   });
// });


app.use(express.static(path.join(__dirname, "../pmsclient", "build")));
app.use(express.static((path.join(__dirname, "public" ))));

/*
app.get("/", (req, res, next) => {
  Reactrender();
  console.log("we should now be able to render, oder ?")
  
});
app.get("/", (req, res) => {
  fs.readFile(path.join(publicPath, "public", "index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});
app.use((req, res, next) => {
 res.sendFile(path.join(publicPath, "public", "index.html"));
})

});

const clientpath=path.join(__dirname, "/public")
app.use(express.static(clientpath));
*/


//const indexhtml=  path.join(publicPath, "index.html");

//console.log(path.join(publicPath, "index.html"));
//console.log(public);
//onsole.log(__dirname);
//console.log(publicPath);

/*
app.get('/', (req,res)=>{
  console.log(__dirname, "pmsclient");
  res.sendFile(path.join(publicPath, "public", "index.html"));
}
)
*/
//This will create a middleware.
//When you navigate to the root page, it would use the built react-app


//catch 404 error and foward to error handler
/*app.use(function(req, res,next){
    next(createError(404));  
  })

  //error handler 
  /*
  
  app.use((err,req, res, next)=>{
      //render the error page
      res.status(err.status|| 500);
        console.log( "there was an error with the Server")
  })
 */

//server(app)

const port= process.env.PORT || 8000;
app.listen(port, ()=>{`${console.log(`The PMS Server has successfully started in Port ${port}`)}`})


//server()