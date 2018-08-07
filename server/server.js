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
    
    socket.emit('newMessage',{
        from:'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User Joined',
        createdAt: new Date().getTime()
    });




    socket.on('createMessage', function(message){
        console.log("createMessage at Server:",message )
            io.emit('newMessage',{
            from:message.from,
            text:message.text,
             createAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('disconnect',()=>{
    console.log('disconnected from client');
    });

});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

