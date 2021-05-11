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
		this.socket.on('receiveMessage', (message) => {
			this.chatService.storeMessage(message);
		})
	}

	sendMessage(message: Message) {
		this.socket.emit('sendMessage', message);
		this.chatService.storeMessage(message);
	}

	join(id:String ) {
		console.log('join in service');
		this.socket.emit('join', id);
	}
}
