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
    socket.emit('newEmail',{
        from: 'hema@example.com',
        text: 'hi',
        createAt: 123
    });

    socket.emit('newMessage',{
        from: 'naren@example.com',
        text: 'new message sent',
        createAt: '08/03/2018 9:00PM'
    });

    socket.on('createEmail', function(newemail){
        console.log('createEmail:',newemail);
    })

    socket.on('createMessage', function(message){
        console.log("createMessage:",message )
    })
});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

