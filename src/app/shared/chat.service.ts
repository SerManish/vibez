import { Injectable } from '@angular/core';
import { Chat } from './chat.model';
import { Message } from './message.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { LastChat } from './last-chat.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	lastChatsReceived = new Subject<any>();
	chatSwitched = new Subject<Chat>();
	lastChatUpdated = new Subject<any>();
	closeDetails = new Subject<any>();
	openDetails = new Subject<any>();

	private localLastChats: Map<String, LastChat>;
	private localChats: Map<String, Chat>;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.localChats = new Map();
		this.localLastChats = new Map();
	}

	loadLastChats(): void {
		this.http.get<Array<any>>('/chat/all').subscribe(async (lastChats) => {

			await Promise.all(lastChats.map(async (lastChat) => {
				const userID = lastChat.participants[0]==this.userService.currentUser._id ? lastChat.participants[1]:lastChat.participants[0];

				await (this.userService.getUserById(userID)
					.then((user: any) => {
						lastChat.lastMessage.time = new Date(lastChat.lastMessage.time);
						this.localLastChats.set(
							lastChat._id,
							//change krna hai last message aur date backend se
							new LastChat(lastChat._id, lastChat.lastMessage, lastChat.type, [user, this.userService.currentUser])
						);
					}).catch((err) => {
						console.log('Error: ', err);
					}));
			}));
			this.lastChatsReceived.next(this.localLastChats);
		});
	}

	newChat(user: User) {
		const initialMessage = new Message(this.userService.currentUser._id, '', new Date());
		const participants = [user, this.userService.currentUser]
		this.http.post(
			'/chat/create',
			{
				type: "individual",
				participants : [participants[0]._id, participants[1]._id],
				messages: [ initialMessage ]
			}
		).subscribe((newChatID: any) => {
			this.localLastChats.set(
				newChatID._id,
				new LastChat(newChatID._id, initialMessage, 'individual', participants)
			);
		});
	}

	loadChatByChatId(lastChat: LastChat): void {
		if(this.localChats.has(lastChat.chatId))  this.chatSwitched.next(this.localChats.get(lastChat.chatId));
		else {
			this.http.get(`/chat/${lastChat.chatId}`).subscribe((messages: any) => {
				this.localChats.set(
					lastChat.chatId,
					new Chat(
						lastChat.chatId,
						lastChat.type,
						lastChat.participants,
						messages
					)
				);
				this.chatSwitched.next(this.localChats.get(lastChat.chatId));
			}, (err) => {
				console.log("Error", err);
			})
		}
	}


	storeMessage(message: Message, chatId: String) {
		this.localChats.get(chatId)?.messages.push(message);
		this.lastChatUpdated.next({message, chatId});
	}

	clearChatData() {
		this.localChats.clear();
		this.localLastChats.clear();
	}

}
