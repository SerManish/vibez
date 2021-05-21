import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';
import { Message } from './message.model';

@Injectable({
	providedIn: 'root'
})
export class MessagingService {
	socket;
	constructor(
		private chatService: ChatService
	) {
		this.socket = io();
		this.socket.on('receiveMessage', (message, chatId) => {
			const messageObject: Message = new Message(message.senderID, message.messageContent,new Date(message.time));
			this.chatService.storeMessage(messageObject, chatId);
		})
	}

	sendMessage(message: Message, chatId: String) {
		this.socket.emit('sendMessage', message, chatId);
		this.chatService.storeMessage(message, chatId);
	}

	join(id:String ) {
		console.log('join in service');
		this.socket.emit('join', id);
	}
}
