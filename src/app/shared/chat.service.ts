import { Injectable } from '@angular/core';
import { Chat } from './chat.model';
import { Message } from './message.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { LastChat } from './last-chat.model';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	lastChatsReceived = new Subject<any>();
	chatSwitched = new Subject<Chat>();
	lastChatUpdated = new Subject<Message>();
	closeDetails = new Subject<any>();
	openDetails = new Subject<any>();

	private localLastChats: Map<String, LastChat>;
	private localChats: Map<String, Chat>;

	constructor() {
		this.localChats = new Map();
		this.localLastChats = new Map();
	}

	loadLastChats(): void {
		// faking lastChats endpoint
		setTimeout(() => {
			this.localLastChats.set('1', new LastChat('1', '', 'Axay', 'this could be different', new Date()));
			this.localLastChats.set('2', new LastChat('2', '', 'Manish', 'some message', new Date()));
			this.lastChatsReceived.next(this.localLastChats);
		}, 1000);
	}

	loadChatByChatId(chatId: String): void {
		if(this.localChats.has(chatId))  this.chatSwitched.next(this.localChats.get(chatId));
		else {
			// faking chatById endpoint
			setTimeout(() => {
				this.localChats.set(
					chatId,
					new Chat(
						chatId,
						'individual',
						[new User('2','anonymous','../../assets/images/default-avatar.png','DND','anonymous@gmail.com','anonymous')],
						[
							new Message('1', chatId, `some message in chat ${chatId}`, new Date()),
							new Message('2', chatId, `some message in chat ${chatId}`, new Date()),
							new Message('1', chatId, `some message in chat ${chatId}`, new Date())
						]
					)
				);
				this.chatSwitched.next(this.localChats.get(chatId));
			}, 1000);
		}
	}

	sendMessage(message: Message) {
		this.localChats.get(message.chatID)?.messages.push(message);
		this.lastChatUpdated.next(message);
	}

	clearChatData() {
		this.localChats.clear();
		this.localLastChats.clear();
	}

}
