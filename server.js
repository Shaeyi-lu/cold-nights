// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});


io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  socket.on('disconnect', function(data) {
      users.splice(users.indexOf(socket.username), 1);
      updateUsernames();
      connections.splice(connections.indexOf(socket), 1)
      io.emit('disconnected', socket.username);
      console.log('Disconnected: %s sockets connected', connections.length);    
  });

  socket.on('send message', function(data) {
      io.sockets.emit('new message', {msg: data, user: socket.username});
  });

  socket.on('add user', function(data, callback) {
      socket.username = data;

      if(users.indexOf(socket.username) > -1)
      {
          callback(false);
      }
      else
      {
          users.push(socket.username);
          updateUsernames();
          callback(true);

          if (Object.keys(users).length == 2)
          {
              io.emit('connected', socket.username);
              io.emit('game start');
          }
      }
  });

  socket.on('player choice', function (username, choice) {
      choices.push({'user': username, 'choice': choice});
      console.log('%s chose %s.', username, choice);
 
});
function updateUsernames() {
  io.sockets.emit('get user', users);
}
});
