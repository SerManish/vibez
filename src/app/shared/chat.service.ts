import { Injectable } from '@angular/core';
import { Chat } from './chat.model';
import { Message } from './message.model';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	chatsReceived = new Subject<any>();
	chatSwitched = new Subject<String>();
	lastChatUpdated = new Subject<Message>();
	closeDetails = new Subject<any>();
	openDetails = new Subject<any>();

	private localChats: Map<String, Chat>;

	constructor() {
		this.localChats = new Map();
		setTimeout(() => {
			this.localChats.set('1', new Chat('1',
				'individual',
				[
					new User('1', 'Axay', '../../../../assets/images/default-avatar.png', 'available', 'axay@gmail.com', 'axay')
				],
				[
					new Message('1', '1', 'Axay ka chat', new Date()),
					new Message('2', '1', 'Eccchhhaaaa', new Date()),
					new Message('1', '1', 'sdlfjdslkj', new Date()),
					new Message('1', '1', 'sdlfjdslkj', new Date()),
					new Message('2', '1', 'sdlfjdslkj', new Date()),
					new Message('2', '1', 'sdlfjdslkj', new Date())
				]
			));

			this.localChats.set('2', new Chat('2',
				'individual',
				[
					new User('1', 'Manish', '../../../../assets/images/default-avatar.png', 'available', 'mani@gmail.com', 'mani')
				],
				[
					new Message('1', '1', 'dg345234534', new Date()),
					new Message('2', '1', '134135345435', new Date()),
					new Message('1', '1', 'sdlfjdslkj', new Date()),
					new Message('1', '1', 'sdslkj', new Date()),
					new Message('2', '1', '39846598734985', new Date()),
					new Message('2', '1', 'sdl32454fjdslkj', new Date())
				]
			));
			this.chatsReceived.next();
		}, 1000);
	}

	getLocalChat(): Map<String, Chat> {
		return this.localChats;
	}

	getChatByChatId(chatId: String): Chat | undefined {
		return this.localChats.get(chatId);
	}

	sendMessage(message: Message) {
		this.localChats.get(message.chatID)?.messages.push(message);
		this.chatSwitched.next(message.chatID);
		this.lastChatUpdated.next(message);
	}
}
