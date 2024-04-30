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


app.use(function middleware(req, res, next){
    let test = req.method + req.path + req.ip
    res.send(test)
    next()
})






































 module.exports = app;
