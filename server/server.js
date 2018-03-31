const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//escuchando un evento
io.on('connection', (socket) => {
  console.log('New user connected');
  
  //escuchando correo
  /*socket.emit('newMessage',{
	  from:'juanito',
	  text:'oaao',
	  createAt:123333
	  
  });*/
  /*
  socket.emit from admin text welcome to the chat app*/
 /*socket.emit('newMessage',{
	  from:'admin',
	  text:'bienvenidos a la app del chat'
	 
	  
  });*/
 socket.emit('newMessage',generateMessage('admin','bienvenidos al chat'));
  socket.broadcast.emit('newMessage',generateMessage('admin','nuevo usuario'));
  /*socket.broadcast.emit('newMessage',{
		from: 'admin',
		text: 'nuevo usuario',
		createAt: new Date().getTime()
	});*/
 /* socket.broadcast.emit from admin text new user join
  */
  
  
  socket.on('createMessage', (message,callback) => {
    console.log('createMessage', message);
	io.emit('newMessage',generateMessage(message.from,message.text));
	callback('this is from server');
	/*io.emit('newMessage',{
		from: message.from,
		text: message.text,
		createAt: new Date().getTime()
	});*/
	/*socket.broadcast.emit('newMessage',{
		from: message.from,
		text: message.text,
		createAt: new Date().getTime()
	});*/
  });
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});


