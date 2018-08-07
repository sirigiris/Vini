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
  
    socket.on('createMessage', function(message){
        console.log("createMessage at Server:",message )
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createAt: new Date().getTime()
        });
    })
});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

