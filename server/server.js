const path=require('path');
const http=require('http');
const express=require('express');
const socketio=require('socket.io');

const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT|| 3000;
var app=express();

var server=http.createServer(app);
var io=socketio(server);

app.use(express.static(publicpath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.on('disconnect',()=>{
    console.log('disconnected from client');
})

});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

