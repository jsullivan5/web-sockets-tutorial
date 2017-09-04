var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('initial', 'A user has connected')

  socket.on('chat message', (msg) => {
    console.log('Message: ', msg);
    io.emit('chat message', msg);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('end', 'A User has disconnected')
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
