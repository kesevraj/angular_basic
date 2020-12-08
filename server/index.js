const express = require ("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const url = "mongodb://localhost:27017";
const PORT = process.env.port || 5000


const app = express()
app.use(cors());
app.use(bodyParser.json());

app.post("/data/:email", async function(req, res) {
    email = req.params.email;
    //res.send("post route")
    userdata = req.body;
    const salt = await bcrypt.genSalt(10);
    console.log(userdata)
    userdata.password = await bcrypt.hash(userdata.password, salt);
    console.log(userdata)
     console.log(email);
    mongoclient.connect(url, function(err, client) {
      if (err) throw err;
      db = client.db("projectangular");
  
      // db.collection("employee").insertOne(req.body,(err,data)=>{
      //   if (err) throw err;
  
      //   // console.log(data)
  
      //   res.json({"mess":"inserted data in data base"})
  
      // })
  
      db.collection("users").findOne({ email: email }, function(err, result) {
        if (err) throw err;
        // console.log(result);
  
        if (result) {
          res.json({ mess: "mail ID already registered" });
          client.close();
        } 
        else {

            

        db.collection("users").insertOne(userdata, (err, data) => {
           console.log(userdata,"db insterted")
            
            if (err) throw err;
           
            const payload = {
                users: {
                    id: userdata._id
                }
            };
        
            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token, mess: "inserted data in data base"
                    });
                }
            );

  
            client.close();
          });
        }
      });
  
      

    });

    
  });

  app.post("/data/login/user", (req,res) => {

    userlogin=req.body

    mongoclient.connect(url, function(err, client) {
        if (err) throw err;
        db = client.db("projectangular");

    db.collection("users").findOne({ email: this.userlogin.email },async function(err, result) {
        if (err) throw err;
         console.log(result ,"login result");
  
        if (!result) {
          res.json({ mess: "user does not exist " });
          client.close();
        } 

        else {
console.log(this.userlogin.password,"user passwword");
console.log(result.password,"result password");
            const isMatch = await bcrypt.compare(this.userlogin.password,result.password);
            console.log(isMatch,"password match")
            if (!isMatch)
            return res.status(400).json({
              mess: "Incorrect Password !"
            });

                const payload = {
                    users: {
                        id: result._id
                    }
                };
            console.log(payload)
                jwt.sign(
                    payload,
                    "randomString", {
                        expiresIn: "120s"
                    },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            token, mess: "login succesfully"
                        });
                    }
                );


        }
    })

  })
})


const auth = function(req, res, next) {
  const token = req.header("Authorization");
  console.log(token,"token")
  if(typeof token !== 'undefined') {
    req.token = token;  // Set the token
    next(); // Next middleware
  } 
  else {
    // Forbidden
    res.sendStatus(403);
  }
  
  }

  


app.get("/userverify", auth,  (req, res) => {
  jwt.verify(req.token, 'randomString', (err, authData) => {
    if(err) {
    res.json({message:"session expired"});
    }
    else {
    res.json({
    message: 'Post created...',
    authData
    });
   
    }
    });
});





app.get("/",(req,res) =>{

     res.json({ message: "API Working" });
})

app.listen(PORT, (req,res) => {

    console.log(`server running at port ${PORT} `)

})