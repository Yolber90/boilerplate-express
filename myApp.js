let express = require('express');
let app = express();
require('dotenv').config()

app.use((req, res, next) => {
	let string = req.method + " " + req.path + " - " + req.ip;
	console.log(string);
	next();
});

console.log("Hello World")

// app.get("/", function(req, res){
//     res.send("Hello Express")
// });

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html")
});

app.use("/public", express.static(__dirname + "/public") );

app.get("/json", function(req, res){
    if(process.env.MESSAGE_STYLE == 'uppercase'){
        res.json({"message": "HELLO JSON"})
    }else{
        res.json({"message": "Hello json"})
    }
});


app.get("/now", function(req, res, next){
    req.time = new Date().toString()
    next()
},function(req, res){
    res.send({time: req.time})
}
 )



 module.exports = app;
