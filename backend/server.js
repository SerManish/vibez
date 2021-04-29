const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const authRouter = require('./routers/authentication');
const chatRouter = require('./routers/chat');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/vibez', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(authRouter);
app.use(chatRouter);
app.use(express.static(path.join(__dirname, '../dist/vibez')));

app.listen(process.env.PORT, () => {
    console.log('vibez backend is online!');
});