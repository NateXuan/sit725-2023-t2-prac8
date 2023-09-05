var express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const client = require('./dbConnection');

let router = require('./routes/router'); 

app.use(express.static(__dirname + '/')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

var port = process.env.port || 3000;

client.connect(err => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    } else {
        console.log('Connected to MongoDB');
        http.listen(port, () => {
            console.log("App listening to: " + port);
        });
    }
});

module.exports = app; 
