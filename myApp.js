let express = require('express');
let app = express();
require('dotenv').config()
let bodyParser = require('body-parser')



app.use(function middleware(req, res, next){
    // let response = req.method + " " + req.path + "-" + req.ip
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

console.log("Hello World")

//app.METHOD(PATH, HANDLER).
app.get("/", function(req, res){
    // res.send("Hello Express")
    res.sendFile(__dirname + "/views/index.html")
})

app.use("/public", express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: false}))

app.get("/json", function(req, res){
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message": "HELLO JSON"})
    }else{
        res.json({"message": "Hello json"})
    }
    
})

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
},function(req, res){
    res.send({time: req.time})
}
)

app.get("/:word/echo", function(req, res){
    returnWord = req.params.word
    res.send({echo: returnWord})
})

// app.get("/name", function(req, res){
//     var first = req.query.first
//     var last = req.query.first

//     res.send({name: first + " " + last})
// })

app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    // var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
      name: `${firstName} ${lastName}`
    });
  });

  app.post("/name", function(req, res){
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  })





























 module.exports = app;
