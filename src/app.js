const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const socketIo = require('socket.io');
const { isFunction } = require('util');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, "./static")));
app.use(morgan('dev'));

app.get('/',(req,res) => res.render('index'));

const server = app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
})

// websockets

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New Connection', socket.id);
    socket.on('chat:msg', (data) => {
        io.sockets.emit('server:msg', data)
    })    
});
