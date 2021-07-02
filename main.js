
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);


io.on('connection', (socket) => {
    console.log("There's user!");

    socket.on('message',(message) =>{
        console.log("There is a message!");
        console.log(message);
        var user =  message.split('_');
        io.emit('message', `${user[0]} said : ${user[1]}`)
    })
})

app.get("/",function(req,res){
    res.render("index")
})

server.listen(8080, () => {
    console.log("Wooo")
})
