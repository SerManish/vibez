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
	private localChats: Chat[];

	constructor() {
		this.localChats = [];
		setTimeout(() => {
			this.localChats = [
				new Chat('1',
					'individual',
					[
						new User('1', 'Axay', '../../../../assets/images/default-avatar.png', 'available', 'axay@gmail.com')
					],
					[
						new Message('1', '1', 'Axay ka chat', new Date()),
						new Message('2', '1', 'Eccchhhaaaa', new Date()),
						new Message('1', '1', 'sdlfjdslkj', new Date()),
						new Message('1', '1', 'sdlfjdslkj', new Date()),
						new Message('2', '1', 'sdlfjdslkj', new Date()),
						new Message('2', '1', 'sdlfjdslkj', new Date())
					]
				),
				new Chat('2',
					'individual',
					[
						new User('1', 'Manish', '../../../../assets/images/default-avatar.png', 'available', 'axay@gmail.com')
					],
					[
						new Message('1', '1', 'dg345234534', new Date()),
						new Message('2', '1', '134135345435', new Date()),
						new Message('1', '1', 'sdlfjdslkj', new Date()),
						new Message('1', '1', 'sdslkj', new Date()),
						new Message('2', '1', '39846598734985', new Date()),
						new Message('2', '1', 'sdl32454fjdslkj', new Date())
					]
				)
			]
			this.chatsReceived.next();
		}, 4000);
	}

	getLocalChat(): Chat[] {
		return this.localChats;
	}

	private findChatbyId(chatId : String)
	{
		let index = -1;
		for(let i = 0;i<this.localChats.length;i++)
		{
			if(this.localChats[i].id == chatId)
			{
				index = i;
				break;
			}
		}
		return index;
	}

	getChatByChatId(chatId:String) : Chat
	{
		return this.localChats[this.findChatbyId(chatId)];
	}

	sendMessage(message : Message)
	{
		let index = this.findChatbyId(message.chatID);
		if(index == -1)
			return;
		this.localChats[index].messages.push(message);
		this.chatSwitched.next(message.chatID);
	}
}
