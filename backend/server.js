const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const authRouter = require('./routers/authentication.router');
const chatRouter = require('./routers/chat.router');
const profileRouter = require('./routers/profile.router');

const messaging = require('./sockets/messaging');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

mongoose.connect('mongodb://127.0.0.1:27017/vibez', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(authRouter);
app.use(profileRouter);
app.use(chatRouter);
app.use(express.static(path.join(__dirname, '../dist/vibez')));

io.on('connection', messaging);

server.listen(process.env.PORT, () => {
    console.log('vibez backend is online!');
});