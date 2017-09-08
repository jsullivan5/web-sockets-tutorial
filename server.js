var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('initial', 'A user has connected');

  socket.on('new message', (msg) => {
    socket.broadcast.emit('new message', msg);
  });

  socket.on('disconnect', function(){
    io.emit('end', 'A User has disconnected');
  });

  socket.on('typing', function(userName) {
      socket.broadcast.emit('typing', `${userName} is typing.`);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
