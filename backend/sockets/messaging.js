module.exports = (socket) => {
    console.log('new connection');

	socket.on('join', (id) => {
		socket.join(id);
        console.log('someone joined');
	})

    socket.on('sendMessage',(message)=>{
        socket.broadcast.to(message.chatID).emit('receiveMessage',message);
    })
}