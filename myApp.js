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

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        res.json({ "message": "HELLO JSON" })
    } else {
        res.json({ "message": "Hello json" })
    }
});


// request time
app.get("/now", function (req, res, next) {
    req.time = new Date().toString() // set req.time to date
    next()
}, function (req, res) {
    res.send({ time: req.time }) // spit out time
}
)


app.get("/:word/echo", (req, res) => {
    const {word}  = req.params;
    res.json({
      echo: word
    });
  });


  app.get("/name", (req, res) =>{
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({ name: `${firstName} ${lastName}` });
  })

module.exports = app;