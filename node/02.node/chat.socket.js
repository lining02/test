const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const list = []
io.on('connection', (socket) => { 
    socket.emit('list', JSON.stringify(list));
    socket.on('chat message', function(msg){
        list.push(msg)
        socket.emit('list', JSON.stringify(list));
    })
});
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./chat.socket.html'))
})
app.get('/list', (req, res) => {
    res.end(JSON.stringify(list))
})


server.listen(3000);