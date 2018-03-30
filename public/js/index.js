var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
  /* socket.emit('createMessage', {
    from: 'Andrew',
    text: 'Yup, that works for me.'
  });*/
});

socket.on('newMessage',function(message){
   console.log('new message',message);
});
