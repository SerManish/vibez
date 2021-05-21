module.exports = (socket) => {
    console.log('new connection');

	socket.on('join', (id) => {
		socket.join(id);
        console.log('someone joined');
	})

    socket.on('sendMessage',(message , chatID)=>{
        socket.broadcast.to(chatID).emit('receiveMessage',message , chatID);
    })
}